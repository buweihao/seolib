# Site: Laeyo

## Source

- Original website/domain: https://laeyolabs.com/?laeyo_market=global (URL re-confirmed separately; supplied screenshots did not include capture metadata)
- Accessed: 2026-08-10 for the existing homepage package; additional screenshots received 2026-08-20
- Evidence: desktop full-page PNG, 1905 × 8024 px
- Mobile evidence: not provided in this batch
- Reference purpose: Study a procurement-focused OEM/ODM homepage that answers buyer-fit, MOQ, timing, audit, workflow, and RFQ questions in unusually explicit detail.

## Additional page evidence received 2026-08-20

| Page evidence | File | Capture state | UI questions to extract |
| --- | --- | --- | --- |
| Product listing | `screenshots/product-listing-desktop.png` | Desktop viewport crop, 1866 × 854 | How do product cards expose category, description, detail action, and RFQ action? |
| Product detail | `source/product-detail-full.png` | Desktop long capture, 1920 × 5453 | How do product facts, quote form, customization, packaging, MOQ, testing, FAQs, and sampling connect? |
| Manufacturing / capabilities | `source/capabilities-full.png` | Desktop long capture, 1920 × 5554 | How do quick actions, capability categories, sourcing guides, and RFQ inputs coexist? |
| About us | `source/about-full.png` | Desktop long capture, 1920 × 6285 | How do company facts, evidence links, facility proof, milestones, and quality sections build trust? |
| Contact | `screenshots/contact-desktop.png` | Desktop form crop, 913 × 853 | What fields and adjacent trust message are needed for a first inquiry? |

These files are research evidence only. They contain third-party branding, people, factory imagery, detailed claims, contact facts, and commercial statements that must not enter production content. The screenshots are not assumed to include mobile behavior; a mobile capture is still required before responsive decisions are finalized.

## Homepage Section Map

| # | Section | Purpose | Buyer Question | Visual Pattern |
| - | ------- | ------- | -------------- | -------------- |
| 1 | Header | Provides contact and deep manufacturing navigation | Can I reach the factory and find proof quickly? | Contact utility row over dark navigation |
| 2 | Hero | Establishes export-ready OEM/ODM positioning | Can this factory sample quickly and support my market? | Large proposition beside a factory photograph |
| 3 | Factory visit | Offers direct supplier verification | Can I inspect production before committing? | Text/checklist panel paired with factory video |
| 4 | Buyer types | Defines deliverables by customer model | Does this supplier understand buyers like me? | Four buyer cards with needs and outputs |
| 5 | Launch paths | Clarifies Private Label, ODM, and OEM choices | Which cooperation model fits my stage and risk? | Comparison table organized by priority and locked decisions |
| 6 | Product programs | Turns a broad catalog into sample-ready starting points | Which category and format should I shortlist? | Long two-column category cards with decision prompts |
| 7 | MOQ and lead time | Makes commercial constraints explicit | What MOQ and timeline should I expect? | Scenario table with acceleration levers |
| 8 | Sampling workflow | Defines gates and responsibilities | What gets confirmed at each step? | Six operational cards with buyer/supplier actions |
| 9 | Capabilities | Summarizes laboratory and manufacturing strengths | Does the factory have the technical depth I need? | Four tall capability cards |
| 10 | Audit proof | Routes buyers to evidence | What can I verify before issuing a PO? | Evidence-link grid framed as a trust center |
| 11 | RFQ | Specifies information exchange and response promise | What should I send and what will I receive? | Two-column promise panel and form |
| 12 | Footer | Extends the buyer research journey | Where can I find category FAQs and sourcing guides? | Deep resource-link footer |

## Content Structure Observations

This page behaves more like a procurement decision aid than a conventional brand homepage. It opens with manufacturing fit, immediately offers factory verification, then segments buyers and cooperation models before presenting the catalog. Product categories are framed as decisions to make early, not merely as merchandise. MOQ, lead time, sampling gates, capability proof, and audit evidence appear before the RFQ, progressively reducing commercial and technical uncertainty.

The strongest structural idea is the explicit contract between buyer inputs and supplier outputs. Each major block answers a procurement question and links toward deeper proof. This direction is especially relevant to Manufacturing compositions, though the density would need careful simplification.

## UI Pattern Observations

The visual system uses a narrow centered content column on a pale blue field, white rounded panels, dark navy headings, compact tables, and frequent inline pills. Information density is high but grouped consistently by bordered cards. Orange is reserved for selected high-priority contact actions; blue carries most other CTAs.

The screenshot tool repeatedly captured the fixed navigation bar at roughly viewport intervals. Those repeated bars are capture artifacts, not semantic sections. Several permanent crops necessarily preserve an overlapping navigation bar because altering the source would violate evidence integrity. Mobile behavior cannot be assessed.

## Potential Reusable Patterns

- Factory verification block with remote-tour and onsite-visit paths
- Buyer-type matrix tied to concrete deliverables
- Cooperation-model comparison based on risk and decision timing
- Category shortlist cards that state what to decide early
- MOQ/lead-time table with transparent acceleration levers
- Buyer/supplier responsibility workflow
- Audit-proof hub before RFQ
- RFQ promise that explains inputs, outputs, and response time

## Things We Should Not Copy

- Company-specific quantities, response times, certification language, factory images, and formula claims
- The repeated sticky-navigation artifacts in the supplied screenshot
- The exact card/pill styling or very long category copy
- Unsupported promises about sampling speed, documentation, or facility scale
- Dense category coverage when a client cannot maintain the information accurately

## Originality and Rights Check

- [x] Reference assets remain isolated from production source code
- [x] No HTML or CSS was copied
- [x] No copy, logos, photography, or video will be reused
- [x] Candidate patterns are recorded as abstract content/UI principles only

## Review Notes

- Review `07-moq-and-lead-time.png` through `11-rfq.png` with the source. Their semantic boundaries were visually refined, but repeated fixed navigation still obscures content inside each crop.
- `06-product-programs.png` is intentionally tall because one semantic category program spans multiple captured viewports.
- Component decision: none; human pattern review is required before Phase 3.

## Additional page review decision

- Product listing: extend the current category-first product flow with a reviewable product card variant; keep Product Families as the category entry.
- Product detail: extend the current neutral detail template with grouped commercial/evaluation blocks and an inquiry rail; keep all facts configurable and verification-gated.
- Manufacturing / capabilities: compose existing capability, process, quality, and inquiry patterns with a new quick-action/sidebar relationship if repeated across clients.
- About us: compose facility, evidence, timeline, quality, and contact sections; do not create a client-specific company-history component.
- Contact: extend the existing secure inquiry form with a configurable contact-context panel; do not copy the captured form fields or response promises verbatim.
