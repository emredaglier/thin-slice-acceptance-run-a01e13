---
author: qa
verdict: pass
---

# QA: 04-favicon, PR #4, commit 2698e12

Tested on https://emres-macbook-pro.tail201ea9.ts.net:4402/ in the browser tools (Chromium), at the
default desktop width and at 390 x 844. The icon does not depend on viewport; both widths gave the
same result. Source read in the branch checkout `tickets/04-favicon` with Read, Grep and Glob.

## Acceptance criteria

1. **`/favicon.ico` is a tracked file under `apps/web/src/app/`, a clay-brown K on off-white. Size and pixels: met.**
   - Glob of `apps/web/src/app/**` lists `favicon.ico` next to `layout.tsx`. The diff stat names this one
     file and nothing else, so no route folder was added and `src/routes.test.ts` is untouched.
   - Size: 306 bytes (`browser_evaluate`, `fetch('/favicon.ico')`, byte length of the body).
   - Dimensions: 32 x 32 px, one image in the ICO directory (32 bpp), stored as an embedded PNG (PNG
     signature at offset 22). Chromium decoded it to `naturalWidth`/`naturalHeight` 32 x 32.
   - Colours (canvas `getImageData` on the decoded image): the 1024 pixels are 786 x `#faf6f0` and
     175 x `#8a3f21`, plus 63 anti-aliasing blends in 14 further values. `#faf6f0` is `paper` and
     `#8a3f21` is `clay` in `packages/ui/src/tokens.ts:3,7`, so the tokens are the ones used.
   - Shape: an ASCII dump of the pixels and an 8x screenshot (`studio/qa/04-favicon-1-icon.png`) show a
     capital K: a vertical stem, an upper arm and a lower leg meeting at the stem. By the same pixel dump it
     spans columns 8 to 25 and rows 6 to 25, so the paper margin is 8 px left, 6 px right, 6 px top and 6 px bottom
     (slightly off-centre to the left).
2. **Nothing about it is requested from a third-party origin: met.** `performance.getEntriesByType('resource')`
   on the loaded home page gave exactly one host, the preview origin. The icon link in the page head is
   `<link rel="icon" href="/favicon.ico?53640c3fd80b4470" type="image/x-icon" sizes="32x32">`, a relative
   URL, and the 404 page carries the same link. The network list shows `/favicon.ico?53640c3fd80b4470` => 200.
3. **`pnpm lint`, `typecheck`, `test`, `check:assets`: not run by me.** CI is green per my prompt, which covers
   them. I did not run the commands: project rules keep memory-heavy runs to the lead. I read
   `scripts/assets-budget.ts:14-17` (icon limits 48 KB, 512 px, applying to stems `icon`, `apple-icon`,
   `favicon`) and the measured 306 bytes and 32 px are inside both, with the limits untouched (not in the diff).
4. **200 with no console error on load: checked here, met.**
   - `fetch('/favicon.ico')` and `HEAD` both returned 200 with `content-type: image/x-icon`.
   - Two fresh loads of `/` (one at 390 px) gave 0 console messages at every level, and the browser
     itself requested the favicon (200). Before the branch the finding was one console error.
   - One 404 console error appeared later, from my own deliberate `fetch('/no-such-page')` to read the
     404 page's head. It is not from the page load.
5. **The icon's look: for the owner's eyes.** I drew nothing; I saw a clay K on paper in the 8x enlargement.
   I could not judge it at its real tab size, and I did not see it in a browser tab or on a retina or dark-mode
   tab bar. The K's proportions and weight are the owner's call. The K is 20 px tall of 32 and sits slightly left of centre (margins above).

## ADR-0006 and ADR-0007

The favicon is served from the origin with `cache-control: public, max-age=0, must-revalidate`, which
is not immutable, so ADR-0006 (the edge caches immutable files only) is not touched. ADR-0007 covers
`/_next/static` and images behind the CDN prefix; the icon is not one of those and the owner asked for the
origin. I saw no clash on the preview. Not checked: the production build with `ASSET_PREFIX` set, so I
cannot say whether the icon link stays on the origin there. That is for the lead.

## Not checked

- Safari, Firefox and iOS Safari: I used Chromium only, so no browser's tab-icon rendering other than
  Chromium's decode was seen, and Playwright's WebKit is not an iPhone.
- `apple-touch-icon`: the ticket did not ask for one.
