(function() {
    'use strict';

    const searchToggle = document.querySelector('[data-search-toggle]');
    const searchBar = document.querySelector('[data-search-bar]');
    const mobileToggle = document.querySelector('[data-mobile-toggle]');
    const header = document.querySelector('.header');
    let isSearchOpen = false;
    let isMobileMenuOpen = false;

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function() {
            isSearchOpen = !isSearchOpen;
            searchBar.classList.toggle('active', isSearchOpen);
            if (isSearchOpen) {
                searchBar.querySelector('input').focus();
            }
        });
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            isMobileMenuOpen = !isMobileMenuOpen;
            this.classList.toggle('active', isMobileMenuOpen);
            document.body.classList.toggle('mobile-menu-open', isMobileMenuOpen);
        });
    }

    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        observer.observe(el);
    });

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (isSearchOpen) {
                isSearchOpen = false;
                searchBar.classList.remove('active');
            }
            if (isMobileMenuOpen) {
                isMobileMenuOpen = false;
                mobileToggle.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            }
        }
    });
})();
