---
author: producer
---

# Brief grill, round 1: Kiln & Clay

The brief is clear on the page, its sections and the look. These are the questions it leaves open.
Answer `yes all`, or by number (`3: no, ...`). "Yes" accepts my recommendation.

❓ **Q1** - **Launch date**: The brief gives no launch date, and I can't plan the gate dates
(G4 working build, G5 launch) without one. Today is 2026-11-14.

➡️ Launch on 2026-12-01 (a Tuesday). This is only my suggestion: it gives two build tickets, G4, QA and
G5 room before then without rushing any of them, and it avoids a Friday deploy.

---

❓ **Q2** - **What counts toward "two build tickets at most"**: Starting from the house starter takes
some setup: renaming the `@house` scope and setting `PROJECT_NAME` and `DOMAIN` in `infra/project.env`.
QA findings after G4 also become tickets.

➡️ Two tickets in all, with setup folded into ticket 1 (setup, page structure and content) and
ticket 2 covering the look (type, colour, layout, footer). QA fixes after G4 (`qa-blocker` or
gate-safe tickets from a named finding) don't count toward the cap.

---

❓ **Q3** - **What "No CMS" means in the starter**: The starter's page reads its text from Payload
(the `cms` app and its SQLite database), and the web app's health check depends on that database.
Option A: put the page's content in code in `apps/web`, with no Payload collections or admin work,
and leave the starter's `cms` app and database running as shipped but unused. Option B: remove
Payload from the web app and the deploy entirely. B changes infra and the health check, which is
probably a third ticket of class `hard`.

➡️ Option A: content in code, no CMS work, starter infra left as shipped. Removing Payload can follow
later as a change request.

---

❓ **Q4** - **Copy and facts**: I can't invent the studio's facts. The page needs the one-line pitch,
the About text, three classes (name, length, price in EUR), the email address and the street address.

➡️ You send the facts (the three classes, the email, the address and a few lines about the studio)
before the G4 date. I draft the pitch and About text from them for your approval at G4. Until then
the build uses obvious placeholders like `[Class name]`. A G5 criterion makes sure none are left.

---

❓ **Q5** - **Legal block**: Prices in EUR point to the EU, so the site probably needs at least
operator details and a short privacy note. Some countries, Germany and Austria for example, also
require an imprint.

➡️ The footer gets one short legal block on the same page: the operator's name, address and email,
plus one paragraph of privacy note naming the host and any analytics from Q7. With the Q4 facts you
send the studio's country and the operator's legal name, and the footer meets that country's rules.
No separate legal pages.

---

❓ **Q6** - **Hosting, domain and redirects**: The house stack self-hosts behind Cloudflare: Docker
Compose and Caddy on a server, a CI-built image, a health-gated deploy (ADR-0004, ADR-0005). The
deploy won't run with the placeholder domain.

➡️ Deploy on the house stack. Before the G4 date you name the domain and confirm it's on Cloudflare
DNS and that a server is ready. There's no old site, so the only redirect is the starter's
www → apex.

---

❓ **Q7** - **Analytics and monitoring**: The house default is cookie-less Cloudflare Web Analytics,
UptimeRobot and Sentry (ADR-0011). On a static one-pager with no motion, Sentry would add a third
party for very little gain.

➡️ Cloudflare Web Analytics (cookie-less, as a script tag in code) and UptimeRobot on `/`. No Sentry
for this site.

---

❓ **Q8** - **Type and colour**: The brief asks for one serif for headings, an off-white background
and a clay-brown accent.

➡️ Fraunces (open licence, self-hosted through `packages/ui/fonts.ts`) for headings, and the system
sans stack for body text so no second webfont downloads. The exact off-white and clay-brown get set
in ticket 2 and checked against WCAG AA contrast; the brown gets darkened if it fails as text. You
judge the look at G4.

---

❓ **Q9** - **Images and motion**: The brief names no photos and no motion.

➡️ No photos: the page is type and colour only (photos can come later as a change request). No WebGL
and no scroll effects, only hover and focus transitions, with all content visible without
JavaScript (ADR-0008).

---

❓ **Q10** - **Language and price format**: The brief is in English and doesn't say what language
the site should be in.

➡️ English only (`lang="en"`), with prices written as `€45`.

---

❓ **Q11** - **Browser support**: The brief says mobile first but names no browsers. This sets the
browsers row of the G5 go/no-go checklist.

➡️ The last two versions of Safari (iOS and macOS), Chrome (Android and desktop), Firefox and Edge.
Layout checked from 360 px wide upward.

## Comments

### Owner, 2026-11-14T05:11:24.652Z

1: yes (2026-12-01).
2: yes.
3: yes, option A.
4: here are the facts, so no placeholders are needed. Studio: Kiln & Clay, a small pottery studio in Utrecht. Pitch idea: slow weekends at the wheel. About: run by potter Mira de Vries since 2019; small groups of six, all clay, glazes and two firings included; beginners welcome. Classes: (1) Taster Wheel Session, 2 hours, EUR 45; (2) Weekend Wheel Course, two days of 4 hours, EUR 180; (3) Glaze & Fire Workshop, 3 hours, EUR 60. Email: hello@kilnandclay.example. Address: Oudegracht 210, 3511 NS Utrecht, Netherlands.
5: yes. Country: the Netherlands. Operator legal name: Kiln & Clay, Mira de Vries (sole trader), KvK 00000000 placeholder is fine.
6: no deploy in this run. This is a thin-slice acceptance run: G4 and G5 are judged on the studio preview, and G5 ends with the release tag. Keep the starter infra as shipped; leave PROJECT_NAME as kiln-and-clay and DOMAIN as kilnandclay.example.
7: no analytics and no monitoring in this run (no live domain). Keep the privacy note short and say the site sets no cookies.
8: yes.
9: yes.
10: yes.
11: yes.
