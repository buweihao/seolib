# Content sources

Public pages consume the CMS-neutral `ContentSource` interface. Local review data, Astro content collections, and the Sanity adapter normalize into the same product category, product, article, and landing-page records.

Shared components must not issue GROQ queries or import a Sanity client. The adapter under `src/content-sources/sanity/` is responsible for:

- querying only published, non-draft documents;
- converting Portable Text, images, references, and localized fields;
- validating slugs, SEO fields, publication state, evidence state, and media rights;
- returning the CMS-neutral records defined in `types.ts`;
- failing the production build when required content is invalid rather than silently publishing fictional fallback data.

The local adapter remains the review/development fallback. When `PUBLIC_SANITY_PROJECT_ID` is configured, the client catalogue loads published product categories and products from Sanity at build time. In `publish` mode, missing Sanity configuration or incomplete catalogue content fails the build instead of silently publishing fallback data.

See `docs/SANITY_PRODUCT_CATALOG.md` for client setup, CORS, editing, and static rebuild instructions.
