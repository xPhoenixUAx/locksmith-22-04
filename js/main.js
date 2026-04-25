(function () {
  const config = window.SITE_CONFIG || {};
  const qs = (selector) => document.querySelector(selector);
  const qsa = (selector) => Array.from(document.querySelectorAll(selector));

  const setText = (selector, value) => {
    qsa(selector).forEach((node) => {
      node.textContent = value;
    });
  };

  const setLink = (selector, href, text) => {
    qsa(selector).forEach((node) => {
      node.setAttribute("href", href);
      if (text) {
        node.textContent = text;
      }
    });
  };

  function injectConfig() {
    const phoneHref = config.phone ? `tel:${config.phone}` : "#";
    const emailHref = config.email ? `mailto:${config.email}` : "#";
    const address = [config.addressLine1, config.addressLine2].filter(Boolean).join(", ");

    setText("[data-company-name]", config.companyName || "");
    setText("[data-company-legal-name]", config.companyLegalName || "");
    setText("[data-company-id]", config.companyId || "");
    setText("[data-company-address]", address);
    setText("[data-service-area]", config.serviceArea || "");
    setText("[data-business-hours]", config.businessHours || "");
    setText("[data-footer-text-primary]", config.footerTextPrimary || "");
    setText("[data-footer-text-secondary]", config.footerTextSecondary || "");
    setText("[data-disclaimer-short]", config.disclaimerShort || "");
    setText("[data-disclaimer-full]", config.disclaimerFull || "");
    setText("[data-cta-primary]", config.ctaPrimary || "");
    setText("[data-cta-secondary]", config.ctaSecondary || "");
    setText("[data-copyright-line]", config.copyrightLine || "");
    setText("[data-phone-text]", config.phoneDisplay || "");
    setText("[data-phone-button-label]", config.phoneButtonLabel || config.phoneDisplay || "");
    setText("[data-email-text]", config.email || "");

    setLink("[data-phone-link]", phoneHref);
    setLink("[data-email-link]", emailHref);
  }

  function renderFooter() {
    const footer = qs("[data-site-footer]");
    if (!footer) return;

    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="container">
        <div class="site-footer__inner">
          <div class="site-footer__grid">
            <div class="footer-brand">
              <a class="footer-brand__mark" href="index.html" aria-label="Home">
                <i class="ri-key-2-line" aria-hidden="true"></i>
                <span data-company-name></span>
              </a>
              <p data-footer-text-primary></p>
              <p class="footer-brand__secondary" data-footer-text-secondary></p>
            </div>
            <div class="footer-column">
              <h3>Quick Links</h3>
              <nav class="footer-nav">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="services.html">Services</a>
                <a href="index.html#faq-home">FAQ's</a>
                <a href="contact.html">Contact</a>
              </nav>
            </div>
            <div class="footer-column">
              <h3>Our Services</h3>
              <div class="footer-nav">
                <a href="residential-locksmith.html">Residential Locksmith</a>
                <a href="commercial-locksmith.html">Commercial Locksmith</a>
                <a href="automotive-locksmith.html">Automotive Locksmith</a>
                <a href="emergency-locksmith.html">Emergency Locksmith</a>
                <a href="installation-repair.html">Installation & Repair</a>
                <a href="smart-lock-solutions.html">Smart Lock Solutions</a>
                <a href="key-duplication.html">Key Duplication</a>
                <a href="safe-vault-services.html">Safe & Vault Services</a>
              </div>
            </div>
            <div class="footer-column">
              <h3>Contact Us</h3>
              <div class="footer-contact">
                <p data-company-address></p>
                <a data-email-link href="#"><span data-email-text></span></a>
                <a data-phone-link href="#"><span data-phone-text></span></a>
                <p data-company-id></p>
              </div>
            </div>
          </div>
          <div class="footer-base">
            <div class="footer-base__identity">
              <span>&copy; ${year} <span data-copyright-line></span></span>
              <span><span data-company-name></span> | <span data-company-address></span> | <span data-company-id></span></span>
            </div>
            <div class="footer-base__links">
              <a href="cookie.html">Cookie Policy</a>
              <a href="privacy.html">Privacy Policy</a>
              <a href="terms.html">Terms Of Use</a>
            </div>
          </div>
          <p class="footer-disclaimer" data-disclaimer-full></p>
        </div>
      </div>
    `;
  }

  function setupServiceNavigation() {
    const serviceLinks = [
      ["Residential Locksmith", "residential-locksmith.html"],
      ["Commercial Locksmith", "commercial-locksmith.html"],
      ["Automotive Locksmith", "automotive-locksmith.html"],
      ["Emergency Locksmith", "emergency-locksmith.html"],
      ["Installation & Repair", "installation-repair.html"],
      ["Smart Lock Solutions", "smart-lock-solutions.html"],
      ["Key Duplication", "key-duplication.html"],
      ["Safe & Vault Services", "safe-vault-services.html"]
    ];

    const desktopServices = qs('.desktop-nav a[href="services.html"]');
    if (desktopServices && !desktopServices.closest(".nav-dropdown")) {
      const dropdown = document.createElement("div");
      dropdown.className = "nav-dropdown";
      desktopServices.parentNode.insertBefore(dropdown, desktopServices);
      dropdown.appendChild(desktopServices);
      desktopServices.classList.add("nav-dropdown__trigger");
      desktopServices.insertAdjacentHTML("beforeend", '<i class="ri-arrow-down-s-line" aria-hidden="true"></i>');

      const panel = document.createElement("div");
      panel.className = "nav-dropdown__panel";
      panel.innerHTML = serviceLinks
        .map(([label, href]) => `<a href="${href}">${label}</a>`)
        .join("");
      dropdown.appendChild(panel);
    }

    const mobileServices = qs('.mobile-menu__nav a[href="services.html"]');
    if (mobileServices && !qs(".mobile-services")) {
      mobileServices.classList.add("mobile-services-trigger");
      mobileServices.setAttribute("href", "#");
      mobileServices.setAttribute("role", "button");
      mobileServices.setAttribute("aria-expanded", "false");
      mobileServices.insertAdjacentHTML("beforeend", '<i class="ri-arrow-down-s-line" aria-hidden="true"></i>');

      const mobileList = document.createElement("div");
      mobileList.className = "mobile-services";
      mobileList.innerHTML = [
        ["See All Services", "services.html"],
        ...serviceLinks
      ]
        .map(([label, href], index) => `<a class="${index === 0 ? "mobile-services__all" : ""}" href="${href}">${label}</a>`)
        .join("");
      mobileServices.insertAdjacentElement("afterend", mobileList);

      mobileServices.addEventListener("click", (event) => {
        event.preventDefault();
        const isOpen = mobileList.classList.toggle("is-open");
        mobileServices.classList.toggle("is-open", isOpen);
        mobileServices.setAttribute("aria-expanded", String(isOpen));
      });
    }
  }

  function setupBrandLogos() {
    qsa(".site-header .brand-mark, .mobile-menu .brand-mark").forEach((brand) => {
      if (brand.querySelector(".brand-mark__icon")) return;
      brand.insertAdjacentHTML(
        "afterbegin",
        '<i class="ri-key-2-line brand-mark__icon" aria-hidden="true"></i>'
      );
    });
  }

  function setupMobileHeaderCallButton() {
    qsa(".site-header .header-actions").forEach((actions) => {
      if (actions.querySelector(".header-call-icon")) return;
      actions.insertAdjacentHTML(
        "afterbegin",
        '<a class="header-call-icon" data-phone-link href="#" aria-label="Call now"><i class="ri-phone-fill" aria-hidden="true"></i></a>'
      );
    });
  }

  function setupMenuToggleIcon() {
    qsa("[data-menu-toggle]").forEach((button) => {
      if (button.querySelector(".menu-toggle__icon")) return;
      button.insertAdjacentHTML(
        "beforeend",
        '<i class="ri-menu-3-line menu-toggle__icon" aria-hidden="true"></i>'
      );
    });
  }

  function setupFavicon() {
    if (qs('link[rel="icon"]')) return;
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.href = "img/common/favicon.svg";
    document.head.appendChild(favicon);
  }

  function setupHeader() {
    const header = qs("[data-header]");
    if (!header) return;

    const toggleSolid = () => {
      header.classList.toggle("is-solid", window.scrollY > 24);
    };

    toggleSolid();
    window.addEventListener("scroll", toggleSolid, { passive: true });
  }

  function setupMobileMenu() {
    const menu = qs("[data-mobile-menu]");
    const openButton = qs("[data-menu-toggle]");
    const closeButton = qs("[data-menu-close]");
    if (!menu || !openButton || !closeButton) return;

    const links = qsa(".mobile-menu__nav a");

    const setOpen = (isOpen) => {
      menu.classList.toggle("is-open", isOpen);
      menu.setAttribute("aria-hidden", String(!isOpen));
      openButton.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    };

    openButton.addEventListener("click", () => setOpen(true));
    closeButton.addEventListener("click", () => setOpen(false));
    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (link.classList.contains("mobile-services-trigger")) return;
        setOpen(false);
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function setupLenis() {
    if (!window.Lenis) return;
    const lenis = new window.Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  function setupRevealAnimations() {
    qsa("[data-reveal]").forEach((item) => {
      const delay = item.getAttribute("data-reveal-delay");
      if (delay) {
        item.style.setProperty("--reveal-delay", `${delay}s`);
      }
    });

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      qsa("[data-reveal]").forEach((item) => {
        window.gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: parseFloat(item.getAttribute("data-reveal-delay") || "0"),
          scrollTrigger: {
            trigger: item,
            start: "top 86%"
          }
        });
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    qsa("[data-reveal]").forEach((item) => observer.observe(item));
  }

  function setupFormDemo() {
    qsa(".contact-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const note = document.createElement("p");
        note.className = "form-note";
        note.textContent = "Demo form only. Connect this UI to your intake backend, CRM, or request workflow.";
        form.appendChild(note);
      }, { once: true });
    });
  }

  function setupFaqAccordion() {
    qsa(".faq-item, .service-detail-faq details").forEach((item) => {
      const summary = item.querySelector("summary");
      if (!summary) return;

      let content = item.querySelector(".faq-item__content, .faq-accordion__content");
      if (!content) {
        content = document.createElement("div");
        content.className = "faq-accordion__content";
        Array.from(item.childNodes).forEach((node) => {
          if (node !== summary) content.appendChild(node);
        });
        item.appendChild(content);
      }

      let inner = content.querySelector(".faq-accordion__inner");
      if (!inner) {
        inner = document.createElement("div");
        inner.className = "faq-accordion__inner";
        Array.from(content.childNodes).forEach((node) => {
          inner.appendChild(node);
        });
        content.appendChild(inner);
      }

      const setState = (isOpen) => {
        item.classList.toggle("is-open", isOpen);
      };

      setState(item.hasAttribute("open"));
      let closeTimer;

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        window.clearTimeout(closeTimer);

        if (item.open) {
          item.classList.remove("is-open");
          closeTimer = window.setTimeout(() => {
            item.open = false;
          }, 360);
          return;
        }

        item.open = true;
        requestAnimationFrame(() => {
          item.classList.add("is-open");
        });
      });
    });
  }

  function setupMobileTestimonials() {
    qsa(".testimonials-home__list").forEach((list) => {
      const cards = Array.from(list.querySelectorAll(".testimonial-card"));
      if (cards.length <= 2 || list.nextElementSibling?.classList.contains("testimonials-toggle")) return;

      cards.slice(2).forEach((card) => {
        card.classList.add("is-mobile-extra");
      });

      const button = document.createElement("button");
      button.className = "testimonials-toggle";
      button.type = "button";
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = '<span>Show More</span><i class="ri-arrow-down-s-line" aria-hidden="true"></i>';
      list.insertAdjacentElement("afterend", button);

      button.addEventListener("click", () => {
        const isExpanded = list.classList.toggle("is-expanded");
        button.classList.toggle("is-expanded", isExpanded);
        button.setAttribute("aria-expanded", String(isExpanded));
        button.querySelector("span").textContent = isExpanded ? "Show Less" : "Show More";
      });
    });
  }

  function setupServiceGuidanceCta() {
    const layout = qs(".service-guidance__layout");
    const intro = qs(".service-guidance__intro");
    const button = qs(".service-guidance__intro .button");
    if (!layout || !intro || !button) return;

    const placeholder = document.createComment("service guidance cta");
    button.parentNode.insertBefore(placeholder, button);

    const moveButton = () => {
      if (window.matchMedia("(max-width: 860px)").matches) {
        if (button.parentNode !== layout) layout.appendChild(button);
        button.classList.add("service-guidance__mobile-cta");
        return;
      }

      if (button.parentNode !== intro) intro.insertBefore(button, placeholder.nextSibling);
      button.classList.remove("service-guidance__mobile-cta");
    };

    moveButton();
    window.addEventListener("resize", moveButton);
  }

  renderFooter();
  setupFavicon();
  setupBrandLogos();
  setupMobileHeaderCallButton();
  setupMenuToggleIcon();
  setupServiceNavigation();
  injectConfig();
  setupHeader();
  setupMobileMenu();
  setupLenis();
  setupRevealAnimations();
  setupFormDemo();
  setupFaqAccordion();
  setupMobileTestimonials();
  setupServiceGuidanceCta();
})();
