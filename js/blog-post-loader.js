// Blog Post Loader - Dynamically loads and renders blog post content

// Get post ID or slug from URL
function getPostIdFromURL() {
    // Check for URL hash (#post-id)
    const hash = window.location.hash.replace('#', '');
    if (hash) return hash;
    
    // Check for URL parameter (?id=post-id or ?slug=post-slug)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) return id;
    
    const slug = urlParams.get('slug');
    if (slug) return slug;
    
    // Check pathname (blog-post.html or blog/post-slug.html)
    const pathname = window.location.pathname;
    const match = pathname.match(/\/([^\/]+)\.html$/);
    if (match && match[1] !== 'blog-post') {
        return match[1];
    }
    
    return null;
}

// Find post by ID or slug
function findPostByIdOrSlug(identifier) {
    if (!identifier) return null;
    
    // Get all posts (from CMS and hardcoded)
    const allPosts = getAllBlogPosts();
    
    // Try to find by ID first
    let post = allPosts.find(p => p.id === identifier);
    if (post) return post;
    
    // Try to find by slug
    post = allPosts.find(p => {
        const postSlug = p.slug || '';
        // Remove .html extension if present
        const cleanSlug = postSlug.replace(/\.html$/, '');
        const cleanIdentifier = identifier.replace(/\.html$/, '');
        return cleanSlug === cleanIdentifier || postSlug === identifier;
    });
    
    if (post) return post;
    
    // Try partial match (in case slug has path)
    post = allPosts.find(p => {
        const postSlug = p.slug || '';
        return postSlug.includes(identifier) || identifier.includes(postSlug);
    });
    
    return post || null;
}

// Render blog post content
function renderBlogPost(post) {
    if (!post) {
        renderPostNotFound();
        return;
    }
    
    // Update page title
    if (post.title) {
        document.title = `${post.title} | Muhammad Abubakr`;
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && post.metaDescription) {
        metaDescription.setAttribute('content', post.metaDescription);
    }
    
    // Update breadcrumb
    const breadcrumbTitle = document.querySelector('.breadcrumb-current');
    if (breadcrumbTitle && post.title) {
        breadcrumbTitle.textContent = post.title;
    }
    
    // Update post header
    const postCategory = document.querySelector('.blog-post-category .post-category-badge');
    if (postCategory && post.category) {
        postCategory.textContent = post.category.toUpperCase();
    }
    
    const postTitle = document.querySelector('.blog-post-header .blog-post-title');
    if (postTitle && post.title) {
        postTitle.textContent = post.title;
    }
    
    // Update author info (keep existing or use default)
    const authorName = document.querySelector('.author-name');
    if (authorName && (!authorName.textContent.trim() || authorName.textContent.trim() === 'Muhammad Abubakr')) {
        authorName.textContent = 'Muhammad Abubakr';
    }
    
    // Update date
    const postDate = document.querySelector('.post-date');
    if (postDate && post.date) {
        postDate.textContent = formatDate(post.date);
    }
    
    // Update read time
    const readTime = document.querySelector('.read-time');
    if (readTime && post.readTime) {
        readTime.textContent = post.readTime;
    }
    
    // Update featured image
    const featuredImage = document.querySelector('.blog-post-featured-image img');
    if (featuredImage && post.featuredImage) {
        featuredImage.src = post.featuredImage;
        featuredImage.alt = post.imageAlt || post.title || 'Featured image';
    } else if (featuredImage && post.image) {
        featuredImage.src = post.image;
        featuredImage.alt = post.imageAlt || post.title || 'Featured image';
    }
    
    // Update post content
    const postContent = document.querySelector('.blog-post-content');
    if (postContent) {
        // Clear existing content
        postContent.innerHTML = '';
        
        // Add lead/intro if available
        if (post.excerpt) {
            const leadDiv = document.createElement('div');
            leadDiv.className = 'post-intro';
            const leadP = document.createElement('p');
            leadP.className = 'post-lead';
            leadP.textContent = post.excerpt;
            leadDiv.appendChild(leadP);
            postContent.appendChild(leadDiv);
        }
        
        // Add main content
        if (post.content) {
            const bodyDiv = document.createElement('div');
            bodyDiv.className = 'post-body';
            bodyDiv.innerHTML = post.content;
            postContent.appendChild(bodyDiv);
        } else {
            // Fallback if no content
            const bodyDiv = document.createElement('div');
            bodyDiv.className = 'post-body';
            bodyDiv.innerHTML = '<p>Content coming soon...</p>';
            postContent.appendChild(bodyDiv);
        }
        
        // Add tags based on category
        const tagsDiv = document.querySelector('.post-tags');
        if (tagsDiv && post.category) {
            const categoryLabel = post.category.charAt(0).toUpperCase() + post.category.slice(1);
            tagsDiv.innerHTML = `
                <span class="tags-label">Tags:</span>
                <a href="blog.html?category=${post.category}" class="post-tag">${categoryLabel}</a>
            `;
        }
        
        // Update share links
        const shareButtons = document.querySelectorAll('.share-button');
        if (shareButtons.length > 0) {
            const shareUrl = encodeURIComponent(window.location.href);
            const shareTitle = encodeURIComponent(post.title || '');
            const shareText = encodeURIComponent(post.excerpt || '');
            
            // Twitter/X
            const twitterBtn = shareButtons[0];
            if (twitterBtn) {
                twitterBtn.href = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
            }
            
            // LinkedIn
            const linkedinBtn = shareButtons[1];
            if (linkedinBtn) {
                linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
            }
            
            // Facebook
            const facebookBtn = shareButtons[2];
            if (facebookBtn) {
                facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
            }
        }
    }
    
    // Update related posts (show other posts from same category or latest posts)
    renderRelatedPosts(post);
}

// Render "Post Not Found" message
function renderPostNotFound() {
    const postContent = document.querySelector('.blog-post-content');
    if (postContent) {
        postContent.innerHTML = `
            <div style="text-align: center; padding: 80px 20px;">
                <h2 style="font-size: 2rem; margin-bottom: 16px; color: var(--text-primary);">Post Not Found</h2>
                <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 32px;">
                    The blog post you're looking for doesn't exist or has been removed.
                </p>
                <a href="blog.html" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: var(--accent-green); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; transition: all 0.3s;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
                    </svg>
                    Back to Blog
                </a>
            </div>
        `;
    }
}

// Render related posts
function renderRelatedPosts(currentPost) {
    const relatedPostsGrid = document.querySelector('.related-posts-grid');
    if (!relatedPostsGrid) return;
    
    // Get all posts except current one
    const allPosts = getAllBlogPosts();
    const otherPosts = allPosts.filter(p => p.id !== currentPost.id);
    
    // Get posts from same category first, then latest posts
    const sameCategoryPosts = otherPosts.filter(p => p.category === currentPost.category);
    const relatedPosts = sameCategoryPosts.length >= 3 
        ? sameCategoryPosts.slice(0, 3)
        : [...sameCategoryPosts, ...otherPosts.filter(p => p.category !== currentPost.category)].slice(0, 3);
    
    if (relatedPosts.length === 0) {
        relatedPostsGrid.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary); grid-column: 1 / -1;">
                <p>No related posts available.</p>
            </div>
        `;
        return;
    }
    
    relatedPostsGrid.innerHTML = relatedPosts.map(post => {
        const categoryLabel = (post.category || '').charAt(0).toUpperCase() + (post.category || '').slice(1);
        return `
            <article class="related-post-card">
                <div class="related-post-image">
                    <img src="${post.image || 'assets/images/blog-1.jpg'}" alt="${post.title || 'Blog post'}" loading="lazy">
                    <div class="related-post-overlay"></div>
                    <div class="related-post-category-badge">${categoryLabel}</div>
                </div>
                <div class="related-post-content">
                    <div class="related-post-meta">
                        <span class="related-post-date">${formatDate(post.date)}</span>
                        <span class="related-post-read-time">${post.readTime || '5 min read'}</span>
                    </div>
                    <h3 class="related-post-title">${post.title || 'Untitled'}</h3>
                    <p class="related-post-excerpt">${post.excerpt || 'No excerpt available.'}</p>
                    <a href="${post.slug || 'blog-post.html'}?id=${post.id}" class="related-post-link">
                        Read Article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

// Initialize blog post loader
document.addEventListener('DOMContentLoaded', () => {
    // Wait for blog-data.js to load
    setTimeout(() => {
        const postId = getPostIdFromURL();
        
        if (postId && typeof getAllBlogPosts === 'function') {
            const post = findPostByIdOrSlug(postId);
            renderBlogPost(post);
        } else if (!postId) {
            // If no ID in URL, try to get from first post or use default
            // This handles cases where blog-post.html is accessed directly
            if (typeof getAllBlogPosts === 'function') {
                const allPosts = getAllBlogPosts();
                if (allPosts.length > 0) {
                    // Use the latest post
                    const latestPost = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
                    renderBlogPost(latestPost);
                } else {
                    renderPostNotFound();
                }
            }
        }
    }, 200);
});

// Also try when window loads (in case DOMContentLoaded fires too early)
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof getAllBlogPosts === 'function') {
            const postId = getPostIdFromURL();
            
            if (postId) {
                const post = findPostByIdOrSlug(postId);
                if (post) {
                    renderBlogPost(post);
                }
            }
        }
    }, 100);
});

