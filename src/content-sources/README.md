# Content sources

Public pages consume the CMS-neutral `ContentSource` interface. Local review data, Astro content collections, and a future Sanity adapter must normalize into the same product category, product, article, and landing-page records.

Shared components must not issue GROQ queries or import a Sanity client. A Sanity adapter belongs under `src/content-sources/sanity/` and is responsible for:

- querying only published, non-draft documents;
- converting Portable Text, images, references, and localized fields;
- validating slugs, SEO fields, publication state, evidence state, and media rights;
- returning the CMS-neutral records defined in `types.ts`;
- failing the production build when required content is invalid rather than silently publishing fictional fallback data.

The local adapter is available now for review fixtures and tests. Sanity packages and project configuration remain deferred until a real project ID, dataset, schema migration, and editorial ownership are approved.
