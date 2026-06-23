// iOS 26 Digital Resource Ecosystem - Complete System

// ===============================================
// Mobile Navigation - Bottom Dock
// ===============================================

const menuBtn = document.querySelector('.menu-btn');
const navRight = document.querySelector('.nav-right');

if (menuBtn && navRight) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navRight.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('.nav-right a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navRight.classList.remove('active');
    });
  });
}

// Navigation function for dock
function navigateTo(target) {
  if (target.startsWith('#')) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    window.location.href = target;
  }
  updateDockActive(target);
}

function updateDockActive(target) {
  const dockItems = document.querySelectorAll('.dock-item');
  dockItems.forEach(item => item.classList.remove('active'));
  
  if (target === '/') {
    dockItems[0].classList.add('active');
  } else if (target.includes('resources')) {
    dockItems[1].classList.add('active');
  } else if (target.includes('journey')) {
    dockItems[2].classList.add('active');
  } else if (target.includes('Feedback')) {
    dockItems[3].classList.add('active');
  }
}

// ===============================================
// Discovery System - Search & Filtering
// ===============================================

const searchInput = document.getElementById('searchInput');
const filterChips = document.querySelectorAll('.filter-chip');
const resourceTiles = document.querySelectorAll('.resource-tile');

let activeCategory = 'all';

// Search functionality
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterResources(searchTerm, activeCategory);
  });
}

// Category filtering
filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCategory = chip.dataset.category;
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    filterResources(searchTerm, activeCategory);
  });
});

function filterResources(searchTerm, category) {
  resourceTiles.forEach(tile => {
    const title = tile.querySelector('.tile-title')?.textContent.toLowerCase() || '';
    const description = tile.querySelector('.tile-description')?.textContent.toLowerCase() || '';
    const tileCategory = tile.dataset.category || '';
    
    const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
    const matchesCategory = category === 'all' || tileCategory === category;
    
    if (matchesSearch && matchesCategory) {
      tile.style.display = '';
      tile.style.animation = 'fadeInUp 0.4s ease forwards';
    } else {
      tile.style.display = 'none';
    }
  });
}

// ===============================================
// Scroll Animations - Card Reveals
// ===============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.resource-tile, .milestone-card').forEach((card) => {
  card.style.opacity = '0';
  observer.observe(card);
});

// ===============================================
// Smooth Page Transitions
// ===============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===============================================
// Timeline Progress Animation
// ===============================================

const timelineItems = document.querySelectorAll('.timeline-item');
let timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
  item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
  item.style.opacity = '0';
  timelineObserver.observe(item);
});

// ===============================================
// Dock Navigation - Active State on Scroll
// ===============================================

window.addEventListener('scroll', () => {
  const heroPos = document.querySelector('.hero')?.getBoundingClientRect().bottom || 0;
  const resourcesPos = document.querySelector('#resources')?.getBoundingClientRect().top || 0;
  const journeyPos = document.querySelector('#journey')?.getBoundingClientRect().top || 0;
  
  const dockItems = document.querySelectorAll('.dock-item');
  
  if (heroPos > window.innerHeight / 2) {
    dockItems.forEach(item => item.classList.remove('active'));
    dockItems[0].classList.add('active');
  } else if (resourcesPos < window.innerHeight / 2 && journeyPos > window.innerHeight / 2) {
    dockItems.forEach(item => item.classList.remove('active'));
    dockItems[1].classList.add('active');
  } else if (journeyPos < window.innerHeight / 2) {
    dockItems.forEach(item => item.classList.remove('active'));
    dockItems[2].classList.add('active');
  }
});
