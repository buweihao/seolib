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

## Phase 7.5 — UI Pattern Component Library

- [x] Separate eight reusable content models from UI implementation props
- [x] Refactor the eight existing section families to consume shared content models
- [x] Add 27 original UI patterns across Hero and additional content-purpose families
- [x] Build noindex core and PNG-derived pattern browsers with traceable evidence
- [x] Record content evidence, UI evidence, original treatment, and suitable use
- [x] Build a typed flexible homepage and two same-content composition examples
- [x] Pass type and production build checks
- [x] Establish a typed single component registry and complete UI-review index
- [x] Complete human visual, responsive, and selection review

Status: Complete — 2026-08-21

Exit note: reusable content models sit independently from UI patterns. After the user-approved PNG re-audit and successive non-homogeneous expansion batches, the library exposes 35 independent reviewable patterns across `/library/patterns/` and `/library/patterns/png-derived/`. A typed registry now indexes every user-facing component, links each entry to an isolated or in-context review, and fails tests when a new Astro component is not registered. `InquiryForm-001` now has an isolated review example. `FlexibleHomepage-001` selects six section patterns by typed IDs, and its brand-led and procurement-led routes prove that identical content can create different structures.

Human review note — 2026-08-21: the user confirmed the visual review had no blocking issues after the complete test, type-check, and production-build workflow passed.

## Phase 8 — Client Configuration System

- [x] Define typed client configuration and content schemas
- [x] Separate content, images, contact details, and theme tokens from components
- [x] Support composition selection without component duplication
- [x] Document onboarding and validation workflow
- [x] Configure a five-page client preview from one client schema

Status: In review — 2026-08-12

Exit note: the user-selected procurement-evidence direction now resolves eight required pattern IDs, four explicit optional-pattern states, five client routes, homepage content, and four inner-page content groups through one `ClientSiteConfig`. The selected Hero is `RecognitionBackdropHero-001`, the selected product presentation is `ProductFamilies-001`, and `FloatingTrustBar-001` is explicitly excluded. Home, Products, Capabilities, About, and Contact share client identity, theme, navigation, footer, validation, and media registration without duplicating compositions. The noindex client preview remains in `review` mode; public routing is blocked until real client identity, recognition/capability evidence, facility media, product scope, commercial terms, contact ownership, domain, and privacy/delivery settings are supplied and verified.

Review navigation note — 2026-08-14: `/` is now the central review hub for the current component browsers, composition examples, five-page base routes, and the current five-page client preview. The superseded Phase 3 fixture was removed, its still-relevant component registrations now point to current review contexts, and every internal `noindex` review route exposes a persistent “总导航” return link.

Homepage content review note — 2026-08-15: the procurement-evidence client homepage now presents a clearly fictional skincare-manufacturer scenario instead of exposing internal project-guidance copy as customer-facing content. The visible journey is skincare offer → cooperation route → product categories → development support → quality → process → facility → inquiry; pending identity and evidence checks remain confined to the review notice.

Pattern navigation note — 2026-08-15: `/library/patterns/` is now a navigation-only review hub. The eight primary Home pattern families render on separate category routes, and the full component registry has its own route. The hub also records the current coverage gap: Products, Capabilities, About, and Contact have base compositions but still need broader page-specific patterns derived from non-Home reference captures.

Audit hierarchy note — 2026-08-15: the hub now separates available Home-section UI, missing inner-page UI, and management/composition tools into three explicit levels. It also records that a complete finished-product detail content model, component set, composition, and dynamic detail route do not exist yet; the current single-product spotlight remains only a promotional entry pattern.

Product catalogue note — 2026-08-18: Phase 8.2 adds the previously missing category-led catalogue flow. The Products page is now a focused `ProductFamilies-001` category entry; typed client catalogue data generates four category routes and twelve neutral product-detail routes through `CategoryProductGrid-001`, `ProductDetailProfile-001`, and their page compositions. Availability, ingredients, claims, testing, packaging compatibility, minimums, and timing remain explicit client-verification inputs.

Laeyo page evidence note — 2026-08-20: additional Laeyo product-listing, product-detail, manufacturing, About, and Contact captures are now stored under `references/laeyo/source/` and `references/laeyo/screenshots/`. The next implementation increment adds `ProductInquiryPanel-001`, `PageResourceRail-001`, `CompanyFactMatrix-001`, and `SamplingWorkflowCards-001`; each is a neutral, typed relationship rather than copied client content.

## Phase 8.3 — Sanity Product Editing

- [x] Add a client-owned product category and product schema
- [x] Embed Sanity Studio at `/admin` when project variables are configured
- [x] Add a CMS-neutral Sanity adapter with null-safe normalization
- [x] Make catalogue routes prefer published Sanity content with local review fallback
- [x] Fail publish-mode builds when Sanity or required catalogue content is missing
- [x] Document CORS, editor access, Cloudflare variables, and rebuild webhook setup
- [ ] Create the real client Sanity project, invite editors, migrate verified products, and connect the production rebuild webhook

Status: Shared implementation complete; client-owned Sanity activation pending — 2026-08-21

## Phase 8.4 — First Client Environment Provisioning

- [x] Create the independent Cloudflare Pages project `zhiyan-buweihao`
- [x] Attach `zhiyan.weihaobu.cn` as the Pages custom domain
- [x] Configure public Sanity and canonical-site variables for preview and production
- [x] Add the target-domain CNAME from the Cloudflare zone that owns `weihaobu.cn`
- [x] Create the first preview deployment, including the embedded Sanity Studio at `/admin/`
- [x] Verify the local Sanity CORS origin for the embedded Studio
- [ ] Configure a production rebuild path when remote deployment is approved
- [ ] Publish verified client content and promote a production deployment

Status: Local Sanity editing is ready; remote rebuild automation is intentionally deferred — 2026-08-21

## Phase 8.1 — Shared SEO, content-source, and inquiry infrastructure

- [x] Add typed page SEO, canonical, robots, language-alternate, social, and JSON-LD contracts
- [x] Generate sitemap and robots output while excluding internal review routes
- [x] Define a CMS-neutral content source so shared components do not depend on Sanity
- [x] Add an accessible reusable inquiry form with attribution and privacy consent
- [x] Add server-side validation, exact-origin enforcement, rate limiting, and Resend delivery
- [x] Add automated unit/endpoint tests and a full `verify` command
- [x] Document per-client deployment, privacy, DNS, CMS, and launch responsibilities
- [ ] Activate a real domain, Resend sender, mailbox, privacy policy, and Cloudflare bindings for the first client

Status: Shared foundation complete; first-client activation pending — 2026-08-12

Exit note: SEO rendering, schema builders, crawler output, CMS boundaries, inquiry UI, attribution, server validation, Resend delivery, origin checks, and a required Cloudflare rate limiter are now reusable library infrastructure. New clients configure and validate these capabilities rather than rebuilding them. Live delivery remains intentionally disabled in review until client-owned domain, mailbox, privacy, environment, and rate-limit values exist.

## Phase 9 — SEO Landing Page Expansion

- [ ] Define evidence-based landing-page categories and URL conventions
- [ ] Create reusable structured-content patterns
- [x] Add shared canonical, sitemap, robots, and schema infrastructure
- [ ] Define landing-page-specific schema and internal-linking rules
- [ ] Validate content uniqueness, performance, and build scale

Status: Not started
