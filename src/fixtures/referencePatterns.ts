import type {
  BuyerMatrixContent,
  CommercialConditionsContent,
  DualMediaRoutesContent,
  HeroContent,
  ImmersiveMediaContent,
  MarqueeContent,
  PrinciplesContent,
  ProductShelfContent,
  GatedProductContent,
  TestimonialsContent,
  RecognitionHeroContent,
  ResourceCTAContent,
  ResourceHubContent,
  ServiceChapterContent,
  StandardsRowContent,
  TimelineContent,
  TrustBarContent,
} from "../content-models/sections";

const contact = { href: "/library/base-site/contact/", label: "Discuss your project" } as const;

export const arcFactoryHero = {
  eyebrow: "Manufacturing evidence",
  title: "Fast sampling, clear project gates, export-ready support.",
  description: "Use the opening screen to pair a concise procurement proposition with a wide facility view. Every quantity, timing, certification, and market claim still requires client verification.",
  primaryAction: { href: "/library/base-site/capabilities/", label: "Review capabilities" },
  secondaryAction: contact,
  media: { src: "/review-assets/manufacturing-facility.svg", alt: "Original abstract manufacturing facility artwork", width: 1200, height: 900, aspect: "landscape" },
  proofItems: ["Sampling route to confirm", "Quality evidence to review", "Export scope to verify"],
} satisfies HeroContent;

export const immersiveMedia = {
  eyebrow: "Brand program",
  title: "See how a product direction becomes a coherent range.",
  description: "A single media-led story can introduce a brand program, facility tour, or development outcome without pretending that a static review asset is playable video.",
  media: { src: "/review-assets/product-ritual.svg", alt: "Original review artwork showing a coordinated product range", width: 1200, height: 900, aspect: "landscape" },
  action: { href: "/library/base-site/products/", label: "Explore the product story" },
  actionLabel: "Open product story",
} satisfies ImmersiveMediaContent;

export const serviceMarquee = {
  label: "Available service directions",
  items: ["Product R&D", "Private label", "Custom formulation", "Packaging support", "Quality planning"],
  speedSeconds: 32,
} satisfies MarqueeContent;

export const principlesLedger = {
  eyebrow: "Operating principles",
  title: "How we approach each project",
  description: "Principles are configurable positioning content. Replace these review examples with statements the client can actually demonstrate.",
  media: { src: "/review-assets/premium-evidence.svg", alt: "Original abstract texture used behind the principles ledger", width: 1200, height: 900, aspect: "landscape" },
  principles: [
    { title: "Evidence before claims", description: "Connect every public statement to current, relevant material the buyer can review." },
    { title: "Decisions before decoration", description: "Clarify product, packaging, market, and approval responsibilities before visual polish obscures open questions." },
    { title: "A visible project route", description: "Show which inputs belong to the buyer, which outputs belong to the supplier, and where both sides approve progress." },
    { title: "Commercial clarity", description: "Explain the conditions that change quantity, timing, testing, and documentation instead of publishing universal promises." },
  ],
} satisfies PrinciplesContent;

export const productCutoutShelf = {
  eyebrow: "Ready-made directions",
  title: "Featured product concepts",
  description: "Use a sparse shelf when the buyer should compare a small, intentionally selected set rather than browse a full catalogue.",
  products: [
    { name: "Daily cleansing gel", category: "Cleanser direction", detail: "Formula, pack, and availability to verify", media: { src: "/review-assets/product-daily.svg", alt: "Original review artwork for a daily cleansing product direction", width: 900, height: 700 } },
    { name: "Barrier-support serum", category: "Serum direction", detail: "Claims and testing route to verify", media: { src: "/review-assets/product-targeted.svg", alt: "Original review artwork for a targeted serum direction", width: 900, height: 700 } },
    { name: "Clarifying treatment", category: "Treatment direction", detail: "Ingredients and market fit to confirm", media: { src: "/review-assets/launch-daily.svg", alt: "Original review artwork for a clarifying treatment direction", width: 800, height: 600 } },
    { name: "Multi-use body gel", category: "Body-care direction", detail: "Packaging compatibility to confirm", media: { src: "/review-assets/launch-body.svg", alt: "Original review artwork for a body-care gel direction", width: 800, height: 600 } },
  ],
  action: { href: "/library/base-site/products/", label: "View all product directions" },
  note: "Product names and availability are review examples, not a live catalogue.",
} satisfies ProductShelfContent;

export const gatedProductSpotlight = {
  eyebrow: "Controlled catalogue access",
  title: "Selected product spotlight",
  description: "This deliberately sparse structure is only appropriate when account approval or controlled pricing is a real part of the buyer journey.",
  product: { name: "Concentrated renewal serum", category: "Professional programme", detail: "Specification, availability, and commercial terms require account review.", media: { src: "/review-assets/premium-hero.svg", alt: "Original review artwork for a concentrated professional serum", width: 1200, height: 1400 } },
  accessLabel: "Commercial terms available to approved accounts",
  accessAction: { href: "/library/base-site/contact/", label: "Request catalogue access" },
  note: "Do not use gated pricing unless the client operates an actual account approval process.",
} satisfies GatedProductContent;

export const verifiedTestimonials = {
  eyebrow: "Client evidence",
  title: "Approved client perspectives",
  description: "The card structure can hold real client feedback, but every quote, identity, role, rating, and organization must be approved for publication.",
  testimonials: [
    { quote: "The project checkpoints gave our team a clear way to review decisions before moving forward.", attribution: "Approved client name", role: "Role to verify", organization: "Organization to verify", rating: 5, verificationStatus: "Review example — not publishable" },
    { quote: "Responsibilities for product, packaging, and evidence were visible throughout the programme.", attribution: "Approved client name", role: "Role to verify", organization: "Organization to verify", rating: 5, verificationStatus: "Review example — not publishable" },
    { quote: "The final route reflected the commercial constraints we had confirmed at the start.", attribution: "Approved client name", role: "Role to verify", organization: "Organization to verify", rating: 5, verificationStatus: "Review example — not publishable" },
  ],
  note: "Remove ratings when the source approval covers a quote but not a numerical score.",
} satisfies TestimonialsContent;

export const recognitionHero = {
  eyebrow: "Verified recognition — review example",
  autoplayMs: 6000,
  slides: [
    {
      title: "Recognized product development",
      media: { src: "/review-assets/product-targeted.svg", alt: "Original review artwork representing an editorial product feature", width: 900, height: 700, aspect: "landscape" },
      href: contact.href,
      action: contact,
    },
    {
      title: "Your product story, made visible",
      media: { src: "/review-assets/manufacturing-facility.svg", alt: "Original review artwork representing manufacturing evidence", width: 1200, height: 900, aspect: "landscape" },
      href: "/library/base-site/capabilities/",
      action: { href: "/library/base-site/capabilities/", label: "Review capabilities" },
    },
    {
      title: "Evidence buyers can examine",
      media: { src: "/review-assets/launch-evidence.svg", alt: "Original review artwork representing verification records", width: 1200, height: 900, aspect: "landscape" },
      href: "/library/base-site/about/",
      action: { href: "/library/base-site/about/", label: "Review company evidence" },
    },
  ],
} satisfies RecognitionHeroContent;

export const floatingTrust = {
  label: "Example trust summary",
  items: [
    { title: "Formula routes", detail: "Scope to confirm" },
    { title: "Packaging support", detail: "Responsibilities to define" },
    { title: "Quality records", detail: "Evidence to request" },
    { title: "Commercial fit", detail: "Quantity dependent" },
    { title: "Export preparation", detail: "Market dependent" },
  ],
} satisfies TrustBarContent;

export const serviceChapter = {
  eyebrow: "Service chapter",
  title: "Product development",
  description: "A cinematic service section can explain one active capability while keeping adjacent services available without duplicating entire sections.",
  media: { src: "/review-assets/product-targeted.svg", alt: "Abstract close-up skincare texture and packaging composition", width: 900, height: 700, aspect: "square" },
  items: [
    { title: "Private label", description: "Begin from an available direction, then confirm product, packaging, claims, and market fit.", points: ["Product shortlist", "Packaging coordination", "Approval checkpoints"], action: contact },
    { title: "Custom formulation", description: "Define the desired experience, evidence, exclusions, and evaluation route before development begins." },
    { title: "Regulatory coordination", description: "Clarify what the manufacturer supplies and which market-specific review remains the buyer's responsibility." },
  ],
} satisfies ServiceChapterContent;

export const buyerMatrix = {
  eyebrow: "Buyer fit",
  title: "Show each buyer what a useful project route looks like.",
  description: "The same supplier can present different deliverables without pretending every buyer needs the same process.",
  buyers: [
    { name: "Brand owners", description: "Build a focused range with coherent positioning.", typicalNeed: "Line architecture and product priorities", deliverable: "Feasibility route and sampling checkpoints" },
    { name: "DTC sellers", description: "Launch with fewer dependencies and clearer review gates.", typicalNeed: "Packaging compatibility and claims review", deliverable: "Fast-bounded sampling route" },
    { name: "Retail programs", description: "Prepare repeatable specifications and replenishment assumptions.", typicalNeed: "Specification lock and quality traceability", deliverable: "Control points and documentation map" },
    { name: "Distributors", description: "Plan a market-appropriate portfolio across channels.", typicalNeed: "SKU selection and standardization", deliverable: "Portfolio inputs and commercial gating" },
  ], action: contact,
  note: "All deliverables are examples. Replace them with the real supplier's verified scope.",
} satisfies BuyerMatrixContent;

export const commercialConditions = {
  eyebrow: "Commercial clarity",
  title: "Explain what changes quantity and timing.",
  description: "A table can expose dependencies without publishing unsupported universal promises.",
  columns: ["Scenario", "Quantity basis", "Timing basis", "What changes the result"],
  rows: [
    { label: "Existing product direction", values: ["Project-dependent", "Sampling before production", "Packaging, decoration, review rounds"] },
    { label: "Custom development", values: ["Project-dependent", "Development-dependent", "Formula work, testing, compatibility"] },
    { label: "Documentation planning", values: ["Market-dependent", "Evidence-dependent", "Claims, channel, destination requirements"] },
  ],
  note: "Final quantities and lead times must follow a verified quotation.",
} satisfies CommercialConditionsContent;

export const auditHub = {
  eyebrow: "Trust center",
  title: "Give buyers multiple ways to verify the supplier.",
  description: "Evidence becomes more useful when it is organized by buyer question instead of presented as an undifferentiated badge wall.",
  resources: [
    { title: "Company identity", description: "Legal entity, operating location, and ownership of published facts.", action: { href: "#", label: "Review identity evidence" } },
    { title: "Compliance documents", description: "Scope, owner, issuer, validity, and market relevance.", action: { href: "#", label: "Review document pack" } },
    { title: "Factory process", description: "Production areas, controls, and responsibility boundaries.", action: { href: "#", label: "Review process evidence" } },
    { title: "Testing examples", description: "Examples appropriate to the proposed product and claims.", action: { href: "#", label: "Review testing routes" } },
    { title: "Quality records", description: "Incoming, in-process, release, and traceability records.", action: { href: "#", label: "Review quality evidence" } },
    { title: "Visit options", description: "Remote or onsite verification routes when genuinely available.", action: { href: "#", label: "Review visit options" } },
  ], note: "Every entry must be labelled standard, optional, or project/market dependent.",
} satisfies ResourceHubContent;

export const dualMediaRoutes = {
  eyebrow: "Education routes",
  title: "Let two audiences enter through different media stories.",
  description: "Useful for education, facility tours, founder onboarding, or product-program explanations.",
  routes: [
    { title: "Getting started", media: { src: "/review-assets/launch-hero.svg", alt: "Abstract starting route artwork", width: 1200, height: 1400 }, action: { href: "#", label: "Watch the introduction" } },
    { title: "Manufacturing program", media: { src: "/review-assets/manufacturing-facility.svg", alt: "Abstract manufacturing program artwork", width: 1200, height: 900 }, action: { href: "#", label: "Explore the facility route" } },
  ],
} satisfies DualMediaRoutesContent;

export const companyTimeline = {
  eyebrow: "Company story",
  title: "Connect milestones to verifiable change.",
  description: "Dates and metrics remain client content; the alternating timeline is the reusable UI structure.",
  milestones: [
    { label: "Foundation", title: "The operating model begins", description: "Explain the original focus without inventing legacy or scale." },
    { label: "Expansion", title: "A capability is added", description: "Tie growth to a real facility, team, certification, or service change." },
    { label: "Today", title: "Current scope", description: "State what the company can verify now, not an unsupported future promise." },
  ], metrics: [{ value: "—", label: "Years to verify" }, { value: "—", label: "Projects to verify" }, { value: "—", label: "Markets to verify" }, { value: "—", label: "Current standard" }],
} satisfies TimelineContent;

export const standardsRow = {
  eyebrow: "Standards and readiness",
  title: "Show proof categories without copying third-party logos.",
  description: "When a client supplies approved marks, the same row can render them; until then it remains a neutral proof index.",
  standards: [
    { name: "Facility standard", detail: "Owner and scope to verify" },
    { name: "Quality system", detail: "Issuer and validity to verify" },
    { name: "Market readiness", detail: "Product and destination dependent" },
    { name: "Retail expectation", detail: "Channel dependent" },
    { name: "Claim evidence", detail: "Documentation dependent" },
  ], note: "Never infer certification from the existence of this component.",
} satisfies StandardsRowContent;

export const resourceConversion = {
  eyebrow: "Preparation resource",
  title: "Prepare the buyer before asking for a quote.",
  description: "This structure can offer a brief, checklist, brochure, or consultation route before the final RFQ.",
  preparationItems: ["Product and customer direction", "Destination market", "Packaging status", "Evidence expectations"],
  primaryAction: { href: "#", label: "Open the project checklist" },
  secondaryAction: contact,
  note: "Downloads, forms, and response-time promises require real integrations and verified policies.",
} satisfies ResourceCTAContent;
