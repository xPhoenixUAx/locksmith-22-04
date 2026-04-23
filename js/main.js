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
                <a href="/services.html#residential">Residential Locksmith</a>
                <a href="/services.html#commercial">Commercial Locksmith</a>
                <a href="/services.html#automotive">Automotive Locksmith</a>
                <a href="/services.html#emergency">Emergency Locksmith</a>
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
        </div>
      </div>
    `;
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
    qsa(".faq-item").forEach((item) => {
      item.classList.toggle("is-open", item.hasAttribute("open"));
      item.addEventListener("toggle", () => {
        item.classList.toggle("is-open", item.hasAttribute("open"));
      });
    });
  }

  injectConfig();
  renderFooter();
  setupHeader();
  setupMobileMenu();
  setupLenis();
  setupRevealAnimations();
  setupFormDemo();
  setupFaqAccordion();
})();
