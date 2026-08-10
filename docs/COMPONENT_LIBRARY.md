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

Phase 2 established the buyer needs below. The six Phase 3, six Phase 4, and four Phase 5 implementations passed technical and human review and are approved for reuse. The Phase 6 Launch composition has passed implementation and technical review and is awaiting human approval.

| ID | Name | File | Category | Status | Suitable For | Content Purpose | Props | Reference | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Container-001` | Container | `src/components/primitives/Container.astro` | Primitive | Approved | All directions | Constrain content width and page gutters | `size`, optional `class`, default slot | Phase 1 design foundation | Reading/content/wide modes verified without overflow |
| `ActionLink-001` | Action Link | `src/components/primitives/ActionLink.astro` | Primitive | Approved | All directions | Provide semantic navigation and CTA links | `href`, `label`, `variant`, optional `ariaLabel` and `class` | Cross-site CTA analysis | Anchor semantics, 44px target, visible focus, and reduced motion verified |
| `SectionHeading-001` | Section Heading | `src/components/primitives/SectionHeading.astro` | Primitive | Approved | All directions | Introduce a section with a valid heading hierarchy | `title`, optional eyebrow/description/id/class, `level`, `align` | Cross-site hierarchy analysis | Theme-neutral h2/h3 rendering verified |
| `BuyerPathways-001` | Buyer Pathways | `src/components/sections/BuyerPathways.astro` | Section | Approved | Manufacturing, Launch; potentially Premium | Help buyers choose a cooperation route | Section heading fields plus typed pathway objects | Laeyo, Romano, RainShadow, YG Laboratories | Original 1/2/3-column responsive treatment; no route is hard-coded as preferred |
| `ProofStrip-001` | Proof Strip | `src/components/sections/ProofStrip.astro` | Section | Approved | All directions | Summarize supplier facts worth investigating | Accessible `label`, typed proof items, optional `class` | Romano, RainShadow, YG Laboratories, Vitelle | Text-only 1/2/4-column treatment; no certification claims or logos bundled |
| `ProcessSteps-001` | Process Steps | `src/components/sections/ProcessSteps.astro` | Section | Approved | Manufacturing, Launch; potentially Premium | Explain sequence and buyer/supplier responsibilities | Section heading fields, ordered steps, optional responsibility labels | Vitelle, Laeyo, Romano | Ordered list and optional definition-list responsibilities; no JavaScript |
| `MediaFrame-001` | Media Frame | `src/components/primitives/MediaFrame.astro` | Primitive | Approved | All directions | Preserve responsive media geometry and alternative text | `src`, `alt`, intrinsic `width`/`height`, optional `loading`, `aspect`, `class` | Cross-site media analysis | Meaningful review SVGs verified at 390/768/1440; no production media bundled |
| `StatementHero-001` | Statement Hero | `src/components/sections/StatementHero.astro` | Section | Approved | Premium; potentially other directions | State audience, value, and next actions | Typed heading, description, one primary/optional secondary action, and media props | Créer, Vitelle, YG Laboratories | One h1, one primary CTA, responsive content-first order; Premium expression remains composition-scoped |
| `EvidenceFeature-001` | Evidence Feature | `src/components/sections/EvidenceFeature.astro` | Section | Approved | All directions | Connect positioning to verifiable operational evidence | Typed heading, evidence points, media position/configuration, optional action | Vitelle, Romano, Laeyo | Ordered evidence content is client-neutral and makes no unsupported proof claims |
| `ProductFamilies-001` | Product Families | `src/components/sections/ProductFamilies.astro` | Section | Approved | All directions | Present curated product directions without ecommerce behavior | Typed heading plus family name/description and optional media/action | Vitelle, Romano, RainShadow, Laeyo | Responsive one/two/three-column treatment; no price, SKU, or catalogue behavior |
| `InquiryCTA-001` | Inquiry CTA | `src/components/sections/InquiryCTA.astro` | Section | Approved | All directions | Explain inquiry preparation and next action | Typed heading, preparation items, one primary/optional secondary action | Laeyo, Romano | Link-based conversion only; no form, backend, response-time promise, or submission logic |
| `PremiumHomepage-001` | Premium Homepage | `src/components/compositions/PremiumHomepage.astro` | Composition | Approved | Premium | Compose an editorial, scientific, restrained B2B homepage | Derives seven section prop groups from child component interfaces | Approved cross-site comparison | Reuses six Approved Phase 3 components; Premium tokens are scoped to the composition root |
| `FacilityOverview-001` | Facility Overview | `src/components/sections/FacilityOverview.astro` | Section | Approved | Manufacturing; potentially other directions | Explain facility areas and available verification routes | Typed heading/media/area objects, optional verification note, and up to two actions | Laeyo, Vitelle, Romano | Responsive media/content split; no facility scale, equipment, address, certification, or visit claims bundled |
| `CapabilityMatrix-001` | Capability Matrix | `src/components/sections/CapabilityMatrix.astro` | Section | Approved | Manufacturing; potentially Launch | Map production stages to scope, buyer inputs, supplier outputs, and evidence | Typed capability items plus optional customizable field labels | Laeyo, Romano, Vitelle | Semantic ordered articles and definition lists; verified at four/two/one columns without capacity, MOQ, or timing defaults |
| `QualityFramework-001` | Quality Framework | `src/components/sections/QualityFramework.astro` | Section | Approved | All directions | Explain quality checkpoints, controlled risks, and evidence types | Typed checkpoint objects, optional evidence label and verification action | Laeyo, Romano, Vitelle | Ordered checkpoints remain claim-neutral; no certification names or logos bundled |
| `ManufacturingHomepage-001` | Manufacturing Homepage | `src/components/compositions/ManufacturingHomepage.astro` | Composition | Approved | Manufacturing | Compose a procurement-led, capability-clear B2B homepage | Derives nine section prop groups from child component interfaces | Approved cross-site comparison | Reuses Approved sections; Manufacturing tokens are scoped to the composition root |
| `LaunchHomepage-001` | Launch Homepage | `src/components/compositions/LaunchHomepage.astro` | Composition | Review | Launch | Compose an approachable, decision-clear homepage for early-stage buyers | Derives eight section prop groups from child component interfaces | Approved cross-site comparison | Reuses eight Approved sections with zero new primitives/sections; Launch tokens are scoped to the composition root |

## Implementation roots

| Level | Directory | Phase 1 state |
| --- | --- | --- |
| Primitives | `src/components/primitives/` | Four registered and Approved components |
| Sections | `src/components/sections/` | Ten registered and Approved components |
| Page compositions | `src/components/compositions/` | Two Approved compositions and one Launch composition in Review |
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
