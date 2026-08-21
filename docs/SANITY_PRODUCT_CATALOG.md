# Sanity product catalogue

## Scope

Sanity now owns customer-editable product categories and products. Company identity, component selection, theme tokens, navigation, contact delivery, verified evidence, domains, and secrets remain in typed configuration or hosting environment variables.

The public components remain CMS-neutral. Build-time pages call the Sanity adapter under `src/content-sources/sanity/`; the adapter returns the same normalized records as the local content source.

## Customer-editable documents

`Product category` contains:

- name, slug, description, image and alternative text;
- display order and locale;
- website publication status;
- optional SEO title and description.

`Product` contains:

- name, slug, category, summary, main image and alternative text;
- format and routine role;
- highlights, customization options, packaging options, and evaluation items;
- display order, locale, website publication status, and optional SEO fields.

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
- filter: `_type in ["product", "productCategory"] && !(_id in path("drafts.**"))`;
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
