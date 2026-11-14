---
author: producer
class: standard
assignee: frontend
gate-safe: yes
---

# 06: Mail link tap target

QA fix after G4, accessibility on merged work. It doesn't count toward the two-ticket cap
(`studio/plan.md`).

Finding: `studio/qa/rubric-2.md`, Mobile: "The one interactive element, the mail link, is short
for a finger tap: 21 px high at phone width" [t7]. WCAG 2.2 SC 2.5.8 (Target Size, Minimum, AA)
asks for at least 24 × 24 CSS px. The link stands alone in Contact, so the inline-text exception
doesn't cover it.

## Scope

- Make the Contact mail link's hit area at least 24 px high and 24 px wide at every width, from
  360 px up. Use padding, line height or block display. Keep its look the same: underline, colour
  and focus outline (3 px, 3 px offset).
- Check the rest of the page for any other link or control under 24 px and fix it the same way.
- Don't change any text, colour token or font. Keep the look tokens in `packages/ui`.
- No new dependency. Add no automated spec for look or layout (`CODING_STANDARDS.md`).

## Acceptance criteria

- [ ] The mail link's box is at least 24 × 24 CSS px at 360 px wide. Report how you made sure (the
      CSS values that set it). The measurement in a browser is left to QA: report it as not run.
- [ ] The focus outline and underline are unchanged.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm check:assets` pass, with each result
      reported.
- [ ] The look is for the owner's eyes. Say what changed and what you couldn't see.
