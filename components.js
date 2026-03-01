// ============================================
// BIMATRIX — components.js
// Shared header, footer, and floating controls
// ============================================

// Prevent browser from restoring scroll position on reload
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

(function () {

  // ── Detect current page ──────────────────────
  const path = window.location.pathname || '';
  const isProjects = /\/projects(\/|$)/.test(path) || path.endsWith('/projects.html') || path.endsWith('projects.html');
  const root = /\/projects(\/|$)/.test(path) ? '../' : '';

  // ── HEADER ──────────────────────────────────
  const headerHTML = `
  <header class="site-header" id="site-header">
    <div class="header-inner">
      <a href="${root}index.html" class="logo">
        <img src="${root}images/logo.png" alt="Bimatrix logo" class="logo-img" />
        <div class="logo-text">
          <span class="logo-bim">BIM</span><span class="logo-atrix">ATRIX</span>
          <span class="logo-sub">TECHNICAL SERVICES LLC</span>
        </div>
      </a>

      <div class="desktop-nav" id="desktop-nav">
        <a href="${root}index.html#about" class="nav-link">About</a>
        <a href="${root}index.html#services" class="nav-link">Services</a>
        <a href="${root}index.html#process" class="nav-link">Process</a>
        <a href="${root}index.html#why-us" class="nav-link">Why Us</a>
        <a href="${root}projects/" class="nav-link${isProjects ? ' nav-page-active' : ''}">Projects</a>
        <a href="${root}index.html#contact" class="nav-link">Contact</a>
        <a href="${root}index.html#contact" class="btn btn-primary nav-cta">Get in Touch</a>
      </div>

      <button class="hamburger" id="hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile nav sits outside header-inner so it's not clipped -->
    <nav class="nav-main" id="nav-main">
      <a href="${root}index.html#about" class="nav-link">About</a>
      <a href="${root}index.html#services" class="nav-link">Services</a>
      <a href="${root}index.html#process" class="nav-link">Process</a>
      <a href="${root}index.html#why-us" class="nav-link">Why Us</a>
      <a href="${root}projects/" class="nav-link">Projects</a>
      <a href="${root}index.html#contact" class="nav-link">Contact</a>
      <a href="${root}index.html#contact" class="btn btn-primary nav-cta">Get in Touch</a>
    </nav>
  </header>`;

  // ── FOOTER ───────────────────────────────────
  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo footer-logo">
              <div class="footer-logo-main">
                <span class="logo-bim">BIM</span><span class="logo-atrix">ATRIX</span>
              </div>
              <span class="logo-sub">TECHNICAL SERVICES LLC</span>
            </div>
            <p>One Model. One Vision. Transforming the built environment through digital innovation across the UAE and GCC.</p>
            <p class="footer-tagline">www.bimatrix.ae</p>

            <div class="footer-social">
              <span class="social-link social-link--icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </span>
              <a href="https://wa.me/971551122420" target="_blank" rel="noopener" class="social-link" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://www.instagram.com/bimatrix.ae" target="_blank" rel="noopener" class="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Services</h5>
            <ul>
              <li><a href="${root}index.html#services">Bid &amp; Estimation</a></li>
              <li><a href="${root}index.html#services">Pre-Construction BIM</a></li>
              <li><a href="${root}index.html#services">BIM Operations</a></li>
              <li><a href="${root}index.html#modelling">3D Model Development</a></li>
              <li><a href="${root}index.html#mep">MEP Coordination</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="${root}index.html#about">About Us</a></li>
              <li><a href="${root}projects/">Projects</a></li>
              <li><a href="${root}index.html#why-us">Why Choose Us</a></li>
              <li><a href="${root}index.html#benefits">Benefits of BIM</a></li>
              <li><a href="${root}index.html#contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="tel:+971551122420">+971 55 1122420</a></li>
              <li><a href="mailto:info@bimatrix.ae">info@bimatrix.ae</a></li>
              <li>Office-705, Grand Al Attar Building</li>
              <li>Bank Street, Bur Dubai, UAE</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>&copy; 2026 BIMATRIX Technical Services LLC. All rights reserved.</p>
        <p>Dubai, UAE &mdash; www.bimatrix.ae</p>
      </div>
    </div>
  </footer>`;

  // ── FLOATING CONTROLS ────────────────────────
  const floatingHTML = `
  <div class="floating-controls">
    <div class="theme-toggle-wrap" id="theme-toggle" role="button" tabindex="0" aria-label="Toggle dark mode">
      <div class="toggle-thumb">
        <svg class="icon-light icon-in-thumb" viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="3" fill="#ffffff"/>
          <polygon points="12,2 13.2,5.5 11.8,5.5" fill="#ffffff"/>
          <polygon points="12,22 13.2,18.5 11.8,18.5" fill="#ffffff"/>
          <polygon points="2,12 5.5,10.8 5.5,13.2" fill="#ffffff"/>
          <polygon points="22,12 18.5,10.8 18.5,13.2" fill="#ffffff"/>
          <polygon points="4.93,4.93 7.3,7.8 5.5,7.8" fill="#ffffff"/>
          <polygon points="19.07,4.93 18.5,7.8 16.7,7.8" fill="#ffffff"/>
          <polygon points="4.93,19.07 5.5,16.2 7.3,16.2" fill="#ffffff"/>
          <polygon points="19.07,19.07 16.7,16.2 18.5,16.2" fill="#ffffff"/>
        </svg>
        <svg class="icon-dark icon-in-thumb" viewBox="0 0 24 24" width="24" height="24">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#ffffff"/>
        </svg>
      </div>
      <svg class="icon-light icon-mobile" viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
        <polygon points="12,2 13.2,5.5 11.8,5.5" fill="currentColor"/>
        <polygon points="12,22 13.2,18.5 11.8,18.5" fill="currentColor"/>
        <polygon points="2,12 5.5,10.8 5.5,13.2" fill="currentColor"/>
        <polygon points="22,12 18.5,10.8 18.5,13.2" fill="currentColor"/>
        <polygon points="4.93,4.93 7.3,7.8 5.5,7.8" fill="currentColor"/>
        <polygon points="19.07,4.93 18.5,7.8 16.7,7.8" fill="currentColor"/>
        <polygon points="4.93,19.07 5.5,16.2 7.3,16.2" fill="currentColor"/>
        <polygon points="19.07,19.07 16.7,16.2 18.5,16.2" fill="currentColor"/>
      </svg>
      <svg class="icon-dark icon-mobile" viewBox="0 0 24 24" width="20" height="20">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
      </svg>
    </div>
    <button class="home-btn-wrap" id="home-btn" aria-label="Go to home">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L2 12h3v9h5v-5h4v5h5v-9h3L12 2z"/>
      </svg>
    </button>
  </div>`;

  // ── In-page smooth scroll on home without changing URL ─────────────────────
  function setupInPageScroll() {
    if (isProjects) return; // only keep URL clean on the main page

    function scrollToId(id) {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function cleanUrl() {
      var cleanPath = window.location.pathname.replace(/index\.html$/, '');
      window.history.replaceState(null, '', cleanPath || '/');
    }

    const links = document.querySelectorAll(
      'a[href^="index.html#"], a[href^="#"]:not([href="#"])'
    );

    links.forEach(link => {
      const href = link.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const id = href.slice(hashIndex + 1);
      if (!id) return;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToId(id);
        cleanUrl();
      });
    });

    // Handle direct visits like /index.html#contact
    if (window.location.hash && window.location.hash.length > 1) {
      const id = window.location.hash.slice(1);
      setTimeout(() => { scrollToId(id); cleanUrl(); }, 80);
    } else {
      window.scrollTo(0, 0);
      cleanUrl();
    }
  }

  // ── Inject into DOM ───────────────────────────
  // Header: insert immediately so it renders before any content
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // Footer + floating controls: defer until DOM is fully parsed
  // so they always land after <main>, not before it
  function injectAfterMain() {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    document.body.insertAdjacentHTML('beforeend', floatingHTML);
    document.body.insertAdjacentHTML('beforeend', '<div class="nav-overlay" id="nav-overlay"></div>');
    setupInPageScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAfterMain);
  } else {
    // Already parsed (e.g. script moved to end of body)
    injectAfterMain();
  }

})();
