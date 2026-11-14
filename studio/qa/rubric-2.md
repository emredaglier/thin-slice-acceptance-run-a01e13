---
author: qa
---

# QA rubric report

Merged main at commit 40ba179c692044ed4114c3b4229809e62d0ba3a2, run at the preview URL in my prompt. One page exists (the home page, "Kiln & Clay"). I checked a desktop width and a phone width in the browser tools. I read no source: my prompt names no checkout, so source-level claims are not made here. Compared with `rubric-1.md`, the favicon now loads and the console is clean; the rest of the page measures the same.

## Tool runs

- t1: browser_navigate to `/` at desktop width, then browser_evaluate on the page: navigation timing, resource timing, LCP and layout-shift observers (buffered), paint timing, head tags, headings, landmarks, images, canvas, node count, user agent.
- t2: browser_console_messages, level error, on `/` after load (before any of my own fetches).
- t3: browser_network_requests with static resources on, on `/`.
- t4: browser_evaluate with `fetch` of `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/manifest.webmanifest`, `/impressum`, `/privacy`, `/does-not-exist`, `/admin`, `/api/health`; the response headers of `/`; `/` and `/does-not-exist` parsed as HTML; cache-control and content-encoding of each `_next/static` file the page loaded.
- t5: browser_evaluate at desktop width: computed colour contrast ratio and font size of every heading, paragraph, span and link, mail link size and underline, running animations, tabindex count, skip link, horizontal overflow, reduced-motion state.
- t6: browser_press_key Tab, then browser_evaluate on the focused element: tag, `:focus-visible`, outline.
- t7: browser_resize to phone width, then browser_evaluate: horizontal overflow, elements past the right edge, smallest font size, h1 size, mail link height, viewport meta.
- t8: browser_take_screenshot, full page at phone width, saved as `studio/qa/rubric-2-phone.png`.
- t9: browser_emulate_media with reduced motion set to reduce (set, nothing on the page to observe it).
- t10: the accessibility snapshot returned by browser_navigate to `/` (saved at `.playwright-mcp/page-2026-11-14T13-08-52-325Z.yml`).

## Performance (20)

- Score: 16 of 20 [t1, t3, t4]
- One request for the document, then the font, one stylesheet and six scripts, plus the favicon: 10 requests in all [t3].
- First paint and first contentful paint both at 64 ms, LCP at 64 ms, load event at 75.8 ms, time to first byte 19.9 ms. This is one lab run from headless Chrome over the tailnet, not field data [t1].
- Total transferred for the page and its nine sub-resources: 164,684 bytes, the sum of the transfer sizes in the resource list and the document [t1].
- Two JavaScript chunks carry most of it: 67,353 and 64,355 bytes over the wire, 241,708 and 203,721 bytes decoded. Together 131,708 bytes over the wire for a page with no interaction and no animation. This is the main thing that costs points. I did not open the bundle, so I cannot say what is in them [t1].
- The font file is 18,420 bytes over the wire, preloaded, from the same origin [t1].
- Every `_next/static` file carries `public, max-age=31536000, immutable`; CSS and all scripts except the 514-byte `main-app` file are gzip-encoded [t4, t1].
- The home page HTML is sent with `s-maxage=31536000` and an etag, so the edge may keep the HTML for a year. The house rule says the edge caches immutable files only. Flagged, not scored as a failure: I could not see how the HTML is purged when content changes [t4].
- `/favicon.ico` now answers 200 with `max-age=0, must-revalidate`, 606 bytes transferred, and the head links it. The console is clean after load: 0 errors [t4, t1, t2].
- No images on the page, so no image weight or format to judge [t1].

## Mobile (20)

- Score: 16 of 20 [t7, t8, t5]
- The viewport meta is `width=device-width, initial-scale=1`; at phone width the page does not scroll sideways (document width equals window width, 0 elements past the right edge) [t7].
- The smallest text on the page is 14 px (footer and the "Prices include VAT" line); the h1 is 36 px on the phone, 60 px on desktop [t7, t5].
- The layout reads cleanly in the full-page phone screenshot: single column, prices aligned right, footer legible. I judged this by looking at the screenshot only [t8].
- The one interactive element, the mail link, is short for a finger tap: 21 px high at phone width. Points are lost for it [t7].
- Not checked here: Playwright's Chromium is not an iPhone. iOS Safari rendering, safe-area insets, momentum scroll, the on-screen keyboard (there is no form) and real touch need your eyes on a real iPhone.

## Semantics and SEO (20)

- Score: 12 of 20 [t1, t4, t10]
- Present: `lang` set to en, a title ("Kiln & Clay"), a meta description, one h1 followed by 3 h2 headings (About, Classes, Contact), a `main` landmark and a footer (`contentinfo`) [t1, t10].
- The content is in the server HTML: the h1, the 3 list items and the mailto link all appear in the fetched source, so it reads without JavaScript [t4].
- The classes are a real list with 3 items [t10].
- The 404 page has its own title ("Not found"), an h1 ("Page not found") and `noindex` [t4].
- Now present since the last report: an icon link in the head [t1].
- Missing: canonical link, Open Graph and Twitter tags, theme colour, structured data (0 JSON-LD scripts; a pottery studio with an address would suit `LocalBusiness`) [t1].
- `/robots.txt`, `/sitemap.xml` and `/manifest.webmanifest` all answer 404 [t4].
- The page title and the h1 are the same words, and the title says nothing about what the studio does. The meta description is the subtitle line only [t1].
- The footer carries a privacy line and names the data controller [t10]. I checked that it is there, not whether it meets any law.

## Animation (15)

- Score: 7 of 15 [t5, t1]
- Nothing on the page moves: 0 running animations or transitions, 0 canvas elements, so no WebGL to test and no frame times to measure [t5, t1].
- I give a middle score because there is nothing to fault and nothing to reward. An Awwwards judge scores motion as craft, and there is none to see.
- How motion feels (easing, timing, polish): needs your eyes. There is no motion on this page; whether a static page is what you want is your call.
- Reduced motion: I set the reduce preference, but the animation count was 0 before it, so there is no motion that could respond to it [t9, t5].

## Markup (15)

- Score: 11 of 15 [t1, t10]
- Elements are used for their meaning: `main`, 3 `section` elements, a list for the classes, `footer`, one h1 and no skipped heading levels [t1, t10].
- The page has 59 elements (58 at the last report), which is small and tidy [t1].
- Each class row is built from `span` elements inside the list item rather than a description list or table, so a screen reader hears the name, the length and the price as three separate pieces [t10]. Fine, not wrong.
- The mail link and the address sit in one block with no separate element between them [t10].
- I ran no HTML validator, so "valid markup" is not claimed. Not checked.
- 10 `script` tags are in the DOM, framework inline scripts included [t1].

## Accessibility (10)

- Score: 9 of 10 [t5, t6, t10]
- Contrast: the lowest ratio on the page is 6.93 (the mail link on the paper background); headings and body text measure 14.59; the muted text 7.78; footer text 6.96. All pass the usual 4.5 line [t5].
- After one Tab press the mail link is focused and the browser reports `:focus-visible` with a solid 3 px outline, 3 px offset, in `rgb(138, 63, 33)` [t6].
- The link is underlined, so it is not marked by colour alone [t5].
- Language is set; headings are in order; no images, so no alt text to check; 0 `tabindex` attributes [t1, t10, t5].
- There is no skip link, and there is only one link to skip to; fine at this size [t5].
- Not checked: a screen reader (VoiceOver, NVDA); I read the accessibility tree only. Not run: axe, because no axe runner is among my tools.

## Core Web Vitals

- LCP: 64 ms, element is a paragraph, headless Chrome desktop, one lab run, no throttling, not field data. Under the 2.5 s line [t1].
- CLS: 0, 0 layout-shift entries recorded (the observer was buffered). Under the 0.1 line [t1].
- INP: not measured. I attached no event-timing observer, and the page has no interaction beyond a mail link.

## Browsers

- Chrome latest: ran here as HeadlessChrome 157 (the user agent the page reported); this is the browser behind every run above [t1].
- Chrome previous: not checked.
- Safari: not checked.
- Firefox: not checked.
- iOS Safari: not checked, needs your eyes on a real iPhone.

## Other findings

- Console: 0 errors after load [t2]. My `fetch` calls to routes that do not exist added 9 console errors afterwards; those are mine, not the page's [t4].
- `/admin` and `/api/health` answer 404, as the house rules expect for `web` (no `/admin`, no `/api`) [t4].
- The accessibility tree shows an empty `alert` element at the end of the page, which is the framework's route announcer [t10]. Harmless.
