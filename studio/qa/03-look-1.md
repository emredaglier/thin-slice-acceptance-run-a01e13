---
author: qa
verdict: pass
---

# QA 03-look, round 1

Ticket 03-look, PR #2, commit 80a8d13, tested at https://emres-macbook-pro.tail201ea9.ts.net:4400/ at 1280 px,
1440 px and 360 px wide (Playwright Chromium). Every number below comes from a `browser_evaluate` run on the
preview, named in brackets.

## Verdict

Pass. Each acceptance criterion is checked below. Two things are left open and named as such: the owner's eyes
on the look (G4) and the commands I may not run.

## Acceptance criteria

1. **Fraunces on headings, system sans on body; fonts defined only in `packages/ui/fonts.ts`.** Met.
   - Computed style on the preview (run: computed-style probe, 1280 px): `h1` and `h2` use
     `Fraunces, "Fraunces Fallback", Georgia, ..., serif` at weight 600 (h1 60 px, h2 30 px at 1280 px).
     `body`, `main p`, `a` and `footer` use `-apple-system, "system-ui", "Segoe UI", Roboto, ... sans-serif`.
   - `document.fonts` holds Fraunces faces at weight 600 only, one of them loaded. Network shows one font
     file, `/_next/static/media/a920104f1c789752-s.p.woff2`, 18,120 bytes decoded (`performance` resource
     entries). No second webfont.
   - Source (Grep on the checkout): `next/font`, `@font-face` and `Fraunces` appear in `packages/ui/fonts.ts`,
     `packages/ui/src/fonts.test.ts`, one comment in `globals.css` and the ADR. `fontVariables` is exported
     from `fonts.ts` and applied in `layout.tsx`.
   - I did not run `src/fonts.test.ts`: my shell does not run tests. CI is green; the command that proves it
     is `pnpm test`.
2. **Tokens in `packages/ui`; every pair's contrast computed and AA.** Met.
   - Tokens are in `packages/ui/src/tokens.ts` (paper `#faf6f0`, sand `#f1e9df`, ink `#2b211c`, ink-soft
     `#5c4a40`, clay `#8a3f21`). The preview's `<html style>` carries the same five values (probe).
   - I computed the WCAG ratios in the page from those hex values (contrast probe):

     | Pair | Used for | Ratio | Minimum |
     |---|---|---|---|
     | ink on paper | body text, headings | 14.59 | 4.5 |
     | ink-soft on paper | pitch, class length, note | 7.78 | 4.5 |
     | clay on paper | links, focus ring | 6.93 | 4.5 text, 3 ring |
     | ink-soft on sand | footer text | 6.96 | 4.5 |
     | clay on sand | focus ring in footer | 6.21 | 3 |
     | ink on sand | not used on the page | 13.06 | n/a |

     All meet AA. The clay-at-30% class dividers are decorative and I did not compute them.
   - The source tests in `tokens.test.ts` cover the same pairs. I did not run them.
3. **No third-party request.** Met on the preview (a built output). All 9 resource entries and the document
   come from `emres-macbook-pro.tail201ea9.ts.net:4400`; the list of origins is that one. The HTML of `/` has
   no `http(s)://` `src` or `href` (fetch and regex). The font `<link rel=preload>` points at `/_next/static/media/...`.
4. **Hover and focus states; transitions off under reduced motion.** Met.
   - Hover on the mailto link: colour goes from clay `rgb(138, 63, 33)` to ink `rgb(43, 33, 28)` and the
     underline from 1 px to 2 px. The transition is `color, text-decoration-thickness 0.15s`.
   - Tab to the link: `:focus-visible` matches, outline `solid 3px rgb(138, 63, 33)` with 3 px offset.
     It is visible in the 360 px and 1440 px screenshots.
   - With `prefers-reduced-motion: reduce` emulated (and the media query confirmed true), the link's
     computed transition is `all 0s`.
5. **`pnpm lint`, `typecheck`, `test`, `check:assets` pass.** Not run by me: my shell is read-only on the
   checkout and I start no builds or test runs. CI is green on this commit per the prompt. I could not
   re-verify it. `pnpm smoke` (axe) is the lead's and was not run by me.
6. **Report of the look.** Seen in screenshots, see below. The owner's eyes decide at G4. The diff adds
   no look or layout specs (the changed test files are `page.test.tsx` and `tokens.test.ts`, which test
   content and contrast numbers).

## Layout, as a visitor

- 360 px (screenshot `studio/qa/03-look-360.png`): `scrollWidth` 360 = `clientWidth` 360, and no element's
  right edge passes the viewport. h1 is 36 px. Each class reads name (Fraunces, bold), length (soft ink)
  beneath, price right-aligned (for example `Taster Wheel Session`, `2 hours`, `€45`). Footer is quieter
  and smaller (14 px on sand).
- 1280 px: `main` is 672 px wide, and `scrollWidth` equals `clientWidth` (1280). 1440 px screenshot
  `studio/qa/03-look-1440.png` shows a centred reading column, with spacing between sections.
- No-JavaScript content: the raw HTML from `fetch('/')` contains the name, the three headings, all three
  classes with their prices, the VAT note, the contact email, KvK, VAT ID and the privacy line. That is
  server HTML, so it does not depend on JavaScript.
- `/does-not-exist-qa` answers 404 with an `<h1>` and a "Back to the home page" link, styled with the same
  classes.
- Diff constraints: no photos, WebGL, scroll effects or SVG filters in the page source I read
  (`page.tsx`, `globals.css`, `layout.tsx`, `not-found.tsx`).

## Notes, not findings

- **Dependency.** The diff adds `"next": "16.4.5"` to `packages/ui/package.json` devDependencies. That is
  the version `apps/web` already uses, and `pnpm-lock.yaml` already lists it under `packages/ui`. No new
  package comes in. The ticket asks for a permission question for a *new* dependency (a font package);
  I count this as not one, but the producer may disagree.
- **Console error.** `/favicon.ico` returns 404 (one console error on load). The diff does not touch
  favicons, so it is not from this ticket. Not bounced.
- **Font declarations.** The page declares three Fraunces `FontFace` entries, but only one file is
  requested (`document.fonts` showed one loaded, two unloaded; one woff2 in the resource list).
- `EFFECT_PAGES` is untouched by the diff, so I saw no trip on the empty list. `pnpm smoke` would show it.

## Could not check

- How the look feels (type pairing, spacing rhythm, colour warmth): needs the owner's eyes at G4.
- Safari, Firefox, iPhone: I only tested Playwright Chromium. The `next/font` fallback metrics, system
  font rendering and the focus ring in Safari or on iOS are not checked.
- The four `pnpm` commands and `pnpm smoke`, as above.
- Hover transition timing felt on screen: I read the computed 0.15 s value only.
