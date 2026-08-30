import type {
  AboutPageContent,
  CatalogProductContent,
  MediaContent,
  ProductCatalogContent,
} from "../../content-models/sections";
import { createSanityContentSource } from "../../content-sources/sanity";
import type { AboutContentRecord, HomepageSettingsRecord, ProductCategoryRecord, ProductRecord } from "../../content-sources/types";
import { createPublishedSanityClient, readSanityRuntimeConfig } from "../../lib/sanity";
import type { ClientMediaAsset, ClientSiteConfig, SiteMode } from "../schema";
import {
  procurementEvidenceCatalog,
  procurementEvidenceAbout,
  procurementEvidenceClient,
  productCategoryHref,
} from "./procurement-evidence";

const fallbackCatalog: ProductCatalogContent = procurementEvidenceCatalog;
const defaultMedia: MediaContent = {
  src: "/review-assets/product-daily.svg",
  alt: "Skincare product packaging",
  width: 900,
  height: 700,
  aspect: "square",
};

const firstOrFallback = <T>(values: readonly T[] | undefined, fallback: readonly T[]) =>
  values && values.length > 0 ? values : fallback;

const catalogueFromRecords = (
  categoryRecords: readonly ProductCategoryRecord[],
  productRecords: readonly ProductRecord[],
  mode: SiteMode,
): ProductCatalogContent => {
  const fallbackCategories = new Map(fallbackCatalog.categories.map((category) => [category.slug, category]));
  const fallbackProducts = new Map(fallbackCatalog.products.map((product) => [product.slug, product]));
  const categorySlugById = new Map(categoryRecords.map((category) => [category.id, category.slug]));
  const errors: string[] = [];

  const categories = categoryRecords.map((record) => {
    const fallback = fallbackCategories.get(record.slug);
    if (!record.description) errors.push(`Category ${record.slug} is missing a description.`);
    if (!record.media) errors.push(`Category ${record.slug} is missing an image or image alt text.`);

    return {
      slug: record.slug,
      name: record.name,
      description: record.description || fallback?.description || "Explore skincare formats and routine roles within this category.",
      media: record.media || fallback?.media || defaultMedia,
    };
  });

  const products = productRecords.flatMap((record): CatalogProductContent[] => {
    const categorySlug = categorySlugById.get(record.categoryId);
    if (!categorySlug) {
      errors.push(`Product ${record.slug} references a missing or unpublished category.`);
      return [];
    }

    const fallback = fallbackProducts.get(record.slug);
    const media = record.media[0] || fallback?.media || defaultMedia;
    const format = record.format || fallback?.format || "Skincare format";
    const routineRole = record.routineRole || fallback?.routineRole || "Daily care";
    const highlights = firstOrFallback(record.highlights, fallback?.highlights || ["Texture and sensory direction"]);
    const customizationOptions = firstOrFallback(record.customizationScope, fallback?.customizationOptions || ["Formula and sensory preferences"]);
    const packagingOptions = firstOrFallback(record.packagingOptions, fallback?.packagingOptions || ["Bottle, jar, tube, or pump options"]);
    const evaluationItems = firstOrFallback(record.evidenceToVerify, fallback?.evaluationItems || ["Formula, packaging, and market requirements"]);

    if (record.media.length === 0) errors.push(`Product ${record.slug} is missing an image or image alt text.`);
    if (!record.summary) errors.push(`Product ${record.slug} is missing a summary.`);
    if (!record.format || !record.routineRole) errors.push(`Product ${record.slug} is missing format or routine role.`);
    if (!record.highlights?.length || !record.customizationScope?.length || !record.packagingOptions?.length || !record.evidenceToVerify?.length) {
      errors.push(`Product ${record.slug} has an incomplete buyer-information list.`);
    }

    return [{
      slug: record.slug,
      categorySlug,
      name: record.name,
      summary: record.summary || fallback?.summary || "A skincare product direction that can be shaped around the brand, routine, and packaging brief.",
      media,
      format,
      routineRole,
      highlights,
      customizationOptions,
      packagingOptions,
      evaluationItems,
      isHot: record.isHot,
    }];
  });

  if (mode === "publish" && errors.length > 0) {
    throw new Error(`Sanity catalogue validation failed:\n- ${errors.join("\n- ")}`);
  }

  return {
    categories,
    products,
    reviewNote: "Product formats, ingredients, packaging options, and development scope are tailored to each brand brief.",
  };
};

export const loadProcurementEvidenceCatalog = async (
  mode: SiteMode = procurementEvidenceClient.mode,
): Promise<ProductCatalogContent> => {
  const runtime = readSanityRuntimeConfig();
  if (!runtime) {
    if (mode === "publish") throw new Error("Sanity is required in publish mode. Set PUBLIC_SANITY_PROJECT_ID.");
    return fallbackCatalog;
  }

  try {
    const source = createSanityContentSource(createPublishedSanityClient(runtime));
    const [categories, products] = await Promise.all([
      source.getProductCategories({ locale: procurementEvidenceClient.seo.defaultLocale, status: "published" }),
      source.getProducts({ locale: procurementEvidenceClient.seo.defaultLocale, status: "published" }),
    ]);

    if (categories.length === 0 || products.length === 0) {
      if (mode === "publish") throw new Error("Sanity must contain at least one published category and product.");
      return fallbackCatalog;
    }

    return catalogueFromRecords(categories, products, mode);
  } catch (error) {
    if (mode === "publish") throw error;
    console.warn("[sanity] Product catalogue unavailable; using local review catalogue.");
    return fallbackCatalog;
  }
};

export const applyCatalogToClient = (
  config: ClientSiteConfig,
  catalog: ProductCatalogContent,
  homepageSettings?: HomepageSettingsRecord,
  aboutContent?: AboutContentRecord,
): ClientSiteConfig => {
  const aboutMedia = aboutContent
    ? [
        ...aboutContent.companyImages,
        ...aboutContent.recommendationItems.map((item) => item.media),
        ...aboutContent.galleryImages,
        ...aboutContent.carouselImages,
      ]
    : [];
  const cmsMedia: ClientMediaAsset[] = [
    ...catalog.categories.map((category) => ({
      id: `sanity-category-${category.slug}`,
      src: category.media.src,
      alt: category.media.alt,
      rightsStatus: "pending" as const,
      source: "Sanity production dataset",
    })),
    ...catalog.products.map((product) => ({
      id: `sanity-product-${product.slug}`,
      src: product.media.src,
      alt: product.media.alt,
      rightsStatus: "pending" as const,
      source: "Sanity production dataset",
    })),
    ...(homepageSettings?.heroSlides ?? []).map((slide, index) => ({
      id: `sanity-hero-${index + 1}`,
      src: slide.media.src,
      alt: slide.media.alt,
      rightsStatus: "pending" as const,
      source: "Sanity production dataset",
    })),
    ...(homepageSettings?.logo ? [{
      id: "sanity-company-logo",
      src: homepageSettings.logo.src,
      alt: homepageSettings.logo.alt,
      rightsStatus: "pending" as const,
      source: "Sanity production dataset",
    }] : []),
    ...aboutMedia.map((asset, index) => ({
      id: "sanity-about-" + (index + 1),
      src: asset.src,
      alt: asset.alt,
      rightsStatus: "pending" as const,
      source: "Sanity production dataset",
    })),
  ];
  const registeredSources = new Set(config.media.map((asset) => asset.src));
  const media = [
    ...config.media,
    ...cmsMedia.filter((asset) => !registeredSources.has(asset.src)),
  ];
  const families = catalog.categories.map((category) => ({
    name: category.name,
    description: category.description,
    media: category.media,
    action: { href: productCategoryHref(category.slug), label: `Explore ${category.name.toLowerCase()}` },
  }));
  const resolvedAbout: AboutPageContent = aboutContent ? {
    ...procurementEvidenceAbout,
    company: {
      ...procurementEvidenceAbout.company,
      videoUrl: aboutContent.companyVideoUrl,
      description: aboutContent.companyDescription || procurementEvidenceAbout.company.description,
      images: aboutContent.companyImages,
    },
    recommendation: {
      ...procurementEvidenceAbout.recommendation,
      items: aboutContent.recommendationItems,
    },
    gallery: {
      images: aboutContent.galleryImages,
    },
    carousel: {
      ...procurementEvidenceAbout.carousel,
      subtitle: aboutContent.carouselSubtitle || procurementEvidenceAbout.carousel.subtitle,
      images: aboutContent.carouselImages,
    },
  } : procurementEvidenceAbout;

  const contactContextItems = [
    ...(homepageSettings?.contactEmail ? [{ label: "Email", value: homepageSettings.contactEmail, href: `mailto:${homepageSettings.contactEmail}`, icon: "email" as const }] : []),
    ...(homepageSettings?.contactPhone ? [{ label: "Phone", value: homepageSettings.contactPhone, href: `tel:${homepageSettings.contactPhone.replace(/[^+\d]/g, "")}`, icon: "phone" as const }] : []),
    ...(homepageSettings?.contactWhatsapp ? [{ label: "WhatsApp", value: homepageSettings.contactWhatsapp, href: homepageSettings.contactWhatsapp.startsWith("https://") ? homepageSettings.contactWhatsapp : `https://wa.me/${homepageSettings.contactWhatsapp.replace(/\D/g, "")}`, icon: "message" as const }] : []),
    ...(homepageSettings?.contactLocation ? [{ label: "Location", value: homepageSettings.contactLocation, icon: "location" as const }] : []),
  ];

  return {
    ...config,
    identity: {
      ...config.identity,
      displayName: homepageSettings?.companyName ? {
        ...config.identity.displayName,
        value: homepageSettings.companyName,
        source: "Sanity 网站设置",
      } : config.identity.displayName,
      logo: homepageSettings?.logo ?? config.identity.logo,
    },
    contact: {
      ...config.contact,
      ...(homepageSettings?.contactEmail ? {
        email: {
          value: homepageSettings.contactEmail,
          status: "verified" as const,
          source: "Sanity 网站设置",
        },
      } : {}),
      ...(homepageSettings?.contactPhone ? {
        phone: {
          value: homepageSettings.contactPhone,
          status: "verified" as const,
          source: "Sanity 网站设置",
        },
      } : {}),
      ...(homepageSettings?.contactWhatsapp ? {
        whatsapp: {
          value: homepageSettings.contactWhatsapp,
          status: "verified" as const,
          source: "Sanity 网站设置",
        },
      } : {}),
      ...(homepageSettings?.contactLocation ? {
        location: {
          value: homepageSettings.contactLocation,
          status: "verified" as const,
          source: "Sanity 网站设置",
        },
      } : {}),
    },
    seo: {
      ...config.seo,
      siteName: homepageSettings?.companyName ? {
        ...config.seo.siteName,
        value: homepageSettings.companyName,
        source: "Sanity 网站设置",
      } : config.seo.siteName,
    },
    media,
    catalog,
    homepage: {
      ...config.homepage,
      hero: homepageSettings?.heroSlides.length ? {
        autoplayMs: "slides" in config.homepage.hero ? config.homepage.hero.autoplayMs : 7000,
        slides: homepageSettings.heroSlides.map((slide) => ({
          title: slide.title,
          media: slide.media,
          href: slide.href,
          action: slide.buttonLabel && slide.href ? { label: slide.buttonLabel, href: slide.href } : undefined,
        })),
      } : config.homepage.hero,
      products: { ...config.homepage.products, families },
    },
    pages: {
      ...config.pages,
      products: {
        ...config.pages.products,
        products: { ...config.pages.products.products, families },
      },
      about: { content: resolvedAbout },
      contact: {
        ...config.pages.contact,
        contact: "fields" in config.pages.contact.contact ? {
          ...config.pages.contact.contact,
          ...(contactContextItems.length > 0 ? {
            contextTitle: "Direct contact routes",
            contextItems: contactContextItems,
          } : {}),
        } : config.pages.contact.contact,
      },
    },
  };
};

export const loadProcurementEvidenceClient = async () => {
  const runtime = readSanityRuntimeConfig();
  if (!runtime) return applyCatalogToClient(procurementEvidenceClient, await loadProcurementEvidenceCatalog());
  const source = createSanityContentSource(createPublishedSanityClient(runtime));
  const [catalog, homepageSettings, aboutContent] = await Promise.all([
    loadProcurementEvidenceCatalog(),
    source.getHomepageSettings().catch(() => undefined),
    source.getAboutContent().catch(() => undefined),
  ]);
  return applyCatalogToClient(procurementEvidenceClient, catalog, homepageSettings, aboutContent);
};
