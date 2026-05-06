/* ===== EXISTING CURSOR ===== */
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";

  createTrail(mouseX, mouseY); // 🔥 trail
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();


/* ===== TRAIL EFFECT ===== */
const trailContainer = document.getElementById("trail-container");

function createTrail(x, y) {
  const trail = document.createElement("div");
  trail.classList.add("trail");

  trail.style.left = x + "px";
  trail.style.top = y + "px";

  trailContainer.appendChild(trail);

  setTimeout(() => trail.remove(), 600);
}


/* ===== PARTICLE EFFECT ===== */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* create particles on click */
document.addEventListener("click", (e) => {
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 6,
      speedY: (Math.random() - 0.5) * 6,
      life: 60
    });
  }
});

/* animate particles */
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(139,92,246,0.8)";
    ctx.fill();

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

const navbar = document.querySelector(".navbar");
const links = document.querySelectorAll(".nav-links a");
const highlight = document.querySelector(".nav-highlight");

/* ===== MOVE HIGHLIGHT ===== */
function moveHighlight(el) {
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const parent = el.closest(".nav-container").getBoundingClientRect();

  const highlightWidth = highlight.offsetWidth;

  highlight.style.left =
    rect.left - parent.left + rect.width / 2 - highlightWidth / 2 + "px";
}

/* ===== DEFAULT ===== */
window.addEventListener("load", () => {
  moveHighlight(document.querySelector(".active"));
});

/* ===== CLICK ===== */
links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    setTimeout(() => moveHighlight(link), 100);
  });
});

/* ===== SCROLL ACTIVE ===== */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {

      links.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active");
          moveHighlight(link);
        }
      });

    }
  });
});

/* ===== RESIZE FIX ===== */
window.addEventListener("resize", () => {
  moveHighlight(document.querySelector(".active"));
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



/* ================= PROJECT TOGGLE ================= */

const categories =
document.querySelectorAll(".project-category");

categories.forEach(category => {

  const btn =
  category.querySelector(".toggle-btn");

  btn.addEventListener("click", () => {

    category.classList.toggle("active");

  });

});

/* ================= FLIP CARDS ================= */

const graphicCards =
document.querySelectorAll(".graphic-card");

graphicCards.forEach(card => {

  card.addEventListener("click", () => {

    card.classList.toggle("active");

  });

});