// Navigation JavaScript Functionality
class NavigationManager {
    constructor() {
        this.isAnimating = false;
        this.init();
    }

    init() {
        // Mobile menu is now handled by mobile-nav.js
        // This file focuses on smooth scrolling and active links
        this.setupSmoothScrolling();
        this.setupActiveLinks();
        this.setupKeyboardNavigation();
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active Link Management
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');

        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', debounce(updateActiveLink, 100));
        updateActiveLink(); // Initial call
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Handle tab navigation
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NavigationManager();
    });
} else {
    new NavigationManager();
}

// Handle window resize
window.addEventListener('resize', () => {
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        if (mobileMenuOverlay?.classList.contains('active')) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

