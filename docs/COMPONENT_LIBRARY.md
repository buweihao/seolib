# Component Library

This is the source of truth for reusable component status. Phase 0 registers no implementation or speculative component; entries are added only when supported by an approved need or reference analysis.

## Levels

1. **Primitives** — basic reusable UI elements such as Container, Button, SectionHeading, Badge, and ImageFrame.
2. **Sections** — complete content modules such as Hero, Services, Products, Factory, Process, and CTA.
3. **Page compositions** — ordered arrangements of sections for Premium, Manufacturing, and Launch directions.
4. **Client websites** — configuration, content, media, theme values, and approved shared components.

## Status vocabulary

- **Idea** — identified but not designed or implemented
- **Draft** — implemented and under active iteration
- **Review** — ready for content, visual, accessibility, and responsive review
- **Approved** — accepted for reuse
- **Deprecated** — retained for migration context but not for new work

## Catalog fields

| Field | Meaning |
| --- | --- |
| ID | Stable internal identifier, for example `Hero-001` |
| Name | Component name |
| File | Repository path once implemented |
| Category | Primitive, Section, or Composition |
| Status | One of the controlled statuses above |
| Suitable For | Relevant composition directions or use cases |
| Content Purpose | Buyer question or communication task solved |
| Props | Typed public inputs; link to source or summarize |
| Reference | Internal reference-note paths, never copied source code |
| Notes | Review findings, constraints, or migration context |

## Catalog

No components are registered yet. The first entry will be created only after a real content need or reference analysis establishes its purpose.

## Implementation roots

| Level | Directory | Phase 1 state |
| --- | --- | --- |
| Primitives | `src/components/primitives/` | Contract documented; no components |
| Sections | `src/components/sections/` | Contract documented; no components |
| Page compositions | `src/components/compositions/` | Contract documented; no compositions |
| Client configuration | `src/config/` | Contract documented; schema TBD |

`src/layouts/BaseLayout.astro` is application infrastructure and is not a buyer-facing library component, so it is not assigned a catalog ID.

## Registration checklist

- [ ] Content purpose and buyer question are explicit
- [ ] Implementation is original
- [ ] Public props are typed and client facts are not hard-coded
- [ ] Desktop and mobile behavior are documented
- [ ] Semantic HTML and keyboard behavior are reviewed
- [ ] Relevant reference notes are linked
- [ ] Status and review notes are current
