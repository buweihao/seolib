# Reference Workflow

External websites are research inputs. They may inform information architecture, section order, layout concepts, spacing principles, typography hierarchy, visual balance, CTA hierarchy, and responsive behavior. They are not sources for copied code, branding, media, copy, or proprietary visual design.

## Standard workflow

1. Record the source URL and access date.
2. Capture a desktop screenshot at a documented viewport.
3. Capture a mobile screenshot at a documented viewport.
4. Save HTML only when it is useful and lawful for private analysis.
5. Create `notes.md` from the template below.
6. Identify and name the page sections in order.
7. Analyze content structure.
8. Analyze UI patterns separately.
9. Decide whether a reusable pattern exists.
10. Implement an original component only when approved.
11. Review the original implementation visually on desktop and mobile.
12. Add the reviewed component to `COMPONENT_LIBRARY.md` with its status.

## Required separation

### Content structure analysis

For every significant section, answer:

- What does the section communicate?
- Which buyer question, concern, or task does it address?
- Why does it appear at this point in the page?
- How does it connect to the preceding and following sections?

### UI pattern analysis

For every significant section, answer:

- What is the layout model?
- What is the approximate image-to-text balance?
- How is the typography hierarchy expressed?
- How does spacing group or separate information?
- Where are primary and secondary CTAs placed?
- How does behavior change between desktop and mobile?

Do not treat a content pattern and its observed visual treatment as inseparable. A content logic from one source may be combined with an independently observed UI principle and an original implementation.

## Reuse decision

Before proposing a component, record:

- the recurring buyer need;
- which parts are stable structure;
- which parts must be props or structured content;
- whether an approved component already solves it;
- how the implementation will remain visually and technically original.

## Reference notes template

Copy this template to `references/<site-slug>/notes.md`.

```md
# Reference: <descriptive site name>

## Source

- URL: <https://example.com/page>
- Accessed: YYYY-MM-DD
- Page: <page name>
- Desktop viewport: <width × height>
- Mobile viewport: <width × height>
- Usage: Internal research only

## Saved evidence

- Desktop screenshot: `screenshots/home-desktop.png`
- Mobile screenshot: `screenshots/home-mobile.png`
- HTML: `html/home.html` or Not saved

## Page outline

1. <Section name>
2. <Section name>

## Content structure analysis

### <Section name>

- Communicates:
- Buyer need:
- Reason for position:
- Relationship to adjacent sections:

## UI pattern analysis

### <Section name>

- Layout:
- Image/text balance:
- Typography hierarchy:
- Spacing:
- CTA placement:
- Desktop/mobile change:

## Candidate reusable principles

- <Abstract principle, not copied expression>

## Originality and rights check

- [ ] No third-party logo or branding will be reused
- [ ] No third-party product imagery will be reused
- [ ] No substantial copy will be reused
- [ ] No HTML or CSS will be copied into production
- [ ] Proposed implementation differs in expression and uses original assets/code

## Component decision

- Decision: None / Extend existing / Propose new
- Component ID or candidate name:
- Reason:
- Required configurable inputs:
- Review notes:
```
