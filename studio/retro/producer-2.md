---
symptom: The page HTML is sent with s-maxage=31536000, so the edge could keep a stale home page for a year
detail: The house starter's `apps/web/src/app/page.tsx` exports `dynamic = 'force-dynamic'` so that HTML never gets a shared-cache lifetime (ADR-0006). When a ticket rewrites the page, for example to stop reading Payload and render content from code, that export is easy to drop. Next then prerenders the page as static and sends `s-maxage=31536000` with an etag. Keep the export on every page route, and have the route's unit test assert `expect(dynamic).toBe('force-dynamic')` so CI fails when it goes missing. Say this in any ticket that rewrites a page file.
cause: observed
fix-verified: QA's rubric found `s-maxage=31536000` on `/`, and main's `page.tsx` had no `dynamic` export. After the export came back, with a test in `page.test.tsx`, QA fetched `/` twice and the 404 page from the preview. Every response had `private, no-cache, no-store, max-age=0, must-revalidate` and no `s-maxage`. The `/_next/static/*` headers stayed immutable. QA did not see the new test fail on the old code, but CI was green.
date: 2026-11-14
form: code
source: ticket 07-html-not-edge-cached
principle: A cache rule that lives only in a starter file needs a test, or the first rewrite drops it without anyone noticing.
applies-to: Next.js 16 App Router on the house starter
rank: 2
---
