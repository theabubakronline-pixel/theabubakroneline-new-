/**
 * Tools Page JavaScript
 * Handles tool filtering and rendering
 */

(function() {
    'use strict';

    // Sample tools data - Replace with your actual tools
    const toolsData = [
        {
            id: 1,
            title: 'AI Content Generator',
            description: 'Generate high-quality blog posts, social media content, and marketing copy using AI. Save hours of writing time.',
            category: 'ai',
            icon: '🤖',
            url: '#',
            status: 'free',
            tags: ['AI', 'Content', 'Writing']
        },
        {
            id: 2,
            title: 'ROI Calculator',
            description: 'Calculate return on investment for your marketing campaigns. Track performance and optimize spending.',
            category: 'calculators',
            icon: '📊',
            url: '#',
            status: 'free',
            tags: ['Marketing', 'Analytics', 'ROI']
        },
        {
            id: 3,
            title: 'Email Template Builder',
            description: 'Create professional email templates for your campaigns. Responsive, mobile-friendly, and conversion-optimized.',
            category: 'marketing',
            icon: '📧',
            url: '#',
            status: 'popular',
            tags: ['Email', 'Templates', 'Marketing']
        },
        {
            id: 4,
            title: 'Task Automator',
            description: 'Automate repetitive tasks and workflows. Connect your favorite tools and save hours every week.',
            category: 'automation',
            icon: '⚡',
            url: '#',
            status: 'new',
            tags: ['Automation', 'Productivity', 'Workflow']
        },
        {
            id: 5,
            title: 'Social Media Scheduler',
            description: 'Plan and schedule your social media posts across multiple platforms. Maintain consistent presence.',
            category: 'marketing',
            icon: '📱',
            url: '#',
            status: 'free',
            tags: ['Social Media', 'Scheduling', 'Marketing']
        },
        {
            id: 6,
            title: 'Keyword Research Tool',
            description: 'Find high-value keywords for your content. Analyze competition and search volume to optimize SEO.',
            category: 'marketing',
            icon: '🔍',
            url: '#',
            status: 'free',
            tags: ['SEO', 'Keywords', 'Research']
        },
        {
            id: 7,
            title: 'Productivity Timer',
            description: 'Pomodoro timer with analytics. Track your focus sessions and improve productivity over time.',
            category: 'productivity',
            icon: '⏱️',
            url: '#',
            status: 'free',
            tags: ['Productivity', 'Time Management', 'Focus']
        },
        {
            id: 8,
            title: 'AI Prompt Library',
            description: 'Curated collection of AI prompts for ChatGPT, Claude, and more. Get better results from AI assistants.',
            category: 'ai',
            icon: '💡',
            url: '#',
            status: 'popular',
            tags: ['AI', 'Prompts', 'Resources']
        },
        {
            id: 9,
            title: 'Invoice Generator',
            description: 'Create professional invoices in seconds. Customize templates, track payments, and manage clients.',
            category: 'productivity',
            icon: '🧾',
            url: '#',
            status: 'free',
            tags: ['Business', 'Invoicing', 'Finance']
        },
        {
            id: 10,
            title: 'Dino QR Code Generator',
            description: 'Create custom dinosaur-themed QR codes with unique shapes. Fully scannable QR codes with 10 dinosaur templates and color customization.',
            category: 'productivity',
            icon: '🦖',
            url: '/tool/dino-qr-code-generator/',
            status: 'new',
            tags: ['QR Code', 'Design', 'Custom']
        }
    ];

    const toolsGrid = document.getElementById('toolsGrid');
    const emptyState = document.getElementById('toolsEmptyState');
    const categoryFilters = document.querySelectorAll('.tool-category-filter');
    let currentCategory = 'all';

    // Initialize
    function init() {
        renderTools(toolsData);
        setupEventListeners();
    }

    // Setup event listeners
    function setupEventListeners() {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Update active state
                categoryFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                // Get category
                currentCategory = this.getAttribute('data-category');
                
                // Filter and render tools
                filterTools();
            });
        });
    }

    // Filter tools by category
    function filterTools() {
        let filteredTools;
        
        if (currentCategory === 'all') {
            filteredTools = toolsData;
        } else {
            filteredTools = toolsData.filter(tool => tool.category === currentCategory);
        }
        
        renderTools(filteredTools);
    }

    // Render tools
    function renderTools(tools) {
        if (!toolsGrid) return;

        // Clear existing tools
        toolsGrid.innerHTML = '';

        // Show empty state if no tools
        if (tools.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        // Render each tool
        tools.forEach(tool => {
            const toolCard = createToolCard(tool);
            toolsGrid.appendChild(toolCard);
        });
    }

    // Create tool card element
    function createToolCard(tool) {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.setAttribute('data-category', tool.category);
        
        // Status badge
        const statusBadge = tool.status ? 
            `<span class="tool-status ${tool.status}">${tool.status}</span>` : '';

        // Tags
        const tagsHTML = tool.tags.map(tag => 
            `<span class="tool-tag">${tag}</span>`
        ).join('');

        card.innerHTML = `
            <div class="tool-icon">
                ${tool.icon || '🛠️'}
            </div>
            <div class="tool-content">
                <h3 class="tool-title">${tool.title}</h3>
                <p class="tool-description">${tool.description}</p>
                <div class="tool-tags">
                    ${tagsHTML}
                </div>
            </div>
            <div class="tool-action">
                <a href="${tool.url}" class="tool-link" target="_blank" rel="noopener noreferrer">
                    Use Tool
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                </a>
                ${statusBadge}
            </div>
        `;

        // Add click handler to entire card
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on link
            if (!e.target.closest('.tool-link')) {
                window.open(tool.url, '_blank', 'noopener,noreferrer');
            }
        });

        return card;
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for external use (if needed)
    window.ToolsManager = {
        addTool: function(tool) {
            toolsData.push(tool);
            filterTools();
        },
        getTools: function() {
            return toolsData;
        },
        filterByCategory: function(category) {
            currentCategory = category;
            filterTools();
        }
    };
})();
















