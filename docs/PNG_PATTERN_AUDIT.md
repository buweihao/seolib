# PNG Pattern Audit

Status: Phase 7.5 expansion in `Review` — 2026-08-12.

This audit re-evaluates all 66 section PNGs from six supplied desktop reference packages. The purpose is to preserve materially different UI structures without reproducing third-party branding or source code. Awards, certifications, media coverage, product outcomes, and client cases are valid content categories; their specific facts and assets remain client-supplied and verifiable.

## Visual fidelity rule

Every supplied section PNG must point to a visible library component or named visual variant that preserves its recognizable UI skeleton. A valid mapping must account for the major proportions, media placement, layering, borders/background planes, information density, and section rhythm—not only the buyer question or content fields. Generic cards or split layouts do not satisfy a mapping when the source PNG has a materially different visual construction.

The implementation remains original: third-party logos, copy, photography, awards, certification marks, exact typography, and exact decorative artwork are not copied. Equivalent client-owned assets are configurable inputs, and the internal fixture must visually demonstrate the intended structure rather than replacing it with an unrelated abstract placeholder.

## Decision vocabulary

- **Component** — materially distinct reusable DOM/information relationship implemented in the library.
- **Variant** — same public content purpose and core DOM relationship; visual expression only.
- **Composition evidence** — useful section order or page rhythm, but not a standalone component.
- **Existing** — already represented by an approved/review component.
- **Deferred** — distinct but requires an interaction, content model, or page type outside the current scope.
- **Excluded evidence** — capture is incomplete or the section is too site-specific to infer a reusable structure.

## Hero correction

The former Editorial Split, Factory Evidence, and later Cinematic Typography candidates were removed after human review found them visually homogeneous. `ArcFactoryHero-001` is the retained split Hero and now stacks before 75rem, grows with its content, and renders uncropped media below that breakpoint. `RecognitionBackdropHero-001` remains the independent Vitelle-derived carousel: each slide contains overlapping editorial evidence cards, distributed recognition badges, a centered overlaid claim, and a separate positioning strapline. Slides support previous/next controls, pagination, pause/resume, keyboard arrows, reduced-motion behavior, and configurable autoplay timing.

## Vitelle — 10 PNGs

| PNG | Decision | Library mapping |
| --- | --- | --- |
| 01 Header | Existing | `SiteHeader-001`; pale visual treatment is theme-level |
| 02 Hero | Component | `RecognitionBackdropHero-001` |
| 03 Startup introduction | Existing | Section heading + action; composition evidence for a low-friction opening |
| 04 Brand showcase video | Component | `ImmersiveMediaStage-001`; blurred backdrop, framed focal media, and overlaid action hierarchy |
| 05 Why choose us | Existing | Evidence/benefit grid; `ProofColumns-001` |
| 06 Facility video | Component family | Facility media proof; `FacilityGallery-001` / media route structure |
| 07 Product collections | Existing | `ProductMosaic-001` / `ProductFamilies-001` |
| 08 Education videos | Component | `DualMediaRoutes-001` |
| 09 Private-label process | Existing + composition evidence | `ProcessCards-001`; decorative lead-in remains composition/media treatment |
| 10 Footer | Existing | `SiteFooter-001` |

## Créer — 15 PNGs

| PNG | Decision | Library mapping |
| --- | --- | --- |
| 01 Announcement | Existing | Utility text in `SiteHeader-001`; standalone announcement bar may be added with real need |
| 02 Header | Existing | `SiteHeader-001`; condensed typography is theme-level |
| 03 Hero | Existing | `ArcFactoryHero-001` is the retained split-media Hero; dark editorial treatment remains theme-level |
| 04 Services marquee | Component | `ServiceMarquee-001`; CSS motion pauses on interaction and becomes scrollable static content under reduced motion |
| 05 What-we-do intro | Variant | Oversized chapter heading treatment, not a new content purpose |
| 06 Product development | Component | `ServiceChapterAccordion-001` |
| 07 Brand creation | Existing | Alternating media/content chapter; `EvidenceFeature-001` treatment |
| 08 Creative services | Component | `ServiceChapterAccordion-001` |
| 09 Why us | Existing | Numbered benefits; `ProofColumns-001` / `ProcessCards-001` depending content |
| 10 Philosophy | Component | `PrinciplesLedger-001`; oversized introduction and ruled title/description rows |
| 11 Free services | Existing | Promotional cards; content-specific use of equal card grid |
| 12 Standards | Component | `StandardsProofRow-001` |
| 13 Vision | Existing | Media/text split plus CTA; `EvidenceFeature-001` |
| 14 Value marquee | Existing | `ServiceMarquee-001` with value-oriented content |
| 15 Footer | Existing | `SiteFooter-001`; newsletter interaction remains out of scope |

## Laeyo — 12 PNGs

| PNG | Decision | Library mapping |
| --- | --- | --- |
| 01 Header | Existing | `SiteHeader-001` |
| 02 Hero | Component | `ArcFactoryHero-001`; broad copy field, panoramic facility media, and dominant curved transition |
| 03 Factory visit | Existing | `FacilityOverview-001` / `DualMediaRoutes-001` for remote and onsite routes |
| 04 Buyer types | Component | `BuyerTypeMatrix-001` |
| 05 Launch paths | Existing | `BuyerPathways-001` / `SplitPathways-001` |
| 06 Product programs | Existing | `ProductFamilies-001` / `ProductCategoryList-001` |
| 07 MOQ and lead time | Component | `CommercialConditionsTable-001` |
| 08 Sampling workflow | Existing | `ProcessSteps-001` / `HorizontalProcess-001` |
| 09 Capabilities | Existing | `CapabilityMatrix-001` |
| 10 Audit proof | Component | `AuditProofHub-001` |
| 11 RFQ | Existing | `ResourceConversionPanel-001` for preparation; form behavior deferred to client integration |
| 12 Footer | Existing | `SiteFooter-001` |

## RainShadow — 9 PNGs

| PNG | Decision | Library mapping |
| --- | --- | --- |
| 01 Header | Existing | `SiteHeader-001` |
| 02 Hero | Existing | Soft visual variant of Statement split; not a new pattern |
| 03 Trust bar | Component | `FloatingTrustBar-001` |
| 04 Service paths | Existing | `BuyerPathways-001` |
| 05 Financing promotion | Existing | Promotional CTA/card treatment; financing facts are client configuration |
| 06 Product categories | Existing | `ProductMosaic-001` |
| 07 Featured products | Component | `ProductCutoutShelf-001`; four sparse product cutouts and one collection action |
| 08 Company introduction | Existing | `EvidenceFeature-001` / composition evidence for late company proof |
| 09 Footer | Existing | `SiteFooter-001` |

## Romano — 14 PNGs

| PNG | Decision | Library mapping |
| --- | --- | --- |
| 01 Header | Existing | `SiteHeader-001` |
| 02 Hero | Excluded evidence | Capture is blank; no UI structure inferred |
| 03 Trust bar | Existing | `FloatingTrustBar-001` / `ProofStrip-001` |
| 04 Service paths | Existing | `BuyerPathways-001` |
| 05 Product categories | Existing | `ProductFamilies-001` / `ProductMosaic-001` |
| 06 Process | Existing | `HorizontalProcess-001` / `ProcessCards-001` |
| 07 Laboratory | Existing | `FacilityOverview-001` / `QualityEvidenceMatrix-001` |
| 08 Company journey | Component | `CompanyTimeline-001` |
| 09 Testimonials | Component | `VerifiedTestimonialCards-001`; typed attribution, optional rating, and mandatory verification status |
| 10 Resources | Component family | `AuditProofHub-001`; downloadable assets require integration |
| 11 Lead magnet | Component | `ResourceConversionPanel-001` |
| 12 Quote form | Deferred interaction | Contact/RFQ form belongs to Phase 8 client integration |
| 13 Social feed | Deferred | External feed and privacy/performance need documented requirements |
| 14 Footer | Existing | `SiteFooter-001` |

## YG Laboratories — 6 PNGs

| PNG | Decision | Library mapping |
| --- | --- | --- |
| 01 Header | Existing | `SiteHeader-001` |
| 02 Hero | Existing/variant | Experience-led full-width media Hero; recognition or centered proof depending supplied evidence |
| 03 Science positioning | Existing | `EvidenceFeature-001` |
| 04 Value pillars | Existing | `ProofColumns-001` / `ProofStrip-001` |
| 05 Best-selling products | Component | `GatedProductSpotlight-001`; isolated product and explicit controlled-access message |
| 06 Footer | Existing | `SiteFooter-001` |

## Implemented expansion

The PNG re-audit added these independent reusable structures:

1. `RecognitionBackdropHero-001`
2. `FloatingTrustBar-001`
3. `ServiceChapterAccordion-001`
4. `BuyerTypeMatrix-001`
5. `CommercialConditionsTable-001`
6. `AuditProofHub-001`
7. `DualMediaRoutes-001`
8. `CompanyTimeline-001`
9. `StandardsProofRow-001`
10. `ResourceConversionPanel-001`
11. `ArcFactoryHero-001`
12. `ImmersiveMediaStage-001`
13. `ServiceMarquee-001`
14. `PrinciplesLedger-001`
15. `ProductCutoutShelf-001`
16. `GatedProductSpotlight-001`
17. `VerifiedTestimonialCards-001`

They are available at `/library/patterns/png-derived/`. All are `Review`, not `Approved`.

## Remaining genuinely distinct candidates

These were not collapsed into existing components, but remain deferred until their behavior or content domain is explicitly approved:

- RFQ form workflow;
- social feed integration.
