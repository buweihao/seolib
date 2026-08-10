# Reference Workflow

External websites are research inputs. They may inform information architecture, section order, layout concepts, spacing principles, typography hierarchy, visual balance, CTA hierarchy, and responsive behavior. They are not sources for copied code, branding, media, copy, or proprietary visual design.

## Standard workflow

1. Record the source URL and access date.
2. Capture a desktop screenshot at a documented viewport.
3. Capture a mobile screenshot at a documented viewport.
4. Save HTML only when it is useful and lawful for private analysis.
5. Create `notes.md` from the template below.
6. Identify and name the page sections in order.
7. Analyze content structure.
8. Analyze UI patterns separately.
9. Decide whether a reusable pattern exists.
10. Implement an original component only when approved.
11. Review the original implementation visually on desktop and mobile.
12. Add the reviewed component to `COMPONENT_LIBRARY.md` with its status.

## Required separation

### Content structure analysis

For every significant section, answer:

- What does the section communicate?
- Which buyer question, concern, or task does it address?
- Why does it appear at this point in the page?
- How does it connect to the preceding and following sections?

### UI pattern analysis

For every significant section, answer:

- What is the layout model?
- What is the approximate image-to-text balance?
- How is the typography hierarchy expressed?
- How does spacing group or separate information?
- Where are primary and secondary CTAs placed?
- How does behavior change between desktop and mobile?

Do not treat a content pattern and its observed visual treatment as inseparable. A content logic from one source may be combined with an independently observed UI principle and an original implementation.

## Reuse decision

Before proposing a component, record:

- the recurring buyer need;
- which parts are stable structure;
- which parts must be props or structured content;
- whether an approved component already solves it;
- how the implementation will remain visually and technically original.

## Batch ingestion and cropping

Use the repository tool for supplied full-page captures. It performs deterministic image operations only; visual section detection and naming remain human decisions.

### Canonical package

```text
references/<site-slug>/
  source/
    home-full.png
    home.pdf          # only when supplied
  sections/
    01-header.png
    02-hero.png
  section-manifest.json
  notes.md
```

Temporary preview chunks belong under `.tmp/reference-analysis/` and must not become permanent reference evidence. Preserve the original source file without resampling or overwriting it.

### Manifest contract

`section-manifest.json` records the source path and dimensions plus a sequential list of crops. Each crop contains an `index`, lowercase ASCII `slug`, integer `startY` and `endY` pixel boundary, and `confidence` of `high`, `medium`, or `low`. Optional review notes explain capture artifacts or uncertain boundaries. Crop intervals use a `startY`-inclusive, `endY`-exclusive coordinate convention.

### Commands

Install the small image dependency in the active Python environment, then use:

```powershell
python -m pip install -r scripts/reference-library/requirements.txt
python scripts/reference-library/reference_tool.py inspect references/_incoming/png
python scripts/reference-library/reference_tool.py stitch --inputs page-1.png page-2.png --output .tmp/reference-analysis/combined.png
python scripts/reference-library/reference_tool.py previews --source references/site-name/source/home-full.png --output-dir .tmp/reference-analysis/site-name
python scripts/reference-library/reference_tool.py crop --site-dir references/site-name
python scripts/reference-library/reference_tool.py validate --site-dir references/site-name
```

`stitch` is only for ordered page images of equal width. For a supplied PDF, retain the PDF in `source/`, render its pages at a documented resolution, stitch only when a normalized full-page image is needed, and visually compare the render with the PDF before cropping.

### Validation boundary

The tool rejects missing sources, dimension mismatches, invalid or non-sequential metadata, out-of-bounds crops, and output images with unexpected dimensions. Validation also decodes every crop and confirms that notes exist. It does not infer semantic boundaries, determine section purpose, or approve ambiguous cuts. Those decisions require visual inspection and must be recorded in `notes.md` before reuse is considered.

## Reference notes template

Copy this template to `references/<site-slug>/notes.md`.

```md
# Reference: <descriptive site name>

## Source

- URL: <https://example.com/page>
- Accessed: YYYY-MM-DD
- Page: <page name>
- Desktop viewport: <width × height>
- Mobile viewport: <width × height>
- Usage: Internal research only

## Saved evidence

- Full-page source: `source/home-full.png`
- Supplied PDF: `source/home.pdf` or Not supplied
- Mobile screenshot: `screenshots/home-mobile.png`
- Section manifest: `section-manifest.json`
- HTML: `html/home.html` or Not saved

## Page outline

1. <Section name>
2. <Section name>

## Content structure analysis

### <Section name>

- Communicates:
- Buyer need:
- Reason for position:
- Relationship to adjacent sections:

## UI pattern analysis

### <Section name>

- Layout:
- Image/text balance:
- Typography hierarchy:
- Spacing:
- CTA placement:
- Desktop/mobile change:

## Candidate reusable principles

- <Abstract principle, not copied expression>

## Originality and rights check

- [ ] No third-party logo or branding will be reused
- [ ] No third-party product imagery will be reused
- [ ] No substantial copy will be reused
- [ ] No HTML or CSS will be copied into production
- [ ] Proposed implementation differs in expression and uses original assets/code

## Component decision

- Decision: None / Extend existing / Propose new
- Component ID or candidate name:
- Reason:
- Required configurable inputs:
- Review notes:
```
