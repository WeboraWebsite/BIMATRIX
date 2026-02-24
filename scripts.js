// ============================================
// BIMATRIX — scripts.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

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

  // ── SCROLL FADE-IN ANIMATIONS ──────────────
  const fadeEls = document.querySelectorAll(
    '.service-card, .mvv-card, .benefit-item, .why-card, .project-card, .model-item, .mep-block, .about-text, .about-cards, .section-header, .contact-info, .contact-form'
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

  // ── CONTACT FORM ───────────────────────────
  window.handleForm = (e) => {
    e.preventDefault();
    const successEl = document.getElementById('form-success');
    successEl.style.display = 'block';
    e.target.querySelectorAll('input, select, textarea').forEach(field => field.value = '');
    setTimeout(() => { successEl.style.display = 'none'; }, 5000);
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
    const items = document.querySelectorAll('.reveal-item, .service-card, .why-card, .benefit-item, .mvv-card, .process-step');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('revealed')); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement.children);
          const delay = siblings.indexOf(e.target) * 80;
          setTimeout(() => e.target.classList.add('revealed'), delay);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => obs.observe(el));
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
