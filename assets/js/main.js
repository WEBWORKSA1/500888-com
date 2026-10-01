/* 500888.com — core site behaviour (nav, theme, forms, ads, video, countdowns, consent) */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    sget: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  window.$500 = { $: $, $$: $$, store: store };

  /* ---------- hidden inbox (never rendered as text) ---------- */
  function inbox() { try { return atob(S._m).split("").reverse().join(""); } catch (e) { return ""; } }
  function endpoint() { return (S.formEndpoint || "https://formsubmit.co/ajax/") + (S.formAlias || inbox()); }
  $$("[data-mail]").forEach(function (a) {
    a.setAttribute("href", "#contact");
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var subj = a.getAttribute("data-mail") || "Inquiry from 500888.com";
      window.location.href = "mai" + "lto:" + inbox() + "?subject=" + encodeURIComponent(subj);
    });
  });

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var saved = store.get("theme");
  if (saved) root.setAttribute("data-theme", saved);
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next); store.set("theme", next);
    });
  });

  /* ---------- mobile nav ---------- */
  var menu = $(".menu"), scrim = $(".scrim");
  function closeMenu() { if (menu) menu.classList.remove("open"); if (scrim) scrim.classList.remove("show"); }
  $$("[data-menu-open]").forEach(function (b) { b.addEventListener("click", function () { menu.classList.add("open"); scrim.classList.add("show"); }); });
  $$("[data-menu-close]").forEach(function (b) { b.addEventListener("click", closeMenu); });
  if (scrim) scrim.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- active nav ---------- */
  var here = location.pathname.split("/").pop() || "index.html";
  $$(".menu a").forEach(function (a) { if ((a.getAttribute("href") || "").split("/").pop() === here) a.setAttribute("aria-current", "page"); });

  /* ---------- toast ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }
  window.$500.toast = toast;

  /* ---------- share ---------- */
  function share(text, url) {
    url = url || location.href;
    if (navigator.share) { navigator.share({ title: document.title, text: text, url: url }).catch(function () {}); return; }
    var full = (text ? text + " " : "") + url;
    if (navigator.clipboard) navigator.clipboard.writeText(full).then(function () { toast("Link copied — share your luck!"); });
    else prompt("Copy this link:", full);
  }
  window.$500.share = share;
  $$("[data-share]").forEach(function (b) { b.addEventListener("click", function () { share(b.getAttribute("data-share")); }); });

  /* ---------- attribution capture (ref / utm) ---------- */
  var qs = new URLSearchParams(location.search);
  ["ref", "utm_source", "utm_medium", "utm_campaign"].forEach(function (k) { if (qs.get(k)) store.sset("attr_" + k, qs.get(k)); });

  /* ---------- prefill forms from query string ---------- */
  $$("form[data-form]").forEach(function (f) {
    qs.forEach(function (v, k) { var el = f.elements[k]; if (el && !el.value && el.type !== "hidden") el.value = v; });
  });

  /* ---------- forms → FormSubmit (AJAX) ---------- */
  $$("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var st = $(".form-status", form);
      if (!st) { st = document.createElement("div"); st.className = "form-status"; st.setAttribute("aria-live", "polite"); form.appendChild(st); }
      var hp = form.querySelector("[name=_honey]");
      if (hp && hp.value) return; // bot
      var data = {};
      new FormData(form).forEach(function (v, k) { if (k === "_honey") return; data[k] = data[k] ? data[k] + ", " + v : v; });
      data._subject = "[500888.com] " + (form.getAttribute("data-form") || "Form") + (data.name ? " — " + data.name : "");
      data._template = "table";
      data._captcha = "false";
      data.form_type = form.getAttribute("data-form");
      data.page = location.href;
      ["ref", "utm_source", "utm_medium", "utm_campaign"].forEach(function (k) { var v = store.sget("attr_" + k); if (v) data["attr_" + k] = v; });
      if (data.email) data._replyto = data.email;
      var btn = form.querySelector("[type=submit]"); var label = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.innerHTML = "Sending…"; }
      fetch(endpoint(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok || String(res.j.success) === "false") throw new Error(res.j.message || "failed");
          st.className = "form-status ok";
          st.textContent = form.getAttribute("data-success") || "Thank you! Your message has been received — we'll be in touch shortly.";
          form.reset();
          if (window.gtag) window.gtag("event", "generate_lead", { form: data.form_type });
          var redirect = form.getAttribute("data-redirect");
          if (redirect) setTimeout(function () { location.href = redirect; }, 900);
        })
        .catch(function () {
          st.className = "form-status err";
          st.innerHTML = "We couldn't send that automatically. <a href=\"#\" data-fallback>Click here to send it by email instead</a>.";
          var fb = st.querySelector("[data-fallback]");
          fb.addEventListener("click", function (ev) {
            ev.preventDefault();
            var body = Object.keys(data).filter(function (k) { return k[0] !== "_"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
            location.href = "mai" + "lto:" + inbox() + "?subject=" + encodeURIComponent(data._subject) + "&body=" + encodeURIComponent(body);
          });
        })
        .then(function () { if (btn) { btn.disabled = false; btn.innerHTML = label; } });
    });
  });

  /* ---------- multi-step forms ---------- */
  $$("[data-steps]").forEach(function (form) {
    var steps = $$(".step", form), bars = $$(".steps span", form), i = 0;
    function show(n) {
      steps.forEach(function (s, k) { s.classList.toggle("on", k === n); });
      bars.forEach(function (b, k) { b.classList.toggle("on", k <= n); });
      i = n;
    }
    $$("[data-next]", form).forEach(function (b) {
      b.addEventListener("click", function () {
        var ok = $$("input,select,textarea", steps[i]).every(function (el) { return el.checkValidity() || (el.reportValidity(), false); });
        if (ok) show(Math.min(i + 1, steps.length - 1));
      });
    });
    $$("[data-prev]", form).forEach(function (b) { b.addEventListener("click", function () { show(Math.max(i - 1, 0)); }); });
    show(0);
  });

  /* ---------- countdowns ---------- */
  function tick() {
    $$("[data-countdown]").forEach(function (el) {
      var t = new Date(el.getAttribute("data-countdown")).getTime() - Date.now();
      if (t < 0) t = 0;
      var d = Math.floor(t / 864e5), h = Math.floor(t % 864e5 / 36e5), m = Math.floor(t % 36e5 / 6e4), s = Math.floor(t % 6e4 / 1e3);
      el.innerHTML = "<div><b>" + d + "</b><small>days</small></div><div><b>" + h + "</b><small>hrs</small></div><div><b>" + m + "</b><small>min</small></div><div><b>" + s + "</b><small>sec</small></div>";
    });
  }
  if ($("[data-countdown]")) { tick(); setInterval(tick, 1000); }

  /* ---------- YouTube (privacy-friendly facades) ---------- */
  function ytCard(v) {
    return '<div class="vcard"><div class="yt" data-yt="' + v.id + '" role="button" tabindex="0" aria-label="Play video: ' + v.title.replace(/"/g, "") + '">' +
      '<img loading="lazy" src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="">' +
      '<div class="play"><span>▶</span></div></div><h3>' + v.title + '</h3><small>' + v.by + '</small></div>';
  }
  $$("[data-videos]").forEach(function (box) {
    var cat = box.getAttribute("data-videos"), lim = +box.getAttribute("data-limit") || 99;
    var list = (S.videos || []).filter(function (v) { return cat === "all" || v.cat === cat; }).slice(0, lim);
    box.innerHTML = list.map(ytCard).join("");
  });
  document.addEventListener("click", function (e) {
    var y = e.target.closest && e.target.closest("[data-yt]");
    if (!y || y.querySelector("iframe")) return;
    y.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + y.getAttribute("data-yt") + '?autoplay=1&rel=0" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  });
  document.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-yt]")) { e.preventDefault(); e.target.click(); } });

  /* ---------- consent + ads + analytics ---------- */
  var consent = store.get("consent"); // "all" | "essential" | null
  var cookie = $(".cookie");
  if (cookie && !consent) cookie.classList.add("show");
  $$("[data-consent]").forEach(function (b) {
    b.addEventListener("click", function () { consent = b.getAttribute("data-consent"); store.set("consent", consent); cookie.classList.remove("show"); loadThirdParty(); });
  });

  var base = document.body.getAttribute("data-root") || "";
  function houseAd(slot) {
    return '<a class="ad-house" href="' + base + 'support.html#advertise"><span>📣</span><span><b>Advertise to a prosperity-minded audience.</b> Sponsor this space — tools, guides &amp; festival pages.</span><span class="btn btn-sm btn-gold">Get rates</span></a>';
  }
  function renderAds() {
    $$(".ad-slot").forEach(function (el) {
      if (el.dataset.done) return; el.dataset.done = 1;
      var slot = el.getAttribute("data-slot") || "leaderboard";
      if (S.adsenseClient) {
        el.innerHTML = '<div class="ad-label">Advertisement</div><ins class="adsbygoogle" style="display:block" data-ad-client="' + S.adsenseClient + '"' +
          (S.adSlots && S.adSlots[slot] ? ' data-ad-slot="' + S.adSlots[slot] + '"' : "") +
          (slot === "inArticle" ? ' data-ad-layout="in-article" data-ad-format="fluid"' : ' data-ad-format="auto" data-full-width-responsive="true"') + "></ins>";
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      } else {
        el.innerHTML = '<div class="ad-label">Sponsored</div>' + houseAd(slot);
      }
    });
  }
  function loadThirdParty() {
    if (S.adsenseClient && !window.__ads) {
      window.__ads = 1;
      window.adsbygoogle = window.adsbygoogle || [];
      if (consent !== "all") window.adsbygoogle.requestNonPersonalizedAds = 1;
      var s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient;
      document.head.appendChild(s);
    }
    if (S.ga4 && consent === "all" && !window.__ga) {
      window.__ga = 1;
      var g = document.createElement("script"); g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + S.ga4; document.head.appendChild(g);
      window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date()); window.gtag("config", S.ga4, { anonymize_ip: true });
    }
    renderAds();
  }
  loadThirdParty();

  /* ---------- donation links ---------- */
  var D = S.donate || {};
  $$("[data-donate-link]").forEach(function (a) {
    var k = a.getAttribute("data-donate-link");
    if (D[k]) { a.href = D[k]; a.target = "_blank"; a.rel = "noopener"; a.hidden = false; } else a.hidden = true;
  });
  $$("[data-goal]").forEach(function (el) {
    var pct = Math.min(100, Math.round((D.raised || 0) / (D.goal || 1) * 100));
    el.querySelector(".progress span").style.width = Math.max(pct, 2) + "%";
    el.querySelector("[data-goal-text]").textContent = "$" + (D.raised || 0).toLocaleString() + " raised of $" + (D.goal || 0).toLocaleString() + " goal (" + pct + "%)";
  });
  var wall = $("[data-wall]");
  if (wall) {
    var sup = S.supporters || [];
    wall.innerHTML = sup.length ? sup.map(function (s) { return '<div class="envelope">🧧 <b>' + s.name + "</b>" + (s.amount ? " · $" + s.amount : "") + (s.note ? "<br><small>" + s.note + "</small>" : "") + "</div>"; }).join("")
      : '<div class="envelope">🧧 <b>Your name here</b><br><small>Be the first supporter on the wall</small></div>';
  }

  /* ---------- social links ---------- */
  $$("[data-social]").forEach(function (a) { var u = (S.social || {})[a.getAttribute("data-social")]; if (u) { a.href = u; a.hidden = false; } else a.hidden = true; });
  $$("[data-yt-channel]").forEach(function (a) { if (S.youtubeChannel) { a.href = S.youtubeChannel; a.hidden = false; } else a.hidden = true; });

  /* ---------- newsletter + exit intent (tool pages only, once) ---------- */
  var exitBox = $("#exit-offer");
  if (exitBox && !store.get("exit_seen") && window.matchMedia("(min-width: 900px)").matches) {
    document.addEventListener("mouseout", function h(e) {
      if (!e.relatedTarget && e.clientY < 10) { exitBox.showModal && exitBox.showModal(); store.set("exit_seen", 1); document.removeEventListener("mouseout", h); }
    });
  }
  $$("[data-close-dialog]").forEach(function (b) { b.addEventListener("click", function () { b.closest("dialog").close(); }); });

  /* ---------- reveal on scroll + back to top ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: .12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  var top = $(".to-top");
  if (top) {
    window.addEventListener("scroll", function () { top.classList.toggle("show", window.scrollY > 700); }, { passive: true });
    top.addEventListener("click", function () { window.scrollTo({ top: 0 }); });
  }
  var y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear();
})();
