# Sanity product catalogue

## Scope

Sanity now owns customer-editable homepage Hero slides, product categories, and products. Company identity, component selection, theme tokens, navigation, contact delivery, verified evidence, domains, and secrets remain in typed configuration or hosting environment variables.

The public components remain CMS-neutral. Build-time pages call the Sanity adapter under `src/content-sources/sanity/`; the adapter returns the same normalized records as the local content source.

## Customer-editable documents

`网站设置` contains:

- one company name used consistently by the Header, Footer, and site metadata;
- one optional company Logo displayed before the company name in the top-left Header brand link;
- one to six Hero slides, each using one large uploaded image;
- optional center text and optional button text (blank values render nothing);
- an optional destination used by the whole slide image and its visible button;
- required alternative text for each image.

`Product category` contains:

- name, slug, description, image and alternative text;
- display order and locale;
- website publication status;
- optional SEO title and description.

`Product` contains:

- name, slug, category, summary, main image and alternative text;
- format and routine role;
- highlights, customization options, packaging options, and evaluation items;
- a `Hot 产品` switch that controls inclusion in the homepage shelf;
- display order, locale, website publication status, and optional SEO fields.

All editor-facing schema titles, groups, descriptions, statuses, and the Studio navigation are Chinese-first. Website copy remains English. Company name and Logo changes apply across all generated client pages at the next static build.

## Image delivery optimization

Sanity retains the uploaded master image. The website never requests that full master directly: the content adapter automatically builds Sanity CDN URLs with maximum display dimensions, quality control, `fit=max`, and browser-aware `auto=format`. It also supplies responsive `srcset` widths, so mobile devices download a smaller variant. Hero images use 640/960/1440/1920-pixel candidates; catalogue images use 360/600/900-pixel candidates.

Only Sanity documents that are published and have `Website status` set to `Published` are included in a static build.

## Local setup

1. Create a client-owned Sanity project and use dataset `production` unless another dataset is explicitly approved.
2. Copy `.env.example` to `.env` and set:

```text
PUBLIC_SANITY_PROJECT_ID=<client-project-id>
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-08-01
```

3. In Sanity Manage → API → CORS origins, add `http://localhost:4321` with credentials enabled.
4. Run `npm run dev` and sign in at `http://localhost:4321/admin/`.
5. Create categories first, then products that reference those categories.

Without `PUBLIC_SANITY_PROJECT_ID`, `/admin` is not generated and the review site uses the local catalogue. In `publish` mode, missing Sanity configuration, an empty catalogue, missing references, missing media, or incomplete buyer information fails the build.

## Production setup

Add these public variables to Cloudflare Pages for both Production and the intended Preview environments:

```text
PUBLIC_SANITY_PROJECT_ID=<client-project-id>
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-08-01
```

Add the exact production origin to Sanity CORS with credentials enabled so the embedded `/admin` Studio can authenticate.

Because the Astro site is static, publishing in Sanity does not update the site by itself. Create a Cloudflare Pages Deploy Hook for the production branch, then create a Sanity outgoing webhook:

- method: `POST`;
- dataset: `production`;
- trigger: create, update, delete;
- filter: `_type in ["homepageSettings", "product", "productCategory"] && !(_id in path("drafts.**"))`;
- projection: `{_id, _type, slug}`;
- URL: the private Cloudflare Deploy Hook URL.

The Deploy Hook URL is an operational secret and must not be committed or stored in a public Sanity document.

Cloudflare Pages projects created with Direct Upload do not have a Git build source, so a Deploy Hook cannot execute a build for them. Use a Git-integrated Pages project or a CI workflow that runs the build and Wrangler upload before relying on this webhook. Cloudflare does not support converting an existing Direct Upload project to Git integration.

## Acceptance test

1. Publish one category and one product with all fields present.
2. Run `npm run verify` and confirm the category and product routes are generated.
3. Change the product summary in `/admin`, publish it, and confirm the webhook starts a new Cloudflare build.
4. Confirm the deployed product page shows the new summary after that build completes.
5. Unpublish a test product and confirm its route disappears after the next build.
