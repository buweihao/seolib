import type { MediaContent } from "../../content-models/sections";
import type { SeoPageConfig } from "../../seo/types";
import type {
  ContentQuery,
  ContentSource,
  HomepageSettingsRecord,
  ProductCategoryRecord,
  ProductRecord,
} from "../types";

export interface SanityQueryClient {
  fetch<T>(query: string, params?: Record<string, unknown>): Promise<T>;
}

interface RawMedia {
  src?: unknown;
  alt?: unknown;
  width?: unknown;
  height?: unknown;
}

interface RawCategory {
  id?: unknown;
  slug?: unknown;
  locale?: unknown;
  updatedAt?: unknown;
  name?: unknown;
  description?: unknown;
  order?: unknown;
  seoTitle?: unknown;
  seoDescription?: unknown;
  media?: RawMedia | null;
}

interface RawProduct extends RawCategory {
  summary?: unknown;
  categoryId?: unknown;
  format?: unknown;
  routineRole?: unknown;
  highlights?: unknown;
  customizationOptions?: unknown;
  packagingOptions?: unknown;
  evaluationItems?: unknown;
  isHot?: unknown;
}

interface RawHeroSlide {
  title?: unknown;
  buttonLabel?: unknown;
  href?: unknown;
  media?: RawMedia | null;
}

interface RawHomepageSettings {
  companyName?: unknown;
  logo?: RawMedia | null;
  heroSlides?: unknown;
}

const homepageSettingsQuery = `
  *[_type == "homepageSettings" && !(_id in path("drafts.**"))][0] {
    "companyName": coalesce(companyName, ""),
    "logo": select(defined(logo.asset) => {
      "src": logo.asset->url,
      "alt": coalesce(companyName, "") + " logo",
      "width": logo.asset->metadata.dimensions.width,
      "height": logo.asset->metadata.dimensions.height
    }),
    "heroSlides": coalesce(heroSlides, [])[] {
      "title": coalesce(title, ""),
      "buttonLabel": coalesce(buttonLabel, ""),
      "href": coalesce(href, ""),
      "media": select(defined(image.asset) => {
        "src": image.asset->url,
        "alt": coalesce(image.alt, ""),
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height
      })
    }
  }
`;

const categoryQuery = `
  *[
    _type == "productCategory" &&
    !(_id in path("drafts.**")) &&
    publicationStatus == "published" &&
    ($locale == null || locale == $locale)
  ] | order(coalesce(order, 0) asc, coalesce(name, "") asc) {
    "id": _id,
    "slug": coalesce(slug.current, ""),
    "locale": coalesce(locale, "en"),
    "updatedAt": _updatedAt,
    "name": coalesce(name, ""),
    "description": coalesce(description, ""),
    "order": coalesce(order, 0),
    "seoTitle": coalesce(seoTitle, ""),
    "seoDescription": coalesce(seoDescription, ""),
    "media": select(defined(image.asset) => {
      "src": image.asset->url,
      "alt": coalesce(image.alt, name, ""),
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    })
  }
`;

const productQuery = `
  *[
    _type == "product" &&
    !(_id in path("drafts.**")) &&
    publicationStatus == "published" &&
    ($locale == null || locale == $locale)
  ] | order(coalesce(order, 0) asc, coalesce(name, "") asc) {
    "id": _id,
    "slug": coalesce(slug.current, ""),
    "locale": coalesce(locale, "en"),
    "updatedAt": _updatedAt,
    "name": coalesce(name, ""),
    "summary": coalesce(summary, ""),
    "categoryId": coalesce(category->_id, ""),
    "format": coalesce(format, ""),
    "routineRole": coalesce(routineRole, ""),
    "highlights": coalesce(highlights, []),
    "customizationOptions": coalesce(customizationOptions, []),
    "packagingOptions": coalesce(packagingOptions, []),
    "evaluationItems": coalesce(evaluationItems, []),
    "isHot": coalesce(isHot, false),
    "order": coalesce(order, 0),
    "seoTitle": coalesce(seoTitle, ""),
    "seoDescription": coalesce(seoDescription, ""),
    "media": select(defined(mainImage.asset) => {
      "src": mainImage.asset->url,
      "alt": coalesce(mainImage.alt, name, ""),
      "width": mainImage.asset->metadata.dimensions.width,
      "height": mainImage.asset->metadata.dimensions.height
    })
  }
`;

const asString = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const asNumber = (value: unknown) => (typeof value === "number" && Number.isFinite(value) ? value : 0);
const asStringArray = (value: unknown) =>
  Array.isArray(value) ? value.map(asString).filter(Boolean) : [];

const optimizedImageUrl = (src: string, width: number) => {
  try {
    const url = new URL(src);
    if (url.hostname !== "cdn.sanity.io") return src;
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    url.searchParams.set("q", "82");
    url.searchParams.set("w", String(width));
    return url.toString();
  } catch {
    return src;
  }
};

interface MediaOptions { maxWidth?: number; widths?: readonly number[]; sizes?: string; }

const asMedia = (value: RawMedia | null | undefined, options: MediaOptions = {}): MediaContent | undefined => {
  if (!value) return undefined;
  const src = asString(value.src);
  const alt = asString(value.alt);
  const width = asNumber(value.width);
  const height = asNumber(value.height);
  if (!src || !alt || width <= 0 || height <= 0) return undefined;

  const maxWidth = Math.min(width, options.maxWidth ?? 900);
  const displayHeight = Math.round(height * (maxWidth / width));
  const responsiveWidths = (options.widths ?? [360, 600, 900])
    .filter((candidate) => candidate < maxWidth)
    .concat(maxWidth)
    .filter((candidate, index, values) => values.indexOf(candidate) === index);
  let isSanityImage = false;
  try { isSanityImage = new URL(src).hostname === "cdn.sanity.io"; } catch { /* Keep the original URL. */ }
  const ratio = width / height;
  return {
    src: optimizedImageUrl(src, maxWidth),
    srcset: isSanityImage ? responsiveWidths.map((candidate) => `${optimizedImageUrl(src, candidate)} ${candidate}w`).join(", ") : undefined,
    sizes: isSanityImage ? options.sizes ?? "(max-width: 48rem) 100vw, 33vw" : undefined,
    alt,
    width: maxWidth,
    height: displayHeight,
    aspect: ratio > 1.15 ? "landscape" : ratio < 0.85 ? "portrait" : "square",
  };
};

const asSeo = (raw: RawCategory, fallbackTitle: string, fallbackDescription: string): SeoPageConfig => ({
  title: asString(raw.seoTitle) || fallbackTitle,
  description: asString(raw.seoDescription) || fallbackDescription,
  type: "product",
});

const canReturnPublished = (query: ContentQuery = {}) => !query.status || query.status === "published";

export const createSanityContentSource = (client: SanityQueryClient): ContentSource => ({
  async getHomepageSettings() {
    const raw = await client.fetch<RawHomepageSettings | null>(homepageSettingsQuery);
    if (!raw) return undefined;
    const heroSlides = (Array.isArray(raw.heroSlides) ? raw.heroSlides as RawHeroSlide[] : []).flatMap((slide) => {
      const media = asMedia(slide.media, { maxWidth: 1920, widths: [640, 960, 1440, 1920], sizes: "100vw" });
      if (!media) return [];
      return [{
        title: asString(slide.title) || undefined,
        buttonLabel: asString(slide.buttonLabel) || undefined,
        href: asString(slide.href) || undefined,
        media,
      }];
    });
    const companyName = asString(raw.companyName) || undefined;
    const logo = asMedia(raw.logo, { maxWidth: 240, widths: [64, 128, 240], sizes: "3rem" });
    return companyName || logo || heroSlides.length > 0
      ? { companyName, logo, heroSlides } satisfies HomepageSettingsRecord
      : undefined;
  },

  async getProductCategories(query = {}) {
    if (!canReturnPublished(query)) return [];
    const rows = await client.fetch<RawCategory[]>(categoryQuery, { locale: query.locale ?? null });

    return rows
      .map((raw): ProductCategoryRecord | undefined => {
        const id = asString(raw.id);
        const slug = asString(raw.slug);
        const name = asString(raw.name);
        const description = asString(raw.description);
        if (!id || !slug || !name) return undefined;

        return {
          id,
          kind: "product-category",
          slug,
          locale: asString(raw.locale) || "en",
          status: "published",
          updatedAt: asString(raw.updatedAt),
          seo: asSeo(raw, name, description),
          name,
          description,
          media: asMedia(raw.media),
          order: asNumber(raw.order),
        };
      })
      .filter((record): record is ProductCategoryRecord => Boolean(record));
  },

  async getProducts(query = {}) {
    if (!canReturnPublished(query)) return [];
    const rows = await client.fetch<RawProduct[]>(productQuery, { locale: query.locale ?? null });

    return rows
      .map((raw): ProductRecord | undefined => {
        const id = asString(raw.id);
        const slug = asString(raw.slug);
        const name = asString(raw.name);
        const summary = asString(raw.summary);
        const categoryId = asString(raw.categoryId);
        if (!id || !slug || !name || !categoryId) return undefined;
        const media = asMedia(raw.media);

        return {
          id,
          kind: "product",
          slug,
          locale: asString(raw.locale) || "en",
          status: "published",
          updatedAt: asString(raw.updatedAt),
          seo: asSeo(raw, name, summary),
          name,
          summary,
          categoryId,
          media: media ? [media] : [],
          format: asString(raw.format),
          routineRole: asString(raw.routineRole),
          highlights: asStringArray(raw.highlights),
          customizationScope: asStringArray(raw.customizationOptions),
          packagingOptions: asStringArray(raw.packagingOptions),
          evidenceToVerify: asStringArray(raw.evaluationItems),
          isHot: raw.isHot === true,
        };
      })
      .filter((record): record is ProductRecord => Boolean(record));
  },

  getArticles: async () => [],
  getLandingPages: async () => [],
});
