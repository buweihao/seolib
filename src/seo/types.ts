export interface LanguageAlternate {
  lang: string;
  href: string;
}

export type JsonLdNode = Record<string, unknown>;

export interface SeoPageConfig {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  nofollow?: boolean;
  type?: "website" | "article" | "product";
  siteName?: string;
  locale?: string;
  alternates?: readonly LanguageAlternate[];
  xDefault?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: JsonLdNode | readonly JsonLdNode[];
}

export interface OrganizationJsonLdInput {
  name: string;
  url: string;
  legalName?: string;
  description?: string;
  logo?: string;
  email?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: readonly string[];
}

export interface BreadcrumbJsonLdItem {
  name: string;
  url: string;
}

export interface ArticleJsonLdInput {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName: string;
  publisherLogo?: string;
}
