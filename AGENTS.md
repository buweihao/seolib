# B2B Skincare Manufacturer Website Library

## Project goal

Build a long-lived library for producing original English B2B websites for Chinese skincare, cosmetics, private-label, OEM, and ODM manufacturers. The repository contains two distinct assets:

- a reference library for research and analysis;
- a shared component library for composing client websites.

## Technology

- Astro 7.x, TypeScript 5.9.x, and Tailwind CSS 4.x
- Static-first, semantic HTML, and responsive design
- Cloudflare Pages friendly output
- No React, Vue, Svelte, animation library, or heavy UI framework without a documented need

Use npm 11.x as the only package manager. Review major-version changes through the decision log before upgrading.

## Architecture rules

- Use four levels: primitives, sections, page compositions, and client configuration/content.
- Premium, Manufacturing, and Launch are compositions of one shared library, not separate duplicated projects.
- Keep client facts, copy, media, contact details, and theme choices in props, configuration, or structured content.
- Prefer extending an approved component over creating a client-specific copy.

## Component rules

- A component must have one clear content purpose and a typed public interface.
- Do not hard-code client-specific company names, MOQ, dates, certifications, factory facts, case studies, or contact details.
- Use semantic markup, accessible interaction patterns, and responsive behavior.
- Register new components and status changes in `docs/COMPONENT_LIBRARY.md`.

## Reference rules

- References are research inputs, never template code sources.
- Separate content-structure analysis from UI-pattern analysis.
- Never copy third-party branding, logos, images, copy, complete HTML/CSS, or proprietary visual design.
- Implement reusable patterns with original code and original assets.
- Follow `docs/REFERENCE_WORKFLOW.md` for every added reference.

## Coding standards

- Keep TypeScript strict and component APIs explicit.
- Keep components small, composable, and free of avoidable client coupling.
- Use semantic HTML before adding abstractions or client-side JavaScript.
- Keep one package manager and its matching lockfile.
- Do not modify unrelated files.

## Quality checks

Before completing a phase:

- run the available build and type checks;
- review desktop and mobile behavior for visual work;
- check keyboard access, headings, landmarks, alternative text, and focus states;
- update `docs/ROADMAP.md` and any affected decision or component records;
- verify that no third-party protected material was copied.
