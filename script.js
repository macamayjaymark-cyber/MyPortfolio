/* =============================================
   JAYMARK MACAMAY — PORTFOLIO  |  script.js
   ============================================= */

/* ===========================================================
   PROJECT DATA
   HOW TO EDIT A PROJECT:
     - title: the project name
     - desc:  short description
     - image: preview screenshot
              → use a local file: 'assets/images/taskflow.png'
              → or an online URL: 'https://yoursite.com/img.jpg'
     - tags:  tech stack badges
     - link:  URL to live site or GitHub repo
   HOW TO ADD A PROJECT: copy one { } block and paste below
   HOW TO REMOVE: delete the entire { } block
=========================================================== */
const projects = [
  {
    icon: '',
    title: 'Panabo Finess Gym',
    // ↓ Replace with your real screenshot: 'assets/images/taskflow.png'
    image: 'assets/images/project-1.png',
    desc: 'A minimalist task manager with drag-and-drop, keyboard shortcuts and offline sync via IndexedDB.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#'  // ↓ Replace with your live URL or GitHub link
  },
  {
    icon: '',
    title: 'Boostore Management System',
    // ↓ Replace with your real screenshot: 'assets/images/weatherlens.png'
    image: 'assets/images/project-2.png',
    desc: 'Beautifully animated weather app pulling real-time data from multiple API providers.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#'
  },
];

/* ---- RENDER PROJECT CARDS ---- */
const grid = document.getElementById('projectGrid');
if (grid) {
  grid.innerHTML = projects.map((p, i) => {
    // Only open in new tab if it's a real URL (not a placeholder #)
    const isRealLink = p.link && p.link !== '#';
    const linkAttrs  = isRealLink ? `href="${p.link}" target="_blank" rel="noopener"` : `href="#" onclick="return false;"`;
    return `
    <article class="card" style="animation-delay:${i * 0.08}s">
      <!-- Project banner image -->
      <a ${linkAttrs} class="card-img-wrap">
        <img src="${p.image}" alt="${p.title} screenshot" class="card-img" loading="lazy" />
        ${isRealLink ? `<span class="card-img-overlay">View Project ↗</span>` : `<span class="card-img-overlay">Preview 🖼️</span>`}
      </a>
      <div class="card-body">
        <div class="card-icon">${p.icon}</div>
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="tags">
          ${p.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>
    </article>`;
  }).join('');
}

/* ---- PAGE LOADER ---- */
const pageLoader = document.getElementById('pageLoader');
// Minimum display time (ms) so loader doesn't flash too fast
const MIN_LOAD_TIME = 1200;
const startTime = Date.now();

window.addEventListener('load', () => {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, MIN_LOAD_TIME - elapsed);
  setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.add('loader--hidden');
      // Remove from DOM after fade-out animation finishes
      pageLoader.addEventListener('transitionend', () => pageLoader.remove(), { once: true });
    }
  }, remaining);
});

/* ---- THEME TOGGLE ---- */
const toggle = document.getElementById('themeToggle');
const root   = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.setAttribute('data-theme', 'light');
updateThemeIcon();

if (toggle) {
  toggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  if (!toggle) return;
  const isLight = root.getAttribute('data-theme') === 'light';
  toggle.textContent = isLight ? '☀️' : '🌙';
}

/* ---- NAVBAR SCROLL EFFECT ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ---- MOBILE HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ---- ACTIVE NAV LINK HIGHLIGHT ---- */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
