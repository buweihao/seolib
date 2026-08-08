# B2B Skincare Manufacturer Website Library

A static-first Astro foundation for building original English B2B websites for skincare, cosmetics, private-label, OEM, and ODM manufacturers.

## Current phase

Phase 1 establishes the application and design-system foundation. It intentionally contains no production homepage, theme composition, marketing section, CMS, or client content.

## Requirements

- Node.js `>=22.12.0 <25`
- npm `>=11 <12` (lockfile generated with npm `11.6.2`)

## Commands

```sh
npm ci
npm run dev
npm run check
npm run build
```

The production build is static and writes to `dist/`, which is suitable for Cloudflare Pages.

## Architecture

- `src/components/primitives/` — small reusable UI building blocks
- `src/components/sections/` — complete buyer-facing content modules
- `src/components/compositions/` — Premium, Manufacturing, and Launch page arrangements
- `src/config/` — future typed client configuration and theme mappings
- `references/` — private reference evidence and analysis, never production assets
- `docs/` — roadmap, design system, component catalog, workflow, and decisions

Read `AGENTS.md` before making architectural or component changes.
