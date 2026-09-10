import type { ConfigurableFormField } from "../inquiry/form-ui";

export const splitContactFields = [
  { name: "firstName", label: "First name", placeholder: "First name", autocomplete: "given-name", required: true },
  { name: "lastName", label: "Last name", placeholder: "Last name", autocomplete: "family-name" },
  { name: "email", label: "Work email", control: "email", placeholder: "you@company.com", autocomplete: "email", required: true },
  { name: "phone", label: "Phone / WhatsApp", control: "tel", placeholder: "+00 000 000 000", autocomplete: "tel" },
  { name: "company", label: "Company", placeholder: "Company name", autocomplete: "organization" },
  { name: "message", label: "Message", control: "textarea", placeholder: "Product direction, market, and project context", required: true, span: "full" },
] satisfies ConfigurableFormField[];

export const advisorInquiryFields = [
  { name: "name", label: "Name", placeholder: "Your name", autocomplete: "name", required: true, span: "full" },
  { name: "email", label: "Work email", control: "email", placeholder: "you@company.com", autocomplete: "email", required: true, span: "full" },
  { name: "phone", label: "Phone / WhatsApp", control: "tel", placeholder: "+00 000 000 000", autocomplete: "tel", required: true, span: "full" },
  { name: "productCategory", label: "Product category", control: "select", placeholder: "Choose a category", required: true, span: "full", options: [{ label: "Facial skincare", value: "facial" }, { label: "Body care", value: "body" }, { label: "Hair and scalp care", value: "hair" }] },
  { name: "cooperation", label: "Cooperation route", control: "select", placeholder: "Choose a route", required: true, span: "full", options: [{ label: "Private label", value: "private-label" }, { label: "Custom development", value: "custom" }, { label: "Route not decided", value: "undecided" }] },
  { name: "message", label: "Project brief", control: "textarea", placeholder: "Tell us what you want to evaluate", required: true, span: "full" },
] satisfies ConfigurableFormField[];

export const supportRequestFields = [
  { name: "name", label: "Full name", autocomplete: "name", required: true },
  { name: "phone", label: "Phone number", control: "tel", autocomplete: "tel" },
  { name: "email", label: "Email address", control: "email", autocomplete: "email", required: true },
  { name: "projectReference", label: "Project reference" },
  { name: "company", label: "Company name", autocomplete: "organization" },
  { name: "supportReference", label: "Support reference" },
  { name: "message", label: "Question or support request", control: "textarea", rows: 6, required: true, span: "full" },
] satisfies ConfigurableFormField[];

export const guidedInquiryFields = [
  { name: "name", label: "Full name", placeholder: "Your full name", autocomplete: "name", required: true, span: "full" },
  { name: "email", label: "Work email", control: "email", placeholder: "you@company.com", autocomplete: "email", required: true, span: "full" },
  { name: "service", label: "Service interested in", control: "select", placeholder: "Select a route", required: true, span: "full", options: [{ label: "Private label", value: "private-label" }, { label: "Custom formulation", value: "custom" }, { label: "Contract manufacturing", value: "contract" }, { label: "Not decided", value: "undecided" }] },
] satisfies ConfigurableFormField[];

export const detailedQuoteFields = [
  { name: "firstName", label: "First name", autocomplete: "given-name", required: true },
  { name: "lastName", label: "Last name", autocomplete: "family-name", required: true },
  { name: "email", label: "Work email", control: "email", autocomplete: "email", required: true, span: "full" },
  { name: "country", label: "Destination market", control: "select", placeholder: "Select a market", required: true, span: "full", options: [{ label: "North America", value: "north-america" }, { label: "Europe", value: "europe" }, { label: "Asia Pacific", value: "asia-pacific" }, { label: "Other / not decided", value: "other" }] },
  { name: "company", label: "Company name", autocomplete: "organization", span: "full" },
  { name: "website", label: "Website", control: "url", placeholder: "https://", autocomplete: "url" },
  { name: "phone", label: "Phone", control: "tel", autocomplete: "tel" },
  { name: "services", label: "Services to evaluate", control: "checkbox-group", appearance: "tags", span: "full", options: [{ label: "Private label", value: "private-label" }, { label: "Formula development", value: "formula" }, { label: "Packaging", value: "packaging" }, { label: "Brand support", value: "brand" }, { label: "Fulfilment", value: "fulfilment" }] },
  { name: "budget", label: "Estimated budget", control: "select", placeholder: "Select a range", span: "full", options: [{ label: "Range to discuss", value: "discuss" }, { label: "Budget approved", value: "approved" }, { label: "Budget not set", value: "unset" }] },
  { name: "message", label: "Project brief", control: "textarea", required: true, span: "full" },
  { name: "attachment", label: "Optional brief or reference file", control: "file", span: "full", help: "File handling, limits, malware scanning, and retention must be configured before launch." },
] satisfies ConfigurableFormField[];

export const contactFaqItems = [
  { question: "How is the most suitable cooperation route selected?", answer: "Use verified project inputs—product maturity, market, evidence needs, packaging status, and commercial constraints—to recommend the next evaluation step." },
  { question: "Can samples be evaluated before production?", answer: "Describe the supplier's actual sample policy, responsibilities, fees, and approval gates here after verification." },
  { question: "What affects quantity and timing?", answer: "Formula route, packaging, decoration, testing, documentation, and review rounds may all affect a verified quotation." },
  { question: "Which project information is useful at first contact?", answer: "Product direction, destination market, quantity range, packaging status, and evidence expectations help make the first response more specific." },
];
