(function() {
    'use strict';

    const filterToggle = document.getElementById('filter-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');
    const categoryItems = document.querySelectorAll('.category-item.has-submenu');

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        
        if (!document.querySelector('.catalog-sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'catalog-sidebar-overlay';
            overlay.addEventListener('click', closeSidebar);
            document.body.appendChild(overlay);
        }
        
        document.querySelector('.catalog-sidebar-overlay').classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        const overlay = document.querySelector('.catalog-sidebar-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    function setActiveView(view) {
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        if (view === 'list') {
            productsGrid.classList.add('list-view');
        } else {
            productsGrid.classList.remove('list-view');
        }
        
        localStorage.setItem('productView', view);
    }

    function toggleSubmenu(e) {
        e.preventDefault();
        const parent = this.closest('.category-item');
        parent.classList.toggle('open');
    }

    function handleCategoryClick(e) {
        if (!e.target.closest('.has-submenu')) {
            categoryItems.forEach(item => item.classList.remove('active'));
            
            const clickedItem = this.closest('.category-item');
            if (clickedItem) {
                clickedItem.classList.add('active');
            }
            
            document.querySelectorAll('.category-link .category-name').forEach(name => {
                name.textContent = this.querySelector('.category-name').textContent;
            });
        }
    }

    function updateResultsCount(count) {
        const resultsCount = document.querySelector('.results-count strong');
        if (resultsCount) {
            resultsCount.textContent = count;
        }
    }

    function animateProducts() {
        const cards = productsGrid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    function init() {
        if (filterToggle) {
            filterToggle.addEventListener('click', toggleSidebar);
        }
        
        if (sidebarClose) {
            sidebarClose.addEventListener('click', closeSidebar);
        }
        
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => setActiveView(btn.dataset.view));
        });
        
        categoryItems.forEach(item => {
            const link = item.querySelector('.category-link');
            link.addEventListener('click', toggleSubmenu);
        });
        
        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', handleCategoryClick);
        });
        
        const savedView = localStorage.getItem('productView');
        if (savedView) {
            setActiveView(savedView);
        }
        
        animateProducts();
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                closeSidebar();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
