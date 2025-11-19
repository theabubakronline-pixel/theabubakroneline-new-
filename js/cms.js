// ============================================================
// CMS - Blog Content Management System
// ============================================================

class BlogCMS {
    constructor() {
        this.currentPostId = null;
        this.editor = null;
        this.autoSaveInterval = null;
        this.defaultPassword = 'admin123'; // Change this to your desired password
        
        this.init();
    }

    init() {
        this.checkAuth();
        this.setupEventListeners();
        this.loadPosts();
    }

    // ============================================================
    // AUTHENTICATION
    // ============================================================

    checkAuth() {
        const authToken = localStorage.getItem('cms_auth');
        if (authToken && this.verifyPassword(authToken)) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    hashPassword(password) {
        // Simple hash function (in production, use a proper hashing library)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    verifyPassword(hashedPassword) {
        const storedHash = localStorage.getItem('cms_password_hash');
        if (!storedHash) {
            // First time setup - store the default password hash
            const hash = this.hashPassword(this.defaultPassword);
            localStorage.setItem('cms_password_hash', hash);
            return hashedPassword === hash;
        }
        return hashedPassword === storedHash;
    }

    showLogin() {
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('cmsDashboard').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('cmsDashboard').style.display = 'block';
    }

    login(password) {
        const hash = this.hashPassword(password);
        const storedHash = localStorage.getItem('cms_password_hash');
        
        if (!storedHash) {
            // First time - set up password
            localStorage.setItem('cms_password_hash', hash);
        }
        
        if (hash === (storedHash || hash)) {
            localStorage.setItem('cms_auth', hash);
            this.showDashboard();
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('cms_auth');
        this.showLogin();
        this.stopAutoSave();
    }

    // ============================================================
    // EVENT LISTENERS
    // ============================================================

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const password = document.getElementById('loginPassword').value;
                const errorDiv = document.getElementById('loginError');
                
                if (this.login(password)) {
                    errorDiv.style.display = 'none';
                    document.getElementById('loginPassword').value = '';
                } else {
                    errorDiv.textContent = 'Invalid password. Please try again.';
                    errorDiv.style.display = 'block';
                }
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to logout?')) {
                    this.logout();
                }
            });
        }

        // New post button
        const newPostBtn = document.getElementById('newPostBtn');
        if (newPostBtn) {
            newPostBtn.addEventListener('click', () => {
                this.createNewPost();
            });
        }

        // Back to list button
        const backToListBtn = document.getElementById('backToListBtn');
        if (backToListBtn) {
            backToListBtn.addEventListener('click', () => {
                this.showPostsList();
            });
        }

        // Save draft button
        const saveDraftBtn = document.getElementById('saveDraftBtn');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => {
                this.saveDraft();
            });
        }

        // Publish button
        const publishBtn = document.getElementById('publishBtn');
        if (publishBtn) {
            publishBtn.addEventListener('click', () => {
                this.publishPost();
            });
        }

        // Preview button
        const previewBtn = document.getElementById('previewBtn');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                this.showPreview();
            });
        }

        // Close preview button
        const closePreviewBtn = document.getElementById('closePreviewBtn');
        if (closePreviewBtn) {
            closePreviewBtn.addEventListener('click', () => {
                this.closePreview();
            });
        }

        // Generate excerpt button
        const generateExcerptBtn = document.getElementById('generateExcerptBtn');
        if (generateExcerptBtn) {
            generateExcerptBtn.addEventListener('click', () => {
                this.generateExcerpt();
            });
        }

        // Image upload handlers
        this.setupImageUploads();

        // Auto-generate slug from title
        const postTitle = document.getElementById('postTitle');
        if (postTitle) {
            postTitle.addEventListener('input', () => {
                this.autoGenerateSlug();
            });
        }

        // Auto-set date
        const postDate = document.getElementById('postDate');
        if (postDate && !postDate.value) {
            postDate.value = new Date().toISOString().split('T')[0];
        }

        // Auto-calculate read time
        const postContent = document.getElementById('postContent');
        if (postContent) {
            postContent.addEventListener('input', () => {
                this.calculateReadTime();
            });
        }
    }

    setupImageUploads() {
        // Thumbnail upload
        const thumbnailInput = document.getElementById('postThumbnail');
        const thumbnailUrl = document.getElementById('thumbnailUrl');
        const thumbnailPreview = document.getElementById('thumbnailPreview');

        if (thumbnailInput) {
            thumbnailInput.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files[0], thumbnailPreview, thumbnailUrl);
            });
        }

        if (thumbnailUrl) {
            thumbnailUrl.addEventListener('input', () => {
                this.updateImagePreview(thumbnailUrl.value, thumbnailPreview);
            });
        }

        // Featured image upload
        const featuredInput = document.getElementById('postFeaturedImage');
        const featuredUrl = document.getElementById('featuredImageUrl');
        const featuredPreview = document.getElementById('featuredImagePreview');

        if (featuredInput) {
            featuredInput.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files[0], featuredPreview, featuredUrl);
            });
        }

        if (featuredUrl) {
            featuredUrl.addEventListener('input', () => {
                this.updateImagePreview(featuredUrl.value, featuredPreview);
            });
        }
    }

    // ============================================================
    // POSTS MANAGEMENT
    // ============================================================

    loadPosts() {
        const posts = this.getPosts();
        this.renderPostsTable(posts);
    }

    getPosts() {
        const postsJson = localStorage.getItem('cms_posts');
        return postsJson ? JSON.parse(postsJson) : [];
    }

    savePosts(posts) {
        localStorage.setItem('cms_posts', JSON.stringify(posts));
        // Trigger update in blog-data.js
        this.notifyBlogSystemUpdate();
    }

    createNewPost() {
        this.currentPostId = null;
        this.resetEditor();
        this.showPostEditor();
        this.initEditor();
        this.startAutoSave();
    }

    editPost(postId) {
        const posts = this.getPosts();
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            this.currentPostId = postId;
            this.loadPostIntoEditor(post);
            this.showPostEditor();
            this.initEditor();
            this.startAutoSave();
        }
    }

    deletePost(postId) {
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            return;
        }

        const posts = this.getPosts();
        const filteredPosts = posts.filter(p => p.id !== postId);
        this.savePosts(filteredPosts);
        this.loadPosts();
    }

    togglePublishStatus(postId) {
        const posts = this.getPosts();
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            post.published = !post.published;
            post.updatedAt = new Date().toISOString();
            this.savePosts(posts);
            this.loadPosts();
        }
    }

    // ============================================================
    // EDITOR FUNCTIONS
    // ============================================================

    showPostsList() {
        document.getElementById('postsListView').style.display = 'block';
        document.getElementById('postEditorView').style.display = 'none';
        this.stopAutoSave();
        this.loadPosts();
    }

    showPostEditor() {
        document.getElementById('postsListView').style.display = 'none';
        document.getElementById('postEditorView').style.display = 'block';
    }

    initEditor() {
        if (this.editor) {
            return; // Editor already initialized
        }

        // Initialize TinyMCE
        if (typeof tinymce !== 'undefined') {
            tinymce.init({
                selector: '#postContent',
                height: 600,
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | link image | code fullscreen',
                content_style: `
                    body { 
                        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        font-size: 16px;
                        line-height: 1.8;
                        color: var(--text-primary);
                        background: var(--bg-primary);
                    }
                `,
                skin: 'oxide',
                content_css: 'default',
                branding: false,
                promotion: false,
                setup: (editor) => {
                    this.editor = editor;
                }
            });
        }
    }

    resetEditor() {
        document.getElementById('postTitle').value = '';
        document.getElementById('postExcerpt').value = '';
        document.getElementById('postCategory').value = '';
        document.getElementById('postDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('postReadTime').value = '';
        document.getElementById('postSlug').value = '';
        document.getElementById('postFeatured').checked = false;
        document.getElementById('thumbnailUrl').value = '';
        document.getElementById('featuredImageUrl').value = '';
        document.getElementById('postMetaDescription').value = '';
        
        // Clear image previews
        document.getElementById('thumbnailPreview').innerHTML = '';
        document.getElementById('thumbnailPreview').classList.remove('has-image');
        document.getElementById('featuredImagePreview').innerHTML = '';
        document.getElementById('featuredImagePreview').classList.remove('has-image');

        if (this.editor) {
            this.editor.setContent('');
        }
    }

    loadPostIntoEditor(post) {
        document.getElementById('postTitle').value = post.title || '';
        document.getElementById('postExcerpt').value = post.excerpt || '';
        document.getElementById('postCategory').value = post.category || '';
        document.getElementById('postDate').value = post.date || new Date().toISOString().split('T')[0];
        document.getElementById('postReadTime').value = post.readTime || '';
        document.getElementById('postSlug').value = post.slug || '';
        document.getElementById('postFeatured').checked = post.featured || false;
        document.getElementById('thumbnailUrl').value = post.image || '';
        document.getElementById('featuredImageUrl').value = post.featuredImage || post.image || '';
        document.getElementById('postMetaDescription').value = post.metaDescription || '';

        // Load image previews
        if (post.image) {
            this.updateImagePreview(post.image, document.getElementById('thumbnailPreview'));
        }
        if (post.featuredImage || post.image) {
            this.updateImagePreview(post.featuredImage || post.image, document.getElementById('featuredImagePreview'));
        }

        if (this.editor && post.content) {
            this.editor.setContent(post.content);
        }
    }

    getPostFromEditor() {
        const title = document.getElementById('postTitle').value.trim();
        const excerpt = document.getElementById('postExcerpt').value.trim();
        const category = document.getElementById('postCategory').value;
        const date = document.getElementById('postDate').value;
        const readTime = document.getElementById('postReadTime').value.trim();
        const slug = document.getElementById('postSlug').value.trim();
        const featured = document.getElementById('postFeatured').checked;
        const thumbnail = document.getElementById('thumbnailUrl').value.trim();
        const featuredImage = document.getElementById('featuredImageUrl').value.trim();
        const metaDescription = document.getElementById('postMetaDescription').value.trim();
        const content = this.editor ? this.editor.getContent() : '';

        return {
            title,
            excerpt,
            category,
            date,
            readTime: readTime || this.calculateReadTime(),
            slug: slug || this.generateSlugFromTitle(title),
            featured,
            image: thumbnail || featuredImage || 'assets/images/blog-1.jpg',
            featuredImage: featuredImage || thumbnail || 'assets/images/blog-1.jpg',
            imageAlt: title,
            metaDescription,
            content
        };
    }

    validatePost(post) {
        if (!post.title) {
            alert('Please enter a post title.');
            return false;
        }
        if (!post.excerpt) {
            alert('Please enter an excerpt.');
            return false;
        }
        if (!post.category) {
            alert('Please select a category.');
            return false;
        }
        if (!post.date) {
            alert('Please select a date.');
            return false;
        }
        if (!post.content || post.content.trim() === '') {
            alert('Please write some content for your post.');
            return false;
        }
        return true;
    }

    saveDraft() {
        const postData = this.getPostFromEditor();
        
        if (!postData.title) {
            alert('Please enter at least a title to save as draft.');
            return;
        }

        const posts = this.getPosts();
        const now = new Date().toISOString();

        if (this.currentPostId) {
            // Update existing post
            const postIndex = posts.findIndex(p => p.id === this.currentPostId);
            if (postIndex !== -1) {
                posts[postIndex] = {
                    ...posts[postIndex],
                    ...postData,
                    updatedAt: now,
                    published: false
                };
            }
        } else {
            // Create new post
            const newPost = {
                id: this.generatePostId(),
                ...postData,
                published: false,
                createdAt: now,
                updatedAt: now
            };
            posts.push(newPost);
            this.currentPostId = newPost.id;
        }

        this.savePosts(posts);
        this.showMessage('Draft saved successfully!', 'success');
    }

    publishPost() {
        const postData = this.getPostFromEditor();
        
        if (!this.validatePost(postData)) {
            return;
        }

        const posts = this.getPosts();
        const now = new Date().toISOString();

        if (this.currentPostId) {
            // Update existing post
            const postIndex = posts.findIndex(p => p.id === this.currentPostId);
            if (postIndex !== -1) {
                posts[postIndex] = {
                    ...posts[postIndex],
                    ...postData,
                    published: true,
                    updatedAt: now
                };
            }
        } else {
            // Create new post
            const newPost = {
                id: this.generatePostId(),
                ...postData,
                published: true,
                createdAt: now,
                updatedAt: now
            };
            posts.push(newPost);
            this.currentPostId = newPost.id;
        }

        this.savePosts(posts);
        this.showMessage('Post published successfully! It will appear on your website immediately.', 'success');
        
        // Update publish button text
        const publishBtnText = document.getElementById('publishBtnText');
        if (publishBtnText) {
            publishBtnText.textContent = 'Update Post';
        }
    }

    // ============================================================
    // AUTO-SAVE
    // ============================================================

    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            const postData = this.getPostFromEditor();
            if (postData.title || postData.content) {
                this.saveDraft();
            }
        }, 30000); // Auto-save every 30 seconds
    }

    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }

    // ============================================================
    // UTILITY FUNCTIONS
    // ============================================================

    generatePostId() {
        return 'post-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    generateSlugFromTitle(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '.html';
    }

    autoGenerateSlug() {
        const title = document.getElementById('postTitle').value;
        const slugInput = document.getElementById('postSlug');
        if (title && !slugInput.value) {
            slugInput.value = this.generateSlugFromTitle(title);
        }
    }

    generateExcerpt() {
        if (!this.editor) return;
        
        const content = this.editor.getContent({ format: 'text' });
        const excerpt = content.substring(0, 150).trim();
        document.getElementById('postExcerpt').value = excerpt + (content.length > 150 ? '...' : '');
    }

    calculateReadTime() {
        if (!this.editor) return '5 min read';
        
        const content = this.editor.getContent({ format: 'text' });
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        
        const readTimeInput = document.getElementById('postReadTime');
        if (readTimeInput) {
            readTimeInput.value = `${readTime} min read`;
        }
        
        return `${readTime} min read`;
    }

    handleImageUpload(file, previewElement, urlInput) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            // For now, we'll use base64 or you can implement actual upload
            // In production, you'd upload to a server and get a URL
            const base64 = e.target.result;
            urlInput.value = base64;
            this.updateImagePreview(base64, previewElement);
        };
        reader.readAsDataURL(file);
    }

    updateImagePreview(url, previewElement) {
        if (!url || !previewElement) return;

        previewElement.innerHTML = `<img src="${url}" alt="Preview" style="width: 100%; height: auto; display: block;">`;
        previewElement.classList.add('has-image');
    }

    showPreview() {
        const postData = this.getPostFromEditor();
        const previewContent = document.getElementById('previewContent');
        
        if (!previewContent) return;

        previewContent.innerHTML = `
            <article class="cms-preview-content">
                <h1>${postData.title || 'Untitled Post'}</h1>
                ${postData.featuredImage ? `<img src="${postData.featuredImage}" alt="${postData.title}" />` : ''}
                <div>${postData.content || '<p>No content yet.</p>'}</div>
            </article>
        `;

        document.getElementById('previewModal').style.display = 'flex';
    }

    closePreview() {
        document.getElementById('previewModal').style.display = 'none';
    }

    renderPostsTable(posts) {
        const tbody = document.getElementById('postsTableBody');
        const postsCount = document.getElementById('postsCount');
        
        if (!tbody) return;

        if (postsCount) {
            postsCount.textContent = `${posts.length} post${posts.length !== 1 ? 's' : ''}`;
        }

        if (posts.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                        No posts yet. Click "New Post" to create your first post!
                    </td>
                </tr>
            `;
            return;
        }

        // Sort posts by date (newest first)
        const sortedPosts = [...posts].sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));

        tbody.innerHTML = sortedPosts.map(post => `
            <tr>
                <td class="cms-post-title-cell">${post.title || 'Untitled'}</td>
                <td><span class="cms-post-category-badge">${(post.category || '').toUpperCase()}</span></td>
                <td>${post.date ? new Date(post.date).toLocaleDateString() : 'No date'}</td>
                <td>
                    <span class="cms-post-status ${post.published ? 'published' : 'draft'}">
                        ${post.published ? '✓ Published' : '○ Draft'}
                    </span>
                </td>
                <td>
                    <div class="cms-post-actions">
                        <button class="cms-action-btn" onclick="cms.editPost('${post.id}')">Edit</button>
                        <button class="cms-action-btn" onclick="cms.togglePublishStatus('${post.id}')">
                            ${post.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button class="cms-action-btn delete" onclick="cms.deletePost('${post.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    showMessage(message, type = 'info') {
        // Simple alert for now, can be enhanced with a toast notification
        alert(message);
    }

    notifyBlogSystemUpdate() {
        // Trigger a custom event that blog-data.js can listen to
        window.dispatchEvent(new CustomEvent('cmsPostsUpdated'));
    }
}

// Initialize CMS when DOM is loaded
let cms;
document.addEventListener('DOMContentLoaded', () => {
    cms = new BlogCMS();
});



