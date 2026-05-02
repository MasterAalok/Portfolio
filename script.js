const navbar = document.querySelector(".navbar");
const links = document.querySelectorAll(".nav-links a");
const highlight = document.querySelector(".nav-highlight");

function moveHighlight(el) {
  const rect = el.getBoundingClientRect();
  const parent = el.closest(".nav-container").getBoundingClientRect();

  highlight.style.left = rect.left - parent.left + rect.width / 2 - 45 + "px";
}

/* Default */
moveHighlight(document.querySelector(".active"));

/* Click */
links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    moveHighlight(link);
  });
});

/* Scroll states */
window.addEventListener("scroll", () => {
  const y = window.scrollY;

  navbar.classList.remove("scrolled-light", "scrolled-heavy");

 if (y > 60 && y < 250) {
  navbar.classList.add("scrolled-light");
} 
else if (y >= 250) {
  navbar.classList.add("scrolled-heavy");
}
});

// --------------Hero-----------

const heroTitle = document.querySelector(".hero-title");

window.addEventListener("mousemove", (e) => {
  let x = (e.clientX / window.innerWidth - 0.5) * 20;
  let y = (e.clientY / window.innerHeight - 0.5) * 20;

  heroTitle.style.transform = `translate(${x}px, ${y}px)`;
});
// ----------------typing--------------
const words = ["Graphic Designer", "DevOps Engineer"];

let i = 0;
let j = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {
  let currentWord = words[i];

  if (isDeleting) {
    j--;
  } else {
    j++;
  }

  typingElement.textContent = currentWord.substring(0, j);

  let speed = isDeleting ? 40 : 110;

  if (!isDeleting && j === currentWord.length) {
    isDeleting = true;
    speed = 1200;
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    speed = 80;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

const btn = document.getElementById("resumeBtn");

btn.addEventListener("click", () => {
  const text = btn.querySelector(".btn-text");

  btn.classList.add("loading");
  text.textContent = "Downloading...";

  setTimeout(() => {
    btn.classList.remove("loading");
    text.textContent = "GET RESUME";
  }, 2000); // 2 sec animation
});

const collabBtn = document.getElementById("collabBtn");

collabBtn.addEventListener("click", () => {
  const text = collabBtn.querySelector(".btn-text");

  collabBtn.classList.add("loading");
  text.textContent = "Opening...";

  setTimeout(() => {
    text.textContent = "LET'S COLLABORATE";
    collabBtn.classList.remove("loading");
  }, 1500);
});

const reveals = document.querySelectorAll(".about-left, .about-right, .timeline-item, .stat");

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("reveal","show");
    }
  });
},{ threshold: 0.2 });

reveals.forEach(el=>{
  el.classList.add("reveal");
  observer.observe(el);
});



const icons = document.querySelectorAll(".stat i, .timeline-item i");

document.addEventListener("mousemove", (e) => {
  let x = (e.clientX / window.innerWidth - 0.5) * 10;
  let y = (e.clientY / window.innerHeight - 0.5) * 10;

  icons.forEach(icon => {
    icon.style.transform = `translate(${x}px, ${y}px)`;
  });
});

lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (!menuToggle || !navLinks) {
    console.log("❌ menuToggle or navLinks not found");
    return;
  }

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // close on click
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

});