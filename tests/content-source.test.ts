import assert from "node:assert/strict";
import test from "node:test";

import { createLocalContentSource } from "../src/content-sources/local.ts";
import { createSanityContentSource } from "../src/content-sources/sanity/index.ts";

const seo = { title: "Page title", description: "Page description" };

test("local content source filters normalized records by locale and publication state", async () => {
  const source = createLocalContentSource({
    productCategories: [
      { id: "published-en", kind: "product-category", slug: "published", locale: "en", status: "published", updatedAt: "2026-08-12", seo, name: "Published", description: "Public category", order: 1 },
      { id: "draft-en", kind: "product-category", slug: "draft", locale: "en", status: "draft", updatedAt: "2026-08-12", seo, name: "Draft", description: "Draft category", order: 2 },
      { id: "published-zh", kind: "product-category", slug: "published-zh", locale: "zh-CN", status: "published", updatedAt: "2026-08-12", seo, name: "Published zh", description: "Public category", order: 3 },
    ],
  });

  const records = await source.getProductCategories({ locale: "en", status: "published" });
  assert.deepEqual(records.map((record) => record.id), ["published-en"]);
});

test("Sanity content source normalizes partial published catalogue documents safely", async () => {
  const source = createSanityContentSource({
    async fetch<T>(query: string): Promise<T> {
      if (query.includes('productCategory')) {
        return [{
          id: "category-1",
          slug: "facial-care",
          locale: "en",
          updatedAt: "2026-08-21T00:00:00Z",
          name: "Facial care",
          description: "Face-care directions.",
          order: 1,
          media: null,
        }] as T;
      }

      return [{
        id: "product-1",
        slug: "hydration-serum",
        locale: "en",
        updatedAt: "2026-08-21T00:00:00Z",
        name: "Hydration serum",
        summary: "A lightweight serum direction.",
        categoryId: "category-1",
        media: null,
      }] as T;
    },
  });

  const [categories, products] = await Promise.all([
    source.getProductCategories({ locale: "en", status: "published" }),
    source.getProducts({ locale: "en", status: "published" }),
  ]);

  assert.equal(categories[0]?.media, undefined);
  assert.deepEqual(products[0]?.media, []);
  assert.deepEqual(products[0]?.highlights, []);
  assert.deepEqual(products[0]?.packagingOptions, []);
});
