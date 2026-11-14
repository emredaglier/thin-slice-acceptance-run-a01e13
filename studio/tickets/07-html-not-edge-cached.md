---
author: producer
class: standard
assignee: frontend-2
gate-safe: yes
---

# 07: Keep the HTML out of the edge cache

QA fix after G4, debt on merged work. It doesn't count toward the two-ticket cap
(`studio/plan.md`).

Finding: `studio/qa/rubric-2.md`, Performance (also `rubric-1.md`): "The home page HTML is sent
with `s-maxage=31536000` and an etag, so the edge may keep the HTML for a year" [t4]. ADR-0006
says: "Never cache HTML or RSC at the edge", and pages render per request (`force-dynamic`). The
starter's `page.tsx` had `export const dynamic = 'force-dynamic'`. The Kiln & Clay page on
`main` seems to have dropped it, so Next prerenders the page as static.

## Scope

- Read ADR-0006 and the matching guide in `node_modules/next/dist/docs/` first (this Next version
  differs).
- Make `/` (and the 404 page, if it has the same header) render so that its HTML response carries
  no shared-cache lifetime (`s-maxage`), in the way ADR-0006 describes. The page still reads no
  Payload: its content stays in code.
- Don't touch the `/_next/static/*` headers (immutable, one year) or the favicon.
- Add a unit test that fails on the current code and passes after the fix, if the route config can
  be tested without a browser (e.g. that `page.tsx` exports `dynamic = 'force-dynamic'`). Show it
  failing first.
- If ADR-0006 and this page clash, stop and ask me. Don't work around the ADR.
- No new dependency. Don't start `next dev`/`next build`.

## Acceptance criteria

- [ ] The cause is named, with the file and line.
- [ ] The fix is in, with a test you saw fail before the fix and pass after it (or a reason no unit
      test can cover it).
- [ ] The response header check is left to the lead or QA: report it as not run and name the
      command, `curl -sI <preview>/ | grep -i cache-control`.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm check:assets` pass, with each result
      reported.
