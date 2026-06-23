// Smooth menu toggle with animations
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

// Intersection Observer for card animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll(".journey-cards, .projects-cards, .resources-main-cards, .resources-cards").forEach((card) => {
  card.style.opacity = "0";
  observer.observe(card);
});

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

    successOverlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "/Thank/";
    }, 1800);
  });
}


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
