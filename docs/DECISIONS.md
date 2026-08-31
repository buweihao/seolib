# Decision Log

Important architecture decisions use a compact ADR-style record. New records are appended; superseded decisions remain for context and link to their replacement.

## 2026-08-08 — One shared component library

**Decision:** Build one shared component library rather than three independent templates.

**Reason:** Premium, Manufacturing, and Launch sites share core B2B content needs. Composition and configuration provide variation without multiplying maintenance work.

**Consequences:** Components must avoid client hard-coding, expose typed inputs, and support composition-level theming. Direction-specific components require a documented content or interaction reason.

## 2026-08-08 — Astro and Tailwind as the intended foundation

**Decision:** Start the application with Astro, TypeScript, and Tailwind CSS and avoid unnecessary frontend frameworks.

**Reason:** The target sites are content-led, static-first B2B marketing sites that benefit from small output, semantic HTML, and straightforward Cloudflare Pages deployment.

**Consequences:** React, Vue, Svelte, animation libraries, and heavy UI libraries require a documented need. Exact versions and initialization are deferred until Phase 1; Phase 0 does not fabricate a project manifest.

## 2026-08-08 — References are research, not code sources

**Decision:** Use external websites as design and content references, not as code sources.

**Reason:** The library must extract general principles while preserving originality, maintainability, and third-party rights.

**Consequences:** Content-structure analysis and UI-pattern analysis remain separate. Production work must not copy third-party branding, media, substantial copy, complete HTML/CSS, or proprietary visual design.

## 2026-08-08 — Preserve the empty repository during Phase 0

**Decision:** Establish documentation and reference conventions without scaffolding Astro or inventing component source directories.

**Reason:** The inspected directory was empty and not a Git or Astro project. The requested checkpoint is repository foundation only, and stack versions and initial design inputs remain unapproved.

**Consequences:** There is no runnable build at the end of Phase 0. Phase 1 must explicitly select versions, initialize the minimal application, and then create source directories backed by real code.

## 2026-08-08 — Pin the Phase 1 toolchain

**Decision:** Use Astro 7.2.0, Tailwind CSS 4.3.3 with `@tailwindcss/vite` 4.3.3, TypeScript 5.9.3, and npm 11.6.2. Support Node.js `>=22.12.0 <25`.

**Reason:** Astro and Tailwind versions were current stable releases when selected. Astro 7 requires Node 22.12 or newer. TypeScript 5.9 remains compatible with `@astrojs/check` and is a conservative ecosystem baseline for future integrations; npm 11.6.2 supports the available Node 24.13 runtime, while npm 12.0.2 does not.

**Consequences:** Versions are exact in `package.json` and npm is the sole package manager. Major upgrades require compatibility review, a lockfile refresh with optional dependencies, and full checks. TypeScript 7 adoption is deferred until the Astro and future CMS dependency tree is verified.

## 2026-08-08 — Use Tailwind 4 CSS-first semantic tokens

**Decision:** Define implementation tokens as semantic `--ds-*` CSS custom properties and expose them to Tailwind through `@theme inline`.

**Reason:** Semantic roles allow shared components to remain stable while client and composition themes remap values. Tailwind 4 and Astro officially recommend the first-party Vite plugin and CSS-first configuration.

**Consequences:** Components should consume roles such as canvas, ink, muted, accent, container, and section spacing rather than hard-coded palette values. Phase 1 values are neutral working defaults, not an approved client theme.

## 2026-08-08 — Create directory contracts before components

**Decision:** Establish directories and local README contracts for primitives, sections, compositions, and client configuration without implementing speculative components.

**Reason:** The library should grow from real buyer needs and approved reference analysis instead of a large placeholder catalog.

**Consequences:** `BaseLayout.astro` and the foundation page validate the toolchain but are not registered library components. The component catalog remains empty until Phase 2/3 evidence justifies entries.

## 2026-08-10 — Use manifest-driven reference cropping

**Decision:** Preserve each supplied full-page capture as source evidence and record human-selected semantic crop boundaries in a versioned JSON manifest. Generate and validate section images deterministically from that manifest.

**Reason:** Section meaning requires visual judgment, while image cropping, naming, and dimension checks should be repeatable and reviewable. Separating these responsibilities prevents an opaque segmentation script from presenting guesses as approved analysis.

**Consequences:** Every ingested full-page capture uses `source/home-full.png`, `section-manifest.json`, and generated `sections/` output. Ambiguous boundaries carry confidence and review notes. The cropping tool never chooses section semantics, and later component work cannot begin merely because a crop exists.

## 2026-08-10 — Scope Premium expression to the composition root

**Decision:** Implement Premium as an ordered composition of shared typed components with semantic token overrides scoped to `.premium-homepage`, rather than forking Premium-specific component variants or changing global defaults.

**Reason:** The direction needs a distinct editorial rhythm and visual character, but its content purposes and interaction patterns remain shared with future Manufacturing and Launch compositions.

**Consequences:** `PremiumHomepage-001` derives its prop groups from child component interfaces and owns only section order and local token mapping. Shared sections remain theme-neutral. The mapping is Approved for reuse but is not a client theme, and must be revalidated if its color, type, spacing, or radius values change.

## 2026-08-10 — Model manufacturing trust as evidence responsibilities

**Decision:** Build the Manufacturing composition around facility context, capability inputs/outputs, quality checkpoints, and explicit buyer/supplier responsibilities. Keep all supplier facts in typed props and scope the visual mapping to `.manufacturing-homepage`.

**Reason:** Manufacturing buyers need operational clarity and verifiable boundaries more than generic trust badges. A responsibility-led structure is reusable without inventing certifications, quantities, timing, or facility claims.

**Consequences:** `FacilityOverview-001`, `CapabilityMatrix-001`, and `QualityFramework-001` expose claim-neutral structures that can be populated with client-verified evidence. `ManufacturingHomepage-001` owns only the approved nine-section order and local token mapping. All four entries are Approved for reuse and must be revalidated when interfaces or Manufacturing tokens change.

## 2026-08-10 — Prove Launch through composition-only reuse

**Decision:** Implement the Launch direction with zero new primitives or sections. Reuse eight Approved sections, express project readiness through `CapabilityMatrix-001` labels and content props, and scope the visual mapping to `.launch-homepage`.

**Reason:** Early-stage buyers need a clearer decision sequence and lower information density, but those needs do not establish a new component purpose. Reusing the existing interfaces tests whether the shared library can create a genuinely distinct direction without duplication.

**Consequences:** `LaunchHomepage-001` owns only the approved eight-section order and local token mapping. MOQ, timing, evidence, and readiness remain client-supplied facts or evaluation factors rather than defaults or promises. The composition passed human review on 2026-08-11 and is Approved; Phase 7 remains outside this decision.

## 2026-08-11 — Validate the five-page system before client configuration

**Decision:** Define Home, Products, Capabilities, About, and Contact as the reusable base IA. Validate them as connected, noindex review routes with a typed shared shell and neutral fixture data before introducing public client routes.

**Reason:** Cross-page navigation and inquiry journeys must be proven once, while company facts, composition choice, media, contacts, and theme values still belong to the future client configuration layer.

**Consequences:** Home reuses an Approved homepage composition; four inner-page compositions reuse shared sections. `SiteLayout.astro` owns metadata, skip link, header, main, and footer behavior. Phase 8 will replace neutral fixture values with typed client configuration and connect the same compositions to public routes without copying components.

## 2026-08-12 — Separate content models, UI patterns, and composition

**Decision:** A section's buyer-facing fields live in a shared content model; multiple original UI patterns may consume that same model; a composition selects patterns and orders them. Reference attribution is split into content evidence, UI pattern evidence, and original treatment.

**Reason:** Theme tokens cannot create materially different structures, while binding one content purpose to one UI made the library too narrow. Treating an entire reference website as a component source also blurred whether it informed the information or the display.

**Consequences:** Eight content models are exported from `src/content-models/sections.ts`. Existing Approved sections consume them without losing status. Twelve new alternatives enter `Review`. `FlexibleHomepage-001` proves typed interchangeability, while client persistence, arbitrary page schemas, CMS integration, and public routing remain Phase 8 work.

## 2026-08-12 — Preserve high-difference PNG structures

**Decision:** Treat awards, certifications, media coverage, product outcomes, and client cases as valid configurable content categories rather than reasons to discard a reference UI structure. Downgrade look-only differences to variants, and implement materially different DOM/information relationships as independent patterns.

**Reason:** The first Phase 7.5 pass was too conservative and produced several visually homogeneous sections. The user wants a broad component vocabulary derived from the supplied PNG evidence, while keeping third-party facts and protected assets separate from reusable code.

**Consequences:** `StatementHero-001B` is a visual variant rather than an independent pattern. `RecognitionBackdropHero-001` and nine additional PNG-derived structures enter `Review`. All 66 supplied section PNGs are mapped in `docs/PNG_PATTERN_AUDIT.md`. Client-specific badges, awards, media, metrics, certifications, and case claims remain typed inputs that require verification before publication.

## 2026-08-12 — Require visually recognizable PNG mappings

**Decision:** A reference PNG is not considered represented merely because an existing component answers the same buyer question. Its mapped component or named variant must retain the recognizable visual skeleton: proportions, media arrangement, layering, background planes, borders, density, and section rhythm.

**Reason:** Content-only abstraction made materially different reference sections appear homogeneous in the review library and prevented reviewers from finding the UI they selected from the supplied screenshots.

**Consequences:** Internal review fixtures must demonstrate the actual visual construction with original placeholder assets. Visually distinct treatments may remain named variants even when they share a content model. The 66-PNG audit must be revisited wherever its current mapping identifies only a content-equivalent component without sufficient visual fidelity.

## 2026-08-12 — Model the Vitelle recognition Hero as a carousel

**Decision:** `RecognitionBackdropHero-001` is a multi-slide carousel, not a single static evidence collage. Each slide owns its evidence media, badges, title, positioning statement, and optional action.

**Reason:** The selected reference behavior is perceived as a rotating Hero campaign. A single collage preserves one frame's appearance but not the actual UI the reviewer expects to select.

**Consequences:** The carousel includes explicit previous/next, pagination, pause/resume, keyboard arrow support, polite status announcements, hover/focus pause, and reduced-motion defaults. Autoplay timing is configurable, and only one slide remains visible and interactive at a time.

## 2026-08-12 — Remove homogeneous Hero candidates after review

**Decision:** Remove `StatementHero-001B` (Statement Editorial Variant) and `FactoryEvidenceHero-001` from the selectable library because neither remains structurally distinct enough from `StatementHero-001` under human review.

**Reason:** A named pattern must offer a recognizable choice in composition, media behavior, information relationship, or interaction—not merely a different surface treatment. Keeping near-duplicates makes client selection harder and overstates the library's coverage.

**Consequences:** The review browser retains Statement Split, Centered Proof, and Recognition Backdrop as the current structurally distinct Hero examples. The flexible homepage selector retains the two `HeroContent`-compatible choices: Statement Split and Centered Proof. The two affected PNG mappings remain documented as gaps that require faithful replacement patterns rather than aliases to Statement Split.

## 2026-08-12 — Replace deleted Hero duplicates with faithful structures

**Decision:** Implement the Créer 03 and Laeyo 02 Hero evidence as `CinematicTypeHero-001` and `ArcFactoryHero-001`, using the shared `HeroContent` model while preserving their distinct structural relationships.

**Reason:** Removing homogeneous implementations should expose a coverage gap, not erase a genuinely distinctive source structure. The Créer reference is defined by a dark typographic field beside flush campaign media; the Laeyo reference is defined by a broad procurement statement meeting panoramic facility media through a dominant arc.

**Consequences:** Both PNG mappings return to `Component` status and both `HeroContent`-compatible implementations enter the flexible homepage selector. The selectable review library reaches 30 independent UI patterns, 22 of them implemented during Phase 7.5. All copy and media remain configurable, and the library uses original review assets and responsive code rather than source branding or images.

## 2026-08-12 — Consolidate split Heroes and complete the next PNG batch

**Decision:** Remove `CinematicTypeHero-001` after human review found it homogeneous with `ArcFactoryHero-001`. Retain Arc Factory as the only new split-media Hero, make it content-height-driven and stack below 75rem, then implement `ImmersiveMediaStage-001`, `ServiceMarquee-001`, and `PrinciplesLedger-001`.

**Reason:** Visual theme differences do not justify duplicate section choices. The three next-batch screenshots, however, introduce materially different relationships: framed media over a blurred field, continuous but optional motion, and ruled principle rows.

**Consequences:** Arc Factory no longer clips text or media during intermediate viewport narrowing. The accessible Marquee stops animating under reduced motion and exposes a scrollable static list. The library contains 32 independent review patterns, with product/SKU, testimonial authenticity, RFQ workflow, and social-feed integration remaining deferred.

## 2026-08-12 — Model product selection and testimonials without invented commerce

**Decision:** Add separate `ProductCutoutShelf-001`, `GatedProductSpotlight-001`, and `VerifiedTestimonialCards-001` patterns instead of treating all three screenshots as generic card grids.

**Reason:** RainShadow 07 communicates a curated four-product shelf, YG Labs 05 communicates intentionally controlled catalogue access through extreme whitespace, and Romano 09 communicates peer reassurance through equal quote cards. Their information and layout relationships are materially different.

**Consequences:** Product SKU data now has typed media, category, detail, and action fields without default price or availability. Gated access must be explicitly configured and warns against fictional login requirements. Testimonials require a verification-status label; attribution and rating remain client-supplied, and review fixtures are marked non-publishable. The library reaches 35 independent review patterns.

## 2026-08-12 — Gate client publication through typed verification records

**Decision:** Represent each client site as a typed configuration containing identity, contact, theme, pattern IDs, content models, optional-pattern states, registered media, and evidence records. Separate `review` and `publish` modes, with pending client facts allowed only in review previews.

**Reason:** A pattern-selection list is sufficient to begin composition, but it does not establish whether company claims, contact destinations, media rights, certifications, or commercial terms are safe to publish. Those inputs must remain visible and enforceable outside shared components.

**Consequences:** `ClientHomepage-001` resolves approved pattern IDs without copying implementations. `validateClientSiteConfig` blocks publish mode when required identity, evidence, contact, or media records remain pending. The first procurement-evidence configuration stays noindex and uses original review assets until a real client supplies verifiable facts and rights-cleared media.

## 2026-08-12 — Share SEO and inquiry mechanics, configure client ownership

**Decision:** Keep static SEO rendering, crawler files, the inquiry form, validation, attribution, security controls, and Resend transport in the shared library. Keep domains, metadata, organization facts, privacy versions, origins, mailboxes, secrets, and rate-limit values in client configuration or deployment environment.

**Reason:** The mechanics are common to every manufacturer site, while the identity, legal consent, claims, and delivery ownership are client facts that cannot be safely inferred or copied.

**Consequences:** New client projects run configuration and activation rather than rebuilding Phase 8.1. Review routes remain excluded from indexing. Inquiry delivery fails closed until exact origins, a verified Resend sender, and a client mailbox are present. Pages projects protect the endpoint with an edge rate-limiting rule; an `INQUIRY_RATE_LIMITER` binding remains an optional enhancement if the endpoint is reused in a Worker. Live delivery must receive a controlled post-deployment test.

## 2026-08-12 — Isolate CMS adapters behind a content-source contract

**Decision:** Pages and components consume normalized CMS-neutral records. Local content, Astro collections, and a future Sanity integration implement the same `ContentSource` interface; shared components never query a CMS directly.

**Reason:** Clients may differ in content ownership and CMS readiness. Binding components to Sanity would turn an optional editorial system into a global runtime dependency and make migrations harder.

**Consequences:** Sanity packages, project ID, dataset, schemas, localization, and webhooks are installed only when a real client approves them. The adapter must publish only validated records and static builds remain the delivery model.

## 2026-08-12 — Select Recognition Backdrop for the first client preview

**Decision:** Replace `ArcFactoryHero-001` with `RecognitionBackdropHero-001` in the procurement-evidence client configuration and extend the client schema, renderer, and media validation to accept its per-slide content model.

**Reason:** The client direction now calls for an evidence-collage carousel rather than a facility-led split opening. The review configuration must exercise the selected pattern without presenting placeholder material as real recognition.

**Consequences:** The preview uses only registered original review assets, labels all evidence-oriented badges as pending/review actions, retains one document-level h1, and requires real rights-cleared recognition or outcome evidence before publish mode can be considered.

## 2026-08-12 — Use Product Families in the first client preview

**Decision:** Replace `ProductCategoryList-001` with the approved `ProductFamilies-001` in the procurement-evidence client configuration.

**Reason:** The client preview now calls for equal-weight, media-led product-family cards rather than a dense numbered category directory.

**Consequences:** Existing typed product-family content and registered review media are reused without component duplication. Product names, scope, actions, and media remain client-configured and require verification before publication.

## 2026-08-12 — Remove the floating trust bar from the first client preview

**Decision:** Set `FloatingTrustBar-001` to `excluded` and remove its optional content from the procurement-evidence client configuration.

**Reason:** Its overlapping hero-to-content bridge is not part of the selected client composition.

**Consequences:** The shared component remains available in the library, but the client preview no longer renders it or carries unused trust-bar content.

## 2026-08-12 — Make one typed registry the component-review index

**Decision:** Register every user-facing Astro component once in `src/config/component-registry.ts`, including its stable ID, family, kind, status, source file, and isolated or in-context review destination.

**Reason:** The two manually assembled Phase 7.5 review pages did not expose later infrastructure components consistently. `FloatingTrustBar-001` was discoverable only on the PNG-derived page, while `InquiryForm-001` had no visual review entry.

**Consequences:** The main UI review console renders a complete registry index, `PatternReview` reads status from the registry, the secure inquiry form receives an isolated review example, and automated tests fail for duplicate IDs, missing sources, undocumented IDs, or unregistered user-facing Astro components.

## 2026-08-13 — Configure five client pages from one schema

**Decision:** Extend `ClientSiteConfig` with five root-relative routes and typed Products, Capabilities, About, and Contact page content, then render the four inner pages with the existing approved/review compositions and one shared client-page shell.

**Reason:** Homepage anchors demonstrate section patterns but do not constitute a complete client website. The reusable five-page compositions already exist and should consume client configuration instead of separate fixture-only content or copied page implementations.

**Consequences:** The procurement-evidence preview now exposes five connected noindex routes with shared identity, theme, navigation, footer, validation, and media registration. Screenshots are only needed for genuine component gaps; client facts and claims still require structured verified inputs.

## 2026-08-27 — Use a CMS-neutral About composition for the selected reference UI

**Decision:** Replace the old About page sections with a shared company-first composition that mirrors the selected reference structure: company information, recommendation content, advantages, optional image gallery, and company carousel. Map four fixed Sanity singleton documents through `ContentSource.getAboutContent()` and merge them into the client fallback configuration.

**Reason:** The reference page establishes a clearer visual sequence for a manufacturer About page, while this library must keep client facts, media, and copy configurable and remain usable before Sanity content is published.

**Consequences:** The implementation uses original Astro/CSS/SVG code and native scroll controls, with no copied reference assets or additional carousel dependency. About documents use direct English text fields rather than bilingual inputs; Sanity media is normalized with responsive CDN URLs and safe Alt fallbacks, including recommendation images with blank editor-provided Alt text. Incomplete CMS records continue to render the local review-safe content.
