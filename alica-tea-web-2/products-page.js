// Products Archive Page
// Filtering, Sorting, and Pagination

document.addEventListener('DOMContentLoaded', function() {
    
    // Configuration
    const itemsPerPage = 12;
    let currentPage = 1;
    let filteredProducts = [];
    let allProducts = [];
    
    // Get DOM elements
    const productsGrid = document.getElementById('productsGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const resultsCount = document.getElementById('resultsCount');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const categoryLinks = document.querySelectorAll('.category-link');
    
    // Initialize
    function init() {
        // Gather all product items
        allProducts = Array.from(document.querySelectorAll('.product-archive-item'));
        filteredProducts = [...allProducts];
        
        // Update display
        updateResultsCount();
        renderProducts();
        renderPagination();
        
        // Event listeners
        if (categoryFilter) {
            categoryFilter.addEventListener('change', handleFilter);
        }
        if (sortFilter) {
            sortFilter.addEventListener('change', handleSort);
        }
        prevPageBtn.addEventListener('click', () => goToPage(currentPage - 1));
        nextPageBtn.addEventListener('click', () => goToPage(currentPage + 1));
        
        // Sidebar category links
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.dataset.category;
                
                // Update sidebar active state
                categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
                this.parentElement.classList.add('active');
                
                // Update select dropdown
                if (categoryFilter) {
                    categoryFilter.value = category;
                }
                
                // Filter items
                filterByCategory(category);
            });
        });
    }
    
    // Filter products by category
    function handleFilter() {
        const selectedCategory = categoryFilter.value;
        
        // Update sidebar active state
        updateSidebarActiveState(selectedCategory);
        
        filterByCategory(selectedCategory);
    }
    
    function filterByCategory(category) {
        if (category === 'all') {
            filteredProducts = [...allProducts];
        } else {
            filteredProducts = allProducts.filter(product => {
                return product.dataset.category === category;
            });
        }
        
        // Reset to first page
        currentPage = 1;
        
        // Apply current sort
        applySorting();
        
        // Update display
        updateResultsCount();
        renderProducts();
        renderPagination();
        
        // Smooth scroll to products
        scrollToProducts();
    }
    
    function updateSidebarActiveState(category) {
        categoryLinks.forEach(link => {
            const linkCategory = link.dataset.category;
            if (linkCategory === category) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });
    }
    
    // Sort products
    function handleSort() {
        applySorting();
        renderProducts();
        scrollToProducts();
    }
    
    function applySorting() {
        const sortValue = sortFilter.value;
        
        switch(sortValue) {
            case 'name-asc':
                filteredProducts.sort((a, b) => {
                    const nameA = a.querySelector('.product-archive-name').textContent;
                    const nameB = b.querySelector('.product-archive-name').textContent;
                    return nameA.localeCompare(nameB);
                });
                break;
                
            case 'name-desc':
                filteredProducts.sort((a, b) => {
                    const nameA = a.querySelector('.product-archive-name').textContent;
                    const nameB = b.querySelector('.product-archive-name').textContent;
                    return nameB.localeCompare(nameA);
                });
                break;
                
            case 'featured':
            default:
                // Keep original order (featured)
                filteredProducts = filteredProducts.sort((a, b) => {
                    return allProducts.indexOf(a) - allProducts.indexOf(b);
                });
                break;
        }
    }
    
    // Render products for current page
    function renderProducts() {
        // Add loading state
        productsGrid.classList.add('loading');
        
        setTimeout(() => {
            // Clear grid
            productsGrid.innerHTML = '';
            
            // Calculate pagination
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageProducts = filteredProducts.slice(startIndex, endIndex);
            
            // Check if no products
            if (pageProducts.length === 0) {
                renderEmptyState();
                productsGrid.classList.remove('loading');
                return;
            }
            
            // Render products
            pageProducts.forEach((product, index) => {
                const clone = product.cloneNode(true);
                
                // Reset animation
                clone.style.opacity = '0';
                clone.style.animation = 'none';
                
                productsGrid.appendChild(clone);
                
                // Trigger animation
                setTimeout(() => {
                    clone.style.animation = `fadeInUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                    clone.style.animationDelay = `${index * 50}ms`;
                }, 10);
            });
            
            // Remove loading state
            productsGrid.classList.remove('loading');
            
        }, 300);
    }
    
    // Render empty state
    function renderEmptyState() {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3 class="empty-state-title">No products found</h3>
                <p class="empty-state-text">Please adjust your filters to see more results.</p>
            </div>
        `;
    }
    
    // Render pagination controls
    function renderPagination() {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        
        // Clear existing numbers
        paginationNumbers.innerHTML = '';
        
        // Generate page numbers
        const pagesToShow = getPageNumbers(currentPage, totalPages);
        
        pagesToShow.forEach(page => {
            if (page === '...') {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.style.padding = '0 0.5rem';
                ellipsis.style.color = 'var(--color-earth)';
                paginationNumbers.appendChild(ellipsis);
            } else {
                const button = document.createElement('button');
                button.textContent = page;
                button.className = 'pagination-number';
                button.dataset.page = page;
                
                if (page === currentPage) {
                    button.classList.add('active');
                }
                
                button.addEventListener('click', () => goToPage(page));
                paginationNumbers.appendChild(button);
            }
        });
        
        // Update prev/next buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        // Hide pagination if only one page
        if (totalPages <= 1) {
            document.querySelector('.pagination').style.display = 'none';
        } else {
            document.querySelector('.pagination').style.display = 'flex';
        }
    }
    
    // Calculate which page numbers to show
    function getPageNumbers(current, total) {
        const pages = [];
        
        if (total <= 7) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (current > 3) {
                pages.push('...');
            }
            
            // Show pages around current
            const start = Math.max(2, current - 1);
            const end = Math.min(total - 1, current + 1);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (current < total - 2) {
                pages.push('...');
            }
            
            // Always show last page
            pages.push(total);
        }
        
        return pages;
    }
    
    // Navigate to specific page
    function goToPage(page) {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        
        if (page < 1 || page > totalPages) return;
        
        currentPage = page;
        renderProducts();
        renderPagination();
        scrollToProducts();
    }
    
    // Update results count
    function updateResultsCount() {
        resultsCount.textContent = filteredProducts.length;
    }
    
    // Smooth scroll to products grid
    function scrollToProducts() {
        const filtersSection = document.querySelector('.filters-section');
        const offset = filtersSection ? filtersSection.offsetHeight + 80 : 150;
        
        window.scrollTo({
            top: document.querySelector('.products-archive').offsetTop - offset,
            behavior: 'smooth'
        });
    }
    
    // Initialize page
    init();
    
    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        init();
    });
});
