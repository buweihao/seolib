# Client configuration

Phase 8 stores each client site as one typed configuration rather than copying components. Shared contracts live in `schema.ts`, publish-safety checks live in `validate.ts`, and individual client configurations live under `clients/`.

## Onboarding workflow

1. Copy an existing direction-compatible client configuration and assign a stable `siteId`.
2. Keep `mode: "review"` while identity, claims, contact routes, media rights, or commercial facts are pending.
3. Configure the five root-relative routes for Home, Products, Capabilities, About, and Contact.
4. Record the approved required pattern IDs and the status of every optional pattern.
5. Replace homepage and inner-page review content with client-supplied content models; do not put client values into components.
6. Register every visible media source and record its usage-rights status.
7. Add an evidence record for supplier identity, capabilities, quality, product scope, facility facts, commercial terms, and any other publishable claim family.
8. Run `validateClientSiteConfig`, `npm run check`, and `npm run build`, then review all five routes at 390px, 768px, and 1440px.
9. Change to `mode: "publish"` only after validation reports no errors and every required fact and media source is verified.

SEO settings and inquiry delivery are also client configuration. Set the production origin, locale, social image, and language alternates in `seo`; set the public endpoint, form type, privacy policy/version, origin allowlist, and environment key names in `inquiry`. Secrets remain in the hosting environment.

`review` mode permits pending fields but surfaces warnings. `publish` mode converts pending identity, evidence, contact, and media records into blocking errors.

The first implementation is `clients/procurement-evidence.ts`. It configures one homepage plus Products, Capabilities, About, and Contact pages under the noindex client-preview route. It remains review-only because no real client facts, public contact ownership, or delivery configuration have been supplied.

The reusable mechanics and deployment checklist are documented in `docs/SHARED_SITE_INFRASTRUCTURE.md`.
