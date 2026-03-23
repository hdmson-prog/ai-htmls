/**
 * Form Validation & Submission Module
 * Contact form and newsletter handling
 */

(function() {
  'use strict';

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate field
    function validateField(field) {
      const formGroup = field.closest('.form-group');
      const fieldValue = field.value.trim();
      let isValid = true;
      
      // Check if required
      if (field.hasAttribute('required') && !fieldValue) {
        isValid = false;
      }
      
      // Email validation
      if (field.type === 'email' && fieldValue && !emailRegex.test(fieldValue)) {
        isValid = false;
      }
      
      // Update UI
      if (isValid) {
        formGroup.classList.remove('has-error');
      } else {
        formGroup.classList.add('has-error');
      }
      
      return isValid;
    }
    
    // Validate entire form
    function validateForm() {
      const fields = contactForm.querySelectorAll('[required]');
      let isValid = true;
      
      fields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      return isValid;
    }
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea, .form-select');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value.trim()) {
          validateField(input);
        }
      });
      
      input.addEventListener('input', () => {
        const formGroup = input.closest('.form-group');
        if (formGroup.classList.contains('has-error')) {
          validateField(input);
        }
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate
      if (!validateForm()) {
        // Scroll to first error
        const firstError = contactForm.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Get submit button
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      
      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      try {
        // TODO: Replace with actual API endpoint
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.backgroundColor = 'var(--color-success)';
        
        // Reset form
        contactForm.reset();
        
        // Show success message (you can replace with a modal)
        alert('Thank you for your message! We\'ll get back to you soon.');
        
        // Reset button after delay
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
        
      } catch (error) {
        console.error('Form submission error:', error);
        
        // Error state
        submitBtn.textContent = '✗ Error - Try Again';
        submitBtn.style.backgroundColor = 'var(--color-error)';
        
        // Reset button after delay
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
  
  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const submitBtn = newsletterForm.querySelector('.btn-newsletter');
      const email = emailInput.value.trim();
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        emailInput.style.borderColor = 'var(--color-error)';
        return;
      }
      
      emailInput.style.borderColor = '';
      
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = '...';
      
      try {
        // TODO: Replace with actual API endpoint
        // await fetch('/api/newsletter', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email })
        // });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Success
        submitBtn.textContent = '✓ Subscribed!';
        newsletterForm.reset();
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
        
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        
        submitBtn.textContent = '✗ Error';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
  
})();
