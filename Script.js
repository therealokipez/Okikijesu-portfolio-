// Custom Cursor

const cursor=document.querySelector(".cursor")
const ring=document.querySelector(".cursor-ring")

document.addEventListener("mousemove",e=>{

cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"

ring.style.left=e.clientX+"px"
ring.style.top=e.clientY+"px"

})


// Scroll Reveal

const reveals=document.querySelectorAll(".reveal")

window.addEventListener("scroll",()=>{

reveals.forEach(el=>{

const top=el.getBoundingClientRect().top

if(top<window.innerHeight-100){
el.classList.add("visible")
}

})

})


// Projects

const projects=[

{
title:"Grocery Mate",
url:"https://grocerymate.lovable.app/",
emoji:"🛒",
subtitle:"Grocery Management App"
},

{
title:"Study Pilot",
url:"https://study-pilot-1.lovable.app/",
emoji:"📚",
subtitle:"Smart Study Assistant"
},

{
title:"Heart Reminder",
url:"https://act-area-53323354.figma.site/people",
emoji:"❤️",
subtitle:"Wellbeing Reminder"
},

{
title:"Powerful Couple OS",
url:"https://powercoupleos.lovable.app/",
emoji:"💑",
subtitle:"Relationship Platform"
},

{
title:"Bit Brain Battles",
url:"https://bit-brain-battles.lovable.app/",
emoji:"🧠",
subtitle:"Tech Quiz Game"
}

]


const grid=document.querySelector(".projects-grid")

projects.forEach((p,i)=>{

const card=document.createElement("div")

card.className="project-card"

card.innerHTML=`

<div class="card-bg-emoji">${p.emoji}</div>

<h3>${p.title}</h3>

<p>${p.subtitle}</p>

<a class="card-btn" href="${p.url}" target="_blank">View Project →</a>

`

grid.appendChild(card)

})
