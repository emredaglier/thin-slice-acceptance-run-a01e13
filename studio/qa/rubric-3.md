---
author: qa
---

# QA rubric report

Merged main at commit 0bb85979f9898fd95217f16ed6b87792dc48d358, run at the preview URL in my prompt. One page exists, the home page ("Kiln & Clay"). I checked a desktop width and a phone width in the browser tools. My prompt names no checkout, so I read no source and make no source-level claims. This turn I took only the figures below from tool runs I made in this turn.

## Tool runs

- t1: browser_navigate to `/` (desktop viewport); it returned the accessibility snapshot saved at `.playwright-mcp/page-2026-11-14T13-35-00-887Z.yml`.
- t2: browser_evaluate on `/`: navigation timing, resource timing, LCP and layout-shift observers (buffered), paint timing, head tags, element counts, user agent, running animations.
- t3: browser_console_messages, level error, on `/` after load and before any of my own fetches.
- t4: browser_network_requests with static resources on, on `/`.
- t5: browser_evaluate with `fetch` of `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/manifest.webmanifest`, `/impressum`, `/privacy`, `/does-not-exist`, `/admin`, `/api/health`; the response headers of `/`; `/does-not-exist` parsed as HTML; cache-control and content-encoding of each `_next/static` file the page loaded.
- t6: browser_evaluate at desktop width: computed colour contrast and font size of every heading, paragraph, span and link; mail link size and underline; tabindex count; horizontal overflow; running animations; reduced-motion state.
- t7: browser_press_key Tab on `/`.
- t8: browser_evaluate on the focused element after t7: tag, `:focus-visible`, outline.
- t9: browser_resize to 375 by 812.
- t10: browser_evaluate at that phone width: horizontal overflow, elements past the right edge, smallest font size, h1 size, mail link size, viewport meta.
- t11: browser_take_screenshot, full page at phone width, saved as `studio/qa/rubric-3-phone.png`, then looked at with Read.
- t12: browser_emulate_media with reduced motion set to reduce.
- t13: Read of the accessibility snapshot file from t1.

## Performance (20)

- Score: 16 of 20 [t2, t4, t5]
- The page makes 10 requests: the document, the font, one stylesheet, six scripts and the favicon [t4].
- First paint and first contentful paint both at 144 ms, LCP at 144 ms, time to first byte 83 ms, load event at 133.9 ms. This is one lab run in headless Chrome over the tailnet, not field data [t2].
- Transferred in all, document plus its nine sub-resources: 165,432 bytes, the sum of the transfer sizes in the resource list and the document [t2].
- Two JavaScript chunks carry most of it: 64,355 and 67,353 bytes over the wire, 203,721 and 241,708 bytes decoded; together 131,708 bytes over the wire for a page with no interaction and no animation. This is what costs points. I did not open the bundle, so I cannot say what is in them [t2].
- The font file is 18,420 bytes over the wire, preloaded (a `Link` header and a head tag), from the same origin [t2, t5].
- Every `_next/static` file carries `public, max-age=31536000, immutable`; the stylesheet and all scripts except the 814-byte `main-app` file are gzip-encoded [t5, t2].
- The home page HTML is now sent with `private, no-cache, no-store, max-age=0, must-revalidate`, so the edge does not keep it, in line with the house rule that the edge caches immutable files only. The document is gzip-encoded and 11,377 characters long [t5].
- `/favicon.ico` answers 200 with `max-age=0, must-revalidate`, 606 bytes transferred, and the head links it [t5, t2].
- A `not-found` script chunk of 3,619 bytes over the wire loads on the home page [t2].
- No images on the page, so no image weight or format to judge: 0 `img` elements [t2].

## Mobile (20)

- Score: 16 of 20 [t10, t11, t6]
- The viewport meta is `width=device-width, initial-scale=1`. At 375 px wide the document is 375 px wide and 0 elements reach past the right edge, so nothing scrolls sideways [t10].
- The smallest text on the page is 14 px (footer lines and "Prices include VAT"). The h1 is 36 px on the phone and 60 px on desktop [t10, t6].
- The full-page phone screenshot reads cleanly: single column, class prices aligned to the right, footer legible. I judged this by looking at the screenshot only [t11].
- The one interactive element, the mail link, measures 28 px high and 214.2 px wide at phone width. Short for a finger; points are lost for it [t10].
- Not checked: Playwright's Chromium is not an iPhone. iOS Safari rendering, safe-area insets, momentum scroll and real touch need your eyes on a real iPhone. There is no form, so no on-screen keyboard to test.

## Semantics and SEO (20)

- Score: 12 of 20 [t2, t5, t13]
- Present: `lang` set to en, a title ("Kiln & Clay"), a meta description, one h1 followed by 3 h2 headings (About, Classes, Contact), one `main` landmark and a footer (`contentinfo`) [t2, t13].
- The content is in the server HTML: the h1, the mail link and 6 `li` tags (3 list items) are in the fetched source, so it reads without JavaScript [t5].
- The classes are a real list of 3 items [t13].
- The 404 page has its own title ("Not found"), an h1 ("Page not found") and a `noindex` robots meta [t5].
- The head links an icon [t2].
- Missing: canonical link, Open Graph and Twitter tags, theme colour, and structured data (0 JSON-LD scripts; a pottery studio with an address would suit `LocalBusiness`) [t2].
- `/robots.txt`, `/sitemap.xml` and `/manifest.webmanifest` all answer 404 [t5].
- The page title and the h1 are the same words, and the title says nothing about what the studio does. The meta description is the subtitle line only [t2].
- The footer carries a privacy line and names the data controller [t13]. I checked that it is there, not whether it meets any law.

## Animation (15)

- Score: 7 of 15 [t6, t2]
- Nothing on the page moves: 0 running animations or transitions and 0 canvas elements, so there is no WebGL to test and no frame time to measure [t6, t2].
- I give a middle score because there is nothing to fault and nothing to reward. An Awwwards judge scores motion as craft, and there is none to see.
- How motion feels (easing, timing, polish): needs your eyes. There is no motion on this page; whether a static page is what you want is your call.
- Reduced motion: I set the reduce preference, but the animation count was 0 before it, so there is no motion that could respond [t12, t6].

## Markup (15)

- Score: 11 of 15 [t2, t13]
- Elements are used for their meaning: `main`, 3 `section` elements, a list for the classes, `footer`, one h1 and no skipped heading level [t2, t13].
- The page has 59 elements, small and tidy [t2].
- Each class row is built from `span` elements inside the list item rather than a description list or table, so a screen reader hears name, length and price as three separate pieces [t13]. Fine, not wrong.
- The mail link and the address sit in one block with no element between them [t13].
- I ran no HTML validator, so "valid markup" is not claimed. Not checked.
- 10 `script` elements are in the DOM, framework inline scripts included [t2].

## Accessibility (10)

- Score: 9 of 10 [t6, t8, t13]
- Contrast: the lowest ratio on the page is 6.93 (the mail link on the paper background); headings and body text measure 14.59, muted text 7.78, footer text 6.96. All pass the usual 4.5 line [t6].
- After one Tab press the mail link is focused and the browser reports `:focus-visible` with a solid 3 px outline, 3 px offset, in `rgb(138, 63, 33)`; the ring is visible in the phone screenshot [t7, t8, t11].
- The link is underlined, so it is not marked by colour alone [t6].
- Language is set; headings are in order; no images, so no alt text to check; 0 `tabindex` attributes [t2, t13, t6].
- There is no skip link, and only one link to skip to; fine at this size [t6].
- Not checked: a screen reader (VoiceOver, NVDA); I read the accessibility tree only. Not run: axe, because no axe runner is among my tools.

## Core Web Vitals

- LCP: 144 ms, element is a paragraph, headless Chrome desktop, one lab run, no throttling, not field data. Under the 2.5 s line [t2].
- CLS: 0, with 0 layout-shift entries recorded (the observer was buffered). Under the 0.1 line [t2].
- INP: not measured. I attached no event-timing observer, and the page has no interaction beyond a mail link.

## Browsers

- Chrome latest: ran here as HeadlessChrome 157 (the user agent the page reported); this is the browser behind every run above [t2].
- Chrome previous: not checked.
- Safari: not checked.
- Firefox: not checked.
- iOS Safari: not checked, needs your eyes on a real iPhone.

## Other findings

- Console: 0 errors after load [t3]. My `fetch` calls to routes that do not exist added 9 console errors afterwards; those are mine, not the page's [t5].
- `/admin` and `/api/health` answer 404, as the house rules expect for `web` (no `/admin`, no `/api`) [t5].
- The accessibility tree ends with an empty `alert` element, the framework's route announcer [t13]. Harmless.
- Changed since the last rubric report, as far as the runs this turn show: the home page HTML is no longer edge-cacheable (`no-store`) [t5]. The rest (script weight, missing SEO tags, no motion, short tap target) measures as before in kind, not compared by number.
