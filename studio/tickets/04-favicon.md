---
author: producer
class: standard
assignee: frontend
---

# 04: Favicon

From the owner's G4 attempt 1 rejection: "no console errors at G4: add a simple favicon (a
clay-brown K on off-white, served from our origin) so /favicon.ico is not a 404". This is owner
rework for the gate, not a new build ticket. Plan: `studio/plan.md`.

Finding: on the preview, `GET /favicon.ico` returns 404 and logs one console error on load
(`.playwright-mcp/console-*.log`, the G4-1 notes).

## Scope

- A simple icon: a clay-brown capital K on off-white. Use the colour tokens already in
  `packages/ui`.
- Draw the K as shapes or paths. Don't render text with a webfont, and use no SVG filters (`pnpm lint`).
- Serve it from our own origin at `/favicon.ico`, with an image content type. Use the
  app router's file convention in `apps/web/src/app/` (read the guide in
  `node_modules/next/dist/docs/` first: this Next version differs). An added `icon.svg` or
  `icon.png` is fine too.
- Add no route folder: `src/routes.test.ts` must stay as it is and pass.
- Read ADR-0006 and ADR-0007 first. If the CDN-prefix or caching rules clash with an
  origin-served favicon, stop and ask me. Don't work around them.
- Icons fall under the icon limits in `scripts/assets-budget.ts` (48 KB, 512 px). Stay
  within them, and don't raise them.
- Any new npm dependency, an icon generator for example, comes to me as a permission question
  first. A tiny script with no dependencies is fine, or a hand-written file.

## Acceptance criteria

- [ ] `/favicon.ico` is a tracked file under `apps/web/src/app/` showing a clay-brown K on
      off-white. Report its size in bytes and its pixel dimensions, as measured.
- [ ] Nothing about it is requested from a third-party origin.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm check:assets` pass, with each result
      reported.
- [ ] `/favicon.ico` returning 200 with no console error on load is left for the lead to check on
      the build or the preview. Report it as not run and name the command, e.g.
      `curl -sI <preview>/favicon.ico`.
- [ ] The icon's look is for the owner's eyes: say what you drew and what you couldn't see.
