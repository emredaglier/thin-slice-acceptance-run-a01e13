---
author: producer
---

# Brief grill, round 2: Kiln & Clay

Round 1 is settled. Two of your answers, the Netherlands (Q5) and no deploy (Q6), leave three small
questions. Answer `yes all`, or by number. "Yes" accepts my recommendation. A `yes all` also confirms
the summary below, and then I write the plan.

## Settled in round 1

- Launch 2026-12-01. Thin slice: build, then QA. G4 and G5 are judged on the studio preview. G5 ends
  with the release tag, and nothing is deployed.
- Two tickets: (1) setup, page structure and content in code; (2) the look. QA fixes don't count
  toward the two.
- No CMS work. Content lives in code in `apps/web`. The starter's `cms` app and infra stay as
  shipped, with `PROJECT_NAME=kiln-and-clay` and `DOMAIN=kilnandclay.example`.
- Content is your Q4 facts. I draft the hero line from "slow weekends at the wheel" and write the
  About text, and you approve the wording at G4.
- The footer has one legal block for the Netherlands: Kiln & Clay, Mira de Vries (sole trader),
  KvK `00000000` (placeholder), the address and the email.
- The privacy note is short and formal: no cookies, no analytics, nothing loaded from third
  parties. Who hosts the site and what its server logs keep get a line once there is a host.
- No analytics and no monitoring.
- Fraunces for headings and the system sans for body text, with AA contrast.
- No photos, and no motion beyond hover and focus.
- English, with prices written as `€45`.
- Browsers: the last two versions of Safari, Chrome, Firefox and Edge, from 360 px wide.

---

❓ **Q1** - **VAT ID in the footer**: The Dutch government's business portal says a business
that offers services online shows both its KvK number and its VAT ID (btw-id) on the site
([business.gov.nl](https://business.gov.nl/regulation/business-correspondence)). Round 1 gave a KvK
number (a placeholder) but no VAT ID.

➡️ Show a placeholder VAT ID, `NL000000000B00`, next to the KvK placeholder. These two are the only
placeholders allowed at G5. Both get the real numbers before any real launch.

---

❓ **Q2** - **Prices and VAT**: The brief gives the prices (€45, €180, €60) but not whether VAT is
included. The visitors are consumers, who need to see the full price.

➡️ They are the full prices. One line under the classes says "Prices include VAT."

---

❓ **Q3** - **The G5 go/no-go checklist without a deploy**: The G5 checklist has five boxes:
browsers, redirects, analytics, DNS plan and rollback trigger. This run has no live domain, no deploy
and no analytics.

➡️ G5 checks the five boxes this way:

- Browsers: the round-1 browsers, checked on the studio preview from 360 px wide.
- Redirects: none needed, since there is no old site. The starter's www → apex stays as shipped and
  isn't exercised.
- Analytics: none, by your decision. G5 checks that the page sets no cookie and loads no
  third-party script.
- DNS plan: none in this run. `kilnandclay.example` doesn't resolve. A real domain can come later as
  a change request.
- Rollback trigger: nothing is deployed, so there is nothing to roll back. A fault found after the
  tag gets a fix and a new tag.
