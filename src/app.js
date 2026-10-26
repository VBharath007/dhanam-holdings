import './style.css';
import { company, services, projects, clients, team, workTypes, forums, commitments, faqs, testimonials } from './data.js';
import { gsap } from 'gsap';


const $ = s => document.querySelector(s), slug = p => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), url = p => '/projects/' + slug(p), num = n => String(n).padStart(2, '0');
const icoArrDiag = `<svg class="ico-arr-diag" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>`;
const icoArrRight = `<svg class="ico-arr-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
const icoArrLeft = `<svg class="ico-arr-left" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`;
const icoArrUp = `<svg class="ico-arr-up" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
const icoArrDown = `<svg class="ico-arr-down" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>`;
const icoPhone = `<svg class="ico-phone" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
const icoMail = `<svg class="ico-mail" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const icoPin = `<svg class="ico-pin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
const icoHeroPrev = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`;
const icoHeroNext = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
const icoChevronRight = `<svg class="breadcrumb-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;
const breadcrumbSep = `<span class="breadcrumb-divider" aria-hidden="true">${icoChevronRight}</span>`;
const image = (src, alt, cls = '') => `<img src="${src}" alt="${alt}" class="${cls}" loading="lazy" decoding="async">`;
const logo = `<a class="logo" href="/" aria-label="Danam Holdings home"><img src="/dhlogo.webp" alt="Danam Holdings logo" loading="lazy" decoding="async"><span><strong>DANAM HOLDINGS</strong><small>TOWARDS FORTUNE UNFOLDINGS</small></span></a>`;
const nav = [['/', 'Home'], ['/about-us', 'About us'], ['/services', 'Services'], ['/our-projects', 'Our projects']];
const path = location.pathname.replace(/\/$/, '') || '/';
const sparkleColor = '#74b73e';
const activeNavIndex = nav.findIndex(([u]) => u === path || (path === '/expertise' && u === '/services'));

$('#header').innerHTML = `
<div class="wrap header-inner">
  <div class="header-left">
    ${logo}
  </div>

  <nav class="sparkle-nav navigation-menu" id="sparkle-navbar" aria-label="Main navigation">
    <ul class="sparkle-list">
      ${nav.map(([u, t], i) => `
        <li class="${i === activeNavIndex ? 'active' : ''}">
          <a href="${u}" class="sparkle-btn" data-index="${i}" ${path === u ? 'aria-current="page"' : ''}>${t}</a>
        </li>
      `).join('')}
    </ul>
    <div class="active-element" id="sparkle-active-element"></div>
  </nav>

  <div class="header-right">
    <a href="/contact" class="button header-cta">Let's build together <span class="arrow-wrap">${icoArrDiag}</span></a>
    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-navigation">
      <span class="menu-label">Menu</span>
      <span class="menu-icon" aria-hidden="true"><i></i><i></i></span>
    </button>
  </div>

  <nav class="nav mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
    ${nav.map(([u, t]) => `<a href="${u}" ${path === u ? 'aria-current="page"' : ''}>${t}</a>`).join('')}
    <a href="/contact" class="button">Let's build together <span class="arrow-wrap">${icoArrDiag}</span></a>
  </nav>
</div>`;

function initSparkleNavbar() {
  const navElement = document.getElementById('sparkle-navbar');
  const activeElement = document.getElementById('sparkle-active-element');
  if (!navElement || !activeElement) return;

  const buttons = Array.from(navElement.querySelectorAll('.sparkle-btn'));
  let activeIndex = activeNavIndex >= 0 ? activeNavIndex : 0;
  let isAnimating = false;

  const strikeSVG = `
    <svg viewBox="0 0 114 12" preserveAspectRatio="none">
      <g fill="none" stroke="${sparkleColor}" stroke-width="0.75" stroke-linecap="round">
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
      </g>
    </svg>`;

  const createSVG = (el) => {
    el.innerHTML = `
      <svg viewBox="0 0 116 5" preserveAspectRatio="none" class="beam">
        <path d="M0.5 2.5L113 0.534929C114.099 0.515738 115 1.40113 115 2.5C115 3.59887 114.099 4.48426 113 4.46507L0.5 2.5Z" fill="url(#sparkle-gradient-beam)"/>
        <defs>
          <linearGradient id="sparkle-gradient-beam" x1="2" y1="2.5" x2="115" y2="2.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="${sparkleColor}"/>
            <stop offset="1" stop-color="white"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="strike">
        ${strikeSVG}
        ${strikeSVG}
      </div>
    `;
  };

  const getOffsetLeft = (element) => {
    if (!navElement || !activeElement || !element) return 0;
    const elementRect = element.getBoundingClientRect();
    const navRect = navElement.getBoundingClientRect();
    const activeElementWidth = activeElement.offsetWidth || 36;
    return elementRect.left - navRect.left + (elementRect.width - activeElementWidth) / 2;
  };

  const positionActive = (idx) => {
    const btn = buttons[idx];
    if (btn) {
      gsap.set(activeElement, {
        x: getOffsetLeft(btn),
      });
      gsap.to(activeElement, {
        '--active-element-show': '1',
        duration: 0.25,
      });
    } else {
      gsap.to(activeElement, {
        '--active-element-show': '0',
        duration: 0.2,
      });
    }
  };

  requestAnimationFrame(() => {
    if (activeNavIndex >= 0) {
      positionActive(activeNavIndex);
    }
  });

  window.addEventListener('resize', () => {
    if (activeNavIndex >= 0 && buttons[activeIndex]) {
      gsap.set(activeElement, { x: getOffsetLeft(buttons[activeIndex]) });
    }
  });

  const animateTo = (newIndex, targetUrl) => {
    if (newIndex === activeIndex || isAnimating) {
      if (targetUrl && location.pathname !== targetUrl) location.href = targetUrl;
      return;
    }

    const oldButton = buttons[activeIndex];
    const newButton = buttons[newIndex];
    if (!oldButton || !newButton) {
      if (targetUrl) location.href = targetUrl;
      return;
    }

    isAnimating = true;
    const x = getOffsetLeft(newButton);
    const direction = newIndex > activeIndex ? 'after' : 'before';
    const spacing = Math.abs(x - getOffsetLeft(oldButton));

    navElement.classList.add(direction);

    gsap.set(activeElement, {
      rotateY: direction === 'before' ? '180deg' : '0deg',
    });

    gsap.to(activeElement, {
      keyframes: [
        {
          '--active-element-width': `${spacing > navElement.offsetWidth - 40 ? navElement.offsetWidth - 40 : spacing}px`,
          duration: 0.28,
          ease: 'none',
          onStart: () => {
            createSVG(activeElement);
            gsap.to(activeElement, {
              '--active-element-opacity': 1,
              duration: 0.1,
            });
          },
        },
        {
          '--active-element-scale-x': '0',
          '--active-element-scale-y': '.25',
          '--active-element-width': '0px',
          duration: 0.28,
          onStart: () => {
            gsap.to(activeElement, {
              '--active-element-mask-position': '40%',
              duration: 0.45,
            });
            gsap.to(activeElement, {
              '--active-element-opacity': 0,
              delay: 0.35,
              duration: 0.2,
            });
          },
          onComplete: () => {
            activeElement.innerHTML = '';
            navElement.classList.remove('before', 'after');
            gsap.set(activeElement, {
              x: getOffsetLeft(newButton),
              '--active-element-show': '1',
            });
            buttons.forEach((b, i) => b.closest('li').classList.toggle('active', i === newIndex));
            activeIndex = newIndex;
            isAnimating = false;
            if (targetUrl && location.pathname !== targetUrl) {
              location.href = targetUrl;
            }
          },
        },
      ],
    });

    gsap.to(activeElement, {
      x,
      '--active-element-strike-x': '-50%',
      duration: 0.56,
      ease: 'none',
    });
  };

  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      const targetUrl = nav[idx][0];
      if (targetUrl === location.pathname) {
        e.preventDefault();
        return;
      }
      // Instant page navigation without 560ms blocking delay
    });
  });
}
initSparkleNavbar();

$('#footer').innerHTML = `<div class="wrap"><div class="footer-top"><div>${logo}<p>Your trusted partner in civil engineering & turnkey EPC construction. Delivering structural integrity, transparent costing, and on-time project execution across South India.</p><div class="footer-socials" style="display:flex;gap:25px">${Object.entries(company.socials).map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${n[0].toUpperCase() + n.slice(1)} <span class="social-arrow">${icoArrDiag}</span></a>`).join('')}</div></div><div><h3>Explore</h3><div class="footer-links">${nav.map(([u, t]) => `<a href="${u}">${t}</a>`).join('')}<a href="/contact">Contact us</a></div></div><div><h3>Start a conversation</h3><div class="footer-links footer-contact-links"><a href="${company.phoneHref}" class="footer-contact-item" aria-label="Call ${company.phone}"><span class="footer-contact-icon">${icoPhone}</span><span class="footer-contact-text">${company.phone}</span></a><a href="${company.phoneHref2}" class="footer-contact-item footer-contact-subitem" aria-label="Call ${company.phone2}"><span class="footer-contact-text">${company.phone2}</span></a><a href="mailto:${company.email}" class="footer-contact-item footer-email-link" aria-label="Email ${company.email}"><span class="footer-contact-icon">${icoMail}</span><span class="footer-contact-text">${company.email}</span></a><a href="${company.address.mapLink}" target="_blank" rel="noopener noreferrer" class="footer-contact-item footer-address-item" aria-label="View Danam Holdings office on Google Maps" title="Open office location in Google Maps"><span class="footer-contact-icon footer-pin-icon">${icoPin}</span><span class="footer-contact-text footer-address-text">${company.address.lines.join('<br>')}</span></a></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Danam Holdings. All rights reserved.</span><span>Construction. Integrity. Lasting value.</span><a href="#main" class="footer-back-to-top">Back to top ${icoArrUp}</a></div></div>`;
const cta = () => `<section class="cta"><div class="wrap"><div><span class="eyebrow">Start Your Project With Danam Holdings</span><h2>Ready to build or renovate?<br>Let's talk about your plans.</h2></div><a href="/contact" class="button">Contact our team <span class="arrow-wrap">${icoArrDiag}</span></a></div></section>`;
const card = p => `<a class="project-card reveal" id="project-${slug(p)}" href="${url(p)}"><div class="project-image">${image(p.image, p.name)}<span class="circle" style="display:grid;place-items:center">${icoArrDiag}</span></div><div class="project-meta"><div><h3>${p.name}</h3><p>${p.location}</p></div><span>${p.category}</span></div></a>`;
const clientLogos = ['thanga mail.webp', 'theni anantham.webp', 'oyo.webp', 'Rajmahal.jpeg', 'sacs.png', 'sita ram jewellers.webp', 'msd.webp'];
const clientItems = () => clients.map((c, i) => `<figure class="marquee-item">${image('/our brand clients/' + clientLogos[i], c)}<figcaption>${c}</figcaption></figure>`).join('');
const clientSection = () => { const items = clientItems() + clientItems(); return `<section class="client-section" aria-label="Trusted by respected names"><div class="wrap"><span class="eyebrow">Trusted by respected names</span></div><div class="marquee" tabindex="0"><div class="marquee-track"><div class="marquee-group">${items}</div><div class="marquee-group" aria-hidden="true">${items}</div></div></div></section>`; };
const homeDisciplines = [
  { num: '01', title: services[0].title, desc: services[0].desc, image: services[0].image, tag: services[0].items.slice(0, 3).join(' · '), link: '/contact?service=' + encodeURIComponent(services[0].title) },
  { num: '02', title: services[2].title, desc: services[2].desc, image: services[2].image, tag: services[2].items.slice(0, 3).join(' · '), link: '/contact?service=' + encodeURIComponent(services[2].title) },
  { num: '03', title: services[4].title, desc: services[4].desc, image: services[4].image, tag: services[4].items.slice(0, 3).join(' · '), link: '/contact?service=' + encodeURIComponent(services[4].title) },
  { num: '04', title: services[8].title, desc: services[8].desc, image: services[8].image, tag: services[8].items.slice(0, 3).join(' · '), link: '/contact?service=' + encodeURIComponent(services[8].title) }
];

const servicesInteractive = (list = homeDisciplines, containerId = 'home-services') => `<div class="services-interactive" id="${containerId}"><div class="services-list" role="tablist" aria-label="Our disciplines">${list.map((d, i) => `<div class="service-hover-item ${i === 0 ? 'active' : ''}" data-index="${i}" role="tab" tabindex="0" aria-selected="${i === 0}"><div class="service-hover-header"><div class="service-hover-meta"><span class="service-hover-num">${d.num || num(i + 1)}</span><h3 class="service-hover-title">${d.title}</h3></div><span class="service-hover-arrow" aria-hidden="true">${icoArrRight}</span></div><div class="service-mobile-drawer"><div class="service-mobile-media" data-service-idx="${i}" role="button" aria-label="View full image of ${d.title}" tabindex="0"><img src="${d.image}" alt="${d.title}" class="service-mobile-img" loading="lazy" decoding="async"><span class="service-mobile-zoom-badge" aria-hidden="true"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg><span>Full view</span></span></div><p class="service-mobile-desc">${d.desc}</p><div class="service-mobile-items">${(d.items || []).map(it => `<span class="service-preview-pill">${it}</span>`).join('')}</div><div class="service-mobile-footer"><a class="service-preview-link btn-action btn-action-sm btn-action-light" href="${d.link || '/contact?service=' + encodeURIComponent(d.title)}">Discuss this service <span class="arrow">${icoArrDiag}</span></a></div></div></div>`).join('')}</div><div class="service-preview-panel"><div class="service-preview-media" role="button" aria-label="View full image" tabindex="0">${list.map((d, i) => `<img src="${d.image}" alt="${d.title}" class="service-preview-img ${i === 0 ? 'active' : ''}" data-preview-index="${i}" loading="lazy" decoding="async">`).join('')}</div><div class="service-preview-info"><p class="service-preview-desc" id="${containerId}-desc">${list[0].desc}</p><div class="service-preview-items" id="${containerId}-items">${(list[0].items || []).map(it => `<span class="service-preview-pill">${it}</span>`).join('')}</div><div class="service-preview-footer"><span class="service-preview-tag" id="${containerId}-tag">${list[0].tag || (list[0].items || []).slice(0, 2).join(' · ')}</span><a class="service-preview-link btn-action btn-action-sm btn-action-light" id="${containerId}-link" href="${list[0].link || '/contact?service=' + encodeURIComponent(list[0].title)}">Discuss this service <span class="arrow">${icoArrDiag}</span></a></div></div></div></div>`;

function openServiceLightbox(list, startIdx) {
  const dialog = document.getElementById('lightbox');
  if (!dialog || !list || list.length === 0) return;

  let currentLbIdx = (startIdx + list.length) % list.length;
  const total = list.length;

  const closeBtn = dialog.querySelector('.close');
  const prevBtn = dialog.querySelector('.prev');
  const nextBtn = dialog.querySelector('.next');
  const lbImg = dialog.querySelector('img');
  const lbText = dialog.querySelector('p');

  if (closeBtn && !closeBtn.querySelector('svg')) {
    closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  }
  if (prevBtn && !prevBtn.querySelector('svg')) {
    prevBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
  }
  if (nextBtn && !nextBtn.querySelector('svg')) {
    nextBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
  }

  if (prevBtn) prevBtn.style.display = total > 1 ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = total > 1 ? 'flex' : 'none';

  function renderSlide() {
    const item = list[currentLbIdx];
    if (!item) return;
    lbImg.src = item.image;
    lbImg.alt = item.title;
    if (lbText) {
      lbText.textContent = `${item.title} · ${currentLbIdx + 1} / ${total}`;
    }
  }

  renderSlide();
  dialog.showModal();
  document.body.style.overflow = 'hidden';

  const onDialogClick = (e) => {
    if (e.target === dialog) cleanupAndClose();
  };
  const onCloseClick = (e) => {
    e.stopPropagation();
    cleanupAndClose();
  };
  const onPrevClick = (e) => {
    e.stopPropagation();
    currentLbIdx = (currentLbIdx - 1 + total) % total;
    renderSlide();
  };
  const onNextClick = (e) => {
    e.stopPropagation();
    currentLbIdx = (currentLbIdx + 1) % total;
    renderSlide();
  };
  const onKeyDown = (e) => {
    if (!dialog.open) return;
    if (e.key === 'ArrowRight') { currentLbIdx = (currentLbIdx + 1) % total; renderSlide(); }
    if (e.key === 'ArrowLeft') { currentLbIdx = (currentLbIdx - 1 + total) % total; renderSlide(); }
    if (e.key === 'Escape') cleanupAndClose();
  };

  function cleanupAndClose() {
    dialog.close();
    document.body.style.overflow = '';
    dialog.removeEventListener('click', onDialogClick);
    if (closeBtn) closeBtn.removeEventListener('click', onCloseClick);
    if (prevBtn) prevBtn.removeEventListener('click', onPrevClick);
    if (nextBtn) nextBtn.removeEventListener('click', onNextClick);
    window.removeEventListener('keydown', onKeyDown);
  }

  dialog.addEventListener('click', onDialogClick);
  if (closeBtn) closeBtn.addEventListener('click', onCloseClick);
  if (prevBtn) prevBtn.addEventListener('click', onPrevClick);
  if (nextBtn) nextBtn.addEventListener('click', onNextClick);
  window.addEventListener('keydown', onKeyDown);
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
  }, { once: true });
}

function initServicesInteractive(containerId = 'home-services', list = homeDisciplines) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = container.querySelectorAll('.service-hover-item');
  const imgs = container.querySelectorAll('.service-preview-img');
  const descEl = document.getElementById(`${containerId}-desc`);
  const tagEl = document.getElementById(`${containerId}-tag`);
  const linkEl = document.getElementById(`${containerId}-link`);
  const itemsEl = document.getElementById(`${containerId}-items`);
  let currentActiveIdx = 0;

  function setActive(idx) {
    currentActiveIdx = idx;
    items.forEach((it, i) => { const act = i === idx; it.classList.toggle('active', act); it.setAttribute('aria-selected', act) });
    imgs.forEach((img, i) => img.classList.toggle('active', i === idx));
    const d = list[idx];
    if (d) {
      if (descEl) descEl.textContent = d.desc;
      if (tagEl) tagEl.textContent = d.tag || (d.items || []).slice(0, 2).join(' · ') || '';
      if (linkEl) linkEl.href = d.link || '/contact?service=' + encodeURIComponent(d.title);
      if (itemsEl && d.items) { itemsEl.innerHTML = d.items.map(it => `<span class="service-preview-pill">${it}</span>`).join('') }
    }
  }

  items.forEach((it, idx) => {
    it.addEventListener('mouseenter', () => setActive(idx));
    it.addEventListener('mouseover', () => setActive(idx));
    it.addEventListener('pointerenter', () => setActive(idx));
    it.addEventListener('focus', () => setActive(idx));
    it.addEventListener('click', () => setActive(idx));
  });

  // Tap to view full image (Lightbox for mobile)
  const mediaContainers = container.querySelectorAll('.service-mobile-media');
  mediaContainers.forEach((media) => {
    const openHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const idx = +media.dataset.serviceIdx;
      openServiceLightbox(list, isNaN(idx) ? 0 : idx);
    };
    media.addEventListener('click', openHandler);
    media.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHandler(e);
      }
    });
  });

  const previewMedia = container.querySelector('.service-preview-media');
  if (previewMedia) {
    previewMedia.style.cursor = 'pointer';
    previewMedia.title = 'Click to view full image';
    previewMedia.addEventListener('click', () => {
      openServiceLightbox(list, currentActiveIdx);
    });
  }
}

const serviceRows = (list) => list.map((s, i) => `<details class="service-row"><summary><span>${num(i + 1)}</span><h3>${s.title}</h3></summary><div class="service-content">${s.image ? image(s.image, s.title) : ''}<p>${s.desc}</p><ul>${s.items.map(x => `<li>${x}</li>`).join('')}</ul><a class="btn-action btn-action-sm" href="/contact?service=${encodeURIComponent(s.title)}">Discuss this service <span class="arrow">${icoArrDiag}</span></a></div></details>`).join('');
const faqSection = () => `<section class="section"><div class="wrap split" style="align-items:start"><div><span class="eyebrow">A little clarity, before we begin</span><h2>Your questions.<br>Our answers.</h2><a class="btn-action" href="/contact">Talk to our team <span class="arrow">${icoArrDiag}</span></a></div><div>${faqs.map(f => `<details class="faq"><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></div></section>`;
const steps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Site Visit & Planning',
    desc: 'We visit your land, understand your requirements, check local bylaws, and prepare practical 2D floor plans.',
    tag: 'Site Visit & 2D Plan',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z"/></svg>`
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: '3D Design & Clear Budget',
    desc: 'You get realistic 3D elevation views and a clear, item-by-item cost estimate with zero hidden charges.',
    tag: '3D Views & Honest Cost',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'Quality Construction',
    desc: 'Strong RCC foundation, quality TMT steel and cement, with daily site supervision by our civil engineers.',
    tag: 'On-Site Engineering',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: 'Finishing & Handover',
    desc: 'Neat interior plastering, flooring, painting, electrical and plumbing testing, and smooth keys handover.',
    tag: 'Inspection & Handover',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`
  }
];
const process = () => `<section class="section process-section"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Our Work Process</span><h2>How We Build Your Project</h2></div><p>A simple step-by-step approach that keeps you informed from day one to keys handover.</p></div><div class="process-cards-grid">${steps.map(s => `<article class="process-card reveal"><div class="process-card-top"><span class="process-phase-badge">${s.phase}</span><div class="process-icon-box">${s.icon}</div></div><div class="process-card-body"><h3>${s.title}</h3><p>${s.desc}</p></div><div class="process-card-footer"><span class="process-tag-indicator">${s.tag}</span><span class="process-step-num">${s.num}</span></div></article>`).join('')}</div></div></section>`;
const stats = () => `<div class="wrap stats"><p>Engineering trust.<br>Creating enduring value.</p><div><b>10+</b><span>Years of experience</span></div><div><b>350+</b><span>Projects completed</span></div><div><b>Turnkey</b><span>Engineering expertise</span></div></div>`;
const pageTop = (label, title = '', desc = '', parent = null) => `<section class="wrap page-top ${!title ? 'page-top-breadcrumb-only' : ''}"><nav class="breadcrumb-bar" aria-label="Breadcrumb navigation"><a class="breadcrumb-chip" href="/" title="Return to Home"><span class="breadcrumb-arrow" aria-hidden="true">${icoArrLeft}</span><span class="breadcrumb-chip-text">Home</span></a>${breadcrumbSep}${parent ? `<a class="breadcrumb-parent-link" href="${parent.href}">${parent.label}</a>${breadcrumbSep}` : ''}<span class="breadcrumb-target" aria-current="page">${label}</span></nav>${title ? `<h1>${title}</h1>` : ''}${desc ? `<p>${desc}</p>` : ''}</section>`;

const standardsSection = () => `
  <section class="standards-section" aria-label="Our commitment and standards">
    <div class="standards-backdrop" style="background-image: url('/assets/standards-bg.jpg');"></div>
    <div class="standards-overlay"></div>
    <div class="wrap standards-inner reveal">
      <div class="standards-head">
        <span class="standards-eyebrow">
          <span class="standards-eyebrow-line" aria-hidden="true"></span>
          OUR COMMITMENT
        </span>
        <h2 class="standards-title">The standards we work by</h2>
      </div>

      <div class="standards-grid">
        ${commitments.map((c, i) => `
          <div class="standards-card">
            <span class="standards-num">${c.num || num(i + 1)}</span>
            <h3 class="standards-card-title">${c.title}</h3>
            <p class="standards-card-desc">${c.text}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;
function home() {
  return `
    <section class="split-hero-container">
      <div class="wrap split-hero-wrap">
        
        <div class="split-hero-left">
          <h1 class="split-hero-title">
            Quality Building &amp;<br>Turnkey Construction. <span class="title-green-accent">Done Right.</span>
          </h1>

          <p class="split-hero-desc">
            From modern homes and luxury villas to commercial buildings and showrooms — Danam Holdings builds strong, durable spaces with honest pricing, clear timelines, and trusted construction quality across Madurai and South India.
          </p>

          <div class="split-hero-actions">
            <a href="/contact" class="btn-hero-primary">
              <span>Plan your project</span>
              <span class="btn-hero-arrow">${icoArrDiag}</span>
            </a>
            <a href="/our-projects" class="btn-hero-secondary">
              <span>Explore 350+ Projects</span>
              <span class="btn-hero-arrow">${icoArrDiag}</span>
            </a>
          </div>

          <div class="split-hero-stats">
            <div class="hero-stat-col">
              <strong class="hero-stat-num">10+</strong>
              <span class="hero-stat-lbl">Years Experience</span>
            </div>
            <div class="hero-stat-divider" aria-hidden="true"></div>
            <div class="hero-stat-col">
              <strong class="hero-stat-num">350+</strong>
              <span class="hero-stat-lbl">Projects Completed</span>
            </div>
            <div class="hero-stat-divider" aria-hidden="true"></div>
            <div class="hero-stat-col">
              <strong class="hero-stat-num">100%</strong>
              <span class="hero-stat-lbl">Turnkey Delivery</span>
            </div>
          </div>
        </div>

        <div class="split-hero-right">
          <div class="hero-card-frame">
            <div class="hero-slider-viewport" id="hero-slider-viewport">
              <div class="hero-slider-track" id="hero-slider-track">
                <div class="hero-slider-slide"><img src="/homehero/hh5.webp" alt="Honest Pricing &amp; On-Time Delivery" class="hero-card-img" decoding="async"></div>
                <div class="hero-slider-slide"><img id="hero-img" src="/homehero/hh1.webp" alt="Strong Foundations, Modern Designs" fetchpriority="high" decoding="async" class="hero-card-img"></div>
                <div class="hero-slider-slide"><img src="/homehero/hh2.webp" alt="Commercial &amp; Residential Landmarks" decoding="async" class="hero-card-img"></div>
                <div class="hero-slider-slide"><img src="/homehero/hh3.webp" alt="Turnkey Building from Ground Up" decoding="async" class="hero-card-img"></div>
                <div class="hero-slider-slide"><img src="/homehero/hh4.webp" alt="Premium Interiors &amp; Finishing" decoding="async" class="hero-card-img"></div>
                <div class="hero-slider-slide"><img src="/homehero/hh5.webp" alt="Honest Pricing &amp; On-Time Delivery" decoding="async" class="hero-card-img"></div>
                <div class="hero-slider-slide"><img src="/homehero/hh1.webp" alt="Strong Foundations, Modern Designs" class="hero-card-img" decoding="async"></div>
              </div>
            </div>
            <div class="hero-card-overlay">
              <div class="hero-card-meta">
                <small id="hero-label">01 / CIVIL &amp; RESIDENTIAL CONSTRUCTION</small>
                <h2 id="hero-text">Strong foundations and modern architectural design.</h2>
              </div>
              <div class="hero-card-controls">
                <span class="hero-card-counter" id="hero-counter">01 / 05</span>
                <div class="hero-card-arrows">
                  <button class="circle hero-btn-prev" id="hero-prev" aria-label="Previous featured image">${icoHeroPrev}</button>
                  <button class="circle hero-btn-next" id="hero-next" aria-label="Next featured image">${icoHeroNext}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="section"><div class="wrap split"><div class="story-image reveal">${image('/assets/home page about section.jpeg', 'Danam Holdings construction and design solutions')}<div class="image-note">One team.<br>From planning to keys handover.</div></div><div class="reveal"><span class="eyebrow">About Danam Holdings</span><h2>Building Trust.<br>Delivering Strong Buildings.</h2><p>Danam Holdings takes care of your entire building journey under one roof — architectural design, civil construction, interior works, and on-site project management.</p><p>With over 10 years of experience and 350+ completed landmarks, we make construction simple, transparent, and completely stress-free for every client.</p><div style="margin-top:28px"><a class="button" href="/about-us">Get to know Danam <span class="arrow-wrap">${icoArrDiag}</span></a></div></div></div></section>
    ${standardsSection()}
    <section class="section" style="padding-top:30px"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Selected work / A closer look</span><h2>Spaces that speak<br>for themselves.</h2></div><a class="btn-action" href="/our-projects">View all projects <span class="arrow">${icoArrDiag}</span></a></div><div class="projects-grid">${[projects[11], projects[3], projects[2], projects[0]].map(card).join('')}</div></div></section>${clientSection()}${faqSection()}${cta()}`;
}
const starSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const googleGIcon = `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.43 7.35 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.57 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>`;

const testimonialsSection = () => `
  <section class="section project-testimonials-section" aria-label="Client reviews and testimonials">
    <div class="wrap">
      <div class="section-head project-testimonials-head">
        <div>
          <span class="eyebrow">Client Feedback &amp; Trust</span>
          <h2>What Our Clients Say<br>About Working with Us.</h2>
        </div>
        <div class="gmb-rating-card">
          <div class="gmb-rating-top">
            ${googleGIcon}
            <span class="gmb-title">Google Reviews</span>
          </div>
          <div class="gmb-rating-stars">
            <span class="gmb-score">5.0</span>
            <div class="gmb-stars-row">
              ${starSvg}${starSvg}${starSvg}${starSvg}${starSvg}
            </div>
          </div>
          <span class="gmb-sub">Verified Client Satisfaction</span>
        </div>
      </div>

      <div class="testimonial-single-wrapper">
        <div class="testimonial-slider-track" id="testimonial-slider-track">
          ${testimonials.slice(0, 4).map((t, idx) => `
            <article class="testimonial-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
              <div class="testimonial-card-header">
                <div class="reviewer-avatar" style="background:${t.avatarBg || '#1e3a2b'}">${t.name[0]}</div>
                <div class="reviewer-info">
                  <h3 class="reviewer-name">${t.name}</h3>
                  <span class="reviewer-sub">${t.establishment ? `${t.establishment} · ` : ''}${t.project || t.role}</span>
                </div>
                <div class="google-badge-icon" title="Google Verified Review">
                  ${googleGIcon}
                </div>
              </div>

              <div class="testimonial-stars-row">
                ${Array(t.rating || 5).fill(starSvg).join('')}
                <span class="testimonial-time">${t.timeAgo || 'Recent'}</span>
              </div>

              <blockquote class="testimonial-quote">
                <p>“${t.quote}”</p>
              </blockquote>

              <div class="testimonial-footer">
                <span class="testimonial-location">📍 ${t.location}</span>
                <span class="testimonial-verified-tag">✓ Verified Client</span>
              </div>
            </article>
          `).join('')}
        </div>

        <div class="testimonial-slider-controls">
          <span class="testimonial-counter" id="testimonial-counter">01 / ${num(Math.min(4, testimonials.length))}</span>
          <div class="testimonial-arrows">
            <button class="circle testimonial-arrow-btn" id="testimonial-prev" aria-label="Previous testimonial">${icoHeroPrev}</button>
            <button class="circle testimonial-arrow-btn" id="testimonial-next" aria-label="Next testimonial">${icoHeroNext}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

function initTestimonialsSlider() {
  const track = document.getElementById('testimonial-slider-track');
  if (!track) return;
  if (track.dataset.sliderInitialized === 'true') return;
  track.dataset.sliderInitialized = 'true';

  const slides = track.querySelectorAll('.testimonial-slide');
  const counter = document.getElementById('testimonial-counter');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const total = slides.length;
  if (total === 0) return;
  let currentIdx = 0;
  let autoplayTimer = null;
  let isHovered = false;

  function stopAutoplay() {
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    if (isHovered || document.hidden) return;
    autoplayTimer = setTimeout(() => {
      showSlide(currentIdx + 1);
      startAutoplay();
    }, 3000);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  function showSlide(idx) {
    currentIdx = (idx + total) % total;
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === currentIdx);
    });
    if (counter) {
      counter.textContent = `${num(currentIdx + 1)} / ${num(total)}`;
    }
  }

  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.preventDefault();
      showSlide(currentIdx - 1);
      restartAutoplay();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.preventDefault();
      showSlide(currentIdx + 1);
      restartAutoplay();
    };
  }

  const container = track.closest('.testimonials-section') || track;
  container.addEventListener('mouseenter', () => {
    isHovered = true;
    stopAutoplay();
  });
  container.addEventListener('mouseleave', () => {
    isHovered = false;
    startAutoplay();
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) showSlide(currentIdx + 1);
      else showSlide(currentIdx - 1);
    }
    startAutoplay();
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  startAutoplay();
}


function portfolio() {
  return `
    <section class="portfolio-hero-section">
      <div class="wrap portfolio-hero-wrap">
        <div class="portfolio-hero-stage">
          
          <div class="portfolio-hero-media">
            <img src="/assets/projects-hero.webp" alt="Danam Holdings modern luxury villa and landmark projects" class="portfolio-hero-img" fetchpriority="high" decoding="async">
          </div>

          <div class="portfolio-floating-card">
            <span class="floating-card-eyebrow">OUR WORK</span>
            <h1 class="floating-card-title">Real Projects.<br>Proven Quality.</h1>
            <p class="floating-card-sub">Over 350+ completed buildings across Madurai and South India — including homes, modern showrooms, shopping complexes, and educational campuses.</p>
            <div class="floating-card-divider"></div>
            <a href="#project-results" class="floating-card-link">
              <span>Explore Projects</span>
              <span class="floating-card-icon">${icoArrDown}</span>
            </a>
          </div>

        </div>
      </div>
    </section>

    <section class="wrap" style="padding-top: 50px; padding-bottom: 70px;">
      <div class="filters" role="group" aria-label="Filter projects">
        ${['All projects', 'Residential', 'Commercial'].map((c, i) => `<button class="filter ${i ? '' : 'active'}" data-filter="${c}" aria-pressed="${!i}">${c}</button>`).join('')}
        <span class="project-count" aria-live="polite">12 projects</span>
      </div>
      <div class="projects-grid" id="project-results">
        ${projects.map(card).join('')}
      </div>
    </section>
    ${testimonialsSection()}
    ${cta()}
  `;
}
function detail(p) {
  let i = projects.indexOf(p);
  const prevP = projects[(i - 1 + projects.length) % projects.length];
  const nextP = projects[(i + 1) % projects.length];
  const facts = [
    { label: 'Location', val: p.location },
    { label: 'Category', val: p.category },
    { label: 'Project Scope', val: p.scope },
    { label: 'Project Type', val: p.typeLabel },
    { label: 'Structure & Delivery', val: p.frame },
    { label: 'Execution Status', val: p.year }
  ].filter(f => f.val);

  const galleryImages = (p.images && p.images.length > 0) ? p.images : [p.image];

  return `
    <div class="wrap detail-page-wrap" style="padding-top: 22px; padding-bottom: 30px;">
      <div class="detail-top-nav-bar">
        <a href="/our-projects#project-${slug(p)}" class="detail-back-btn" id="detail-back-btn" aria-label="Back to projects list">
          <span class="detail-back-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </span>
          <span class="detail-back-label">Back to Projects</span>
        </a>
      </div>

      <div class="detail-cover-showcase">
        <img src="${p.image}" alt="${p.name} overview" class="detail-cover" fetchpriority="high" decoding="async">
      </div>

      <div class="project-overview-card reveal">
        <div class="project-overview-main">
          <span class="eyebrow">Project Overview</span>
          <h2 class="project-overview-title">${p.scope}</h2>
          <p class="project-overview-desc">Comprehensive project execution by Danam Holdings, delivering high structural standards, quality materials, and transparent turnkey management.</p>
        </div>
        <div class="project-specs-grid">
          ${facts.map(f => `
            <div class="spec-card">
              <span class="spec-label">${f.label}</span>
              <strong class="spec-value">${f.val}</strong>
            </div>
          `).join('')}
        </div>
      </div>

      ${galleryImages.length > 1 ? `
      <section class="section project-gallery-section" id="project-gallery">
        <div class="section-head">
          <div>
            <span class="eyebrow">Project Visuals</span>
            <h2>In Detail. A Closer Perspective.</h2>
          </div>
          <div class="gallery-counter-badge" id="gallery-counter">
            <span id="gallery-current-num">01</span> / <span id="gallery-total-num">${num(galleryImages.length)}</span>
          </div>
        </div>

        <div class="project-slider-wrapper" id="project-slider">
          <div class="slider-viewport" id="slider-viewport">
            <div class="slider-track" id="slider-track">
              ${galleryImages.map((src, idx) => `
                <div class="slider-slide" data-slide-idx="${idx}">
                  <img src="${src}" alt="${p.name} — visual ${idx + 1}" loading="lazy" decoding="async">
                </div>
              `).join('')}
              <div class="slider-slide slider-slide-clone" data-slide-idx="0" aria-hidden="true">
                <img src="${galleryImages[0]}" alt="${p.name} — visual 1" loading="lazy" decoding="async">
              </div>
            </div>

            <button class="slider-chevron slider-chevron-prev" id="slider-prev" aria-label="Previous image">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button class="slider-chevron slider-chevron-next" id="slider-next" aria-label="Next image">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            <div class="slider-corner-tag">
              <span>${p.name.toUpperCase()}</span>
            </div>

            <button class="slider-zoom-btn" id="slider-zoom" aria-label="Open fullscreen view">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
              <span>Fullscreen</span>
            </button>
          </div>

          <div class="slider-thumbnails-track" id="slider-thumbnails" role="tablist" aria-label="Project images list">
            ${galleryImages.map((src, idx) => `
              <button class="slider-thumb-btn ${idx === 0 ? 'active' : ''}" data-slide-index="${idx}" aria-label="View visual ${idx + 1}" role="tab" aria-selected="${idx === 0}">
                <img src="${src}" alt="Thumbnail ${idx + 1}" loading="lazy" decoding="async">
              </button>
            `).join('')}
          </div>
        </div>
      </section>
      ` : ''}

      <nav class="project-detail-nav" aria-label="Project pagination">
        <a href="${url(prevP)}" class="project-nav-card prev-project" aria-label="Previous project: ${prevP.name}">
          <div class="project-nav-thumb-wrap">
            <img src="${prevP.image}" alt="${prevP.name}" loading="lazy" decoding="async">
            <span class="project-nav-arrow-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </span>
          </div>
          <div class="project-nav-info">
            <span class="nav-direction-label">← Previous Landmark</span>
            <strong class="nav-project-title">${prevP.name}</strong>
            <span class="nav-project-meta">${prevP.category} · ${prevP.location}</span>
          </div>
        </a>

        <a href="${url(nextP)}" class="project-nav-card next-project" aria-label="Next project: ${nextP.name}">
          <div class="project-nav-info align-right">
            <span class="nav-direction-label">Next Landmark →</span>
            <strong class="nav-project-title">${nextP.name}</strong>
            <span class="nav-project-meta">${nextP.category} · ${nextP.location}</span>
          </div>
          <div class="project-nav-thumb-wrap">
            <img src="${nextP.image}" alt="${nextP.name}" loading="lazy" decoding="async">
            <span class="project-nav-arrow-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </a>
      </nav>
    </div>
    ${cta()}
  `;
}
function leaderDetailsHtml(l) {
  const hasItems = Array.isArray(l.items) && l.items.filter(it => it && it.trim()).length > 0;
  const hasLoc = Boolean(l.location && l.location.trim());
  if (!hasItems && !hasLoc) return `<div class="md-details-block" id="leader-details-block" style="display:none;"></div>`;
  let blockHtml = `<div class="md-details-block" id="leader-details-block">`;
  if (hasItems) {
    blockHtml += `
      <div class="md-qual-box">
        <span class="md-subhead" id="leader-details-title">${l.detailsType || 'Qualifications'}</span>
        <ul class="md-qual-list" id="leader-details-list">
          ${l.items.filter(it => it && it.trim()).map(it => `
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              <span>${it}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
  if (hasLoc) {
    blockHtml += `
      <div class="md-loc-box">
        <span class="md-subhead">Location</span>
        <div class="md-loc-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span id="leader-loc-text">${l.location}</span>
        </div>
      </div>
    `;
  }
  blockHtml += `</div>`;
  return blockHtml;
}
function about() {
  return `
    <section class="about-hero">
      <div class="about-hero-bg">
        <img src="/assets/about%20hero.jpeg" alt="Danam Holdings commercial showroom construction" fetchpriority="high" decoding="async">
        <div class="about-hero-overlay"></div>
      </div>
      <div class="wrap about-hero-wrap">
        <div class="about-hero-content reveal">
          <h1 class="about-hero-title">Experienced Builders.<br>Reliable Partners.</h1>
          <p class="about-hero-lead">We help homeowners and businesses turn their land and blueprints into strong, high-quality buildings with complete peace of mind.</p>
          <div class="about-hero-btn-row">
            <a href="#md-profile" class="button hero-scroll-button" id="scroll-explore-btn">
              <span>Meet our leadership</span>
              <span class="btn-arrow" aria-hidden="true">${icoArrDown}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section md-section" id="md-profile">
      <div class="wrap">
        <div class="leadership-section-head reveal">
          <span class="eyebrow">OUR LEADERSHIP</span>
          <h2>Board of Directors &amp; Management</h2>
          <p class="section-sub">Guiding Danam Holdings with proven engineering acumen, transparent governance, and visionary execution.</p>
        </div>

        <div class="leadership-carousel-wrapper reveal" id="leadership-carousel">
          <button class="leadership-arrow-btn prev" id="lead-prev" aria-label="Previous Leader">
            ${icoArrLeft}
          </button>

          <div class="md-profile-card" id="leader-card">
            <div class="md-card-media">
              <div class="md-portrait-container" id="leader-media-wrap">
                <div class="md-initials-portrait">
                  <div class="md-initials-badge">
                    <span class="md-initials-letters">RE</span>
                  </div>
                  <span class="md-initials-role-tag">CHAIRMAN</span>
                </div>
              </div>
              <div class="leadership-mobile-nav" aria-label="Leadership slide navigation">
                <button class="leadership-arrow-btn-mob prev" id="lead-prev-mob" aria-label="Previous Leader">
                  ${icoArrLeft}
                </button>
                <button class="leadership-arrow-btn-mob next" id="lead-next-mob" aria-label="Next Leader">
                  ${icoArrRight}
                </button>
              </div>
            </div>

            <div class="md-card-body">
              <div class="md-card-top-bar">
                <span class="md-pill" id="leader-eyebrow">FOUNDER &amp; CHAIRMAN | STRATEGIC GOVERNANCE</span>
                <span class="leader-counter-badge" id="leader-counter">01 / 04</span>
              </div>

              <h2 class="md-name" id="leader-name">R. Elangovan</h2>
              <div class="md-designation-line">
                <strong id="leader-role">CHAIRMAN</strong>
                <span> · Danam Holdings</span>
              </div>
              <p class="md-bio" id="leader-bio">R. Elangovan is the Chairman of Danam Holdings, providing executive vision, corporate governance, and institutional leadership. With decades of industry stewardship, he steers the organization's strategic expansion, core ethical foundations, and adherence to premier structural standards across all South Indian turnkey developments.</p>
              
              ${leaderDetailsHtml(team[0])}
            </div>
          </div>

          <button class="leadership-arrow-btn next" id="lead-next" aria-label="Next Leader">
            ${icoArrRight}
          </button>
        </div>
      </div>
    </section>

    <section class="section about-stats-section">
      <div class="wrap">
        <div class="about-stats-header">
          <span class="eyebrow">Company at a Glance</span>
          <h2>Proven Scale. Measurable Impact.</h2>
        </div>
        <div class="about-stats-container">
          <div class="about-stat-item reveal">
            <span class="stat-number">₹46+ Cr</span>
            <span class="stat-label">DIRECT CLIENT PROJECTS</span>
            <p class="stat-desc">Substantial capital projects executed with structural integrity and budget discipline.</p>
          </div>
          <div class="about-stat-item reveal">
            <span class="stat-number">12+</span>
            <span class="stat-label">CORPORATE EPC / PMC PROJECTS</span>
            <p class="stat-desc">End-to-end execution and management consultancy for premier corporate institutions.</p>
          </div>
          <div class="about-stat-item reveal">
            <span class="stat-number">112+</span>
            <span class="stat-label">PROJECTS AS CONSULTANT</span>
            <p class="stat-desc">Strategic planning, architectural coordination, and construction supervision excellence.</p>
          </div>
          <div class="about-stat-item reveal">
            <span class="stat-number">50+</span>
            <span class="stat-label">TEAM CAPACITY</span>
            <p class="stat-desc">Dedicated civil engineers, project planners, site supervisors, and trade specialists.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section story-section">
      <div class="wrap split story-layout" style="align-items:center">
        <div class="reveal">
          <span class="eyebrow">Company Story</span>
          <h2 class="story-headline">Built on Experience.<br>Driven by Value.</h2>
          <div class="story-body">
            <p>Established in 2014, Danam Holdings focuses on construction, project management, and delivering value through well-planned projects. With experience across direct client engagements and corporate EPC/PMC projects, the company is committed to transforming assets through structured execution and a quality-focused approach.</p>
          </div>
          <div class="story-tags-row">
            <div class="story-tag-badge">
              <strong>2014</strong>
              <span>Established</span>
            </div>
            <div class="story-tag-badge">
              <strong>EPC & PMC</strong>
              <span>Project Delivery</span>
            </div>
            <div class="story-tag-badge">
              <strong>Madurai</strong>
              <span>Tamil Nadu, India</span>
            </div>
          </div>
        </div>
        <div class="story-visual reveal">
          <div class="story-img-card">
            <img src="/assets/about-story.webp" alt="Danam Holdings construction and project management" class="story-photo" loading="lazy" decoding="async">
            <div class="story-photo-caption">
              <span>Architectural precision · Turning visions into enduring assets</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section dark vision-mission-section">
      <div class="wrap">
        <div class="vm-wrapper reveal">
          <span class="eyebrow" style="color:#d2dfb6">Our Core Creed</span>
          <h2 class="vm-title">
            <span class="vm-title-line">A VISION TO CREATE VALUE.</span>
            <span class="vm-title-line vm-highlight">A COMMITMENT TO TRANSFORM ASSETS.</span>
          </h2>
          <div class="vm-pillars">
            <div class="vm-pillar-card">
              <div class="vm-pillar-num">01 / VISION</div>
              <h3>A Vision to Create Value</h3>
              <p>Designing and constructing built environments that deliver enduring economic, architectural, and lifestyle value. We look at every space as an opportunity to generate lasting returns for our clients.</p>
            </div>
            <div class="vm-pillar-card">
              <div class="vm-pillar-num">02 / COMMITMENT</div>
              <h3>A Commitment to Transform Assets</h3>
              <p>Executing with discipline, precision civil engineering, and proactive project management. Transforming land and structural opportunities into benchmark assets delivered on schedule and within budget.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section affiliations-section" aria-label="Affiliations & Memberships">
      <div class="wrap">
        <div class="affiliations-head reveal">
          <span class="eyebrow">Affiliations</span>
          <h2>Industry & Business Forum Memberships</h2>
          <p class="section-sub">Active members of prestigious business, youth, and engineering associations.</p>
        </div>
        <div class="affiliations-grid reveal">
          ${forums.map(f => `
            <div class="affiliation-card">
              <div class="affiliation-logo-wrap">
                <img src="${f.logo}" alt="${f.fullName || f.name}" loading="lazy" decoding="async" class="affiliation-logo">
              </div>
              <h3 class="affiliation-name">${f.name}</h3>
              <p class="affiliation-desc">${f.fullName}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="cta about-closing-cta">
      <div class="wrap">
        <div>
          <span class="eyebrow">Start Your Project</span>
          <h2>Let's Build Something<br>Valuable Together.</h2>
          <p class="cta-sub">Have a project in mind? Connect with Danam Holdings to discuss your construction and project management requirements.</p>
        </div>
        <a href="/contact" class="button">Let's Build Together <span class="arrow-wrap">${icoArrDiag}</span></a>
      </div>
    </section>
  `;
}
const rotaryServices = [
  { num: '01', title: 'TURNKEY CONSTRUCTION', desc: 'End-to-end design, civil engineering, and complete handover under one roof.' },
  { num: '02', title: 'RENOVATION', desc: 'Comprehensive building remodelling, modern facade upgrades, and structural restoration.' },
  { num: '03', title: 'COMMERCIAL PROJECTS', desc: 'Showrooms, retail complexes, corporate offices, and institutional facilities.' },
  { num: '04', title: 'NEW CONSTRUCTION', desc: 'Ground-up residential and commercial building construction with highest quality standards.' },
  { num: '05', title: 'STRENGTHENING & REHABILITATION', desc: 'Structural retrofitting, crack repair, foundation strengthening, and longevity enhancement.' },
  { num: '06', title: 'INFRASTRUCTURE & EPC WORKS', desc: 'Full engineering, procurement, and civil infrastructure execution.' },
  { num: '07', title: 'EPCM WORKS', desc: 'Engineering, Procurement, and Construction Management consultancy and supervision.' }
];

const rotarySection = () => `
  <section class="section rotary-section" id="rotary-club-services" aria-label="Rotary Club Service List">
    <div class="wrap">
      <div class="rotary-container reveal">
        <div class="rotary-header">
          <div class="rotary-brand">
            <div class="rotary-logo-box">
              <img src="/forumpic/rotary.jpeg" alt="Rotary Club" class="rotary-logo" loading="lazy" decoding="async">
            </div>
            <div class="rotary-brand-text">
              <span class="rotary-tag">BUSINESS CLASSIFICATION</span>
              <h2 class="rotary-heading">ROTARY CLUB</h2>
              <span class="rotary-subheading">SERVICE LIST</span>
            </div>
          </div>
          <div class="rotary-badge">
            <span class="rotary-badge-dot" aria-hidden="true"></span>
            <span>Accredited Member Offerings</span>
          </div>
        </div>

        <div class="rotary-grid">
          ${rotaryServices.map(s => `
            <a href="/contact?service=${encodeURIComponent(s.title)}" class="rotary-card" aria-label="Learn more about ${s.title}">
              <div class="rotary-card-top">
                <span class="rotary-num">${s.num}</span>
                <span class="rotary-arrow">${icoArrDiag}</span>
              </div>
              <h3 class="rotary-card-title">${s.title}</h3>
              <p class="rotary-card-desc">${s.desc}</p>
            </a>
          `).join('')}
        </div>

        <div class="rotary-bottom">
          <p class="rotary-bottom-text">
            Official construction, engineering, and project management services represented by <strong>Danam Holdings</strong> within the Rotary network.
          </p>
          <a class="button rotary-bottom-btn" href="/contact">Inquire for Projects <span class="arrow-wrap">${icoArrDiag}</span></a>
        </div>
      </div>
    </div>
  </section>
`;

function expertise() {
  return `
    <section class="expertise-split-hero">
      <div class="expertise-split-grid">
        
        <div class="expertise-media-col reveal">
          <div class="expertise-media-badge">
            <span class="hero-pill-dot" style="background:#8ce23e" aria-hidden="true"></span>
            <span>ALL CONSTRUCTION DISCIPLINES</span>
          </div>
          <img src="/assets/expertise-hero.webp" alt="Danam Holdings comprehensive construction and engineering disciplines" fetchpriority="high" decoding="async" class="expertise-full-img">
        </div>

        <div class="expertise-content-col">
          <div class="expertise-content-inner reveal">
            <div class="hero-pill-badge" style="margin-bottom:20px">
              <span class="hero-pill-dot" aria-hidden="true"></span>
              <span class="hero-pill-text">ALL CONSTRUCTION SERVICES UNDER ONE ROOF</span>
            </div>

            <h1 class="split-hero-title">
              Everything You Need<br>to <span class="title-green-accent">Build with Confidence.</span>
            </h1>

            <p class="split-hero-desc">
              From 2D floor plans and 3D designs to civil construction, plumbing, electrical, interiors, and final handover — our experienced team handles every stage directly.
            </p>

            <div class="split-hero-actions" style="margin-bottom:0">
              <a href="#expertise-disciplines" class="btn-hero-primary">
                <span>View All Services</span>
                <span class="btn-hero-arrow">${icoArrDown}</span>
              </a>
              <a href="/contact" class="btn-hero-secondary">
                <span>Plan your project</span>
                <span class="btn-hero-arrow">${icoArrDiag}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="section dark" id="expertise-disciplines">
      <div class="wrap services-layout">
        <div>
          <span class="eyebrow">11 Specialist Services</span>
          <h2>Complete Construction.<br>Care for Every Detail.</h2>
          <p>${workTypes.join(' · ')}</p>
          <a class="btn-action btn-action-light" href="/contact">Plan your project <span class="arrow">${icoArrDiag}</span></a>
        </div>
        <div>
          ${servicesInteractive(services, 'expertise-services')}
        </div>
      </div>
    </section>
    ${process()}
    ${rotarySection()}
    ${faqSection()}
    ${cta()}
  `;
}
function contact() {
  return `
    <section class="contact-split-hero">
      <div class="wrap contact-split-wrap">
        <div class="contact-hero-left reveal">
          <span class="eyebrow">Get In Touch</span>
          <h1 class="contact-hero-title">Planning to Build?<br>Let's Talk.</h1>
          <p class="contact-hero-lead">Tell us about your home, commercial building, or renovation plans. Our team will review your site requirements, answer your questions, and give you a clear, honest cost estimate.</p>
          <div class="contact-hero-btn-row">
            <a href="#contact-section" class="button">
              <span>Start Consultation</span>
              <span class="arrow-wrap">${icoArrDown}</span>
            </a>
          </div>
        </div>

        <div class="contact-hero-right reveal">
          <div class="contact-house-showcase">
            <div class="contact-house-ambient"></div>
            <img src="/assets/contact-house.png" alt="Danam Holdings turnkey construction & luxury architecture" class="contact-house-img" fetchpriority="high" decoding="async">
            <div class="contact-house-shadow"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap contact-layout" id="contact-section" style="padding-top:60px; padding-bottom:95px">
      <div>
        <span class="eyebrow">Get in touch</span>
        <h2>Let's talk<br>about your project.</h2>
        <div class="contact-row">
          <small>Visit our office</small>
          <address>${company.address.lines.join('<br>')}</address>
          <a class="btn-action btn-action-outline" href="${company.address.mapLink}" target="_blank" rel="noopener">Get directions <span class="arrow">${icoArrDiag}</span></a>
        </div>
        <div class="contact-row">
          <small>Call our team</small>
          <a href="${company.phoneHref}">${company.phone}</a>
          <a href="${company.phoneHref2}">${company.phone2}</a>
        </div>
        <div class="contact-row">
          <small>Email</small>
          <a href="mailto:${company.email}" class="contact-email-link">${company.email}</a>
        </div>
        <div class="contact-row">
          <small>Working hours</small>
          ${company.hours}
        </div>
      </div>

      <form class="contact-form">
        <h2>Tell us your vision.</h2>
        <p class="muted contact-sub">A few details to start your project consultation.</p>
        <label for="name">Your name *</label>
        <input id="name" name="name" autocomplete="name" placeholder="Full name" required maxlength="100">
        <label for="phone">Mobile number (+91) *</label>
        <input id="phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" pattern="[6-9][0-9]{9}" maxlength="10" placeholder="10-digit mobile number" title="Enter a valid 10-digit Indian mobile number" required>
        <label for="service">Service needed *</label>
        <select id="service" name="service" required>
          ${services.map(s => `<option>${s.title}</option>`).join('')}
          <option>Other Construction Inquiries</option>
        </select>
        <label for="message">Tell us about your project</label>
        <textarea id="message" name="message" placeholder="Location, type of project, and what you have in mind…" maxlength="3000"></textarea>
        <button class="button" type="submit">Continue on WhatsApp <span class="arrow-wrap">${icoArrDiag}</span></button>
        <small>This opens WhatsApp with your enquiry ready to review and send. No enquiry is sent automatically.</small>
      </form>
    </section>

    <a class="map-link-wrapper" href="${company.address.mapLink}" target="_blank" rel="noopener noreferrer" aria-label="Open Danam Holdings in Google Maps and get directions" title="Click to open directions in Google Maps">
      <iframe class="map" title="Danam Holdings office location" src="${company.address.mapEmbed}" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
      <div class="map-overlay-badge">
        <span class="map-overlay-icon">${icoPin}</span>
        <span class="map-overlay-text">Click to open directions in Google Maps</span>
        <span class="map-overlay-arrow">${icoArrDiag}</span>
      </div>
    </a>
  `;
}
function initDetailBackButton(p) {
  const btn = document.getElementById('detail-back-btn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    if (window.history.length > 1 && document.referrer && (document.referrer.includes('/our-projects') || document.referrer.includes(location.host))) {
      e.preventDefault();
      window.history.back();
    }
  });
}

const currentProject = projects.find(p => url(p) === path);
let title = 'Home';
if (path === '/') {
  $('#main').innerHTML = home();
} else if (path === '/our-projects') {
  $('#main').innerHTML = portfolio();
  initTestimonialsSlider();
  title = 'Our Projects';
  if (location.hash) {
    setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  }
} else if (currentProject) {
  $('#main').innerHTML = detail(currentProject);
  initProjectSlider(currentProject);
  initDetailBackButton(currentProject);
  title = currentProject.name;
} else if (path === '/about-us') {
  $('#main').innerHTML = about();
  initLeadershipSlider();
  title = 'About Us';
} else if (path === '/services' || path === '/expertise') {
  $('#main').innerHTML = expertise();
  initServicesInteractive('expertise-services', services);
  title = 'Services';
} else if (path === '/contact') {
  $('#main').innerHTML = contact();
  title = 'Contact Us';
} else {
  $('#main').innerHTML = pageTop('Page not found', 'A different direction.') + `<div class="wrap section"><a class="button" href="/">Return home <span class="arrow-wrap">${icoArrDiag}</span></a></div>`;
  title = 'Page not found';
}
document.title = title + ' | Danam Holdings';
if (document.getElementById('leadership-carousel')) { initLeadershipSlider(); }

function initLeadershipSlider() {
  const container = document.getElementById('leadership-carousel');
  if (!container || !team || team.length === 0) return;
  if (container.dataset.sliderInitialized === 'true') return;
  container.dataset.sliderInitialized = 'true';

  let currentIdx = 0;
  let autoplayTimer = null;
  let isHovered = false;

  const leadCard = document.getElementById('leader-card');

  function stopAutoplay() {
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    if (isHovered || document.hidden) return;
    if (container.matches(':hover') || (leadCard && leadCard.matches(':hover'))) {
      isHovered = true;
      return;
    }
    autoplayTimer = setTimeout(() => {
      updateLeader(currentIdx + 1);
      startAutoplay();
    }, 3000);
  }

  function updateLeader(idx) {
    currentIdx = (idx + team.length) % team.length;
    const l = team[currentIdx];

    const card = document.getElementById('leader-card');
    if (card) {
      card.style.opacity = '0.35';
      card.style.transform = 'translateY(5px)';
    }

    setTimeout(() => {
      const counter = document.getElementById('leader-counter');
      if (counter) counter.textContent = `${num(currentIdx + 1)} / ${num(team.length)}`;

      const mediaWrap = document.getElementById('leader-media-wrap');
      if (mediaWrap) {
        if (l.image) {
          mediaWrap.innerHTML = `<img src="${l.image}" alt="${l.name} - ${l.role}, Danam Holdings" class="md-portrait" fetchpriority="high" decoding="async">`;
        } else {
          mediaWrap.innerHTML = `
            <div class="md-initials-portrait">
              <div class="md-initials-badge">
                <span class="md-initials-letters">${l.initials}</span>
              </div>
              <span class="md-initials-role-tag">${l.badge}</span>
            </div>
          `;
        }
      }

      const eyebrow = document.getElementById('leader-eyebrow');
      if (eyebrow) eyebrow.textContent = l.eyebrow;

      const name = document.getElementById('leader-name');
      if (name) name.textContent = l.name;

      const role = document.getElementById('leader-role');
      if (role) role.textContent = l.badge;

      const bio = document.getElementById('leader-bio');
      if (bio) bio.textContent = l.bio;

      const detailsBlock = document.getElementById('leader-details-block');
      if (detailsBlock) {
        const hasItems = Array.isArray(l.items) && l.items.filter(it => it && it.trim()).length > 0;
        const hasLoc = Boolean(l.location && l.location.trim());
        if (!hasItems && !hasLoc) {
          detailsBlock.style.display = 'none';
          detailsBlock.innerHTML = '';
        } else {
          detailsBlock.style.display = 'grid';
          let blockHtml = '';
          if (hasItems) {
            blockHtml += `
              <div class="md-qual-box">
                <span class="md-subhead" id="leader-details-title">${l.detailsType || 'Qualifications'}</span>
                <ul class="md-qual-list" id="leader-details-list">
                  ${l.items.filter(it => it && it.trim()).map(it => `
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                      <span>${it}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            `;
          }
          if (hasLoc) {
            blockHtml += `
              <div class="md-loc-box">
                <span class="md-subhead">Location</span>
                <div class="md-loc-pill">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span id="leader-loc-text">${l.location}</span>
                </div>
              </div>
            `;
          }
          detailsBlock.innerHTML = blockHtml;
        }
      }

      if (card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }, 140);
  }

  const prevBtn = document.getElementById('lead-prev');
  const nextBtn = document.getElementById('lead-next');
  if (prevBtn) {
    prevBtn.onclick = () => {
      updateLeader(currentIdx - 1);
      if (!isHovered) startAutoplay();
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      updateLeader(currentIdx + 1);
      if (!isHovered) startAutoplay();
    };
  }

  const prevMob = document.getElementById('lead-prev-mob');
  const nextMob = document.getElementById('lead-next-mob');
  if (prevMob) {
    prevMob.onclick = () => {
      updateLeader(currentIdx - 1);
      isHovered = false;
      startAutoplay();
    };
  }
  if (nextMob) {
    nextMob.onclick = () => {
      updateLeader(currentIdx + 1);
      isHovered = false;
      startAutoplay();
    };
  }

  if (leadCard) {
    let leadTouchStartX = 0;
    leadCard.addEventListener('touchstart', (e) => {
      stopAutoplay();
      leadTouchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    leadCard.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - leadTouchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) updateLeader(currentIdx + 1);
        else updateLeader(currentIdx - 1);
      }
      isHovered = false;
      startAutoplay();
    }, { passive: true });
  }

  container.addEventListener('mouseenter', () => {
    isHovered = true;
    stopAutoplay();
  });
  container.addEventListener('mouseleave', () => {
    isHovered = false;
    startAutoplay();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  startAutoplay();
}
const menu = $('.menu-toggle'); menu.addEventListener('click', () => { const open = $('.nav').classList.toggle('open'); menu.setAttribute('aria-expanded', open); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); menu.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu' }); document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('.nav').classList.contains('open')) { menu.click(); menu.focus() } });
document.addEventListener('click', e => { if ($('.nav').classList.contains('open') && !$('#header').contains(e.target)) menu.click() }); window.matchMedia('(min-width:761px)').addEventListener('change', e => { if (e.matches && $('.nav').classList.contains('open')) menu.click() });
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target) } }) }, { rootMargin: '450px 0px 450px 0px', threshold: 0 }); function reveal() { const elements = document.querySelectorAll('.reveal'); const winH = window.innerHeight; elements.forEach(e => { const rect = e.getBoundingClientRect(); if (rect.top < winH + 350) { e.classList.add('in'); } else { observer.observe(e); } }) } reveal();
document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b) }); const list = projects.filter(p => b.dataset.filter === 'All projects' || p.category.includes(b.dataset.filter)); $('#project-results').innerHTML = list.map(card).join(''); $('.project-count').textContent = list.length + ' projects'; reveal() }));
const heroTrack = $('#hero-slider-track');
if (heroTrack) {
  const descriptions = [
    'Designed with vision. Built with precision.',
    'Crafting architectural excellence.',
    'End-to-end civil engineering & infrastructure.',
    'Transforming spaces into inspiring environments.',
    'Engineering trust & enduring value.'
  ];
  const labels = [
    'CONSTRUCTION & CIVIL ENGINEERING',
    'COMMERCIAL & CIVIC LANDMARK',
    'TURNKEY SOLUTIONS IN MADURAI',
    'INTERIORS & RENOVATION',
    'QUALITY & TRANSPARENCY'
  ];

  // Pre-load all 5 images for instant smooth transitions
  [1, 2, 3, 4, 5].forEach(i => {
    const preloadImg = new Image();
    preloadImg.src = `/homehero/hh${i}.webp`;
  });

  // Track layout: [hh5_clone(0), hh1(1), hh2(2), hh3(3), hh4(4), hh5(5), hh1_clone(6)]
  let currentIdx = 1;
  const totalRealSlides = 5;
  let isTransitioning = false;
  let heroTimer = null;
  let isHovered = false;

  function updateMeta(realIdx) {
    const label = $('#hero-label');
    if (label) label.textContent = `${num(realIdx + 1)} / ${labels[realIdx]}`;

    const text = $('#hero-text');
    if (text) {
      text.style.transition = 'opacity 0.25s ease, transform 0.3s ease';
      text.style.opacity = '0.35';
      text.style.transform = 'translateY(4px)';
      setTimeout(() => {
        text.textContent = descriptions[realIdx];
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';
      }, 140);
    }

    const counter = $('#hero-counter');
    if (counter) counter.textContent = `${num(realIdx + 1)} / 05`;
  }

  function goToSlide(targetIdx, withAnimation = true) {
    if (withAnimation && isTransitioning) return;

    if (withAnimation) {
      isTransitioning = true;
      heroTrack.style.transition = 'transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      heroTrack.style.transition = 'none';
    }

    currentIdx = targetIdx;
    heroTrack.style.transform = `translateX(-${currentIdx * 100}%)`;

    const realIdx = (currentIdx - 1 + totalRealSlides) % totalRealSlides;
    updateMeta(realIdx);

    if (withAnimation) {
      clearTimeout(heroTimer);
      setTimeout(() => {
        if (currentIdx === 6) {
          heroTrack.style.transition = 'none';
          currentIdx = 1;
          heroTrack.style.transform = 'translateX(-100%)';
          heroTrack.offsetHeight;
        } else if (currentIdx === 0) {
          heroTrack.style.transition = 'none';
          currentIdx = 5;
          heroTrack.style.transform = 'translateX(-500%)';
          heroTrack.offsetHeight;
        }
        isTransitioning = false;
        if (!isHovered && !document.hidden) {
          scheduleAutoplay();
        }
      }, 870);
    }
  }

  function scheduleAutoplay() {
    clearTimeout(heroTimer);
    heroTimer = setTimeout(() => {
      goToSlide(currentIdx + 1, true);
    }, 2000); // 2 seconds display time as requested
  }

  function stopAutoplay() {
    clearTimeout(heroTimer);
    heroTimer = null;
  }

  const prevBtn = $('#hero-prev');
  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.preventDefault();
      if (isTransitioning) return;
      stopAutoplay();
      goToSlide(currentIdx - 1, true);
    };
  }

  const nextBtn = $('#hero-next');
  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.preventDefault();
      if (isTransitioning) return;
      stopAutoplay();
      goToSlide(currentIdx + 1, true);
    };
  }

  const heroCard = document.querySelector('.hero-card-frame') || document.querySelector('.split-hero-right');
  if (heroCard) {
    heroCard.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoplay();
    });
    heroCard.addEventListener('mouseleave', () => {
      isHovered = false;
      scheduleAutoplay();
    });

    let touchStartX = 0;
    heroCard.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    heroCard.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40 && !isTransitioning) {
        stopAutoplay();
        if (diff < 0) goToSlide(currentIdx + 1, true);
        else goToSlide(currentIdx - 1, true);
      }
    }, { passive: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else if (!isHovered) scheduleAutoplay();
  });

  scheduleAutoplay();
}
function initProjectSlider(p) {
  const galleryImages = (p.images && p.images.length > 0) ? p.images : [p.image];
  const viewport = $('#slider-viewport');
  const track = $('#slider-track');
  const prevBtn = $('#slider-prev');
  const nextBtn = $('#slider-next');
  const currentNumEl = $('#gallery-current-num');
  const thumbs = document.querySelectorAll('.slider-thumb-btn');
  const zoomBtn = $('#slider-zoom');
  const dialog = $('#lightbox');

  if (!viewport || !track || galleryImages.length === 0) return;

  let currentIdx = 0;
  const total = galleryImages.length;
  let autoplayTimer = null;

  function updateUI(idx) {
    const displayIdx = idx >= total ? 0 : idx;
    if (currentNumEl) currentNumEl.textContent = num(displayIdx + 1);
    const thumbsTrack = $('#slider-thumbnails');
    thumbs.forEach((th, i) => {
      const act = i === displayIdx;
      th.classList.toggle('active', act);
      th.setAttribute('aria-selected', act);
      if (act && thumbsTrack) {
        const trackWidth = thumbsTrack.clientWidth;
        const scrollTarget = th.offsetLeft - (trackWidth / 2) + (th.clientWidth / 2);
        thumbsTrack.scrollTo({
          left: Math.max(0, scrollTarget),
          behavior: 'smooth'
        });
      }
    });
  }

  function moveTo(idx, animate = true) {
    currentIdx = idx;
    if (animate) {
      track.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${currentIdx * 100}%)`;
    updateUI(currentIdx);
  }

  track.addEventListener('transitionend', () => {
    if (currentIdx >= total) {
      moveTo(0, false);
    }
  });

  function nextSlide() {
    if (total <= 1) return;
    if (currentIdx >= total) {
      moveTo(0, false);
      track.offsetHeight;
    }
    moveTo(currentIdx + 1, true);
  }

  function prevSlide() {
    if (total <= 1) return;
    if (currentIdx === 0) {
      moveTo(total, false);
      track.offsetHeight;
      requestAnimationFrame(() => {
        moveTo(total - 1, true);
      });
    } else {
      moveTo(currentIdx - 1, true);
    }
  }

  function startAutoplay() {
    if (total <= 1) return;
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 3200);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', e => {
      e.stopPropagation();
      prevSlide();
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', e => {
      e.stopPropagation();
      nextSlide();
      restartAutoplay();
    });
  }

  thumbs.forEach(th => {
    th.addEventListener('click', () => {
      const target = +th.dataset.slideIndex;
      moveTo(target, true);
      restartAutoplay();
    });
  });

  function openLightbox(startIdx) {
    if (!dialog) return;
    stopAutoplay();
    let lbIdx = startIdx >= total ? 0 : startIdx;

    const closeBtn = dialog.querySelector('.close');
    const prevBtn = dialog.querySelector('.prev');
    const nextBtn = dialog.querySelector('.next');
    if (closeBtn && !closeBtn.querySelector('svg')) {
      closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    }
    if (prevBtn && !prevBtn.querySelector('svg')) {
      prevBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
    }
    if (nextBtn && !nextBtn.querySelector('svg')) {
      nextBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
    }

    const showLb = () => {
      const lbImg = dialog.querySelector('img');
      lbImg.src = galleryImages[lbIdx];
      lbImg.alt = `${p.name} — visual ${lbIdx + 1}`;
      lbImg.setAttribute('loading', 'lazy');
      lbImg.setAttribute('decoding', 'async');
      dialog.querySelector('p').textContent = `${p.name} · ${lbIdx + 1} / ${total}`;
    };
    showLb();
    dialog.showModal();
    document.body.style.overflow = 'hidden';

    dialog.onclick = e => {
      if (e.target === dialog) dialog.close();
    };

    if (closeBtn) closeBtn.onclick = () => dialog.close();
    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      moveTo(lbIdx, true);
      startAutoplay();
    }, { once: true });

    if (prevBtn) prevBtn.onclick = e => {
      e.stopPropagation();
      lbIdx = (lbIdx - 1 + total) % total;
      showLb();
    };
    if (nextBtn) nextBtn.onclick = e => {
      e.stopPropagation();
      lbIdx = (lbIdx + 1) % total;
      showLb();
    };

    const handleKey = e => {
      if (!dialog.open) {
        window.removeEventListener('keydown', handleKey);
        return;
      }
      if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % total; showLb(); }
      if (e.key === 'ArrowLeft') { lbIdx = (lbIdx - 1 + total) % total; showLb(); }
    };
    window.addEventListener('keydown', handleKey);
  }

  track.addEventListener('click', e => {
    const slide = e.target.closest('.slider-slide');
    if (slide) {
      const idx = +slide.dataset.slideIdx || 0;
      openLightbox(idx);
    }
  });

  if (zoomBtn) {
    zoomBtn.addEventListener('click', e => {
      e.stopPropagation();
      openLightbox(currentIdx);
    });
  }

  let touchStartX = 0;
  viewport.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
      restartAutoplay();
    }
  }, { passive: true });

  window.addEventListener('keydown', e => {
    if (dialog && dialog.open) return;
    if (e.key === 'ArrowRight') { nextSlide(); restartAutoplay(); }
    if (e.key === 'ArrowLeft') { prevSlide(); restartAutoplay(); }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  moveTo(0, false);
  startAutoplay();
}
if ($('.contact-form')) { const selected = new URLSearchParams(location.search).get('service'); if (services.some(s => s.title === selected)) $('#service').value = selected; $('#phone').addEventListener('input', e => e.target.value = e.target.value.replace(/\D/g, '')); $('.contact-form').addEventListener('submit', e => { e.preventDefault(); if (!$('#name').value.trim()) { $('#name').setCustomValidity('Please enter your name.'); $('#name').reportValidity(); return } const f = new FormData(e.target); const message = `Hello Danam Holdings,\n\nI would like a project consultation.\nName: ${f.get('name').trim()}\nMobile: +91 ${f.get('phone')}\nService: ${f.get('service')}\nProject details: ${f.get('message').trim() || 'To be discussed'}`; window.open('https://wa.me/' + company.whatsapp + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer') }); $('#name').oninput = () => $('#name').setCustomValidity('') }

// Lightweight lazy loading enforcer for below-the-fold images
function setupLazyLoading() {
  const isHero = img => img.getAttribute('fetchpriority') === 'high' || img.id === 'hero-img' || img.classList.contains('detail-cover');
  document.querySelectorAll('img').forEach(img => {
    if (isHero(img)) return;
    if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
    if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
  });
}
setupLazyLoading();

// Ensure lightbox buttons always have crisp SVG icons
(() => {
  const lb = $('#lightbox');
  if (lb) {
    const c = lb.querySelector('.close'), p = lb.querySelector('.prev'), n = lb.querySelector('.next');
    if (c && !c.querySelector('svg')) c.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    if (p && !p.querySelector('svg')) p.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
    if (n && !n.querySelector('svg')) n.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
  }
})();

