import type {
  ArticleJsonLdInput,
  BreadcrumbJsonLdItem,
  JsonLdNode,
  OrganizationJsonLdInput,
} from "./types";

const compact = <T extends Record<string, unknown>>(value: T): T =>
  Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== "")) as T;

export const organizationJsonLd = (input: OrganizationJsonLdInput): JsonLdNode => compact({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: input.name,
  legalName: input.legalName,
  url: input.url,
  description: input.description,
  logo: input.logo,
  email: input.email,
  telephone: input.telephone,
  address: input.address ? compact({ "@type": "PostalAddress", ...input.address }) : undefined,
  sameAs: input.sameAs?.length ? input.sameAs : undefined,
});

export const breadcrumbJsonLd = (items: readonly BreadcrumbJsonLdItem[]): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const articleJsonLd = (input: ArticleJsonLdInput): JsonLdNode => compact({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: input.headline,
  description: input.description,
  mainEntityOfPage: input.url,
  image: input.image,
  datePublished: input.datePublished,
  dateModified: input.dateModified ?? input.datePublished,
  author: { "@type": "Person", name: input.authorName },
  publisher: compact({
    "@type": "Organization",
    name: input.publisherName,
    logo: input.publisherLogo ? { "@type": "ImageObject", url: input.publisherLogo } : undefined,
  }),
});

export const serializeJsonLd = (value: JsonLdNode | readonly JsonLdNode[]) =>
  JSON.stringify(value).replaceAll("<", "\\u003c");
