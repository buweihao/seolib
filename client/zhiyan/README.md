# ZhiYan client deployment

This directory is the client-specific deployment and CMS control point for the
ZhiYan skincare site. Shared Astro components remain in the repository-level
`src/` library; this directory must not contain copied third-party site code or
credentials.

## Current external targets

- Cloudflare Pages project: `zhiyan-buweihao`
- Pages URL: `https://zhiyanskincare.pages.dev/`
- GitHub repository currently attached to this workspace: `buweihao/seolib`
- Sanity project configured by the repository CLI config: `38v66hkz`
- Sanity dataset: `production`
- Sanity Studio route: `/admin/`

## Expected Pages build settings

- Root directory: repository root (`.`)
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: confirm in the Cloudflare Pages project before binding

The production branch is intentionally not guessed here. The current checkout
is `agent/multi-page-client-config`, while the live ZhiYan page is not identical
to the current local review-hub homepage. Verify the Cloudflare source commit
before changing the Pages Git integration.

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

## Pending external setup

- Re-authenticate GitHub CLI before pushing.
- Provide a valid Cloudflare API token or complete the Pages dashboard GitHub
  connection.
- Confirm the production branch and source commit for the live site.
- Confirm Sanity Manage access and CORS origins for the production site.
