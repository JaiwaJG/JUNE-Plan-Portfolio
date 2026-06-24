// JAIWA Resource Discovery Platform - JavaScript

let filteredResources = RESOURCES;
let currentCategory = null;
let currentSubcategory = null;

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderFeaturedResources();
  renderRecentResources();
  renderAllResources();
  setupSearch();
  setupFilters();
  setupMobileNav();
});

// ============ RENDER FUNCTIONS ============

function renderCategories() {
  const categoryGrid = document.getElementById('categoryGrid');
  categoryGrid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat.name}')">
      <span class="category-icon">${cat.icon}</span>
      <h3>${cat.name}</h3>
      <p>${cat.description}</p>
    </div>
  `).join('');
}

function renderFeaturedResources() {
  const featured = RESOURCES.filter(r => r.featured).slice(0, 4);
  const grid = document.getElementById('featuredGrid');
  grid.innerHTML = featured.map(resource => createResourceCard(resource)).join('');
}

function renderRecentResources() {
  const recent = RESOURCES.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 6);
  const grid = document.getElementById('recentGrid');
  grid.innerHTML = recent.map(resource => createResourceCard(resource)).join('');
}

function renderAllResources(resources = RESOURCES) {
  const grid = document.getElementById('resourcesGrid');
  
  if (resources.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>No resources found. Try adjusting your filters.</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = resources.map(resource => createResourceCard(resource)).join('');
}

function createResourceCard(resource) {
  return `
    <a href="${resource.url}" target="_blank" class="resource-card">
      <div class="resource-header">
        <div class="resource-title">${resource.title}</div>
        <span class="resource-category">${resource.category}</span>
      </div>
      <div class="resource-description">${resource.description}</div>
      <div class="resource-tags">
        ${resource.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
        ${resource.tags.length > 3 ? `<span class="tag">+${resource.tags.length - 3}</span>` : ''}
      </div>
      <div class="resource-link">
        Visit Resource <i class="fas fa-arrow-right"></i>
      </div>
    </a>
  `;
}

// ============ SEARCH FUNCTIONALITY ============

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    clearBtn.style.display = query ? 'block' : 'none';
    
    if (query.length === 0) {
      filterResources();
      return;
    }

    const results = RESOURCES.filter(resource => 
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.tags.some(tag => tag.toLowerCase().includes(query))
    );

    filterResources(results);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    filterResources();
  });
}

// ============ FILTER FUNCTIONALITY ============

function setupFilters() {
  const filterToggle = document.getElementById('filterToggle');
  const filterPanel = document.getElementById('filterPanel');

  filterToggle.addEventListener('click', () => {
    filterPanel.style.display = filterPanel.style.display === 'none' ? 'block' : 'none';
  });

  renderCategoryPills();
}

function renderCategoryPills() {
  const categoryPills = document.getElementById('categoryPills');
  categoryPills.innerHTML = CATEGORIES.map(cat => `
    <button class="pill ${currentCategory === cat.name ? 'active' : ''}" 
            onclick="selectCategory('${cat.name}')">
      ${cat.name}
    </button>
  `).join('');
}

function renderSubcategoryPills() {
  const subcategoryPills = document.getElementById('subcategoryPills');
  
  if (!currentCategory) {
    subcategoryPills.innerHTML = '';
    return;
  }

  const category = CATEGORIES.find(c => c.name === currentCategory);
  const subcategories = category ? category.subcategories : [];

  subcategoryPills.innerHTML = subcategories.map(sub => `
    <button class="pill ${currentSubcategory === sub ? 'active' : ''}" 
            onclick="selectSubcategory('${sub}')">
      ${sub}
    </button>
  `).join('');
}

function selectCategory(category) {
  currentCategory = currentCategory === category ? null : category;
  currentSubcategory = null;
  renderCategoryPills();
  renderSubcategoryPills();
  filterResources();
}

function selectSubcategory(subcategory) {
  currentSubcategory = currentSubcategory === subcategory ? null : subcategory;
  renderSubcategoryPills();
  filterResources();
}

function filterByCategory(category) {
  currentCategory = category;
  currentSubcategory = null;
  renderCategoryPills();
  renderSubcategoryPills();
  filterResources();
  
  // Scroll to filter section
  document.getElementById('filterPanel').style.display = 'block';
  document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
}

function filterResources(searchResults = null) {
  let results = searchResults || RESOURCES;

  if (currentCategory) {
    results = results.filter(r => r.category === currentCategory);
  }

  if (currentSubcategory) {
    results = results.filter(r => r.subcategory === currentSubcategory);
  }

  // Update title
  let title = 'All Resources';
  if (currentCategory) {
    title = currentCategory;
    if (currentSubcategory) {
      title += ` - ${currentSubcategory}`;
    }
  }
  document.getElementById('categoryTitle').textContent = title;

  renderAllResources(results);
}

// ============ MOBILE NAVIGATION ============

function setupMobileNav() {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    menuBtn.classList.toggle('active');
  });

  // Close menu when link clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.style.display = 'none';
      menuBtn.classList.remove('active');
    });
  });

  // Update bottom nav on scroll
  window.addEventListener('scroll', updateBottomNav);
  updateBottomNav();
}

function updateBottomNav() {
  const resourcesSection = document.getElementById('resources');
  const resourcesPos = resourcesSection?.getBoundingClientRect().top || Infinity;
  const bottomNavItems = document.querySelectorAll('.nav-item');

  bottomNavItems.forEach(item => item.classList.remove('active'));

  if (resourcesPos > 100) {
    bottomNavItems[0].classList.add('active');
  } else {
    bottomNavItems[1].classList.add('active');
  }
}

// Close filter panel when clicking outside
document.addEventListener('click', (e) => {
  const filterPanel = document.getElementById('filterPanel');
  const filterToggle = document.getElementById('filterToggle');
  
  if (!filterPanel.contains(e.target) && !filterToggle.contains(e.target)) {
    filterPanel.style.display = 'none';
  }
});
