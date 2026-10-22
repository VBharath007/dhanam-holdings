import './style.css';
import {company,services,projects,clients,team,workTypes,forums,commitments,faqs,testimonials} from './data.js';
import { gsap } from 'gsap';


const $=s=>document.querySelector(s),slug=p=>p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),url=p=>'/projects/'+slug(p),num=n=>String(n).padStart(2,'0');
const image=(src,alt,cls='')=>`<img src="${src}" alt="${alt}" class="${cls}" loading="lazy" decoding="async">`;
const logo=`<a class="logo" href="/" aria-label="Danam Holdings home"><img src="/dhlogo.webp" alt="Danam Holdings logo" loading="lazy" decoding="async"><span><strong>DANAM HOLDINGS</strong><small>TOWARDS FORTUNE UNFOLDINGS</small></span></a>`;
const nav=[['/','Home'],['/about-us','About us'],['/services','Expertise'],['/our-projects','Our projects']];
const path=location.pathname.replace(/\/$/,'')||'/';
const sparkleColor='#74b73e';
const activeNavIndex=nav.findIndex(([u])=>u===path);

$('#header').innerHTML=`
<div class="wrap header-inner">
  <div class="header-left">
    ${logo}
  </div>

  <nav class="sparkle-nav navigation-menu" id="sparkle-navbar" aria-label="Main navigation">
    <ul class="sparkle-list">
      ${nav.map(([u,t],i)=>`
        <li class="${i===activeNavIndex?'active':''}">
          <a href="${u}" class="sparkle-btn" data-index="${i}" ${path===u?'aria-current="page"':''}>${t}</a>
        </li>
      `).join('')}
    </ul>
    <div class="active-element" id="sparkle-active-element"></div>
  </nav>

  <div class="header-right">
    <a href="/contact" class="button header-cta">Let's build together <span>↗</span></a>
    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-navigation">
      <span class="menu-label">Menu</span>
      <span class="menu-icon" aria-hidden="true"><i></i><i></i></span>
    </button>
  </div>

  <nav class="nav mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
    ${nav.map(([u,t])=>`<a href="${u}" ${path===u?'aria-current="page"':''}>${t}</a>`).join('')}
    <a href="/contact" class="button">Let's build together <span>↗</span></a>
  </nav>
</div>`;

function initSparkleNavbar(){
  const navElement=document.getElementById('sparkle-navbar');
  const activeElement=document.getElementById('sparkle-active-element');
  if(!navElement||!activeElement)return;

  const buttons=Array.from(navElement.querySelectorAll('.sparkle-btn'));
  let activeIndex=activeNavIndex>=0?activeNavIndex:0;
  let isAnimating=false;

  const strikeSVG=`
    <svg viewBox="0 0 114 12" preserveAspectRatio="none">
      <g fill="none" stroke="${sparkleColor}" stroke-width="0.75" stroke-linecap="round">
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
      </g>
    </svg>`;

  const createSVG=(el)=>{
    el.innerHTML=`
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

  const getOffsetLeft=(element)=>{
    if(!navElement||!activeElement||!element)return 0;
    const elementRect=element.getBoundingClientRect();
    const navRect=navElement.getBoundingClientRect();
    const activeElementWidth=activeElement.offsetWidth||36;
    return elementRect.left-navRect.left+(elementRect.width-activeElementWidth)/2;
  };

  const positionActive=(idx)=>{
    const btn=buttons[idx];
    if(btn){
      gsap.set(activeElement,{
        x:getOffsetLeft(btn),
      });
      gsap.to(activeElement,{
        '--active-element-show':'1',
        duration:0.25,
      });
    }else{
      gsap.to(activeElement,{
        '--active-element-show':'0',
        duration:0.2,
      });
    }
  };

  requestAnimationFrame(()=>{
    if(activeNavIndex>=0){
      positionActive(activeNavIndex);
    }
  });

  window.addEventListener('resize',()=>{
    if(activeNavIndex>=0&&buttons[activeIndex]){
      gsap.set(activeElement,{x:getOffsetLeft(buttons[activeIndex])});
    }
  });

  const animateTo=(newIndex,targetUrl)=>{
    if(newIndex===activeIndex||isAnimating){
      if(targetUrl&&location.pathname!==targetUrl)location.href=targetUrl;
      return;
    }

    const oldButton=buttons[activeIndex];
    const newButton=buttons[newIndex];
    if(!oldButton||!newButton){
      if(targetUrl)location.href=targetUrl;
      return;
    }

    isAnimating=true;
    const x=getOffsetLeft(newButton);
    const direction=newIndex>activeIndex?'after':'before';
    const spacing=Math.abs(x-getOffsetLeft(oldButton));

    navElement.classList.add(direction);

    gsap.set(activeElement,{
      rotateY:direction==='before'?'180deg':'0deg',
    });

    gsap.to(activeElement,{
      keyframes:[
        {
          '--active-element-width':`${spacing>navElement.offsetWidth-40?navElement.offsetWidth-40:spacing}px`,
          duration:0.28,
          ease:'none',
          onStart:()=>{
            createSVG(activeElement);
            gsap.to(activeElement,{
              '--active-element-opacity':1,
              duration:0.1,
            });
          },
        },
        {
          '--active-element-scale-x':'0',
          '--active-element-scale-y':'.25',
          '--active-element-width':'0px',
          duration:0.28,
          onStart:()=>{
            gsap.to(activeElement,{
              '--active-element-mask-position':'40%',
              duration:0.45,
            });
            gsap.to(activeElement,{
              '--active-element-opacity':0,
              delay:0.35,
              duration:0.2,
            });
          },
          onComplete:()=>{
            activeElement.innerHTML='';
            navElement.classList.remove('before','after');
            gsap.set(activeElement,{
              x:getOffsetLeft(newButton),
              '--active-element-show':'1',
            });
            buttons.forEach((b,i)=>b.closest('li').classList.toggle('active',i===newIndex));
            activeIndex=newIndex;
            isAnimating=false;
            if(targetUrl&&location.pathname!==targetUrl){
              location.href=targetUrl;
            }
          },
        },
      ],
    });

    gsap.to(activeElement,{
      x,
      '--active-element-strike-x':'-50%',
      duration:0.56,
      ease:'none',
    });
  };

  buttons.forEach((btn,idx)=>{
    btn.addEventListener('click',(e)=>{
      if(e.ctrlKey||e.metaKey||e.shiftKey||e.button!==0)return;
      const targetUrl=nav[idx][0];
      if(targetUrl===location.pathname){
        e.preventDefault();
        return;
      }
      // Instant page navigation without 560ms blocking delay
    });
  });
}
initSparkleNavbar();

$('#footer').innerHTML=`<div class="wrap"><div class="footer-top"><div>${logo}<p>Complete construction and project management solutions.<br>Rooted in Madurai. Building across South India.</p><div class="footer-socials" style="display:flex;gap:25px">${Object.entries(company.socials).map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener noreferrer">${n[0].toUpperCase()+n.slice(1)} ↗</a>`).join('')}</div></div><div><h3>Explore</h3><div class="footer-links">${nav.map(([u,t])=>`<a href="${u}">${t}</a>`).join('')}<a href="/contact">Contact us</a></div></div><div><h3>Start a conversation</h3><div class="footer-links"><a href="${company.phoneHref}">${company.phone}</a><a href="${company.phoneHref2}">${company.phone2}</a><a href="mailto:${company.email}" style="overflow-wrap:anywhere">${company.email}</a><p>${company.address.lines.join('<br>')}</p></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Danam Holdings. All rights reserved.</span><span>Construction. Integrity. Lasting value.</span><a href="#main">Back to top ↑</a></div></div>`;
const cta=()=>`<section class="cta"><div class="wrap"><div><span class="eyebrow">A good project starts with a conversation</span><h2>Let's build something<br>that lasts.</h2></div><a href="/contact" class="button">Discuss your project <span>↗</span></a></div></section>`;
const card=p=>`<a class="project-card reveal" href="${url(p)}"><div class="project-image">${image(p.image,p.name)}<span class="circle" style="display:grid;place-items:center">↗</span></div><div class="project-meta"><div><h3>${p.name}</h3><p>${p.location}</p></div><span>${p.category}</span></div></a>`;
const clientLogos=['thanga mail.webp','theni anantham.webp','oyo.webp','Rajmahal.jpeg','sacs.png','sita ram jewellers.webp','msd.webp'];
const clientItems=()=>clients.map((c,i)=>`<figure class="marquee-item">${image('/our brand clients/'+clientLogos[i],c)}<figcaption>${c}</figcaption></figure>`).join('');
const clientSection=()=>{const items=clientItems()+clientItems();return `<section class="client-section" aria-label="Trusted by respected names"><div class="wrap"><span class="eyebrow">Trusted by respected names</span></div><div class="marquee" tabindex="0"><div class="marquee-track"><div class="marquee-group">${items}</div><div class="marquee-group" aria-hidden="true">${items}</div></div></div></section>`;};
const homeDisciplines=[
  {num:'01',title:services[0].title,desc:services[0].desc,image:services[0].image,tag:services[0].items.slice(0,3).join(' · '),link:'/contact?service='+encodeURIComponent(services[0].title)},
  {num:'02',title:services[2].title,desc:services[2].desc,image:services[2].image,tag:services[2].items.slice(0,3).join(' · '),link:'/contact?service='+encodeURIComponent(services[2].title)},
  {num:'03',title:services[4].title,desc:services[4].desc,image:services[4].image,tag:services[4].items.slice(0,3).join(' · '),link:'/contact?service='+encodeURIComponent(services[4].title)},
  {num:'04',title:services[8].title,desc:services[8].desc,image:services[8].image,tag:services[8].items.slice(0,3).join(' · '),link:'/contact?service='+encodeURIComponent(services[8].title)}
];

const servicesInteractive=(list=homeDisciplines,containerId='home-services')=>`<div class="services-interactive" id="${containerId}"><div class="services-list" role="tablist" aria-label="Our disciplines">${list.map((d,i)=>`<div class="service-hover-item ${i===0?'active':''}" data-index="${i}" role="tab" tabindex="0" aria-selected="${i===0}"><div class="service-hover-header"><div class="service-hover-meta"><span class="service-hover-num">${d.num||num(i+1)}</span><h3 class="service-hover-title">${d.title}</h3></div><span class="service-hover-arrow" aria-hidden="true">→</span></div><div class="service-mobile-drawer"><div class="service-mobile-media"><img src="${d.image}" alt="${d.title}" class="service-mobile-img" loading="lazy" decoding="async"></div><p class="service-mobile-desc">${d.desc}</p><div class="service-mobile-items">${(d.items||[]).slice(0,4).map(it=>`<span class="service-preview-pill">${it}</span>`).join('')}</div><div class="service-mobile-footer"><a class="service-preview-link btn-action btn-action-sm btn-action-light" href="${d.link||'/contact?service='+encodeURIComponent(d.title)}">Discuss this service <span class="arrow">↗</span></a></div></div></div>`).join('')}</div><div class="service-preview-panel"><div class="service-preview-media">${list.map((d,i)=>`<img src="${d.image}" alt="${d.title}" class="service-preview-img ${i===0?'active':''}" data-preview-index="${i}" loading="lazy" decoding="async">`).join('')}</div><div class="service-preview-info"><p class="service-preview-desc" id="${containerId}-desc">${list[0].desc}</p><div class="service-preview-items" id="${containerId}-items">${(list[0].items||[]).slice(0,4).map(it=>`<span class="service-preview-pill">${it}</span>`).join('')}</div><div class="service-preview-footer"><span class="service-preview-tag" id="${containerId}-tag">${list[0].tag||(list[0].items||[]).slice(0,2).join(' · ')}</span><a class="service-preview-link btn-action btn-action-sm btn-action-light" id="${containerId}-link" href="${list[0].link||'/contact?service='+encodeURIComponent(list[0].title)}">Discuss this service <span class="arrow">↗</span></a></div></div></div></div>`;

function initServicesInteractive(containerId='home-services',list=homeDisciplines){
  const container=document.getElementById(containerId);
  if(!container)return;
  const items=container.querySelectorAll('.service-hover-item');
  const imgs=container.querySelectorAll('.service-preview-img');
  const descEl=document.getElementById(`${containerId}-desc`);
  const tagEl=document.getElementById(`${containerId}-tag`);
  const linkEl=document.getElementById(`${containerId}-link`);
  const itemsEl=document.getElementById(`${containerId}-items`);
  function setActive(idx){
    items.forEach((it,i)=>{const act=i===idx;it.classList.toggle('active',act);it.setAttribute('aria-selected',act)});
    imgs.forEach((img,i)=>img.classList.toggle('active',i===idx));
    const d=list[idx];
    if(d){
      if(descEl)descEl.textContent=d.desc;
      if(tagEl)tagEl.textContent=d.tag||(d.items||[]).slice(0,2).join(' · ')||'';
      if(linkEl)linkEl.href=d.link||'/contact?service='+encodeURIComponent(d.title);
      if(itemsEl&&d.items){itemsEl.innerHTML=d.items.slice(0,4).map(it=>`<span class="service-preview-pill">${it}</span>`).join('')}
    }
  }
  items.forEach((it,idx)=>{
    it.addEventListener('mouseenter',()=>setActive(idx));
    it.addEventListener('mouseover',()=>setActive(idx));
    it.addEventListener('pointerenter',()=>setActive(idx));
    it.addEventListener('focus',()=>setActive(idx));
    it.addEventListener('click',()=>setActive(idx));
  });
}

const serviceRows=(list)=>list.map((s,i)=>`<details class="service-row"><summary><span>${num(i+1)}</span><h3>${s.title}</h3></summary><div class="service-content">${s.image?image(s.image,s.title):''}<p>${s.desc}</p><ul>${s.items.map(x=>`<li>${x}</li>`).join('')}</ul><a class="btn-action btn-action-sm" href="/contact?service=${encodeURIComponent(s.title)}">Discuss this service <span class="arrow">↗</span></a></div></details>`).join('');
const faqSection=()=>`<section class="section"><div class="wrap split" style="align-items:start"><div><span class="eyebrow">A little clarity, before we begin</span><h2>Your questions.<br>Our answers.</h2><a class="btn-action" href="/contact">Talk to our team <span class="arrow">↗</span></a></div><div>${faqs.map(f=>`<details class="faq"><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></div></section>`;
const steps=[
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Feasibility & soil testing',
    desc: 'Detailed geotechnical soil analysis, safe bearing capacity testing, and topographical land surveys before planning.',
    tag: 'Pre-construction Feasibility',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z"/></svg>`
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'Design & transparent BOQ',
    desc: 'Architectural 2D plans, realistic 3D elevation renders, and transparent line-item quantity billing with zero hidden costs.',
    tag: 'Architectural & Cost Plan',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'IS-Code standard construction',
    desc: 'Certified Fe550D TMT steel, lab-tested concrete cube testing, and daily site supervision by senior civil engineers.',
    tag: 'Structural Engineering',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: 'Finishing & handover',
    desc: 'Snag-free final inspection, MEP certification, exterior landscape completion, and official keys handover.',
    tag: 'Inspection & Handover',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`
  }
];
const process=()=>`<section class="section process-section"><div class="wrap"><div class="section-head"><div><span class="eyebrow">How we deliver</span><h2>From the first line.<br>To the final detail.</h2></div><p>A systematic, milestone-driven construction process that ensures zero guesswork.</p></div><div class="process-cards-grid">${steps.map(s=>`<article class="process-card reveal"><div class="process-card-top"><span class="process-phase-badge">${s.phase}</span><div class="process-icon-box">${s.icon}</div></div><div class="process-card-body"><h3>${s.title}</h3><p>${s.desc}</p></div><div class="process-card-footer"><span class="process-tag-indicator">${s.tag}</span><span class="process-step-num">${s.num}</span></div></article>`).join('')}</div></div></section>`;
const stats=()=>`<div class="wrap stats"><p>Engineering trust.<br>Creating enduring value.</p><div><b>10+</b><span>Years of experience</span></div><div><b>350+</b><span>Projects completed</span></div><div><b>Turnkey</b><span>Engineering expertise</span></div></div>`;
const pageTop=(label,title='',desc='',parent=null)=>`<section class="wrap page-top ${!title?'page-top-breadcrumb-only':''}"><nav class="breadcrumb-bar" aria-label="Breadcrumb navigation"><a class="breadcrumb-chip" href="/" title="Return to Home"><span class="breadcrumb-arrow" aria-hidden="true">←</span><span class="breadcrumb-chip-text">Home</span></a><span class="breadcrumb-divider" aria-hidden="true">/</span>${parent?`<a class="breadcrumb-parent-link" href="${parent.href}">${parent.label}</a><span class="breadcrumb-divider" aria-hidden="true">/</span>`:''}<span class="breadcrumb-target" aria-current="page">${label}</span></nav>${title?`<h1>${title}</h1>`:''}${desc?`<p>${desc}</p>`:''}</section>`;
function home(){return `<section class="hero-section"><div class="hero-image"><img id="hero-img" src="/homehero/hh1.webp" alt="Contemporary architectural residence" fetchpriority="high" decoding="async"><div class="hero-caption"><div class="wrap hero-caption-inner"><div><small id="hero-label">01 / CONSTRUCTION & CIVIL ENGINEERING</small><h1 id="hero-text" class="hero-caption-title">Designed with vision. Built with precision.</h1></div><div class="hero-controls"><span>Explore our world</span><button class="circle" id="hero-prev" aria-label="Previous featured image">←</button><button class="circle" id="hero-next" aria-label="Next featured image">→</button></div></div></div></div></section>${stats()}<section class="section"><div class="wrap split"><div class="story-image reveal">${image('/assets/home page about section.jpeg','Danam Holdings construction and design solutions')}<div class="image-note">One team.<br>From blueprint to handover.</div></div><div class="reveal"><span class="eyebrow">Built on trust. Grounded in expertise.</span><h2>A strong foundation.<br>For every ambition.</h2><p>DANAM HOLDINGS provides complete construction and project management solutions, bringing together design, construction, renovation and professional consultancy under one roof.</p><p>A premier civil engineering & turnkey EPC construction company built on structural integrity, cost transparency, and on-time delivery across South India.</p><div style="margin-top:28px"><a class="button" href="/about-us">Get to know Danam <span>↗</span></a></div></div></div></section><section class="section" style="padding-top:30px"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Selected work / A closer look</span><h2>Spaces that speak<br>for themselves.</h2></div><a class="btn-action" href="/our-projects">View all projects <span class="arrow">↗</span></a></div><div class="projects-grid">${[projects[11],projects[3],projects[2],projects[0]].map(card).join('')}</div></div></section>${clientSection()}${faqSection()}${cta()}`}
function portfolio(){return `${pageTop('Our projects','Built with purpose.<br>Made to endure.','350+ projects completed across South India. A curated showcase of our landmark residential, commercial and turnkey deliveries.')}<section class="wrap" style="padding-bottom:100px"><div class="filters" role="group" aria-label="Filter projects">${['All projects','Residential','Commercial'].map((c,i)=>`<button class="filter ${i?'':'active'}" data-filter="${c}" aria-pressed="${!i}">${c}</button>`).join('')}<span class="project-count" aria-live="polite">12 projects</span></div><div class="projects-grid" id="project-results">${projects.map(card).join('')}</div></section>${cta()}`}
function detail(p){
  let i=projects.indexOf(p);
  const prevP=projects[(i-1+projects.length)%projects.length];
  const nextP=projects[(i+1)%projects.length];
  const facts=[
    {label:'Location',val:p.location},
    {label:'Category',val:p.category},
    {label:'Project Scope',val:p.scope},
    {label:'Project Type',val:p.typeLabel},
    {label:'Structure & Delivery',val:p.frame},
    {label:'Execution Status',val:p.year}
  ].filter(f=>f.val);

  const galleryImages = (p.images && p.images.length > 0) ? p.images : [p.image];

  return `
    ${pageTop(p.name,'','',{href:'/our-projects',label:'Our projects'})}
    <div class="wrap">
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
          ${facts.map(f=>`
            <div class="spec-card">
              <span class="spec-label">${f.label}</span>
              <strong class="spec-value">${f.val}</strong>
            </div>
          `).join('')}
        </div>
      </div>

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
              ${galleryImages.length > 1 ? `
                <div class="slider-slide slider-slide-clone" data-slide-idx="0" aria-hidden="true">
                  <img src="${galleryImages[0]}" alt="${p.name} — visual 1" loading="lazy" decoding="async">
                </div>
              ` : ''}
            </div>

            ${galleryImages.length > 1 ? `
              <button class="slider-chevron slider-chevron-prev" id="slider-prev" aria-label="Previous image">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button class="slider-chevron slider-chevron-next" id="slider-next" aria-label="Next image">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            ` : ''}

            <div class="slider-corner-tag">
              <span>${p.name.toUpperCase()}</span>
            </div>

            <button class="slider-zoom-btn" id="slider-zoom" aria-label="Open fullscreen view">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
              <span>Fullscreen</span>
            </button>
          </div>

          ${galleryImages.length > 1 ? `
            <div class="slider-thumbnails-track" id="slider-thumbnails" role="tablist" aria-label="Project images list">
              ${galleryImages.map((src, idx) => `
                <button class="slider-thumb-btn ${idx === 0 ? 'active' : ''}" data-slide-index="${idx}" aria-label="View visual ${idx + 1}" role="tab" aria-selected="${idx === 0}">
                  <img src="${src}" alt="Thumbnail ${idx + 1}" loading="lazy" decoding="async">
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </section>

      <nav class="project-detail-nav" aria-label="Project pagination">
        <a href="${url(prevP)}" class="project-nav-btn prev">
          <span class="nav-sub">← Previous Project</span>
          <strong class="nav-title">${prevP.name}</strong>
        </a>
        <a href="/our-projects" class="project-nav-center">
          <span>View All Projects</span>
        </a>
        <a href="${url(nextP)}" class="project-nav-btn next">
          <span class="nav-sub">Next Project →</span>
          <strong class="nav-title">${nextP.name}</strong>
        </a>
      </nav>
    </div>
    ${cta()}
  `;
}
function about(){
  return `
    <section class="about-hero">
      <div class="about-hero-bg">
        <img src="/assets/about%20hero.jpeg" alt="Danam Holdings commercial showroom construction" fetchpriority="high" decoding="async">
        <div class="about-hero-overlay"></div>
      </div>
      <div class="wrap about-hero-wrap">
        <div class="about-hero-content reveal">
          <nav class="breadcrumb-bar" aria-label="Breadcrumb navigation">
            <a class="breadcrumb-chip" href="/" title="Return to Home">
              <span class="breadcrumb-arrow" aria-hidden="true">←</span>
              <span class="breadcrumb-chip-text">Home</span>
            </a>
            <span class="breadcrumb-divider" aria-hidden="true">/</span>
            <span class="breadcrumb-target" aria-current="page">About Us</span>
          </nav>
          <h1 class="about-hero-title">Building Value.<br>Transforming Assets.</h1>
          <p class="about-hero-lead">Creating lasting value through construction expertise, strategic project management, and quality-driven project delivery.</p>
          <div class="about-hero-btn-row">
            <a href="#md-profile" class="button hero-scroll-button" id="scroll-explore-btn">
              <span>Scroll to explore</span>
              <span class="btn-arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section md-section" id="md-profile">
      <div class="wrap">
        <div class="md-profile-card reveal">
          <div class="md-card-media">
            <div class="md-portrait-container">
              <img src="/assets/ceo%20img.jpeg" alt="N. E. Praveen Elangovan - Managing Director, Danam Holdings" class="md-portrait" loading="lazy" decoding="async">
              <div class="md-portrait-tag">
                <span>MANAGING DIRECTOR</span>
              </div>
            </div>
          </div>
          <div class="md-card-body">
            <div class="md-badge-row">
              <span class="md-pill">VISIONARY LEADER | CONSTRUCTION & PROJECT MANAGEMENT</span>
            </div>
            <h2 class="md-name">N. E. Praveen Elangovan</h2>
            <div class="md-designation-line">
              <strong>MANAGING DIRECTOR</strong>
              <span>· Danam Holdings</span>
            </div>
            <p class="md-bio">N. E. Praveen Elangovan is the Managing Director of Danam Holdings, bringing extensive experience in construction management, project planning, and project delivery. With expertise in Project Management Consultancy (PMC) and Engineering, Procurement & Construction (EPC), he is committed to creating value, transforming assets, and delivering projects with a focus on quality and efficiency.</p>
            
            <div class="md-details-block">
              <div class="md-qual-box">
                <span class="md-subhead">Qualifications</span>
                <ul class="md-qual-list">
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    <span>Master's Degree in Advanced Construction Management</span>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    <span>Master of Business Administration (MBA), Project Management</span>
                  </li>
                </ul>
              </div>

              <div class="md-loc-box">
                <span class="md-subhead">Location</span>
                <div class="md-loc-pill">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>MADURAI, TAMIL NADU</span>
                </div>
              </div>
            </div>

            <div class="md-card-footer">
              <a href="https://www.linkedin.com/in/n-e-praveen-pgp-acm-0289218a" target="_blank" rel="noopener noreferrer" class="md-linkedin-btn" aria-label="View N. E. Praveen Elangovan on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V10.13H5.06v8.37h2.8z"/></svg>
                <span>View LinkedIn Profile ↗</span>
              </a>
            </div>
          </div>
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
            <img src="/assets/about%20page%20img.jpeg" alt="Danam Holdings construction and project management" class="story-photo" loading="lazy" decoding="async">
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

    <section class="cta about-closing-cta">
      <div class="wrap">
        <div>
          <span class="eyebrow">Start Your Project</span>
          <h2>Let's Build Something<br>Valuable Together.</h2>
          <p class="cta-sub">Have a project in mind? Connect with Danam Holdings to discuss your construction and project management requirements.</p>
        </div>
        <a href="/contact" class="button">Let's Build Together <span>↗</span></a>
      </div>
    </section>
  `;
}
function expertise(){return `${pageTop('Our expertise','From possibility.<br>To precision.','Design, construction, interiors, renovation & project management — all under one roof.')}<section class="section dark"><div class="wrap services-layout"><div><span class="eyebrow">11 disciplines. One team.</span><h2>Complete construction.<br>Considered in every detail.</h2><p>${workTypes.join(' · ')}</p><a class="btn-action btn-action-light" href="/contact">Plan your project <span class="arrow">↗</span></a></div><div>${servicesInteractive(services,'expertise-services')}</div></div></section>${process()}${faqSection()}${cta()}`}
function contact(){return `${pageTop('Contact us',"Every great space<br>starts with an idea.",'Tell us what you plan to build or renovate. We will get back to you with the next steps.')}<section class="wrap contact-layout" style="padding-bottom:85px"><div><span class="eyebrow">Get in touch</span><h2>Let's talk<br>about your project.</h2><div class="contact-row"><small>Visit our office</small><address>${company.address.lines.join('<br>')}</address><a class="btn-action btn-action-outline" href="${company.address.mapLink}" target="_blank" rel="noopener">Get directions <span class="arrow">↗</span></a></div><div class="contact-row"><small>Call our team</small><a href="${company.phoneHref}">${company.phone}</a><a href="${company.phoneHref2}">${company.phone2}</a></div><div class="contact-row"><small>Email</small><a href="mailto:${company.email}">${company.email}</a></div><div class="contact-row"><small>Working hours</small>${company.hours}</div></div><form class="contact-form"><h2>Tell us your vision.</h2><p class="muted" style="font-size:13px">A few details to start your project consultation.</p><label for="name">Your name *</label><input id="name" name="name" autocomplete="name" placeholder="Full name" required maxlength="100"><label for="phone">Mobile number (+91) *</label><input id="phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" pattern="[6-9][0-9]{9}" maxlength="10" placeholder="10-digit mobile number" title="Enter a valid 10-digit Indian mobile number" required><label for="service">Service needed *</label><select id="service" name="service" required>${services.map(s=>`<option>${s.title}</option>`).join('')}<option>Other Construction Inquiries</option></select><label for="message">Tell us about your project</label><textarea id="message" name="message" placeholder="Location, type of project, and what you have in mind…" maxlength="3000"></textarea><button class="button" type="submit">Continue on WhatsApp <span>↗</span></button><small>This opens WhatsApp with your enquiry ready to review and send. No enquiry is sent automatically.</small></form></section><iframe class="map" title="Danam Holdings office location" src="${company.address.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>${faqSection()}`}
const currentProject=projects.find(p=>url(p)===path);let title='Home';if(path==='/'){$('#main').innerHTML=home();}else if(path==='/our-projects'){$('#main').innerHTML=portfolio();title='Our Projects'}else if(currentProject){$('#main').innerHTML=detail(currentProject);initProjectSlider(currentProject);title=currentProject.name}else if(path==='/about-us'){$('#main').innerHTML=about();title='About Us'}else if(path==='/services'){$('#main').innerHTML=expertise();initServicesInteractive('expertise-services',services);title='Services'}else if(path==='/contact'){$('#main').innerHTML=contact();title='Contact Us'}else{$('#main').innerHTML=pageTop('Page not found','A different direction.')+'<div class="wrap section"><a class="button" href="/">Return home ↗</a></div>';title='Page not found'}document.title=title+' | Danam Holdings';
const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=$('.nav').classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.querySelector('.menu-label').textContent=open?'Close':'Menu'});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('.nav').classList.contains('open')){menu.click();menu.focus()}});
document.addEventListener('click',e=>{if($('.nav').classList.contains('open')&&!$('#header').contains(e.target))menu.click()});window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches&&$('.nav').classList.contains('open'))menu.click()});
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target)}})},{rootMargin:'450px 0px 450px 0px',threshold:0});function reveal(){const elements=document.querySelectorAll('.reveal');const winH=window.innerHeight;elements.forEach(e=>{const rect=e.getBoundingClientRect();if(rect.top<winH+350){e.classList.add('in');}else{observer.observe(e);}})}reveal();
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});const list=projects.filter(p=>b.dataset.filter==='All projects'||p.category.includes(b.dataset.filter));$('#project-results').innerHTML=list.map(card).join('');$('.project-count').textContent=list.length+' projects';reveal()}));
if($('#hero-img')){let n=0;const descriptions=['Designed with vision. Built with precision.','Crafting architectural excellence.','End-to-end civil engineering & infrastructure.','Transforming spaces into inspiring environments.','Engineering trust & enduring value.'];const labels=['CONSTRUCTION & CIVIL ENGINEERING','RESIDENTIAL & COMMERCIAL','TURNKEY SOLUTIONS IN MADURAI','INTERIORS & RENOVATION','QUALITY & TRANSPARENCY'];function slide(d){n=(n+d+5)%5;$('#hero-img').src=`/homehero/hh${n+1}.webp`;$('#hero-img').alt=descriptions[n];$('#hero-label').textContent=`${num(n+1)} / ${labels[n]}`;$('#hero-text').textContent=descriptions[n];}$('#hero-prev').onclick=()=>slide(-1);$('#hero-next').onclick=()=>slide(1);let heroTimer=setInterval(()=>slide(1),6000);const heroEl=$('.hero-image');if(heroEl){heroEl.addEventListener('mouseenter',()=>clearInterval(heroTimer));heroEl.addEventListener('mouseleave',()=>{clearInterval(heroTimer);heroTimer=setInterval(()=>slide(1),6000);});}}
function initProjectSlider(p){
  const galleryImages=(p.images&&p.images.length>0)?p.images:[p.image];
  const viewport=$('#slider-viewport');
  const track=$('#slider-track');
  const prevBtn=$('#slider-prev');
  const nextBtn=$('#slider-next');
  const currentNumEl=$('#gallery-current-num');
  const thumbs=document.querySelectorAll('.slider-thumb-btn');
  const zoomBtn=$('#slider-zoom');
  const dialog=$('#lightbox');

  if(!viewport||!track||galleryImages.length===0)return;

  let currentIdx=0;
  const total=galleryImages.length;
  let autoplayTimer=null;

  function updateUI(idx){
    const displayIdx=idx>=total?0:idx;
    if(currentNumEl)currentNumEl.textContent=num(displayIdx+1);
    const thumbsTrack=$('#slider-thumbnails');
    thumbs.forEach((th,i)=>{
      const act=i===displayIdx;
      th.classList.toggle('active',act);
      th.setAttribute('aria-selected',act);
      if(act&&thumbsTrack){
        const trackWidth=thumbsTrack.clientWidth;
        const scrollTarget=th.offsetLeft-(trackWidth/2)+(th.clientWidth/2);
        thumbsTrack.scrollTo({
          left:Math.max(0,scrollTarget),
          behavior:'smooth'
        });
      }
    });
  }

  function moveTo(idx,animate=true){
    currentIdx=idx;
    if(animate){
      track.style.transition='transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
    }else{
      track.style.transition='none';
    }
    track.style.transform=`translateX(-${currentIdx*100}%)`;
    updateUI(currentIdx);
  }

  track.addEventListener('transitionend',()=>{
    if(currentIdx>=total){
      moveTo(0,false);
    }
  });

  function nextSlide(){
    if(total<=1)return;
    if(currentIdx>=total){
      moveTo(0,false);
      track.offsetHeight;
    }
    moveTo(currentIdx+1,true);
  }

  function prevSlide(){
    if(total<=1)return;
    if(currentIdx===0){
      moveTo(total,false);
      track.offsetHeight;
      requestAnimationFrame(()=>{
        moveTo(total-1,true);
      });
    }else{
      moveTo(currentIdx-1,true);
    }
  }

  function startAutoplay(){
    if(total<=1)return;
    stopAutoplay();
    autoplayTimer=setInterval(nextSlide,3200);
  }

  function stopAutoplay(){
    if(autoplayTimer){
      clearInterval(autoplayTimer);
      autoplayTimer=null;
    }
  }

  function restartAutoplay(){
    stopAutoplay();
    startAutoplay();
  }

  if(prevBtn){
    prevBtn.addEventListener('click',e=>{
      e.stopPropagation();
      prevSlide();
      restartAutoplay();
    });
  }

  if(nextBtn){
    nextBtn.addEventListener('click',e=>{
      e.stopPropagation();
      nextSlide();
      restartAutoplay();
    });
  }

  thumbs.forEach(th=>{
    th.addEventListener('click',()=>{
      const target=+th.dataset.slideIndex;
      moveTo(target,true);
      restartAutoplay();
    });
  });

  function openLightbox(startIdx){
    if(!dialog)return;
    stopAutoplay();
    let lbIdx=startIdx>=total?0:startIdx;

    const closeBtn=dialog.querySelector('.close');
    const prevBtn=dialog.querySelector('.prev');
    const nextBtn=dialog.querySelector('.next');
    if(closeBtn&&!closeBtn.querySelector('svg')){
      closeBtn.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    }
    if(prevBtn&&!prevBtn.querySelector('svg')){
      prevBtn.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
    }
    if(nextBtn&&!nextBtn.querySelector('svg')){
      nextBtn.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
    }

    const showLb=()=>{
      const lbImg=dialog.querySelector('img');
      lbImg.src=galleryImages[lbIdx];
      lbImg.alt=`${p.name} — visual ${lbIdx+1}`;
      lbImg.setAttribute('loading','lazy');
      lbImg.setAttribute('decoding','async');
      dialog.querySelector('p').textContent=`${p.name} · ${lbIdx+1} / ${total}`;
    };
    showLb();
    dialog.showModal();
    document.body.style.overflow='hidden';

    dialog.onclick=e=>{
      if(e.target===dialog)dialog.close();
    };

    if(closeBtn)closeBtn.onclick=()=>dialog.close();
    dialog.addEventListener('close',()=>{
      document.body.style.overflow='';
      moveTo(lbIdx,true);
      startAutoplay();
    },{once:true});

    if(prevBtn)prevBtn.onclick=e=>{
      e.stopPropagation();
      lbIdx=(lbIdx-1+total)%total;
      showLb();
    };
    if(nextBtn)nextBtn.onclick=e=>{
      e.stopPropagation();
      lbIdx=(lbIdx+1)%total;
      showLb();
    };

    const handleKey=e=>{
      if(!dialog.open){
        window.removeEventListener('keydown',handleKey);
        return;
      }
      if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%total;showLb();}
      if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+total)%total;showLb();}
    };
    window.addEventListener('keydown',handleKey);
  }

  track.addEventListener('click',e=>{
    const slide=e.target.closest('.slider-slide');
    if(slide){
      const idx=+slide.dataset.slideIdx||0;
      openLightbox(idx);
    }
  });

  if(zoomBtn){
    zoomBtn.addEventListener('click',e=>{
      e.stopPropagation();
      openLightbox(currentIdx);
    });
  }

  let touchStartX=0;
  viewport.addEventListener('touchstart',e=>{
    touchStartX=e.changedTouches[0].clientX;
  },{passive:true});

  viewport.addEventListener('touchend',e=>{
    const diff=e.changedTouches[0].clientX-touchStartX;
    if(Math.abs(diff)>45){
      if(diff<0)nextSlide();
      else prevSlide();
      restartAutoplay();
    }
  },{passive:true});

  window.addEventListener('keydown',e=>{
    if(dialog&&dialog.open)return;
    if(e.key==='ArrowRight'){nextSlide();restartAutoplay();}
    if(e.key==='ArrowLeft'){prevSlide();restartAutoplay();}
  });

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)stopAutoplay();
    else startAutoplay();
  });

  moveTo(0,false);
  startAutoplay();
}
if($('.contact-form')){const selected=new URLSearchParams(location.search).get('service');if(services.some(s=>s.title===selected))$('#service').value=selected;$('#phone').addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,''));$('.contact-form').addEventListener('submit',e=>{e.preventDefault();if(!$('#name').value.trim()){$('#name').setCustomValidity('Please enter your name.');$('#name').reportValidity();return}const f=new FormData(e.target);const message=`Hello Danam Holdings,\n\nI would like a project consultation.\nName: ${f.get('name').trim()}\nMobile: +91 ${f.get('phone')}\nService: ${f.get('service')}\nProject details: ${f.get('message').trim()||'To be discussed'}`;window.open('https://wa.me/'+company.whatsapp+'?text='+encodeURIComponent(message),'_blank','noopener,noreferrer')});$('#name').oninput=()=>$('#name').setCustomValidity('')}

// Universal lazy loading enforcer for below-the-fold images
function setupLazyLoading() {
  const isHero=img=>img.getAttribute('fetchpriority')==='high'||img.id==='hero-img'||img.classList.contains('detail-cover');
  const applyLazy=(root=document)=>{
    root.querySelectorAll('img').forEach(img=>{
      if(isHero(img))return;
      if(!img.getAttribute('loading')){
        img.setAttribute('loading','lazy');
      }
      if(!img.getAttribute('decoding')){
        img.setAttribute('decoding','async');
      }
    });
  };

  applyLazy();

  if(window.MutationObserver){
    const observer=new MutationObserver(mutations=>{
      for(const m of mutations){
        m.addedNodes.forEach(node=>{
          if(node.nodeType===1){
            if(node.tagName==='IMG'){
              if(isHero(node))return;
              if(!node.getAttribute('loading'))node.setAttribute('loading','lazy');
              if(!node.getAttribute('decoding'))node.setAttribute('decoding','async');
            }else{
              applyLazy(node);
            }
          }
        });
      }
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }
}
setupLazyLoading();
