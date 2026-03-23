/**
 * NEXUS INDUSTRIAL - Products Archive Page
 * JavaScript Module
 */

(function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const filterToggle = document.getElementById('filter-toggle');
    const productsGrid = document.getElementById('products-grid');
    const productSearch = document.getElementById('product-search');
    const sortSelect = document.getElementById('sort-select');
    const viewButtons = document.querySelectorAll('.view-btn');
    const categoryLinks = document.querySelectorAll('.sidebar__link[data-category]');
    const checkboxes = document.querySelectorAll('.checkbox input');
    const radioButtons = document.querySelectorAll('.radio input');
    const applyButton = document.querySelector('.sidebar__apply');
    const resetButton = document.querySelector('.sidebar__reset');
    const productCards = document.querySelectorAll('.archive-card');
    const productCount = document.querySelector('.products-toolbar__count strong');

    // Create overlay element
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    // ========================================
    // SIDEBAR TOGGLE (MOBILE)
    // ========================================
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (filterToggle) {
        filterToggle.addEventListener('click', openSidebar);
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // ========================================
    // VIEW TOGGLE (GRID/LIST)
    // ========================================
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            
            viewButtons.forEach(b => b.classList.remove('view-btn--active'));
            btn.classList.add('view-btn--active');
            
            if (view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }

            // Re-trigger animations
            triggerCardAnimations();
        });
    });

    // ========================================
    // CATEGORY FILTERING
    // ========================================
    let activeCategory = 'all';

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const category = link.dataset.category;
            activeCategory = category;

            // Update active state
            categoryLinks.forEach(l => l.classList.remove('sidebar__link--active'));
            link.classList.add('sidebar__link--active');

            // Filter products
            filterProducts();

            // Close sidebar on mobile
            if (window.innerWidth < 992) {
                closeSidebar();
            }
        });
    });

    // ========================================
    // SEARCH FUNCTIONALITY
    // ========================================
    let searchDebounce;

    if (productSearch) {
        productSearch.addEventListener('input', () => {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => {
                filterProducts();
            }, 300);
        });
    }

    // ========================================
    // FILTER PRODUCTS
    // ========================================
    function filterProducts() {
        const searchTerm = productSearch ? productSearch.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        productCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector('.archive-card__title').textContent.toLowerCase();
            const desc = card.querySelector('.archive-card__desc').textContent.toLowerCase();

            // Category match
            const categoryMatch = activeCategory === 'all' || category === activeCategory;

            // Search match
            const searchMatch = !searchTerm || 
                title.includes(searchTerm) || 
                desc.includes(searchTerm);

            // Apply visibility
            if (categoryMatch && searchMatch) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update count
        if (productCount) {
            productCount.textContent = visibleCount;
        }

        // Show no results message
        showNoResults(visibleCount === 0);

        // Re-trigger animations for visible cards
        triggerCardAnimations();
    }

    // ========================================
    // NO RESULTS MESSAGE
    // ========================================
    function showNoResults(show) {
        let noResults = document.querySelector('.no-results');

        if (show && !noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <svg class="no-results__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                    <path d="M8 8l6 6M14 8l-6 6"/>
                </svg>
                <h3 class="no-results__title">No products found</h3>
                <p class="no-results__text">Try adjusting your filters or search terms.</p>
            `;
            productsGrid.appendChild(noResults);
        } else if (!show && noResults) {
            noResults.remove();
        }
    }

    // ========================================
    // SORT FUNCTIONALITY
    // ========================================
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            const cardsArray = Array.from(productCards);

            cardsArray.sort((a, b) => {
                const titleA = a.querySelector('.archive-card__title').textContent;
                const titleB = b.querySelector('.archive-card__title').textContent;

                switch (sortValue) {
                    case 'name-asc':
                        return titleA.localeCompare(titleB);
                    case 'name-desc':
                        return titleB.localeCompare(titleA);
                    case 'newest':
                        // Check for "new" badge
                        const aIsNew = a.querySelector('.badge--new') !== null;
                        const bIsNew = b.querySelector('.badge--new') !== null;
                        return bIsNew - aIsNew;
                    default:
                        return 0;
                }
            });

            // Reorder DOM
            cardsArray.forEach(card => {
                productsGrid.appendChild(card);
            });

            // Re-trigger animations
            triggerCardAnimations();
        });
    }

    // ========================================
    // APPLY FILTERS BUTTON
    // ========================================
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            // Get selected filters
            const selectedIndustries = [];
            const selectedCerts = [];
            let selectedMoq = 'all';

            checkboxes.forEach(cb => {
                if (cb.checked) {
                    if (cb.name === 'industry') {
                        selectedIndustries.push(cb.value);
                    } else if (cb.name === 'cert') {
                        selectedCerts.push(cb.value);
                    }
                }
            });

            radioButtons.forEach(rb => {
                if (rb.checked && rb.name === 'moq') {
                    selectedMoq = rb.value;
                }
            });

            // Apply advanced filters (for demo, just filter products)
            filterProducts();

            // Close sidebar on mobile
            if (window.innerWidth < 992) {
                closeSidebar();
            }

            console.log('Filters applied:', { selectedIndustries, selectedCerts, selectedMoq });
        });
    }

    // ========================================
    // RESET FILTERS
    // ========================================
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            // Reset category
            activeCategory = 'all';
            categoryLinks.forEach(link => {
                link.classList.toggle('sidebar__link--active', link.dataset.category === 'all');
            });

            // Reset checkboxes
            checkboxes.forEach(cb => {
                cb.checked = false;
            });

            // Reset radio to default
            radioButtons.forEach(rb => {
                rb.checked = rb.value === 'all';
            });

            // Reset search
            if (productSearch) {
                productSearch.value = '';
            }

            // Reset sort
            if (sortSelect) {
                sortSelect.value = 'featured';
            }

            // Show all products
            productCards.forEach(card => {
                card.style.display = '';
            });

            if (productCount) {
                productCount.textContent = productCards.length;
            }

            showNoResults(false);
            triggerCardAnimations();
        });
    }

    // ========================================
    // CARD ANIMATION TRIGGERS
    // ========================================
    function triggerCardAnimations() {
        const visibleCards = Array.from(productCards).filter(card => card.style.display !== 'none');
        
        visibleCards.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = '';
            card.style.animationDelay = `${index * 50}ms`;
        });
    }

    // ========================================
    // PAGINATION (Demo)
    // ========================================
    const paginationPages = document.querySelectorAll('.pagination__page');
    const prevBtn = document.querySelector('.pagination__btn--prev');
    const nextBtn = document.querySelector('.pagination__btn--next');

    paginationPages.forEach(page => {
        page.addEventListener('click', () => {
            paginationPages.forEach(p => p.classList.remove('pagination__page--active'));
            page.classList.add('pagination__page--active');

            // Update prev/next button states
            const pageNum = parseInt(page.textContent);
            if (prevBtn) prevBtn.disabled = pageNum === 1;
            if (nextBtn) nextBtn.disabled = pageNum === 6;

            // Scroll to top of products
            window.scrollTo({
                top: document.querySelector('.products-archive').offsetTop - 100,
                behavior: 'smooth'
            });

            // Re-trigger animations (simulate page change)
            triggerCardAnimations();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const activePage = document.querySelector('.pagination__page--active');
            const prevPage = activePage.previousElementSibling;
            if (prevPage && prevPage.classList.contains('pagination__page')) {
                prevPage.click();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const activePage = document.querySelector('.pagination__page--active');
            const nextPage = activePage.nextElementSibling;
            if (nextPage && nextPage.classList.contains('pagination__page')) {
                nextPage.click();
            }
        });
    }

    // ========================================
    // RESPONSIVE SIDEBAR HANDLING
    // ========================================
    function handleResize() {
        if (window.innerWidth >= 992) {
            closeSidebar();
        }
    }

    window.addEventListener('resize', debounce(handleResize, 250));

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // ========================================
    // INITIALIZE
    // ========================================
    function init() {
        // Set initial product count
        if (productCount) {
            productCount.textContent = productCards.length;
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
