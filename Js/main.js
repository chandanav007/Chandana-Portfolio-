/* Chandana V — Portfolio interactions */
(function () {
  "use strict";

  var CONTACT_EMAIL = "chandanav007@gmail.com";
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;

  /* Project data. Add a repository URL to `github` when a project repo is published. */
  var PROJECTS = {
    music: {
      title: "Music Store Analysis",
      tech: "SQL",
      desc: "Analysed music store data, answered business questions using SQL and developed a schema based on the dataset.",
      points: [
        "Analysed music store data using SQL.",
        "Answered business questions through structured queries.",
        "Developed a schema based on the dataset."
      ],
      github: ""
    },
    zomato: {
      title: "Zomato Dataset Analysis",
      tech: "SQL",
      desc: "Performed data cleaning and data exploration, solved analytical problems from basic to advanced levels and developed a dataset schema.",
      points: [
        "Performed data cleaning on the Zomato dataset.",
        "Carried out data exploration.",
        "Solved analytical problems from basic to advanced levels.",
        "Developed a dataset schema."
      ],
      github: ""
    },
    road: {
      title: "Road Accident Data Analysis",
      tech: "Microsoft Excel",
      desc: "Created a 2021–2022 dashboard covering primary and secondary KPIs, year-over-year monthly trends, casualties by road type, road surface, location and day/night.",
      points: [
        "Built a 2021–2022 dashboard with primary and secondary KPIs.",
        "Tracked year-over-year monthly trends.",
        "Analysed casualties by road type and road surface.",
        "Analysed casualties by location and day/night.",
        "Worked with 3.07 million rows across 21 files."
      ],
      github: ""
    },
    election: {
      title: "Karnataka Election Data Analysis",
      tech: "Power BI",
      desc: "Created election-results visualizations and interactive dashboards, explored live data feeds and analysed election trends and outcomes.",
      points: [
        "Created election-results visualizations.",
        "Built interactive dashboards in Power BI.",
        "Explored live data feeds.",
        "Analysed election trends and outcomes."
      ],
      github: ""
    }
  };
  var PROFILE_URL = "https://github.com/chandanav007";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Year ---------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Profile image fallback ---------- */
  var img = $("#profileImg");
  var frame = $("#portraitFrame");
  if (img && frame) {
    var fail = function () { frame.classList.add("no-img"); };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  }

  /* ---------- Header, progress, back-to-top ---------- */
  var header = $("#header");
  var bar = $("#progressBar");
  var toTop = $("#toTop");
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("is-scrolled", y > 20);
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    if (toTop) toTop.classList.toggle("show", y > 700);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Mobile menu ---------- */
  var toggle = $("#menuToggle");
  var body = document.body;
  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
  $$("#mobileMenu a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  window.addEventListener("resize", function () { if (window.innerWidth >= 1080) setMenu(false); });

  /* ---------- Active nav link ---------- */
  var navLinks = $$(".nav-link");
  var sections = navLinks.map(function (l) { return $(l.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.toggle("is-active", l.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          if (e.target.classList.contains("project")) e.target.classList.add("in-view");
          revObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in", "in-view"); });
  }

  /* ---------- Skill tabs ---------- */
  var tabs = $$(".tab");
  var groupsWrap = $("#skillGroups");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var f = tab.getAttribute("data-filter");
      tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); });
      if (groupsWrap) groupsWrap.setAttribute("data-view", f);
      $$(".skill-group").forEach(function (g) {
        g.hidden = !(f === "all" || g.getAttribute("data-group") === f);
        g.classList.add("in");
      });
    });
  });

  /* ---------- Project filters ---------- */
  var filters = $$(".filter");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var t = btn.getAttribute("data-tech");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      $$(".project").forEach(function (p) {
        var show = t === "all" || p.getAttribute("data-tech") === t;
        p.classList.toggle("is-hidden", !show);
        if (show) p.classList.add("in", "in-view");
      });
    });
  });

  /* GitHub links: use repo URL when provided, otherwise the profile */
  $$("[data-github]").forEach(function (a) {
    var p = PROJECTS[a.getAttribute("data-github")];
    if (p && p.github) a.href = p.github;
  });

  /* ---------- Project modal ---------- */
  var modal = $("#projectModal");
  var lastFocus = null;
  function openModal(key) {
    var p = PROJECTS[key];
    if (!p || !modal) return;
    $("#modalTitle").textContent = p.title;
    $("#modalTech").textContent = p.tech;
    $("#modalDesc").textContent = p.desc;
    var list = $("#modalList");
    list.innerHTML = "";
    p.points.forEach(function (pt) {
      var li = document.createElement("li");
      li.innerHTML = '<svg class="icon"><use href="#i-check"/></svg>';
      li.appendChild(document.createTextNode(pt));
      list.appendChild(li);
    });
    var gh = $("#modalGithub");
    gh.href = p.github || PROFILE_URL;
    lastFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
    setTimeout(function () { var c = $(".modal-close", modal); if (c) c.focus(); }, 50);
  }
  function closeModal() {
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$("[data-open]").forEach(function (b) {
    b.addEventListener("click", function () { openModal(b.getAttribute("data-open")); });
  });
  if (modal) {
    $$("[data-close]", modal).forEach(function (el) { el.addEventListener("click", closeModal); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); setMenu(false); }
  });

  /* ---------- Toast ---------- */
  var toastEl = $("#toast");
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  /* ---------- Copy email ---------- */
  $$("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var text = b.getAttribute("data-copy");
      var done = function () { toast("Email address copied"); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else { fallbackCopy(text); done(); }
    });
  });
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "absolute"; ta.style.left = "-9999px";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (err) { /* ignore */ }
    document.body.removeChild(ta);
  }

  /* ---------- Contact form ---------- */
  var form = $("#contactForm");
  if (form) {
    var status = $("#formStatus");
    var submitBtn = $("#cf-submit");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var rules = {
      name: function (v) { return !v ? "Please enter your name." : v.length > 100 ? "Name must be under 100 characters." : ""; },
      email: function (v) { return !v ? "Please enter your email." : !emailRe.test(v) ? "Please enter a valid email address." : ""; },
      subject: function (v) { return !v ? "Please add a subject." : v.length > 150 ? "Subject must be under 150 characters." : ""; },
      message: function (v) { return !v ? "Please write a message." : v.length < 10 ? "Message should be at least 10 characters." : v.length > 2000 ? "Message must be under 2000 characters." : ""; }
    };
    function validateField(input) {
      var rule = rules[input.name];
      if (!rule) return true;
      var msg = rule(input.value.trim());
      var field = input.closest(".field");
      field.classList.toggle("has-error", !!msg);
      $(".err", field).textContent = msg;
      return !msg;
    }
    $$("input, textarea", form).forEach(function (el) {
      el.addEventListener("blur", function () { if (el.value) validateField(el); });
      el.addEventListener("input", function () { if (el.closest(".field") && el.closest(".field").classList.contains("has-error")) validateField(el); });
    });

    function mailtoFallback(data) {
      var bodyText = data.message + "\n\n— " + data.name + " (" + data.email + ")";
      window.location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(data.subject) +
        "&body=" + encodeURIComponent(bodyText);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var inputs = $$("input[name]:not(.hp), textarea[name]", form);
      var ok = inputs.map(validateField).every(Boolean);
      if (!ok) {
        status.className = "form-status";
        status.textContent = "Please fix the highlighted fields.";
        var firstErr = $(".has-error input, .has-error textarea", form);
        if (firstErr) firstErr.focus();
        return;
      }
      if (form._honey && form._honey.value) return; // spam trap

      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim()
      };

      submitBtn.disabled = true;
      status.className = "form-status";
      status.textContent = "Sending your message…";

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _subject: "Portfolio enquiry: " + data.subject,
          _replyto: data.email,
          _template: "table",
          _captcha: "false",
          message: data.message
        })
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, json: j }; }); })
        .then(function (res) {
          var success = res.ok && (res.json.success === true || res.json.success === "true");
          if (success) {
            form.reset();
            status.className = "form-status ok";
            status.textContent = "Thank you — your message has been sent. I'll reply by email.";
            toast("Message sent");
          } else {
            throw new Error("send failed");
          }
        })
        .catch(function () {
          status.className = "form-status";
          status.textContent = "Couldn't send directly — opening your email app with your message instead.";
          mailtoFallback(data);
        })
        .then(function () { submitBtn.disabled = false; });
    });
  }
})();
