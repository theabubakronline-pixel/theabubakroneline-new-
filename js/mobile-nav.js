/**
 * Mobile Navigation Menu Controller
 * Handles hamburger menu toggle and smooth animations
 */

(function() {
    'use strict';

    // Get DOM elements
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileCTAButton = document.querySelector('.mobile-cta-button');
    
    // State
    let isMenuOpen = false;

    /**
     * Toggle mobile menu open/closed
     */
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    function openMobileMenu() {
        // Add active class to toggle button (for X transformation)
        mobileMenuToggle.classList.add('active');
        
        // Add active class to overlay (for dropdown animation)
        mobileNavOverlay.classList.add('active');
        
        // Update ARIA attributes
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        mobileNavOverlay.setAttribute('aria-hidden', 'false');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        
        // Add event listener to close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 100);
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        // Remove active class from toggle button (back to hamburger)
        mobileMenuToggle.classList.remove('active');
        
        // Remove active class from overlay (slide up animation)
        mobileNavOverlay.classList.remove('active');
        
        // Update ARIA attributes
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileNavOverlay.setAttribute('aria-hidden', 'true');
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        
        // Remove click outside listener
        document.removeEventListener('click', handleClickOutside);
        
        isMenuOpen = false;
    }

    /**
     * Handle clicks outside the menu to close it
     */
    function handleClickOutside(event) {
        // Don't close if clicking inside the menu or on the toggle button
        if (!mobileNavOverlay.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    }

    /**
     * Handle navigation link clicks
     */
    function handleNavLinkClick(event) {
        // Close menu after clicking a link
        closeMobileMenu();
        
        // Smooth scroll to section
        const targetId = event.currentTarget.getAttribute('href');
        if (targetId.startsWith('#')) {
            event.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300); // Wait for menu close animation
            }
        }
    }

    /**
     * Handle keyboard navigation (ESC to close)
     */
    function handleKeyPress(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    }

    /**
     * Initialize mobile navigation
     */
    function init() {
        // Check if elements exist
        if (!mobileMenuToggle || !mobileNavOverlay) {
            console.warn('Mobile navigation elements not found');
            return;
        }

        // Add event listener to toggle button
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);

        // Add event listeners to all navigation links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });

        // Add event listener to CTA button
        if (mobileCTAButton) {
            mobileCTAButton.addEventListener('click', handleNavLinkClick);
        }

        // Add keyboard event listener
        document.addEventListener('keydown', handleKeyPress);

        // Handle window resize - close menu if resizing to desktop
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && isMenuOpen) {
                    closeMobileMenu();
                }
            }, 250);
        });

        console.log('Mobile navigation initialized successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();


