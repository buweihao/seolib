# Shared site infrastructure

This is the one-time Phase 8.1 foundation reused by future client sites. A new client supplies configuration, verified content, deployment values, and editorial decisions; the SEO primitives and inquiry delivery code are not rebuilt.

## What is shared

- `BaseLayout.astro` renders canonical, robots, language alternates, Open Graph, Twitter, article metadata, and validated JSON-LD inputs.
- `src/seo/` contains CMS-neutral SEO types and Organization, Breadcrumb, and Article schema builders.
- `@astrojs/sitemap` generates public sitemap output and excludes all `/library/` review routes.
- `robots.txt.ts` blocks review routes and points crawlers to the sitemap.
- `InquiryForm-001` provides an accessible, progressively enhanced form with field errors, privacy consent, a honeypot, and first/last-touch attribution.
- `/api/inquiry` validates input again on the server, enforces exact origins and a Cloudflare rate-limit binding, escapes email content, and sends through Resend.
- `src/content-sources/` prevents components from depending directly on Sanity or another CMS.

## Per-client inputs

Every client must still provide and approve:

1. production domain, default locale, canonical rules, social image, and any language alternates;
2. verified organization facts and page-specific schema data;
3. a published privacy policy and version identifier;
4. receiving mailbox ownership and a Resend-verified sending domain;
5. exact production/preview origins and Cloudflare binding values;
6. real content, media rights, evidence status, and CMS ownership if a CMS is used.

Review pages stay `noindex` and the inquiry form stays disabled until those inputs pass `validateClientSiteConfig` in publish mode.

## Cloudflare Pages and Resend activation

The static site uses `public/_routes.json` so only `/api/*` invokes Pages Functions. Add the values shown in `.env.example` to the Cloudflare project; never commit real secrets.

Create a Cloudflare Rate Limiting binding named `INQUIRY_RATE_LIMITER`. The namespace ID must be unique within the Cloudflare account. A deployment configuration can use a policy similar to this, with limits approved for the specific client:

```json
{
  "ratelimits": [
    {
      "name": "INQUIRY_RATE_LIMITER",
      "namespace_id": "1001",
      "simple": { "limit": 5, "period": 60 }
    }
  ]
}
```

In Resend, verify the sending domain, create the API key, and set `INQUIRY_FROM_EMAIL` to that domain. Set `INQUIRY_TO_EMAIL` to the client-owned mailbox and test reply-to behavior with a real controlled submission after deployment.

The endpoint intentionally fails closed when any secret, origin allowlist, or rate-limit binding is missing. Provider/network failures return a generic error and never expose environment data.

## Content and Sanity boundary

Public pages consume the CMS-neutral `ContentSource` interface. The implemented Sanity adapter queries and normalizes published product categories and products into those records; shared components never contain GROQ queries or import a Sanity client.

The embedded Studio is mounted at `/admin` when the public Sanity project variables exist. Product schemas, null-safe normalization, review fallback, and publish-mode failure rules are shared. Creating the client-owned Sanity project, inviting editors, adding CORS origins, migrating verified products, and connecting the Cloudflare rebuild webhook remain per-client setup. Static pages remain build-time output.

Detailed setup is recorded in `docs/SANITY_PRODUCT_CATALOG.md`.

## Verification

Run the complete reusable check before a client launch:

```sh
npm run verify
```

Then review desktop and mobile output, inspect canonical/robots/schema on public pages, confirm `/library/` is absent from sitemap output, and perform a controlled end-to-end inquiry delivery test in the deployed environment.
