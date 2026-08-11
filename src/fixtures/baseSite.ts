import type { ComponentProps } from "astro/types";

import AboutPage from "../components/compositions/AboutPage.astro";
import CapabilitiesPage from "../components/compositions/CapabilitiesPage.astro";
import ContactPage from "../components/compositions/ContactPage.astro";
import LaunchHomepage from "../components/compositions/LaunchHomepage.astro";
import ProductsPage from "../components/compositions/ProductsPage.astro";
import type SiteFooter from "../components/sections/SiteFooter.astro";
import type SiteHeader from "../components/sections/SiteHeader.astro";

export const baseSitePaths = {
  home: "/library/base-site/",
  products: "/library/base-site/products/",
  capabilities: "/library/base-site/capabilities/",
  about: "/library/base-site/about/",
  contact: "/library/base-site/contact/",
} as const;

const navigation = [
  { href: baseSitePaths.home, label: "Home" },
  { href: baseSitePaths.products, label: "Products" },
  { href: baseSitePaths.capabilities, label: "Capabilities" },
  { href: baseSitePaths.about, label: "About" },
  { href: baseSitePaths.contact, label: "Contact" },
] as const;

export const createBaseSiteShell = (currentPath: string) => ({
  header: {
    brand: "Manufacturer Site Review",
    homeHref: baseSitePaths.home,
    navigation,
    currentPath,
    utilityText: "Internal five-page structure review — all supplier facts are placeholders",
    inquiryAction: {
      href: baseSitePaths.contact,
      label: "Prepare an inquiry",
    },
  } satisfies ComponentProps<typeof SiteHeader>,
  footer: {
    brand: "Manufacturer Site Review",
    description:
      "A neutral fixture for reviewing reusable B2B page structure. It does not represent a real manufacturer or commercial offer.",
    linkGroups: [
      {
        title: "Explore",
        links: navigation.slice(0, 3),
      },
      {
        title: "Company",
        links: navigation.slice(3),
      },
    ],
    contactActions: [{ href: baseSitePaths.contact, label: "Review contact options" }],
    copyrightLabel: "Internal review fixture. No client identity or supplier claims included.",
  } satisfies ComponentProps<typeof SiteFooter>,
});

export const homePage = {
  id: "main-content",
  hero: {
    id: "home-start",
    eyebrow: "Five-page site review",
    title: "Start with the decisions that make a project easier to evaluate.",
    description:
      "A neutral B2B site structure for choosing a product direction, reviewing capability evidence, and preparing a useful first inquiry.",
    primaryAction: { href: baseSitePaths.contact, label: "Prepare an inquiry" },
    secondaryAction: { href: baseSitePaths.products, label: "Explore product directions" },
    media: {
      src: "/review-assets/launch-hero.svg",
      alt: "Abstract branching path connecting a product idea to review decisions",
      width: 1200,
      height: 1400,
    },
  },
  proof: {
    label: "Evaluation principles",
    items: [
      { title: "Define the starting point", detail: "Separate decided inputs from open questions." },
      { title: "Review before estimating", detail: "Make scope factors visible before terms." },
      { title: "Ask for evidence", detail: "Tie important claims to reviewable material." },
      { title: "Name decision owners", detail: "Clarify buyer and supplier responsibilities." },
    ],
  },
  pathways: {
    id: "home-pathways",
    eyebrow: "Choose a route",
    title: "Follow the question that matters most now.",
    description: "Each route connects to a dedicated page rather than forcing every detail into the homepage.",
    pathways: [
      {
        title: "Clarify the range",
        description: "Review a small number of product families and the decisions needed to compare them.",
        decisionCue: "Useful when the category or routine is still being shaped.",
        action: { href: baseSitePaths.products, label: "Visit Products" },
      },
      {
        title: "Evaluate execution",
        description: "Understand inputs, outputs, checkpoints, and evidence across the project sequence.",
        decisionCue: "Useful when procurement or technical fit is the priority.",
        action: { href: baseSitePaths.capabilities, label: "Visit Capabilities" },
      },
      {
        title: "Prepare the conversation",
        description: "Bring the minimum context needed for a bounded and useful first response.",
        decisionCue: "Useful when the next decision depends on supplier feedback.",
        action: { href: baseSitePaths.contact, label: "Visit Contact" },
      },
    ],
  },
  products: {
    id: "home-products",
    eyebrow: "Product framing",
    title: "Use a focused range to begin comparison.",
    description: "These fictional groups demonstrate information structure, not stock, formulas, or availability.",
    families: [
      {
        name: "Daily routine directions",
        description: "Frame familiar use roles and the decisions needed to keep an initial range coherent.",
        media: {
          src: "/review-assets/launch-daily.svg",
          alt: "Abstract vessels representing a compact daily routine",
          width: 800,
          height: 600,
        },
        action: { href: baseSitePaths.products, label: "Review product structure" },
      },
      {
        name: "Focused care directions",
        description: "Organize a narrower use case around expectations, evidence, and packaging questions.",
        media: {
          src: "/review-assets/launch-focused.svg",
          alt: "Abstract vessel connected to three review points",
          width: 800,
          height: 600,
        },
        action: { href: baseSitePaths.products, label: "Review product structure" },
      },
      {
        name: "Body care directions",
        description: "Compare format and routine possibilities while keeping pack assumptions explicit.",
        media: {
          src: "/review-assets/launch-body.svg",
          alt: "Abstract jar and flowing shapes representing body care",
          width: 800,
          height: 600,
        },
        action: { href: baseSitePaths.products, label: "Review product structure" },
      },
    ],
  },
  readiness: {
    id: "home-readiness",
    eyebrow: "Project readiness",
    title: "Understand what changes scope before asking for terms.",
    description: "Minimums, timing, and complexity depend on verified inputs; this fixture makes no commercial promise.",
    labels: { buyerInput: "What to prepare", supplierOutput: "What to confirm", evidence: "Why it matters" },
    items: [
      {
        name: "Product scope",
        description: "Define routine role and priority directions.",
        buyerInput: "Audience, intended use, and what can be deferred.",
        supplierOutput: "A bounded scope and unresolved questions.",
        evidenceNote: "Scope maturity changes the evaluation work required.",
      },
      {
        name: "Packaging status",
        description: "Separate selected, preferred, and open pack decisions.",
        buyerInput: "Format, artwork status, and constraints.",
        supplierOutput: "Compatibility questions and sourcing dependencies.",
        evidenceNote: "Packaging affects review sequence and feasibility.",
      },
      {
        name: "Evidence needs",
        description: "Identify statements and acceptance criteria that need support.",
        buyerInput: "Market context and intended claims.",
        supplierOutput: "Available evidence and further validation needs.",
        evidenceNote: "Evidence requirements change approval gates.",
      },
    ],
  },
  evidence: {
    id: "home-evidence",
    eyebrow: "Reduce uncertainty",
    title: "Keep fixed decisions, preferences, and evidence needs separate.",
    description: "Clear boundaries help both parties understand what can be assessed and what remains conditional.",
    points: [
      { title: "State what is fixed", description: "Protect constraints that cannot change." },
      { title: "Name acceptable alternatives", description: "Show where comparison remains useful." },
      { title: "Define approval evidence", description: "Connect decisions to reviewable outputs." },
    ],
    media: {
      src: "/review-assets/launch-evidence.svg",
      alt: "Abstract funnel organizing questions into clear review decisions",
      width: 1200,
      height: 900,
      aspect: "landscape",
    },
    mediaPosition: "end",
    action: { href: baseSitePaths.capabilities, label: "Review capability evidence" },
  },
  process: {
    id: "home-process",
    eyebrow: "Starting sequence",
    title: "Move from an idea to an assessable brief.",
    steps: [
      {
        title: "Frame the opportunity",
        description: "Describe the audience, use context, market, and constraints.",
        buyerAction: "Share known facts and priorities.",
        supplierAction: "Identify context required to assess fit.",
      },
      {
        title: "Choose the route",
        description: "Match the conversation to the maturity of product and packaging decisions.",
        buyerAction: "Name fixed and flexible inputs.",
        supplierAction: "Explain dependencies for the selected route.",
      },
      {
        title: "Define the next output",
        description: "Agree what evidence or answer is needed to move forward.",
        buyerAction: "Name the next decision owner.",
        supplierAction: "Bound the response to verified information.",
      },
    ],
  },
  inquiry: {
    id: "home-inquiry",
    eyebrow: "Next step",
    title: "Bring enough context to receive a useful next question.",
    description: "The contact page demonstrates channel choice and brief preparation without submitting data.",
    preparationItems: ["Audience and market", "Product direction", "Packaging status", "Next decision needed"],
    primaryAction: { href: baseSitePaths.contact, label: "Prepare the inquiry" },
    secondaryAction: { href: baseSitePaths.capabilities, label: "Review capabilities first" },
  },
} satisfies ComponentProps<typeof LaunchHomepage>;

export const productsPage = {
  intro: {
    id: "products-intro",
    eyebrow: "Product directions",
    title: "Define the range before comparing individual options.",
    description:
      "A B2B product page should help a buyer narrow routine roles, formats, packaging questions, and evidence needs without behaving like an online store.",
    primaryAction: { href: baseSitePaths.contact, label: "Discuss a product brief" },
    breadcrumbs: [{ label: "Home", href: baseSitePaths.home }, { label: "Products" }],
  },
  products: {
    id: "product-families",
    eyebrow: "Review categories",
    title: "Compare a small set of fictional product families.",
    description: "These categories validate reusable content structure only and do not indicate supplier availability.",
    families: [
      {
        name: "Routine foundations",
        description: "Organize cleansing, preparation, and daily care roles around intended use and pack context.",
        media: { src: "/review-assets/product-daily.svg", alt: "Abstract daily routine product forms", width: 900, height: 700 },
        action: { href: baseSitePaths.contact, label: "Frame this direction" },
      },
      {
        name: "Targeted formats",
        description: "Define a focused use case, texture expectation, evidence question, and evaluation criteria.",
        media: { src: "/review-assets/product-targeted.svg", alt: "Abstract targeted care product form", width: 900, height: 700 },
        action: { href: baseSitePaths.contact, label: "Frame this direction" },
      },
      {
        name: "Extended rituals",
        description: "Explore body or treatment steps while keeping format and packaging dependencies visible.",
        media: { src: "/review-assets/product-ritual.svg", alt: "Abstract extended care ritual forms", width: 900, height: 700 },
        action: { href: baseSitePaths.contact, label: "Frame this direction" },
      },
    ],
  },
  evidence: {
    id: "product-evidence",
    eyebrow: "Evaluation inputs",
    title: "A category name is only the start of a usable brief.",
    description: "Connect each direction to intended use, format, pack context, and the evidence required for review.",
    points: [
      { title: "Routine role", description: "Explain where the product belongs and what it should contribute." },
      { title: "Format and pack", description: "Make presentation assumptions and compatibility questions visible." },
      { title: "Acceptance criteria", description: "State what must be assessed before the direction advances." },
    ],
    media: { src: "/review-assets/premium-evidence.svg", alt: "Abstract layers connecting a product brief to evidence", width: 1200, height: 900, aspect: "landscape" },
    action: { href: baseSitePaths.capabilities, label: "See how capabilities are reviewed" },
  },
  inquiry: {
    id: "products-inquiry",
    eyebrow: "Product inquiry",
    title: "Bring a focused direction, not a finished specification.",
    description: "Share what is known and label what still needs supplier input.",
    preparationItems: ["Intended user and market", "Routine role", "Preferred format", "Packaging status"],
    primaryAction: { href: baseSitePaths.contact, label: "Prepare a product inquiry" },
    secondaryAction: { href: baseSitePaths.capabilities, label: "Review capability stages" },
  },
} satisfies ComponentProps<typeof ProductsPage>;

export const capabilitiesPage = {
  intro: {
    id: "capabilities-intro",
    eyebrow: "Execution clarity",
    title: "Evaluate responsibilities and evidence across the project.",
    description:
      "Capability is useful when a buyer can see the required input, expected output, review gate, and boundary at each stage.",
    primaryAction: { href: baseSitePaths.contact, label: "Discuss project fit" },
    breadcrumbs: [{ label: "Home", href: baseSitePaths.home }, { label: "Capabilities" }],
  },
  capabilities: {
    id: "capability-scope",
    eyebrow: "Capability map",
    title: "Connect each stage to a concrete review question.",
    description: "The entries describe evaluation structure rather than verified supplier services or capacity.",
    items: [
      { name: "Brief review", description: "Check whether the opportunity and constraints are sufficiently clear.", buyerInput: "Audience, market, intended use, priorities.", supplierOutput: "Fit questions, dependencies, and bounded next steps.", evidenceNote: "Written scope and unresolved-question log." },
      { name: "Direction evaluation", description: "Compare possible routes against the accepted brief.", buyerInput: "Preferences, exclusions, evaluation criteria.", supplierOutput: "Options with trade-offs and review needs.", evidenceNote: "Comparison record and decision rationale." },
      { name: "Sample review", description: "Assess an agreed direction against stated criteria.", buyerInput: "Named reviewers and acceptance feedback.", supplierOutput: "Documented iteration and open issues.", evidenceNote: "Sample record appropriate to the project." },
      { name: "Production readiness", description: "Confirm dependencies before a production decision.", buyerInput: "Approved scope, pack status, and destination needs.", supplierOutput: "Readiness gaps and required confirmations.", evidenceNote: "Approval and traceability records to request." },
    ],
  },
  quality: {
    id: "capability-quality",
    eyebrow: "Quality framework",
    title: "Place control questions where decisions are made.",
    description: "No certification or test is assumed; a client must supply verified facts and available evidence.",
    checkpoints: [
      { stage: "Input definition", controlPurpose: "Prevent unclear requirements from becoming hidden assumptions.", evidenceType: "Approved brief and change record" },
      { stage: "Direction review", controlPurpose: "Compare outputs against agreed criteria and intended use.", evidenceType: "Review notes appropriate to scope" },
      { stage: "Readiness gate", controlPurpose: "Confirm product, pack, and evidence dependencies before approval.", evidenceType: "Signed or recorded approval status" },
    ],
    verificationAction: { href: baseSitePaths.about, label: "See company evidence context" },
  },
  process: {
    id: "capability-process",
    eyebrow: "Working sequence",
    title: "Keep buyer and supplier responsibilities visible.",
    steps: [
      { title: "Qualify the brief", description: "Establish fit, constraints, and the decisions still open.", buyerAction: "Provide known context and priorities.", supplierAction: "Identify missing inputs and boundaries." },
      { title: "Review a direction", description: "Compare an agreed route against the brief and evidence needs.", buyerAction: "Apply stated acceptance criteria.", supplierAction: "Document outputs and unresolved questions." },
      { title: "Confirm readiness", description: "Close required product, packaging, and approval dependencies.", buyerAction: "Provide accountable approval.", supplierAction: "Confirm what can proceed and what remains conditional." },
    ],
  },
  inquiry: {
    id: "capabilities-inquiry",
    eyebrow: "Capability inquiry",
    title: "Ask for the evidence connected to your next decision.",
    description: "A useful inquiry names the stage, required output, and acceptance question.",
    preparationItems: ["Current project stage", "Required supplier output", "Approval criteria", "Known dependencies"],
    primaryAction: { href: baseSitePaths.contact, label: "Prepare a capability inquiry" },
    secondaryAction: { href: baseSitePaths.about, label: "Review company context" },
  },
} satisfies ComponentProps<typeof CapabilitiesPage>;

export const aboutPage = {
  intro: {
    id: "about-intro",
    eyebrow: "Company evidence",
    title: "Connect the company story to facts a buyer can review.",
    description:
      "An About page should explain operating context, relevant environments, and working principles without replacing verification with generic claims.",
    primaryAction: { href: baseSitePaths.contact, label: "Request relevant context" },
    breadcrumbs: [{ label: "Home", href: baseSitePaths.home }, { label: "About" }],
  },
  facility: {
    id: "about-facility",
    eyebrow: "Operating context",
    title: "Show which environments matter to the buyer's project.",
    description: "These fictional areas test the information hierarchy and do not describe a real facility.",
    media: { src: "/review-assets/manufacturing-facility.svg", alt: "Abstract plan of connected manufacturing review areas", width: 1200, height: 900, aspect: "landscape" },
    areas: [
      { name: "Brief and development context", description: "Where requirements, boundaries, and evaluation criteria are organized.", evidenceNote: "Review the records used to control changes." },
      { name: "Production context", description: "Where process scope and material movement would be explained.", evidenceNote: "Request evidence relevant to the proposed product." },
      { name: "Quality context", description: "Where checkpoints, release responsibilities, and traceability are described.", evidenceNote: "Verify available records rather than assuming certification." },
    ],
    verificationNote: "Client facts, facility media, certifications, and visit terms must be verified before publication.",
    primaryAction: { href: baseSitePaths.contact, label: "Ask what can be reviewed" },
  },
  evidence: {
    id: "about-method",
    eyebrow: "Working principles",
    title: "Use operating evidence to support positioning.",
    description: "The page separates a marketing statement from the records, responsibilities, and review routes behind it.",
    points: [
      { title: "Scope before promise", description: "Commercial terms follow verified project inputs." },
      { title: "Ownership before handoff", description: "Decision responsibility remains visible across stages." },
      { title: "Evidence before claim", description: "Published statements require client-provided support." },
    ],
    media: { src: "/review-assets/manufacturing-body.svg", alt: "Abstract connected stages representing an evidence-led working method", width: 1200, height: 900, aspect: "landscape" },
    mediaPosition: "end",
    action: { href: baseSitePaths.capabilities, label: "Review the capability framework" },
  },
  quality: {
    id: "about-quality",
    eyebrow: "Trust boundaries",
    title: "Make verification routes explicit.",
    checkpoints: [
      { stage: "Published facts", controlPurpose: "Separate verified client facts from neutral component defaults.", evidenceType: "Client-approved source record" },
      { stage: "Project claims", controlPurpose: "Tie proposed outcomes to scope and acceptance criteria.", evidenceType: "Project-specific review material" },
      { stage: "Ongoing accuracy", controlPurpose: "Identify information that needs periodic confirmation.", evidenceType: "Named owner and review date" },
    ],
  },
  inquiry: {
    id: "about-inquiry",
    eyebrow: "Evidence request",
    title: "Ask for context relevant to your project, not every available document.",
    preparationItems: ["Product direction", "Destination market", "Required evidence", "Current evaluation stage"],
    primaryAction: { href: baseSitePaths.contact, label: "Prepare an evidence request" },
    secondaryAction: { href: baseSitePaths.products, label: "Review product directions" },
  },
} satisfies ComponentProps<typeof AboutPage>;

export const contactPage = {
  intro: {
    id: "contact-intro",
    eyebrow: "Inquiry preparation",
    title: "Choose a clear route for the next useful conversation.",
    description:
      "This static contact page demonstrates channel hierarchy and preparation guidance. It does not submit information or promise a response time.",
    breadcrumbs: [{ label: "Home", href: baseSitePaths.home }, { label: "Contact" }],
  },
  contact: {
    id: "contact-options",
    eyebrow: "Contact routes",
    title: "Use the subject that matches the decision you need to make.",
    description: "The addresses below use the reserved example.com domain and do not reach a supplier.",
    options: [
      { label: "Product brief review", value: "review@example.com", href: "mailto:review@example.com?subject=Product%20brief%20review", description: "For product direction, routine role, format, and packaging questions." },
      { label: "Capability evidence request", value: "evidence@example.com", href: "mailto:evidence@example.com?subject=Capability%20evidence%20request", description: "For process scope, quality checkpoints, and evidence availability questions." },
    ],
    preparationTitle: "Include the minimum useful context",
    preparationItems: ["Company and destination market", "Product direction or use case", "Packaging status", "Evidence or decision needed next"],
    followUpNote: "Commercial terms, minimums, timing, certification, and availability must be confirmed from verified client information.",
  },
} satisfies ComponentProps<typeof ContactPage>;
