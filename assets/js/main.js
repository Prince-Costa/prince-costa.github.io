/* ============================================================
   SHARED BEHAVIOURS — theme, sidebar rail, reveal-on-scroll
   Used by: index.html, projects.html
   ============================================================ */

// Theme switcher — persists across pages via localStorage.
// Multiple toggles can exist (navbar + sidebar); keep them in sync.
document.querySelectorAll('[data-current-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
};
document.querySelectorAll('.theme-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
});

// Toggle the floating VS Code-style navigation rail.
// A single edge handle controls both open and close — it stays in the same
// position, riding the sidebar border as the panel glides in/out.
const sidebar = document.getElementById('floating-sidebar');
const sidebarHandle = document.querySelector('.sidebar-handle');
const setSidebarState = (isOpen) => {
  document.body.classList.toggle('sidebar-open', isOpen);
  sidebar.classList.toggle('is-hidden', !isOpen);
  sidebarHandle.setAttribute('aria-expanded', isOpen);
  sidebarHandle.setAttribute('aria-label', isOpen ? 'Hide navigation' : 'Show navigation');
  // Body padding changes shift in-flow content, but GSAP-pinned sections
  // are position:fixed and keep their recorded offset. Re-measure pins
  // once the padding transition (0.45s) settles so they line up again.
  clearTimeout(setSidebarState._refreshTimer);
  setSidebarState._refreshTimer = setTimeout(() => {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }, 500);
};
sidebarHandle.addEventListener('click', () => setSidebarState(!document.body.classList.contains('sidebar-open')));
document.querySelectorAll('[data-sidebar-link]').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) setSidebarState(false);
  });
});

// Keep the sidebar and navbar focused on the section currently in view.
const navLinks = [...document.querySelectorAll('[data-sidebar-link], .navbar [href]')];
const sectionKey = (link) => {
  if (link.dataset.sidebarLink) return link.dataset.sidebarLink;
  if (link.dataset.pageLink) return link.dataset.pageLink;
  const hash = link.getAttribute('href')?.split('#')[1];
  if (!hash) return 'home';
  return hash === 'featured-projects' ? 'projects' : hash;
};
const setActiveSection = (key) => {
  navLinks.forEach((link) => {
    const isActive = sectionKey(link) === key;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const fileLabel = document.getElementById('sidebar-file-label');
  if (fileLabel) {
    const fileName = isProjectsPage ? 'projects.html' : 'index.html';
    fileLabel.textContent = isProjectsPage ? fileName : `${fileName} · ${key}`;
  }
};

const isProjectsPage = window.location.pathname.endsWith('projects.html');
if (isProjectsPage) {
  setActiveSection('projects');
} else {
  // Tracked in DOM/page order so the LAST section above the marker always
  // wins (array-order checks let later entries wrongly override earlier ones).
  const trackedSections = [
    { id: 'about', key: 'about' },
    { id: 'skills', key: 'skills' },
    { id: 'featured-projects', key: 'projects' },
    { id: 'projects', key: 'projects' },
    { id: 'experience', key: 'experience' },
    { id: 'clients', key: 'clients' },
    { id: 'contact', key: 'contact' },
  ];
  let activeSection = 'home';
  let scrollFrame = 0;
  const updateActiveSection = () => {
    const marker = window.innerHeight * 0.15;
    const homeSection = document.getElementById('home');
    if (homeSection && homeSection.getBoundingClientRect().bottom > marker) {
      setActiveSection('home');
      scrollFrame = 0;
      return;
    }
    activeSection = 'home';
    let closestTop = -Infinity;
    trackedSections.forEach(({ id, key }) => {
      const section = document.getElementById(id);
      const sectionTop = section?.getBoundingClientRect().top;
      if (section && sectionTop <= marker) {
        // Pick the section whose top is closest to the viewport marker.
        if (sectionTop > closestTop) {
          activeSection = key;
          closestTop = sectionTop;
        }
      }
    });
    setActiveSection(activeSection);
    scrollFrame = 0;
  };
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateActiveSection);
  }, { passive: true });
  updateActiveSection();
}

// Reveal sections on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
