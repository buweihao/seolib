import type { MediaContent } from "../content-models/sections";
import type { SeoPageConfig } from "../seo/types";

export type ContentPublicationStatus = "draft" | "review" | "published";

export interface ContentRecord {
  id: string;
  slug: string;
  locale: string;
  status: ContentPublicationStatus;
  updatedAt: string;
  seo: SeoPageConfig;
}

export interface ProductCategoryRecord extends ContentRecord {
  kind: "product-category";
  name: string;
  description: string;
  media?: MediaContent;
  order: number;
}

export interface ProductRecord extends ContentRecord {
  kind: "product";
  name: string;
  summary: string;
  categoryId: string;
  media: readonly MediaContent[];
  format?: string;
  routineRole?: string;
  highlights?: readonly string[];
  formats?: readonly string[];
  customizationScope?: readonly string[];
  packagingOptions?: readonly string[];
  targetMarkets?: readonly string[];
  evidenceToVerify?: readonly string[];
  inquiryPreparation?: readonly string[];
  isHot?: boolean;
}

export interface HomepageSettingsRecord {
  companyName?: string;
  logo?: MediaContent;
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactLocation?: string;
  heroSlides: readonly {
    title?: string;
    buttonLabel?: string;
    href?: string;
    media: MediaContent;
  }[];
}

export interface AboutContentRecord {
  companyVideoUrl?: string;
  companyDescription?: string;
  companyImages: readonly MediaContent[];
  recommendationItems: readonly {
    media: MediaContent;
    text?: string;
  }[];
  galleryImages: readonly MediaContent[];
  carouselSubtitle?: string;
  carouselImages: readonly MediaContent[];
}

export interface ArticleRecord extends ContentRecord {
  kind: "article";
  title: string;
  excerpt: string;
  body: string;
  authorId: string;
  reviewedBy?: string;
  publishedAt: string;
  featuredMedia?: MediaContent;
  relatedEntryIds?: readonly string[];
}

export interface LandingPageRecord extends ContentRecord {
  kind: "landing-page";
  title: string;
  buyerQuestion: string;
  introduction: string;
  body: string;
  relatedProductIds?: readonly string[];
  relatedArticleIds?: readonly string[];
}

export interface ContentQuery {
  locale?: string;
  status?: ContentPublicationStatus;
}

export interface ContentSource {
  getHomepageSettings(): Promise<HomepageSettingsRecord | undefined>;
  getAboutContent(): Promise<AboutContentRecord | undefined>;
  getProductCategories(query?: ContentQuery): Promise<readonly ProductCategoryRecord[]>;
  getProducts(query?: ContentQuery): Promise<readonly ProductRecord[]>;
  getArticles(query?: ContentQuery): Promise<readonly ArticleRecord[]>;
  getLandingPages(query?: ContentQuery): Promise<readonly LandingPageRecord[]>;
}
