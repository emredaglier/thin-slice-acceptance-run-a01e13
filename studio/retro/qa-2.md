---
symptom: A statically rendered Next.js page is sent with a one-year shared-cache lifetime, so an edge keeps old HTML after a deploy
detail: A Next.js page with no dynamic input is prerendered, and its HTML is served with a long s-maxage (the ticket's code comment names s-maxage=31536000). If the house rule is that the edge caches immutable files only, the HTML must not carry that lifetime. The ticket's fix was `export const dynamic = 'force-dynamic'` on the page route, with a unit test asserting the export. Check the headers of the home page and of the 404 page, not only the home page: the 404 still answered with an etag and x-nextjs-cache HIT but no s-maxage, which met the ticket. Check that /_next/static files keep public, max-age=31536000, immutable after the change.
cause: unknown
fix-verified: After the fix, a browser fetch of the home page on the preview, twice in a row, returned cache-control private, no-cache, no-store, max-age=0, must-revalidate with no s-maxage, no etag and no x-nextjs-cache. Three /_next/static files still returned public, max-age=31536000, immutable. QA did not see the headers before the fix, so the cause rests on the builder's code comment.
date: 2026-11-14
form: check
source: ticket 07-html-not-edge-cached, QA report
applies-to: Next.js app router, any CDN or edge in front of it
---
