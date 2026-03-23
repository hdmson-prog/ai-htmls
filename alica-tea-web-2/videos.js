// Video Library Page JavaScript
// Handles video display, filtering, and pagination

document.addEventListener('DOMContentLoaded', function() {
    
    // Sample video data - Replace with your actual YouTube video IDs
    const videosData = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Heritage Estate Overview',
            description: 'A cinematic tour of our 240-hectare estate in the Dimbula Valley, from terraced gardens to processing facility.',
            category: 'estate',
            duration: '5:42',
            date: '2024-01-15'
        },
        {
            id: 'jNQXAC9IVRw',
            title: 'Orthodox Processing Method',
            description: 'An intimate look at traditional tea processing: withering, rolling, oxidation, and firing.',
            category: 'process',
            duration: '8:15',
            date: '2024-01-10'
        },
        {
            id: 'y6120QOlsfU',
            title: 'Master Blender at Work',
            description: 'Our master blender shares insights into sensory evaluation, formulation, and maintaining century-old recipes.',
            category: 'people',
            duration: '6:30',
            date: '2024-01-05'
        },
        {
            id: 'kJQP7kiw5Fk',
            title: 'Carbon Neutrality Journey',
            description: 'Documenting our eight-year path to carbon neutrality: solar installation, biomass systems, and regenerative practices.',
            category: 'sustainability',
            duration: '7:20',
            date: '2023-12-20'
        },
        {
            id: '9bZkp7q19f0',
            title: 'Spring First Flush Harvest',
            description: 'Experience the precision and care of spring plucking season—two leaves and a bud, hand-selected at dawn.',
            category: 'estate',
            duration: '4:55',
            date: '2023-12-15'
        },
        {
            id: 'dQw4w9WgXcQ',
            title: 'Quality Control Laboratory',
            description: 'Inside our ISO-certified laboratory where every batch undergoes rigorous testing and sensory evaluation.',
            category: 'process',
            duration: '5:10',
            date: '2023-12-10'
        },
        {
            id: 'jNQXAC9IVRw',
            title: 'Regenerative Agriculture Practices',
            description: 'How we restore soil health, enhance biodiversity, and practice chemical-free cultivation across our estates.',
            category: 'sustainability',
            duration: '6:45',
            date: '2023-12-05'
        },
        {
            id: 'y6120QOlsfU',
            title: 'Tea Tasting Masterclass',
            description: 'Learn the art of professional tea tasting with our certified Q Grader and master taster.',
            category: 'people',
            duration: '9:30',
            date: '2023-11-28'
        },
        {
            id: 'kJQP7kiw5Fk',
            title: 'Heritage Factory Tour',
            description: 'Walk through our century-old processing facility, now upgraded with modern precision engineering.',
            category: 'estate',
            duration: '7:05',
            date: '2023-11-20'
        },
        {
            id: '9bZkp7q19f0',
            title: 'From Leaf to Cup',
            description: 'The complete journey of tea from our estate to your teacup, tracing every step of the supply chain.',
            category: 'process',
            duration: '10:15',
            date: '2023-11-15'
        },
        {
            id: 'dQw4w9WgXcQ',
            title: 'Women in Tea Industry',
            description: 'Celebrating the women who form the backbone of our operations—from pluckers to master blenders.',
            category: 'people',
            duration: '6:00',
            date: '2023-11-10'
        },
        {
            id: 'jNQXAC9IVRw',
            title: 'Biodiversity Conservation',
            description: 'Our commitment to preserving native flora and fauna within and around our tea estates.',
            category: 'sustainability',
            duration: '5:35',
            date: '2023-11-05'
        },
        {
            id: 'y6120QOlsfU',
            title: 'Monsoon Season Processing',
            description: 'How we adapt our processing techniques during the monsoon to maintain consistent quality.',
            category: 'process',
            duration: '6:20',
            date: '2023-10-28'
        },
        {
            id: 'kJQP7kiw5Fk',
            title: 'Estate Workers Community',
            description: 'A glimpse into the lives and stories of our estate workers and their families.',
            category: 'people',
            duration: '8:45',
            date: '2023-10-20'
        },
        {
            id: '9bZkp7q19f0',
            title: 'Organic Certification Process',
            description: 'The rigorous standards and practices that earned us international organic certification.',
            category: 'sustainability',
            duration: '7:10',
            date: '2023-10-15'
        }
    ];

    // Pagination settings
    const videosPerPage = 6;
    let currentPage = 1;
    let currentCategory = 'all';
    let filteredVideos = [...videosData];

    // DOM elements
    const videosGrid = document.getElementById('videosGrid');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const paginationPrev = document.getElementById('paginationPrev');
    const paginationNext = document.getElementById('paginationNext');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Initialize
    renderVideos();
    renderPagination();
    updatePaginationButtons();

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter videos
            currentCategory = this.getAttribute('data-category');
            if (currentCategory === 'all') {
                filteredVideos = [...videosData];
            } else {
                filteredVideos = videosData.filter(video => video.category === currentCategory);
            }

            // Reset to page 1 and re-render
            currentPage = 1;
            renderVideos();
            renderPagination();
            updatePaginationButtons();
            
            // Scroll to top of videos section
            videosGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Pagination button handlers
    if (paginationPrev) {
        paginationPrev.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderVideos();
                updatePaginationButtons();
                scrollToTop();
            }
        });
    }

    if (paginationNext) {
        paginationNext.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderVideos();
                updatePaginationButtons();
                scrollToTop();
            }
        });
    }

    // Render videos for current page
    function renderVideos() {
        const startIndex = (currentPage - 1) * videosPerPage;
        const endIndex = startIndex + videosPerPage;
        const videosToShow = filteredVideos.slice(startIndex, endIndex);

        if (videosToShow.length === 0) {
            videosGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🎬</div>
                    <h3 class="empty-state-title">No videos found</h3>
                    <p class="empty-state-text">Try selecting a different category</p>
                </div>
            `;
            return;
        }

        videosGrid.innerHTML = videosToShow.map(video => {
            const categoryName = getCategoryName(video.category);
            const formattedDate = formatDate(video.date);
            
            return `
                <div class="video-card">
                    <div class="video-thumbnail">
                        <iframe 
                            src="https://www.youtube.com/embed/${video.id}" 
                            title="${video.title}"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="video-details">
                        <span class="video-category">${categoryName}</span>
                        <h3 class="video-card-title">${video.title}</h3>
                        <p class="video-description">${video.description}</p>
                        <div class="video-meta">
                            <div class="video-duration">
                                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14A6 6 0 108 2a6 6 0 000 12z" stroke="currentColor" stroke-width="1.5"/>
                                    <path d="M8 4.5v3.75l2.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                <span>${video.duration}</span>
                            </div>
                            <div class="video-date">
                                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
                                    <path d="M2 6h12M5 1v2m6-2v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                <span>${formattedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render pagination numbers
    function renderPagination() {
        const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
        
        if (totalPages <= 1) {
            paginationNumbers.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                paginationHTML += createPageButton(i);
            }
        } else {
            // Show first page
            paginationHTML += createPageButton(1);

            if (currentPage > 3) {
                paginationHTML += '<span class="pagination-ellipsis">...</span>';
            }

            // Show pages around current page
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                paginationHTML += createPageButton(i);
            }

            if (currentPage < totalPages - 2) {
                paginationHTML += '<span class="pagination-ellipsis">...</span>';
            }

            // Show last page
            paginationHTML += createPageButton(totalPages);
        }

        paginationNumbers.innerHTML = paginationHTML;

        // Add click handlers to page numbers
        const pageButtons = paginationNumbers.querySelectorAll('.pagination-number');
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentPage = parseInt(this.getAttribute('data-page'));
                renderVideos();
                updatePaginationButtons();
                scrollToTop();
            });
        });
    }

    // Create page button HTML
    function createPageButton(pageNum) {
        const activeClass = pageNum === currentPage ? ' active' : '';
        return `<button class="pagination-number${activeClass}" data-page="${pageNum}">${pageNum}</button>`;
    }

    // Update prev/next button states
    function updatePaginationButtons() {
        const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
        
        if (paginationPrev) {
            paginationPrev.disabled = currentPage === 1;
        }
        
        if (paginationNext) {
            paginationNext.disabled = currentPage === totalPages;
        }

        // Update page numbers active state
        const pageButtons = paginationNumbers.querySelectorAll('.pagination-number');
        pageButtons.forEach(button => {
            const pageNum = parseInt(button.getAttribute('data-page'));
            button.classList.toggle('active', pageNum === currentPage);
        });
    }

    // Helper function to get category display name
    function getCategoryName(category) {
        const names = {
            'estate': 'Estate Tours',
            'process': 'Processing',
            'people': 'People & Craft',
            'sustainability': 'Sustainability'
        };
        return names[category] || category;
    }

    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Scroll to top of videos section
    function scrollToTop() {
        const videosSection = document.querySelector('.videos-section');
        if (videosSection) {
            const offset = 100; // Account for fixed navigation
            const elementPosition = videosSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

});
