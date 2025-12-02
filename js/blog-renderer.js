// Blog Renderer - Dynamically generates blog post HTML from data

// Render blog post card for homepage
function renderHomepageBlogCard(post) {
    if (!post) return '';
    
    return `
        <article class="blog-card">
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.imageAlt || post.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="blog-card-image-fallback" style="display: none;">
                    <span>${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
                </div>
                <div class="blog-card-overlay"></div>
            </div>
            <div class="blog-card-content">
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-read-time">${post.readTime}</span>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="${post.slug}" class="blog-read-more">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                </a>
            </div>
        </article>
    `;
}

// Render blog post card for blog listing page
function renderBlogListingCard(post) {
    if (!post) return '';
    
    const categoryLabel = post.category.charAt(0).toUpperCase() + post.category.slice(1);
    
    return `
        <article class="blog-post-card" data-category="${post.category}">
            <div class="blog-post-image">
                <img src="${post.image}" alt="${post.imageAlt || post.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="blog-post-image-fallback" style="display: none;">
                    <span>${categoryLabel}</span>
                </div>
                <div class="blog-post-overlay"></div>
                <div class="blog-post-category-badge">${categoryLabel}</div>
            </div>
            <div class="blog-post-content">
                <div class="blog-post-meta">
                    <span class="blog-post-date">${formatDate(post.date)}</span>
                    <span class="blog-post-read-time">${post.readTime}</span>
                </div>
                <h3 class="blog-post-title">${post.title}</h3>
                <p class="blog-post-excerpt">${post.excerpt}</p>
                <a href="${post.slug}" class="blog-post-read-more">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                </a>
            </div>
        </article>
    `;
}

// Render homepage blog section
function renderHomepageBlogSection() {
    const blogGrid = document.querySelector('.blog-grid') || document.getElementById('homepageBlogGrid');
    if (!blogGrid) return;
    
    const latestPosts = getLatestPosts(3);
    
    if (latestPosts.length === 0) {
        blogGrid.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <p>No blog posts available yet. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    blogGrid.innerHTML = latestPosts.map(post => renderHomepageBlogCard(post)).join('');
}

// Render blog listing page
function renderBlogListingPage() {
    const blogPostsGrid = document.getElementById('blogPostsGrid');
    if (!blogPostsGrid) return;
    
    // Ensure we have access to getAllPostsSorted
    if (typeof getAllPostsSorted !== 'function') {
        console.error('getAllPostsSorted function not available');
        return;
    }
    
    const allPosts = getAllPostsSorted();
    
    // Debug logging (remove in production if desired)
    // console.log('Rendering blog listing page with', allPosts.length, 'posts');
    
    if (allPosts.length === 0) {
        blogPostsGrid.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <p>No blog posts available yet. Check back soon!</p>
            </div>
        `;
        
        // Still initialize BlogManager even with no posts
        if (typeof BlogManager !== 'undefined' && !window.blogManagerInstance) {
            setTimeout(() => {
                window.blogManagerInstance = new BlogManager();
            }, 100);
        }
        return;
    }
    
    blogPostsGrid.innerHTML = allPosts.map(post => renderBlogListingCard(post)).join('');
    
    // Re-initialize BlogManager to handle filtering after posts are rendered
    if (typeof BlogManager !== 'undefined') {
        setTimeout(() => {
            // Only initialize if not already initialized
            if (!window.blogManagerInstance) {
                window.blogManagerInstance = new BlogManager();
            } else {
                // Otherwise, just refresh the posts collection
                window.blogManagerInstance.collectAllPosts();
                window.blogManagerInstance.resetLoadMoreButton();
            }
        }, 100);
    }
}

// Initialize blog rendering when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a moment to ensure all scripts are loaded
    setTimeout(() => {
        // Render homepage blog section if on homepage
        if (document.querySelector('.blog-grid')) {
            renderHomepageBlogSection();
        }
        
        // Render blog listing page if on blog page
        if (document.getElementById('blogPostsGrid')) {
            renderBlogListingPage();
        }
    }, 100);
});

// Also render when window loads (in case DOMContentLoaded fires too early)
window.addEventListener('load', () => {
    // Render homepage blog section if on homepage
    if (document.querySelector('.blog-grid')) {
        renderHomepageBlogSection();
    }
    
    // Render blog listing page if on blog page
    if (document.getElementById('blogPostsGrid')) {
        renderBlogListingPage();
    }
});

// Listen for CMS updates and re-render
window.addEventListener('cmsPostsUpdated', () => {
    // Re-render homepage blog section if it exists
    if (document.querySelector('.blog-grid')) {
        renderHomepageBlogSection();
    }
    
    // Re-render blog listing page if it exists
    if (document.getElementById('blogPostsGrid')) {
        renderBlogListingPage();
    }
});

// Also re-render when page becomes visible (in case user switches tabs)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Re-render homepage blog section if it exists
        if (document.querySelector('.blog-grid')) {
            renderHomepageBlogSection();
        }
        
        // Re-render blog listing page if it exists
        if (document.getElementById('blogPostsGrid')) {
            renderBlogListingPage();
        }
    }
});

