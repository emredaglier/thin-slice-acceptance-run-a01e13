---
author: qa
---

# QA rubric report

Merged main, at the commit and preview URL named in my prompt. One page exists (the home page, "Kiln & Clay"). I checked a desktop width and a phone width in the browser tools. I did not read the source: the hook allowed no read of merged code in this turn, so source-level claims are not made here.

## Tool runs

- t1: browser_navigate to `/` at desktop width, then browser_evaluate on the page: navigation timing, resource timing, LCP and layout-shift observers (buffered), paint timing, head tags, headings, landmarks, images, node count.
- t2: browser_console_messages, level error, on `/`.
- t3: browser_network_requests with static resources on, on `/`.
- t4: browser_evaluate with `fetch` of `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/manifest.webmanifest`, `/impressum`, `/privacy`, `/does-not-exist`, `/admin`, `/api/health`, and the response headers of `/`.
- t5: browser_evaluate at desktop width: computed colours and contrast ratios of every heading, paragraph, link and list item, link size, link focus style at rest, running animations, tabindex count, skip link.
- t6: browser_resize to phone width, then browser_evaluate: horizontal overflow, smallest font size, heading size, focus ring on the mail link after `focus()`, link height, reduced-motion media state, viewport meta.
- t7: browser_take_screenshot, full page at phone width, saved as `studio/qa/rubric-1-phone.png`.
- t8: browser_evaluate with `fetch` of `/` and `/does-not-exist` parsed as HTML (content in server HTML, 404 page title, h1 and robots meta, canvas count, user agent).
- t9: browser_evaluate with `fetch` of each `_next/static` file the page loaded, reading cache-control and content-encoding.
- t10: browser_snapshot (accessibility tree) of `/`.

## Performance (20)

- Score: 15 of 20 [t1, t3, t9]
- The document is one request and the page paints fast: first contentful paint at 48 ms, LCP at 48 ms, load event at 65.6 ms. This is one lab run from headless Chrome over the tailnet, not field data [t1].
- Total transferred for the page and its eight static files: 163,974 bytes, summed from the transfer sizes in the resource list [t1].
- Two JavaScript chunks carry most of it: 67,353 and 64,355 bytes over the wire, 241,708 and 203,721 bytes decoded. This is the main thing that costs points. I did not open the bundle, so I cannot say what is in them. Together the two are 131,708 bytes over the wire for a page with no interaction and no animation [t1].
- The font file is 18,420 bytes over the wire and loads from the same origin with `immutable` caching [t1, t9].
- Static files carry `public, max-age=31536000, immutable`; CSS and JavaScript are gzip-encoded (the 514-byte `main-app` file is not) [t9, t1].
- The home page HTML is sent with a one-year `s-maxage` and an etag, so the edge may keep the HTML for a year. The house rule says the edge caches immutable files only. Flagged, not scored as a failure: I could not see how the HTML is purged when content changes. The year is 31,536,000 seconds as the header reads [t4].
- `/favicon.ico` answers 404 and logs a console error on every page load [t2, t4].
- No images on the page, so no image weight or format to judge [t1].

## Mobile (20)

- Score: 16 of 20 [t6, t7, t5]
- The viewport meta is `width=device-width, initial-scale=1`; at phone width the page does not scroll sideways (document width equals window width, no element past the right edge) [t6].
- The smallest text on the page is 14 px (footer and the "Prices include VAT" line); the h1 drops to 36 px on the phone, and was 60 px on desktop [t6, t5].
- The layout reads cleanly in the full-page phone screenshot: single column, class prices aligned right, footer legible [t7].
- The one interactive element, the mail link, sits on its own line and is short for a finger tap, so points are lost for it. Its height is 21 px at phone width [t6].
- Playwright's Chromium is not an iPhone. Not checked here: iOS Safari rendering, safe-area insets, momentum scroll, the on-screen keyboard (there is no form), real touch. Needs your eyes on a real iPhone.

## Semantics and SEO (20)

- Score: 12 of 20 [t1, t4, t8, t10]
- Present: `lang` set to en, a title ("Kiln & Clay"), a meta description, one h1 followed by three h2 headings (About, Classes, Contact), a `main` landmark and a footer [t1, t10].
- The content is in the server HTML: the h1, the class list and the mailto link all appear in the fetched source, so it reads without JavaScript [t8].
- The classes are a real list with three items [t10].
- The 404 page has its own title ("Not found"), an h1 and `noindex` [t8].
- Missing: canonical link, Open Graph and Twitter tags, theme colour, structured data (no JSON-LD in the page, a pottery studio with an address would suit `LocalBusiness`), and any icon link [t1, t8].
- `/robots.txt` and `/sitemap.xml` both answer 404 [t4].
- The page title and the h1 are the same words and the title says nothing about what the studio does [t1].
- The privacy line is in the footer, and the footer names the data controller [t10]. I checked that it is there, not whether it meets any law.

## Animation (15)

- Score: 7 of 15 [t5, t8]
- Nothing on the page moves: zero running animations or transitions, no canvas element, so no WebGL to test and no frame times to measure [t5, t8].
- I give a middle score because there is nothing to fault and nothing to reward. An Awwwards judge scores motion as craft, and there is none to see.
- How motion feels (easing, timing, polish) would be "needs your eyes". There is no motion on this page to feel, so this is the owner's call on whether a static page is what they want.
- Reduced-motion: the media state was "no preference" in my run, and I did not test the reduced setting because no motion exists [t6].

## Markup (15)

- Score: 11 of 15 [t1, t10]
- Elements are used for their meaning: `main`, three `section` elements, a list for the classes, `footer`, one h1 and no skipped heading levels [t1, t10].
- The page has 58 elements, which is small and tidy [t1].
- Each class row is built from `span` elements inside the list item rather than a description list or table, so a screen reader hears the name, the length and the price as three separate pieces [t10]. Fine, not wrong.
- The mail link and the address sit in one block with no break or separate element between them in the accessibility tree [t10].
- I ran no HTML validator, so "valid markup" is not claimed. Not checked [t1].
- Ten `script` tags are in the HTML, framework inline scripts included [t1, t8].

## Accessibility (10)

- Score: 9 of 10 [t5, t6, t10]
- Contrast: the lowest ratio on the page is 6.93 (the mail link on the paper background); body text measures 14.59; the muted text 7.78; footer text 6.96. All pass the usual 4.5 line [t5].
- The mail link shows a solid 3 px ring in the clay colour when focused with the keyboard, and the browser reports `:focus-visible` on it [t6, t5].
- The link is underlined, so it is not marked by colour alone [t5].
- Language is set; headings are in order; no images, so no alt text to check [t1, t10].
- There is no skip link, and there is only one link to skip to; fine at this size [t5].
- Not checked: a screen reader (VoiceOver, NVDA); I read the accessibility tree only. Not run: axe, because no axe runner is among my tools [t10].

## Core Web Vitals

- LCP: 48 ms, element is the subtitle paragraph, headless Chrome desktop, one lab run, no throttling, not field data. Under the 2.5 s line [t1].
- CLS: 0, no layout-shift entries were recorded after load (observer was buffered). Under the 0.1 line [t1].
- INP: not measured. I made no pointer or key interaction that an event-timing observer recorded, and the page has no interaction beyond a mail link.

## Browsers

- Chrome latest: ran here as HeadlessChrome 157 (the user agent the page reported); this is the browser behind every run above [t8].
- Chrome previous: not checked.
- Safari: not checked.
- Firefox: not checked.
- iOS Safari: not checked, needs your eyes on a real iPhone.

## Other findings

- Console: one error on load, the 404 for `/favicon.ico` [t2]. The rest of the console errors in the session came from my own `fetch` calls to routes that do not exist.
- `/admin` and `/api/health` answer 404 as the house rules expect for `web` (no `/admin`, no `/api`) [t4].
- The accessibility tree shows an empty `alert` element at the end of the page, which is the framework's route announcer [t10]. Harmless.
