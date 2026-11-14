---
author: qa
verdict: pass
---

# QA 06-mail-link-target, round 1

Ticket 06, PR #5, commit 01a5d880d54a9432292c1f4a7a3f70d5d0ecc59e, preview https://emres-macbook-pro.tail201ea9.ts.net:4401/.
The diff is one file, `apps/web/src/app/globals.css`, +5 lines. It touches the global `a` rule, so I also checked the 404 page.

## Runs

- r1: read `apps/web/src/app/globals.css` and grepped `apps/web/src` for links and controls in the branch checkout.
- r2: `browser_evaluate` on `/` at 360 × 740, after waiting for finite animations: bounding boxes and computed styles of every `a, button, input, select, textarea, summary, [tabindex]`.
- r3: Tab key on `/` at 360 px, then `browser_evaluate` for computed outline, underline and focus state of the mail link.
- r4: screenshot of the `address` element at 360 px with the link focused (`studio/qa/06-mail-link-360-focus.png`).
- r5: `browser_evaluate` on `/` at 1280 × 800: bounding boxes of all interactive elements.
- r6: `/no-such-page` at 1280 px and at 360 px: bounding box of its link, and console errors.

## Criteria

1. **Mail link box is at least 24 × 24 px at 360 px wide: pass.**
   - At 360 px the link measures 214.2 × 28 px [r2]. At 1280 px it measures 214.2 × 28 px [r5].
   - The CSS that sets it is `display: inline-block; min-height: 24px; min-width: 24px` on `a` in `globals.css` lines 31 to 34 [r1]. The 28 px comes from the computed `line-height` of 28 px (font size 18 px), as the link is now an inline-block [r2].
   - It was 21 px before, per rubric-2, so the box grew by about 7 px; I did not measure main myself.
   - I measured only 360 px and 1280 px, not the widths between.
   - There is no horizontal overflow: scrollWidth is 360 at 360 px and 1280 at 1280 px [r2, r5].
2. **Focus outline and underline unchanged: pass.**
   - Focused by keyboard at 360 px, the link computes `outline: 3px solid rgb(138, 63, 33)`, `outline-offset: 3px`, `border-radius: 2px` [r3]. That matches the `a:focus-visible` rule in the source, which the diff did not touch [r1].
   - Unfocused, it computes underline, 1 px thickness, 3.6 px offset (0.2em at 18 px) and colour rgb(138, 63, 33) [r2]. These match the unchanged rule.
   - I did not measure main, so "unchanged" rests on the diff touching only the 5 new lines and on the computed values matching the source.
   - The screenshot shows the outline round the link, with the underline inside it [r4].
3. **Lint, typecheck, test, check:assets: not checked by me.** CI is green per the prompt. QA does not run them.
4. **Look for the owner's eyes: needs your eyes.** I measured the box and the computed style values. Whether the line spacing around the link looks the same is a visual call. The link's box got taller by about 7 px (21 to 28 px), so the Contact block may sit a little lower.

## Other links and controls (ticket scope)

- `/` has exactly one interactive element, the mail link [r2, r5].
- `/no-such-page` (404) has one, "Back to the home page", at 185.3 × 28 px at 1280 px and 360 px [r6]. Both are at least 24 × 24 px.

## Notes

- Builder comment in `globals.css` says the line height is "about 29px". The measured computed value is 28 px [r2]. The comment is slightly off, and the 24 px minimum is met either way. This is not a bounce reason.
- 404 page console shows one error, "Failed to load resource: 404" for the missing page itself [r6]. This is expected.
- I cannot see which commit the preview serves. I took the prompt's word that it is 01a5d88.
- Not checked: WebKit, Firefox and a real iPhone. I ran Chromium only.
