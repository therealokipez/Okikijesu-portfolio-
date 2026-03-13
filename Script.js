// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top = e.clientY + 'px';
});

// Optional: enlarge cursor on links
const links = document.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.6)';
    cursorRing.style.borderColor = 'var(--purple2)';
  });
  link.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorRing.style.borderColor = 'rgba(168,85,247,0.5)';
  });
});

// ===== Reveal on Scroll =====
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){
      el.classList.add('visible');
    }
  });
});

// ===== Dynamic Projects =====
const projects = [
  { title:'Grocery Mate', url:'https://grocerymate.lovable.app/', emoji:'🛒', badge:'Consumer', subtitle:'Grocery Management App', desc:'A platform to help users organize groceries and manage shopping lists efficiently.' },
  { title:'Study Pilot', url:'https://study-pilot-1.lovable.app/', emoji:'📚', badge:'EdTech', subtitle:'Smart Study Assistant', desc:'Helps students manage study schedules, track progress, and increase productivity.' },
  { title:'Heart Reminder', url:'https://act-area-53323354.figma.site/people', emoji:'❤️', badge:'Wellbeing', subtitle:'Wellbeing Reminder App', desc:'Designed to remind users of personal moments and wellness tasks daily.' },
  { title:'Powerful Couple OS', url:'https://powercoupleos.lovable.app/', emoji:'💑', badge:'Consumer', subtitle:'Relationship Management Platform', desc:'Helps couples manage shared goals and strengthen communication in their relationship.' },
  { title:'Bit Brain Battles', url:'https://bit-brain-battles.lovable.app/', emoji:'🧠', badge:'Game', subtitle:'Tech Quiz & Learning Game', desc:'Gamified platform for competing in tech quizzes while boosting knowledge retention.' },
];

const projectsGrid = document.querySelector('.projects-grid');
projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = `project-card pc${i+1} reveal`;
  card.innerHTML = `
    <div class="card-top">
      <div class="card-num">0${i+1}</div>
      <div class="card-badge">${p.badge}</div>
    </div>
    <div class="card-bg-emoji">${p.emoji}</div>
    <h3 class="card-title">${p.title}</h3>
    <div class="card-sub">${p.subtitle}</div>
    <div class="card-desc">${p.desc}</div>
    <div class="card-footer">
      <a href="${p.url}" target="_blank" class="card-btn">View Project →</a>
    </div>
  `;
  projectsGrid.appendChild(card);
});
