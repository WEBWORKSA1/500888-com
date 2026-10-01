/* =========================================================
   500888.com — SITE CONFIGURATION
   Edit this one file to switch on monetization.
   ========================================================= */
window.SITE = {
  name: "500888",
  domain: "500888.com",
  tagline: "Prosperity Numbers, Zodiac & Chinese Culture Hub",

  /* Interest / acquisition contact (shown at the top of every page) */
  interestUrl: "https://web.works/contact",

  /* ---------- Contact routing (do NOT put a plain email anywhere) ----------
     The inbox is stored encoded and only assembled in the browser at submit time.
     After FormSubmit sends you the activation email, you may replace `formAlias`
     with the random alias FormSubmit gives you — then no address is ever used client-side. */
  _m: "bW9jLmxpYW1nQDFhc2tyb3diZXc=",
  formAlias: "",            // e.g. "a1b2c3d4e5f6..." (FormSubmit random string)
  formEndpoint: "https://formsubmit.co/ajax/",

  /* ---------- Google AdSense ----------
     Paste your publisher ID (ca-pub-XXXXXXXXXXXXXXXX) once approved.
     Leave empty to show "Advertise here" house ads instead. Also update /ads.txt */
  adsenseClient: "",
  adSlots: { leaderboard: "", inArticle: "", sidebar: "", footer: "" },

  /* ---------- Analytics (optional) ---------- */
  ga4: "",                   // e.g. "G-XXXXXXXXXX"

  /* ---------- Donations ----------
     Add any/all of your payment pages. Empty = hidden. Pledge form always works. */
  donate: {
    paypal: "",              // e.g. https://www.paypal.com/donate/?hosted_button_id=XXXX
    kofi: "",                // e.g. https://ko-fi.com/yourname
    buymeacoffee: "",        // e.g. https://buymeacoffee.com/yourname
    stripe: "",              // e.g. https://donate.stripe.com/xxxx
    githubSponsors: "",      // e.g. https://github.com/sponsors/yourname
    goal: 8888,              // annual goal (USD)
    raised: 0,               // update manually
    currency: "USD"
  },
  supporters: [
    // { name: "Your name here", amount: 88, note: "Keep the tools free!" }
  ],

  /* ---------- Contest ---------- */
  contest: {
    name: "Lucky 888 Prosperity Draw",
    closes: "2027-02-06T00:00:00+08:00",  // Chinese New Year 2027 (Year of the Goat)
    prizes: [
      { place: "Grand prize", prize: "US$888 prosperity prize (or equivalent)" },
      { place: "2nd prize", prize: "US$168 + premium personalized report" },
      { place: "8 runner-up prizes", prize: "US$18 digital gift card each" }
    ]
  },

  /* ---------- YouTube ----------
     Swap in your own channel's videos any time. */
  youtubeChannel: "",        // e.g. https://www.youtube.com/@yourchannel
  videos: [
    { id: "pT52hREAf18", title: "Chinese Lucky Numbers", by: "Numberphile", cat: "numbers" },
    { id: "3I-R5S3czyw", title: "Everything you need to know about the Chinese New Year", by: "TRT World", cat: "festivals" },
    { id: "4F_VsNPUlAM", title: "The Absolute Best Chinese New Year Traditions You Need to Try", by: "Kitchen To Entertain", cat: "festivals" },
    { id: "2dEq-Lvxvck", title: "The Great Race — How the Chinese Zodiac Was Created", by: "100 Surnames", cat: "zodiac" },
    { id: "Ec_DgpWrbWQ", title: "The 12 Animals of the Chinese Zodiac", by: "BrainSnax Books", cat: "zodiac" },
    { id: "R5W-N8jF49M", title: "The Story of the 12 Chinese Zodiacs, the Great Race", by: "Dr. Sun Yat-Sen Classical Chinese Garden", cat: "zodiac" },
    { id: "MNc5lbdzNI4", title: "What Is Feng Shui and How Does It Work?", by: "Elemental Clarity", cat: "fengshui" },
    { id: "TOeUqMwOrA8", title: "Feng Shui Mini Lesson: The Complete Beginners Guide", by: "Sara Jane Ho", cat: "fengshui" }
  ],

  social: { youtube: "", x: "", instagram: "", tiktok: "", facebook: "", pinterest: "", wechat: "" }
};
