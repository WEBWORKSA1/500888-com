/* 500888.com — interactive tools engine
   Lucky Number Analyzer · Zodiac Finder · Compatibility · Kua · Hongbao · Lucky Price · Lucky Dates
   Fortune Sticks · Daily Lucky Number · Number Dictionary · Greetings phrasebook */
(function () {
  "use strict";
  var U = window.$500 || {}, $ = U.$, $$ = U.$$;
  var base = document.body.getAttribute("data-root") || "";

  /* ================= DATA ================= */
  var DIGITS = {
    "0": { py: "líng 零", w: 0.5, m: "Zero — a beginning; wholeness. Sounds like 良 (good) to some ears." },
    "1": { py: "yī 一", w: 0.5, m: "Unity and being first. Neutral-positive; in pairs like 11 can suggest 'alone'." },
    "2": { py: "èr 二", w: 1, m: "Pairs and harmony — 'good things come in pairs' (好事成双)." },
    "3": { py: "sān 三", w: 1, m: "Sounds like 生 shēng (life, birth) — vitality and growth." },
    "4": { py: "sì 四", w: -3, m: "Sounds like 死 sǐ (death). The most avoided digit in Chinese culture." },
    "5": { py: "wǔ 五", w: 0, m: "The Five Elements. Mandarin wordplay reads it as 我 'I/me'; in Cantonese it can sound like 唔 'not'." },
    "6": { py: "liù 六", w: 2, m: "Sounds like 流 liú (flow) — smooth, frictionless progress (六六大顺)." },
    "7": { py: "qī 七", w: 0.3, m: "Sounds like 起 qǐ (rise) and 气 qì (vital energy). Mixed: the 7th lunar month is Ghost Month." },
    "8": { py: "bā 八", w: 3, m: "Sounds like 发 fā (prosper, make a fortune). The luckiest number in Chinese culture." },
    "9": { py: "jiǔ 九", w: 2, m: "Sounds like 久 jiǔ (long-lasting) — longevity and eternity; the emperor's number." }
  };
  var COMBOS = [
    ["888", 10, "Triple prosperity (发发发) — wealth multiplied"],
    ["168", 8, "一路发 'prosperity all the way'"],
    ["518", 8, "我要发 'I am going to prosper'"],
    ["918", 5, "就要发 'about to prosper'"],
    ["1314", 5, "一生一世 'for a whole lifetime'"],
    ["520", 4, "我爱你 'I love you' (internet slang)"],
    ["666", 6, "六六六 'super smooth' — also slang for 'awesome'"],
    ["999", 5, "久久久 'eternal' — lasting forever"],
    ["88", 5, "Double prosperity (发发); also 'bye-bye' in chat slang"],
    ["68", 4, "六八 'continuous prosperity' (路路发)"],
    ["28", 4, "易发 'easy prosperity' (Cantonese reading)"],
    ["58", 2, "我发 'I prosper' (Mandarin reading)"],
    ["66", 3, "六六 'smooth and smooth'"],
    ["99", 3, "久久 'long, long time'"],
    ["16", 2, "一路 'all the way'"],
    ["8", 0, ""],
    ["748", -6, "去死吧 'go die' — a harsh insult"],
    ["514", -5, "我要死 'I'm going to die'"],
    ["250", -5, "二百五 — slang for 'idiot'"],
    ["14", -4, "要死 'want to die'"],
    ["74", -3, "气死 'furious to death'"],
    ["94", -3, "就死 'just die'"],
    ["24", -3, "易死 'easy to die' (Cantonese reading)"],
    ["44", -2, "死死 'double death'"],
    ["38", -2, "三八 — a rude slang insult"]
  ];
  var ANIMALS = [
    { n: "Rat", zh: "鼠 Shǔ", e: "🐀", t: "Quick-witted, resourceful, charming and thrifty.", num: [2, 3], col: "Blue, gold, green", best: "Ox, Dragon, Monkey" },
    { n: "Ox", zh: "牛 Niú", e: "🐂", t: "Diligent, dependable, strong and determined.", num: [1, 4], col: "White, yellow, green", best: "Rat, Snake, Rooster" },
    { n: "Tiger", zh: "虎 Hǔ", e: "🐅", t: "Brave, confident, competitive and magnetic.", num: [1, 3, 4], col: "Blue, grey, orange", best: "Horse, Dog, Pig" },
    { n: "Rabbit", zh: "兔 Tù", e: "🐇", t: "Gentle, elegant, alert and quietly ambitious.", num: [3, 4, 6], col: "Red, pink, purple, blue", best: "Goat, Pig, Dog" },
    { n: "Dragon", zh: "龙 Lóng", e: "🐉", t: "Charismatic, ambitious, energetic — the imperial sign.", num: [1, 6, 7], col: "Gold, silver, white", best: "Rat, Monkey, Rooster" },
    { n: "Snake", zh: "蛇 Shé", e: "🐍", t: "Wise, intuitive, refined and strategic.", num: [2, 8, 9], col: "Black, red, yellow", best: "Ox, Rooster, Monkey" },
    { n: "Horse", zh: "马 Mǎ", e: "🐎", t: "Energetic, independent, warm-hearted and free-spirited.", num: [2, 3, 7], col: "Yellow, green", best: "Tiger, Dog, Goat" },
    { n: "Goat", zh: "羊 Yáng", e: "🐐", t: "Calm, creative, kind and resilient.", num: [2, 7], col: "Brown, red, purple", best: "Rabbit, Pig, Horse" },
    { n: "Monkey", zh: "猴 Hóu", e: "🐒", t: "Clever, curious, inventive and playful.", num: [4, 9], col: "White, blue, gold", best: "Rat, Dragon, Snake" },
    { n: "Rooster", zh: "鸡 Jī", e: "🐓", t: "Observant, hardworking, honest and confident.", num: [5, 7, 8], col: "Gold, brown, yellow", best: "Ox, Snake, Dragon" },
    { n: "Dog", zh: "狗 Gǒu", e: "🐕", t: "Loyal, honest, protective and fair.", num: [3, 4, 9], col: "Red, green, purple", best: "Tiger, Rabbit, Horse" },
    { n: "Pig", zh: "猪 Zhū", e: "🐖", t: "Generous, compassionate, easy-going and lucky with money.", num: [2, 5, 8], col: "Yellow, grey, brown, gold", best: "Tiger, Rabbit, Goat" }
  ];
  // Lunar New Year dates 1924–2045 (computed from the Chinese lunisolar calendar)
  var CNY = {1924:"02-05",1925:"01-24",1926:"02-13",1927:"02-02",1928:"01-23",1929:"02-10",1930:"01-30",1931:"02-17",1932:"02-06",1933:"01-26",1934:"02-14",1935:"02-04",1936:"01-24",1937:"02-11",1938:"01-31",1939:"02-19",1940:"02-08",1941:"01-27",1942:"02-15",1943:"02-05",1944:"01-25",1945:"02-13",1946:"02-02",1947:"01-22",1948:"02-10",1949:"01-29",1950:"02-17",1951:"02-06",1952:"01-27",1953:"02-14",1954:"02-03",1955:"01-24",1956:"02-12",1957:"01-31",1958:"02-18",1959:"02-08",1960:"01-28",1961:"02-15",1962:"02-05",1963:"01-25",1964:"02-13",1965:"02-02",1966:"01-21",1967:"02-09",1968:"01-30",1969:"02-17",1970:"02-06",1971:"01-27",1972:"02-15",1973:"02-03",1974:"01-23",1975:"02-11",1976:"01-31",1977:"02-18",1978:"02-07",1979:"01-28",1980:"02-16",1981:"02-05",1982:"01-25",1983:"02-13",1984:"02-02",1985:"02-20",1986:"02-09",1987:"01-29",1988:"02-17",1989:"02-06",1990:"01-27",1991:"02-15",1992:"02-04",1993:"01-23",1994:"02-10",1995:"01-31",1996:"02-19",1997:"02-07",1998:"01-28",1999:"02-16",2000:"02-05",2001:"01-24",2002:"02-12",2003:"02-01",2004:"01-22",2005:"02-09",2006:"01-29",2007:"02-18",2008:"02-07",2009:"01-26",2010:"02-14",2011:"02-03",2012:"01-23",2013:"02-10",2014:"01-31",2015:"02-19",2016:"02-08",2017:"01-28",2018:"02-16",2019:"02-05",2020:"01-25",2021:"02-12",2022:"02-01",2023:"01-22",2024:"02-10",2025:"01-29",2026:"02-17",2027:"02-06",2028:"01-26",2029:"02-13",2030:"02-03",2031:"01-23",2032:"02-11",2033:"01-31",2034:"02-19",2035:"02-08",2036:"01-28",2037:"02-15",2038:"02-04",2039:"01-24",2040:"02-12",2041:"02-01",2042:"01-22",2043:"02-10",2044:"01-30",2045:"02-17"};
  var ELEMENTS = ["Metal", "Metal", "Water", "Water", "Wood", "Wood", "Fire", "Fire", "Earth", "Earth"];
  var FESTIVALS = [
    ["2026-10-18", "Double Ninth Festival (重阳节)"], ["2026-12-22", "Winter Solstice / Dongzhi (冬至)"],
    ["2027-01-15", "Laba Festival (腊八节)"], ["2027-02-06", "Chinese New Year — Year of the Goat (春节)"],
    ["2027-02-20", "Lantern Festival (元宵节)"], ["2027-04-05", "Qingming Festival (清明节)"],
    ["2027-06-09", "Dragon Boat Festival (端午节)"], ["2027-08-08", "Qixi — Chinese Valentine's Day (七夕) · 8/8!"],
    ["2027-08-16", "Hungry Ghost Festival (中元节)"], ["2027-09-15", "Mid-Autumn Festival (中秋节)"],
    ["2027-10-08", "Double Ninth Festival (重阳节)"], ["2027-12-22", "Winter Solstice / Dongzhi (冬至)"],
    ["2028-01-04", "Laba Festival (腊八节)"], ["2028-01-26", "Chinese New Year — Year of the Monkey (春节)"],
    ["2028-02-09", "Lantern Festival (元宵节)"], ["2028-04-04", "Qingming Festival (清明节)"],
    ["2028-05-28", "Dragon Boat Festival (端午节)"], ["2028-08-26", "Qixi Festival (七夕)"],
    ["2028-10-03", "Mid-Autumn Festival (中秋节)"], ["2028-10-26", "Double Ninth Festival (重阳节)"]
  ];
  window.FESTIVALS = FESTIVALS;

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function stars(n) { n = Math.max(1, Math.min(5, Math.round(n))); return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }

  /* ================= LUCKY NUMBER ENGINE ================= */
  function analyze(raw) {
    var d = String(raw).replace(/\D/g, "");
    if (!d) return null;
    var sum = 0, found = [], counts = {};
    for (var i = 0; i < d.length; i++) {
      var w = DIGITS[d[i]].w * (i === d.length - 1 ? 1.5 : 1); // last digit carries most weight
      sum += w; counts[d[i]] = (counts[d[i]] || 0) + 1;
    }
    var used = {};
    COMBOS.forEach(function (c) {
      if (!c[1]) return;
      var idx = d.indexOf(c[0]), n = 0;
      while (idx > -1) { n++; idx = d.indexOf(c[0], idx + 1); }
      if (n) {
        // avoid double counting 88 inside 888 etc.
        if (c[0] === "88" && used["888"]) n = Math.max(0, n - used["888"] * 2);
        if (c[0] === "66" && used["666"]) n = Math.max(0, n - used["666"] * 2);
        if (c[0] === "99" && used["999"]) n = Math.max(0, n - used["999"] * 2);
        if (n) { sum += c[1] * n; found.push({ c: c[0], s: c[1], m: c[2], n: n }); used[c[0]] = n; }
      }
    });
    var runs = d.match(/(\d)\1{2,}/g) || [];
    runs.forEach(function (r) { var w = DIGITS[r[0]].w; if (w > 0) sum += r.length; });
    var norm = d.length * 1.6 + 4;
    var score = Math.round(50 + 50 * Math.tanh(sum / norm));
    score = Math.max(1, Math.min(99, score));
    var grade = score >= 88 ? "Imperial Prosperity 大吉" : score >= 75 ? "Very Lucky 吉" : score >= 60 ? "Lucky 小吉" : score >= 45 ? "Balanced 平" : score >= 30 ? "Caution 小凶" : "Unlucky 凶";
    return { digits: d, score: score, grade: grade, combos: found, counts: counts, runs: runs };
  }
  window.analyzeLucky = analyze;

  var MODE_TIPS = {
    any: "Chinese number luck is driven by sound (homophones). The final digit and repeated 8s, 6s and 9s matter most.",
    phone: "Phone numbers are judged mostly on the last 4 digits. Repeated 8s (e.g. 8888) command real cash premiums in Chinese markets.",
    plate: "Licence plates in Hong Kong and mainland China are auctioned — single digits and repeated 8s/6s fetch the highest prices.",
    address: "Many Chinese buyers avoid street numbers and floors containing 4. Studies of Vancouver home sales found addresses ending in 8 sold at a premium.",
    price: "Prices ending in 8 (or 88, 98, 168) signal prosperity. Avoid 4 in any position — especially gifts and luxury goods.",
    domain: "Numeric domains are a recognized asset class in China because they are easy to type and remember. 8, 6 and 9 add value; 4 subtracts."
  };
  function renderAnalysis(el, r, mode) {
    if (!r) { el.innerHTML = '<p class="muted">Please enter at least one digit.</p>'; el.classList.add("show"); return; }
    var dh = r.digits.split("").slice(0, 24).map(function (x) {
      var w = DIGITS[x].w, cls = w >= 2 ? "great" : w >= 0.5 ? "good" : w < 0 ? "bad" : "";
      return '<div class="digit ' + cls + '" title="' + esc(DIGITS[x].m) + '"><b>' + x + "</b><small>" + DIGITS[x].py.split(" ")[0] + "</small></div>";
    }).join("") + (r.digits.length > 24 ? '<div class="digit"><b>…</b></div>' : "");
    var uniq = Object.keys(r.counts).sort();
    var comboHtml = r.combos.length ? r.combos.map(function (c) {
      return '<li><b class="' + (c.s > 0 ? "" : "") + '">' + c.c + "</b> " + (c.s > 0 ? '<span class="tag">+ lucky</span>' : '<span class="tag red">avoid</span>') + " — " + esc(c.m) + (c.n > 1 ? " ×" + c.n : "") + "</li>";
    }).join("") : '<li class="muted">No famous lucky or unlucky combinations detected.</li>';
    var meaning = uniq.map(function (x) { return "<li><b>" + x + "</b> · " + DIGITS[x].py + " — " + esc(DIGITS[x].m) + (r.counts[x] > 1 ? " <em>(×" + r.counts[x] + ")</em>" : "") + "</li>"; }).join("");
    var advice = [];
    if (r.counts["4"]) advice.push("Contains " + r.counts["4"] + "× the digit 4 — the biggest drag on perceived luck.");
    if (r.counts["8"]) advice.push("Contains " + r.counts["8"] + "× the digit 8 — strongly associated with wealth.");
    var last = r.digits.slice(-1);
    advice.push("Ends in " + last + ": " + DIGITS[last].m);
    if (r.counts["5"]) advice.push("Has 5: reads positively in Mandarin wordplay, but Cantonese speakers may hear 'not'. Consider your audience.");
    el.innerHTML =
      '<div class="grid g2" style="align-items:center">' +
      '<div class="center"><div class="score-ring" style="--p:' + r.score + '"><div><div><b>' + r.score + '</b><small>out of 100</small></div></div></div>' +
      '<h3 class="mt1 mb0">' + r.grade + '</h3><p class="muted">' + stars(r.score / 20) + "</p></div>" +
      '<div><div class="digits">' + dh + '</div><p class="form-note center">Hover or tap a digit for its meaning. Gold = very lucky, green = lucky, red = avoid.</p></div></div>' +
      '<div class="grid g2 mt2"><div class="card"><h3>Combinations found</h3><ul class="list-clean">' + comboHtml + "</ul></div>" +
      '<div class="card"><h3>Key insights</h3><ul class="list-clean">' + advice.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + '</ul><p class="form-note">' + esc(MODE_TIPS[mode] || MODE_TIPS.any) + "</p></div></div>" +
      '<div class="card mt2"><h3>Digit-by-digit meaning</h3><ul class="list-clean">' + meaning + "</ul></div>" +
      '<div class="pill-row mt2" style="justify-content:center">' +
      '<button class="btn btn-ghost btn-sm" type="button" data-share-result>Share my score</button>' +
      '<a class="btn btn-primary btn-sm" href="' + base + "report.html?number=" + encodeURIComponent(r.digits) + '">Get my full Prosperity Report — free</a>' +
      '<a class="btn btn-gold btn-sm" href="' + base + 'business.html#numbers">Buy / sell premium numbers</a></div>';
    el.classList.add("show");
    var sb = el.querySelector("[data-share-result]");
    if (sb) sb.addEventListener("click", function () { U.share && U.share("My number " + r.digits + " scored " + r.score + "/100 (" + r.grade + ") on the 500888 Lucky Number Analyzer!", location.origin + location.pathname + "?n=" + r.digits); });
  }
  $$("[data-tool=analyzer]").forEach(function (form) {
    var out = form.parentNode.querySelector("[data-out]") || $("#analyzer-out");
    var modeSel = form.querySelector("[name=mode]");
    form.addEventListener("submit", function (e) { e.preventDefault(); renderAnalysis(out, analyze(form.elements.number.value), modeSel ? modeSel.value : "any"); out.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
    $$("[data-try]", form.parentNode).forEach(function (b) { b.addEventListener("click", function () { form.elements.number.value = b.getAttribute("data-try"); form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit")); }); });
    var qn = new URLSearchParams(location.search).get("n");
    if (qn && /\d/.test(qn)) { form.elements.number.value = qn; renderAnalysis(out, analyze(qn), modeSel ? modeSel.value : "any"); }
  });

  /* ================= ZODIAC ================= */
  function zodiacYear(date) {
    var y = date.getFullYear(), c = CNY[y];
    if (c) { var cd = new Date(y + "-" + c + "T00:00:00"); if (date < cd) y -= 1; }
    else if (date.getMonth() < 1 || (date.getMonth() === 1 && date.getDate() < 4)) y -= 1;
    return y;
  }
  function animalOf(y) { return ANIMALS[((y - 4) % 12 + 12) % 12]; }
  window.zodiacOf = function (dateStr) { var d = new Date(dateStr + "T12:00:00"); var y = zodiacYear(d); return { year: y, a: animalOf(y), el: ELEMENTS[((y % 10) + 10) % 10], yy: y % 2 === 0 ? "Yang" : "Yin" }; };

  function renderAnimal(a, extra) {
    return '<div class="split" style="gap:20px;align-items:start"><div class="center"><div style="font-size:5rem;line-height:1">' + a.e + '</div><h2 class="mb0">' + (extra && extra.el ? extra.el + " " : "") + a.n + '</h2><p class="muted">' + a.zh + (extra ? " · " + extra.yy + " · lunar year " + extra.year : "") + "</p></div>" +
      '<div><p>' + a.t + '</p><div class="kv"><div><small>Lucky numbers</small><b>' + a.num.join(", ") + '</b></div><div><small>Lucky colours</small><b>' + a.col + '</b></div><div><small>Best matches</small><b>' + a.best + "</b></div></div></div></div>";
  }
  $$("[data-tool=zodiac]").forEach(function (form) {
    var out = $("#zodiac-out");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = form.elements.dob.value; if (!v) return;
      var z = window.zodiacOf(v);
      out.innerHTML = renderAnimal(z.a, z) +
        '<p class="form-note">Born before Lunar New Year? Your sign belongs to the previous lunar year — this tool adjusts automatically (' + esc(v) + " → " + z.year + ' lunar year).</p>' +
        '<div class="pill-row mt1"><a class="btn btn-primary btn-sm" href="' + base + "report.html?dob=" + encodeURIComponent(v) + '">Get my 2027 forecast report</a><button class="btn btn-ghost btn-sm" type="button" data-zshare>Share</button></div>';
      out.classList.add("show");
      out.querySelector("[data-zshare]").addEventListener("click", function () { U.share && U.share("I'm a " + z.el + " " + z.a.n + " " + z.a.e + " in the Chinese zodiac! Find yours:"); });
    });
  });
  var zg = $("#zodiac-grid");
  if (zg) {
    zg.innerHTML = ANIMALS.map(function (a, i) {
      var yrs = []; for (var y = 1948 + i; y <= 2031; y += 12) yrs.push(y);
      return '<button class="zcard" type="button" data-z="' + i + '"><span class="e">' + a.e + "</span><b>" + a.n + "</b><small>" + a.zh + "</small></button>";
    }).join("");
    var zd = $("#zodiac-detail");
    zg.addEventListener("click", function (e) {
      var b = e.target.closest("[data-z]"); if (!b) return;
      $$(".zcard", zg).forEach(function (x) { x.classList.remove("active"); }); b.classList.add("active");
      var i = +b.getAttribute("data-z"), a = ANIMALS[i], yrs = [];
      for (var y = 1924 + i; y <= 2043; y += 12) yrs.push(y);
      zd.innerHTML = renderAnimal(a) + '<p class="mt1"><b>Years:</b> ' + yrs.join(", ") + '</p><p class="form-note">Years start on Lunar New Year, not 1 January.</p>';
      zd.classList.add("show");
    });
  }

  /* ---- compatibility ---- */
  var TRINES = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]];
  var HARMONY = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
  var HARM = [[0, 7], [1, 6], [2, 5], [3, 4], [8, 11], [9, 10]];
  function pairIn(list, a, b) { return list.some(function (p) { return (p[0] === a && p[1] === b) || (p[0] === b && p[1] === a); }); }
  function compat(a, b) {
    if (pairIn(HARMONY, a, b)) return [95, "Six Harmonies (六合) — a 'secret friend' match. Deep natural support."];
    if (TRINES.some(function (t) { return t.indexOf(a) > -1 && t.indexOf(b) > -1 && a !== b; })) return [90, "Trine (三合) — same affinity group. Shared values and easy teamwork."];
    if (a === b) return [74, "Same sign — you understand each other well, but may share the same blind spots."];
    if (Math.abs(a - b) === 6) return [35, "Clash (六冲) — opposite signs. Strong attraction possible, but frequent friction; needs patience."];
    if (pairIn(HARM, a, b)) return [45, "Harm (六害) — subtle misunderstandings. Communicate openly and often."];
    return [64, "Neutral — no traditional bond or conflict. Success depends on effort and shared goals."];
  }
  $$("[data-tool=compat]").forEach(function (form) {
    var opts = ANIMALS.map(function (a, i) { return '<option value="' + i + '">' + a.e + " " + a.n + "</option>"; }).join("");
    form.elements.a.innerHTML = opts; form.elements.b.innerHTML = opts; form.elements.b.value = "4";
    var out = $("#compat-out");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var a = +form.elements.a.value, b = +form.elements.b.value, r = compat(a, b);
      out.innerHTML = '<div class="center"><div style="font-size:3rem">' + ANIMALS[a].e + " ❤ " + ANIMALS[b].e + '</div><div class="score-ring mt1" style="--p:' + r[0] + '"><div><div><b>' + r[0] + '%</b><small>match</small></div></div></div><h3 class="mt1">' + ANIMALS[a].n + " + " + ANIMALS[b].n + '</h3><p>' + r[1] + '</p><p class="stars">' + stars(r[0] / 20) + "</p></div>";
      out.classList.add("show");
    });
  });

  /* ================= KUA NUMBER ================= */
  var KUA = {
    1: { g: "East", el: "Water", good: ["SE — wealth (Sheng Qi)", "E — health (Tian Yi)", "S — love (Yan Nian)", "N — growth (Fu Wei)"], bad: ["W", "NE", "NW", "SW (worst)"] },
    2: { g: "West", el: "Earth", good: ["NE — wealth (Sheng Qi)", "W — health (Tian Yi)", "NW — love (Yan Nian)", "SW — growth (Fu Wei)"], bad: ["E", "SE", "S", "N (worst)"] },
    3: { g: "East", el: "Wood", good: ["S — wealth (Sheng Qi)", "N — health (Tian Yi)", "SE — love (Yan Nian)", "E — growth (Fu Wei)"], bad: ["SW", "NW", "NE", "W (worst)"] },
    4: { g: "East", el: "Wood", good: ["N — wealth (Sheng Qi)", "S — health (Tian Yi)", "E — love (Yan Nian)", "SE — growth (Fu Wei)"], bad: ["NW", "SW", "W", "NE (worst)"] },
    6: { g: "West", el: "Metal", good: ["W — wealth (Sheng Qi)", "NE — health (Tian Yi)", "SW — love (Yan Nian)", "NW — growth (Fu Wei)"], bad: ["SE", "E", "N", "S (worst)"] },
    7: { g: "West", el: "Metal", good: ["NW — wealth (Sheng Qi)", "SW — health (Tian Yi)", "NE — love (Yan Nian)", "W — growth (Fu Wei)"], bad: ["N", "S", "SE", "E (worst)"] },
    8: { g: "West", el: "Earth", good: ["SW — wealth (Sheng Qi)", "NW — health (Tian Yi)", "W — love (Yan Nian)", "NE — growth (Fu Wei)"], bad: ["S", "N", "E", "SE (worst)"] },
    9: { g: "East", el: "Fire", good: ["E — wealth (Sheng Qi)", "SE — health (Tian Yi)", "N — love (Yan Nian)", "S — growth (Fu Wei)"], bad: ["NE", "W", "SW", "NW (worst)"] }
  };
  function reduce(n) { while (n > 9) n = String(n).split("").reduce(function (s, x) { return s + +x; }, 0); return n; }
  function kua(dob, gender) {
    var d = new Date(dob + "T12:00:00"), y = d.getFullYear();
    if (d.getMonth() === 0 || (d.getMonth() === 1 && d.getDate() < 4)) y -= 1; // solar year begins at Li Chun (~4 Feb)
    var s = reduce(y % 100), k;
    if (gender === "m") { k = y < 2000 ? 10 - s : 9 - s; if (k === 0) k = 9; k = reduce(k); if (k === 5) k = 2; }
    else { k = y < 2000 ? s + 5 : s + 6; k = reduce(k); if (k === 5) k = 8; }
    return { k: k, y: y };
  }
  $$("[data-tool=kua]").forEach(function (form) {
    var out = $("#kua-out");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var r = kua(form.elements.dob.value, form.elements.gender.value), K = KUA[r.k];
      out.innerHTML = '<div class="split" style="gap:20px;align-items:start"><div class="center"><div class="big-num">' + r.k + '</div><h3>Kua Number ' + r.k + '</h3><p class="muted">' + K.g + " Group · " + K.el + ' element · solar year ' + r.y + '</p></div><div><h3>Your 4 lucky directions</h3><ul class="list-clean">' + K.good.map(function (g) { return "<li>✅ " + g + "</li>"; }).join("") + '</ul><h3 class="mt1">Directions to avoid</h3><p>' + K.bad.join(" · ") + '</p></div></div><p class="form-note">Tip: face your wealth direction (Sheng Qi) while working or negotiating; sleep with your head toward your health direction.</p><div class="pill-row"><a class="btn btn-primary btn-sm" href="' + base + "report.html?kua=" + r.k + '">Get a personalised home/office layout report</a></div>';
      out.classList.add("show");
    });
  });

  /* ================= HONGBAO ================= */
  var CUR = { USD: [1, "$"], CAD: [1.38, "C$"], AUD: [1.52, "A$"], SGD: [1.3, "S$"], GBP: [0.76, "£"], EUR: [0.86, "€"], HKD: [7.8, "HK$"], CNY: [7.15, "¥"], MYR: [4.3, "RM"], INR: [86, "₹"] };
  var REL = { kids: 20, own: 60, niece: 30, parents: 200, grand: 150, staff: 100, colleague: 20, service: 10, friend: 50, close: 100, family: 168 };
  var OCC = { cny: 1, wedding: 2.2, birthday: 0.9, baby: 1, grad: 1, opening: 1.5, funeral: 0.8 };
  function luckyLadder(odd) {
    var out = [];
    for (var n = 1; n <= 200000; n++) {
      var s = String(n);
      if (s.indexOf("4") > -1) continue;
      if (odd) { if (n % 2 === 1 && /1$/.test(s)) out.push(n); continue; }
      if (n % 2 === 1 && n > 9 && !/9$/.test(s)) continue;
      if (/8|6|9/.test(s) || /^[12]0*$/.test(s) || /^5(20|0+)$/.test(s) || s === "1314") out.push(n);
    }
    return out;
  }
  var LAD, LAD_ODD;
  function snap(x, odd) {
    if (!LAD) { LAD = luckyLadder(false); LAD_ODD = luckyLadder(true); }
    var L = odd ? LAD_ODD : LAD, best = L[0];
    for (var i = 0; i < L.length; i++) { if (Math.abs(L[i] - x) < Math.abs(best - x)) best = L[i]; if (L[i] > x * 2) break; }
    return best;
  }
  $$("[data-tool=hongbao]").forEach(function (form) {
    var out = $("#hongbao-out");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements, c = CUR[f.currency.value], occ = f.occasion.value, close = +f.closeness.value;
      var usd = REL[f.relation.value] * OCC[occ] * close, x = usd * c[0], odd = occ === "funeral";
      var lo = snap(x * 0.7, odd), mid = snap(x, odd), hi = snap(x * 1.6, odd);
      var tips = {
        cny: "Use crisp new bills, give and receive with both hands, and never include 4 in the amount.",
        wedding: "Wedding hongbao should at least cover the cost of your seat at the banquet; even amounts symbolise the couple.",
        birthday: "For elders' milestone birthdays, amounts with 9 (久, longevity) are especially welcome.",
        baby: "Full-month (满月) gifts: 6, 8 or 9-based amounts wish the baby smooth, prosperous, long life.",
        grad: "Graduation gifts with 6 (smooth path) or 8 (prosperity) are a great fit.",
        opening: "Business openings: 8, 88, 168 or 888-based amounts wish 'prosperity all the way'.",
        funeral: "Funeral gifts (白金, in a WHITE envelope) use ODD amounts — e.g. ending in 1 — never a red envelope."
      };
      out.innerHTML = '<div class="grid g3 center"><div class="card"><small class="muted">Modest</small><div class="big-num" style="font-size:2.4rem">' + c[1] + lo.toLocaleString() + '</div></div><div class="card" style="border:2px solid var(--gold)"><small class="muted">Recommended</small><div class="big-num" style="font-size:3rem">' + c[1] + mid.toLocaleString() + '</div></div><div class="card"><small class="muted">Generous</small><div class="big-num" style="font-size:2.4rem">' + c[1] + hi.toLocaleString() + '</div></div></div><p class="mt1">💡 ' + tips[occ] + '</p><p class="form-note">Amounts are snapped to culturally lucky values (no 4s; 6/8/9-rich). Customs vary by family and region — treat this as guidance.</p>';
      out.classList.add("show");
    });
  });

  /* ================= LUCKY PRICE ================= */
  $$("[data-tool=price]").forEach(function (form) {
    var out = $("#price-out");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var p = parseFloat(form.elements.price.value); if (!(p > 0)) return;
      var lo = Math.max(1, Math.floor(p * 0.85)), hi = Math.ceil(p * 1.12), cands = [];
      for (var n = lo; n <= hi && cands.length < 6000; n++) { var s = String(n); if (s.indexOf("4") > -1) continue; cands.push({ n: n, s: analyze(s).score - Math.abs(n - p) / p * 40 }); }
      cands.sort(function (a, b) { return b.s - a.s; });
      var top = cands.slice(0, 6);
      out.innerHTML = '<p>Original price <b>' + p.toLocaleString() + "</b> scores <b>" + analyze(String(Math.round(p))).score + '/100</b>. Better-performing lucky price points nearby:</p><div class="grid g3">' +
        top.map(function (c) { var a = analyze(String(c.n)); var diff = ((c.n - p) / p * 100).toFixed(1); return '<div class="card center"><div class="big-num" style="font-size:2.2rem">' + c.n.toLocaleString() + '</div><p class="mb0"><b>' + a.score + "/100</b> · " + (diff > 0 ? "+" : "") + diff + '%</p><small class="muted">' + (a.combos[0] ? esc(a.combos[0].m) : a.grade) + "</small></div>"; }).join("") +
        '</div><p class="form-note mt1">Tip: for cents, .88 or .68 endings add a prosperity signal (e.g. 19.88). Want a full pricing strategy for Chinese-speaking customers? <a href="' + base + 'business.html">Talk to us</a>.</p>';
      out.classList.add("show");
    });
  });

  /* ================= LUCKY DATES ================= */
  $$("[data-tool=dates]").forEach(function (form) {
    var out = $("#dates-out");
    var now = new Date(); form.elements.month.value = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var parts = form.elements.month.value.split("-"), y = +parts[0], m = +parts[1], purpose = form.elements.purpose.value;
      var days = new Date(y, m, 0).getDate(), list = [];
      var fest = {}; FESTIVALS.forEach(function (f) { fest[f[0]] = f[1]; });
      for (var d = 1; d <= days; d++) {
        var ds = y + "-" + String(m).padStart(2, "0") + "-" + String(d).padStart(2, "0");
        var sc = analyze(String(m) + String(d).padStart(2, "0")).score * 0.6 + analyze(String(d)).score * 0.4;
        var dow = new Date(y, m - 1, d).getDay();
        if (purpose === "wedding" || purpose === "party") { if (dow === 6 || dow === 0) sc += 6; }
        if (purpose === "business" || purpose === "contract") { if (dow > 0 && dow < 6) sc += 5; }
        if (m === 8 && purpose !== "wedding") sc += 0; // August = 8th month
        if (fest[ds] && /Ghost|Qingming/.test(fest[ds])) sc -= 25;
        if (fest[ds] && !/Ghost|Qingming/.test(fest[ds])) sc += 6;
        list.push({ ds: ds, d: d, sc: Math.round(sc), dow: dow, f: fest[ds] || "" });
      }
      var top = list.slice().sort(function (a, b) { return b.sc - a.sc; }).slice(0, 8);
      var dn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var first = new Date(y, m - 1, 1).getDay(), cells = "";
      for (var i = 0; i < first; i++) cells += "<div></div>";
      list.forEach(function (x) {
        var cls = x.sc >= 75 ? "great" : x.sc >= 60 ? "good" : x.sc < 40 ? "bad" : "";
        cells += '<div class="digit ' + cls + '" style="width:auto" title="' + x.ds + " score " + x.sc + (x.f ? " · " + esc(x.f) : "") + '"><b style="font-size:1.05rem">' + x.d + "</b><small>" + x.sc + (x.f ? " 🏮" : "") + "</small></div>";
      });
      out.innerHTML = '<div class="grid g2"><div><h3>Top dates</h3><ol>' + top.map(function (t) { return "<li><b>" + t.ds + "</b> (" + dn[t.dow] + ") — score " + t.sc + (t.f ? " · " + esc(t.f) : "") + "</li>"; }).join("") + '</ol></div><div><h3>Month view</h3><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;font-size:.8rem">' + dn.map(function (x) { return '<div class="center muted">' + x + "</div>"; }).join("") + cells + '</div></div></div><p class="form-note">Number-based scoring (avoids 4s, favours 6/8/9), adjusted for weekday and festivals. For a traditional almanac (Tong Shu) date selection tailored to your birth chart, <a href="' + base + 'report.html?service=date-selection">request a personal date selection</a>.</p>';
      out.classList.add("show");
    });
  });

  /* ================= FORTUNE STICKS + DAILY NUMBER ================= */
  var FORTUNES = [
    ["上上签 Supreme", "A door you have knocked on twice opens on the third try. Knock again."],
    ["上签 Excellent", "Money follows attention. Look closely at what you already own."],
    ["上签 Excellent", "A partnership formed this season grows like bamboo — slow roots, then sudden height."],
    ["中上签 Very good", "Small, steady steps beat one great leap. Finish what you started."],
    ["中签 Good", "Patience is a currency. Spend it wisely and it compounds."],
    ["上签 Excellent", "Your reputation is your best salesperson. Keep a promise today."],
    ["中签 Good", "Clear one clutter spot today; new opportunities need empty space."],
    ["上上签 Supreme", "The wind is behind you. Launch what you have been polishing."],
    ["中签 Good", "Ask a question you've been avoiding — the answer is kinder than you fear."],
    ["中上签 Very good", "A mentor appears where you least expect. Say yes to coffee."],
    ["中签 Good", "Save one part, share one part, grow one part."],
    ["上签 Excellent", "Your idea is worth more than you are charging. Re-price it."],
    ["中下签 Fair", "Delay big signatures by a few days; read the fine print twice."],
    ["中签 Good", "The quiet path is the fast path this week. Avoid unnecessary arguments."],
    ["上签 Excellent", "Travel or a new connection brings unexpected gain."],
    ["中上签 Very good", "What you plant on a lucky day, water on an ordinary one."],
    ["中签 Good", "Health is the first wealth. Sleep early; decide in the morning."],
    ["上签 Excellent", "A gift given freely returns eightfold."],
    ["中签 Good", "Change direction slightly, not completely. The goal is right; the route needs a tweak."],
    ["上上签 Supreme", "Prosperity flows to those who prepare. Your preparation is nearly complete."]
  ];
  $$("[data-tool=fortune]").forEach(function (btn) {
    var box = $("#fortune-out");
    btn.addEventListener("click", function () {
      box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
      setTimeout(function () {
        var i = Math.floor(Math.random() * FORTUNES.length), n = 1 + Math.floor(Math.random() * 100);
        box.innerHTML = "<div><small class='muted'>Stick No. " + n + "</small><h3 class='mt0'>" + FORTUNES[i][0] + "</h3><p class='mb0'>" + FORTUNES[i][1] + "</p></div>";
      }, 550);
    });
  });
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return Math.abs(h); }
  var daily = $("[data-daily]");
  if (daily) {
    var today = new Date().toISOString().slice(0, 10), pool = [8, 6, 9, 18, 28, 68, 88, 98, 168, 518, 888, 2, 3, 26, 36, 39, 66, 99, 189, 698];
    var draw = function (animal) {
      var h = hash(today + (animal || "")), n = pool[h % pool.length];
      daily.innerHTML = '<div class="big-num">' + n + '</div><p class="mb0">' + (analyze(String(n)).combos[0] ? esc(analyze(String(n)).combos[0].m) : esc(DIGITS[String(n).slice(-1)].m)) + "</p><small class='muted'>" + today + (animal ? " · " + animal : "") + "</small>";
    };
    var sel = $("[data-daily-animal]");
    if (sel) { sel.innerHTML = '<option value="">All signs</option>' + ANIMALS.map(function (a) { return '<option value="' + a.n + '">' + a.e + " " + a.n + "</option>"; }).join(""); sel.addEventListener("change", function () { draw(sel.value); }); }
    draw("");
  }

  /* ================= NUMBER DICTIONARY ================= */
  var NUMBERS = [
    ["0", "líng", "Zero / beginning", "Wholeness and a fresh start; often used as a 'filler' that magnifies the digits around it.", "mixed"],
    ["1", "yī", "One", "Unity, being first, leadership. In pairs (11) can suggest 'single'.", "good"],
    ["2", "èr", "Two", "Good things come in pairs — weddings and gifts favour even numbers.", "good"],
    ["3", "sān", "Three", "Sounds like 生 'life/birth'; also 'three stars' of fortune, prosperity, longevity.", "good"],
    ["4", "sì", "Four", "Sounds like 死 'death'. Floors, plates and prices avoid it.", "bad"],
    ["5", "wǔ", "Five", "Five elements & five blessings. Mandarin wordplay = 'I'; Cantonese can hear 'not'.", "mixed"],
    ["6", "liù", "Six", "Sounds like 流 'flow' — everything goes smoothly (六六大顺).", "good"],
    ["7", "qī", "Seven", "Sounds like 起 'rise' and 气 'vitality'; the 7th lunar month is Ghost Month.", "mixed"],
    ["8", "bā", "Eight", "Sounds like 发 'prosper'. The world's best-known lucky number in Chinese culture.", "good"],
    ["9", "jiǔ", "Nine", "Sounds like 久 'long-lasting'; associated with the emperor and eternity.", "good"],
    ["13", "yī sān", "Thirteen", "Not traditionally unlucky in China — but often avoided in Western-facing hotels and buildings.", "mixed"],
    ["14", "yī sì", "Fourteen", "要死 'want to die' — one of the most avoided combinations.", "bad"],
    ["16", "yī liù", "Sixteen", "一路 'all the way' — smooth journey.", "good"],
    ["18", "yī bā", "Eighteen", "要发 'going to prosper' — a hugely popular number for gifts and prices.", "good"],
    ["24", "èr sì", "Twenty-four", "In Cantonese 易死 'easy death' — avoided in Hong Kong & Guangdong.", "bad"],
    ["28", "èr bā", "Twenty-eight", "In Cantonese 易发 'easy prosperity'. HK licence plate '28' sold for HK$18.1M in 2016.", "good"],
    ["38", "sān bā", "Thirty-eight", "三八 is slang for a nosy or rude woman; also International Women's Day (3/8). Context matters.", "mixed"],
    ["58", "wǔ bā", "Fifty-eight", "我发 'I prosper' in Mandarin; Cantonese ear may hear 'no prosperity'.", "mixed"],
    ["66", "liù liù", "Sixty-six", "Double smoothness — everything flows.", "good"],
    ["68", "liù bā", "Sixty-eight", "路发 'prosperity along the road' — popular in shop prices.", "good"],
    ["74", "qī sì", "Seventy-four", "气死 'furious to death'. Avoid.", "bad"],
    ["88", "bā bā", "Eighty-eight", "Double prosperity; also 'bye-bye' in Chinese internet slang.", "good"],
    ["99", "jiǔ jiǔ", "Ninety-nine", "久久 'forever' — a favourite for weddings and anniversaries.", "good"],
    ["168", "yī liù bā", "One-six-eight", "一路发 'prosperity all the way' — a top choice for business numbers.", "good"],
    ["250", "èr bǎi wǔ", "Two hundred fifty", "二百五 means 'idiot' — never price a gift at 250!", "bad"],
    ["500", "wǔ bǎi", "Five hundred", "Echoes 五百罗汉 (the 500 Arhats) and 世界500强 (Fortune Global 500) — scale and achievement.", "good"],
    ["514", "wǔ yī sì", "Five-one-four", "我要死 'I'm going to die'. Avoid.", "bad"],
    ["518", "wǔ yī bā", "Five-one-eight", "我要发 'I will prosper' — a favourite for phone numbers and openings.", "good"],
    ["520", "wǔ èr líng", "Five-two-zero", "我爱你 'I love you' — 20 May (5/20) is an online Valentine's Day.", "good"],
    ["666", "liù liù liù", "Six-six-six", "Super smooth; in gaming slang means 'awesome' — the opposite of its Western meaning.", "good"],
    ["748", "qī sì bā", "Seven-four-eight", "去死吧 'go die'. A harsh insult — avoid.", "bad"],
    ["888", "bā bā bā", "Eight-eight-eight", "Triple prosperity (发发发) — wealth, wealth, wealth.", "good"],
    ["999", "jiǔ jiǔ jiǔ", "Nine-nine-nine", "Eternal, everlasting — common in wedding & jewellery pricing.", "good"],
    ["1314", "yī sān yī sì", "One-three-one-four", "一生一世 'one life, one world' = forever. Pairs with 520 as 5201314.", "good"],
    ["5201314", "wǔ èr líng yī sān yī sì", "Love forever", "我爱你一生一世 'I love you for a lifetime'.", "good"],
    ["8888", "bā bā bā bā", "Quadruple 8", "Ultimate prosperity — the Chengdu phone number 8888-8888 sold for ¥2.33M in 2003.", "good"],
    ["500888", "wǔ líng líng bā bā bā", "Five-zero-zero-eight-eight-eight", "Folk reading: scale (500) + triple prosperity (888). Two zeros amplify the trailing 888.", "good"]
  ];
  var dict = $("#num-dict");
  if (dict) {
    var draw2 = function (q, f) {
      q = (q || "").trim().toLowerCase();
      var list = NUMBERS.filter(function (n) { return (!f || f === "all" || n[4] === f) && (!q || (n.join(" ").toLowerCase().indexOf(q) > -1)); });
      dict.innerHTML = list.length ? list.map(function (n) {
        return '<div class="card num-card" id="n' + n[0] + '"><div class="num-badge ' + (n[4] === "bad" ? "bad" : n[4] === "mixed" ? "mixed" : "") + '">' + n[0] + '</div><div><h3>' + esc(n[2]) + ' <span class="tag ' + (n[4] === "bad" ? "red" : n[4] === "mixed" ? "" : "gold") + '">' + (n[4] === "bad" ? "avoid" : n[4] === "mixed" ? "mixed" : "lucky") + '</span></h3><div class="py">' + n[1] + "</div><p>" + esc(n[3]) + '</p><a class="btn btn-ghost btn-sm mt1" href="' + base + "lucky-number-analyzer.html?n=" + n[0] + '">Analyze ' + n[0] + " →</a></div></div>";
      }).join("") : '<p class="muted">No match — try the <a href="' + base + 'lucky-number-analyzer.html">analyzer</a> for any number.</p>';
    };
    var qi = $("#num-q"), fi = $("#num-f");
    draw2();
    if (qi) qi.addEventListener("input", function () { draw2(qi.value, fi && fi.value); });
    if (fi) fi.addEventListener("change", function () { draw2(qi && qi.value, fi.value); });
  }

  /* ================= GREETINGS (speech) ================= */
  $$("[data-say]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (!("speechSynthesis" in window)) { U.toast && U.toast("Audio isn't supported in this browser."); return; }
      var u = new SpeechSynthesisUtterance(b.getAttribute("data-say")); u.lang = b.getAttribute("data-lang") || "zh-CN"; u.rate = 0.8;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    });
  });

  /* ================= FESTIVAL LIST ================= */
  var fl = $("#festival-list");
  if (fl) {
    var nowD = new Date(); nowD.setHours(0, 0, 0, 0);
    var upcoming = FESTIVALS.filter(function (f) { return new Date(f[0] + "T00:00:00") >= nowD; });
    fl.innerHTML = upcoming.map(function (f, i) {
      var days = Math.round((new Date(f[0] + "T00:00:00") - nowD) / 864e5);
      return '<div class="card"><span class="tag ' + (i === 0 ? "red" : "gold") + '">' + (days === 0 ? "Today" : "in " + days + " days") + "</span><h3 class='mt1'>" + esc(f[1]) + "</h3><p>" + new Date(f[0] + "T12:00:00").toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" }) + "</p></div>";
    }).join("");
  }
  var nf = $("[data-next-festival]");
  if (nf) {
    var n0 = new Date(); n0.setHours(0, 0, 0, 0);
    var nx = FESTIVALS.filter(function (f) { return new Date(f[0] + "T00:00:00") >= n0; })[0];
    if (nx) nf.textContent = nx[1] + " — " + new Date(nx[0] + "T12:00:00").toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  }
})();
