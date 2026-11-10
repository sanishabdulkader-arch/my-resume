/* ============================================================
   app.js — all interactivity for the site
   Requires jQuery (loaded just before this file).
   Features
     1. Footer year
     2. Mobile navigation
     3. Active nav link
     4. Scroll reveal animations
     5. Animated skill bars
     6. Project category filter
     7. Contact form validation
     8. Back-to-top button
     9. Scroll progress bar
    10. Cursor spotlight (hero)
    11. 3D tilt on project cards
    12. Count-up quick facts
    13. Full-size certificate viewer
    14. Print helpers
   ============================================================ */

/* Safety net: if jQuery failed to load (wrong path, offline CDN, etc.)
   remove the "js" class so every section stays visible instead of
   remaining hidden behind the reveal animation. */
if (!window.jQuery) {
  document.documentElement.classList.remove("js");
  throw new Error("jQuery was not found. Check that js/vendor/jquery.min.js exists.");
}

(function ($) {
  "use strict";

  /* ---------- 1. Footer year ---------- */
  function setYear() {
    var year = new Date().getFullYear();
    $("#year").text(year);
  }

  /* ---------- 2. Mobile navigation ---------- */
  function initNav() {
    var $toggle = $("#navToggle");
    var $nav = $("#primaryNav");

    function closeNav() {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false").attr("aria-label", "Open menu");
    }

    $toggle.on("click", function () {
      var open = $nav.toggleClass("is-open").hasClass("is-open");
      $toggle.attr("aria-expanded", open ? "true" : "false")
             .attr("aria-label", open ? "Close menu" : "Open menu");
    });

    $nav.on("click", "a", closeNav);

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") { closeNav(); }
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest(".site-header").length) { closeNav(); }
    });

    $(window).on("resize", function () {
      if (window.innerWidth > 780) { closeNav(); }
    });
  }

  /* ---------- 3. Active nav (works even if you rename pages) ---------- */
  function initActiveNav() {
    var here = window.location.pathname.split("/").pop() || "index.html";
    $("#primaryNav > a").each(function () {
      var href = ($(this).attr("href") || "").split("/").pop();
      if (href === here) { $(this).addClass("is-active"); }
      else { $(this).removeClass("is-active"); }
    });
  }

  /* ---------- 5. Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) { return; }

    if (!("IntersectionObserver" in window)) {
      $(items).addClass("is-visible");           // graceful fallback
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // small stagger so grids cascade nicely
          setTimeout(function () { el.classList.add("is-visible"); }, i * 70);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 6. Skill bars ---------- */
  function paintSkillBars() {
    $(".skill").each(function () {
      var level = parseInt($(this).attr("data-level"), 10) || 0;
      $(this).find(".bar i").css({ width: level + "%" });
      $(this).css("--w", level + "%");
      $(this).find(".bar").attr({
        role: "progressbar",
        "aria-valuenow": level,
        "aria-valuemin": 0,
        "aria-valuemax": 100
      });
    });
  }

  function initSkillBars() {
    if (!$(".skill-bars").length) { return; }

    if (!("IntersectionObserver" in window)) {
      paintSkillBars();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          paintSkillBars();
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });

    io.observe(document.querySelector(".skill-bars"));
  }

  /* ---------- 7. Project filter ---------- */
  function initProjectFilter() {
    var $buttons = $(".filter-btn");
    if (!$buttons.length) { return; }

    $buttons.on("click", function () {
      var filter = $(this).data("filter");

      $buttons.removeClass("is-on").attr("aria-pressed", "false");
      $(this).addClass("is-on").attr("aria-pressed", "true");

      var shown = 0;
      $(".project").each(function () {
        var cats = ($(this).data("cat") || "").toString().split(/\s+/);
        var match = filter === "all" || cats.indexOf(filter) !== -1;

        if (match) {
          shown++;
          $(this).stop(true, true).fadeIn(220);
        } else {
          $(this).stop(true, true).fadeOut(160);
        }
      });

      // show a message when a category is empty
      setTimeout(function () {
        $("#emptyNote").toggle(shown === 0);
      }, 200);
    });
  }

  /* ---------- 8. Contact form validation ---------- */
  function initContactForm() {
    var $form = $("#contactForm");
    if (!$form.length) { return; }

    var emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

    function setError($input, message) {
      $input.addClass("is-invalid").attr("aria-invalid", "true");
      $("#err-" + $input.attr("id")).text(message);
    }

    function clearError($input) {
      $input.removeClass("is-invalid").removeAttr("aria-invalid");
      $("#err-" + $input.attr("id")).text("");
    }

    function validateField(id) {
      var $input = $("#" + id);
      var value = $.trim($input.val());

      switch (id) {
        case "name":
          if (value.length < 2) { setError($input, "Please enter your full name."); return false; }
          break;
        case "email":
          if (!emailRe.test(value)) { setError($input, "Please enter a valid email address."); return false; }
          break;
        case "subject":
          if (value.length < 3) { setError($input, "Please add a short subject."); return false; }
          break;
        case "message":
          if (value.length < 10) { setError($input, "Message should be at least 10 characters."); return false; }
          break;
      }
      clearError($input);
      return true;
    }

    // live re-validation once a field has been touched
    $form.on("input blur", "input, textarea", function () {
      if ($(this).hasClass("is-invalid")) { validateField($(this).attr("id")); }
    });

    $form.on("submit", function (e) {
      e.preventDefault();

      var fields = ["name", "email", "subject", "message"];
      var firstBad = null;

      fields.forEach(function (id) {
        if (!validateField(id) && !firstBad) { firstBad = id; }
      });

      var $status = $("#formStatus");

      if (firstBad) {
        $status.removeClass("ok").addClass("bad")
               .text("Please fix the highlighted fields and try again.");
        $("#" + firstBad).trigger("focus");
        return;
      }

      // Demo delivery: build a mailto link from the form values.
      var name = $.trim($("#name").val());
      var email = $.trim($("#email").val());
      var subject = $.trim($("#subject").val());
      var message = $.trim($("#message").val());

      var body = message + "\n\n—\n" + name + "\n" + email;
      var href = "mailto:sanishabdulkader@gmail.com" +
                 "?subject=" + encodeURIComponent(subject) +
                 "&body=" + encodeURIComponent(body);

      $status.removeClass("bad").addClass("ok")
             .html("Thanks, " + $("<div>").text(name).html() +
                   "! Your message is ready — opening your email app…");

      $("#submitBtn").prop("disabled", true).text("Opening email…");

      setTimeout(function () {
        window.location.href = href;
        $("#submitBtn").prop("disabled", false).text("Send message");
      }, 700);

      $form.trigger("reset");
      fields.forEach(function (id) { clearError($("#" + id)); });
    });
  }

  /* ---------- 9. Back to top ---------- */
  function initToTop() {
    var $btn = $("#toTop");
    if (!$btn.length) { return; }

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(function () {
        $btn.toggleClass("is-on", window.scrollY > 420);
        ticking = false;
      });
    }, { passive: true });

    $btn.on("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 10. Scroll progress bar ---------- */
  function initScrollProgress() {
    var $bar = $("#scrollProgress");
    if (!$bar.length) { return; }

    var ticking = false;

    function paint() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;
      ratio = Math.min(1, Math.max(0, ratio));
      $bar.css("transform", "scaleX(" + ratio.toFixed(4) + ")");
      ticking = false;
    }

    function request() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(paint);
      }
    }

    $(window).on("scroll resize", request);
    paint();
  }

  /* ---------- 11. Spotlit hero that follows the pointer ---------- */
  function initHeroGlow() {
    var hero = document.querySelector(".hero");
    var glow = document.querySelector(".hero-glow");
    if (!hero || !glow) { return; }
    if (window.matchMedia("(hover: none)").matches) { return; }

    hero.addEventListener("pointermove", function (e) {
      var rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      hero.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
  }

  /* ---------- 12. 3D tilt on project cards ---------- */
  function initTilt() {
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) { return; }

    $(".project").each(function () {
      var el = this;

      $(el).on("pointermove", function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty("--ry", (px * 5).toFixed(2) + "deg");
        el.style.setProperty("--rx", (-py * 5).toFixed(2) + "deg");
      });

      $(el).on("pointerleave", function () {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- 13. Count-up for the quick facts ---------- */
  function initCounters() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }

    $(".quick-facts strong").each(function () {
      var $el = $(this);
      var raw = $.trim($el.text());
      var target = parseFloat(raw);
      if (isNaN(target) || target >= 1900) { return; }      // leave the graduation year alone

      var decimals = (raw.split(".")[1] || "").length;
      var started = null;
      var duration = 1200;

      $el.attr("data-final", raw);

      function frame(now) {
        if (started === null) { started = now; }
        var t = Math.min((now - started) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        $el.text((target * eased).toFixed(decimals));
        if (t < 1) {
          window.requestAnimationFrame(frame);
        } else {
          $el.text(target.toFixed(decimals));
        }
      }

      window.requestAnimationFrame(frame);

      // Safety net: background tabs pause rAF, so make sure the real
      // value is in place even if the animation never runs.
      window.setTimeout(function () {
        $el.text(target.toFixed(decimals));
      }, 2200);
    });
  }

  /* ---------- 14. Full-size certificate viewer ---------- */
  function initCertViewer() {
    var $modal = $("#certModal");
    if (!$modal.length) { return; }

    var $img = $("#certModalImg");
    var $title = $("#certModalTitle");
    var $close = $("#certModalClose");
    var $link = $("#certModalLink");
    var lastFocus = null;

    function open(src, title, alt) {
      lastFocus = document.activeElement;
      $img.attr({ src: src, alt: alt || title });
      $title.text(title);
      $link.attr("href", src);
      $modal.prop("hidden", false);
      $("body").addClass("is-locked");
      $close.trigger("focus");
    }

    function close() {
      if ($modal.prop("hidden")) { return; }
      $modal.prop("hidden", true);
      $img.attr({ src: "", alt: "" });
      $link.attr("href", "#");
      $("body").removeClass("is-locked");
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
    }

    // The certificate image holder is a real <button>, so it is keyboard operable.
    $(document).on("click", ".cert-shot", function () {
      open($(this).attr("data-src"), $(this).attr("data-title"), $(this).find("img").attr("alt"));
    });

    $close.on("click", close);

    // Click the dark backdrop (but not the white certificate itself) to close.
    $modal.on("click", function (e) {
      if (e.target === this) { close(); }
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape") { close(); }
    });
  }

  /* ---------- 15. Print helpers ---------- */
  function initPrint() {
    // Make sure bars are filled before the print dialog snapshots the page.
    window.addEventListener("beforeprint", function () {
      $(".skill").each(function () {
        var level = parseInt($(this).attr("data-level"), 10) || 0;
        $(this).css("--w", level + "%");
        $(this).find(".bar i").css("width", level + "%");
      });
      $(".reveal").addClass("is-visible");

      // Counters may be mid-animation — print the real values.
      $(".quick-facts strong").each(function () {
        var final = $(this).attr("data-final");
        if (final) { $(this).text(final); }
      });
    });
  }

  /* ---------- boot ---------- */
  $(function () {
    setYear();
    initNav();
    initActiveNav();
    initReveal();
    initSkillBars();
    initProjectFilter();
    initContactForm();
    initToTop();
    initScrollProgress();
    initHeroGlow();
    initTilt();
    initCounters();
    initCertViewer();
    initPrint();
  });
})(jQuery);
