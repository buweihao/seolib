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

- [ ] Add the first approved reference package
- [ ] Capture desktop and mobile evidence
- [ ] Analyze content structure separately from UI patterns
- [ ] Extract candidate reusable principles without copying protected material
- [ ] Review reference completeness against the workflow

Status: Not started

## Phase 3 — Core Component Library

- [ ] Confirm source directory conventions
- [ ] Implement the minimum approved primitives needed by real sections
- [ ] Implement initial evidence-backed sections
- [ ] Type component interfaces and remove client-specific hard-coding
- [ ] Register and visually review each component

Status: Not started

## Phase 4 — Premium Homepage

- [ ] Define the Premium composition from approved components
- [ ] Validate spacious, editorial, scientific, premium, and restrained qualities
- [ ] Review responsive behavior and conversion hierarchy
- [ ] Pass build, type, accessibility, and visual checks

Status: Not started

## Phase 5 — Manufacturing Homepage

- [ ] Define the Manufacturing composition from the shared library
- [ ] Validate factory, capability, certification, product-range, and quality-control hierarchy
- [ ] Review responsive behavior and B2B trust signals
- [ ] Pass build, type, accessibility, and visual checks

Status: Not started

## Phase 6 — Launch Homepage

- [ ] Define the Launch composition from the shared library
- [ ] Validate low-MOQ, speed-to-market, buyer-fit, and conversion hierarchy
- [ ] Review responsive behavior and approachable visual treatment
- [ ] Pass build, type, accessibility, and visual checks

Status: Not started

## Phase 7 — Five Base Pages

- [ ] Confirm the five-page information architecture
- [ ] Compose pages from the shared component library
- [ ] Define cross-page navigation and inquiry journeys
- [ ] Validate metadata, accessibility, responsiveness, and builds

Status: Not started

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
