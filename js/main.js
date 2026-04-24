(function () {
  const config = window.SITE_CONFIG || {};
  const qs = (selector) => document.querySelector(selector);
  const qsa = (selector) => Array.from(document.querySelectorAll(selector));

  const setText = (selector, value) => {
    qsa(selector).forEach((node) => {
      node.textContent = value;
    });
  };

  const setHtml = (selector, value) => {
    qsa(selector).forEach((node) => {
      node.innerHTML = value;
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
    const address = [config.addressLine1, config.addressLine2].filter(Boolean).join(", ");
    footer.innerHTML = `
      <div class="container">
        <div class="site-footer__inner">
          <div class="site-footer__grid">
            <div class="footer-brand">
              <a class="footer-brand__mark" href="/index.html" aria-label="${config.companyName || "Home"}">
                <i class="ri-key-2-line" aria-hidden="true"></i>
                <span>${config.companyName || ""}</span>
              </a>
              <p>${config.footerTextPrimary || ""}</p>
              <div class="footer-socials" aria-label="Social links">
                <a href="#" aria-label="Facebook"><i class="ri-facebook-fill" aria-hidden="true"></i></a>
                <a href="#" aria-label="Instagram"><i class="ri-instagram-line" aria-hidden="true"></i></a>
                <a href="#" aria-label="LinkedIn"><i class="ri-linkedin-fill" aria-hidden="true"></i></a>
                <a href="#" aria-label="X"><i class="ri-twitter-x-line" aria-hidden="true"></i></a>
              </div>
            </div>
            <div class="footer-column">
              <h3>Quick Links</h3>
              <nav class="footer-nav">
                <a href="/index.html">Home</a>
                <a href="/about.html">About</a>
                <a href="/services.html">Services</a>
                <a href="/index.html#faq-home">FAQ's</a>
                <a href="/contact.html">Contact</a>
              </nav>
            </div>
            <div class="footer-column">
              <h3>Our Services</h3>
              <div class="footer-nav">
                <a href="/residential-locksmith.html">Residential Locksmith</a>
                <a href="/commercial-locksmith.html">Commercial Locksmith</a>
                <a href="/automotive-locksmith.html">Automotive Locksmith</a>
                <a href="/emergency-locksmith.html">Emergency Locksmith</a>
                <a href="/installation-repair.html">Installation & Repair</a>
                <a href="/smart-lock-solutions.html">Smart Lock Solutions</a>
                <a href="/key-duplication.html">Key Duplication</a>
                <a href="/safe-vault-services.html">Safe & Vault Services</a>
              </div>
            </div>
            <div class="footer-column">
              <h3>Contact Us</h3>
              <div class="footer-contact">
                <p>${address}</p>
                <a href="mailto:${config.email || ""}">${config.email || ""}</a>
                <a href="tel:${config.phone || ""}">${config.phoneDisplay || ""}</a>
                <p>${config.companyId || ""}</p>
              </div>
            </div>
          </div>
          <div class="footer-base">
            <span>&copy; ${year} ${config.copyrightLine || ""}</span>
            <div class="footer-base__links">
              <a href="/cookie.html">Cookie Policy</a>
              <a href="/privacy.html">Privacy Policy</a>
              <a href="/terms.html">Terms Of Use</a>
            </div>
          </div>
          <p class="footer-disclaimer">${config.disclaimerFull || ""}</p>
        </div>
      </div>
    `;
  }

  function setupServiceNavigation() {
    const serviceLinks = [
      ["Residential Locksmith", "/residential-locksmith.html"],
      ["Commercial Locksmith", "/commercial-locksmith.html"],
      ["Automotive Locksmith", "/automotive-locksmith.html"],
      ["Emergency Locksmith", "/emergency-locksmith.html"],
      ["Installation & Repair", "/installation-repair.html"],
      ["Smart Lock Solutions", "/smart-lock-solutions.html"],
      ["Key Duplication", "/key-duplication.html"],
      ["Safe & Vault Services", "/safe-vault-services.html"]
    ];

    const desktopServices = qs('.desktop-nav a[href="/services.html"]');
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

    const mobileServices = qs('.mobile-menu__nav a[href="/services.html"]');
    if (mobileServices && !qs(".mobile-services")) {
      const mobileList = document.createElement("div");
      mobileList.className = "mobile-services";
      mobileList.innerHTML = serviceLinks
        .map(([label, href]) => `<a href="${href}">${label}</a>`)
        .join("");
      mobileServices.insertAdjacentElement("afterend", mobileList);
    }
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
    links.forEach((link) => link.addEventListener("click", () => setOpen(false)));
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

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        if (item.classList.contains("is-animating")) return;

        const isOpen = item.hasAttribute("open");

        if (isOpen) {
          item.classList.add("is-animating");
          item.classList.remove("is-open");
          const handleCloseEnd = (transitionEvent) => {
            if (transitionEvent.propertyName !== "grid-template-rows") return;
            content.removeEventListener("transitionend", handleCloseEnd);
            item.removeAttribute("open");
            item.classList.remove("is-animating");
          };
          content.addEventListener("transitionend", handleCloseEnd);
          return;
        }

        item.setAttribute("open", "");
        requestAnimationFrame(() => {
          item.classList.add("is-open");
        });
      });
    });
  }

  injectConfig();
  renderFooter();
  setupServiceNavigation();
  setupHeader();
  setupMobileMenu();
  setupLenis();
  setupRevealAnimations();
  setupFormDemo();
  setupFaqAccordion();
})();
