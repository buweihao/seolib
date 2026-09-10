import type { ClientSiteConfig } from "../config/schema";

export interface SiteNavigationDropdown {
  items: Array<{ label: string; href: string; description?: string; marker?: string }>;
  introTitle?: string;
  introDescription?: string;
  variant?: "compact" | "feature";
  align?: "start" | "end";
}

export interface SiteNavigationItem {
  href: string;
  label: string;
  dropdown?: SiteNavigationDropdown;
}

export interface SiteFloatingContactItem {
  label: string;
  icon: "phone" | "whatsapp" | "email" | "message" | "share";
  href?: string;
  value?: string;
  featured?: boolean;
}

const phoneHref = (value: string) => {
  const digits = value.replace(/[^+\d]/g, "");
  return digits ? `tel:${digits}` : undefined;
};

const whatsappHref = (value: string) => {
  const trimmed = value.trim();
  if (trimmed.startsWith("https://wa.me/")) return trimmed;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 5 ? `https://wa.me/${digits}` : undefined;
};

export const buildClientNavigation = (config: ClientSiteConfig): SiteNavigationItem[] => [
  { href: config.routes.home, label: "Home" },
  {
    href: config.routes.products,
    label: "Products",
    dropdown: {
      items: [
        { label: "All product directions", href: config.routes.products },
        ...config.catalog.categories.map((category) => ({
          label: category.name,
          href: `${config.routes.products}${category.slug}/`,
          description: category.description,
        })),
      ],
    },
  },
  {
    href: config.routes.capabilities,
    label: "Capabilities",
    dropdown: {
      items: [
        { label: "Capabilities overview", href: config.routes.capabilities, marker: "01" },
        { label: "Cooperation routes", href: `${config.routes.home}#pathways`, marker: "02" },
        { label: "Quality framework", href: `${config.routes.capabilities}#capability-quality`, marker: "03" },
        { label: "Development process", href: `${config.routes.capabilities}#capability-process`, marker: "04" },
      ],
    },
  },
  {
    href: config.routes.about,
    label: "About",
  },
  { href: config.routes.contact, label: "Contact" },
];

export const buildFloatingContactItems = (config: ClientSiteConfig): SiteFloatingContactItem[] => [
  ...(config.contact.phone?.status === "verified" && config.contact.phone.value.trim()
    ? [{ label: "Phone", icon: "phone" as const, value: config.contact.phone.value, href: phoneHref(config.contact.phone.value), featured: true }]
    : []),
  ...(config.contact.email?.status === "verified"
    ? [{ label: "Email", icon: "email" as const, value: config.contact.email.value, href: `mailto:${config.contact.email.value}` }]
    : []),
  ...(config.contact.whatsapp?.status === "verified" && config.contact.whatsapp.value.trim() && whatsappHref(config.contact.whatsapp.value)
    ? [{ label: "WhatsApp", icon: "whatsapp" as const, value: config.contact.whatsapp.value, href: whatsappHref(config.contact.whatsapp.value) }]
    : []),
  { label: "Inquiry", icon: "message", href: config.routes.contact },
];
