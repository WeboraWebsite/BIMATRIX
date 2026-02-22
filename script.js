// c:\Work Material\Bimatrix\script.js

document.addEventListener('DOMContentLoaded', () => {

    // ─── YEAR ───────────────────────────────────────────────────────────────
    document.getElementById('year').textContent = new Date().getFullYear();

    // ─── HEADER SCROLL SHADOW ────────────────────────────────────────────────
    const header = document.getElementById('main-header');
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
            scrollTopBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            scrollTopBtn.classList.remove('visible');
        }
        updateActiveNav();
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── HAMBURGER MENU ──────────────────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navbar.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navbar.classList.remove('open');
        });
    });

    // ─── ACTIVE NAV LINK ─────────────────────────────────────────────────────
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = 'home';

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ─── ANIMATED COUNTERS ───────────────────────────────────────────────────
    const counters = document.querySelectorAll('.counter');
    let counterStarted = false;

    function startCounters() {
        if (counterStarted) return;
        const statsBanner = document.querySelector('.stats-banner');
        const rect = statsBanner.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            counterStarted = true;
            counters.forEach(counter => {
                const target = parseInt(counter.closest('.stat-item').dataset.count);
                let current = 0;
                const increment = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = current;
                }, 25);
            });
        }
    }

    window.addEventListener('scroll', startCounters);
    startCounters();

    // ─── SERVICES DATA ───────────────────────────────────────────────────────
    const services = [
        {
            icon: '🏗️',
            title: 'BIM Management',
            desc: 'End-to-end BIM coordination and management across all project stages, ensuring data consistency and collaborative workflows.'
        },
        {
            icon: '🔍',
            title: 'Clash Detection',
            desc: 'Advanced multi-discipline clash detection using Navisworks and Revit, resolving conflicts before they become costly on site.'
        },
        {
            icon: '📅',
            title: '4D / 5D BIM',
            desc: 'Time and cost-integrated BIM models providing powerful scheduling insights and accurate quantity take-offs throughout construction.'
        },
        {
            icon: '🎓',
            title: 'BIM Training',
            desc: 'Tailored BIM training programmes for contractors, consultants, and clients looking to build in-house capability.'
        },
        {
            icon: '🌐',
            title: 'Digital Twin',
            desc: 'Creating intelligent digital replicas of built assets to support ongoing operations, maintenance, and future planning.'
        },
        {
            icon: '📐',
            title: 'Point Cloud Surveys',
            desc: 'High-accuracy laser scanning and point cloud to BIM conversion for existing structures and renovation projects.'
        }
    ];

    const servicesGrid = document.getElementById('services-grid');
    services.forEach(s => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <span class="service-icon">${s.icon}</span>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
        `;
        servicesGrid.appendChild(card);
    });

    // ─── PROJECTS DATA ───────────────────────────────────────────────────────
    const projects = [
        {
            emoji: '🏢',
            bg: 'linear-gradient(135deg, #bfb3a0 0%, #d4cbbf 100%)',
            title: 'City Centre Office Tower',
            category: 'commercial',
            tag: 'Commercial',
            desc: 'Full BIM management for a 28-storey commercial development in central London.',
            year: '2023', size: '45,000 m²'
        },
        {
            emoji: '🏠',
            bg: 'linear-gradient(135deg, #bfb3a0 0%, #cfc4b5 100%)',
            title: 'Riverside Residential Quarter',
            category: 'residential',
            tag: 'Residential',
            desc: '350-unit mixed-tenure housing development with full federated BIM model delivery.',
            year: '2023', size: '32,000 m²'
        },
        {
            emoji: '🌉',
            bg: 'linear-gradient(135deg, #706768 0%, #8a8080 100%)',
            title: 'M25 Junction Upgrade',
            category: 'infrastructure',
            tag: 'Infrastructure',
            desc: 'Complex infrastructure BIM for a major motorway junction improvement scheme.',
            year: '2022', size: '12 km'
        },
        {
            emoji: '🏥',
            bg: 'linear-gradient(135deg, #bfb3a0 0%, #a8997e 100%)',
            title: 'Regional Hospital Expansion',
            category: 'commercial',
            tag: 'Commercial',
            desc: 'Healthcare sector BIM coordination for a large NHS hospital extension project.',
            year: '2022', size: '18,000 m²'
        },
        {
            emoji: '🏘️',
            bg: 'linear-gradient(135deg, #d4cbbf 0%, #bfb3a0 100%)',
            title: 'Urban Housing Regeneration',
            category: 'residential',
            tag: 'Residential',
            desc: 'Phased regeneration of 600 social housing units using ISO 19650-compliant BIM.',
            year: '2021', size: '58,000 m²'
        },
        {
            emoji: '🚊',
            bg: 'linear-gradient(135deg, #706768 0%, #9c9293 100%)',
            title: 'Tram Network Extension',
            category: 'infrastructure',
            tag: 'Infrastructure',
            desc: 'Digital delivery of a 7km tram extension including stations and depot facilities.',
            year: '2021', size: '7 km'
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');

    function renderProjects(filter) {
        projectsGrid.innerHTML = '';
        projects.forEach(p => {
            if (filter !== 'all' && p.category !== filter) return;
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-category', p.category);
            card.innerHTML = `
                <div class="project-thumb" style="background:${p.bg}">
                    <span>${p.emoji}</span>
                    <span class="project-tag">${p.tag}</span>
                </div>
                <div class="project-info">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <div class="project-meta">
                        <span>📅 ${p.year}</span>
                        <span>📏 ${p.size}</span>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    renderProjects('all');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    // ─── TESTIMONIALS ────────────────────────────────────────────────────────
    const testimonials = [
        {
            quote: "BIMATRIX transformed our project delivery. Their BIM coordination eliminated costly clashes and saved us six weeks on programme. Exceptional team.",
            name: "Sarah Mitchell",
            role: "Project Director, Apex Developments",
            initials: "SM"
        },
        {
            quote: "The 4D BIM sequencing provided by BIMATRIX gave our site team clarity they'd never had before. An outstanding service from start to finish.",
            name: "James Hargreaves",
            role: "Senior Engineer, Crestline Infrastructure",
            initials: "JH"
        },
        {
            quote: "From initial setup to ISO 19650 compliance, BIMATRIX guided us every step of the way. Their training programme has upskilled our entire team.",
            name: "Priya Nair",
            role: "BIM Lead, Vertex Architecture",
            initials: "PN"
        }
    ];

    const wrapper = document.getElementById('testimonials-wrapper');
    const dotsContainer = document.getElementById('testimonial-dots');
    let currentSlide = 0;
    let slideInterval;

    testimonials.forEach((t, i) => {
        const slide = document.createElement('div');
        slide.className = `testimonial-slide${i === 0 ? ' active' : ''}`;
        slide.innerHTML = `
            <div class="testimonial-card">
                <p>"${t.quote}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${t.initials}</div>
                    <div class="author-info">
                        <strong>${t.name}</strong>
                        <span>${t.role}</span>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = `dot-btn${i === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        document.querySelectorAll('.testimonial-slide').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.dot-btn').forEach(d => d.classList.remove('active'));
        currentSlide = index;
        document.querySelectorAll('.testimonial-slide')[currentSlide].classList.add('active');
        document.querySelectorAll('.dot-btn')[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % testimonials.length);
    }

    slideInterval = setInterval(nextSlide, 5000);
    wrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
    wrapper.addEventListener('mouseleave', () => { slideInterval = setInterval(nextSlide, 5000); });

    // ─── CONTACT FORM ────────────────────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fname = document.getElementById('fname').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!fname || !email || !message) {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.className = 'error';
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            formMessage.textContent = `Thank you, ${fname}! We'll be in touch shortly.`;
            formMessage.className = 'success';
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 1500);
    });

    // ─── NEWSLETTER ──────────────────────────────────────────────────────────
    document.getElementById('newsletter-btn').addEventListener('click', () => {
        const input = document.getElementById('newsletter-email');
        const msg = document.getElementById('newsletter-msg');
        const val = input.value.trim();

        if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            msg.textContent = 'Please enter a valid email address.';
            msg.style.color = '#e07070';
            return;
        }

        msg.textContent = '✓ You\'re subscribed!';
        msg.style.color = '#bfb3a0';
        input.value = '';
    });

    // ─── SCROLL REVEAL ───────────────────────────────────────────────────────
    const revealElements = document.querySelectorAll(
        '.service-card, .project-card, .stat-item, .about-text, .about-image, .contact-info, .contact-form-wrapper'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

});