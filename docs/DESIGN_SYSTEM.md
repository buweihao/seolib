# Design System

This document is the design-system contract, not a finished visual specification. Phase 1 establishes neutral working values so implementation and accessibility can be tested. Brand palettes, final type choices, composition-specific expression, and component styling remain **TBD** until supported by approved inputs.

The source of truth for implemented tokens is `src/styles/global.css`. Semantic `--ds-*` custom properties are mapped into Tailwind CSS 4 through `@theme inline`; components should consume semantic roles rather than raw palette values.

## Principles

- Original implementation informed by research, never a pixel-perfect clone
- Clear B2B information hierarchy and inquiry paths
- Shared foundations across Premium, Manufacturing, and Launch compositions
- Accessible, responsive, static-first output
- Client-specific variation through tokens, configuration, content, and media

## Typography

| Token or rule | Value | Status |
| --- | --- | --- |
| Primary typeface | Native UI sans-serif stack | Neutral working default |
| Display typeface | Inherits primary typeface | Final choice TBD |
| Base font size | `1rem` | Foundation value |
| Display size | `clamp(2.25rem, 6vw, 4.75rem)` | Provisional fluid scale |
| Display line height | `1.05` | Provisional; review with real headings |
| Body line height | `1.65` | Foundation value |
| Maximum reading width | `42rem` / approximately `62ch` where appropriate | Foundation value |

Typography must preserve semantic heading order. Visual size must not be used as a substitute for document structure.

## Colors

| Role | Value | Status |
| --- | --- | --- |
| Page background | `--ds-color-canvas` | Neutral working value |
| Surface | `--ds-color-surface` | Neutral working value |
| Primary text | `--ds-color-ink` | Neutral working value |
| Muted text | `--ds-color-muted` | Neutral working value |
| Brand/accent | `--ds-color-accent` | Placeholder semantic role; final mapping TBD |
| Border | `--ds-color-border` | Neutral working value |
| Focus | `--ds-color-focus` | Foundation value |
| Success/error | TBD | Add when a validated component requires them |

Text, controls, focus indicators, and interactive states target WCAG 2.2 AA. Revalidate every client or composition token mapping.

## Spacing

- Base unit: `0.25rem`
- Foundation steps: `0.25`, `0.5`, `0.75`, `1`, `1.5`, `2`, `3`, `4`, and `6rem`
- Component-specific text-to-action spacing: TBD
- Card internal spacing: TBD when a card primitive is approved
- Grid gaps: choose from the foundation scale; exact composition mappings TBD

Use a small named scale instead of arbitrary per-component values once approved.

## Container widths

- Reading container: `42rem`
- Standard content container: `72rem`
- Wide/media container: `88rem`
- Page gutter: `clamp(1rem, 4vw, 2rem)`

Containers should be reusable primitives and must not encode a client identity.

## Grid

- Global column count: none; select a grid from actual section content
- Default mobile behavior: content-first single column unless evidence supports otherwise
- Tablet and desktop columns: TBD per approved section pattern
- Tracks must tolerate intrinsic content and avoid horizontal overflow
- Gaps must use the foundation spacing scale

Choose layouts from content needs and reference analysis, not from a universal fixed card count.

## Border radius

- Control radius: `0.375rem`
- Card radius: `0.75rem`
- Media radius: `1rem`
- Pill treatment: TBD; use only when the component purpose supports it

Composition themes may map these semantic roles to different values without changing component markup.

## Buttons

`ActionLink-001` now provides neutral primary, secondary, and text-link variants for navigation and CTA destinations. A true Button primitive for in-page actions remains deferred until an approved interaction requires it.

Action and future button review must cover:

- default, hover, active, focus-visible, and disabled states;
- link versus action semantics;
- minimum pointer target goal of `44 × 44px`, with documented exceptions where necessary;
- icon labeling and placement when icons are introduced;
- single clear primary action within a local section.

## Images

- `MediaFrame-001` preserves explicit intrinsic width and height and supports `portrait`, `landscape`, and `square` geometry.
- Images remain responsive with bounded block size; section components select a content-appropriate aspect rather than applying one global crop.
- Loading defaults to lazy and may be set to eager for above-the-fold media.
- Responsive source widths: TBD
- Placeholder/error treatment: TBD
- Caption and credit treatment: TBD

Use original, licensed, or client-provided media only. Meaningful images require useful alternative text; decorative images must be marked accordingly.

## Section spacing

- Compact: `clamp(3rem, 7vw, 5rem)`
- Standard: `clamp(4rem, 9vw, 7rem)`
- Feature/editorial: `clamp(5rem, 12vw, 10rem)`
- Mobile behavior is included in the fluid values; section-specific exceptions require review

Spacing should express section relationships and composition character while sharing a controlled scale.

## Responsive breakpoints

| Range or breakpoint | Value | Intended use |
| --- | --- | --- |
| Base/mobile | `<40rem` | Content-first single-column behavior |
| `sm` | `40rem` | Small layout enhancement |
| `md` | `48rem` | Transitional/tablet layouts |
| `lg` | `64rem` | Multi-column compositions where content allows |
| `xl` | `80rem` | Wide layout refinement |
| `2xl` | `96rem` | Controlled wide-media use only |

These are Tailwind CSS 4 defaults, not mandatory points for every change. Components should respond at layout failure points, and desktop/mobile reference evidence should inform behavior.

## Accessibility foundation

- Use semantic landmarks and one clear page-level heading.
- Preserve visible keyboard focus with the shared focus token.
- Avoid motion by default; respect `prefers-reduced-motion` when motion is justified later.
- Keep meaningful imagery labeled and decorative imagery ignored by assistive technology.
- Do not encode meaning by color alone.
- Validate client token mappings and interactive components against WCAG 2.2 AA.

## Theme directions

The following are composition goals, not three independent design systems:

- **Premium:** spacious, editorial, scientific, premium, restrained
- **Manufacturing:** trustworthy, capable, professional, clear hierarchy
- **Launch:** approachable, modern, easy, conversion-focused

The approved Premium composition has a mapping scoped to `.premium-homepage`: a native serif display stack, warm neutral surfaces, dark botanical ink/accent, larger section spacing, and restrained radii. It passed WCAG 2.2 AA contrast checks and does not replace the neutral global defaults.

The approved Manufacturing composition has a mapping scoped to `.manufacturing-homepage`: system sans-serif display and body typography, cool neutral surfaces, industrial blue/mineral accents, tighter section spacing, restrained radii, and explicit border-led grouping. It passed WCAG 2.2 AA contrast and Premium/global token-isolation checks.

The Launch composition in Review has a mapping scoped to `.launch-homepage`: system sans-serif typography, bright mint-neutral canvas and surfaces, a clear teal accent, restrained warm supporting media, intermediate section spacing, and softer card/media radii. Text/action contrast and focus indicators passed the relevant WCAG 2.2 AA thresholds, and the mapping remained isolated from Premium, Manufacturing, and global defaults.
