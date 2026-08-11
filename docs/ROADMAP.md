# Roadmap

Status is recorded with checkboxes. A phase is complete only when its exit checks pass. Later phases may be refined as requirements and references become available.

## Phase 0 — Repository Foundation

- [x] Inspect the existing repository and toolchain
- [x] Confirm current Astro and Tailwind status
- [x] Establish long-term repository rules in `AGENTS.md`
- [x] Create the documentation system
- [x] Create the reference-library guide and naming conventions
- [x] Record initial architecture decisions
- [x] Avoid application scaffolding in the currently empty repository
- [x] Confirm that no existing build can be run because no application manifest exists

Status: Complete — 2026-08-08

Exit note: the directory was empty and was not a Git, Astro, or Tailwind project. Node v24.13.0 and npm 11.6.2 were available. No source code or existing project configuration was overwritten.

## Phase 1 — Design Foundation

- [x] Confirm the shared B2B library direction and record unresolved visual inputs as TBD
- [x] Select and document supported Astro, Tailwind, TypeScript, Node, and npm versions
- [x] Initialize the smallest viable Astro static project
- [x] Establish a neutral CSS-first semantic token contract without inventing a client theme
- [x] Create directory contracts for primitives, sections, compositions, and client configuration
- [x] Establish WCAG 2.2 AA, focus, reduced-motion, semantic HTML, and responsive foundations
- [x] Generate a single npm lockfile with optional dependencies included
- [x] Pass clean install, type, and production build checks

Status: Complete — 2026-08-08

Exit note: Astro 7.2.0, Tailwind CSS 4.3.3, TypeScript 5.9.3, and npm 11.6.2 are pinned. `npm ci --include=optional` completed with zero known vulnerabilities; `astro check` reported zero errors, warnings, or hints; the static build generated `/index.html`. No production homepage, theme composition, CMS, or buyer-facing component was created.

## Phase 2 — Reference Library

- [x] Ingest six supplied desktop reference packages without altering their source captures
- [x] Record mobile evidence and confirmed source URLs as unavailable in the supplied batch
- [x] Define semantic section boundaries in reviewed manifests and generate deterministic crops
- [x] Analyze content structure separately from UI patterns for every site
- [x] Extract candidate reusable principles without copying protected material
- [x] Add a cross-site comparison and reference index
- [x] Add and document reusable inspection, preview, stitching, cropping, and validation tooling
- [x] Complete human review of the explicitly flagged ambiguous crops

Status: Complete — 2026-08-10

Exit note: Vitelle, Laeyo, Romano, Créer, RainShadow Labs, and YG Laboratories contain six preserved desktop sources, six manifests, 66 validated section crops, separate content/UI analyses, and an approved cross-site comparison. The reviewer accepted the documented capture limitations. Mobile captures and confirmed URLs were not included in the supplied evidence.

## Phase 3 — Core Component Library

- [x] Draft an evidence-backed implementation plan and explicit non-goals
- [x] Register the proposed minimum components as `Idea`
- [x] Receive explicit approval for `docs/PHASE_3_PLAN.md`
- [x] Implement three approved primitives needed by real sections
- [x] Implement three approved evidence-backed sections
- [x] Type public interfaces and remove client-specific hard-coding
- [x] Create a neutral internal review fixture without composing a homepage
- [x] Review desktop/mobile behavior, semantics, keyboard access, and focus states
- [x] Pass type and production build checks
- [x] Move passing components to `Review` and stop for human approval

Status: Complete — 2026-08-10

Exit note: six components were approved for reuse after static build, type, semantic, keyboard-focus, and 390px/768px/1440px visual review. No client-specific values, hydration, third-party assets, or additional dependencies were introduced.

## Phase 4 — Premium Homepage

- [x] Draft the Chinese implementation plan and explicit approval boundary
- [x] Register one primitive, four shared sections, and one composition as `Idea`
- [x] Receive explicit approval for `docs/PHASE_4_PLAN.md`
- [x] Implement `MediaFrame-001` and four evidence-backed shared sections
- [x] Compose `PremiumHomepage-001` from new and approved shared components
- [x] Add a scoped Premium token mapping without changing global defaults
- [x] Create a neutral internal review fixture without replacing `/`
- [x] Validate spacious, editorial, scientific, premium, and restrained qualities
- [x] Review 390px/768px/1440px behavior, media, conversion hierarchy, semantics, keyboard access, focus, and contrast
- [x] Pass type and production build checks
- [x] Move passing Phase 4 components to `Review` and stop for human approval

Status: Complete — 2026-08-10

Exit note: `PremiumHomepage-001` composes the approved Phase 3 library with five new shared components in the approved seven-section order. The isolated review route passed static build, type, 390px/768px/1440px visual, semantic, keyboard-focus, media, overflow, console, token-isolation, and WCAG contrast checks. Human review approved all six Phase 4 entries for reuse; Phase 5 has not started.

## Phase 5 — Manufacturing Homepage

- [x] Draft the Chinese implementation plan and explicit approval boundary
- [x] Register three proposed shared sections and one composition as `Idea`
- [x] Receive explicit approval for `docs/PHASE_5_PLAN.md`
- [x] Implement three evidence-backed shared sections
- [x] Compose `ManufacturingHomepage-001` from Approved and new shared components
- [x] Add a scoped Manufacturing token mapping without changing global or Premium defaults
- [x] Create a neutral internal review fixture without replacing `/`
- [x] Validate factory, capability, product-range, quality-control, cooperation-path, and process hierarchy
- [x] Review 390px/768px/1440px behavior, information density, media, semantics, keyboard access, focus, contrast, and token isolation
- [x] Pass type and production build checks
- [x] Move passing Phase 5 entries to `Review` and stop for human approval

Status: Complete — 2026-08-10

Exit note: `ManufacturingHomepage-001` composes the Approved shared library with three new evidence-backed sections in the approved nine-section order. The isolated review route passed static build, type, 390px/768px/1440px visual, semantic, keyboard-focus, media, overflow, console, token-isolation, and WCAG contrast checks. Human review approved all four Phase 5 entries for reuse.

## Phase 6 — Launch Homepage

- [x] Draft the Chinese implementation plan and explicit approval boundary
- [x] Confirm the Launch direction requires no new primitive or section
- [x] Register `LaunchHomepage-001` as `Idea`
- [x] Receive explicit approval for `docs/PHASE_6_PLAN.md`
- [x] Compose `LaunchHomepage-001` from eight Approved shared sections
- [x] Add a scoped Launch token mapping without changing global, Premium, or Manufacturing defaults
- [x] Create a neutral internal review fixture without replacing `/`
- [x] Validate buyer-fit, project-readiness, MOQ/timing-factor, and conversion hierarchy without unsupported promises
- [x] Review 390px/768px/1440px behavior, media, semantics, keyboard access, focus, contrast, and four-way token isolation
- [x] Pass type and production build checks
- [x] Move `LaunchHomepage-001` to `Review` and stop for human approval

Status: Complete — 2026-08-11

Exit note: `LaunchHomepage-001` reuses eight Approved sections in the approved decision-led order with no new primitive or section. Its isolated fixture passed static build, type, 390px/768px/1440px visual, semantic, keyboard-focus, media, overflow, four-way token-isolation, and WCAG contrast checks, then passed human review and was approved for reuse.

## Phase 7 — Five Base Pages

- [x] Draft the Chinese implementation plan and explicit approval boundary
- [x] Confirm the proposed five-page information architecture
- [x] Register proposed shared shell sections and inner-page compositions as `Idea`
- [x] Receive explicit approval for `docs/PHASE_7_PLAN.md`
- [x] Compose pages from the shared component library
- [x] Define cross-page navigation and inquiry journeys
- [x] Validate metadata, accessibility, responsiveness, and builds
- [x] Move Phase 7 entries to `Review` and stop for human approval

Status: In review — 2026-08-11

Exit note: Home, Products, Capabilities, About, and Contact now exist as five connected internal review routes with shared header/footer, current-page navigation, inquiry journeys, skip link, one main/one h1 per route, unique metadata, and `noindex`. `astro check` and the static build passed with all five routes generated; browser review covered 390px/768px/1440px structure, images, current navigation, mobile menu, and overflow. A desktop navigation visibility issue was corrected; the user requested direct Git push without further validation after that final CSS adjustment. Public routes, client configuration, CMS, and deployment remain out of scope.

## Phase 8 — Client Configuration System

- [ ] Define typed client configuration and content schemas
- [ ] Separate content, images, contact details, and theme tokens from components
- [ ] Support composition selection without component duplication
- [ ] Document onboarding and validation workflow

Status: Not started

## Phase 9 — SEO Landing Page Expansion

- [ ] Define evidence-based landing-page categories and URL conventions
- [ ] Create reusable structured-content patterns
- [ ] Add canonical, sitemap, schema, and internal-linking rules
- [ ] Validate content uniqueness, performance, and build scale

Status: Not started
