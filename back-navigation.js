// 5-Step Back Navigation System
(function() {
    'use strict';

    let navigationHistory = [];
    const maxHistoryLength = 5;

    // Initialize navigation tracking
    function initBackNavigation() {
        // Add current page to history
        addToHistory(window.location.href, document.title);
        
        // Create back navigation UI
        createBackNavigationUI();
        
        // Track page changes
        trackPageChanges();
    }

    function addToHistory(url, title) {
        const historyItem = {
            url: url,
            title: title || 'Page',
            timestamp: Date.now()
        };
        
        // Remove if already exists
        navigationHistory = navigationHistory.filter(item => item.url !== url);
        
        // Add to beginning
        navigationHistory.unshift(historyItem);
        
        // Keep only last 5 items
        if (navigationHistory.length > maxHistoryLength) {
            navigationHistory = navigationHistory.slice(0, maxHistoryLength);
        }
        
        updateBackNavigationUI();
    }

    function createBackNavigationUI() {
        const backNav = document.createElement('div');
        backNav.id = 'backNavigation';
        backNav.innerHTML = `
            <div class="back-nav-container">
                <button class="back-nav-toggle" onclick="toggleBackNav()">
                    <i class="fas fa-history"></i>
                    <span class="back-count">0</span>
                </button>
                <div class="back-nav-dropdown" id="backNavDropdown">
                    <div class="back-nav-header">Recent Pages</div>
                    <div class="back-nav-list" id="backNavList"></div>
                </div>
            </div>
        `;
        
        // Add CSS
        const style = document.createElement('style');
        style.textContent = `
            #backNavigation {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 999;
            }
            
            .back-nav-toggle {
                background: #667eea;
                color: white;
                border: none;
                padding: 12px;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
                position: relative;
            }
            
            .back-nav-toggle:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
            }
            
            .back-count {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #e74c3c;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }
            
            .back-nav-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 8px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                min-width: 250px;
                max-height: 300px;
                overflow-y: auto;
                display: none;
                margin-top: 10px;
            }
            
            .back-nav-dropdown.show {
                display: block;
                animation: slideDown 0.3s ease;
            }
            
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .back-nav-header {
                padding: 15px;
                border-bottom: 1px solid #eee;
                font-weight: 600;
                color: #333;
            }
            
            .back-nav-item {
                padding: 12px 15px;
                border-bottom: 1px solid #f5f5f5;
                cursor: pointer;
                transition: background 0.2s ease;
            }
            
            .back-nav-item:hover {
                background: #f8f9fa;
            }
            
            .back-nav-item:last-child {
                border-bottom: none;
            }
            
            .back-nav-title {
                font-weight: 500;
                color: #333;
                margin-bottom: 4px;
            }
            
            .back-nav-url {
                font-size: 12px;
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            .back-nav-time {
                font-size: 11px;
                color: #999;
                margin-top: 2px;
            }
            
            @media (max-width: 768px) {
                #backNavigation {
                    top: 80px;
                    right: 15px;
                }
                
                .back-nav-dropdown {
                    min-width: 200px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(backNav);
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!backNav.contains(e.target)) {
                document.getElementById('backNavDropdown').classList.remove('show');
            }
        });
    }

    function updateBackNavigationUI() {
        const backCount = document.querySelector('.back-count');
        const backNavList = document.getElementById('backNavList');
        
        if (backCount) {
            backCount.textContent = Math.max(0, navigationHistory.length - 1);
        }
        
        if (backNavList) {
            backNavList.innerHTML = '';
            
            // Skip current page (first item)
            const historyToShow = navigationHistory.slice(1);
            
            if (historyToShow.length === 0) {
                backNavList.innerHTML = '<div style="padding: 15px; color: #999; text-align: center;">No previous pages</div>';
                return;
            }
            
            historyToShow.forEach((item, index) => {
                const navItem = document.createElement('div');
                navItem.className = 'back-nav-item';
                navItem.onclick = () => navigateToPage(item.url);
                
                const timeAgo = getTimeAgo(item.timestamp);
                const pageTitle = getPageTitle(item.url);
                
                navItem.innerHTML = `
                    <div class="back-nav-title">${pageTitle}</div>
                    <div class="back-nav-url">${getShortUrl(item.url)}</div>
                    <div class="back-nav-time">${timeAgo}</div>
                `;
                
                backNavList.appendChild(navItem);
            });
        }
    }

    function getPageTitle(url) {
        const titles = {
            'index.html': 'Home',
            'login.html': 'Login',
            'contact.html': 'Contact',
            'about.html': 'About',
            'notes.html': 'Notes',
            'videos.html': 'Videos',
            'products.html': 'Products',
            'blog.html': 'Blog',
            'gate-pyq.html': 'GATE PYQ',
            'btech-notes.html': 'BTech Notes',
            'admin.html': 'Admin Panel'
        };
        
        const filename = url.split('/').pop().split('?')[0];
        return titles[filename] || 'Page';
    }

    function getShortUrl(url) {
        const filename = url.split('/').pop();
        return filename.length > 30 ? filename.substring(0, 27) + '...' : filename;
    }

    function getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }

    function navigateToPage(url) {
        window.location.href = url;
    }

    function trackPageChanges() {
        // Track link clicks
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.startsWith('#') && !link.href.startsWith('javascript:')) {
                // Don't add external links
                if (link.href.startsWith(window.location.origin)) {
                    setTimeout(() => {
                        addToHistory(link.href, link.textContent || getPageTitle(link.href));
                    }, 100);
                }
            }
        });
    }

    // Global functions
    window.toggleBackNav = function() {
        const dropdown = document.getElementById('backNavDropdown');
        dropdown.classList.toggle('show');
    };

    window.goBack = function(steps = 1) {
        if (navigationHistory.length > steps) {
            const targetPage = navigationHistory[steps];
            navigateToPage(targetPage.url);
        } else {
            window.history.back();
        }
    };

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + Left Arrow = Go back 1 step
        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            goBack(1);
        }
        
        // Alt + H = Show history
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            toggleBackNav();
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackNavigation);
    } else {
        initBackNavigation();
    }

})();