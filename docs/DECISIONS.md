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

**Consequences:** `LaunchHomepage-001` owns only the approved eight-section order and local token mapping. MOQ, timing, evidence, and readiness remain client-supplied facts or evaluation factors rather than defaults or promises. The composition is in Review; Phase 7 remains outside this decision.
