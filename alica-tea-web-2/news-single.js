// News Single Article Page
// Share functionality and reading enhancements

document.addEventListener('DOMContentLoaded', function() {
    
    // Share buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const url = window.location.href;
            const title = document.querySelector('.article-title').textContent;
            
            // Determine which share button was clicked based on index or aria-label
            const label = this.getAttribute('aria-label');
            
            if (label.includes('LinkedIn')) {
                shareOnLinkedIn(url, title);
            } else if (label.includes('Twitter')) {
                shareOnTwitter(url, title);
            } else if (label.includes('Copy')) {
                copyToClipboard(url);
            }
        });
    });
    
    // Share on LinkedIn
    function shareOnLinkedIn(url, title) {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedInUrl, '_blank', 'width=600,height=400');
    }
    
    // Share on Twitter
    function shareOnTwitter(url, title) {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    }
    
    // Copy link to clipboard
    function copyToClipboard(url) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(function() {
                showCopyFeedback();
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                showCopyFeedback();
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
            
            document.body.removeChild(textArea);
        }
    }
    
    // Show copy feedback
    function showCopyFeedback() {
        const copyBtn = document.querySelector('.share-btn[aria-label="Copy link"]');
        const originalHTML = copyBtn.innerHTML;
        
        // Change icon to checkmark
        copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 6L7.5 14.5L4 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        copyBtn.style.backgroundColor = 'var(--color-tea-green)';
        copyBtn.style.color = 'var(--color-off-white)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.backgroundColor = '';
            copyBtn.style.color = '';
        }, 2000);
    }
    
    // Reading progress indicator
    const article = document.querySelector('.article-content');
    
    if (article) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background-color: var(--color-brass);
            z-index: 9999;
            transition: width 100ms ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            const start = articleTop - windowHeight / 2;
            const end = articleTop + articleHeight - windowHeight / 2;
            
            if (scrollTop < start) {
                progressBar.style.width = '0%';
            } else if (scrollTop > end) {
                progressBar.style.width = '100%';
            } else {
                const progress = ((scrollTop - start) / (end - start)) * 100;
                progressBar.style.width = progress + '%';
            }
        });
    }
    
    // Smooth scroll for related articles
    const relatedArticles = document.querySelectorAll('.related-grid .news-item');
    relatedArticles.forEach(article => {
        article.style.cursor = 'pointer';
        article.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                // Simulate click on article (in real implementation, would navigate to article page)
                console.log('Navigate to article');
            }
        });
    });
    
    // Estimated reading time calculation (optional enhancement)
    function calculateReadingTime() {
        const content = document.querySelector('.article-content');
        if (!content) return;
        
        const text = content.textContent;
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / wordsPerMinute);
        
        const readTimeElement = document.querySelector('.article-read-time');
        if (readTimeElement) {
            // Already set in HTML, but could be calculated dynamically
            console.log(`Calculated reading time: ${readingTime} minutes`);
        }
    }
    
    calculateReadingTime();
    
    // Print functionality
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });
    
    // Lazy load images with fade-in
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 600ms ease';
                
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add animation to stats on scroll
    const statsSection = document.querySelector('.article-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateStats(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    function animateStats(statsElement) {
        const statNumbers = statsElement.querySelectorAll('.stat-number');
        
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '0';
                stat.style.transform = 'translateY(10px)';
                stat.style.transition = 'opacity 600ms ease, transform 600ms ease';
                
                setTimeout(() => {
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, 50);
            }, index * 150);
        });
    }
});
