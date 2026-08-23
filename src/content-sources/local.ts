import type {
  ArticleRecord,
  ContentQuery,
  ContentRecord,
  ContentSource,
  LandingPageRecord,
  HomepageSettingsRecord,
  ProductCategoryRecord,
  ProductRecord,
} from "./types";

export interface LocalContentData {
  homepageSettings?: HomepageSettingsRecord;
  productCategories?: readonly ProductCategoryRecord[];
  products?: readonly ProductRecord[];
  articles?: readonly ArticleRecord[];
  landingPages?: readonly LandingPageRecord[];
}

const filterRecords = <T extends ContentRecord>(records: readonly T[], query: ContentQuery = {}) =>
  records.filter((record) =>
    (!query.locale || record.locale === query.locale) &&
    (!query.status || record.status === query.status),
  );

export const createLocalContentSource = (data: LocalContentData): ContentSource => ({
  getHomepageSettings: async () => data.homepageSettings,
  getProductCategories: async (query) => filterRecords(data.productCategories ?? [], query),
  getProducts: async (query) => filterRecords(data.products ?? [], query),
  getArticles: async (query) => filterRecords(data.articles ?? [], query),
  getLandingPages: async (query) => filterRecords(data.landingPages ?? [], query),
});
