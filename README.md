# 500888.com: Prosperity Numbers, Zodiac and Chinese Culture Hub

This is a static website (Jekyll source plus vanilla JS). It runs for free on GitHub Pages and has no database.

- **Live (GitHub Pages):** https://webworksa1.github.io/500888-com/
- **Strategy and research:** [`docs/RESEARCH.md`](docs/RESEARCH.md)
- **Phase-by-phase build prompts:** [`docs/BUILD-PROMPTS.md`](docs/BUILD-PROMPTS.md)

## What's inside

- **10+ free tools**
  - Lucky Number Analyzer
  - Zodiac Finder and compatibility checker
  - Feng Shui Kua calculator
  - Hongbao (red envelope) calculator
  - Lucky Price Finder
  - Lucky Date Picker
  - Fortune sticks
  - Daily lucky number
  - Number dictionary
  - Greetings phrasebook with audio
  - Festival countdowns
- **Lead generation**
  - 3-step Prosperity Report funnel
  - B2B consulting form
  - Premium number appraisal and buyer forms
  - Exit-intent dialog
  - Newsletter signup
- **Monetization**
  - AdSense-ready ad slots, with house ads as a fallback
  - YouTube video hub
  - Donations with lucky-amount presets, membership tiers and a supporter wall
  - Sponsorship and advertising media-kit form
  - Contest with referral entries
  - Careers page
- **SEO**
  - Unique meta and Open Graph tags on every page
  - JSON-LD structured data
  - Sitemap and robots.txt
  - 6 sourced guides
  - FAQ structured data (FAQPage)
- **UX:** responsive, dark mode, accessible, cookie consent, privacy-friendly video embeds.

## Configure (edit one file: `assets/js/config.js`)

| Setting | What to do |
|---|---|
| `adsenseClient` | Paste `ca-pub-…` once AdSense approves the site. Also edit `ads.txt`. |
| `ga4` | Optional Google Analytics ID. |
| `donate.*` | Paste your PayPal, Stripe, Ko-fi, Buy Me a Coffee or GitHub Sponsors links. Buttons show automatically. |
| `donate.raised` | Update this as donations come in. |
| `supporters` | Add names to the supporter wall. |
| `videos` / `youtubeChannel` | Swap in your own channel's videos. |
| `formAlias` | After FormSubmit's activation email, paste the random alias it gives you. |

**Contact privacy:** the owner inbox is never written in plain text anywhere in this repo. It is stored encoded in `config.js` and assembled only when a form is submitted.

## Edit content

GitHub Pages builds the site with Jekyll for free on every push, so there is no build step on your side.

- `_layouts/default.html` holds the shared head, top contact banner, navigation, footer, cookie banner and scripts. Edit it once and every page updates.
- Each `*.html` page is front matter (title, description, `root`, `tools`, `exit`) plus page content.
- To add a page, copy any page, change the front matter, and link it from the nav in `_layouts/default.html` and from `sitemap.xml`.

## One-time image upload

Three PNG files are binary, so they are uploaded through the GitHub website: `og-image.png` (social share image), `icon-192.png` and `icon-512.png`. Open the repo, go to `assets/img`, choose **Add file → Upload files**, and drop all three in.

## Custom domain

1. Add a file named `CNAME` containing `500888.com`.
2. At your registrar, set:
   - A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` CNAME → `webworksa1.github.io`
3. In the repo, go to Settings → Pages and turn on Enforce HTTPS.

## Legal

This is an independent site. It is not affiliated with any company that uses "500", "888" or "500888". See `legal.html`.

© 2026 500888.com
