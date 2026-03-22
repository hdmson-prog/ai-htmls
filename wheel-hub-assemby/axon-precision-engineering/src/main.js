/**
 * AXON Precision Engineering
 * Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();
    
    window.addEventListener('scroll', revealOnScroll);

    // 2. Header Scroll Effect
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }
    });

    // 3. Mobile Menu Toggle (Simplified)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // In a real app, we'd toggle a class on the nav
            // For this demo, we'll just show an alert or toggle visibility
            alert('Mobile navigation menu would open here.');
        });
    }

    // 4. Form Submission Handling
    const inquiryForm = document.getElementById('inquiry-form');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = inquiryForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'PROCESSING...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your inquiry. A technical representative will contact you shortly.');
                inquiryForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // 5. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
