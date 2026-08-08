# Reference Library

This directory stores private research evidence and analysis for external websites. It does not contain production templates or assets for reuse.

## Directory convention

Use a stable lowercase site slug made from letters, numbers, and hyphens. Prefer the recognizable site or domain name; add a qualifier only when needed to prevent ambiguity.

```text
references/
  site-name/
    screenshots/
      home-desktop.png
      home-mobile.png
      hero-001.png
      services-001.png
      process-001.png
    html/
      home.html
    notes.md
```

Only create folders that contain evidence. If HTML is not useful or should not be retained, omit the `html/` directory and record `Not saved` in the notes.

## Naming rules

- Page screenshots: `<page>-desktop.<ext>` and `<page>-mobile.<ext>`
- Section screenshots: `<section>-<three-digit-index>.<ext>`
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
