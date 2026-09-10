# Reference: Supplied contact UI

## Source

- URL: Not supplied
- Received: 2026-08-24
- Evidence: `screenshots/split-contact-form-desktop.png`, 1375 × 802
- Mobile evidence: Not supplied
- Usage: Internal UI research only

## Content structure analysis

The crop pairs direct contact routes with a conventional project form. The context column supports buyers who prefer messaging, a call, email, or a visit, while the form captures enough detail for an asynchronous response.

## UI pattern analysis

The desktop layout uses a narrow context column and wider two-column form beneath a centered title. Compact circular icons make the contact routes scannable. Because no mobile evidence exists, the library implementation uses an original content-first single-column order below the shared breakpoint.

## Reuse decision

- Decision: Propose `ContactWorkspace-001`.
- Stable structure: heading, context description, typed contact routes, configurable form, and submit state.
- Configurable inputs: every label, destination, field, required state, endpoint, and delivery note.
- Original treatment: theme tokens, original glyphs, different spacing and proportions, accessible controls, and no copied contact facts.

## Originality and rights check

- [x] No branding, contact details, copy, or code is reused
- [x] No source media enters production code
- [x] The implementation remains disabled until a verified endpoint is configured
