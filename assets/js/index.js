/* ============================================================
   HOMEPAGE-ONLY BEHAVIOURS
   Used by: index.html
   ============================================================ */

// Show the floating back-to-top control after the page has been scrolled,
// and reflect page scroll progress on its circular ring.
const backToTop = document.querySelector('.back-to-top');
const progressBar = document.querySelector('.progress-ring-bar');
const ringRadius = progressBar.r.baseVal.value;
const ringCircumference = 2 * Math.PI * ringRadius;
progressBar.style.strokeDasharray = ringCircumference;
const updateBackToTop = () => {
  const scrolled = window.scrollY;
  backToTop.classList.toggle('visible', scrolled > 320);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0;
  progressBar.style.strokeDashoffset = ringCircumference * (1 - progress);
};
window.addEventListener('scroll', updateBackToTop, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
updateBackToTop();

// Skills category tabs
document.querySelectorAll('[data-skill-tab]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.skillTab;
    document.querySelectorAll('[data-skill-tab]').forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', selected);
      item.tabIndex = selected ? 0 : -1;
    });
    document.querySelectorAll('[data-skill-panel]').forEach((panel) => {
      const visible = panel.dataset.skillPanel === category;
      panel.hidden = !visible;
      panel.classList.toggle('active', visible);
    });
  });
});

// Testimonial swiper
new Swiper('.testimonial-swiper', {
  loop: true,
  speed: 600,
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { el: '.testimonial-pagination', clickable: true },
  navigation: { nextEl: '.btn-next', prevEl: '.btn-prev' },
});

// Featured projects — GSAP scroll-pinned stack
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector('.featured-projects-component');
const slides = gsap.utils.toArray('.project-slide');
const urlDisplay = document.getElementById('active-project-url');
const actionIcon = document.querySelector('.browser-action-icon');
const titleDisplay = document.getElementById('active-project-title');
const descriptionDisplay = document.getElementById('active-project-description');
const stackDisplay = document.getElementById('active-project-stack');
const linkDisplay = document.getElementById('active-project-link');
const kickerDisplay = document.querySelector('.active-project-kicker');

const updateProjectDetails = (index) => {
  const slide = slides[index];
  const currentUrl = slide.getAttribute('data-url');
  const title = slide.querySelector('.project-name')?.textContent.trim();
  const description = slide.getAttribute('data-description')?.trim()
    || slide.querySelector('.project-text')?.textContent.trim();
  const badges = [...slide.querySelectorAll('.tech-badge')];

  if (titleDisplay && title) titleDisplay.textContent = title;
  if (descriptionDisplay && description) descriptionDisplay.textContent = description;
  if (stackDisplay) {
    stackDisplay.replaceChildren(...badges.map((badge) => {
      const tag = document.createElement('span');
      tag.className = 'tech-badge';
      tag.textContent = badge.textContent.trim();
      return tag;
    }));
  }
  if (kickerDisplay) kickerDisplay.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')} · FEATURED WORK`;
  const hasUrl = Boolean(currentUrl);
  if (linkDisplay) {
    linkDisplay.href = hasUrl ? currentUrl : '#';
    linkDisplay.classList.toggle('d-none', !hasUrl);
  }
  if (urlDisplay) {
    urlDisplay.textContent = hasUrl ? currentUrl : 'private.internal — not publicly hosted';
    urlDisplay.classList.toggle('no-url', !hasUrl);
  }
  if (actionIcon) {
    actionIcon.href = hasUrl ? currentUrl : '#';
    actionIcon.classList.toggle('d-none', !hasUrl);
  }
};

// Tablet & mobile block: testimonial-style swiper — one slide per project with
// media card (browser frame look) over a content card. Built from the same
// .project-slide data that drives the desktop pinned stack.
const fpSwiperWrap = document.querySelector('.fpMobileSwiper');
if (fpSwiperWrap) {
  const wrapper = fpSwiperWrap.querySelector('.swiper-wrapper');
  slides.forEach((slide) => {
    const url = slide.getAttribute('data-url');
    const img = slide.querySelector('img');
    const stack = [...slide.querySelectorAll('.tech-badge')]
      .map((b) => `<span class="tech-badge">${b.textContent.trim()}</span>`).join('');
    const title = slide.querySelector('.project-name')?.textContent.trim() || '';
    const description = slide.getAttribute('data-description')?.trim() || '';

    const slideEl = document.createElement('div');
    slideEl.className = 'swiper-slide';
    slideEl.innerHTML = `
      <div class="fp-mobile-slide">
        <div class="fp-mobile-media">
          <div class="fp-mobile-browser-bar">
            <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
            <span class="fp-mobile-url">${url ? url.replace(/^https?:\/\//, '') : 'private.internal'}</span>
            <a class="fp-mobile-action" href="${url || 'projects.html'}" ${url ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="Visit project">
              <i class="fa-solid ${url ? 'fa-arrow-up-right-from-square' : 'fa-lock'}"></i>
            </a>
          </div>
          <img src="${img?.src || ''}" alt="${title}" loading="lazy" />
        </div>
        <div class="fp-mobile-content">
          <div class="tech-stack mb-2">${stack}</div>
          <h3 class="fp-mobile-title">${title}</h3>
          <p class="fp-mobile-desc">${description}</p>
          <a class="fp-mobile-link" href="${url || 'projects.html'}" ${url ? 'target="_blank" rel="noopener noreferrer"' : ''}>
            ${url ? 'Explore project <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>' : 'View details <i class="fa-solid fa-arrow-right ms-1"></i>'}
          </a>
        </div>
      </div>`;
    wrapper.appendChild(slideEl);
  });

  new Swiper(fpSwiperWrap, {
    loop: true,
    speed: 600,
    spaceBetween: 24,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.fp-mobile-pagination', clickable: true },
  });
}

updateProjectDetails(0);

// Desktop/laptop (>=992px): scroll-pinned slide stack. Below that the CSS
// switches to a static three-block flow (details → stacked images → list),
// so the pin timeline only exists in the desktop context.
const fpMedia = gsap.matchMedia();
fpMedia.add('(min-width: 992px)', () => {
  // Set initial state: Slide 1 visible, subsequent slides pushed down off-screen
  gsap.set(slides.slice(1), { yPercent: 100 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      // "transform" keeps the pinned section inside the document flow instead
      // of position:fixed, so body padding (sidebar) can't shift it horizontally.
      pinType: 'transform',
      scrub: 1,
      start: 'top top',
      invalidateOnRefresh: true,
      // Give each featured card two viewport-heights of reading distance.
      end: () => '+=' + (window.innerHeight * slides.length * 2),
      onUpdate: (self) => {
        // Determine active slide based on scroll progress
        const progress = self.progress;
        const index = Math.min(
          Math.floor(progress * slides.length),
          slides.length - 1
        );
        updateProjectDetails(index);
      },
    },
  });

  // Animate each slide up over the previous one
  slides.forEach((slide, i) => {
    if (i === 0) return; // Skip first slide as it is already in view
    tl.to(slide, { yPercent: 0, ease: 'none' });
  });
  // matchMedia auto-reverts the set + timeline when the breakpoint is left.
});

// Animated typed title
new Typed('#typed-title', {
  strings: ['PHP Developer', 'Laravel Specialist', 'ERP System Architect'],
  typeSpeed: 65,
  backSpeed: 38,
  backDelay: 1600,
  loop: true,
  smartBackspace: true,
});

// Showcase carousel — 3 full-width slides with captions
const showcaseEl = document.querySelector('.showcaseSwiper');
const showcaseSwiper = new Swiper(showcaseEl, {
  loop: true,
  // The deck cards animate themselves; Swiper only changes active classes.
  speed: 0,
  grabCursor: true,
  slideToClickedSlide: true,
  pagination: { el: '.showcase-pagination', clickable: true },
  keyboard: { enabled: true },
  mousewheel: { forceToAxis: true, releaseOnEdges: true },
});

let showcaseAutoplayTimer = null;

const stopShowcaseAutoplay = () => {
  if (showcaseAutoplayTimer !== null) {
    window.clearInterval(showcaseAutoplayTimer);
    showcaseAutoplayTimer = null;
  }
};

const startShowcaseAutoplay = () => {
  stopShowcaseAutoplay();
  showcaseAutoplayTimer = window.setInterval(() => {
    showcaseSwiper.slideNext();
  }, 4500);
};

const resetShowcaseAutoplay = () => {
  startShowcaseAutoplay();
};

showcaseEl.addEventListener('mouseenter', stopShowcaseAutoplay);
showcaseEl.addEventListener('mouseleave', startShowcaseAutoplay);
showcaseEl.addEventListener('touchstart', stopShowcaseAutoplay, { passive: true });
showcaseEl.addEventListener('touchend', () => {
  resetShowcaseAutoplay();
}, { passive: true });
showcaseEl.addEventListener('touchcancel', () => {
  resetShowcaseAutoplay();
}, { passive: true });
showcaseEl.addEventListener('click', (event) => {
  if (event.target.closest('.swiper-slide, .showcase-pagination')) {
    resetShowcaseAutoplay();
  }
});
startShowcaseAutoplay();

// Projects carousel — 3D focus: 1 featured center card + 2 side cards.
const projectSwiperEl = document.querySelector('.projectSwiper');
const baseProjectCount = projectSwiperEl
  ? projectSwiperEl.querySelector('.swiper-wrapper').children.length
  : 0;

const projectSwiper = new Swiper('.projectSwiper', {
  effect: 'coverflow',
  centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 24,
  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 18 },
    768: { slidesPerView: 3, spaceBetween: 24 },
  },
  loop: true,
  grabCursor: true,
  speed: 700,
  autoplay: { delay: 4500, disableOnInteraction: false },
  // autoplay: false,
  keyboard: { enabled: true },
  coverflowEffect: {
    rotate: 12,      // subtle 3D tilt on the side cards
    stretch: 0,
    depth: 40,
    modifier: 1,
    slideShadows: false,
  },
});

// Full-card navigation to the internal detail page. The top-right quick icon
// and the Live Demo button keep their own external links — clicks inside any
// <a> never trigger card navigation.
document.querySelectorAll('.projectSwiper .cover-card[data-project-url]').forEach((card) => {
  // Swiper turns drags into synthetic clicks — suppress navigation when the
  // pointer travelled (a real click stays within a few pixels).
  let pointerStart = null;
  card.addEventListener('pointerdown', (e) => { pointerStart = { x: e.clientX, y: e.clientY }; });

  const isDrag = (e) => {
    if (!pointerStart) return false;
    const moved = Math.hypot(e.clientX - pointerStart.x, e.clientY - pointerStart.y);
    pointerStart = null;
    return moved > 8;
  };

  const openDetails = () => { window.location.assign(card.dataset.projectUrl); };

  card.addEventListener('click', (event) => {
    if (isDrag(event)) return;
    if (event.target.closest('a')) return; // quick icon / Live Demo handle themselves
    openDetails();
  });
  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openDetails();
  });
});

// Numeric pagination bar (sits in .project-controls BELOW the swiper, so it
// never overlaps the card viewport): prev arrow, numbers, next arrow.
const projectPager = projectSwiperEl ? document.querySelector('.project-controls .project-pagination') : null;
if (projectPager && baseProjectCount) {
  // Arrows live at the far edges of .project-controls; numbers between them.
  const controlsEl = projectPager.parentElement;
  const makeBtn = (label, className) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = className;
    btn.innerHTML = label;
    return btn;
  };

  const prevBtn = makeBtn('<i class="fa-solid fa-angle-left"></i>', 'page-btn page-btn--nav');
  prevBtn.setAttribute('aria-label', 'Previous project');
  prevBtn.addEventListener('click', () => projectSwiper.slidePrev());
  const nextBtn = makeBtn('<i class="fa-solid fa-angle-right"></i>', 'page-btn page-btn--nav');
  nextBtn.setAttribute('aria-label', 'Next project');
  nextBtn.addEventListener('click', () => projectSwiper.slideNext());
  controlsEl.prepend(prevBtn);
  controlsEl.append(nextBtn);

  const renderPages = (active) => {
    // Window of numbers around the active page, e.g. 1 … 4 5 6 … 11
    const pages = new Set([0, baseProjectCount - 1, active - 1, active, active + 1]);
    const ordered = [...pages]
      .filter((p) => p >= 0 && p < baseProjectCount)
      .sort((a, b) => a - b);

    // Full rebuild each time — no stale elements can accumulate.
    projectPager.replaceChildren();

    let previous = -1;
    ordered.forEach((page) => {
      if (previous >= 0 && page - previous > 1) {
        const dots = document.createElement('span');
        dots.className = 'page-ellipsis';
        dots.textContent = '…';
        projectPager.appendChild(dots);
      }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'page-btn' + (page === active ? ' active' : '');
      btn.textContent = page + 1;
      btn.setAttribute('aria-label', `Go to project ${page + 1}`);
      btn.setAttribute('aria-current', page === active ? 'page' : 'false');
      btn.addEventListener('click', () => projectSwiper.slideToLoop(page));
      projectPager.appendChild(btn);
      previous = page;
    });
  };

  const syncPager = () => renderPages(projectSwiper.realIndex % baseProjectCount);
  projectSwiper.on('slideChange', syncPager);
  syncPager();
}

// About metrics — 7-segment count-up (zero-padded like an LCD watch)
const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    metricsObserver.unobserve(entry.target);
    entry.target.querySelectorAll('.metric-count').forEach((el) => {
      const target = Number(el.dataset.target) || 0;
      const digits = String(target).length;
      const duration = 1400 + digits * 400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(eased * target);
        el.textContent = String(value).padStart(digits, '0');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  });
}, { threshold: 0.4 });
const metricsEl = document.querySelector('.about-metrics');
if (metricsEl) metricsObserver.observe(metricsEl);

// Contact form — EmailJS delivery with honeypot, reCAPTCHA v3, and cooldown.
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('cf-status');
const submitBtn = document.getElementById('cf-submit');
const btnText = submitBtn.querySelector('.cf-btn-text');
const btnLoading = submitBtn.querySelector('.cf-btn-loading');
const honeypot = form.elements.website;
const recaptchaToken = document.getElementById('recaptcha-token');
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAILJS_PUBLIC_KEY = '1klBRVxE70Egr_CfW';
const EMAILJS_SERVICE_ID = 'service_wy3zkya';
const EMAILJS_TEMPLATE_ID = 'template_1lrfjtb';
const RECAPTCHA_SITE_KEY = '6LdEtr4tAAAAADdXgav3m9YqUKqICdxuq68WxlfA';
const COOLDOWN_SECONDS = 60;
const REQUEST_TIMEOUT_MS = 15000;
let cooldownTimer = null;

const fields = {
  name: document.getElementById('cf-name'),
  email: document.getElementById('cf-email'),
  subject: document.getElementById('cf-subject'),
  message: document.getElementById('cf-message'),
};

function validateField(input) {
  const field = input.closest('.form-field');
  let ok = input.value.trim() !== '';
  if (input.type === 'email') ok = emailRe.test(input.value.trim());
  field.classList.toggle('invalid', !ok);
  return ok;
}

Object.values(fields).forEach((input) => {
  input.addEventListener('input', () => input.closest('.form-field').classList.remove('invalid'));
});

function setStatus(type, msg) {
  statusEl.className = 'cf-status ' + type;
  statusEl.textContent = msg;
  statusEl.classList.remove('d-none');
}

const setLoading = (isLoading) => {
  submitBtn.disabled = isLoading;
  btnText.classList.toggle('d-none', isLoading);
  btnLoading.classList.toggle('d-none', !isLoading);
};

const startCooldown = () => {
  let remaining = COOLDOWN_SECONDS;
  submitBtn.disabled = true;
  btnText.classList.remove('d-none');
  btnLoading.classList.add('d-none');
  btnText.textContent = `Sent · try again in ${remaining}s`;
  cooldownTimer = window.setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      window.clearInterval(cooldownTimer);
      cooldownTimer = null;
      submitBtn.disabled = false;
      btnText.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane ms-2"></i>';
      return;
    }
    btnText.textContent = `Sent · try again in ${remaining}s`;
  }, 1000);
};

const getRecaptchaToken = () => new Promise((resolve, reject) => {
  if (RECAPTCHA_SITE_KEY === 'YOUR_RECAPTCHA_SITE_KEY' || !window.grecaptcha) {
    reject(new Error('reCAPTCHA is not configured yet.'));
    return;
  }
  window.grecaptcha.ready(() => {
    window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
      .then(resolve)
      .catch(reject);
  });
});

const withTimeout = (promise, message) => new Promise((resolve, reject) => {
  const timeoutId = window.setTimeout(() => reject(new Error(message)), REQUEST_TIMEOUT_MS);
  promise.then(
    (value) => {
      window.clearTimeout(timeoutId);
      resolve(value);
    },
    (error) => {
      window.clearTimeout(timeoutId);
      reject(error);
    }
  );
});

const submitWithFreshToken = async () => {
  recaptchaToken.value = await withTimeout(
    getRecaptchaToken(),
    'CAPTCHA verification timed out.'
  );
  emailjs.init(EMAILJS_PUBLIC_KEY);
  await withTimeout(
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, '#contact-form'),
    'Email service timed out.'
  );
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.classList.add('d-none');

  if (honeypot.value.trim() !== '') return;

  const allValid = Object.values(fields).map(validateField).every(Boolean);
  if (!allValid) {
    setStatus('error', 'Please fix the highlighted fields before sending.');
    return;
  }

  if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || !window.emailjs) {
    setStatus('error', 'The contact service is not configured yet.');
    return;
  }

  setLoading(true);
  try {
    try {
      await submitWithFreshToken();
    } catch (firstError) {
      const retryable = firstError.message?.includes('timed out');
      if (!retryable) throw firstError;
      recaptchaToken.value = '';
      await submitWithFreshToken();
    }
    setStatus('success', 'Message sent successfully. Thanks for reaching out!');
    form.reset();
    startCooldown();
  } catch (error) {
    recaptchaToken.value = '';
    setLoading(false);
    const message = error.text?.toLowerCase().includes('bot detected')
      ? 'reCAPTCHA flagged this submission. Please reload the page and try again without automated tools.'
      : error.text?.includes('reCAPTCHA: browser-error') || error.text?.includes('g-recaptcha-response parameter not found')
      ? 'reCAPTCHA configuration failed. Confirm this site key and its EmailJS reCAPTCHA secret match, then allow localhost and your production domain.'
      : error.status === 403
      ? 'Email service blocked this file origin. Open the portfolio through a web server, or enable non-browser access in EmailJS Security settings.'
      : error.message?.includes('timed out')
      ? 'Session expired, please click Send again.'
      : (error.text || error.message || 'Something went wrong. Please try again.');
    setStatus('error', message);
  }
});
