# 500888.com: Phase-by-Phase Build Prompts

These are copy-paste prompts for an AI coding assistant. They rebuild or extend 500888.com as a modern, responsive, interactive and fully monetizable static site that runs on the free tier of GitHub Pages. Run the phases in order. Each prompt stands on its own.

> Replace `[OWNER_EMAIL]` with the private inbox. **Never print it in HTML.** Store it base64-encoded, reversed, in `assets/js/config.js` and assemble it only at submit time.

---

## Phase 0: Foundation and guardrails

```
Create a static website for the domain 500888.com, hosted on GitHub Pages (free plan, no build server).

Stack:
- vanilla HTML, CSS and JS
- Jekyll layouts (built free by GitHub Pages): _layouts/default.html plus pages made of front matter and body
- no frameworks or paid services

Structure:
- /assets/css/style.css
- /assets/js/{config.js,main.js,tools.js}
- /assets/img
- /guides
- /docs

Use relative links everywhere, so the site works both at /500888-com/ on github.io and at the root of a custom domain.

Global rules:
1. Every page starts with a top banner: "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership". It links to https://web.works/contact in a new tab.
2. The only contact inbox is [OWNER_EMAIL]. It must never appear as text in any file. Store it as base64 of the reversed string in config.js. All forms POST JSON to FormSubmit AJAX (https://formsubmit.co/ajax/<inbox>), with a honeypot field and a graceful mailto fallback. "Email us" links build the mailto on click.
3. Add a trademark and copyright disclosure:
   - not affiliated with any company that uses "500", "888" or "500888", including lottery operators, banks and call centres;
   - no gambling;
   - not professional advice.
4. Do not position the site around lottery or gambling.
5. Accessibility: semantic landmarks, skip link, labels, focus states, prefers-reduced-motion.
```

## Phase 1: Design system

```
Build a design system in style.css with CSS custom properties:
- colours: cinnabar red #c8102e, imperial gold #d4a017, ink, warm cream background, jade accent
- fonts: Inter (body) and Playfair Display (display), from Google Fonts

Include:
- light and dark mode (prefers-color-scheme plus a manual toggle saved in localStorage)
- a sticky blurred header with mega-menu dropdowns
- a mobile slide-in drawer with scrim
- buttons (primary, gold, ghost)
- cards and responsive grids (2/3/4/6 columns, collapsing at 980px and 640px)
- tool panels and a score ring (conic-gradient)
- a digit-chip row, countdown blocks and a festive CNY strip
- a dark-red lead-gen "leadbox"
- multi-step form progress bars
- FAQ <details>, tier pricing cards and a donation amount picker
- a red-envelope supporter wall
- YouTube facade cards
- article typography with TOC and tables
- footer, cookie banner, toast, back-to-top, scroll-reveal

Rules: a 16px gutter on phones, no horizontal scroll at 360px, and print styles.
```

## Phase 2: Interactive tools engine (tools.js)

```
Implement these tools in tools.js. Each one auto-initialises when its container exists on the page.

1. Lucky Number Analyzer
   - Digit weights: 8=+3, 6=+2, 9=+2, 2/3=+1, 0/1=+0.5, 7=+0.3, 5=0, 4=−3. The last digit counts 1.5×.
   - Combination bonuses and penalties:
     - bonuses: 888, 168, 518, 918, 1314, 520, 666, 999, 88, 68, 28, 58, 66, 99, 16
     - penalties: 14, 24, 44, 74, 94, 38, 250, 514, 748
     - avoid double-counting 88 inside 888
   - Add a bonus for positive runs of 3 or more.
   - Score = 50 + 50·tanh(sum/(len·1.6+4)), clamped to 1–99. Show grade labels.
   - Output: score ring, coloured digit chips with tooltips, combinations found, insights (including a Mandarin vs Cantonese note for 5), digit meanings, a share button, and CTAs to the report and to the premium numbers section.
   - Modes: any, phone, plate, address, price, domain.
   - Support the ?n= deep link.
2. Zodiac finder
   - Use exact Lunar New Year dates 1924–2045, computed with the `lunardate` library.
   - Return animal, element (from the last digit of the year) and yin/yang, plus lucky numbers, colours and best matches.
   - Also build a 12-animal grid with the years for each animal.
3. Compatibility
   - Rules: Six Harmonies 95, Trine 90, same sign 74, neutral 64, Harm 45, Clash 35.
4. Kua number
   - The solar year starts on 4 Feb.
   - Formulas differ for births before and after 2000 and by gender. A result of 5 becomes 2 (male) or 8 (female).
   - Show the East/West group, the element, 4 lucky directions (Sheng Qi, Tian Yi, Yan Nian, Fu Wei) and 4 directions to avoid.
5. Hongbao calculator
   - Inputs: relationship × occasion × closeness × currency (10 currencies).
   - Snap results to a "lucky ladder": no 4s; rich in 6, 8 and 9; even amounts.
   - Funerals use odd amounts ending in 1, in a white envelope.
6. Lucky price finder: search ±15% for price points without a 4, ranked by analyzer score minus a distance penalty.
7. Lucky date picker: score each day of a month by number luck, weekday fit for the stated purpose, and festivals. Qingming and Ghost Festival get a penalty. Show the top 8 and a calendar heat-map.
8. Fortune sticks: a shake animation and 20 fortunes.
9. Daily lucky number: hash of the date plus the chosen sign.
10. Number dictionary: 35+ entries with search and filter.
11. Greetings phrasebook: speak via the Web Speech API in zh-CN.
12. Festival list: countdowns from verified 2026–2028 dates.
```

## Phase 3: Pages and content

```
Generate the following pages, each with a unique <title>, meta description, canonical URL, Open Graph and Twitter tags, and JSON-LD (WebSite plus FAQPage, Article or WebApplication as relevant).

Main pages:
- index (hero = instant analyzer, CNY 2027 countdown, tools grid, "Why 500888" digit cards, sourced data stats, zodiac grid, daily number, fortune sticks, lead box, videos, guides, community cards, FAQ)
- lucky-number-analyzer
- zodiac
- feng-shui
- hongbao
- lucky-tools (price, dates, fortune)
- numbers
- festivals
- videos
- guides index plus 6 sourced guides:
  - why-8-is-lucky
  - unlucky-number-4
  - lucky-number-pricing
  - chinese-new-year-2027
  - hongbao-etiquette
  - numeric-domains
- report (lead gen)
- business (consulting plus premium numbers marketplace)
- contest
- support (donate, tiers, advertise)
- careers

Supporting pages: about, contact, privacy, terms, legal (trademark and copyright disclosure), thank-you, 404 (base-href fix for project pages).

Site files: _config.yml, sitemap.xml, robots.txt, ads.txt template, manifest.webmanifest, OG image 1200×630, icons 192 and 512.

Write the content from verified facts only, cite sources at the end of each guide, and flag folk meanings versus classical ones.
```

## Phase 4: Lead generation (the money section)

```
Build high-converting lead capture:
1. A /report.html 3-step form:
   - step 1: name, email, country
   - step 2: date of birth, optional birth time, gender, a number to analyse
   - step 3: goal, premium service upsell, message, consent
   Use a progress bar, field validation per step, and redirect to thank-you.
2. A short lead box on the home page: name, email, date of birth.
3. Prefill forms from query strings (?dob=, ?number=, ?kua=, ?service=) passed by tool results.
4. A B2B consulting form: name, work email, company, website, market, budget band, service, timeline, details.
5. A premium-number appraisal form and a buyer-request form.
6. An exit-intent dialog, desktop only and shown once, on tool pages.
7. Newsletter signup in the footer.
8. Attach ref and UTM attribution and the page URL to every submission. Fire a GA4 generate_lead event when GA4 is configured.
9. Put trust copy under every form: privacy, no spam, response time.
```

## Phase 5: Monetization

```
1. AdSense via config.js (adsenseClient and slot IDs).
   - Load the AdSense script after consent; request non-personalised ads under "Essential only".
   - Slots: leaderboard, inArticle, sidebar.
   - Reserve min-height to avoid layout shift (CLS).
   - Never place an ad between a tool's input and its result.
   - When no client ID is set, show a "Sponsor this space" house ad linking to /support.html#advertise.
2. YouTube: config.videos array, privacy-friendly facades (thumbnail + click → youtube-nocookie iframe), category filters, an optional channel subscribe button.
3. Donations:
   - lucky presets $8/$18/$28/$68/$168/$888
   - frequency and purpose (operations, tools, marketing, hiring, prizes)
   - pledge form plus optional PayPal, Stripe, Ko-fi, BMC and GitHub Sponsors links from config
   - goal progress bar and supporter wall
   - membership tiers $3, $8 and $88
4. Sponsorship and advertising: placement table plus a media-kit request form.
5. Contest:
   - free entry, prizes, countdown to CNY 2027
   - referral link generator and bonus entries
   - skill-testing question (required in Canada)
   - official rules: no purchase necessary, 18+, void where prohibited, Québec RACJ note
6. Careers:
   - 6 roles: writer, practitioner, video creator, SEO, developer, ambassador
   - application form with portfolio URL
```

## Phase 6: QA, deploy and growth

```
QA (Playwright):
- every page loads with no JS errors
- the top banner link is present
- no horizontal overflow at 1366px and at 390px
- every tool produces output
- forms POST to the encoded endpoint
- the multi-step form advances
- the mobile drawer opens and closes
- grep the repo: the inbox string never appears
- all internal links resolve

Deploy:
- push to github.com/WEBWORKSA1/500888-com on main and gh-pages
- enable Pages: Settings → Pages → Deploy from branch → main / root

Custom domain:
- add a CNAME file containing 500888.com
- DNS: A records 185.199.108.153, .109.153, .110.153, .111.153; AAAA 2606:50c0:8000::153 (and 8001–8003); CNAME www → webworksa1.github.io
- tick "Enforce HTTPS"

Post-launch:
- submit sitemap.xml to Google Search Console and Bing
- apply for AdSense
- activate FormSubmit (first submission sends a confirmation email; then swap in the random alias in config.formAlias)
```

## Phase 7: Expansion roadmap (by expected ROI)

1. **Programmatic SEO.** One page per number from 0–9999 (e.g. /number/168), with meaning, score, combinations and a CTA. That is thousands of long-tail URLs.
2. **Annual forecast pages per animal and year.** For example, "Goat 2027" — evergreen and seasonal.
3. **Traditional Chinese and Simplified Chinese** versions with hreflang.
4. **Shareable PNG result cards** (canvas) for social virality.
5. **Daily email** ("Your lucky number today") via a free ESP tier.
6. **Paid PDF reports** through Stripe Payment Links or Gumroad.
7. **Embeddable widgets** (CNY countdown, daily number), which earn backlinks.
8. **Affiliate shop**: red envelopes, almanacs, feng shui items, books.
9. **Q&A / community** (e.g. GitHub Discussions or Giscus comments).
10. **Seasonal landing pages**: 520 Day, Qixi 8/8/2027, Mid-Autumn, Singles' Day 11/11.
