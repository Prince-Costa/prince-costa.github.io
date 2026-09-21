/* ============================================================
   PROJECTS PAGE-ONLY BEHAVIOURS
   Used by: projects.html
   ============================================================ */

// Project archive data — single source of truth for the main panel.
// Mirrors the homepage "More Projects" carousel (index.html).
const projects = [
  {
    url: 'https://hotels.gov.bd',
    title: 'Government Hotel Management System',
    type: 'Government',
    stack: ['Laravel', 'MySQL', 'DataTable.js', 'jQuery', 'Bootstrap'],
    img: 'asset/img/porjotan.png',
    thumb: 'asset/img/projects/hotels-gov.webp',
    gallery: [
      'asset/img/porjotan.png',
      'asset/img/projects/porjotan2.png',
      'asset/img/projects/porjotan3.png',
      'asset/img/projects/porjotan4.png',
    ],
    description: 'Core booking engine, administrative management modules, and user workflows for a national hotel network — full room inventory, guest check-in/out, billing, and government-level reporting across multiple properties.',
    highlights: [
      'Room inventory with guest check-in/out and billing',
      'Administrative management modules and user workflows',
      'Government-level reporting across multiple properties',
    ],
  },
  {
    url: '#',
    title: 'Car Parts ERP Platform',
    type: 'Enterprise',
    stack: ['Laravel', 'MySQL', 'DataTable.js', 'jQuery', 'Bootstrap'],
    img: 'asset/img/car-parts.webp',
    thumb: 'asset/img/projects/car-parts.webp',
    gallery: [
      'asset/img/car-parts.webp',
      'asset/img/projects/car-parts2.png',
      'asset/img/projects/car-parts3.png',
      'asset/img/projects/remal-parts.png',
    ],
    description: 'Stock tracking with low-stock alerts, dynamic Excel/PDF reporting, and full checkout workflows for parts sales.',
    highlights: [
      'Automated low-stock alerts and supplier tracking',
      'Dynamic Excel/PDF export reporting',
      'Full checkout workflows for parts sales',
    ],
  },
  {
    url: '#',
    title: 'Aircraft Parts Accounting Platform',
    type: 'Enterprise',
    stack: ['Laravel', 'MySQL', 'DataTable.js', 'jQuery', 'Bootstrap'],
    img: 'asset/img/sky-wings.webp',
    thumb: 'asset/img/projects/sky-wings.webp',
    gallery: [
      'asset/img/sky-wings.webp',
      'asset/img/sky-wings-parts.webp',
      'asset/img/projects/sky-wings2.png',
      'asset/img/projects/sky-wings3.png',
      'asset/img/projects/sky-wings4.png',
      'asset/img/projects/sky-wings5.png',
    ],
    description: 'ERP software with RBAC security, detailed financial reporting, and itemized account management — built for aviation parts operations.',
    highlights: [
      'RBAC security across operational roles',
      'Detailed financial and sales reporting',
      'Itemized account and parts management',
    ],
  },
  {
    url: '#',
    title: 'E-commerce Inventory Management & POS Platform',
    type: 'SaaS',
    stack: ['Laravel', 'MySQL', 'DataTable.js', 'jQuery', 'Bootstrap'],
    img: 'asset/img/ibusiness-full.webp',
    thumb: 'asset/img/projects/ibusiness.webp',
    gallery: [
      'asset/img/ibusiness-full.webp',
      'asset/img/projects/ibusiness2.webp',
      'asset/img/projects/ibusiness3.webp',
      'asset/img/projects/ibusiness4.webp',
      'asset/img/projects/ibusiness5.webp',
      'asset/img/projects/ibusiness6.webp',
    ],
    description: 'Multi-vendor supported POS software with RBAC security, detailed financial reporting, and itemized account management.',
    highlights: [
      'Multi-vendor marketplace and POS workflows',
      'RBAC security and detailed financial reporting',
      'Itemized account and inventory management',
    ],
  },
  {
    url: 'https://www.rigglotel.com/',
    title: 'Rigglotel',
    type: 'Corporate',
    stack: ['Laravel', 'Bootstrap'],
    img: 'asset/img/rigglotel-full.webp',
    thumb: 'asset/img/projects/rigglotel.webp',
    gallery: [
      'asset/img/rigglotel-full.webp',
      'asset/img/projects/rigglotel2.webp',
    ],
    description: 'Empowering global telecommunications. RiggloTel delivers high-quality, carrier-grade A–Z Voice Termination, wholesale VoIP routes, bulk SMS messaging, and flexible eSIM connectivity solutions worldwide.',
    highlights: [
      'Admin panel for projects and client relations',
      'Employee workflow management',
      'Dynamic website content control',
    ],
  },
  {
    url: 'https://www.rigglotech.com/',
    title: 'Rigglotech',
    type: 'Corporate',
    stack: ['Laravel', 'MySQL', 'jQuery', 'Bootstrap'],
    img: 'asset/img/rigglotech-full.webp',
    thumb: 'asset/img/projects/rigglotech.webp',
    gallery: [
      'asset/img/rigglotech-full.webp',
      'asset/img/projects/rigglotech2.webp',
    ],
    description: 'A comprehensive showcase of Rigglotech services — includes a robust admin control panel for seamless management of projects, client relations, employee workflows, and dynamic website content.',
    highlights: [
      'Admin panel for projects and client relations',
      'Employee workflow management',
      'Dynamic website content control',
    ],
  },
  {
    url: 'https://voipforum.net/',
    title: 'Voip-forum',
    type: 'B2B Platform',
    stack: ['Laravel', 'MySQL', 'DataTable.js', 'jQuery', 'Bootstrap'],
    img: 'asset/img/voip-forum-full.webp',
    thumb: 'asset/img/projects/voip-forum.webp',
    gallery: [
      'asset/img/voip-forum-full.webp',
      'asset/img/projects/voip-forum2.webp',
    ],
    description: 'Dedicated B2B networking portal for the telecommunications industry — carriers and aggregators buy and sell wholesale VoIP routes, discuss IP telephony hardware and software, and establish trusted business partnerships globally.',
    highlights: [
      'Wholesale VoIP route marketplace',
      'IP telephony hardware & software discussions',
      'Trusted global B2B partnership building',
    ],
  },
  {
    url: 'https://www.tohaltd.com/',
    title: 'Toha-diamond',
    type: 'Construction',
    stack: ['Laravel', 'MySQL', 'DataTable.js', 'jQuery', 'Bootstrap','Dual Language'],
    img: 'asset/img/toha-diamond-full.webp',
    thumb: 'asset/img/projects/toha-diamond.webp',
    gallery: [
      'asset/img/toha-diamond-full.webp',
      'asset/img/toha-diamond-full2.webp',
      'asset/img/toha-diamond-full3.webp',
    ],
    description: 'Empowering Saudi Arabia\u2019s infrastructure and development — end-to-end building construction, MEP installation, commercial cleaning, and skilled manpower supply for efficient project execution and reliable facility management.',
    highlights: [
      'End-to-end building construction services',
      'MEP installation and commercial cleaning',
      'Skilled manpower supply and facility management',
    ],
  },
  {
    url: 'https://visastation.co.uk/',
    title: 'Visa-station',
    type: 'Consultancy',
    stack: ['Laravel', 'MySQL', 'DataTable.js', 'jQuery', 'Bootstrap'],
    img: 'asset/img/visastation-full.webp',
    thumb: 'asset/img/projects/visa-station.webp',
    gallery: [
      'asset/img/visastation-full.webp',
      'asset/img/visastation-full2.webp',
    ],
    description: 'Comprehensive UK legal and immigration consultancy — student and skilled worker visas, family reunification, Indefinite Leave to Remain (ILR), and British citizenship applications guided by specialist advisors.',
    highlights: [
      'Student & skilled worker visa guidance',
      'Family reunification and ILR applications',
      'British citizenship support for individuals and corporates',
    ],
  },
  {
    url: 'https://lpkeducation.one/',
    title: 'Lpk-education',
    type: 'Education',
    stack: ['PHP','Bootstrap','jQuery'],
    img: 'asset/img/lpk-full.webp',
    thumb: 'asset/img/projects/lpk-edu.webp',
    gallery: [
      'asset/img/lpk-full.webp',
      'asset/img/lpk-full2.webp',
      'asset/img/lpk-full3.webp',
    ],
    description: 'Empowering career growth through practical tech and vocational training — hands-on courses in web development, graphics design, digital marketing, and IT skills designed to build job-ready expertise.',
    highlights: [
      'Hands-on web development courses',
      'Graphics design and digital marketing training',
      'Job-ready IT skill tracks',
    ],
  },
  {
    url: 'https://rigglosim.com/',
    title: 'Rigglosim',
    type: 'E-commerce',
    stack: ['Shopify','jQuery','Bootstrap'],
    img: 'asset/img/rigglo-sim-full.webp',
    thumb: 'asset/img/projects/rigglo-sim.webp',
    gallery: [
      'asset/img/rigglo-sim-full.webp',
      'asset/img/projects/rigglo-sim2.webp',
      'asset/img/projects/rigglo-sim3.webp',
      'asset/img/projects/rigglo-sim4.webp',
    ],
    description: 'Global eSIM & travel data solutions — connect instantly with local data plans across the globe without expensive roaming fees.',
    highlights: [
      'Global eSIM catalogue by destination',
      'Instant connectivity without roaming fees',
      'Shopify storefront with travel data plans',
    ],
  },
];

const $ = (id) => document.getElementById(id);
const els = {
  url: $('archive-url'),
  open: $('archive-open'),
  kicker: $('archive-kicker'),
  type: $('archive-type'),
  title: $('archive-title'),
  stack: $('archive-stack'),
  description: $('archive-description'),
  highlights: $('archive-highlights'),
  visit: $('archive-visit'),
  count: $('archive-count'),
  list: $('archive-list'),
  main: $('archive-main'),
  carousel: $('archive-carousel'),
  track: $('carousel-track'),
  prev: $('carousel-prev'),
  next: $('carousel-next'),
  dots: $('carousel-dots'),
  counter: $('carousel-counter'),
  loading: $('carousel-loading'),
};

const isPlaceholder = (url) => !url || url === '#';

/* ============================================================
   PROJECT CAROUSEL (archive viewport) — lazy, on-demand loading
   Images are fetched only when a project is selected (AJAX-style
   HTTP GET via Image preloading) and cached per URL. Works on
   static hosts like GitHub Pages.
   ============================================================ */
const carousel = {
  images: [],
  index: 0,
  autoplay: null,
  cache: new Set(),      // URLs already fully downloaded
  requestToken: 0,       // guards against out-of-order responses
};

// Resolve a URL once, via the browser cache + Image preload.
// Returns a promise that settles when the image is downloaded.
function fetchImage(src) {
  return new Promise((resolve) => {
    if (carousel.cache.has(src)) return resolve(src);
    const img = new Image();
    img.onload = () => { carousel.cache.add(src); resolve(src); };
    img.onerror = () => resolve(null); // don't block the whole gallery
    img.src = src;
  });
}

function setLoading(on) {
  els.loading.classList.toggle('is-active', on);
  els.loading.setAttribute('aria-hidden', on ? 'false' : 'true');
  els.carousel.classList.toggle('is-loading', on);
}

async function renderCarousel(project) {
  const sources = project.gallery && project.gallery.length
    ? project.gallery
    : [project.img];
  const token = ++carousel.requestToken;
  carousel.index = 0;
  stopAutoplay();

  const pending = sources.filter((src) => !carousel.cache.has(src));
  if (pending.length) setLoading(true);

  // Download all screenshots for this project in parallel
  await Promise.all(sources.map(fetchImage));

  // User clicked another project while this one was loading
  if (token !== carousel.requestToken) return;
  setLoading(false);

  carousel.images = sources;

  els.track.replaceChildren(...sources.map((src) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = project.title;
    img.draggable = false;
    slide.appendChild(img);
    return slide;
  }));

  els.dots.replaceChildren(...sources.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to screenshot ${i + 1}`);
    dot.addEventListener('click', () => showSlide(i));
    return dot;
  }));

  const hasGallery = sources.length > 1;
  els.carousel.classList.toggle('has-gallery', hasGallery);
  showSlide(0);
  startAutoplay();
}

function showSlide(index) {
  const total = carousel.images.length;
  if (!total) return;
  carousel.index = ((index % total) + total) % total;
  els.track.style.transform = `translateX(-${carousel.index * 100}%)`;

  els.dots.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carousel.index);
  });
  els.counter.textContent = `${carousel.index + 1} / ${total}`;
}

function startAutoplay() {
  stopAutoplay();
  if (carousel.images.length < 2) return;
  carousel.autoplay = setInterval(() => showSlide(carousel.index + 1), 4000);
}

function stopAutoplay() {
  if (carousel.autoplay) {
    clearInterval(carousel.autoplay);
    carousel.autoplay = null;
  }
}

els.prev.addEventListener('click', () => {
  showSlide(carousel.index - 1);
  startAutoplay();
});
els.next.addEventListener('click', () => {
  showSlide(carousel.index + 1);
  startAutoplay();
});

// Pause autoplay while hovering the viewport
els.carousel.addEventListener('mouseenter', stopAutoplay);
els.carousel.addEventListener('mouseleave', startAutoplay);

// Touch swipe
let touchStartX = null;
els.carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  stopAutoplay();
}, { passive: true });
els.carousel.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  const delta = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 40) showSlide(carousel.index + (delta < 0 ? 1 : -1));
  touchStartX = null;
  startAutoplay();
});

// Keyboard arrows when the viewport is focused
els.carousel.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { showSlide(carousel.index - 1); startAutoplay(); }
  if (e.key === 'ArrowRight') { showSlide(carousel.index + 1); startAutoplay(); }
});

function renderProject(index) {
  const p = projects[index];
  if (!p) return;

  els.url.textContent = isPlaceholder(p.url) ? 'internal.demo/build' : p.url;
  els.open.href = isPlaceholder(p.url) ? '#' : p.url;
  renderCarousel(p);
  els.kicker.textContent = `${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')} · FEATURED WORK`;
  els.type.textContent = p.type;
  els.title.textContent = p.title;

  els.stack.replaceChildren(...p.stack.map((tech) => {
    const badge = document.createElement('span');
    badge.className = 'tech-badge';
    badge.textContent = tech;
    return badge;
  }));

  els.description.textContent = p.description;

  els.highlights.replaceChildren(...p.highlights.map((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  }));

  const visitEnabled = !isPlaceholder(p.url);
  els.visit.href = visitEnabled ? p.url : '#contact';
  els.visit.target = visitEnabled ? '_blank' : '_self';
  els.visit.innerHTML = visitEnabled
    ? 'Visit Project <i class="fa-solid fa-arrow-up-right-from-square ms-2"></i>'
    : 'Request a Demo <i class="fa-solid fa-paper-plane ms-2"></i>';
  if (!visitEnabled) els.visit.removeAttribute('rel');
  else els.visit.setAttribute('rel', 'noopener');

  // Highlight the active sidebar entry (featured link counts as an entry)
  const featuredLink = els.list.querySelector('.archive-item-featured');
  els.list.querySelectorAll('.archive-item').forEach((item) => {
    item.classList.toggle('active', !item.dataset.featured && Number(item.dataset.index) === index);
  });
  if (featuredLink) featuredLink.classList.remove('active');

  // Replay the entrance animation
  els.main.classList.remove('is-switching');
  void els.main.offsetWidth;
  els.main.classList.add('is-switching');
}

els.count.textContent = String(projects.length).padStart(2, '0');

els.list.addEventListener('click', (e) => {
  const item = e.target.closest('.archive-item');
  if (!item || item.dataset.index === undefined) return;
  renderProject(Number(item.dataset.index));
  // Bring the project detail view into view (sidebar stacks below it on mobile)
  els.main.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Support deep links: projects.html?project=2
const initial = Number(new URLSearchParams(location.search).get('project'));
renderProject(Number.isInteger(initial) && initial >= 0 && initial < projects.length ? initial : 0);
