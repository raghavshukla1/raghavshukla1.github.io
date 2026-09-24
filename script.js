document.documentElement.classList.add('js');
// >>> CHANGE THIS to your Instagram username (without @) <<<
const INSTAGRAM='YOUR_INSTAGRAM';

document.addEventListener('DOMContentLoaded',()=>{
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
 const hover=matchMedia('(hover:hover)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches;

 // marquees: duplicate content for seamless loop
 $$('.ticker .track,.strip-track').forEach(t=>[...t.children].forEach(c=>{const k=c.cloneNode(true);k.setAttribute('aria-hidden','true');t.appendChild(k)}));

 // auto reveal
 [['.section-head'],['.about-copy'],['.quick-card',150],['.law-card',0,1],['.practice-grid article',0,1],['.matter-list article',0,1],['.time-item',0,1],['.cred-grid>div',0,1],['.cyber-feature-copy>*',0,2],['.cyber-feature-media',150],['.profile-caption>*',0,2],['.contact-content>*',0,2],['.footer-brand'],['.footer-links']]
 .forEach(([s,d=0,m])=>$$(s).forEach((el,i)=>{el.setAttribute('data-reveal','');el.style.setProperty('--d',d+(m===1?(i%3)*110:m===2?i*110:0))}));
 $$('.court-card').forEach((c,i)=>{c.setAttribute('data-clip','');c.style.setProperty('--d',i*160);const im=$('img',c);if(im)im.dataset.parallax='.06'});
 $('.profile-image-bg')?.setAttribute('data-parallax','.1');
 $$('.draw *,.scrolldraw *').forEach(e=>e.setAttribute('pathLength','1'));

 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');io.unobserve(t);if(t.hasAttribute('data-reveal'))setTimeout(()=>t.classList.add('done'),1600)}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 $$('[data-reveal],[data-clip],.draw').forEach(el=>io.observe(el));

 // hero intro
 if(window.gsap)gsap.from('.hero-reveal',{opacity:0,y:40,filter:'blur(12px)',duration:1.3,stagger:.13,ease:'expo.out',delay:1.5});

 // scroll-lit statement
 const st=$('.statement'),wp=$('.words');
 if(wp)wp.innerHTML=wp.textContent.trim().split(/\s+/).map(w=>`<span>${w}</span>`).join(' ');
 const words=$$('.words span'),icon=$$('.stmt-icon *');

 const nav=$('.nav'),bar=$('.progress'),steps=$('.steps'),par=$$('[data-parallax]');
 let lastY=scrollY,ticking=false;
 function frame(){
  ticking=false;const y=scrollY,vh=innerHeight,h=document.documentElement.scrollHeight-vh;
  bar.style.width=(h>0?y/h*100:0)+'%';
  nav.classList.toggle('scrolled',y>40);
  if(Math.abs(y-lastY)>4){nav.classList.toggle('hide',y>lastY&&y>420&&!$('.desktop-nav.open'));lastY=y}
  par.forEach(el=>{const box=el.tagName==='IMG'?el.parentElement:el.parentElement||el,r=box.getBoundingClientRect();if(r.bottom<-100||r.top>vh+100)return;const m=r.height*(el.tagName==='IMG'?.08:.06);el.style.setProperty('--py',clamp(-(r.top+r.height/2-vh/2)*parseFloat(el.dataset.parallax),-m,m)+'px')});
  if(st){const r=st.getBoundingClientRect(),p=clamp(-r.top/(r.height-vh)),n=words.length;
   words.forEach((w,i)=>w.style.opacity=(.14+.86*clamp(p*(n+3)-i)).toFixed(3));
   icon.forEach(e=>e.style.strokeDashoffset=1-clamp(p*1.2));}
  const reel=$('.reel');
  if(reel){const r=reel.getBoundingClientRect(),p=clamp(-r.top/(r.height-vh)),cs=$$('.rc',reel),W=cs[0].offsetWidth,step=Math.min(W*1.08,(innerWidth-W-28)/3),ez=t=>1-Math.pow(1-t,3);
   cs.forEach((c,i)=>{const o=i-1.5,fl=ez(clamp((p-i*.06)/.26)),sp=ez(clamp((p-.42)/.42));
    const x=sp*o*step,y=(1-fl)*vh*.95+sp*Math.abs(o)*26,rot=(1-fl)*o*16+fl*((1-sp)*o*2+sp*o*7),s=.8+.2*fl;
    c.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%) rotate(${rot}deg) scale(${s})`;c.style.zIndex=10-Math.abs(o)*2|0});
   $('.reel-title',reel).style.opacity=clamp(1.4-Math.abs(p-.55)*3);$('.reel-hint',reel).style.opacity=1-clamp(p*6)}
  if(steps){const r=steps.getBoundingClientRect(),p=clamp((vh*.85-r.top)/(vh*.55));steps.style.setProperty('--p',p);$$('.step',steps).forEach((s,i)=>s.classList.toggle('on',p>i/4+.03))}
 }
 const req=()=>{if(!ticking){ticking=true;requestAnimationFrame(frame)}};
 addEventListener('scroll',req,{passive:true});addEventListener('resize',req);frame();

 $$('[data-ig]').forEach(a=>a.href='https://instagram.com/'+INSTAGRAM);$$('[data-ig-text]').forEach(e=>e.textContent='@'+INSTAGRAM);

 // kinetic big text reacts to scroll speed
 const rows=$$('.bt-row');rows.forEach(r=>[...r.children].forEach(c=>r.appendChild(c.cloneNode(true))));
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches){let pos=[0,300],vel=0,ls=scrollY;
  (function bt(){const s=scrollY;vel+=((s-ls)-vel)*.12;ls=s;
   rows.forEach((r,i)=>{const half=r.scrollWidth/2;pos[i]+=.7+Math.abs(vel)*.4;const m=pos[i]%half;
    r.style.transform=`translate3d(${i?m-half:-m}px,0,0) skewX(${clamp(-vel*.5,-14,14)}deg)`});requestAnimationFrame(bt)})();}
 $('.menu')?.addEventListener('click',()=>$('.desktop-nav').classList.toggle('open'));
 $$('.desktop-nav a').forEach(a=>a.addEventListener('click',()=>$('.desktop-nav').classList.remove('open')));

 if(hover){
  // spotlight
  $$('.law-card,.practice-grid article,.soc').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
  // 3D tilt
  $$('.quick-card,.cyber-mini').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateX(${-y*7}deg) rotateY(${x*9}deg)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
  // magnetic buttons
  $$('.btn,.nav-call').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
  // cursor glow
  const g=document.createElement('div');g.className='cursor-glow';document.body.appendChild(g);
  let tx=0,ty=0,cx=0,cy=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;g.style.opacity=1});
  document.addEventListener('pointerleave',()=>g.style.opacity=0);
  (function loop(){cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;g.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(loop)})();
 }
});
