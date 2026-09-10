import assert from "node:assert/strict";
import test from "node:test";

import { procurementEvidenceClient } from "../src/config/clients/procurement-evidence.ts";
import { productCategoryHref, productDetailHref } from "../src/config/clients/procurement-evidence.ts";
import type { ClientSiteConfig } from "../src/config/schema.ts";
import { validateClientSiteConfig } from "../src/config/validate.ts";
import { organizationJsonLd, serializeJsonLd } from "../src/seo/jsonld.ts";

test("review client configuration exposes warnings without blocking errors", () => {
  const issues = validateClientSiteConfig(procurementEvidenceClient);
  assert.equal(issues.some((issue) => issue.severity === "error"), false);
  assert.equal(issues.some((issue) => issue.path === "seo.siteUrl"), true);
});

test("product catalogue relationships and generated paths are stable", () => {
  assert.equal(procurementEvidenceClient.catalog.categories.length, 4);
  assert.equal(procurementEvidenceClient.catalog.products.length, 12);
  for (const category of procurementEvidenceClient.catalog.categories) {
    assert.equal(productCategoryHref(category.slug).endsWith(`/${category.slug}/`), true);
    assert.equal(procurementEvidenceClient.catalog.products.some((product) => product.categorySlug === category.slug), true);
  }
  for (const product of procurementEvidenceClient.catalog.products) {
    assert.equal(productDetailHref(product.categorySlug, product.slug).endsWith(`/${product.categorySlug}/${product.slug}/`), true);
  }
});

test("publish mode blocks pending facts and disabled inquiry delivery", () => {
  const config: ClientSiteConfig = structuredClone(procurementEvidenceClient);
  config.mode = "publish";
  const issues = validateClientSiteConfig(config);
  assert.equal(issues.some((issue) => issue.path === "identity.displayName" && issue.severity === "error"), true);
  assert.equal(issues.some((issue) => issue.path === "inquiry.delivery" && issue.severity === "error"), true);
});

test("JSON-LD generators omit missing values and escape script delimiters", () => {
  const data = organizationJsonLd({ name: "Example <Factory>", url: "https://example.com" });
  assert.equal(data["@type"], "Organization");
  assert.equal("email" in data, false);
  assert.equal(serializeJsonLd(data).includes("\\u003cFactory>"), true);
});
