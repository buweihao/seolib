# ZhiYan client deployment

This directory is the client-specific deployment and CMS control point for the
ZhiYan skincare site. Shared Astro components remain in the repository-level
`src/` library; this directory must not contain copied third-party site code or
credentials.

## Current external targets

- Cloudflare Pages project: `zhiyanskincare`
- Pages URL: `https://zhiyanskincare.pages.dev/`
- GitHub repository connected to Pages: `buweihao/zhiyanskincare`
- Sanity project configured by the repository CLI config: `38v66hkz`
- Sanity dataset: `production`
- Sanity Studio route: `/admin/`

## Expected Pages build settings

- Root directory: repository root (`.`)
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: confirm in the Cloudflare Pages project before binding

Cloudflare Pages is connected to `buweihao/zhiyanskincare` on `main`, with
automatic deployments enabled. The live ZhiYan source remains in that client
repository; this `seolib` folder is the library-side deployment and CMS record,
not a duplicate copy of the site source.

## Sanity to Cloudflare automatic rebuild

Sanity publishing does not update a static Astro site by itself. The production
chain should be:

1. Configure `PUBLIC_SANITY_PROJECT_ID=38v66hkz`,
   `PUBLIC_SANITY_DATASET=production`, and
   `PUBLIC_SANITY_API_VERSION=2026-08-01` in Cloudflare Pages.
2. Create a Cloudflare Pages Deploy Hook for the confirmed production branch.
3. In Sanity Manage, create an outgoing webhook targeting that Deploy Hook.
4. Use `POST`, dataset `production`, and create/update/delete triggers.
5. Limit the webhook to published customer-facing documents:

   ```groq
   _type in ["product", "productCategory", "homepageSettings", "aboutPage", "aboutRecommendation", "aboutImageGallery", "aboutCompanyCarousel"] && !(_id in path("drafts.**"))
   ```

6. Publish or unpublish one test document and confirm that Cloudflare starts a
   new deployment and the public page reflects the change.

Never store Sanity tokens, Cloudflare API tokens, or Deploy Hook URLs in this
directory or in Git.

## External setup status

- Pages GitHub connection: complete (`buweihao/zhiyanskincare`, `main`).
- Cloudflare Deploy Hook: created as `sanity-production-rebuild` for `main`.
- Sanity CLI webhook: complete (`zhiyanskincare-cloudflare-rebuild`).
- Cloudflare Pages production variables: complete (`SITE_URL`, `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SANITY_API_VERSION`).
- End-to-end Deploy Hook test: complete; Cloudflare production deployment succeeded.
- Keep Deploy Hook URLs, Sanity tokens, and Cloudflare API tokens out of Git.
