// Portfolio Archive Page
const portfolioGrid = document.querySelector("[data-portfolio-grid]");
const filterButtons = Array.from(document.querySelectorAll("[data-category]"));
const sortSelect = document.querySelector("[data-sort-select]");
const resetFiltersBtn = document.querySelector("[data-reset-filters]");
const paginationPrev = document.querySelector("[data-pagination-prev]");
const paginationNext = document.querySelector("[data-pagination-next]");
const paginationDots = document.querySelector("[data-pagination-dots]");
const itemsInfo = document.querySelector("[data-items-info]");

const ITEMS_PER_PAGE = 15;
let currentPage = 1;
let currentCategory = "All";
let currentSort = "newest";
let allPortfolioItems = [];

// Generate portfolio items data
const generatePortfolioItems = () => {
  const categories = ["Fashion", "Portrait", "Events", "Commercial", "Weddings"];
  const titles = [
    "Ethereal Beauty",
    "Urban Elegance",
    "Golden Hour",
    "Brand Vision",
    "Timeless Romance",
    "Modern Luxe",
    "Serene Moments",
    "Vibrant Frames",
    "Luminous Dreams",
    "Elegant Essence",
    "Creative Vision",
    "Artistic Soul",
    "Sunset Glow",
    "Midnight Magic",
    "Dawn Whispers",
    "Radiant Spirit",
    "Cosmic Beauty",
    "Natural Grace",
    "Pure Elegance",
    "Bold Statement",
    "Soft Focus",
    "Dynamic Energy",
    "Peaceful Bliss",
    "Romantic Escape",
    "Urban Jungle",
    "Beachside Dream",
    "Mountain Peak",
    "City Lights",
    "Silent Moments",
    "Vivid Colors",
    "Monochrome Art",
    "Golden Hour",
    "Twilight Magic",
    "Crystal Clear",
    "Blurred Motion",
    "Sharp Details",
    "Gentle Touch",
    "Strong Impact",
    "Subtle Beauty",
    "Bold Lines",
    "Texture Play",
    "Light Dance",
    "Shadow Play",
    "Contrast Focus",
    "Harmony Blend"
  ];

  const images = [
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1364&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1469&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1376&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530439387789-4c1017266635?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518361331344-8da6c7c34b9d?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472701681238-1bfbf60575df?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551883618-acbc8302a5d9?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1445705686981-dbb5b894f568?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1439404653976-441369e8a7e0?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508214751196-bcfd092b4a5a?q=80&w=1470&auto=format&fit=crop",
  ];

  const items = [];
  for (let i = 0; i < 45; i++) {
    items.push({
      id: i + 1,
      title: titles[i],
      category: categories[i % categories.length],
      image: images[i % images.length],
      date: new Date(2024, Math.floor(i / 5), (i % 28) + 1),
      views: Math.floor(Math.random() * 5000) + 500
    });
  }
  return items;
};

allPortfolioItems = generatePortfolioItems();

// Sort items
const sortItems = (items) => {
  const sorted = [...items];
  switch (currentSort) {
    case "oldest":
      return sorted.sort((a, b) => a.date - b.date);
    case "popular":
      return sorted.sort((a, b) => b.views - a.views);
    case "newest":
    default:
      return sorted.sort((a, b) => b.date - a.date);
  }
};

// Filter items
const getFilteredItems = () => {
  let filtered = allPortfolioItems;
  
  if (currentCategory !== "All") {
    filtered = filtered.filter(item => item.category === currentCategory);
  }
  
  return sortItems(filtered);
};

// Render portfolio grid
const renderPortfolioGrid = () => {
  const filtered = getFilteredItems();
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, end);

  portfolioGrid.innerHTML = pageItems.map(item => `
    <article class="archive-portfolio-item" data-item-id="${item.id}">
      <div class="archive-item-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="archive-item-overlay">
          <div class="archive-item-content">
            <span class="archive-item-category">${item.category}</span>
            <h3>${item.title}</h3>
            <p class="archive-item-action">View Project</p>
          </div>
        </div>
      </div>
      <div class="archive-item-meta">
        <h4>${item.title}</h4>
        <p class="archive-item-date">${item.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
      </div>
    </article>
  `).join('');

  updatePaginationInfo(filtered.length);
};

// Update pagination
const updatePaginationInfo = (totalItems) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
  
  itemsInfo.textContent = totalItems > 0 
    ? `Showing ${start}-${end} of ${totalItems}`
    : "No items found";

  // Update previous button
  paginationPrev.disabled = currentPage === 1;

  // Update next button
  paginationNext.disabled = currentPage === totalPages;

  // Update dots
  renderPaginationDots(totalPages);
};

// Render pagination dots
const renderPaginationDots = (totalPages) => {
  paginationDots.innerHTML = Array.from({ length: totalPages }, (_, i) => {
    const pageNum = i + 1;
    const isActive = pageNum === currentPage;
    return `
      <button 
        class="pagination-dot ${isActive ? 'is-active' : ''}" 
        type="button" 
        data-page="${pageNum}"
        aria-label="Go to page ${pageNum}"
        ${isActive ? 'aria-current="page"' : ''}
      ></button>
    `;
  }).join('');

  // Add click handlers to dots
  document.querySelectorAll(".pagination-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      const page = Number(dot.dataset.page);
      goToPage(page);
    });
  });
};

// Navigate to page
const goToPage = (page) => {
  currentPage = page;
  renderPortfolioGrid();
  window.scrollTo({ top: portfolioGrid.offsetTop - 200, behavior: 'smooth' });
};

// Filter functionality
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    
    // Update active state
    filterButtons.forEach(btn => {
      const isActive = btn.dataset.category === category;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
    
    // Update filter and reset pagination
    currentCategory = category;
    currentPage = 1;
    renderPortfolioGrid();
  });
});

// Sort functionality
sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  currentPage = 1;
  renderPortfolioGrid();
});

// Reset filters
resetFiltersBtn.addEventListener("click", () => {
  currentCategory = "All";
  currentSort = "newest";
  currentPage = 1;
  
  sortSelect.value = "newest";
  filterButtons.forEach(btn => {
    const isActive = btn.dataset.category === "All";
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
  
  renderPortfolioGrid();
});

// Pagination buttons
paginationPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
});

paginationNext.addEventListener("click", () => {
  const filtered = getFilteredItems();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
});

// Initial render
renderPortfolioGrid();
