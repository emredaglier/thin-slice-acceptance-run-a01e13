---
author: producer
class: standard
assignee: frontend
---

# 01: Setup, page structure and content

Make the starter Kiln & Clay's own, then build the one page's structure with all its text in code.
The look is ticket 02. Here, keep the markup semantic and the styling minimal. Plan:
`studio/plan.md`.

## Setup

- `infra/project.env`: set `PROJECT_NAME=kiln-and-clay` and `DOMAIN=kilnandclay.example`. Leave
  the rest as shipped.
- Rename the `@house/*` scope to `@kiln-and-clay/*` in every `package.json`, import and
  `transpilePackages` list.
- Rename the `house:motion-fault` event (`packages/motion/src/fault.ts`) to
  `kiln-and-clay:motion-fault`.
- Set the email adapter's `defaultFromName` (`packages/cms-config/src/config.ts`) to `Kiln & Clay`.
- Set the `'Project name'` title in `apps/web/src/app/layout.tsx` to `Kiln & Clay`.
- Delete the glow example: README "Starting a project", step 2. More files name it than the README
  lists (`smoke/smoke.spec.ts`, `smoke/routes.test.ts`, `perf/budget.ts`,
  `perf/budget.test.ts`), so grep for `glow`. Set `IDLE_PATH` to `null`.
  - Recording a new perf budget (`pnpm perf:check --record`) is a browser run, so it's for the lead
    session only. Report it as not run.
  - If a check fails because `EFFECT_PAGES` is empty, stop and report. Don't loosen the check.
- Leave `reportFault` logging only (no monitoring in this run).
- Leave `apps/cms`, the seed, the health check and `infra/` as shipped.

## Page

- `/` stops reading Payload: remove its `getSite` use. Remove `apps/web/src/data/site.ts` if
  nothing else uses it.
- Put the text in one typed content module in `apps/web`, rendered on the server and complete
  without JavaScript (ADR-0008).
- Markup:
  - one `h1`, then an `h2` for each section;
  - a `main#main`;
  - the classes as a list;
  - the address in an `<address>` element;
  - the legal block in the `footer`.
- Metadata: title `Kiln & Clay`, and the pitch as the description.

## Content (use as written; the owner approves the wording at G4)

- Hero: `Kiln & Clay` / `Slow weekends at the wheel in Utrecht.`
- About: `Kiln & Clay is a small pottery studio in Utrecht, run by potter Mira de Vries since 2019.
  Weekend wheel-throwing classes are taught in small groups of six. All clay, glazes and two
  firings are included. Beginners are welcome.`
- Classes:
  - Taster Wheel Session: 2 hours, €45
  - Weekend Wheel Course: two days of 4 hours, €180
  - Glaze & Fire Workshop: 3 hours, €60
  - Then the line: `Prices include VAT.`
- Contact:
  - `hello@kilnandclay.example`, as a `mailto:` link;
  - `Oudegracht 210, 3511 NS Utrecht, Netherlands`.
- Footer, legal:
  - `Kiln & Clay, Mira de Vries (sole trader)`;
  - the address;
  - the email;
  - `KvK 00000000`;
  - `VAT ID NL000000000B00`.
- Footer, privacy: `Privacy: This site sets no cookies, uses no analytics and loads no content from
  third parties. The data controller is Kiln & Clay, Mira de Vries, at the address above.`

## Acceptance criteria

- [ ] `infra/project.env`, the scope, the event name, `defaultFromName` and the layout title are
      renamed as above. No `@house/` is left (grep).
- [ ] The glow example is removed everywhere, and `IDLE_PATH` is `null`. The perf budget
      re-record is reported as left to the lead.
- [ ] `/` renders every section and all the content above in the server HTML, without reading
      Payload.
- [ ] `apps/web/src/app/page.test.tsx` is updated to check the content renders: the three classes
      with their prices, the `mailto:` link, the VAT line, the KvK and btw-id lines and the privacy
      note.
- [ ] The only placeholders are KvK `00000000` and btw-id `NL000000000B00`.
- [ ] No form, no image, no client component added for the page.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm check:assets` pass, with each result
      reported. `pnpm smoke` is left to the lead and reported as not run.
