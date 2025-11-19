// ============================================================
// BLOG POSTS DATA SYSTEM
// ============================================================
// 
// HOW TO ADD A NEW POST:
// ----------------------
// 1. Copy the example post object below
// 2. Add it to the blogPosts array (newest posts should be at the top)
// 3. Fill in all the required fields
// 4. Save the file - posts will automatically appear on:
//    - Homepage (latest 3 posts)
//    - Blog listing page (all posts, sorted newest first)
//
// IMPORTANT NOTES:
// - Posts are automatically sorted by date (newest first)
// - Latest post automatically shows on homepage
// - Date format: YYYY-MM-DD (e.g., '2024-03-20')
// - Categories: 'ai', 'tech', 'marketing', 'business'
// - Image path is relative to the root folder
//
// ============================================================

const blogPosts = [
    {
        id: 'scaling-business-ai-automation',
        title: 'Scaling Your Business with AI Automation',
        excerpt: 'Learn how to implement AI tools that streamline workflows, reduce manual tasks, and drive exponential growth for your business. Discover the key strategies that successful entrepreneurs use.',
        category: 'ai',
        date: '2024-03-15',
        readTime: '5 min read',
        image: 'assets/images/blog-1.jpg',
        imageAlt: 'Scaling Your Business with AI Automation',
        slug: 'blog-post.html',
        featured: true
    }
    
    // ============================================================
    // ADD YOUR NEW POSTS BELOW THIS LINE
    // ============================================================
    // 
    // Example new post (uncomment and modify):
    // 
    // {
    //     id: 'your-unique-post-id', // Use lowercase, hyphens for spaces
    //     title: 'Your Amazing Blog Post Title',
    //     excerpt: 'Write a compelling short description here that will appear in the blog card. Keep it under 150 characters for best display.',
    //     category: 'ai', // Choose: 'ai', 'tech', 'marketing', or 'business'
    //     date: '2024-03-20', // Use YYYY-MM-DD format, newest posts first!
    //     readTime: '6 min read', // Estimated reading time
    //     image: 'assets/images/your-image.jpg', // Path to your featured image
    //     imageAlt: 'Description of your image for accessibility',
    //     slug: 'blog-post.html', // Link to your blog post page
    //     featured: true // true = will show on homepage if it's in top 3
    // },
    //
    // ============================================================
];

// Helper function to format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Helper function to get latest post
function getLatestPost() {
    const allPosts = getAllBlogPosts();
    if (allPosts.length === 0) return null;
    // Sort by date (newest first) and return the first one
    return [...allPosts].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

// Helper function to get posts from localStorage (CMS)
function getPostsFromCMS() {
    try {
        const postsJson = localStorage.getItem('cms_posts');
        if (!postsJson) return [];
        
        const cmsPosts = JSON.parse(postsJson);
        // Filter only published posts and convert to blog format
        return cmsPosts
            .filter(post => post.published)
            .map(post => ({
                id: post.id,
                title: post.title,
                excerpt: post.excerpt,
                category: post.category,
                date: post.date,
                readTime: post.readTime,
                image: post.image || post.thumbnail || 'assets/images/blog-1.jpg',
                imageAlt: post.imageAlt || post.title,
                slug: post.slug || 'blog-post.html',
                featured: post.featured || false,
                content: post.content, // Full HTML content from CMS
                metaDescription: post.metaDescription
            }));
    } catch (error) {
        console.error('Error loading posts from CMS:', error);
        return [];
    }
}

// Helper function to merge CMS posts with hardcoded posts
function getAllBlogPosts() {
    const cmsPosts = getPostsFromCMS();
    const hardcodedPosts = [...blogPosts];
    
    // Merge posts, prioritizing CMS posts (they override hardcoded posts with same ID)
    const mergedPosts = [...cmsPosts];
    
    hardcodedPosts.forEach(hardcodedPost => {
        // Only add hardcoded post if no CMS post with same ID exists
        if (!mergedPosts.find(p => p.id === hardcodedPost.id)) {
            mergedPosts.push(hardcodedPost);
        }
    });
    
    return mergedPosts;
}

// Helper function to get latest posts (for homepage)
function getLatestPosts(count = 3) {
    const allPosts = getAllBlogPosts();
    if (allPosts.length === 0) return [];
    // Sort by date (newest first) and return the specified count
    return [...allPosts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);
}

// Helper function to get all posts sorted by date (newest first)
function getAllPostsSorted() {
    return getAllBlogPosts().sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Helper function to get posts by category
function getPostsByCategory(category) {
    if (category === 'all') return getAllPostsSorted();
    return getAllPostsSorted().filter(post => post.category === category);
}

// Listen for CMS updates
window.addEventListener('cmsPostsUpdated', () => {
    // Re-render blog sections if they exist
    if (typeof renderHomepageBlogSection === 'function') {
        renderHomepageBlogSection();
    }
    if (typeof renderBlogListingPage === 'function') {
        renderBlogListingPage();
    }
});

