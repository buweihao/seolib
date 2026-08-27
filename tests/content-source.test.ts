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
  assert.equal(products[0]?.isHot, false);
});

test("Sanity homepage settings keep optional Hero copy blank and optimize responsive images", async () => {
  const source = createSanityContentSource({
    async fetch<T>(): Promise<T> {
      return {
        companyName: "Example Skincare Lab",
        logo: {
          src: "https://cdn.sanity.io/images/project/production/logo.png",
          alt: "Example Skincare Lab logo",
          width: 600,
          height: 600,
        },
        heroSlides: [{
          title: "  ",
          buttonLabel: "View products",
          href: "/products/",
          media: {
            src: "https://cdn.sanity.io/images/project/production/hero.jpg",
            alt: "Skincare collection",
            width: 2400,
            height: 1200,
          },
        }],
      } as T;
    },
  });

  const homepage = await source.getHomepageSettings();
  assert.equal(homepage?.companyName, "Example Skincare Lab");
  assert.equal(homepage?.logo?.width, 240);
  assert.equal(homepage?.logo?.sizes, "3rem");
  assert.equal(homepage?.heroSlides[0]?.title, undefined);
  assert.equal(homepage?.heroSlides[0]?.buttonLabel, "View products");
  assert.equal(homepage?.heroSlides[0]?.href, "/products/");
  assert.equal(homepage?.heroSlides[0]?.media.width, 1920);
  assert.match(homepage?.heroSlides[0]?.media.src ?? "", /auto=format/);
  assert.match(homepage?.heroSlides[0]?.media.srcset ?? "", /640w/);
  assert.equal(homepage?.heroSlides[0]?.media.sizes, "100vw");
});

test("Sanity About content maps the four reference sections into responsive media records", async () => {
  const source = createSanityContentSource({
    async fetch<T>(query: string): Promise<T> {
      assert.match(query, /companyDescription/);
      assert.match(query, /"text": coalesce\(text, textI18n\.en, ""\)/);
      assert.match(query, /"subtitle": coalesce\(subtitle, subtitleI18n\.en, ""\)/);
      assert.doesNotMatch(query, /\.zh/);
      return {
        company: {
          companyVideoUrl: "https://cdn.sanity.io/files/project/production/company.mp4",
          companyDescription: "A structured company story.",
          companyImages: [{
            src: "https://cdn.sanity.io/images/project/production/company.jpg",
            alt: "",
            width: 2400,
            height: 1600,
          }],
        },
        recommendation: {
          items: [{
            media: {
              src: "https://cdn.sanity.io/images/project/production/recommendation.jpg",
              alt: "",
              width: 1200,
              height: 900,
            },
            text: "Recommended direction",
          }],
        },
        gallery: {
          images: [{
            src: "https://cdn.sanity.io/images/project/production/gallery.jpg",
            alt: "Gallery image",
            width: 1600,
            height: 900,
          }],
        },
        carousel: {
          subtitle: "A closer look at the company.",
          images: [{
            src: "https://cdn.sanity.io/images/project/production/carousel.jpg",
            alt: "Company showcase",
            width: 1000,
            height: 750,
          }],
        },
      } as T;
    },
  });

  const about = await source.getAboutContent();
  assert.equal(about?.companyVideoUrl, "https://cdn.sanity.io/files/project/production/company.mp4");
  assert.equal(about?.companyDescription, "A structured company story.");
  assert.equal(about?.companyImages[0]?.alt, "Company image 1");
  assert.equal(about?.companyImages[0]?.width, 1600);
  assert.match(about?.companyImages[0]?.src ?? "", /fit=max/);
  assert.equal(about?.recommendationItems[0]?.text, "Recommended direction");
  assert.equal(about?.recommendationItems[0]?.media.alt, "Recommendation image 1");
  assert.equal(about?.galleryImages.length, 1);
  assert.equal(about?.carouselSubtitle, "A closer look at the company.");
  assert.equal(about?.carouselImages.length, 1);
});
