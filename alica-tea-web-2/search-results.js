// Search Results Page
// Filtering and interaction functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const filterChips = document.querySelectorAll('.filter-chip');
    const resultItems = document.querySelectorAll('.result-item');
    const searchInput = document.getElementById('searchQuery');
    const searchBtn = document.querySelector('.search-btn-inline');
    
    // Filter functionality
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const filterType = this.dataset.type;
            
            // Update active state
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Filter results
            filterResults(filterType);
        });
    });
    
    function filterResults(type) {
        let visibleCount = 0;
        
        resultItems.forEach(item => {
            const itemType = item.dataset.type;
            
            if (type === 'all' || itemType === type) {
                item.style.display = 'grid';
                // Add staggered animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 400ms ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, visibleCount * 50);
                
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Scroll to results
        setTimeout(() => {
            const resultsSection = document.querySelector('.search-results-section');
            const offset = 150;
            window.scrollTo({
                top: resultsSection.offsetTop - offset,
                behavior: 'smooth'
            });
        }, 100);
    }
    
    // Search input handling
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            // In a real implementation, this would submit to search API
            console.log('Searching for:', query);
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    }
    
    // Highlight search terms in results
    function highlightSearchTerms() {
        const searchTerm = document.getElementById('searchTerm');
        if (searchTerm) {
            const term = searchTerm.textContent;
            console.log('Search term:', term);
            // Search term highlighting is already done with <mark> tags in HTML
        }
    }
    
    highlightSearchTerms();
    
    // Get search query from URL parameter (if exists)
    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get('q');
    
    if (urlQuery && searchInput) {
        searchInput.value = urlQuery;
        const searchTermDisplay = document.getElementById('searchTerm');
        if (searchTermDisplay) {
            searchTermDisplay.textContent = urlQuery;
        }
    }
});
