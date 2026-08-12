# B2B Skincare Manufacturer Website Library

A static-first Astro foundation for building original English B2B websites for skincare, cosmetics, private-label, OEM, and ODM manufacturers.

## Current phase

Phase 7, Phase 7.5, and the first Phase 8 client composition are in review. The shared Phase 8.1 SEO, CMS-boundary, and inquiry infrastructure is implemented; real client domains, content, privacy ownership, Resend/Cloudflare activation, public routes, and deployment remain client launch work.

## Requirements

- Node.js `>=22.12.0 <25`
- npm `>=11 <12` (lockfile generated with npm `11.6.2`)

## Commands

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify
```

The production build is static and writes to `dist/`, which is suitable for Cloudflare Pages.

## Architecture

- `src/components/patterns/` — interchangeable UI implementations grouped by content purpose
- `src/content-models/` — UI-independent typed content contracts

- `src/components/primitives/` — small reusable UI building blocks
- `src/components/sections/` — complete buyer-facing content modules
- `src/components/compositions/` — Premium, Manufacturing, and Launch page arrangements
- `src/config/` — future typed client configuration and theme mappings
- `src/content-sources/` — CMS-neutral content contracts and adapters
- `src/seo/` — shared metadata and structured-data contracts
- `src/inquiry/` and `functions/api/` — shared inquiry validation and delivery
- `references/` — private reference evidence and analysis, never production assets
- `docs/` — roadmap, design system, component catalog, workflow, and decisions

Read `AGENTS.md` before making architectural or component changes.
