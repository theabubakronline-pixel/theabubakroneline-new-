// Blog Page Functionality - Category Filtering and Pagination

class BlogManager {
    constructor() {
        this.currentCategory = 'all';
        this.postsPerPage = 6;
        this.currentPage = 1;
        this.allPosts = [];
        this.filteredPosts = [];
        this.init();
    }

    init() {
        this.setupCategoryFilters();
        this.setupLoadMore();
        this.collectAllPosts();
        this.setupSmoothScroll();
        this.setupNewsletterForm();
    }

    // Collect all blog posts from the DOM
    collectAllPosts() {
        const postsGrid = document.getElementById('blogPostsGrid');
        if (!postsGrid) return;

        this.allPosts = Array.from(postsGrid.querySelectorAll('.blog-post-card'));
        this.filteredPosts = [...this.allPosts];
    }

    // Re-render posts from data (for CMS updates)
    reRenderPosts() {
        if (typeof getAllPostsSorted === 'function' && typeof renderBlogListingCard === 'function') {
            const allPosts = getAllPostsSorted();
            const postsGrid = document.getElementById('blogPostsGrid');
            if (!postsGrid) return;

            if (allPosts.length === 0) {
                postsGrid.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                        <p>No blog posts available yet. Check back soon!</p>
                    </div>
                `;
                return;
            }

            postsGrid.innerHTML = allPosts.map(post => renderBlogListingCard(post)).join('');
            this.collectAllPosts();
            this.resetLoadMoreButton();
        }
    }

    // Setup category filter buttons
    setupCategoryFilters() {
        const categoryFilters = document.querySelectorAll('.category-filter');
        
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterByCategory(category);
                
                // Update active state
                categoryFilters.forEach(f => f.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    // Filter posts by category
    filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;
        
        const postsGrid = document.getElementById('blogPostsGrid');
        if (!postsGrid) return;

        // Filter posts
        this.filteredPosts = this.allPosts.filter(post => {
            if (category === 'all') {
                return true;
            }
            return post.getAttribute('data-category') === category;
        });

        // Hide all posts first with animation
        this.allPosts.forEach(post => {
            post.classList.add('filtering');
        });

        // Show filtered posts after a short delay
        setTimeout(() => {
            this.allPosts.forEach(post => {
                if (this.filteredPosts.includes(post)) {
                    post.classList.remove('hidden', 'filtering');
                    post.style.display = '';
                } else {
                    post.classList.add('hidden');
                    post.style.display = 'none';
                }
            });

            // Show "no posts" message if needed
            this.showNoPostsMessage();
            
            // Reset load more button
            this.resetLoadMoreButton();
        }, 300);
    }

    // Show message when no posts match filter
    showNoPostsMessage() {
        let noPostsMsg = document.querySelector('.no-posts-message');
        
        if (this.filteredPosts.length === 0) {
            if (!noPostsMsg) {
                noPostsMsg = document.createElement('div');
                noPostsMsg.className = 'no-posts-message';
                noPostsMsg.innerHTML = `
                    <p style="text-align: center; color: var(--text-secondary); font-size: 1.1rem; padding: 60px 20px;">
                        No posts found in this category. Try selecting another category!
                    </p>
                `;
                const postsGrid = document.getElementById('blogPostsGrid');
                if (postsGrid && postsGrid.parentNode) {
                    postsGrid.parentNode.insertBefore(noPostsMsg, postsGrid.nextSibling);
                }
            }
        } else {
            if (noPostsMsg) {
                noPostsMsg.remove();
            }
        }
    }

    // Setup load more button
    setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;

        // For now, disable load more as we only have 6 posts
        // This can be enabled when you have more posts
        loadMoreBtn.addEventListener('click', () => {
            this.loadMorePosts();
        });

        // Initially hide if all posts are visible
        this.updateLoadMoreButton();
    }

    // Load more posts (for future implementation)
    loadMorePosts() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;

        // Disable button during loading
        loadMoreBtn.disabled = true;
        loadMoreBtn.querySelector('.load-more-text').textContent = 'Loading...';

        // Simulate loading (replace with actual API call later)
        setTimeout(() => {
            // For now, just show a message that all posts are loaded
            loadMoreBtn.disabled = true;
            loadMoreBtn.querySelector('.load-more-text').textContent = 'All Posts Loaded';
            loadMoreBtn.style.opacity = '0.6';
        }, 1000);
    }

    // Reset load more button state
    resetLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;

        const visiblePosts = this.filteredPosts.filter(post => !post.classList.contains('hidden')).length;
        const totalPosts = this.filteredPosts.length;

        if (visiblePosts >= totalPosts) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.querySelector('.load-more-text').textContent = 'All Posts Loaded';
            loadMoreBtn.style.opacity = '0.6';
        } else {
            loadMoreBtn.disabled = false;
            loadMoreBtn.querySelector('.load-more-text').textContent = 'Load More Posts';
            loadMoreBtn.style.opacity = '1';
        }
    }

    // Update load more button visibility
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;

        // If all posts fit on one page, hide the button
        if (this.filteredPosts.length <= this.postsPerPage) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }

    // Setup smooth scroll for category filter clicks
    setupSmoothScroll() {
        // Smooth scroll to posts section when filter is clicked
        const categoryFilters = document.querySelectorAll('.category-filter');
        const postsSection = document.querySelector('.blog-posts-section');

        categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                if (postsSection && window.innerWidth <= 768) {
                    setTimeout(() => {
                        postsSection.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }, 100);
                }
            });
        });
    }

    // Setup newsletter form
    setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const submitBtn = newsletterForm.querySelector('.newsletter-submit-btn');
            const submitText = submitBtn.querySelector('.newsletter-submit-text');
            
            const email = emailInput.value.trim();
            
            if (!email) {
                this.showNewsletterMessage('Please enter a valid email address.', 'error');
                return;
            }

            if (!this.validateEmail(email)) {
                this.showNewsletterMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Disable form during submission
            submitBtn.disabled = true;
            submitText.textContent = 'Subscribing...';

            // Simulate API call (replace with actual API endpoint)
            setTimeout(() => {
                // Success message
                this.showNewsletterMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
                emailInput.value = '';
                
                // Reset button
                submitBtn.disabled = false;
                submitText.textContent = 'Subscribe';
            }, 1500);
        });
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show newsletter message
    showNewsletterMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `newsletter-message newsletter-message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            margin-top: 16px;
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 0.9rem;
            text-align: center;
            background: ${type === 'success' ? 'rgba(0, 255, 150, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
            color: ${type === 'success' ? 'var(--accent-green)' : '#ff4444'};
            border: 1px solid ${type === 'success' ? 'rgba(0, 255, 150, 0.3)' : 'rgba(255, 0, 0, 0.3)'};
            animation: fadeInUp 0.3s ease;
        `;

        const form = document.getElementById('newsletterForm');
        if (form) {
            form.appendChild(messageDiv);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                messageDiv.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    messageDiv.remove();
                }, 300);
            }, 5000);
        }
    }
}

// Initialize Blog Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for blog-renderer to finish rendering
    setTimeout(() => {
        const blogPostsGrid = document.getElementById('blogPostsGrid');
        if (blogPostsGrid) {
            if (!window.blogManagerInstance) {
                window.blogManagerInstance = new BlogManager();
            }
        }
    }, 200);
});

// Listen for CMS updates and refresh blog manager
window.addEventListener('cmsPostsUpdated', () => {
    if (window.blogManagerInstance && typeof window.blogManagerInstance.reRenderPosts === 'function') {
        setTimeout(() => {
            window.blogManagerInstance.reRenderPosts();
        }, 100);
    }
});

// Add smooth reveal animation on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe blog post cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const blogCards = document.querySelectorAll('.blog-post-card');
    blogCards.forEach(card => {
        observer.observe(card);
    });
});

