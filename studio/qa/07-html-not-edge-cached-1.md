---
author: qa
verdict: pass
---

# QA: 07-html-not-edge-cached (PR #6, commit 64276184)

Preview: https://emres-macbook-pro.tail201ea9.ts.net:4402/ . Tested at 1280 wide and 390 wide.

## Tool runs

- t1: `browser_evaluate` on the preview, `fetch` with `cache: 'no-store'` of `/` twice, `/no-such-page-qa`, `/favicon.ico` and the first three `/_next/static/*` URLs found in the home HTML; read status, `cache-control`, `etag`, `x-nextjs-cache`.
- t2: `browser_evaluate` at 390 wide: viewport width, scroll width, title, description meta, `main#main`, `li` count, footer.
- t3: `browser_evaluate` at 1280 wide: `fetch('/')` header, `s-maxage` test, body text check, h1/h2/li counts, scroll width.
- t4: Read of `apps/web/src/app/page.tsx` and `page.test.tsx` in the branch checkout; Grep of `apps/web/src` for `force-dynamic`, `revalidate`, `dynamic`; Grep of ADR-0006.
- t5: `browser_console_messages` (errors).
- t6: `browser_take_screenshot`, full page at 390 wide, saved as `studio/qa/07-html-not-edge-cached-phone.png`.

## Acceptance criteria

1. **Cause named, with file and line.** The builder's write-up was not given to me, so I could not check its prose. In the source, `apps/web/src/app/page.tsx:6` now reads `export const dynamic = 'force-dynamic'`, with the comment at line 5 naming ADR-0006 and `s-maxage=31536000`. The only other `force-dynamic` in `apps/web/src` is `internal/health/route.ts`, so `page.tsx` is the one page route that carries it [t4].
2. **Fix in, with a test that failed before and passes after.** The fix is in. `page.test.tsx:50-52` asserts `expect(dynamic).toBe('force-dynamic')` and imports `dynamic` from `./page` (line 4) [t4]. Without the export, `dynamic` would be `undefined` and the test would fail. I did not run the suite: my shell may only read, and my first shell commands were refused by a hook. So I did not see the test fail on the old code or pass on the new. CI is green per the prompt.
3. **Response header check.** I ran it in the browser (the sandbox denies `*.ts.net` to the shell, so the ticket's `curl -sI` was not run). `/` answers 200 with `cache-control: private, no-cache, no-store, max-age=0, must-revalidate`, no `etag`, no `x-nextjs-cache`, on two fetches in a row; no `s-maxage`, and the same at 1280 wide [t1, t3]. The 404 (`/no-such-page-qa`) answers 404 with the same `private, no-cache, no-store, ...` value and no `s-maxage`. It carries an `etag` and `x-nextjs-cache: HIT`, but no shared-cache lifetime, so it meets the ticket [t1].
4. **`pnpm lint`, `typecheck`, `test`, `check:assets`.** Not run by me (read-only shell). CI is green per the prompt.

## Scope checks

- `/_next/static/*` unchanged: the three files I fetched (one CSS, two JS) all answer `public, max-age=31536000, immutable` [t1].
- Favicon unchanged: `/favicon.ico` answers 200, `public, max-age=0, must-revalidate` [t1].
- The page still reads no Payload: `page.tsx` imports only `../content` and the `Metadata` type [t4].
- Diff touches two files (`page.tsx`, `page.test.tsx`): no new dependency.

## Page still correct (regression)

- 1280 wide: one h1, three h2, three list items, body text "Slow weekends at the wheel in Utrecht." in the fetched HTML, no horizontal overflow (width 1280, scroll width 1280) [t3].
- 390 wide: title "Kiln & Clay", description meta, `main#main` and footer present, three list items, no horizontal overflow (width 390, scroll width 390) [t2]. The screenshot [t6] was taken but I did not view it: this ticket changes no markup or style.
- The one console error was my own probe of `/no-such-page-qa` (404) [t5]. Nothing came from the page.

## Not checked

- Chromium only: no WebKit or iPhone run. The header is server-side, so a browser difference is not expected, but I did not measure it.
- The preview is a direct origin. If a CDN sits in front in production, I did not see it, so what it does with `private, no-store` is not checked.

## Verdict

Pass. `/` and the 404 page carry no `s-maxage`; the static-asset and favicon headers are unchanged; the page content is intact at both widths.
