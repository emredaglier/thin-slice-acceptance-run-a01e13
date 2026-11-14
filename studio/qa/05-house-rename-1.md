---
author: qa
verdict: pass
---

# QA report: 05-house-rename, commit 6a3241e

Branch `ticket/05-house-rename`, PR #3. The diff is 4 files, 4 lines changed (`Dockerfile`, `README.md`, `infra/README.md`, `smoke/run.ts`). It is docs and comments only, so the page a visitor gets is unchanged. I checked the source in the branch checkout with Grep and Read. Git and the package scripts were off limits to me.

## Acceptance criteria

1. **`@house` is gone from the four files: met.**
   - Grep for `@house` over the whole checkout (excluding `node_modules`, `.git`, `.next`) returns one hit: `AGENTS.md:14`. It returns nothing in `README.md`, `Dockerfile`, `smoke/run.ts` or `infra/README.md`.
   - I could not run the literal `git grep -n '@house' -- <four files>` because git is off for me. The Grep result covers the same four files.
   - I read each changed line:
     - `README.md:85` now says "this repo uses `@kiln-and-clay/*`; rename it when you start a different project". That scope matches every `package.json`: `@kiln-and-clay/web`, `cms`, `cms-config`, `ui` and `motion`, plus the root scripts' `--filter` calls. The line stays true for this project.
     - `Dockerfile:10` and `smoke/run.ts:106` now say workspaces are picked by folder, so a scope rename needs no change there. That is true: the Dockerfile uses `--filter ./apps/web`, `./apps/cms` and `./packages/cms-config` (lines 43 and 96), and `smoke/run.ts:108-109` uses `./apps/cms`. Both edits are comment lines, so behaviour is unchanged.
     - `infra/README.md:171` carries the same folder-selection sentence about the Dockerfile and is accurate.
   - These three files no longer name `kiln-and-clay` at all. The ticket said to replace `@house` with the project name. The builder reworded the lines to a scope-independent statement instead. I accept that because the new wording is accurate and the ticket allows rewording, but it is a deviation from the literal "replace with kiln-and-clay".

2. **`AGENTS.md` unchanged, other hits listed: met.**
   - `AGENTS.md` is not in the diff stat, and its `@house/*` text at line 14 is still there.
   - I could not run a git diff on the file. That is why this rests on the diff stat.
   - No other `@house` hits exist in the checkout, including `docs/adr/`, the lockfile and the `package.json` files. Hits outside the allowed files: none.
   - Unrelated leftover: `infra/README.md:15` still shows the `PROJECT_NAME` default `house`. That is the word `house`, not `@house`, and it is out of scope.

3. **`pnpm lint`, `typecheck`, `test`, `check:assets`: not run by me.** My shell may only read, and these scripts write caches in the checkout. The prompt says CI is green, and CI covers the starter's checks. I have no output of my own for `scripts/repo-guard.test.ts` or the others, so I do not claim one.

## Preview check

- I opened https://emres-macbook-pro.tail201ea9.ts.net:4401/ in the browser at the default width. It loads with the title "Kiln & Clay".
- The console shows one error, a 404 for `/favicon.ico`. The diff does not touch it, so I do not hold the ticket for it. It is a note for HQ.
- I did not test a phone width or take screenshots, because the diff changes no rendered output.
- I did not check Safari or iPhone behaviour.
