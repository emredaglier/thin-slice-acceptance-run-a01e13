---
author: qa
verdict: pass
---

# QA report: 01-page-and-content (PR #1, commit d933966)

Tested at https://emres-macbook-pro.tail201ea9.ts.net:4400/ at 1440x900 and 390x844 (Chromium via the browser tools), plus a read of the branch checkout.

## Criteria

1. **Setup renames: met, with one note.**
   - `infra/project.env`: `PROJECT_NAME=kiln-and-clay`, `DOMAIN=kilnandclay.example` (Grep).
   - Scope: `transpilePackages` in `apps/web/next.config.ts` and `apps/cms/next.config.ts` use `@kiln-and-clay/*`. `layout.tsx` imports `@kiln-and-clay/ui`.
   - Event: `packages/motion/src/fault.ts` has `kiln-and-clay:motion-fault`.
   - `defaultFromName: 'Kiln & Clay'` in `packages/cms-config/src/config.ts`.
   - Layout title `'Kiln & Clay'` in `layout.tsx`.
   - **Note on "no `@house/` left (grep)":** a grep for `@house/` (excluding node_modules) still hits `README.md:85` and `AGENTS.md:14`. `Dockerfile:10`, `smoke/run.ts:106` and `infra/README.md:171` contain `@house` without the slash. The README hit is the starter's own "Starting a project" instruction, and `AGENTS.md` says it changes only by deliberate review. The ticket did not name either file, so I did not count them as a failure. **Call: pass. The owner may want these lines reworded.** No `@house/` remains in any `package.json`, import or `transpilePackages` list.
2. **Glow example removed, `IDLE_PATH` null: met.**
   - A case-insensitive grep for `glow` finds nothing outside node_modules. `/examples/glow` answers 404 on the preview.
   - `perf/scenarios.ts:36`: `IDLE_PATH = null`, `SCENARIOS = []`. `smoke/webgl.ts:23`: `EFFECT_PAGES = []`.
   - `perf/perf-budget.json` on the branch only lost the two `glow-sweep` entries. The `idle.cpuPct: 5` value is identical to the base copy in the studio checkout, so no new figure was recorded.
   - The perf re-record is a lead-session run. The branch did not record one. I did not run it either.
3. **`/` renders every section from the server HTML, without reading Payload: met.**
   - A `fetch('/')` of the raw HTML, parsed, shows:
     - status 200 and title `Kiln & Clay`;
     - meta description `Slow weekends at the wheel in Utrecht.`;
     - 1 `h1`, 3 `h2` (About, Classes, Contact), 1 `main#main`;
     - 3 `li` with the three classes and prices exactly as in the ticket;
     - `Prices include VAT.` in the HTML;
     - one `mailto:hello@kilnandclay.example` link;
     - an `address` element holding the email and `Oudegracht 210, 3511 NS Utrecht, Netherlands`;
     - the footer holding the owner line, address, email, KvK, VAT ID and the privacy note, word for word.
   - The page text on the rendered page matches the ticket's wording (read from `document.body.innerText`).
   - `page.tsx` imports only `../content`. `getSite` and `data/site.ts` are gone (Grep, Glob). The remaining Payload uses are `lib/payload.ts`, the health route and `next-config.test.ts`.
   - This is a static page (`x-nextjs-prerender`, cache HIT).
   - The page needs no JavaScript to be complete. I did not run a JS-disabled browser, but the content is in the raw server HTML.
4. **`page.test.tsx` updated: met.** Read the file. It checks the 3 classes with prices, the `mailto:` link, `Prices include VAT.`, `KvK 00000000`, `VAT ID NL000000000B00`, the privacy note, the heading counts, `main#main` and the metadata. I did not run it. CI is green per the prompt.
5. **Only placeholders are KvK `00000000` and VAT ID `NL000000000B00`: met.** `content.ts` read in full. No other placeholder text.
6. **No form, no image, no client component added: met.** A parse of the served HTML finds 0 `form`, `img` or `input` elements. The body has no `img`, `picture`, `svg` or `canvas`. Grep for `use client` in `apps/web/src` finds only the existing `MotionFaultReporter.tsx`.
7. **`pnpm lint`, `typecheck`, `test`, `check:assets`: not run by me.** My shell is read-only and these write caches. CI is green per the prompt. Whether the builder reported each result is not something I could check here. `pnpm smoke` is left to the lead.

## Viewports

- 1440 wide: `scrollWidth` 1440, no horizontal overflow.
- 390 wide: `scrollWidth` 390, no horizontal overflow.
- Both sizes show the same single-column content, with the mailto link the only focusable element. The look is ticket 02's, so I did not judge it. I took two full-page screenshots (`01-desktop.png`, `01-phone.png`), saved by the browser tool under `studio/qa/`. I did not open them.

## Other observations (not failures)

- The console shows a 404 for `/favicon.ico`. The diff does not touch favicons, and the ticket has no criterion for one. Ticket 02 or the plan may want to cover it.
- `/admin` and `/api/users` answer 404, `/internal/health` answers 200 (house rules intact).
- The README paragraph about `pnpm perf` still says `IDLE_PATH` is "the example effect's page". It is stale but harmless.
- Not checked: WebKit and any real iPhone. This diff has no WebKit-specific behaviour, but I ran Chromium only.
