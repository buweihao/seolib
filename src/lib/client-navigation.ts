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
  icon: "email" | "message" | "share";
  href?: string;
}

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
    dropdown: {
      variant: "feature",
      align: "end",
      introTitle: "Company and capabilities",
      introDescription: "Explore the development workflow, facility areas, quality responsibilities, and contact routes behind a skincare collection.",
      items: [
        { label: "Company overview", href: config.routes.about },
        { label: "Facility areas", href: `${config.routes.about}#about-facility` },
        { label: "Development expertise", href: `${config.routes.about}#about-evidence` },
        { label: "Quality ownership", href: `${config.routes.about}#about-quality` },
        { label: "Contact", href: config.routes.contact },
      ],
    },
  },
  { href: config.routes.contact, label: "Contact" },
];

export const buildFloatingContactItems = (config: ClientSiteConfig): SiteFloatingContactItem[] => [
  { label: "Inquiry", icon: "message", href: config.routes.contact },
  ...(config.contact.email?.status === "verified"
    ? [{ label: "Email", icon: "email" as const, href: `mailto:${config.contact.email.value}` }]
    : []),
  { label: "Share", icon: "share" },
];
