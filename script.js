// JAIWA Personal Learning Ecosystem - Navigation & Interactions

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navRight = document.querySelector('.nav-right');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navRight.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('.nav-right a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navRight.classList.remove('active');
      menuBtn.classList.remove('active');
    });
  });
}

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      updateBottomNav();
    }
  });
});

// Update bottom navigation active state
function updateBottomNav() {
  const resourcesPos = document.querySelector('#resources')?.getBoundingClientRect().top || Infinity;
  const journeyPos = document.querySelector('#journey')?.getBoundingClientRect().top || Infinity;
  const bottomNavLinks = document.querySelectorAll('.bottom-nav a');

  bottomNavLinks.forEach(link => link.classList.remove('active'));

  if (resourcesPos > window.innerHeight / 2) {
    bottomNavLinks[0].classList.add('active');
  } else if (journeyPos > window.innerHeight / 2) {
    bottomNavLinks[1].classList.add('active');
  } else if (journeyPos < 0) {
    bottomNavLinks[2].classList.add('active');
  }
}

window.addEventListener('scroll', updateBottomNav);

// Card entrance animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.module-card, .milestone').forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});
