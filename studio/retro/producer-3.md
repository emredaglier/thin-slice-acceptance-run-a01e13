---
symptom: The first working-build gate is rejected for starter leftovers, a favicon 404 in the console and the old workspace name in shipped files
detail: Make the setup ticket's rename cover the whole repo: grep for the starter scope in README, Dockerfile, smoke scripts and infra docs as well as in `package.json`, imports and `transpilePackages`. List each file it may leave alone by name (for example `AGENTS.md`, which changes only by deliberate review). The starter ships no favicon, so `/favicon.ico` returns 404 and logs a console error. Add a simple icon, served from the site's own origin, in the same setup ticket. Owners read a console error at the gate as unfinished work.
cause: observed
fix-verified: The first G4 attempt was rejected for exactly these two things. The setup ticket had limited the rename to package files, imports and transpile lists. Two small fix tickets went in: an icon and a rename across the repo. QA then saw `/favicon.ico` return 200, no console messages on two fresh loads and the old scope left only in the file that was excluded on purpose. The second G4 attempt was approved.
date: 2026-11-14
form: rule
source: tickets 01-page-and-content, 04-favicon and 05-house-rename
principle: Setup means no trace of the starter anywhere the owner can see it, and no console errors on first load.
applies-to: projects made from the house starter
rank: 3
---
