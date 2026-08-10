# Phase 3 Plan — Core Component Library

Status: Complete; all six components were approved for reuse on 2026-08-10.

## Objective

Create the smallest evidence-backed Astro component slice that can support later Premium, Manufacturing, and Launch compositions without committing to any complete homepage or client theme. Phase 3 will establish typed public interfaces, original responsive treatments, review fixtures, and catalog discipline.

## Approved evidence base

The plan uses the abstract buyer needs recorded in the six approved reference packages and the cross-site findings in `docs/REFERENCE_COMPARISON.md`. Reference screenshots remain research evidence only and will never be imported into production source code.

## Proposed scope

### Primitives

| ID | Planned file | Purpose | Intended public inputs |
| --- | --- | --- | --- |
| `Container-001` | `src/components/primitives/Container.astro` | Apply consistent page gutters and readable width | `size: "reading" | "content" | "wide"`; class passthrough; default slot |
| `ActionLink-001` | `src/components/primitives/ActionLink.astro` | Render navigation and CTA actions with correct anchor semantics | `href`, `label`, `variant: "primary" | "secondary" | "text"`, optional accessible label |
| `SectionHeading-001` | `src/components/primitives/SectionHeading.astro` | Provide a consistent section introduction without fixing its visual theme | optional `eyebrow`, `title`, optional `description`, `level: "h2" | "h3"`, `align: "start" | "center"` |
These primitives are included only because the proposed sections need them. Media frame, generic card, grid, badge, icon, carousel, modal, tabs, and accordion abstractions are deferred until repeated implementation pressure exists.

### Sections

| ID | Planned file | Buyer need | Evidence |
| --- | --- | --- | --- |
| `BuyerPathways-001` | `src/components/sections/BuyerPathways.astro` | “Which cooperation route fits my readiness, control, and risk?” | Laeyo launch paths; Romano service paths; RainShadow service paths; YG route separation |
| `ProofStrip-001` | `src/components/sections/ProofStrip.astro` | “What concise facts make this supplier worth investigating?” | Romano trust bar; RainShadow trust bar; YG value pillars; Vitelle capability summary |
| `ProcessSteps-001` | `src/components/sections/ProcessSteps.astro` | “What happens next, and who is responsible at each stage?” | Vitelle private-label process; Laeyo sampling workflow; Romano process timeline |

All section content will arrive through explicit TypeScript props. Example content used for review will be neutral and fictional, with no real certification, MOQ, lead-time, facility, origin, or performance claim.

## Intended interface boundaries

- `BuyerPathways-001` accepts a section heading and two to four route objects containing a title, concise explanation, optional decision cue, and optional action link. It does not decide which route is featured from client facts.
- `ProofStrip-001` accepts a list of short proof statements. It does not ship certification logos or assert that a client holds any credential.
- `ProcessSteps-001` accepts ordered steps with a title, description, and optional buyer/supplier responsibility labels. It renders an ordered list and requires no client-side JavaScript.
- Shared components consume semantic `--ds-*` roles; they do not introduce Premium, Manufacturing, or Launch palettes.
- Props contain presentation-neutral content. Client configuration schemas remain Phase 8 work.

## Implementation sequence after approval

1. Confirm the existing directory contracts and add the three primitives with strict props.
2. Add `ProofStrip-001` as the smallest section and validate its semantics and wrapping behavior.
3. Add `BuyerPathways-001`, using the approved action and heading primitives.
4. Add `ProcessSteps-001`, preserving ordered meaning and optional responsibility details.
5. Add a non-production review fixture at `src/pages/library/phase-3.astro` containing only neutral sample data for visual and accessibility inspection.
6. Review at approximately 390 px and 1440 px widths, keyboard-test all links, and inspect headings, landmarks, list semantics, alternative text, focus states, and reduced-motion behavior.
7. Run `npm.cmd run check` and `npm.cmd run build`.
8. Update component statuses from `Idea` to `Review` only for implementations that pass all checks, then stop for human approval.

At most one section should be introduced before its supporting primitives are checked. If a proposed abstraction becomes unnecessary during implementation, remove it from the phase rather than keeping speculative code.

## Explicit non-goals

- No complete homepage or page composition
- No Premium, Manufacturing, or Launch theme implementation
- No shared Hero yet; the approved references show materially different hero strategies
- No header, footer, navigation system, inquiry form, product catalog, carousel, animation, or interactive framework
- No CMS, Sanity, Cloudflare, deployment, client schema, or content collection work
- No use of third-party reference imagery, logos, copy, HTML, CSS, or proprietary visual expression
- No React, Vue, Svelte, icon package, animation package, or additional runtime dependency

## Acceptance criteria

- Exactly the approved minimum scope is implemented; additions require a documented need.
- Every public interface is strict, explicit, and free of client-specific defaults.
- Output is static semantic HTML with no avoidable client-side JavaScript.
- Sections remain legible and structurally intact at mobile and desktop review widths.
- Keyboard focus is visible; heading levels and list semantics are valid; media requires appropriate alternative text.
- Components use the Phase 1 semantic token contract and remain theme-neutral.
- Review fixtures contain no unsupported real-world claims.
- `astro check` reports zero errors, warnings, and hints; the static build succeeds.
- `docs/COMPONENT_LIBRARY.md`, `docs/ROADMAP.md`, and any genuinely affected decision records are current.
- Phase 4 does not begin automatically when Phase 3 reaches review.

## Approval boundary

Approval of this plan authorizes only the six listed components plus the internal review fixture and required documentation updates. Any additional component, dependency, composition, theme, or client schema requires a separate scope decision.

## Implementation result

- Implemented exactly the six approved components and `src/pages/library/phase-3.astro`.
- Added no dependency, client configuration, composition, theme, CMS, JavaScript hydration, or third-party asset.
- Browser-reviewed at 390px, 768px, and 1440px. The layouts resolve to 1/2/4 proof columns and 1/2/3 pathway columns without horizontal overflow.
- Verified semantic regions, one page-level heading, section heading hierarchy, unordered and ordered lists, responsibility definition lists, 44px links, visible keyboard focus, and zero browser console warnings/errors.
- `astro check` completed with zero errors, warnings, or hints; the production build generated both `/index.html` and `/library/phase-3/index.html`.
