/**
 * NEXUS INDUSTRIAL - Product Detail Page
 * JavaScript Module
 */

(function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const tabButtons = document.querySelectorAll('.tabs__btn');
    const tabPanels = document.querySelectorAll('.tabs__panel');
    const galleryThumbs = document.querySelectorAll('.product-gallery__thumb');
    const mainImage = document.getElementById('main-image');
    const inquiryForm = document.getElementById('product-inquiry-form');
    const fileInput = document.getElementById('inquiry-files');
    const fileLabel = document.querySelector('.file-upload__label span');

    // ========================================
    // TABS FUNCTIONALITY
    // ========================================
    function initTabs() {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                const targetPanel = document.getElementById(tabId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // ========================================
    // GALLERY FUNCTIONALITY
    // ========================================
    function initGallery() {
        galleryThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                // Remove active class from all thumbs
                galleryThumbs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumb
                thumb.classList.add('active');
                
                // Update main image (in a real implementation, this would swap images)
                if (mainImage) {
                    mainImage.innerHTML = thumb.innerHTML;
                    const svg = mainImage.querySelector('svg');
                    if (svg) {
                        svg.style.width = '120px';
                        svg.style.height = '120px';
                        svg.style.color = 'var(--color-text-light)';
                        svg.style.opacity = '0.4';
                    }
                }
            });
        });
    }

    // ========================================
    // FILE UPLOAD
    // ========================================
    function initFileUpload() {
        if (fileInput && fileLabel) {
            fileInput.addEventListener('change', (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    if (files.length === 1) {
                        fileLabel.textContent = files[0].name;
                    } else {
                        fileLabel.textContent = `${files.length} files selected`;
                    }
                } else {
                    fileLabel.textContent = 'Drop files here or click to upload';
                }
            });
        }
    }

    // ========================================
    // INQUIRY FORM HANDLING
    // ========================================
    function initInquiryForm() {
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(inquiryForm);
                const data = Object.fromEntries(formData.entries());
                
                // Validate required fields
                let isValid = true;
                const requiredFields = ['name', 'company', 'email', 'quantity'];
                
                requiredFields.forEach(field => {
                    const input = inquiryForm.querySelector(`[name="${field}"]`);
                    if (input && !input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#e53e3e';
                    } else if (input) {
                        input.style.borderColor = '';
                    }
                });
                
                // Email validation
                const emailInput = inquiryForm.querySelector('[name="email"]');
                if (emailInput) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(emailInput.value)) {
                        isValid = false;
                        emailInput.style.borderColor = '#e53e3e';
                    }
                }
                
                if (isValid) {
                    const submitBtn = inquiryForm.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Submitting...';
                    
                    // Simulate API call
                    setTimeout(() => {
                        submitBtn.textContent = 'Inquiry Submitted!';
                        submitBtn.style.backgroundColor = '#38a169';
                        
                        // Reset form
                        setTimeout(() => {
                            inquiryForm.reset();
                            submitBtn.disabled = false;
                            submitBtn.textContent = originalText;
                            submitBtn.style.backgroundColor = '';
                            if (fileLabel) {
                                fileLabel.textContent = 'Drop files here or click to upload';
                            }
                        }, 2000);
                    }, 1500);
                    
                    console.log('Inquiry submitted:', data);
                }
            });
        }
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ========================================
    // DOWNLOAD SPEC BUTTON
    // ========================================
    function initDownloadButton() {
        const downloadBtn = document.getElementById('download-spec');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                // In a real implementation, this would trigger a file download
                alert('Downloading product specifications...\n\nIn a live environment, this would download the PDF datasheet.');
            });
        }
    }

    // ========================================
    // ZOOM FUNCTIONALITY (Placeholder)
    // ========================================
    function initZoom() {
        const zoomBtn = document.querySelector('.product-gallery__zoom');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', () => {
                // In a real implementation, this would open a lightbox/modal
                alert('Image zoom feature\n\nIn a live environment, this would open a lightbox with a larger image.');
            });
        }
    }

    // ========================================
    // INITIALIZE
    // ========================================
    function init() {
        initTabs();
        initGallery();
        initFileUpload();
        initInquiryForm();
        initSmoothScroll();
        initDownloadButton();
        initZoom();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
