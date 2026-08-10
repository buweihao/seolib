# Reference Library

This directory stores private research evidence and analysis for external websites. It does not contain production templates or assets for reuse.

## Directory convention

Use a stable lowercase site slug made from letters, numbers, and hyphens. Prefer the recognizable site or domain name; add a qualifier only when needed to prevent ambiguity.

```text
references/
  site-name/
    source/
      home-full.png
      home.pdf
    sections/
      01-header.png
      02-hero.png
      03-services.png
    section-manifest.json
    html/
      home.html
    notes.md
```

Only create folders that contain evidence. `source/home-full.png` is the normalized, full-page source used for deterministic section crops. Keep a supplied PDF as `source/home.pdf` when present; do not invent missing formats. If HTML is not useful or should not be retained, omit the `html/` directory and record `Not saved` in the notes.

## Reference index

| Site | Primary value | Sections available | Analysis status |
| --- | --- | ---: | --- |
| Vitelle | Professional manufacturing proof and private-label journey | 10 | Desktop analyzed and crop set visually checked |
| Laeyo | Procurement-oriented launch paths, MOQ, workflow, and audit proof | 12 | Desktop analyzed; fixed-navigation capture artifacts documented |
| Romano | Broad service-to-quote funnel with laboratory and company history | 14 | Desktop analyzed; captured hero area needs source review |
| Créer | Premium editorial positioning for brand development and creative services | 15 | Desktop analyzed; dense editorial transitions need human review |
| RainShadow Labs | Commerce-first service paths, financing, and product discovery | 9 | Desktop analyzed; trust/service overlap visually checked |
| YG Laboratories | Compact laboratory credibility and gated product catalog | 6 | Desktop analyzed; sparse catalog state needs human review |

All six packages were ingested on 2026-08-10. Mobile evidence and confirmed source URLs were not supplied and remain explicitly unresolved.

## Naming rules

- Normalized full-page screenshot: `source/<page>-full.<ext>`
- Optional viewport screenshots: `<page>-desktop.<ext>` and `<page>-mobile.<ext>`
- Section screenshots: `sections/<two-digit-index>-<section-slug>.<ext>`
- Crop instructions: `section-manifest.json`
- Saved HTML: `<page>.html`
- Analysis: `notes.md`
- Use lowercase ASCII slugs and hyphens; avoid spaces and timestamps in canonical names.
- The numeric section identifier is internal to this library and is not an industry standard.

Record viewport dimensions and the access date in `notes.md`; filenames alone are not sufficient evidence.

## Allowed use

- Information architecture
- Section ordering and content logic
- Layout concepts and responsive behavior
- Spacing and typography hierarchy principles
- Visual balance and CTA hierarchy

## Prohibited use

- Third-party branding, logos, product photos, or other protected media
- Substantial copied copy
- Complete or production-ready copied HTML/CSS
- Pixel-perfect cloning or reconstruction of proprietary visual design

Follow `docs/REFERENCE_WORKFLOW.md` for capture, analysis, originality review, and component decisions. Reference material should not be imported by production source code.
