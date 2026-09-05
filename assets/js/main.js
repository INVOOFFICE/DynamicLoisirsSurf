/* ==========================================================================
   Dynamic Loisirs — Surf Camp Morocco · vanilla JS (no frameworks)
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var body = doc.body;

  /* ---------- Header scroll state ---------- */
  var header = doc.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 30) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var navToggle = doc.querySelector(".nav-toggle");
  var nav = doc.querySelector(".site-nav");

  function setNavOpen(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    body.classList.toggle("no-scroll", open);
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setNavOpen(false); });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) setNavOpen(false);
    });
  }

  /* ---------- Dropdown submenus ---------- */
  doc.querySelectorAll(".submenu-toggle").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      doc.querySelectorAll(".submenu-toggle[aria-expanded='true']").forEach(function (o) {
        if (o !== btn) o.setAttribute("aria-expanded", "false");
      });
    });
  });

  /* ---------- Footer year ---------- */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Reveal on scroll ---------- */
  function observeReveal(el) {
    if (!el) return;
    if (window.__revealIO) window.__revealIO.observe(el);
    else el.classList.add("is-visible");
  }
  var revealEls = doc.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    window.__revealIO = io;
    revealEls.forEach(observeReveal);
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Generic slider (testimonials) ---------- */
  function initSlider(root) {
    var slidesWrap = root.querySelector(".slider-slides");
    var prevBtn = root.querySelector("[data-slider-prev]");
    var nextBtn = root.querySelector("[data-slider-next]");
    var dotsWrap = root.querySelector(".slider-dots");
    var slides = root.querySelectorAll(".slide");
    if (!slidesWrap || !slides.length) return;

    var index = 0;
    var timer = null;

    function go(i) {
      index = (i + slides.length) % slides.length;
      slidesWrap.style.transform = "translateX(-" + index * 100 + "%)";
      if (dotsWrap) {
        dotsWrap.querySelectorAll("button").forEach(function (d, di) {
          d.classList.toggle("is-active", di === index);
        });
      }
    }

    function restart() {
      if (timer) clearInterval(timer);
      if (root.dataset.autoplay !== "off") {
        timer = setInterval(function () { go(index + 1); }, 5000);
      }
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { go(index + 1); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { go(index - 1); restart(); });

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = doc.createElement("button");
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        if (i === 0) dot.classList.add("is-active");
        dot.addEventListener("click", function () { go(i); restart(); });
        dotsWrap.appendChild(dot);
      });
    }

    restart();
    root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    root.addEventListener("mouseleave", restart);
  }
  doc.querySelectorAll("[data-slider]").forEach(initSlider);

  /* ---------- Slideshow (accommodation images) ---------- */
  function initSlideshow(root) {
    var imgs = root.querySelectorAll(".slide-img");
    var prevBtn = root.querySelector("[data-slideshow-prev]");
    var nextBtn = root.querySelector("[data-slideshow-next]");
    var dotsWrap = root.querySelector(".slideshow-nav");
    if (!imgs.length) return;

    var index = 0;
    var timer = null;

    function go(i) {
      index = (i + imgs.length) % imgs.length;
      imgs.forEach(function (img, di) {
        img.classList.toggle("is-active", di === index);
      });
      if (dotsWrap) {
        dotsWrap.querySelectorAll("button").forEach(function (d, di) {
          d.classList.toggle("is-active", di === index);
        });
      }
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { go(index + 1); }, 4500);
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { go(index + 1); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { go(index - 1); restart(); });

    if (dotsWrap) {
      imgs.forEach(function (_, i) {
        var dot = doc.createElement("button");
        dot.setAttribute("aria-label", "Show image " + (i + 1));
        if (i === 0) dot.classList.add("is-active");
        dot.addEventListener("click", function () { go(i); restart(); });
        dotsWrap.appendChild(dot);
      });
    }

    restart();
    root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    root.addEventListener("mouseleave", restart);
  }
  doc.querySelectorAll("[data-slideshow]").forEach(initSlideshow);

  /* ---------- Gallery (auto-built from assets/data/gallery.js) ---------- */
  var gallerySource = window.DL_GALLERY || [];
  var galleryTabsWrap = doc.querySelector("[data-gallery-tabs]");
  var galleryGrid = doc.querySelector("[data-gallery]");
  var lightbox = doc.querySelector("[data-lightbox]");
  var lbImg = lightbox ? lightbox.querySelector("img") : null;
  var lbVideo = lightbox ? lightbox.querySelector("video") : null;
  var galleryMedia = []; // { src, caption, type, item }
  var visibleItems = [];

  function refreshVisibleItems() {
    if (!galleryGrid) return;
    visibleItems = galleryMedia.filter(function (m) {
      return m.item.style.display !== "none";
    });
  }

  function makeVideoEl(src) {
    var v = doc.createElement("video");
    v.setAttribute("preload", "metadata");
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("aria-label", "Video");
    var s = doc.createElement("source");
    s.setAttribute("src", src);
    v.appendChild(s);
    return v;
  }

  function filterGallery(filter, tab) {
    galleryTabsWrap.querySelectorAll(".gallery-tab").forEach(function (t) {
      t.classList.remove("is-active");
    });
    tab.classList.add("is-active");
    galleryGrid.querySelectorAll(".gallery-item").forEach(function (item) {
      item.style.display = filter === "all" || item.dataset.category === filter ? "" : "none";
    });
    refreshVisibleItems();
  }

  function buildGallery() {
    if (!galleryGrid || !galleryTabsWrap || !gallerySource.length) return;
    var hasItems = false;

    gallerySource.forEach(function (cat) {
      var files = cat.files || [];
      if (!files.length) return;

      var tab = doc.createElement("button");
      tab.className = "gallery-tab";
      tab.dataset.filter = cat.id;
      tab.textContent = cat.label;
      tab.addEventListener("click", function () { filterGallery(cat.id, tab); });
      galleryTabsWrap.appendChild(tab);

      files.forEach(function (file) {
        var item = doc.createElement("figure");
        item.className = "gallery-item" + (file.type === "video" ? " video" : "");
        item.dataset.category = cat.id;
        item.dataset.reveal = "";

        var mediaEl;
        if (file.type === "video") {
          mediaEl = makeVideoEl(file.src);
        } else {
          mediaEl = doc.createElement("img");
          mediaEl.setAttribute("src", file.src);
          mediaEl.setAttribute("alt", file.name);
          mediaEl.setAttribute("loading", "lazy");
          mediaEl.setAttribute("width", "1200");
          mediaEl.setAttribute("height", "900");
        }
        item.appendChild(mediaEl);

        if (file.type === "video") {
          var play = doc.createElement("span");
          play.className = "play-btn";
          play.innerHTML = "&#9654;";
          item.appendChild(play);
        }

        galleryGrid.appendChild(item);
        galleryMedia.push({ src: file.src, caption: file.name, type: file.type, item: item });
        observeReveal(item);
        hasItems = true;
      });
    });

    var allTab = doc.createElement("button");
    allTab.className = "gallery-tab is-active";
    allTab.dataset.filter = "all";
    allTab.textContent = "All";
    allTab.addEventListener("click", function () { filterGallery("all", allTab); });
    galleryTabsWrap.insertBefore(allTab, galleryTabsWrap.firstChild);

    if (!hasItems) {
      var msg = doc.createElement("p");
      msg.className = "gallery-empty";
      msg.textContent = "No media found. Add photos to assets/img/<category> folders, then re-run tools/update-gallery.py.";
      galleryGrid.appendChild(msg);
    }

    refreshVisibleItems();
  }

  function currentMedia() {
    if (lbImg && lbImg.style.display !== "none" && lbImg.getAttribute("src")) {
      return galleryMedia.find(function (m) { return m.type !== "video" && m.src === lbImg.getAttribute("src"); });
    }
    if (lbVideo && lbVideo.getAttribute("src")) {
      return galleryMedia.find(function (m) { return m.type === "video" && m.src === lbVideo.getAttribute("src"); });
    }
    return null;
  }

  function showMedia(media) {
    if (!lightbox || !media) return;
    var isVideo = media.type === "video";
    if (lbImg) lbImg.style.display = isVideo ? "none" : "block";
    if (lbVideo) {
      lbVideo.style.display = isVideo ? "block" : "none";
      lbVideo.pause();
      if (isVideo) {
        lbVideo.setAttribute("src", media.src);
        lbVideo.load();
        var p = lbVideo.play();
        if (p && typeof p.catch === "function") p.catch(function () {});
      }
    }
    if (!isVideo && lbImg) {
      lbImg.setAttribute("src", media.src);
      lbImg.setAttribute("alt", media.caption || "Photo");
    }
    lightbox.classList.add("is-open");
    body.classList.add("no-scroll");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    body.classList.remove("no-scroll");
    if (lbVideo) lbVideo.pause();
  }

  function stepMedia(dir) {
    if (!visibleItems.length) return;
    var cur = currentMedia() || visibleItems[0];
    var idx = Math.max(0, visibleItems.indexOf(cur));
    var next = visibleItems[(idx + dir + visibleItems.length) % visibleItems.length];
    showMedia(next);
  }

  buildGallery();

  if (galleryGrid) {
    galleryGrid.addEventListener("click", function (e) {
      var item = e.target.closest(".gallery-item");
      if (!item) return;
      var media = galleryMedia.find(function (m) { return m.item === item; });
      if (!media) return;
      refreshVisibleItems();
      showMedia(media);
    });
  }

  if (lightbox) {
    var lbClose = lightbox.querySelector(".lb-close");
    var lbPrev = lightbox.querySelector(".lb-prev");
    var lbNext = lightbox.querySelector(".lb-next");
    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbPrev) lbPrev.addEventListener("click", function () { stepMedia(-1); });
    if (lbNext) lbNext.addEventListener("click", function () { stepMedia(1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    doc.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && lbPrev) lbPrev.click();
      if (e.key === "ArrowRight" && lbNext) lbNext.click();
    });
  }

  /* ---------- FAQ accordion ---------- */
  doc.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");
    if (!btn || !answer) return;
    btn.addEventListener("click", function () {
      var open = item.classList.contains("is-open");
      doc.querySelectorAll(".faq-item.is-open").forEach(function (o) {
        o.classList.remove("is-open");
        var a = o.querySelector(".faq-a");
        if (a) a.style.maxHeight = "0px";
        var q = o.querySelector(".faq-q");
        if (q) q.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Contact form (static mailto) ---------- */
  var contactForm = doc.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(contactForm);
      var subject = "Surf camp inquiry - " + (fd.get("name") || "New message");
      var body = [
        "Name: " + (fd.get("name") || ""),
        "Email: " + (fd.get("email") || ""),
        "Travel dates: " + (fd.get("dates") || ""),
        "Surf level: " + (fd.get("level") || ""),
        "",
        fd.get("message") || ""
      ].join("\n");
      window.location.href = "mailto:dynamicloisirs@gmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- In-page anchor links ---------- */
  doc.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      var target = doc.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();