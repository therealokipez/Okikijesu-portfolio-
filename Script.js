/* ═══════════════════════════════════════
   1. CUSTOM CURSOR
═══════════════════════════════════════ */
const cursor = document.querySelector('.cursor');
const ring   = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function tickCursor() {
  rx += (mx - rx) * .16;
  ry += (my - ry) * .16;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  ring.style.left   = rx + 'px';
  ring.style.top    = ry + 'px';
  requestAnimationFrame(tickCursor);
})();


/* ═══════════════════════════════════════
   2. MOUSE PARALLAX
═══════════════════════════════════════ */
let parallaxX = 0, parallaxY = 0;

document.addEventListener('mousemove', e => {
  parallaxX = (e.clientX / window.innerWidth  - .5) * 2;
  parallaxY = (e.clientY / window.innerHeight - .5) * 2;
});

const slowEls = document.querySelectorAll('.parallax-slow');
const medEls  = document.querySelectorAll('.parallax-med');
const fastEls = document.querySelectorAll('.parallax-fast');

(function animParallax() {
  if (window.innerWidth > 768) {
    slowEls.forEach(el => { el.style.transform = `translate(${parallaxX * 18}px, ${parallaxY * 12}px)`; });
    medEls.forEach(el  => { el.style.transform = `translate(${parallaxX * 30}px, ${parallaxY * 20}px)`; });
    fastEls.forEach(el => { el.style.transform = `translate(${parallaxX * 12}px, ${parallaxY * 8}px)`;  });
  }
  requestAnimationFrame(animParallax);
})();


/* ═══════════════════════════════════════
   3. TYPING ANIMATION
═══════════════════════════════════════ */
const words    = ['matter.', 'change things.', 'last.', 'people.', 'the future.'];
const typedEl  = document.getElementById('typedWord');
let wIdx = 0, cIdx = 0, deleting = false;

function type() {
  const word = words[wIdx];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 110);
  } else {
    typedEl.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      wIdx = (wIdx + 1) % words.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 55);
  }
}
setTimeout(type, 1200);


/* ═══════════════════════════════════════
   4. ANIMATED NUMBER COUNTERS
═══════════════════════════════════════ */
function animateCounter(el, target, suffix, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p    = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    if (!isNaN(target)) animateCounter(el, target, suffix);
    statObserver.unobserve(el);
  });
}, { threshold: .6 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => statObserver.observe(el));


/* ═══════════════════════════════════════
   5. TWINKLING STARS CANVAS
═══════════════════════════════════════ */
const cvs = document.getElementById('starsCanvas');
const ctx = cvs.getContext('2d');

function resizeCvs() { cvs.width = innerWidth; cvs.height = innerHeight; }
resizeCvs();
window.addEventListener('resize', resizeCvs);

const stars = Array.from({ length: 200 }, () => ({
  x:     Math.random() * innerWidth,
  y:     Math.random() * innerHeight,
  r:     Math.random() * 1.6 + .15,
  phase: Math.random() * Math.PI * 2,
  spd:   Math.random() * .008 + .003
}));

(function drawStars() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  stars.forEach(s => {
    s.phase += s.spd;
    const a = (Math.sin(s.phase) + 1) / 2 * .6 + .04;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(233,213,255,${a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
})();


/* ═══════════════════════════════════════
   6. FLOATING EMOJI PARTICLES
═══════════════════════════════════════ */
const particlesEl = document.getElementById('particles');
const emojis = ['💡','📦','🔍','📊','🚀','⚡','🧠','📱','💬','🌐','🎯','✨','🔗','📈','⚙️','💎','🗂️','🧩','💜','🌟','🪄','💫','🌸','⭐'];

function spawnParticle() {
  const el = document.createElement('div');
  el.className = 'particle';
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const d = 20 + Math.random() * 28;
  el.style.animationDuration = d + 's';
  el.style.animationDelay   = -(Math.random() * d) + 's';
  el.style.fontSize = (.8 + Math.random() * 1.1) + 'rem';
  particlesEl.appendChild(el);
  setTimeout(() => el.remove(), d * 1000);
}

for (let i = 0; i < 26; i++) spawnParticle();
setInterval(spawnParticle, 2600);


/* ═══════════════════════════════════════
   7. SCROLL REVEAL
═══════════════════════════════════════ */
document.querySelectorAll('.reveal').forEach(el => {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }, { threshold: .08 }).observe(el);
});


/* ═══════════════════════════════════════
   8. CASE STUDY MODAL
═══════════════════════════════════════ */
const cases = {
  studypilot: {
    emoji: '📚', badge: 'EdTech Product Concept', title: 'StudyPilot — Smart Study Assistant',
    sections: [
      { label: 'The Problem',    content: '<p>Many students struggle with managing their study schedules effectively. They rely on multiple disconnected tools — note apps, reminders, and calendars — which makes studying feel unstructured and overwhelming, leading to poor time management and missed sessions.</p>' },
      { label: 'Discovery',      content: '<p>Through observing study habits, I found students constantly switch between apps to plan routines. Many expressed a need for a single platform that organizes schedules, reminders, and progress tracking in one place.</p>' },
      { label: 'MVP Features',   content: '<div class="m-chips"><span class="m-chip">Study schedule planner</span><span class="m-chip">Study reminders</span><span class="m-chip">Progress tracker</span><span class="m-chip">Productivity insights</span></div>' },
      { label: 'Future Features',content: '<div class="m-chips"><span class="m-chip">Group study collaboration</span><span class="m-chip">AI study recommendations</span><span class="m-chip">Learning platform integrations</span></div>' },
      { label: 'Solution',       content: '<p>StudyPilot is a digital study assistant helping students organize their learning through personalized schedules, automated reminders, a progress dashboard, and study productivity insights.</p>' },
      { label: 'What I Learned', content: '<ul><li>How to identify real student productivity challenges through observation</li><li>Designing tools that work for academic success contexts</li><li>Feature prioritization for an MVP product in EdTech</li></ul>' }
    ]
  },
  grocerymate: {
    emoji: '🛒', badge: 'Consumer Product Concept', title: 'GroceryMate — Smart Grocery Management',
    sections: [
      { label: 'The Problem',    content: '<p>Many individuals and families waste food because they forget what groceries they have. Items often expire before they are used, leading to financial loss and food waste.</p>' },
      { label: 'Discovery',      content: '<p>Through conversations with students and young professionals, I found most people only realize food has expired when it\'s already spoiled. Most users rely on memory — making food management inefficient and reactive.</p>' },
      { label: 'MVP Features',   content: '<div class="m-chips"><span class="m-chip">Manual item entry + expiry dates</span><span class="m-chip">Expiration tracking</span><span class="m-chip">Push notification reminders</span><span class="m-chip">Basic recipe suggestions</span></div>' },
      { label: 'Future Features',content: '<div class="m-chips"><span class="m-chip">Barcode scanning</span><span class="m-chip">Receipt scanning</span><span class="m-chip">Shared grocery lists</span><span class="m-chip">Grocery delivery integration</span></div>' },
      { label: 'Solution',       content: '<p>GroceryMate is a mobile app that helps users track groceries and reduce food waste — through expiration tracking with visual alerts, timely notifications, recipe suggestions from available ingredients, and a categorized inventory.</p>' },
      { label: 'What I Learned', content: '<ul><li>Identifying everyday consumer problems hiding in plain sight</li><li>Designing solutions around existing user behavior</li><li>Structuring features around behavioral triggers like expiry anxiety</li></ul>' }
    ]
  },
  couples: {
    emoji: '💛', badge: 'Personal Development Product', title: 'Powerful Couples OS — Relationship Growth Platform',
    sections: [
      { label: 'The Problem',    content: '<p>Many couples struggle with communication, shared goal setting, and maintaining intentional relationship growth. Very few digital products are designed to help couples grow together.</p>' },
      { label: 'Discovery',      content: '<p>By observing discussions around modern relationships, I found couples want tools to help them communicate better, track shared goals, and build stronger emotional connections — but existing apps are built for individuals, not pairs.</p>' },
      { label: 'MVP Features',   content: '<div class="m-chips"><span class="m-chip">Shared couple goals</span><span class="m-chip">Weekly relationship check-ins</span><span class="m-chip">Shared calendar</span><span class="m-chip">Communication prompts</span></div>' },
      { label: 'Future Features',content: '<div class="m-chips"><span class="m-chip">Relationship exercises</span><span class="m-chip">Anniversary reminders</span><span class="m-chip">Relationship insights & analytics</span></div>' },
      { label: 'Solution',       content: '<p>Powerful Couples OS is a digital platform designed to help couples strengthen their relationships through intentional communication and shared goals — featuring a relationship dashboard, weekly emotional check-ins, and guided communication prompts.</p>' },
      { label: 'What I Learned', content: '<ul><li>Human-centered product design for emotional needs</li><li>Building tools that serve two users simultaneously with shared state</li><li>Creating meaningful digital experiences beyond pure utility</li></ul>' }
    ]
  },
  brainbattle: {
    emoji: '🧩', badge: 'Educational Game Concept', title: 'BrainBattle — Gamified Tech Learning',
    sections: [
      { label: 'The Problem',    content: '<p>Many people learning technology lose motivation because traditional study methods feel repetitive and boring. Existing platforms often lack engaging experiences that keep learners coming back.</p>' },
      { label: 'Discovery',      content: '<p>Gamification has proven to increase learning engagement. Platforms like Duolingo demonstrate how game mechanics motivate daily learning — making the dopamine loop work for education.</p>' },
      { label: 'MVP Features',   content: '<div class="m-chips"><span class="m-chip">Tech quiz challenges</span><span class="m-chip">Score system</span><span class="m-chip">Multiple attempts</span><span class="m-chip">Category-based questions</span></div>' },
      { label: 'Future Features',content: '<div class="m-chips"><span class="m-chip">Multiplayer competitions</span><span class="m-chip">Global leaderboards</span><span class="m-chip">Daily challenges</span></div>' },
      { label: 'Solution',       content: '<p>BrainBattle is a gamified learning platform where users answer technology-related questions and compete to deepen their knowledge across programming languages, frameworks, and digital tools.</p>' },
      { label: 'What I Learned', content: '<ul><li>How gamification mechanics drive sustained user engagement</li><li>Designing loop-based, habit-forming experiences</li><li>Applying competitor analysis (Duolingo) to product ideation</li></ul>' }
    ]
  },
  heartreminder: {
    emoji: '💖', badge: 'Consumer Product · Emotional Well-being', title: 'HeartReminder — Smart Relationship Reminder App',
    quote: '"We don\'t just remind you — we help you show up."',
    sections: [
      { label: 'The Problem',    content: '<p>Many people unintentionally forget important personal dates — birthdays, anniversaries, milestones — not because they don\'t care, but because current reminder tools are passive and lack emotional context.</p>' },
      { label: 'Discovery',      content: '<p>By observing how people manage personal relationships, I noticed most people either store important dates mentally, rely on generic calendar alerts, or trust social media — which often fails when they need it most.</p>' },
      { label: 'MVP Features',   content: '<div class="m-chips"><span class="m-chip">Relationship-based contact tagging</span><span class="m-chip">Important date tracking</span><span class="m-chip">Multi-stage reminder timeline (7d, 1d, morning)</span><span class="m-chip">Human emotional notification copy</span><span class="m-chip">One-tap action buttons (Call, Message, Voice Note)</span></div>' },
      { label: 'Future Features',content: '<div class="m-chips"><span class="m-chip">AI-generated message suggestions</span><span class="m-chip">Native contacts sync</span><span class="m-chip">WhatsApp integration</span><span class="m-chip">Shared family/couple calendars</span><span class="m-chip">Gift delivery integration</span></div>' },
      { label: 'Solution',       content: '<p>HeartReminder is a relationship reminder app designed to help users never miss moments that matter — with relationship-based contact tagging, smart multi-stage reminders, one-tap actions, and warm emotional notification copy.</p>' },
      { label: 'What I Learned', content: '<ul><li>Designing simple consumer products with emotional intelligence</li><li>Solving everyday relationship problems through thoughtful design</li><li>The importance of context and timing in user engagement</li></ul>' }
    ]
  }
};

function openModal(id) {
  const c = cases[id];
  let html = '';
  c.sections.forEach((s, i) => {
    if (i > 0) html += '<div class="m-divider"></div>';
    html += `<div class="m-section"><div class="m-label">${s.label}</div>${s.content}</div>`;
  });
  if (c.quote) html += `<div class="m-quote">${c.quote}</div>`;
  document.getElementById('m-emoji').textContent = c.emoji;
  document.getElementById('m-badge').textContent = c.badge;
  document.getElementById('m-title').textContent = c.title;
  document.getElementById('m-body').innerHTML    = html;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
 
