// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll("section[id]");

function highlightNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle("active", scrollY >= top && scrollY < top + height);
    }
  });
}

window.addEventListener("scroll", highlightNav);

// ===========================
// HERO CHARACTER ANIMATION
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const chars = document.querySelectorAll(".hero-name .char");
  chars.forEach((char, i) => {
    setTimeout(() => {
      char.classList.add("visible");
    }, 100 + i * 60);
  });
});

// ===========================
// SCROLL-DRIVEN ANIMATIONS
// ===========================
function createObserver(selector, options = {}) {
  const threshold = options.threshold || 0.15;
  const stagger = options.stagger || 100;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || 0);
          // For staggered children, calculate based on sibling index
          const parent = el.parentElement;
          const siblings = parent
            ? [...parent.querySelectorAll(selector)]
            : [];
          const index = siblings.indexOf(el);
          const totalDelay = delay + index * stagger;

          setTimeout(() => {
            el.classList.add("visible");
          }, totalDelay);

          observer.unobserve(el);
        }
      });
    },
    { threshold }
  );

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  // Animate fade elements
  createObserver(".anim-fade", { stagger: 150, threshold: 0.1 });

  // Animate slide-up elements (cards)
  createObserver(".anim-slide-up", { stagger: 120, threshold: 0.08 });
});

// ===========================
// SMOOTH HOVER TILT ON CARDS
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".work-card, .skill-card, .journey-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
});