---
author: producer
---

# Plan: Kiln & Clay

A one-page site, mobile first, for Kiln & Clay, a pottery studio in Utrecht that runs weekend
wheel-throwing classes. Profile: thin-slice. The brief grill closed with the owner's `yes all` on
round 2 (`studio/questions/brief-R1.md`, `studio/questions/brief-R2.md`).

## What gets built

- One page at `/`, in this order: hero (studio name, one-line pitch), About, Classes (three classes,
  each with name, length and price, plus "Prices include VAT."), Contact (email link, street
  address), footer with the legal block and the privacy note.
- The content lives in code in `apps/web`: the owner's round-1 Q4 facts, with the pitch and About
  wording drafted by me and approved by the owner at G4.
- The look: off-white background, clay-brown accent, Fraunces for headings (self-hosted through
  `packages/ui/fonts.ts`), the system sans stack for body text, WCAG AA contrast.
- English (`lang="en"`), prices written as `€45`.
- Placeholders: only KvK `00000000` and btw-id `NL000000000B00`. Both need the real numbers before
  any real launch.

## Out of scope

- No CMS work: the starter's `cms` app, database, health check and infra stay as shipped.
- No forms, no booking, no photos, no WebGL, no scroll effects (hover and focus transitions only).
- No deploy, no DNS, no analytics, no monitoring. `PROJECT_NAME=kiln-and-clay`,
  `DOMAIN=kilnandclay.example`.
- No separate legal pages.

## Phases and gates

1. Brief intake: done (rounds 1 and 2).
2. Build: tickets 01 and 03 (03 replaces 02), in order. Ends at **G4 working build**, judged on the studio preview.
3. QA: opens when G4 is approved. Ends with the QA report. QA fixes (`qa-blocker`, or `gate-safe`
   from a named finding) don't count toward the two-ticket cap.
4. Launch: **G5 launch**, judged on the studio preview. G5 approval is the go; the release tag
   follows. Nothing is deployed.

## Gate criteria

### G4 working build

- Tickets 01 and 03 are merged, and `pnpm lint`, `pnpm typecheck`, `pnpm test` and
  `pnpm check:assets` pass on the merged work.
- The page shows every section in the order above, with the owner's facts: three classes, each
  with its name, length and price as `€NN`, and "Prices include VAT."
- The email is a working `mailto:` link, and the address is shown in full.
- The footer shows the operator, address, email, KvK and btw-id, plus the privacy note.
- The page is complete with JavaScript off: all content is in the server HTML.
- The page doesn't read Payload, and it has no form, no photo and no WebGL or scroll effect.
- Fraunces is used for headings and the system sans for body text. Every text colour pair meets
  WCAG AA, with the ratios computed and reported.
- The layout works from 360 px wide with no horizontal scroll. This needs the owner's eyes on the
  preview.
- The pitch and the About text are drafted from the owner's facts and shown for approval.

### G5 launch

- The QA report is written and no `qa-blocker` is open.
- `pnpm smoke` passes: route sweep, server HTML, headers, axe accessibility, secrets, WebGL
  fallback.
- No placeholder text is left except KvK `00000000` and btw-id `NL000000000B00`.
- The page sets no cookie and requests nothing from a third-party origin (no script, font or
  image).
- The page is checked on the preview in the last two versions of Safari (iOS, macOS), Chrome
  (Android, desktop), Firefox and Edge, from 360 px wide.
- The go/no-go checklist is complete.

## G5 go/no-go, without a deploy

- Browsers: the browsers above, checked on the studio preview.
- Redirects: none needed, since there is no old site. The starter's www → apex stays as shipped and
  isn't exercised.
- Analytics: none, by the owner's decision. The check is that no cookie is set and no third-party
  request is made.
- DNS plan: none in this run, because `kilnandclay.example` doesn't resolve. A real domain can come
  later as a change request.
- Rollback trigger: nothing is deployed, so there is nothing to roll back. A fault found after the
  tag gets a fix and a new tag.

## Tickets

- `01-page-and-content` (standard, frontend): project setup, then the page's structure and all its
  text in code.
- `03-look` (standard, frontend): fonts, colours, layout, the footer's look, and hover and focus
  states. It replaces `02-look`, which is superseded and won't run. Still two tickets.
- After the G4-1 rejection, owner rework from the owner's notes (not new build scope):
  - `04-favicon` (standard, frontend): a clay-brown K on off-white at `/favicon.ico`, so the page
    loads with no console error.
  - `05-house-rename` (mechanical, frontend-2): `@house` renamed to kiln-and-clay in `README.md`,
    `Dockerfile`, `smoke/run.ts` and `infra/README.md`. `AGENTS.md` stays as it is.
- QA fixes after G4 approval, from `studio/qa/rubric-2.md` (gate-safe, outside the cap):
  - `06-mail-link-target` (standard, frontend): the mail link is 21 px high at phone width. It
    needs at least 24 × 24 px (WCAG 2.5.8).
  - `07-html-not-edge-cached` (standard, frontend-2): the HTML of `/` carries
    `s-maxage=31536000`, against ADR-0006.

## Schedule

- Start: 2026-11-16
- G4 working build: 2026-11-20
- G5 launch: 2026-11-27
- Launch: 2026-12-01

Worked back from the 2026-12-01 launch the owner set in round 1:

- The launch on 2026-12-01 is the release tag.
- G5 on 2026-11-27 leaves two working days of slack before it.
- QA runs 2026-11-23 to 2026-11-26, after the owner's G4 review.
- Build runs 2026-11-16 to 2026-11-19, ticket 01 then ticket 03.

The start is 2026-11-16 and today is 2026-11-14, so the schedule fits.

## Notes

- The legal and privacy text is an agent's draft, not legal advice. It is kept short, formal and
  impersonal.
- The privacy note gets a line on the host and its server logs once there is a host (a change
  request).
