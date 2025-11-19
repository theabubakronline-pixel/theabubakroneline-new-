/**
 * Contact Page JavaScript
 * Handles form submission and validation
 */

(function() {
    'use strict';

    const contactForm = document.getElementById('contactPageForm');
    
    if (!contactForm) {
        return;
    }

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.contact-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Get form data
        const formData = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            phone: document.getElementById('contactPhone').value.trim(),
            company: document.getElementById('contactCompany').value.trim(),
            project: document.getElementById('contactProject').value.trim()
        };

        // Validate required fields
        if (!formData.name || !formData.email || !formData.project) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<span style="opacity: 0;">Request Consultation</span>';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Store form data (in a real app, send to server)
            console.log('Form submitted:', formData);
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showMessage('Thank you! I\'ll get back to you within 24-48 hours.', 'success');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
        }, 1500);
    });

    // Show message function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.contact-form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `contact-form-message contact-form-message-${type}`;
        messageEl.textContent = message;
        
        // Insert after form header
        const formHeader = contactForm.previousElementSibling;
        if (formHeader) {
            formHeader.insertAdjacentElement('afterend', messageEl);
        } else {
            contactForm.insertBefore(messageEl, contactForm.firstChild);
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.opacity = '0';
                messageEl.style.transform = 'translateY(-10px)';
                setTimeout(() => messageEl.remove(), 300);
            }
        }, 5000);
    }

    // Smooth scroll to form when clicking "Want to talk?" button
    document.querySelectorAll('a[href="#contact-form"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('contact-form');
            if (formSection) {
                const offset = 120; // Account for header height
                const elementPosition = formSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

















