/* ===== Typewriter Effect ===== */
const typewriterPhrases = [
  "Frontend Developer.",
  "JavaScript Enthusiast.",
  "Learning React."
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

/* ===== Theme toggle ===== */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');

if(savedTheme === 'light'){
  document.body.classList.add('light-theme');
  themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  themeToggle.querySelector('use').setAttribute('href', '#icon-moon');
  themeToggle.querySelector('span').textContent = 'Dark';
}

themeToggle.addEventListener('click', ()=>{
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  themeToggle.querySelector('use').setAttribute('href', isLight ? '#icon-moon' : '#icon-sun');
  themeToggle.querySelector('span').textContent = isLight ? 'Dark' : 'Light';
});

/* ===== Scroll reveal ===== */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('in-view');
  });
},{threshold:0.15});
document.querySelectorAll('.fade-up, .hero, .projects, .skills, .contact').forEach(el=>{
  el.classList.add('fade-up'); observer.observe(el);
});

/* ===== Modal / Project preview ===== */
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const projects = {
  photographyportfolio: {
    title: 'Photography Portfolio',
    description: 'Personal photography portfolio showcasing photography work and frontend development skills with a polished visual layout.',
    image: 'images/photographyportfolio.png',
    alt: 'Photography Portfolio preview',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    features: ['Dark and light mode', 'Photography gallery layout', 'Responsive project pages'],
    live: 'https://mohit-photography.netlify.app/',
    github: 'https://github.com/mohit-135/Photography'
  },
  portfolio: {
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing frontend fundamentals, UI design, projects, and contact links.',
    image: 'images/portfolio.png',
    alt: 'Portfolio Website preview',
    tech: ['HTML', 'CSS', 'JavaScript', 'Animations'],
    features: ['Responsive sections', 'Project preview modal', 'Interactive project cards'],
    live: 'https://mohit-suthar-portfolio.netlify.app/',
    github: 'https://github.com/mohit-135/Portfolio'
  },
  weatherweb: {
    title: 'Weather Website',
    description: 'Responsive weather website focused on JavaScript logic, DOM updates, and clean CSS structure.',
    image: 'images/weather.png',
    alt: 'Weather Website preview',
    tech: ['HTML', 'CSS', 'JavaScript', 'API'],
    features: ['City weather search', 'Responsive layout', 'Dynamic weather details'],
    live: 'https://mohit-135.github.io/Weather-Website/',
    github: 'https://github.com/mohit-135/Weather-Website'
  },
  todoweb: {
    title: 'To-Do Website',
    description: 'Responsive to-do website focused on JavaScript task logic and a clean user experience.',
    image: 'images/todo.png',
    alt: 'To-Do Website preview',
    tech: ['HTML', 'CSS', 'JavaScript', 'DOM'],
    features: ['Add and manage tasks', 'Simple task workflow', 'Responsive interface'],
    live: 'https://mohit-135.github.io/To-Do/',
    github: 'https://github.com/mohit-135/To-Do'
  }
};

function listItems(items, className){
  return items.map(item => `<li>${item}</li>`).join('');
}

document.querySelectorAll('.project-card[data-live]').forEach(card=>{
  const liveUrl = card.getAttribute('data-live');

  card.addEventListener('click', (e)=>{
    if(e.target.closest('a, button')) return;
    window.open(liveUrl, '_blank', 'noopener');
  });

  card.addEventListener('keydown', (e)=>{
    if(e.target.closest('a, button')) return;
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      window.open(liveUrl, '_blank', 'noopener');
    }
  });
});

document.querySelectorAll('[data-open]').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    const id = btn.getAttribute('data-open');
    const project = projects[id];
    if(!project) return;

    modalBody.innerHTML = `
      <div class="modal-project">
        <div class="live-preview">
          <div class="preview-bar">
            <span></span>
            <span></span>
            <span></span>
            <strong>${project.live}</strong>
          </div>
          <iframe
            src="${project.live}"
            title="${project.title} live website preview"
            loading="lazy">
          </iframe>
        </div>
        <div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="modal-block">
            <h4>Tech Used</h4>
            <ul class="tag-list">${listItems(project.tech, 'tag-list')}</ul>
          </div>
          <div class="modal-block">
            <h4>Features</h4>
            <ul class="feature-list">${listItems(project.features, 'feature-list')}</ul>
          </div>
          <div class="modal-actions">
            <a class="btn primary" href="${project.live}" target="_blank" rel="noopener">
              <svg class="icon"><use href="#icon-external"></use></svg>Live Website
            </a>
            <a class="btn outline" href="${project.github}" target="_blank" rel="noopener">
              <svg class="icon"><use href="#icon-github"></use></svg>GitHub
            </a>
          </div>
        </div>
      </div>`;
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

/* ===== Copy email ===== */
const copyEmail = document.getElementById('copyEmail');
const copyStatus = document.getElementById('copyStatus');

function showCopyStatus(message){
  copyStatus.textContent = message;
  setTimeout(()=> {
    copyStatus.textContent = 'Click to copy address';
  }, 1800);
}

copyEmail.addEventListener('click', async ()=>{
  const email = copyEmail.getAttribute('data-email');
  try{
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(email);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    showCopyStatus('Copied to clipboard');
  } catch(error){
    showCopyStatus('Copy failed');
  }
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
