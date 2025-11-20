// Light/Dark Mode Toggle
(function() {
    'use strict';

    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        createThemeToggle();
    }

    function createThemeToggle() {
        // Add theme toggle to navbar
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const themeToggle = document.createElement('li');
            themeToggle.className = 'nav-item theme-toggle-item';
            themeToggle.innerHTML = `
                <button class="theme-toggle" onclick="toggleTheme()" title="Toggle theme">
                    <i class="fas fa-moon" id="themeIcon"></i>
                </button>
            `;
            
            // Insert before login button or user menu
            const loginItem = navMenu.querySelector('.login-btn')?.parentElement || 
                             navMenu.querySelector('.user-menu') || 
                             navMenu.lastElementChild;
            
            if (loginItem) {
                navMenu.insertBefore(themeToggle, loginItem);
            } else {
                navMenu.appendChild(themeToggle);
            }
        }
        
        updateThemeIcon();
        addThemeStyles();
    }

    function addThemeStyles() {
        if (document.getElementById('themeStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'themeStyles';
        style.textContent = `
            /* Theme Toggle Button */
            .theme-toggle {
                background: none;
                border: 2px solid #667eea;
                color: #667eea;
                padding: 8px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .theme-toggle:hover {
                background: #667eea;
                color: white;
                transform: scale(1.1);
            }
            
            /* Enhanced Theme Variables */
            :root {
                --bg-color: #ffffff;
                --bg-secondary: #f8f9fa;
                --text-color: #333333;
                --text-secondary: #666666;
                --card-bg: #ffffff;
                --border-color: #e9ecef;
                --navbar-bg: rgba(255, 255, 255, 0.95);
                --footer-bg: #2c3e50;
                --input-bg: #ffffff;
                --shadow: rgba(0, 0, 0, 0.1);
                --shadow-hover: rgba(0, 0, 0, 0.15);
                --accent-color: #667eea;
                --accent-hover: #5a6fd8;
            }
            
            [data-theme="dark"] {
                --bg-color: #0f0f0f;
                --bg-secondary: #1a1a1a;
                --text-color: #ffffff;
                --text-secondary: #ffffff;
                --card-bg: #1e1e1e;
                --border-color: #333333;
                --navbar-bg: rgba(15, 15, 15, 0.95);
                --footer-bg: #0a0a0a;
                --input-bg: #252525;
                --shadow: rgba(0, 0, 0, 0.5);
                --shadow-hover: rgba(0, 0, 0, 0.7);
                --accent-color: #7c8aed;
                --accent-hover: #8a96f0;
            }
            
            /* Enhanced Theme Application */
            body {
                background-color: var(--bg-color);
                color: var(--text-color);
                transition: all 0.3s ease;
            }
            
            .navbar {
                background: var(--navbar-bg);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid var(--border-color);
            }
            
            .features {
                background: var(--bg-secondary);
            }
            
            .feature-card,
            .note-card,
            .video-card,
            .product-card,
            .blog-card,
            .auth-form-container,
            .contact-form-container,
            .contact-info-container,
            .faq-item,
            .testimonial-card,
            .team-member {
                background: var(--card-bg);
                color: var(--text-color);
                box-shadow: 0 5px 20px var(--shadow);
                border: 1px solid var(--border-color);
            }
            
            .feature-card:hover,
            .note-card:hover,
            .video-card:hover,
            .product-card:hover,
            .blog-card:hover {
                box-shadow: 0 15px 40px var(--shadow-hover);
            }
            
            .dropdown-content {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                backdrop-filter: blur(20px);
            }
            
            .dropdown-content a {
                color: var(--text-color);
            }
            
            input, select, textarea {
                background: var(--input-bg);
                color: var(--text-color);
                border-color: var(--border-color);
            }
            
            input:focus, select:focus, textarea:focus {
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(124, 138, 237, 0.1);
            }
            
            .footer {
                background: var(--footer-bg);
                border-top: 1px solid var(--border-color);
            }
            
            .page-header {
                border-bottom: 1px solid var(--border-color);
            }
            
            /* Force ALL text to be white in dark mode */
            [data-theme="dark"] * {
                color: #ffffff !important;
            }
            
            [data-theme="dark"] .nav-logo {
                color: #7c8aed !important;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%);
            }
            
            .login-btn {
                background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%);
            }
            
            [data-theme="dark"] .theme-toggle {
                border-color: #ffd700;
                color: #ffd700;
                background: rgba(255, 215, 0, 0.1);
            }
            
            [data-theme="dark"] .theme-toggle:hover {
                background: #ffd700;
                color: #0f0f0f;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
            }
            
            [data-theme="light"] .theme-toggle {
                border-color: #4a5568;
                color: #4a5568;
                background: rgba(74, 85, 104, 0.1);
            }
            
            [data-theme="light"] .theme-toggle:hover {
                background: #4a5568;
                color: white;
            }
            
            /* Enhanced gradients for dark mode */
            [data-theme="dark"] .hero {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            }
            
            [data-theme="dark"] .stats {
                background: linear-gradient(135deg, #2d1b69 0%, #11998e 100%);
            }
            
            [data-theme="dark"] .cta {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            
            /* Improved contrast */
            [data-theme="dark"] .feature-icon,
            [data-theme="dark"] .contact-icon,
            [data-theme="dark"] .value-icon {
                background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%);
            }
            
            /* Better scrollbar for dark mode */
            [data-theme="dark"] ::-webkit-scrollbar {
                width: 8px;
            }
            
            [data-theme="dark"] ::-webkit-scrollbar-track {
                background: var(--bg-secondary);
            }
            
            [data-theme="dark"] ::-webkit-scrollbar-thumb {
                background: var(--border-color);
                border-radius: 4px;
            }
            
            [data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
                background: var(--accent-color);
            }
            
            /* Mobile theme toggle */
            @media (max-width: 768px) {
                .theme-toggle-item {
                    order: -1;
                    margin-bottom: 1rem;
                }
            }
            
            /* Smooth transitions for theme change */
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    function updateThemeIcon() {
        const themeIcon = document.getElementById('themeIcon');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (themeIcon) {
            if (currentTheme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }

    // Global toggle function
    window.toggleTheme = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

})();