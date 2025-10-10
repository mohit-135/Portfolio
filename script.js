/* ===== Typewriter (v4) ===== */
const typewriterPhrases = [
  "Frontend Developer.",
  "HTML & CSS Enthusiast.",
  "I make clean, responsive UI."
];
let twIndex = 0, twChar = 0, twForward = true;
const twEl = document.getElementById('typewriter');

function typeTick(){
  const phrase = typewriterPhrases[twIndex];
  if(twForward){
    twChar++;
    if(twChar >= phrase.length){ twForward=false; setTimeout(typeTick,1000); return; }
  } else {
    twChar--;
    if(twChar <= 0){ twForward=true; twIndex = (twIndex+1)%typewriterPhrases.length; setTimeout(typeTick,200); return; }
  }
  twEl.textContent = phrase.slice(0, twChar);
  setTimeout(typeTick, twForward ? 80 : 40);
}
typeTick();

/* ===== Hamburger toggle & active nav ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('active');
});
document.querySelectorAll('[data-link]').forEach(a=>{
  a.addEventListener('click', ()=> navLinks.classList.remove('active'));
});

/* ===== Scroll reveal for elements with .fade-up ===== */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('in-view');
  });
},{threshold:0.15});
document.querySelectorAll('.fade-up, .hero, .projects, .skills, .contact').forEach(el=>{
  el.classList.add('fade-up'); observer.observe(el);
});

/* ===== Modal / Project preview (v5) ===== */
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('[data-open]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-open');
    // simple static content for preview — expand as needed
    if(id === 'spotify'){
      modalBody.innerHTML = `<h3>Spotify Clone</h3>
        <p>A static responsive clone of Spotify UI built using HTML & CSS.</p>
        <img src="images/spotify.png" alt="spotify preview" style="width:100%;border-radius:8px;margin-top:8px">`;
    } else if(id === 'portfolio'){
      modalBody.innerHTML = `<h3>Portfolio</h3>
        <p>This portfolio project (dark modern theme) built with HTML, CSS & small JS enhancements.</p>
        <img src="images/portfolio.png" alt="portfolio preview" style="width:100%;border-radius:8px;margin-top:8px">`;
    }
    modal.setAttribute('aria-hidden','false');
    modal.style.display='flex';
    modalClose.focus();
  });
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=> { if(e.target === modal) closeModal(); });
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modal.style.display='none';
  modalBody.innerHTML = '';
}

/* ===== Contact form (v6): simple validation and mail fallback ===== */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const mailFallback = document.getElementById('mailFallback');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if(!name || !email || !message){ status.textContent='Please fill all fields.'; return; }
  // Simple send simulation (no backend) — provide mailto fallback
  status.textContent = 'Thanks! Opening your email client...';
  setTimeout(()=> {
    window.location.href = `mailto:mohit@example.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\\n\\nFrom: ' + email)}`;
    status.textContent = '';
    form.reset();
  }, 600);
});
mailFallback.addEventListener('click', ()=> {
  window.location.href = 'mailto:mohit@example.com';
});

/* ===== Particle background (v5) simple canvas) ===== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
const particles = [];
const PARTICLE_COUNT = Math.min(120, Math.floor((W*H)/15000));

function rand(min,max){ return Math.random()*(max-min)+min; }
function initParticles(){
  particles.length=0;
  for(let i=0;i<PARTICLE_COUNT;i++){
    particles.push({
      x: rand(0,W),
      y: rand(0,H),
      vx: rand(-0.3,0.3),
      vy: rand(-0.2,0.2),
      r: rand(0.5,2.2),
      alpha: rand(0.08,0.35)
    });
  }
}
function resize(){
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  initParticles();
}
addEventListener('resize', resize);
initParticles();

function draw(){
  ctx.clearRect(0,0,W,H);
  // subtle gradient background overlay
  const g = ctx.createLinearGradient(0,0,W,H);
  g.addColorStop(0,'rgba(2,6,10,0.08)');
  g.addColorStop(1,'rgba(0,0,0,0.12)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W,H);

  // draw particles
  for(let p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0) p.x = W;
    if(p.x>W) p.x = 0;
    if(p.y<0) p.y = H;
    if(p.y>H) p.y = 0;

    ctx.beginPath();
    ctx.fillStyle = `rgba(0,255,255,${p.alpha})`;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }

  // connect nearby particles
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a=particles[i], b=particles[j];
      const dx=a.x-b.x, dy=a.y-b.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist<110){
        ctx.strokeStyle = `rgba(0,255,255,${(1 - dist/110)*0.06})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

/* ===== Active nav highlighting ===== */
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');
const secObserver = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      const id = ent.target.id;
      navItems.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
},{threshold:0.5});
sections.forEach(s=> secObserver.observe(s));
