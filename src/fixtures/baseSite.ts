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
    brand: "Everglow Labs — Example",
    homeHref: baseSitePaths.home,
    navigation,
    currentPath,
    utilityText: "Fictional skincare manufacturer for layout review — not a real supplier or commercial offer",
    inquiryAction: { href: baseSitePaths.contact, label: "Request a quote" },
  } satisfies ComponentProps<typeof SiteHeader>,
  footer: {
    brand: "Everglow Labs — Example",
    description:
      "A fictional private-label skincare manufacturer used only to review page structure, component selection, and buyer journeys.",
    linkGroups: [
      { title: "Explore", links: navigation.slice(0, 3) },
      { title: "Company", links: navigation.slice(3) },
    ],
    contactActions: [{ href: baseSitePaths.contact, label: "Start a product inquiry" }],
    copyrightLabel: "Review fixture only. Products, capabilities, certifications, quantities, and timelines are examples, not supplier claims.",
  } satisfies ComponentProps<typeof SiteFooter>,
});

export const homePage = {
  id: "main-content",
  hero: {
    id: "home-start",
    eyebrow: "Private label skincare manufacturing — example",
    title: "Build a skincare range with a clear path from idea to production.",
    description:
      "This review homepage shows how a manufacturer could introduce private-label, semi-custom, and custom-development services to beauty brands. All service claims require client verification before publication.",
    primaryAction: { href: baseSitePaths.contact, label: "Discuss your project" },
    secondaryAction: { href: baseSitePaths.products, label: "Explore product categories" },
    media: {
      src: "/review-assets/launch-hero.svg",
      alt: "Abstract skincare packaging and project stages used as review artwork",
      width: 1200,
      height: 1400,
    },
  },
  proof: {
    label: "Example supplier support areas",
    items: [
      { title: "Product development", detail: "Formula selection or development support." },
      { title: "Packaging coordination", detail: "Primary pack and decoration questions." },
      { title: "Quality documentation", detail: "Project-specific records to verify." },
      { title: "Export preparation", detail: "Destination requirements to confirm." },
    ],
  },
  pathways: {
    id: "home-pathways",
    eyebrow: "Cooperation models",
    title: "Choose a starting route that matches your project.",
    description:
      "These common industry routes make the example easy to review. A real manufacturer must define the exact scope, minimums, costs, and timelines for each route.",
    pathways: [
      {
        title: "Private label",
        description: "Start from an existing product direction and focus on brand, packaging, and market requirements.",
        decisionCue: "Suitable when speed and a clearly bounded starting range matter most.",
        action: { href: baseSitePaths.products, label: "Browse product directions" },
      },
      {
        title: "Semi-custom",
        description: "Adapt selected product characteristics or packaging choices within an agreed development scope.",
        decisionCue: "Suitable when the brand wants differentiation without a fully custom program.",
        action: { href: baseSitePaths.capabilities, label: "Review development support" },
      },
      {
        title: "Custom development",
        description: "Build a project around a detailed brief, target experience, evidence needs, and packaging plan.",
        decisionCue: "Suitable when the concept and approval criteria are clearly defined.",
        action: { href: baseSitePaths.contact, label: "Prepare a custom brief" },
      },
    ],
  },
  products: {
    id: "home-products",
    eyebrow: "Product categories",
    title: "Explore product directions for your brand.",
    description:
      "The categories below are familiar skincare examples. They demonstrate navigation and content hierarchy, not actual stock or formula availability.",
    families: [
      {
        name: "Facial skincare",
        description: "Cleansers, toners, serums, moisturizers, masks, and other routine-focused product directions.",
        media: { src: "/review-assets/launch-daily.svg", alt: "Abstract facial skincare bottles and jars", width: 800, height: 600 },
        action: { href: baseSitePaths.products, label: "View facial skincare" },
      },
      {
        name: "Body care",
        description: "Body cleansers, lotions, creams, scrubs, oils, and targeted body-care directions.",
        media: { src: "/review-assets/launch-body.svg", alt: "Abstract body care jar and bottle", width: 800, height: 600 },
        action: { href: baseSitePaths.products, label: "View body care" },
      },
      {
        name: "Hair & scalp care",
        description: "Shampoo, conditioner, masks, scalp serums, and treatment-led hair-care directions.",
        media: { src: "/review-assets/launch-focused.svg", alt: "Abstract hair and scalp care packaging", width: 800, height: 600 },
        action: { href: baseSitePaths.products, label: "View hair and scalp care" },
      },
    ],
  },
  readiness: {
    id: "home-readiness",
    eyebrow: "What shapes a quotation",
    title: "Four inputs help a manufacturer assess your project.",
    description:
      "This section explains why a real quotation cannot be based on a product name alone. It deliberately provides no default MOQ, price, or lead time.",
    labels: { buyerInput: "What the buyer provides", supplierOutput: "What the supplier confirms", evidence: "Why it matters" },
    items: [
      { name: "Product brief", description: "Category, target user, product format, and desired experience.", buyerInput: "Reference products, priorities, claims, and exclusions.", supplierOutput: "Feasible routes and questions requiring clarification.", evidenceNote: "The brief determines development and evaluation scope." },
      { name: "Packaging plan", description: "Bottle, jar, tube, pump, decoration, and artwork status.", buyerInput: "Preferred format, size, sourcing plan, and design readiness.", supplierOutput: "Compatibility and sourcing questions.", evidenceNote: "Packaging can change minimums, testing, cost, and timing." },
      { name: "Market requirements", description: "Destination market and intended product positioning.", buyerInput: "Sales markets, label language, and evidence expectations.", supplierOutput: "Documents available and items needing specialist review.", evidenceNote: "Requirements vary by product, claim, and destination." },
      { name: "Commercial scope", description: "Range size, target launch window, and purchasing assumptions.", buyerInput: "Priority products, budget context, and forecast basis.", supplierOutput: "A bounded quotation or next-step request.", evidenceNote: "Commercial terms must follow verified inputs." },
    ],
  },
  evidence: {
    id: "home-evidence",
    eyebrow: "Supplier verification",
    title: "Ask for evidence that matches your product and market.",
    description:
      "A credible manufacturer website should make verification routes visible instead of relying only on badges and marketing claims.",
    points: [
      { title: "Facility and process evidence", description: "Request information relevant to the proposed product and manufacturing steps." },
      { title: "Quality records", description: "Confirm which testing, batch, release, and traceability records are available." },
      { title: "Certification status", description: "Verify certificate owner, scope, issuing body, and validity before publishing claims." },
    ],
    media: { src: "/review-assets/launch-evidence.svg", alt: "Abstract document and verification checkpoints", width: 1200, height: 900, aspect: "landscape" },
    mediaPosition: "end",
    action: { href: baseSitePaths.about, label: "See the example company page" },
  },
  process: {
    id: "home-process",
    eyebrow: "Example project process",
    title: "Move from inquiry to production readiness.",
    description: "The exact steps, review rounds, fees, and timelines must be supplied by the real manufacturer.",
    steps: [
      { title: "Share your brief", description: "Describe the product, customer, market, packaging, and launch priorities.", buyerAction: "Provide known requirements and reference points.", supplierAction: "Assess fit and identify missing information." },
      { title: "Confirm the development route", description: "Agree whether the project starts from private label, adaptation, or custom development.", buyerAction: "Confirm priorities and acceptable trade-offs.", supplierAction: "Define scope, outputs, costs, and dependencies." },
      { title: "Review samples and packaging", description: "Evaluate the product experience and packaging against agreed criteria.", buyerAction: "Consolidate feedback and approve decisions.", supplierAction: "Document revisions and readiness gaps." },
      { title: "Approve production readiness", description: "Close formula, artwork, packaging, quality, and commercial approvals.", buyerAction: "Provide accountable final approvals.", supplierAction: "Confirm the production plan and required records." },
    ],
  },
  inquiry: {
    id: "home-inquiry",
    eyebrow: "Start an inquiry",
    title: "Tell the manufacturer what you want to launch.",
    description: "The example Contact page shows what information can make the first supplier conversation more useful.",
    preparationItems: ["Product categories and target customer", "Destination market", "Packaging status", "Preferred cooperation model"],
    primaryAction: { href: baseSitePaths.contact, label: "Prepare your inquiry" },
    secondaryAction: { href: baseSitePaths.capabilities, label: "Review capabilities first" },
  },
} satisfies ComponentProps<typeof LaunchHomepage>;

export const productsPage = {
  intro: {
    id: "products-intro",
    eyebrow: "Skincare product categories — example",
    title: "Find the right product direction for your brand.",
    description:
      "This page groups familiar beauty products by buyer need. A real client would replace these examples with verified categories, formats, customization options, and media.",
    primaryAction: { href: baseSitePaths.contact, label: "Ask about a product" },
    breadcrumbs: [{ label: "Home", href: baseSitePaths.home }, { label: "Products" }],
  },
  products: {
    id: "product-families",
    eyebrow: "Example product range",
    title: "Build a focused face, body, or hair-care range.",
    description: "The list is illustrative and makes no claim about available formulas, inventory, or commercial terms.",
    families: [
      { name: "Cleansers & toners", description: "Gel, cream, foam, oil, micellar, and toner directions for different routine positions.", media: { src: "/review-assets/product-daily.svg", alt: "Abstract cleanser and toner packaging", width: 900, height: 700 }, action: { href: baseSitePaths.contact, label: "Ask about cleansers" } },
      { name: "Serums & treatments", description: "Hydration, brightening, soothing, barrier, blemish, and age-support directions requiring claim review.", media: { src: "/review-assets/product-targeted.svg", alt: "Abstract serum dropper and treatment bottle", width: 900, height: 700 }, action: { href: baseSitePaths.contact, label: "Ask about serums" } },
      { name: "Creams & masks", description: "Moisturizers, sleeping masks, wash-off masks, eye care, and richer treatment formats.", media: { src: "/review-assets/product-ritual.svg", alt: "Abstract cream jars and mask packaging", width: 900, height: 700 }, action: { href: baseSitePaths.contact, label: "Ask about creams" } },
      { name: "Body care", description: "Body wash, lotion, cream, scrub, oil, hand care, and targeted body-product directions.", media: { src: "/review-assets/launch-body.svg", alt: "Abstract body care packaging", width: 800, height: 600 }, action: { href: baseSitePaths.contact, label: "Ask about body care" } },
      { name: "Hair & scalp care", description: "Shampoo, conditioner, hair masks, scalp serums, and leave-on treatment directions.", media: { src: "/review-assets/manufacturing-leave-on.svg", alt: "Abstract hair and scalp care bottles", width: 800, height: 600 }, action: { href: baseSitePaths.contact, label: "Ask about hair care" } },
      { name: "Brand-ready sets", description: "Curated routine concepts that connect product roles, packaging families, and launch priorities.", media: { src: "/review-assets/launch-daily.svg", alt: "Abstract coordinated skincare set", width: 800, height: 600 }, action: { href: baseSitePaths.contact, label: "Discuss a starter range" } },
    ],
  },
  evidence: {
    id: "product-evidence",
    eyebrow: "Before selecting a product",
    title: "Compare more than the product name.",
    description: "A useful product discussion covers user, format, sensory target, packaging, claims, and market requirements.",
    points: [
      { title: "Formula direction", description: "Define desired texture, use experience, priorities, and ingredients to avoid or investigate." },
      { title: "Packaging compatibility", description: "Confirm how the product and packaging will be evaluated together." },
      { title: "Claims and evidence", description: "Separate marketing goals from claims that require documentation or testing." },
    ],
    media: { src: "/review-assets/premium-evidence.svg", alt: "Abstract formula, packaging, and documentation layers", width: 1200, height: 900, aspect: "landscape" },
    action: { href: baseSitePaths.capabilities, label: "Review manufacturing capabilities" },
  },
  inquiry: {
    id: "products-inquiry",
    eyebrow: "Product inquiry",
    title: "Share the product range you want to create.",
    description: "You do not need a finished specification, but the supplier needs enough context to recommend a route.",
    preparationItems: ["Product type and routine role", "Target customer and market", "Texture or reference product", "Packaging preference"],
    primaryAction: { href: baseSitePaths.contact, label: "Start a product inquiry" },
    secondaryAction: { href: baseSitePaths.capabilities, label: "See the development process" },
  },
} satisfies ComponentProps<typeof ProductsPage>;

export const capabilitiesPage = {
  intro: {
    id: "capabilities-intro",
    eyebrow: "OEM, ODM & private label support — example",
    title: "See how a skincare project can move from brief to production.",
    description:
      "This page demonstrates the capability information a buyer expects. A real client must replace every scope statement with verified factory facts.",
    primaryAction: { href: baseSitePaths.contact, label: "Discuss manufacturing support" },
    breadcrumbs: [{ label: "Home", href: baseSitePaths.home }, { label: "Capabilities" }],
  },
  capabilities: {
    id: "capability-scope",
    eyebrow: "Example capability map",
    title: "Understand the inputs and outputs at each stage.",
    description: "These stages explain structure only; they do not promise that a supplier owns every capability in-house.",
    items: [
      { name: "Brief & feasibility review", description: "Assess product concept, market, packaging, evidence, and commercial assumptions.", buyerInput: "Project brief, references, market, priorities, and constraints.", supplierOutput: "Route recommendation, questions, scope, and quotation basis.", evidenceNote: "Written assumptions and responsibility boundaries." },
      { name: "Formula development", description: "Select or develop a formula direction and evaluate it against agreed criteria.", buyerInput: "Target format, experience, ingredients, exclusions, and claims.", supplierOutput: "Sample direction, specifications to confirm, and revision record.", evidenceNote: "Formula and sample documentation appropriate to scope." },
      { name: "Packaging coordination", description: "Match product, primary packaging, decoration, artwork, and sourcing responsibilities.", buyerInput: "Pack format, size, design, components, and sourcing preference.", supplierOutput: "Compatibility questions, samples, artwork requirements, and dependencies.", evidenceNote: "Approved component and compatibility records where applicable." },
      { name: "Production & filling", description: "Plan material, manufacturing, filling, packing, release, and handoff requirements.", buyerInput: "Approved product, packaging, artwork, quantity, and delivery needs.", supplierOutput: "Production plan, quality gates, records, and delivery basis.", evidenceNote: "Batch, release, and traceability records to verify." },
    ],
  },
  quality: {
    id: "capability-quality",
    eyebrow: "Quality control framework",
    title: "Show where quality decisions happen.",
    description: "Exact tests, standards, certifications, and records must be supplied and verified for the real manufacturer.",
    checkpoints: [
      { stage: "Incoming materials", controlPurpose: "Confirm identity, condition, documentation, and acceptance before use.", evidenceType: "Supplier records and incoming inspection documents" },
      { stage: "In-process control", controlPurpose: "Monitor agreed process parameters and product characteristics during manufacture.", evidenceType: "Batch and in-process records" },
      { stage: "Finished product release", controlPurpose: "Review agreed specifications, packaging, labeling, and release status.", evidenceType: "Inspection, testing, and release documents" },
      { stage: "Traceability & retention", controlPurpose: "Maintain project-appropriate links between materials, batch, product, and records.", evidenceType: "Traceability and retention records" },
    ],
    verificationAction: { href: baseSitePaths.about, label: "Review the example facility page" },
  },
  process: {
    id: "capability-process",
    eyebrow: "Example cooperation process",
    title: "Keep approvals and responsibilities visible.",
    steps: [
      { title: "Inquiry & quotation", description: "Confirm fit, scope, assumptions, commercial basis, and missing inputs.", buyerAction: "Provide the business and product brief.", supplierAction: "Define the proposed route and quotation basis." },
      { title: "Development & sampling", description: "Review product and packaging directions against agreed criteria.", buyerAction: "Give consolidated feedback and approvals.", supplierAction: "Provide samples and document revisions." },
      { title: "Pre-production approval", description: "Close formula, packaging, artwork, quality, and purchasing decisions.", buyerAction: "Approve final inputs and responsibilities.", supplierAction: "Confirm readiness and unresolved risks." },
      { title: "Production & delivery", description: "Manufacture, fill, inspect, release, pack, and hand off under the agreed scope.", buyerAction: "Meet payment, approval, and logistics responsibilities.", supplierAction: "Execute and provide agreed records." },
    ],
  },
  inquiry: {
    id: "capabilities-inquiry",
    eyebrow: "Manufacturing inquiry",
    title: "Ask about the capabilities your project actually needs.",
    description: "A real supplier should distinguish in-house work, qualified partners, optional services, and buyer responsibilities.",
    preparationItems: ["Required cooperation model", "Product and packaging scope", "Destination market", "Evidence and delivery expectations"],
    primaryAction: { href: baseSitePaths.contact, label: "Discuss your project" },
    secondaryAction: { href: baseSitePaths.about, label: "Review company information" },
  },
} satisfies ComponentProps<typeof CapabilitiesPage>;

export const aboutPage = {
  intro: {
    id: "about-intro",
    eyebrow: "About the manufacturer — example",
    title: "Meet the team and systems behind your skincare products.",
    description:
      "This page demonstrates how company, facility, quality, and verification information can build trust. It contains no real company history or certification claim.",
    primaryAction: { href: baseSitePaths.contact, label: "Ask about the factory" },
    breadcrumbs: [{ label: "Home", href: baseSitePaths.home }, { label: "About" }],
  },
  facility: {
    id: "about-facility",
    eyebrow: "Example facility areas",
    title: "Show buyers where their project is supported.",
    description: "A real About page should use client-owned photography and verified facility descriptions.",
    media: { src: "/review-assets/manufacturing-facility.svg", alt: "Abstract plan of skincare manufacturing areas", width: 1200, height: 900, aspect: "landscape" },
    areas: [
      { name: "Product development area", description: "Where briefs, samples, specifications, and technical questions are managed.", evidenceNote: "Replace with verified team, equipment, and responsibility details." },
      { name: "Manufacturing & filling area", description: "Where approved products may be manufactured, filled, and packed.", evidenceNote: "Replace with verified processes, equipment, and scope." },
      { name: "Quality control area", description: "Where incoming, in-process, finished-product, and record checks may be coordinated.", evidenceNote: "Replace with verified tests, standards, and laboratory scope." },
    ],
    verificationNote: "Do not publish facility size, capacity, cleanroom level, certifications, or equipment counts without supporting records.",
    primaryAction: { href: baseSitePaths.contact, label: "Request relevant factory information" },
  },
  evidence: {
    id: "about-method",
    eyebrow: "How the company works",
    title: "Turn company values into visible working practices.",
    description: "Instead of generic claims, explain how the team handles briefs, changes, approvals, quality, and communication.",
    points: [
      { title: "Clear project ownership", description: "Name who coordinates commercial, technical, packaging, quality, and delivery questions." },
      { title: "Documented approvals", description: "Keep product, packaging, artwork, and production decisions visible." },
      { title: "Evidence-led communication", description: "Support important facility, quality, and certification statements with current records." },
    ],
    media: { src: "/review-assets/manufacturing-body.svg", alt: "Abstract connected teams and manufacturing stages", width: 1200, height: 900, aspect: "landscape" },
    mediaPosition: "end",
    action: { href: baseSitePaths.capabilities, label: "See the example capabilities" },
  },
  quality: {
    id: "about-quality",
    eyebrow: "What buyers can verify",
    title: "Make trust claims specific and checkable.",
    checkpoints: [
      { stage: "Company identity", controlPurpose: "Confirm legal entity, operating address, ownership of published facts, and contact routes.", evidenceType: "Client-provided company records" },
      { stage: "Facility & certification", controlPurpose: "Confirm facility scope and any certificate owner, issuer, scope, and validity.", evidenceType: "Current documents and client-approved media" },
      { stage: "Product & quality scope", controlPurpose: "Confirm which products, processes, tests, and records the supplier can support.", evidenceType: "Capability and quality documentation" },
    ],
  },
  inquiry: {
    id: "about-inquiry",
    eyebrow: "Factory verification",
    title: "Request evidence relevant to your product and market.",
    description: "The goal is not to collect every document, but to verify the facts that affect supplier selection and project risk.",
    preparationItems: ["Product categories", "Destination market", "Required certifications or records", "Audit or visit expectations"],
    primaryAction: { href: baseSitePaths.contact, label: "Prepare a verification request" },
    secondaryAction: { href: baseSitePaths.products, label: "Review product categories" },
  },
} satisfies ComponentProps<typeof AboutPage>;

export const contactPage = {
  intro: {
    id: "contact-intro",
    eyebrow: "Request a quote — example",
    title: "Tell us what skincare products you want to create.",
    description:
      "This static page demonstrates a clear B2B inquiry handoff. The example addresses do not contact a real supplier and no form data is submitted.",
    breadcrumbs: [{ label: "Home", href: baseSitePaths.home }, { label: "Contact" }],
  },
  contact: {
    id: "contact-options",
    eyebrow: "Example contact routes",
    title: "Choose the inquiry that matches your project.",
    description: "Both addresses use the reserved example.com domain and are safe placeholders.",
    options: [
      { label: "New product inquiry", value: "projects@example.com", href: "mailto:projects@example.com?subject=New%20skincare%20project", description: "For private-label, semi-custom, custom formulation, packaging, and quotation questions." },
      { label: "Factory & quality inquiry", value: "quality@example.com", href: "mailto:quality@example.com?subject=Factory%20and%20quality%20inquiry", description: "For facility, quality system, certification, testing, audit, and documentation questions." },
    ],
    preparationTitle: "Information to include in your first inquiry",
    preparationItems: ["Company, brand, and destination market", "Product categories and cooperation model", "Packaging status and target launch window", "Expected quantity range and evidence requirements"],
    followUpNote: "The real supplier must confirm MOQ, price, development fees, sample rounds, lead time, capacity, certifications, and availability after reviewing the complete brief.",
  },
} satisfies ComponentProps<typeof ContactPage>;
