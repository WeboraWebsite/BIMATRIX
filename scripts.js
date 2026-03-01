// ============================================
// BIMATRIX — scripts.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── HERO SLIDESHOW ─────────────────────────
  (function () {
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    const dotsContainer = document.getElementById('hero-slide-dots');
    if (!slides.length) return;

    let current = 0, timer = null;
    const DWELL = 4000;

    // Build dots
    const dots = slides.map((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'hero-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      btn.addEventListener('click', () => goTo(i));
      if (dotsContainer) dotsContainer.appendChild(btn);
      return btn;
    });

    function showSlide(idx) {
      slides.forEach((s, i) => {
        if (i === idx) {
          // Restart the Ken Burns animation cleanly
          s.style.animation = 'none';
          s.offsetHeight; // force reflow
          s.style.animation = '';
          s.classList.add('hero-slide--active');
        } else {
          s.classList.remove('hero-slide--active');
        }
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    function goTo(next) {
      if (next === current) return;
      current = next;
      showSlide(current);
    }

    function advance() { goTo((current + 1) % slides.length); }

    showSlide(0);
    timer = setInterval(advance, DWELL);
  })();

  // ── HERO TYPEWRITER ────────────────────────
  (function () {
    const el     = document.getElementById('hero-typewriter');
    const cursor = document.querySelector('.hero-typewriter-cursor');
    if (!el) return;
    const text = 'An emerging BIM consultancy and technology solutions provider dedicated to transforming the built environment across the UAE and GCC.';
    let i = 0;
    setTimeout(function type() {
      el.textContent = text.slice(0, i++);
      if (i <= text.length) {
        setTimeout(type, 28);
      } else {
        setTimeout(() => { if (cursor) cursor.style.opacity = '0'; }, 1200);
      }
    }, 600);
  })();

  // ── PROJECTS TYPEWRITER ────────────────────
  (function () {
    const el     = document.getElementById('projects-typewriter');
    const cursor = el ? el.closest('p').querySelector('.hero-typewriter-cursor') : null;
    if (!el) return;
    const text = 'BIM services delivered in collaboration with leading consultants, contractors, and developers across the UAE and Kingdom of Saudi Arabia.';
    let i = 0;
    setTimeout(function type() {
      el.textContent = text.slice(0, i++);
      if (i <= text.length) {
        setTimeout(type, 28);
      } else {
        setTimeout(() => { if (cursor) cursor.style.opacity = '0'; }, 1200);
      }
    }, 600);
  })();

  // ── DARK MODE ──────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('bimatrix-theme', next);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  // ── HOME BUTTON — smooth scroll or navigate ────────────
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      const isOnIndex = window.location.pathname === '/' ||
                        window.location.pathname.endsWith('index.html') ||
                        window.location.pathname.endsWith('/');
      if (isOnIndex) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  // ── STICKY HEADER ──────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ── HAMBURGER MENU ─────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navMain   = document.getElementById('nav-main');
  const overlay   = document.getElementById('nav-overlay');

  function openNav() {
    hamburger.classList.add('open');
    navMain.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }
  function closeNav() {
    hamburger.classList.remove('open');
    navMain.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  if (hamburger && navMain) hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeNav() : openNav();
  });

  // Close nav when overlay is clicked
  if (overlay) overlay.addEventListener('click', closeNav);

  // Close nav when a link is clicked (mobile)
  if (navMain) navMain.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // ── MOBILE DROPDOWN TOGGLE ─────────────────
  const hasDropdown = document.querySelectorAll('.has-dropdown');
  hasDropdown.forEach(item => {
    const toggle = item.querySelector('.nav-services-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      item.classList.toggle('open');
    });
  });

  // ── SMOOTH SCROLL ─
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        closeNav();
      }
    });
  });

  // ── ABOUT SECTION ENTRANCE ────────────────
  (function () {
    const aboutText  = document.querySelector('.about-text');
    const aboutCards = document.querySelector('.about-cards');
    if (!aboutText && !aboutCards) return;
    if (!('IntersectionObserver' in window)) {
      if (aboutText)  aboutText.classList.add('visible');
      if (aboutCards) aboutCards.classList.add('visible');
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });
    if (aboutText)  obs.observe(aboutText);
    if (aboutCards) obs.observe(aboutCards);
  })();

  // ── SCROLL FADE-IN ANIMATIONS ──────────────
  const fadeEls = document.querySelectorAll(
    '.service-card, .benefit-item, .why-card, .project-card, .model-item, .mep-block, .section-header, .contact-info, .contact-form'
  );

  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  // ── CONTACT FORM (Web3Forms) ────────────────
  window.handleForm = async (e) => {
    e.preventDefault();
    const form      = e.target;
    const submitBtn = document.getElementById('form-submit-btn');
    const successEl = document.getElementById('form-success');
    const errorEl   = document.getElementById('form-error');

    successEl.style.display = 'none';
    errorEl.style.display   = 'none';
    submitBtn.disabled      = true;
    submitBtn.textContent   = 'Sending…';

    try {
      const data = new FormData(form);
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();

      if (json.success) {
        successEl.style.display = 'block';
        form.querySelectorAll('input:not([type=hidden]), select, textarea').forEach(f => f.value = '');
        setTimeout(() => { successEl.style.display = 'none'; }, 6000);
      } else {
        errorEl.style.display = 'block';
        setTimeout(() => { errorEl.style.display = 'none'; }, 6000);
      }
    } catch {
      errorEl.style.display = 'block';
      setTimeout(() => { errorEl.style.display = 'none'; }, 6000);
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
    }
  };

  // ── ACTIVE NAV LINK ON SCROLL ──────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');

  const activateLink = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--muted)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateLink, { passive: true });

  // ── SCROLL REVEAL (index page) ─────────────────────────────────────────
  (function () {
    const items = document.querySelectorAll('.reveal-item, .service-card, .why-card, .benefit-item, .process-step');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('revealed')); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement.children);
          const idx = siblings.indexOf(e.target);
          const delay = Math.min(idx * 50, 200);
          setTimeout(() => e.target.classList.add('revealed'), delay);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    // Wait for first paint before observing so already-visible items
    // don't show a blank flash before the observer fires
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        items.forEach(el => obs.observe(el));
      });
    });
  })();

  // ── NAV ACTIVE ON SCROLL (index page) ──────────────────────────────────
  (function () {
    const pageSections = document.querySelectorAll('section[id], div[id]');
    const pageNavLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    if (!pageSections.length || !pageNavLinks.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          pageNavLinks.forEach(a => {
            a.classList.toggle('nav-active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { threshold: 0.35 });
    pageSections.forEach(s => obs.observe(s));
  })();

  // ── FAQ ACCORDION ───────────────────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── PROJECTS FILTER (projects page) ────────────────────────────────────
  document.querySelectorAll('.proj-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.proj-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.proj-card').forEach(card => {
        const match = filter === 'all' || card.dataset.region === filter;
        card.classList.toggle('proj-card--dimmed', !match);
      });
    });
  });

  // ── PROJECTS SCROLL REVEAL (projects page) ─────────────────────────────
  (function () {
    const cards = document.querySelectorAll('.proj-card');
    if (!cards.length) return;
    if (!('IntersectionObserver' in window)) { cards.forEach(el => el.classList.add('revealed')); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement.children);
          const delay = siblings.indexOf(e.target) * 100;
          setTimeout(() => e.target.classList.add('revealed'), delay);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    cards.forEach(el => obs.observe(el));
  })();


});
