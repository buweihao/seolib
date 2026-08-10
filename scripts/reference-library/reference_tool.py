#!/usr/bin/env python3
"""Deterministic image operations for the Reference Library.

Visual section identification is intentionally outside this tool. Humans or an
AI reviewer record semantic boundaries in section-manifest.json; this script
only executes and validates those decisions.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

from PIL import Image


Image.MAX_IMAGE_PIXELS = None
SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
CONFIDENCE_VALUES = {"high", "medium", "low"}


class ReferenceToolError(ValueError):
    """A user-correctable reference input or manifest error."""


def read_dimensions(path: Path) -> tuple[int, int]:
    if not path.is_file():
        raise ReferenceToolError(f"Missing image: {path}")
    try:
        with Image.open(path) as image:
            image.verify()
        with Image.open(path) as image:
            return image.size
    except OSError as error:
        raise ReferenceToolError(f"Unreadable image {path}: {error}") from error


def inspect_images(paths: list[Path], as_json: bool) -> None:
    files: list[Path] = []
    for path in paths:
        if path.is_dir():
            files.extend(sorted(path.glob("*.png")))
        else:
            files.append(path)

    if not files:
        raise ReferenceToolError("No PNG files found.")

    records = []
    for path in files:
        width, height = read_dimensions(path)
        records.append(
            {
                "path": path.as_posix(),
                "width": width,
                "height": height,
                "bytes": path.stat().st_size,
            }
        )

    if as_json:
        print(json.dumps(records, indent=2))
        return

    print("path\twidth\theight\tbytes")
    for record in records:
        print(
            f"{record['path']}\t{record['width']}\t"
            f"{record['height']}\t{record['bytes']}"
        )


def stitch_images(inputs: list[Path], output: Path) -> None:
    if len(inputs) < 2:
        raise ReferenceToolError("Stitch requires at least two PNG inputs.")

    dimensions = [read_dimensions(path) for path in inputs]
    widths = {width for width, _ in dimensions}
    if len(widths) != 1:
        raise ReferenceToolError(
            "All stitch inputs must have the same width to avoid resizing."
        )

    width = dimensions[0][0]
    total_height = sum(height for _, height in dimensions)
    output.parent.mkdir(parents=True, exist_ok=True)

    stitched = Image.new("RGB", (width, total_height))
    cursor_y = 0
    for path, (_, height) in zip(inputs, dimensions, strict=True):
        with Image.open(path) as image:
            stitched.paste(image.convert("RGB"), (0, cursor_y))
        cursor_y += height

    stitched.save(output, format="PNG")
    actual = read_dimensions(output)
    if actual != (width, total_height):
        raise ReferenceToolError(
            f"Stitched output has unexpected dimensions {actual}; "
            f"expected {(width, total_height)}."
        )
    print(f"Created {output} ({width}x{total_height})")


def create_previews(source: Path, output_dir: Path, chunk_height: int, overlap: int) -> None:
    width, height = read_dimensions(source)
    if chunk_height <= 0:
        raise ReferenceToolError("chunk-height must be greater than zero.")
    if overlap < 0 or overlap >= chunk_height:
        raise ReferenceToolError("overlap must be >= 0 and smaller than chunk-height.")

    output_dir.mkdir(parents=True, exist_ok=True)
    step = chunk_height - overlap
    starts = list(range(0, height, step))
    if starts and starts[-1] + overlap >= height:
        starts.pop()

    with Image.open(source) as image:
        for index, start_y in enumerate(starts, start=1):
            end_y = min(start_y + chunk_height, height)
            chunk = image.crop((0, start_y, width, end_y))
            output = output_dir / f"chunk-{index:03d}-y{start_y:05d}-{end_y:05d}.png"
            chunk.save(output, format="PNG")
            print(f"Created {output} ({width}x{end_y - start_y})")


def load_manifest(site_dir: Path) -> tuple[dict[str, Any], Path, tuple[int, int]]:
    manifest_path = site_dir / "section-manifest.json"
    if not manifest_path.is_file():
        raise ReferenceToolError(f"Missing manifest: {manifest_path}")

    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise ReferenceToolError(f"Invalid manifest {manifest_path}: {error}") from error

    source_name = manifest.get("source")
    if not isinstance(source_name, str) or Path(source_name).name != source_name:
        raise ReferenceToolError("Manifest source must be a filename such as home-full.png.")

    source = site_dir / "source" / source_name
    dimensions = read_dimensions(source)
    validate_manifest(manifest, dimensions)
    return manifest, source, dimensions


def validate_manifest(manifest: dict[str, Any], dimensions: tuple[int, int]) -> None:
    width, height = dimensions
    sections = manifest.get("sections")
    if not isinstance(sections, list) or not sections:
        raise ReferenceToolError("Manifest must contain a non-empty sections array.")

    previous_index = 0
    previous_end = 0
    for position, section in enumerate(sections, start=1):
        if not isinstance(section, dict):
            raise ReferenceToolError(f"Section {position} must be an object.")

        index = section.get("index")
        slug = section.get("slug")
        start_y = section.get("startY")
        end_y = section.get("endY")
        confidence = section.get("confidence")

        if not isinstance(index, int) or index != previous_index + 1:
            raise ReferenceToolError(
                f"Section {position} index must be sequential; expected {previous_index + 1}."
            )
        if not isinstance(slug, str) or not SLUG_PATTERN.fullmatch(slug):
            raise ReferenceToolError(
                f"Section {index} slug must contain lowercase ASCII letters, numbers, and hyphens."
            )
        if not isinstance(start_y, int) or not isinstance(end_y, int):
            raise ReferenceToolError(f"Section {index} coordinates must be integers.")
        if start_y < 0 or end_y <= start_y or end_y > height:
            raise ReferenceToolError(
                f"Section {index} bounds [{start_y}, {end_y}) are outside 0..{height}."
            )
        if confidence not in CONFIDENCE_VALUES:
            raise ReferenceToolError(
                f"Section {index} confidence must be high, medium, or low."
            )
        if start_y > previous_end:
            print(
                f"Warning: {start_y - previous_end}px gap before section {index}.",
                file=sys.stderr,
            )

        previous_index = index
        previous_end = max(previous_end, end_y)

    if previous_end < height:
        print(
            f"Warning: manifest ends {height - previous_end}px before the source bottom.",
            file=sys.stderr,
        )
    print(f"Manifest valid for source {width}x{height}: {len(sections)} sections")


def crop_sections(site_dir: Path) -> None:
    manifest, source, (width, _) = load_manifest(site_dir)
    output_dir = site_dir / "sections"
    output_dir.mkdir(parents=True, exist_ok=True)

    expected_names: set[str] = set()
    with Image.open(source) as image:
        for section in manifest["sections"]:
            filename = f"{section['index']:02d}-{section['slug']}.png"
            expected_names.add(filename)
            output = output_dir / filename
            crop = image.crop((0, section["startY"], width, section["endY"]))
            crop.save(output, format="PNG")
            print(f"Created {output} ({crop.width}x{crop.height})")

    stale = sorted(
        path.name for path in output_dir.glob("*.png") if path.name not in expected_names
    )
    if stale:
        print(
            "Warning: unexpected existing crops were not deleted: " + ", ".join(stale),
            file=sys.stderr,
        )


def validate_site(site_dir: Path) -> None:
    manifest, _, (width, _) = load_manifest(site_dir)
    output_dir = site_dir / "sections"
    errors: list[str] = []

    for section in manifest["sections"]:
        filename = f"{section['index']:02d}-{section['slug']}.png"
        crop_path = output_dir / filename
        try:
            crop_width, crop_height = read_dimensions(crop_path)
        except ReferenceToolError as error:
            errors.append(str(error))
            continue

        expected_height = section["endY"] - section["startY"]
        if crop_width != width or crop_height != expected_height:
            errors.append(
                f"{crop_path} is {crop_width}x{crop_height}; "
                f"expected {width}x{expected_height}."
            )

    notes = site_dir / "notes.md"
    if not notes.is_file() or notes.stat().st_size == 0:
        errors.append(f"Missing or empty notes: {notes}")

    if errors:
        raise ReferenceToolError("\n".join(errors))
    print(f"Site valid: {site_dir} ({len(manifest['sections'])} section crops)")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    inspect_parser = subparsers.add_parser("inspect", help="Report PNG dimensions.")
    inspect_parser.add_argument("paths", nargs="+", type=Path)
    inspect_parser.add_argument("--json", action="store_true", dest="as_json")

    stitch_parser = subparsers.add_parser(
        "stitch", help="Stitch same-width PNG pages vertically without resizing."
    )
    stitch_parser.add_argument("--inputs", nargs="+", type=Path, required=True)
    stitch_parser.add_argument("--output", type=Path, required=True)

    preview_parser = subparsers.add_parser(
        "previews", help="Create overlapping temporary inspection chunks."
    )
    preview_parser.add_argument("--source", type=Path, required=True)
    preview_parser.add_argument("--output-dir", type=Path, required=True)
    preview_parser.add_argument("--chunk-height", type=int, default=1800)
    preview_parser.add_argument("--overlap", type=int, default=200)

    crop_parser = subparsers.add_parser(
        "crop", help="Crop sections from source/home-full.png using the manifest."
    )
    crop_parser.add_argument("--site-dir", type=Path, required=True)

    validate_parser = subparsers.add_parser(
        "validate", help="Validate source, manifest, crops, and notes for one site."
    )
    validate_parser.add_argument("--site-dir", type=Path, required=True)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    try:
        if args.command == "inspect":
            inspect_images(args.paths, args.as_json)
        elif args.command == "stitch":
            stitch_images(args.inputs, args.output)
        elif args.command == "previews":
            create_previews(args.source, args.output_dir, args.chunk_height, args.overlap)
        elif args.command == "crop":
            crop_sections(args.site_dir)
        elif args.command == "validate":
            validate_site(args.site_dir)
        else:
            parser.error(f"Unknown command: {args.command}")
    except ReferenceToolError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
