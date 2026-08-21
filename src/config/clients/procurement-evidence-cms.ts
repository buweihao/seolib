import type {
  CatalogProductContent,
  MediaContent,
  ProductCatalogContent,
} from "../../content-models/sections";
import { createSanityContentSource } from "../../content-sources/sanity";
import type { ProductCategoryRecord, ProductRecord } from "../../content-sources/types";
import { createPublishedSanityClient, readSanityRuntimeConfig } from "../../lib/sanity";
import type { ClientMediaAsset, ClientSiteConfig, SiteMode } from "../schema";
import {
  procurementEvidenceCatalog,
  procurementEvidenceClient,
  productCategoryHref,
} from "./procurement-evidence";

const fallbackCatalog: ProductCatalogContent = procurementEvidenceCatalog;
const defaultMedia: MediaContent = {
  src: "/review-assets/product-daily.svg",
  alt: "Illustrative product packaging placeholder",
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
      description: record.description || fallback?.description || "Product category description pending.",
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
    const format = record.format || fallback?.format || "Format pending";
    const routineRole = record.routineRole || fallback?.routineRole || "Routine role pending";
    const highlights = firstOrFallback(record.highlights, fallback?.highlights || ["Product highlight pending"]);
    const customizationOptions = firstOrFallback(record.customizationScope, fallback?.customizationOptions || ["Customization scope pending"]);
    const packagingOptions = firstOrFallback(record.packagingOptions, fallback?.packagingOptions || ["Packaging options pending"]);
    const evaluationItems = firstOrFallback(record.evidenceToVerify, fallback?.evaluationItems || ["Evaluation requirements pending"]);

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
      summary: record.summary || fallback?.summary || "Product summary pending.",
      media,
      format,
      routineRole,
      highlights,
      customizationOptions,
      packagingOptions,
      evaluationItems,
    }];
  });

  if (mode === "publish" && errors.length > 0) {
    throw new Error(`Sanity catalogue validation failed:\n- ${errors.join("\n- ")}`);
  }

  return {
    categories,
    products,
    reviewNote: mode === "review"
      ? "Product catalogue content is loaded from published Sanity documents when configured. Missing review fields use clearly marked local placeholders."
      : "Product details are maintained in the client-owned product catalogue.",
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
): ClientSiteConfig => {
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

  return {
    ...config,
    media,
    catalog,
    homepage: {
      ...config.homepage,
      products: { ...config.homepage.products, families },
    },
    pages: {
      ...config.pages,
      products: {
        ...config.pages.products,
        products: { ...config.pages.products.products, families },
      },
    },
  };
};

export const loadProcurementEvidenceClient = async () =>
  applyCatalogToClient(procurementEvidenceClient, await loadProcurementEvidenceCatalog());
