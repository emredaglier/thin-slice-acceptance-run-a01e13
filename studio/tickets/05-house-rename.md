---
author: producer
class: mechanical
assignee: frontend-2
---

# 05: Rename the @house leftovers

From the owner's G4 attempt 1 rejection: "rename the @house leftovers in README.md, Dockerfile,
smoke/run.ts and infra/README.md to kiln-and-clay (leave AGENTS.md as is)". This is owner
rework for the gate, not a new build ticket. Plan: `studio/plan.md`.

Finding (G4-1 notes, on `main` at 4a9467f): `@house` is in `README.md:85`, `Dockerfile:10`,
`smoke/run.ts:106` and `infra/README.md:171`.

## Scope

- In those four files only, replace every `@house` with the project's name, kiln-and-clay. Use
  the workspace scope that `main`'s `package.json` files actually use (for example
  `@kiln-and-clay/*`).
- Several of these lines are instructions about renaming the scope ("Rename the `@house/*`
  scope ..."). Reword each one so it stays true for this project. Keep comments and docs
  accurate, and change no code behaviour.
- Don't touch `AGENTS.md` (owner's call), `docs/adr/` (ADRs are records), the lockfile or any
  `package.json`.
- If `git grep '@house'` finds hits outside these files and `AGENTS.md` and `docs/adr/`, list
  them in your report. Don't change them.

## Acceptance criteria

- [ ] `git grep -n '@house' -- README.md Dockerfile smoke/run.ts infra/README.md` returns
      nothing. Show the output.
- [ ] `AGENTS.md` is unchanged. Any other `@house` hits are listed in the report.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm check:assets` pass, with each result
      reported (`scripts/repo-guard.test.ts` included).
