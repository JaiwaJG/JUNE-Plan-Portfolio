// iOS 26 Liquid Glass Material System - Enhanced Interactions

// Menu Toggle with Spring Animation
const menuBtn = document.querySelector(".menu-btn");
const navRight = document.querySelector(".nav-right");

if (menuBtn && navRight) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navRight.classList.toggle("active");
    document.body.style.overflow = navRight.classList.contains("active") ? "hidden" : "auto";
  });

  const navLinks = document.querySelectorAll(".nav-right a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      navRight.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
}

// Intersection Observer for Card Entrance Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all card elements for staggered animation
document.querySelectorAll(".journey-card, .resource-card").forEach((card, index) => {
  card.style.opacity = "0";
  observer.observe(card);
});

// Parallax Effect on Scroll
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll("#journey::before, #resources::before");
  
  parallaxElements.forEach((el) => {
    el.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
});

// Resource Card Details Toggle
function toggleResourceDetails(card) {
  const isExpanded = card.querySelector(".resource-detail-card");
  
  if (!isExpanded) {
    const detailCard = document.createElement("div");
    detailCard.className = "resource-detail-card";
    detailCard.innerHTML = `
      <p>Premium resources and tools curated for your success.</p>
      <a href="#">Explore More →</a>
    `;
    card.appendChild(detailCard);
  } else {
    isExpanded.remove();
  }
}

// Feedback Form Submission
const feedbackForm = document.getElementById("feedbackForm");
const successOverlay = document.getElementById("successOverlay");

if (feedbackForm) {
  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(feedbackForm);

    await fetch(feedbackForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (successOverlay) {
      successOverlay.classList.add("active");
      setTimeout(() => {
        window.location.href = "/Thank/";
      }, 1800);
    }
  });
}

// Visitor Counter
const visitorCount = document.getElementById("visitor-count");
if (visitorCount) {
  fetch("https://api.counterapi.dev/v1/jaiwateam/portfolio/up")
    .then((res) => res.json())
    .then((data) => {
      visitorCount.textContent = data.count;
    })
    .catch(() => {
      visitorCount.textContent = "Unavailable";
    });
}

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
