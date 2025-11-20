/**
 * Projects Page JavaScript
 * Handles project filtering and rendering
 */

(function() {
    'use strict';

    // Sample projects data - Replace with your actual projects
    const projectsData = [
        {
            id: 1,
            title: 'Personal Brand Website',
            description: 'A modern, responsive personal brand website showcasing AI, Tech, and Marketing expertise. Built with clean code and optimized for performance.',
            category: 'web',
            image: 'assets/images/hero-section-image.png',
            url: '#',
            caseStudyUrl: '#',
            year: '2024',
            client: 'Personal Project',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            badge: 'featured',
            hasCaseStudy: true
        },
        {
            id: 2,
            title: 'AI-Powered Marketing Automation',
            description: 'Developed an AI-driven marketing automation system that increased client engagement by 300% and reduced manual work by 80%.',
            category: 'ai',
            image: 'assets/images/hero-section-image.png',
            url: '#',
            caseStudyUrl: '#',
            year: '2024',
            client: 'Tech Startup',
            tech: ['AI', 'Python', 'Machine Learning', 'API Integration'],
            badge: 'case-study',
            hasCaseStudy: true
        },
        {
            id: 3,
            title: 'E-commerce Growth Strategy',
            description: 'Implemented a comprehensive marketing strategy that grew online sales by 250% in 6 months through data-driven campaigns and optimization.',
            category: 'marketing',
            image: 'assets/images/hero-section-image.png',
            url: '#',
            caseStudyUrl: '#',
            year: '2024',
            client: 'E-commerce Brand',
            tech: ['Marketing', 'Analytics', 'SEO', 'PPC'],
            badge: 'case-study',
            hasCaseStudy: true
        },
        {
            id: 4,
            title: 'Business Process Automation Platform',
            description: 'Created a custom automation platform that streamlined operations, saving 20+ hours per week and improving team productivity significantly.',
            category: 'tech',
            image: 'assets/images/hero-section-image.png',
            url: '#',
            caseStudyUrl: '#',
            year: '2024',
            client: 'SaaS Company',
            tech: ['Automation', 'Node.js', 'Database', 'API'],
            badge: 'new',
            hasCaseStudy: false
        },
        {
            id: 5,
            title: 'AI Content Generation Tool',
            description: 'Built an AI-powered content generation tool that helps marketers create high-quality content 10x faster with AI assistance.',
            category: 'ai',
            image: 'assets/images/hero-section-image.png',
            url: '#',
            caseStudyUrl: '#',
            year: '2024',
            client: 'Marketing Agency',
            tech: ['AI', 'OpenAI API', 'React', 'Node.js'],
            badge: 'featured',
            hasCaseStudy: true
        },
        {
            id: 6,
            title: 'SaaS Landing Page Redesign',
            description: 'Redesigned a SaaS landing page with conversion optimization, resulting in 40% increase in sign-ups and improved user experience.',
            category: 'web',
            image: 'assets/images/hero-section-image.png',
            url: '#',
            caseStudyUrl: '#',
            year: '2023',
            client: 'SaaS Startup',
            tech: ['Web Design', 'Conversion Optimization', 'A/B Testing'],
            badge: null,
            hasCaseStudy: false
        },
        {
            id: 7,
            title: 'Social Media Marketing Campaign',
            description: 'Developed and executed a multi-platform social media campaign that increased brand awareness by 400% and drove significant traffic.',
            category: 'marketing',
            image: 'assets/images/hero-section-image.png',
            url: '#',
            caseStudyUrl: '#',
            year: '2024',
            client: 'B2B Company',
            tech: ['Social Media', 'Content Strategy', 'Analytics'],
            badge: 'case-study',
            hasCaseStudy: true
        },
        {
            id: 8,
            title: 'Data Analytics Dashboard',
            description: 'Created a comprehensive analytics dashboard that provides real-time insights and helps businesses make data-driven decisions.',
            category: 'tech',
            image: 'assets/images/hero-section-image.png',
            url: '#',
            caseStudyUrl: '#',
            year: '2024',
            client: 'Enterprise Client',
            tech: ['Data Visualization', 'React', 'Python', 'APIs'],
            badge: null,
            hasCaseStudy: false
        }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('projectsEmptyState');
    const categoryFilters = document.querySelectorAll('.project-category-filter');
    let currentCategory = 'all';

    // Initialize
    function init() {
        renderProjects(projectsData);
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
                
                // Filter and render projects
                filterProjects();
            });
        });
    }

    // Filter projects by category
    function filterProjects() {
        let filteredProjects;
        
        if (currentCategory === 'all') {
            filteredProjects = projectsData;
        } else if (currentCategory === 'case-study') {
            filteredProjects = projectsData.filter(project => project.hasCaseStudy === true);
        } else {
            filteredProjects = projectsData.filter(project => project.category === currentCategory);
        }
        
        renderProjects(filteredProjects);
    }

    // Render projects
    function renderProjects(projects) {
        if (!projectsGrid) return;

        // Clear existing projects
        projectsGrid.innerHTML = '';

        // Show empty state if no projects
        if (projects.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        // Render each project
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }

    // Create project card element
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);
        
        // Badge
        const badgeHTML = project.badge ? 
            `<span class="project-badge ${project.badge}">${project.badge === 'case-study' ? 'Case Study' : project.badge === 'featured' ? 'Featured' : 'New'}</span>` : '';

        // Tech tags
        const techHTML = project.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Action buttons
        let actionsHTML = '';
        if (project.hasCaseStudy && project.caseStudyUrl) {
            actionsHTML = `
                <a href="${project.caseStudyUrl}" class="project-link case-study-link" onclick="event.stopPropagation()">
                    View Case Study
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                </a>
            `;
        }
        if (project.url) {
            actionsHTML += `
                <a href="${project.url}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                    View Project
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                </a>
            `;
        }

        card.innerHTML = `
            <div class="project-image-wrapper">
                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                <div class="project-overlay"></div>
                ${badgeHTML}
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                </div>
                <div class="project-tech">
                    ${techHTML}
                </div>
                <div class="project-meta">
                    ${project.year ? `<span class="project-year">${project.year}</span>` : ''}
                    ${project.client ? `<span class="project-client">${project.client}</span>` : ''}
                </div>
                ${actionsHTML ? `<div class="project-actions">${actionsHTML}</div>` : ''}
            </div>
        `;

        // Add click handler to card (opens case study if available, otherwise project)
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on links
            if (!e.target.closest('.project-link')) {
                const url = project.hasCaseStudy && project.caseStudyUrl ? project.caseStudyUrl : project.url;
                if (url && url !== '#') {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
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
    window.ProjectsManager = {
        addProject: function(project) {
            projectsData.push(project);
            filterProjects();
        },
        getProjects: function() {
            return projectsData;
        },
        filterByCategory: function(category) {
            currentCategory = category;
            filterProjects();
        }
    };
})();


















