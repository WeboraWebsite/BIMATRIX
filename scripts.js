// ============================================
// BIMATRIX — scripts.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── DARK MODE ──────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');

  // Always start on light mode for new users
  const savedTheme = localStorage.getItem('bimatrix-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('bimatrix-theme', next);
  }

  themeToggle.addEventListener('click', toggleTheme);

  // Keyboard accessibility
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // ── STICKY HEADER ──────────────────────────
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ── HAMBURGER MENU ─────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navMain   = document.getElementById('nav-main');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMain.classList.toggle('open');
    document.body.style.overflow = navMain.classList.contains('open') ? 'hidden' : '';
  });

  // Close nav when a link is clicked (mobile)
  navMain.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMain.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── MOBILE DROPDOWN TOGGLE ─────────────────
  const hasDropdown = document.querySelectorAll('.has-dropdown');
  hasDropdown.forEach(item => {
    const anchor = item.querySelector('a');
    anchor.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  // ── SMOOTH SCROLL (backup for older browsers) ─
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
        // Close mobile nav
        hamburger.classList.remove('open');
        navMain.classList.remove('open');
        document.body.style.overflow = '';
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
        // Stagger siblings inside the same parent grid
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

});
