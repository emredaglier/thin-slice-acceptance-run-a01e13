---
symptom: A ticket's acceptance criterion says to run curl against the preview, and QA cannot run it
detail: QA's shell is read-only and the sandbox denies the preview host, so a criterion written as `curl -sI <preview>` goes unchecked by the shell. Write response-header and status criteria so a page script can check them, for example "fetch the route with cache: 'no-store' from the preview page and read status and cache-control". The same applies to "a test that failed before and passes after": QA can read the test but cannot run it, so the ticket should name the assertion (file and line) so QA can confirm by reading that it would fail without the fix.
cause: observed
fix-verified: On ticket 07 QA ran the header check as a browser fetch on the preview page (status and cache-control read for the home page, the 404 and the static files) and confirmed the test assertion by reading it. Both criteria were checked without curl or a test run.
date: 2026-11-14
form: rule
source: ticket 07-html-not-edge-cached, QA report
principle: Write each acceptance criterion in a form the agent who checks it can run with its own tools.
applies-to: general
---
