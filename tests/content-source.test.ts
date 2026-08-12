import assert from "node:assert/strict";
import test from "node:test";

import { createLocalContentSource } from "../src/content-sources/local.ts";

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
