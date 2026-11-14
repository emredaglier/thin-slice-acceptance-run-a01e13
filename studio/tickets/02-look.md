---
author: producer
class: standard
assignee: frontend
---

# 02: The look

**Superseded by `03-look` (2026-11-14, owner's request). Don't run this ticket.** It was handed
back as stuck only because ticket 01 hadn't merged yet. Ticket 03 has the same scope and starts
from the merged `main`.

Give the page from ticket 01 its look: warm and calm, mobile first, type and colour only. This
ticket needs ticket 01 merged first. Plan: `studio/plan.md`.

## Scope

- **Fonts:**
  - Fraunces for headings, defined only in `packages/ui/fonts.ts` (ADR-0001) and listed in
    `fontVariables`.
  - Body text uses the system sans stack, with no second webfont.
  - Load only the Latin subset and the axes or weights the headings use.
  - The font file must be served from our own origin, with no runtime request to a third party.
  - A new npm dependency (for example a font package) comes to me as a permission question
    first.
- **Colours:**
  - Design tokens in `packages/ui`: an off-white background, a clay-brown accent and a text colour.
  - Compute the contrast ratio of every text and background pair, and of the focus ring, and report
    the numbers. Targets are WCAG AA: 4.5:1 for body text, 3:1 for large text and focus
    indicators.
  - Darken the brown if it fails as text.
- **Layout:**
  - Mobile first, from 360 px wide, with no horizontal scroll.
  - Comfortable reading width on large screens.
  - Clear spacing between sections.
  - Classes read as name, length and price at a glance.
- **Footer:** the legal block and the privacy note, quiet and smaller, but still AA.
- **States:**
  - Hover and visible `:focus-visible` states on the links.
  - Transitions only on hover and focus, and none under `prefers-reduced-motion: reduce`.
- **Constraints:**
  - No photos, no WebGL, no scroll effects, no SVG filters.
  - Content must stay complete without JavaScript (ADR-0008).
  - Mind `pnpm check:assets`: re-encode or subset the font, and don't raise the limit.

## Acceptance criteria

- [ ] Fraunces is on the headings and the system sans on body text. Fonts are defined only in
      `packages/ui/fonts.ts`, and `src/fonts.test.ts` passes.
- [ ] The off-white, clay-brown and text tokens live in `packages/ui`. Each colour pair's contrast
      ratio is computed and reported, and all meet AA.
- [ ] No request goes to a third-party origin for fonts or anything else. Check the built output,
      or report it as unverified and name the command that proves it.
- [ ] Links have hover and visible focus states. Transitions are off under reduced motion.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm check:assets` pass, with each result
      reported. `pnpm smoke` (axe, including contrast) is left to the lead and reported as not run.
- [ ] Report what changed in the look and what you could not see. The owner's eyes on the preview,
      from 360 px wide upward, decide at G4. Add no automated look or layout specs
      (`CODING_STANDARDS.md`).
