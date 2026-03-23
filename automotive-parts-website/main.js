// ============================================
// PRECISION AUTOMOTIVE - MAIN JAVASCRIPT
// ============================================

// ============================================
// NAVIGATION
// ============================================

const initNavigation = () => {
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect for navigation
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });
};

// ============================================
// SEARCH BAR
// ============================================

const initSearchBar = () => {
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (!searchToggle || !searchBar || !searchClose || !searchInput) return;
    
    // Toggle search bar
    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBar.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });
    
    // Close search bar
    searchClose.addEventListener('click', () => {
        searchBar.classList.remove('active');
        searchInput.value = '';
    });
    
    // Close search bar with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            searchInput.value = '';
        }
    });
    
    // Close search bar when clicking outside
    document.addEventListener('click', (e) => {
        if (searchBar.classList.contains('active') && !searchBar.contains(e.target) && e.target !== searchToggle) {
            searchBar.classList.remove('active');
            searchInput.value = '';
        }
    });
    
    // Prevent search bar from closing when clicking inside
    searchBar.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length > 0) {
            performSearch(query);
        } else {
            // Show default suggestions
            showDefaultSuggestions();
        }
    });
    
    // Close search when clicking on suggestion
    const suggestionItems = searchSuggestions.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
        item.addEventListener('click', () => {
            searchBar.classList.remove('active');
            searchInput.value = '';
        });
    });
};

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const getHomePrefix = () => {
    const path = window.location.pathname.toLowerCase();
    const isHome = path.endsWith('/') || path.endsWith('/index.html') || path === '';
    return isHome ? '' : 'index.html';
};

const withHome = (hash) => `${getHomePrefix()}${hash}`;

const performSearch = (query) => {
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    // Define searchable content
    const searchableContent = [
        { title: 'Powertrain Components', url: withHome('#products'), category: 'Products' },
        { title: 'EV Battery Enclosures', url: withHome('#products'), category: 'Products' },
        { title: 'Chassis & Suspension', url: withHome('#products'), category: 'Products' },
        { title: 'Steering Systems', url: withHome('#products'), category: 'Products' },
        { title: 'Brake Components', url: withHome('#products'), category: 'Products' },
        { title: 'Electric Motor Housings', url: withHome('#products'), category: 'Products' },
        { title: '5-Axis CNC Machining', url: withHome('#capabilities'), category: 'Capabilities' },
        { title: 'High-Pressure Die Casting', url: withHome('#capabilities'), category: 'Capabilities' },
        { title: 'Precision Forging', url: withHome('#capabilities'), category: 'Capabilities' },
        { title: 'Automated Assembly Lines', url: withHome('#capabilities'), category: 'Capabilities' },
        { title: 'Passenger Vehicles', url: withHome('#applications'), category: 'Applications' },
        { title: 'Electric Vehicles', url: withHome('#applications'), category: 'Applications' },
        { title: 'Commercial Vehicles', url: withHome('#applications'), category: 'Applications' },
        { title: 'Smart Mobility', url: withHome('#applications'), category: 'Applications' },
        { title: 'IATF 16949:2016 Certification', url: withHome('#quality'), category: 'Quality' },
        { title: 'ISO 14001 Compliance', url: withHome('#quality'), category: 'Quality' },
        { title: 'Latest Company News', url: 'news.html', category: 'News' },
        { title: 'Press Releases', url: 'news.html', category: 'News' },
        { title: 'Company Timeline', url: 'timeline.html', category: 'Company' },
        { title: 'Image Showcase', url: 'images.html', category: 'Company' },
        { title: 'Video Library', url: 'videos.html', category: 'Company' },
        { title: 'About Precision Automotive', url: 'about.html', category: 'Company' },
        { title: 'Contact & OEM RFQ', url: 'contact.html', category: 'Contact' }
    ];
    
    // Filter results
    const results = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    
    // Display results
    if (results.length > 0) {
        let html = '<div class="suggestions-section"><h4 class="suggestions-title">Search Results</h4><ul class="suggestions-list">';
        
        results.slice(0, 8).forEach(result => {
            html += `<li><a href="${result.url}" class="suggestion-item">
                <strong>${result.title}</strong> 
                <span style="color: var(--color-silver); font-size: 0.875rem; margin-left: 0.5rem;">in ${result.category}</span>
            </a></li>`;
        });
        
        html += '</ul></div>';
        searchSuggestions.innerHTML = html;
        
        // Re-attach click handlers
        attachSuggestionHandlers();
    } else {
        searchSuggestions.innerHTML = '<div class="suggestions-section"><p style="color: var(--color-silver); text-align: center; padding: var(--spacing-md);">No results found for "' + query + '"</p></div>';
    }
};

const showDefaultSuggestions = () => {
    const searchSuggestions = document.getElementById('searchSuggestions');
    searchSuggestions.innerHTML = `
        <div class="suggestions-section">
            <h4 class="suggestions-title">Quick Links</h4>
            <ul class="suggestions-list">
                <li><a href="${withHome('#products')}" class="suggestion-item">Powertrain Components</a></li>
                <li><a href="${withHome('#products')}" class="suggestion-item">EV Battery Enclosures</a></li>
                <li><a href="${withHome('#capabilities')}" class="suggestion-item">CNC Machining</a></li>
                <li><a href="${withHome('#quality')}" class="suggestion-item">Quality Certifications</a></li>
                <li><a href="news.html" class="suggestion-item">Latest News</a></li>
            </ul>
        </div>
    `;
    attachSuggestionHandlers();
};

const attachSuggestionHandlers = () => {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    
    suggestionItems.forEach(item => {
        item.addEventListener('click', () => {
            searchBar.classList.remove('active');
            searchInput.value = '';
        });
    });
};

// ============================================
// SMOOTH SCROLL
// ============================================

const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip empty hash links
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
};

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

const initParallax = () => {
    const hero = document.getElementById('hero');
    
    if (!hero) return;
    
    const heroImage = hero.querySelector('.hero-image-placeholder');
    
    if (!heroImage) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled <= window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
};

// ============================================
// FORM HANDLING
// ============================================

const initFormHandling = () => {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'company', 'email', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!data[field] || data[field].trim() === '') {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = 'rgba(255,255,255,0.1)';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            const emailInput = contactForm.querySelector('[name="email"]');
            emailInput.style.borderColor = '#ef4444';
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your inquiry. Our team will contact you within 24 hours.', 'success');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
        }, 1000);
        
        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted:', data);
    });
    
    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && input.value.trim() === '') {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = 'rgba(255,255,255,0.1)';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = '#2563eb';
        });
    });
};

// ============================================
// NOTIFICATION SYSTEM
// ============================================

const showNotification = (message, type = 'success') => {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: '#ffffff',
        borderRadius: '2px',
        fontWeight: '600',
        fontSize: '0.938rem',
        zIndex: '10000',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px'
    });
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Append to body
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
};

// ============================================
// PRODUCT CARD HOVER EFFECTS
// ============================================

const initProductHoverEffects = () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });
};

// ============================================
// NEWS CARD HOVER EFFECTS
// ============================================

const initNewsHoverEffects = () => {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const newsImage = card.querySelector('.image-placeholder');
            if (newsImage) {
                newsImage.style.transform = 'scale(1.05)';
                newsImage.style.transition = 'transform 0.6s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const newsImage = card.querySelector('.image-placeholder');
            if (newsImage) {
                newsImage.style.transform = 'scale(1)';
            }
        });
    });
};

// ============================================
// STATS COUNTER ANIMATION
// ============================================

const initStatsCounter = () => {
    const statNumbers = document.querySelectorAll('.stat-number, .global-stat-number');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        const isNumber = /^\d+$/.test(target);
        
        if (!isNumber) return;
        
        const duration = 2000;
        const steps = 60;
        const increment = parseInt(target) / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= parseInt(target)) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toString();
            }
        }, duration / steps);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
};

// ============================================
// LAZY LOADING FOR IMAGE PLACEHOLDERS
// ============================================

const initLazyLoading = () => {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.style.opacity = '0';
        placeholder.style.transition = 'opacity 0.6s ease';
        observer.observe(placeholder);
    });
};

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================

const initActiveNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    const highlightNavigation = () => {
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = '#2563eb';
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavigation);
};

// ============================================
// SCROLL TO TOP FUNCTIONALITY
// ============================================

const initScrollToTop = () => {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    Object.assign(scrollBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '2px',
        fontSize: '1.5rem',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: '999',
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.backgroundColor = '#1e40af';
        scrollBtn.style.transform = 'translateY(-3px)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.backgroundColor = '#2563eb';
        scrollBtn.style.transform = 'translateY(0)';
    });
};

// ============================================
// PRODUCT ARCHIVE FUNCTIONALITY
// ============================================

const initProductArchive = () => {
    // Check if we're on the products page
    if (!document.getElementById('productsGrid')) return;
    
    const productsGrid = document.getElementById('productsGrid');
    const viewButtons = document.querySelectorAll('.view-btn');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarContent = document.querySelector('.sidebar-content');
    const resetFilters = document.getElementById('resetFilters');
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const sortSelect = document.getElementById('sortSelect');
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const paginationPrev = document.querySelector('.pagination-prev');
    const paginationNext = document.querySelector('.pagination-next');
    
    // View switcher (Grid/List)
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Toggle grid/list view
            if (view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });
    
    // Sidebar toggle for mobile
    if (sidebarToggle && sidebarContent) {
        sidebarToggle.addEventListener('click', () => {
            sidebarContent.classList.toggle('active');
        });
    }
    
    // Filter functionality
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filterProducts();
        });
    });
    
    // Reset filters
    if (resetFilters) {
        resetFilters.addEventListener('click', () => {
            filterCheckboxes.forEach(checkbox => {
                if (checkbox.value === 'all') {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
            });
            filterProducts();
        });
    }
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortProducts(sortSelect.value);
        });
    }
    
    // Pagination
    paginationNumbers.forEach(button => {
        button.addEventListener('click', () => {
            paginationNumbers.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Scroll to top of products
            productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update pagination buttons
            updatePaginationButtons();
        });
    });
    
    if (paginationPrev) {
        paginationPrev.addEventListener('click', () => {
            const activePage = document.querySelector('.pagination-number.active');
            const prevPage = activePage.previousElementSibling;
            if (prevPage && prevPage.classList.contains('pagination-number')) {
                prevPage.click();
            }
        });
    }
    
    if (paginationNext) {
        paginationNext.addEventListener('click', () => {
            const activePage = document.querySelector('.pagination-number.active');
            const nextPage = activePage.nextElementSibling;
            if (nextPage && nextPage.classList.contains('pagination-number')) {
                nextPage.click();
            }
        });
    }
};

const filterProducts = () => {
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
    const applicationCheckboxes = document.querySelectorAll('input[name="application"]:checked');
    const materialCheckboxes = document.querySelectorAll('input[name="material"]:checked');
    const productCards = document.querySelectorAll('.product-archive-card');
    
    const selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
    const selectedApplications = Array.from(applicationCheckboxes).map(cb => cb.value);
    const selectedMaterials = Array.from(materialCheckboxes).map(cb => cb.value);
    
    let visibleCount = 0;
    
    productCards.forEach(card => {
        let showCard = true;
        
        // Check if "All Products" is selected
        if (!selectedCategories.includes('all')) {
            const cardCategory = card.getAttribute('data-category');
            if (selectedCategories.length > 0 && !selectedCategories.includes(cardCategory)) {
                showCard = false;
            }
        }
        
        // Filter by application
        if (selectedApplications.length > 0) {
            const cardApplications = card.getAttribute('data-application')?.split(',') || [];
            const hasMatchingApplication = selectedApplications.some(app => 
                cardApplications.includes(app)
            );
            if (!hasMatchingApplication) {
                showCard = false;
            }
        }
        
        // Show or hide card
        if (showCard) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update results count
    updateResultsCount(visibleCount);
};

const sortProducts = (sortBy) => {
    const productsGrid = document.getElementById('productsGrid');
    const productCards = Array.from(document.querySelectorAll('.product-archive-card'));
    
    productCards.sort((a, b) => {
        const titleA = a.querySelector('.product-archive-title').textContent;
        const titleB = b.querySelector('.product-archive-title').textContent;
        
        switch (sortBy) {
            case 'name-asc':
                return titleA.localeCompare(titleB);
            case 'name-desc':
                return titleB.localeCompare(titleA);
            default:
                return 0;
        }
    });
    
    // Re-append sorted cards
    productCards.forEach(card => {
        productsGrid.appendChild(card);
    });
};

const updateResultsCount = (count) => {
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        const total = document.querySelectorAll('.product-archive-card').length;
        resultsCount.innerHTML = `Showing <strong>1-${count}</strong> of <strong>${total}</strong> products`;
    }
};

const updatePaginationButtons = () => {
    const activePage = document.querySelector('.pagination-number.active');
    const paginationPrev = document.querySelector('.pagination-prev');
    const paginationNext = document.querySelector('.pagination-next');
    
    if (activePage && paginationPrev && paginationNext) {
        // Enable/disable prev button
        if (!activePage.previousElementSibling || !activePage.previousElementSibling.classList.contains('pagination-number')) {
            paginationPrev.disabled = true;
        } else {
            paginationPrev.disabled = false;
        }
        
        // Enable/disable next button
        if (!activePage.nextElementSibling || activePage.nextElementSibling.classList.contains('pagination-dots')) {
            paginationNext.disabled = false; // Keep enabled for demo
        } else {
            paginationNext.disabled = false;
        }
    }
};

// ============================================
// GALLERY LIGHTBOX
// ============================================

const initGalleryLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryButtons = document.querySelectorAll('.gallery-open');

    if (!lightbox || galleryButtons.length === 0) return;

    const openLightbox = (button) => {
        const card = button.closest('.gallery-card');
        const title = card?.querySelector('h3')?.textContent?.trim() || 'Company image';
        const description = card?.querySelector('p')?.textContent?.trim() || '';

        lightboxCaption.textContent = description ? `${title} — ${description}` : title;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    galleryButtons.forEach((button) => {
        button.addEventListener('click', () => openLightbox(button));
    });

    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
};

// ============================================
// PRODUCT GALLERY
// ============================================

const initProductGallery = () => {
    const thumbs = document.querySelectorAll('#productGalleryThumbs .product-thumb');
    const caption = document.getElementById('productGalleryCaption');

    if (thumbs.length === 0 || !caption) return;

    thumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            thumbs.forEach((item) => item.classList.remove('active'));
            thumb.classList.add('active');

            const nextCaption = thumb.getAttribute('data-caption');
            if (nextCaption) {
                caption.textContent = nextCaption;
            }
        });
    });
};

// ============================================
// INITIALIZE ALL FEATURES
// ============================================

const init = () => {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Initialize all features
    initNavigation();
    initSearchBar();
    initSmoothScroll();
    initScrollReveal();
    initParallax();
    initFormHandling();
    initProductHoverEffects();
    initNewsHoverEffects();
    initStatsCounter();
    initLazyLoading();
    initActiveNavigation();
    initScrollToTop();
    initProductArchive();
    initGalleryLightbox();
    initProductGallery();
    
    console.log('Precision Automotive website initialized successfully.');
};

// Start initialization
init();
