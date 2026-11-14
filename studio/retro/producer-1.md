---
symptom: A ticket that needs another ticket merged first starts too early, gets stuck and is escalated to hard
detail: When a ticket builds on another ticket's work, list that ticket under `blockedBy:` in its front matter. The orchestrator reads only the front matter, so a sentence in the body like "needs ticket 01 merged first" does not hold the ticket back. Before handing off, check every ticket body for "merged first", "builds on" or "from ticket NN", and make sure each ticket it names is also in `blockedBy:`. A ticket that started too early is not fixed by running it again: replace it with a new ticket that starts from merged main.
cause: observed
fix-verified: The look ticket had its dependency only in the body and no `blockedBy:`. It started before the page ticket merged, was handed back as stuck and was escalated. The replacement ticket, with the same scope, started after the merge, ran as standard and passed QA on the first try.
date: 2026-11-14
form: check
source: tickets 02-look and 03-look
principle: A dependency the scheduler cannot read does not exist; write it where the machine looks.
applies-to: general
rank: 1
---
