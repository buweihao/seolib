# Reference Library tooling

This tool performs deterministic image operations. It does not infer semantic section boundaries; record those decisions manually in each site's `section-manifest.json` first.

## Setup

```sh
python -m pip install -r scripts/reference-library/requirements.txt
```

## Inspect input dimensions

```sh
python scripts/reference-library/reference_tool.py inspect references/_incoming/png
```

## Stitch multiple same-width page images

```sh
python scripts/reference-library/reference_tool.py stitch \
  --inputs page-01.png page-02.png \
  --output references/example/source/home-full.png
```

The command rejects mismatched widths rather than resizing evidence.

## Create temporary overlapping previews

```sh
python scripts/reference-library/reference_tool.py previews \
  --source references/example/source/home-full.png \
  --output-dir .tmp/reference-analysis/example \
  --chunk-height 1800 \
  --overlap 200
```

## Crop and validate a reviewed manifest

```sh
python scripts/reference-library/reference_tool.py crop --site-dir references/example
python scripts/reference-library/reference_tool.py validate --site-dir references/example
```

The crop command uses full-width coordinates from `source/home-full.png`, does not upscale or annotate images, and leaves unexpected pre-existing crop files in place with a warning.
