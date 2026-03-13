// ── CUSTOM CURSOR ──
const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── FLOATING BG ICONS ──
const icons = ['💡','📦','🔍','📊','🚀','⚡','🧠','📱','💬','🌐','🎯','✨','🔗','📈','⚙️','💎','🗂️','🧩'];
const canvas = document.querySelector('.bg-canvas');
function spawnIcon() {
  const el = document.createElement('div');
  el.className = 'bg-icon';
  el.textContent = icons[Math.floor(Math.random() * icons.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const dur = 18 + Math.random() * 22;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = -Math.random() * dur + 's';
  el.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
  canvas.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}
for (let i = 0; i < 20; i++) spawnIcon();
setInterval(spawnIcon, 2500);

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => ro.observe(el));

// ── CASE STUDY DATA ──
const cases = {
  studypilot: {
    emoji: '📚',
    badge: 'EdTech Product Concept',
    title: 'StudyPilot — Smart Study Assistant',
    sections: [
      { label: 'The Problem', content: '<p>Many students struggle with managing their study schedules effectively. They rely on multiple disconnected tools — note apps, reminders, and calendars — which makes studying feel unstructured and overwhelming. This leads to poor time management, missed sessions, and difficulty tracking academic progress.</p>' },
      { label: 'Discovery', content: '<p>Through observing study habits among students, I found that students constantly switch between several apps to plan their routines. Many expressed a need for a single platform that organizes schedules, reminders, and progress tracking in one place.</p>' },
      { label: 'MVP Features', content: '<div class="m-chips"><span class="m-chip">Study schedule planner</span><span class="m-chip">Study reminders</span><span class="m-chip">Progress tracker</span><span class="m-chip">Productivity insights</span></div>' },
      { label: 'Future Features', content: '<div class="m-chips"><span class="m-chip">Group study collaboration</span><span class="m-chip">AI study recommendations</span><span class="m-chip">Learning platform integrations</span></div>' },
      { label: 'Solution', content: '<p>StudyPilot is a digital study assistant that helps students organize their learning and stay consistent — through personalized schedules, automated reminders, a progress dashboard, and study productivity insights.</p>' },
      { label: 'What I Learned', content: '<ul><li>How to identify real student productivity challenges through observation</li><li>Designing tools that work for academic success contexts</li><li>Feature prioritization for an MVP product in EdTech</li></ul>' }
    ]
  },
  grocerymate: {
    emoji: '🛒',
    badge: 'Consumer Product Concept',
    title: 'GroceryMate — Smart Grocery Management',
    sections: [
      { label: 'The Problem', content: '<p>Many individuals and families waste food because they forget what groceries they have at home. Items often expire before they are used, leading to unnecessary financial loss and food waste.</p>' },
      { label: 'Discovery', content: '<p>Through conversations with students and young professionals, I found that most people only realize food has expired when it\'s already spoiled. Most users rely on memory or basic notes — making food management inefficient and reactive.</p>' },
      { label: 'MVP Features', content: '<div class="m-chips"><span class="m-chip">Manual item entry + expiry dates</span><span class="m-chip">Expiration tracking</span><span class="m-chip">Push notification reminders</span><span class="m-chip">Basic recipe suggestions</span></div>' },
      { label: 'Future Features', content: '<div class="m-chips"><span class="m-chip">Barcode scanning</span><span class="m-chip">Receipt scanning</span><span class="m-chip">Shared grocery lists</span><span class="m-chip">Grocery delivery integration</span></div>' },
      { label: 'Solution', content: '<p>GroceryMate is a mobile app that helps users track groceries and reduce food waste — through expiration tracking with visual alerts, timely notifications, recipe suggestions from available ingredients, and a categorized inventory (fridge, freezer, pantry).</p>' },
      { label: 'What I Learned', content: '<ul><li>Identifying everyday consumer problems hiding in plain sight</li><li>Designing solutions around existing user behavior</li><li>Structuring features around behavioral triggers like expiry anxiety</li></ul>' }
    ]
  },
  couples: {
    emoji: '💛',
    badge: 'Personal Development Product',
    title: 'Powerful Couples OS — Relationship Growth Platform',
    sections: [
      { label: 'The Problem', content: '<p>Many couples struggle with communication, shared goal setting, and maintaining intentional relationship growth. Despite many individual productivity tools, very few digital products are designed to help couples grow together.</p>' },
      { label: 'Discovery', content: '<p>By observing discussions around modern relationships, I found that couples want tools to help them communicate better, track shared goals, and build stronger emotional connections — but existing apps are either too transactional or built for individuals, not pairs.</p>' },
      { label: 'MVP Features', content: '<div class="m-chips"><span class="m-chip">Shared couple goals</span><span class="m-chip">Weekly relationship check-ins</span><span class="m-chip">Shared calendar</span><span class="m-chip">Communication prompts</span></div>' },
      { label: 'Future Features', content: '<div class="m-chips"><span class="m-chip">Relationship exercises</span><span class="m-chip">Anniversary reminders</span><span class="m-chip">Relationship insights & analytics</span></div>' },
      { label: 'Solution', content: '<p>Powerful Couples OS is a digital platform designed to help couples strengthen their relationships through intentional communication and shared goals — featuring a relationship dashboard, weekly emotional check-ins, shared goal tracking, and guided communication prompts.</p>' },
      { label: 'What I Learned', content: '<ul><li>Human-centered product design for emotional needs</li><li>Building tools that serve two users simultaneously with shared state</li><li>Creating meaningful digital experiences beyond pure utility</li></ul>' }
    ]
  },
  brainbattle: {
    emoji: '🧩',
    badge: 'Educational Game Concept',
    title: 'BrainBattle — Gamified Tech Learning',
    sections: [
      { label: 'The Problem', content: '<p>Many people learning technology lose motivation because traditional study methods feel repetitive and boring. Existing platforms often lack engaging, interactive experiences that keep learners coming back consistently.</p>' },
      { label: 'Discovery', content: '<p>Gamification has proven to increase learning engagement. Platforms like Duolingo demonstrate how game mechanics motivate daily learning. This sparked the idea of turning technology learning into a fun, competitive experience — making the dopamine loop work for education.</p>' },
      { label: 'MVP Features', content: '<div class="m-chips"><span class="m-chip">Tech quiz challenges</span><span class="m-chip">Score system</span><span class="m-chip">Multiple attempts</span><span class="m-chip">Category-based questions</span></div>' },
      { label: 'Future Features', content: '<div class="m-chips"><span class="m-chip">Multiplayer competitions</span><span class="m-chip">Global leaderboards</span><span class="m-chip">Daily challenges</span></div>' },
      { label: 'Solution', content: '<p>BrainBattle is a gamified learning platform where users answer technology-related questions and compete to deepen their knowledge. Players solve challenges across programming languages, frameworks, and digital tools — making learning addictive rather than a chore.</p>' },
      { label: 'What I Learned', content: '<ul><li>How gamification mechanics drive sustained user engagement</li><li>Designing loop-based, habit-forming experiences</li><li>Applying competitor analysis (Duolingo) to product ideation</li></ul>' }
    ]
  },
  heartreminder: {
    emoji: '💖',
    badge: 'Consumer Product · Emotional Well-being',
    title: 'HeartReminder — Smart Relationship Reminder App',
    quote: '"We don\'t just remind you — we help you show up."',
    sections: [
      { label: 'The Problem', content: '<p>Many people unintentionally forget important personal dates — birthdays, anniversaries, milestones — not because they don\'t care, but because current reminder tools are passive and lack emotional context. Without a system that respects relationship priority, forgetting becomes inevitable, leading to guilt and strained relationships.</p>' },
      { label: 'Discovery', content: '<p>By observing how people manage personal relationships, I noticed that most people either store important dates mentally, rely on generic calendar alerts, or trust social media to remind them — which often fails when they need it most. This highlighted the need for a simple digital tool that organizes relationship reminders with emotional intelligence.</p>' },
      { label: 'MVP Features', content: '<div class="m-chips"><span class="m-chip">Relationship-based contact tagging</span><span class="m-chip">Important date tracking</span><span class="m-chip">Multi-stage reminder timeline (7d, 1d, morning)</span><span class="m-chip">Human emotional notification copy</span><span class="m-chip">One-tap action buttons (Call, Message, Voice Note)</span></div>' },
      { label: 'Future Features', content: '<div class="m-chips"><span class="m-chip">AI-generated message suggestions</span><span class="m-chip">Native contacts sync</span><span class="m-chip">WhatsApp integration</span><span class="m-chip">Shared family/couple calendars</span><span class="m-chip">Gift delivery integration</span></div>' },
      { label: 'Solution', content: '<p>HeartReminder is a relationship reminder application designed to help users never miss moments that matter. It features relationship-based contact tagging, smart multi-stage reminders, one-tap actions to reach out instantly, warm emotional notification copy, and a clean, intuitive interface.</p>' },
      { label: 'What I Learned', content: '<ul><li>Designing simple consumer products with emotional intelligence</li><li>Solving everyday relationship problems through thoughtful design</li><li>Building minimal but effective solutions that drive real human connection</li><li>The importance of context and timing in user engagement</li></ul>' }
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
  document.getElementById('m-body').innerHTML = html;
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
