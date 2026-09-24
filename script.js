document.addEventListener('DOMContentLoaded',()=>{
 const progress=document.querySelector('.progress');
 const update=()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?(scrollY/h)*100:0)+'%'};
 addEventListener('scroll',update,{passive:true});update();
 const menu=document.querySelector('.menu'); const nav=document.querySelector('.desktop-nav');
 menu?.addEventListener('click',()=>{nav.classList.toggle('open')});
 if(window.gsap){gsap.registerPlugin(ScrollTrigger);gsap.from('.hero-reveal',{opacity:0,y:34,duration:1,stagger:.12,ease:'power3.out',delay:.15});
 document.querySelectorAll('.section-head,.about-copy,.quick-card,.practice-grid article,.matter-list article,.time-item,.cred-grid>div').forEach(el=>gsap.from(el,{scrollTrigger:{trigger:el,start:'top 84%'},opacity:0,y:35,duration:.8,ease:'power3.out'}));
 gsap.to('.hero-bg',{yPercent:6,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
 gsap.to('.profile-image-bg',{scale:1.08,scrollTrigger:{trigger:'.profile-image',start:'top bottom',end:'bottom top',scrub:true}});
 }
});