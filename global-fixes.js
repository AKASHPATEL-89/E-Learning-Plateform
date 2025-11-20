// Global Project Fixes and Enhancements
(function() {
    'use strict';

    // Fix common JavaScript errors
    window.addEventListener('error', function(e) {
        console.warn('JavaScript Error caught:', e.error);
        return true; // Prevent default error handling
    });

    // Enhanced Mobile Navigation
    function initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });

            // Close menu on link click
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });
        }
    }

    // Fix image loading errors
    function fixImageErrors() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                this.alt = 'Image not found';
            });
        });
    }

    // Enhanced form validation
    function enhanceFormValidation() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
                let isValid = true;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        showInputError(input, 'This field is required');
                        isValid = false;
                    } else {
                        clearInputError(input);
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                }
            });
        });
    }

    function showInputError(input, message) {
        clearInputError(input);
        input.style.borderColor = '#e74c3c';
        
        const error = document.createElement('div');
        error.className = 'input-error';
        error.style.cssText = 'color: #e74c3c; font-size: 12px; margin-top: 5px;';
        error.textContent = message;
        
        input.parentNode.appendChild(error);
    }

    function clearInputError(input) {
        input.style.borderColor = '';
        const error = input.parentNode.querySelector('.input-error');
        if (error) error.remove();
    }

    // Fix dropdown menus
    function fixDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                dropdown.addEventListener('mouseenter', () => {
                    content.style.display = 'block';
                });
                dropdown.addEventListener('mouseleave', () => {
                    content.style.display = 'none';
                });
            }
        });
    }

    // Smooth scrolling for all anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Fix FAQ accordions
    function fixFAQs() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentNode;
                const answer = faqItem.querySelector('.faq-answer');
                
                // Close all other FAQs
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                faqItem.classList.toggle('active');
            });
        });
    }

    // Enhanced search functionality
    function initSearch() {
        const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search" i]');
        
        searchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const container = this.closest('section') || document;
                const cards = container.querySelectorAll('.note-card, .video-card, .product-card, .blog-card, .pyq-card');
                
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    card.style.display = text.includes(searchTerm) ? 'block' : 'none';
                });
            });
        });
    }

    // Fix button interactions
    function fixButtons() {
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.hasAttribute('onclick') && !btn.type === 'submit') {
                btn.addEventListener('click', function(e) {
                    // Add ripple effect
                    const ripple = document.createElement('span');
                    ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255,255,255,0.6);
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => ripple.remove(), 600);
                });
            }
        });
    }

    // Fix carousel if exists
    function fixCarousel() {
        const carousel = document.querySelector('.carousel');
        if (carousel && typeof bootstrap === 'undefined') {
            // Fallback for carousel without Bootstrap
            console.warn('Bootstrap not loaded, carousel may not work properly');
        }
    }

    // Add loading states
    function addLoadingStates() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function() {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Loading...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }
            });
        });
    }

    // Fix responsive images
    function fixResponsiveImages() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.style.maxWidth) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }

    // Add CSS fixes
    function addCSSFixes() {
        const style = document.createElement('style');
        style.textContent = `
            /* Global fixes */
            * { box-sizing: border-box; }
            
            /* Fix overflow issues */
            body { overflow-x: hidden; }
            
            /* Fix mobile menu */
            @media (max-width: 768px) {
                .nav-menu.active {
                    display: flex !important;
                    flex-direction: column;
                }
                
                body.nav-open {
                    overflow: hidden;
                }
            }
            
            /* Button ripple animation */
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            /* Fix form inputs */
            input, select, textarea {
                font-family: inherit;
            }
            
            /* Fix image loading */
            img {
                max-width: 100%;
                height: auto;
            }
            
            /* Smooth transitions */
            * {
                transition: all 0.3s ease;
            }
            
            /* Fix z-index issues */
            .navbar { z-index: 1000; }
            .dropdown-content { z-index: 1001; }
            
            /* Loading state */
            .loading {
                opacity: 0.7;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize all fixes
    function initAllFixes() {
        try {
            initMobileNav();
            fixImageErrors();
            enhanceFormValidation();
            fixDropdowns();
            initSmoothScroll();
            fixFAQs();
            initSearch();
            fixButtons();
            fixCarousel();
            addLoadingStates();
            fixResponsiveImages();
            addCSSFixes();
            
            console.log('✅ All project fixes applied successfully');
        } catch (error) {
            console.warn('⚠️ Some fixes may not have applied:', error);
        }
    }

    // Run fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllFixes);
    } else {
        initAllFixes();
    }

})();