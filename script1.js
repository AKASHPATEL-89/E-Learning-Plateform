// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
});

// Search Functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('#searchInput, #videoSearchInput, #productSearchInput, #blogSearchInput');
    
    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const cards = getCardsForSearch(this.id);
                
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    });
}

function getCardsForSearch(inputId) {
    switch(inputId) {
        case 'searchInput':
            return document.querySelectorAll('.note-card');
        case 'videoSearchInput':
            return document.querySelectorAll('.video-card');
        case 'productSearchInput':
            return document.querySelectorAll('.product-card');
        case 'blogSearchInput':
            return document.querySelectorAll('.blog-card');
        default:
            return [];
    }
}

// Filter Functionality
function initializeFilters() {
    // Subject/Category Filters
    const subjectFilter = document.getElementById('subjectFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const branchFilter = document.getElementById('branchFilter');
    
    if (subjectFilter) {
        subjectFilter.addEventListener('change', function() {
            filterCards('.note-card', 'data-subject', this.value);
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterCards('.video-card, .product-card', 'data-category', this.value);
        });
    }
    
    if (branchFilter) {
        branchFilter.addEventListener('change', function() {
            filterCards('.pyq-card', 'data-branch', this.value);
        });
    }
    
    // Level Filters
    const levelFilter = document.getElementById('levelFilter');
    if (levelFilter) {
        levelFilter.addEventListener('change', function() {
            filterCards('.note-card', 'data-level', this.value);
        });
    }
    
    // Year Filter
    const yearFilter = document.getElementById('yearFilter');
    if (yearFilter) {
        yearFilter.addEventListener('change', function() {
            filterCards('.pyq-card', 'data-year', this.value);
        });
    }
    
    // Duration Filter
    const durationFilter = document.getElementById('durationFilter');
    if (durationFilter) {
        durationFilter.addEventListener('change', function() {
            filterCards('.video-card', 'data-duration', this.value);
        });
    }
    
    // Price Filter
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            filterCards('.product-card', 'data-price', this.value);
        });
    }
}

function filterCards(selector, attribute, value) {
    const cards = document.querySelectorAll(selector);
    
    cards.forEach(card => {
        if (value === '' || card.getAttribute(attribute) === value) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Blog Category Tags
function initializeBlogTags() {
    const tags = document.querySelectorAll('.tag');
    const blogCards = document.querySelectorAll('.blog-card');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            tags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            blogCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const formType = getFormType(form);
            
            // Basic validation
            if (validateForm(form)) {
                handleFormSubmission(formType, formData);
            }
        });
    });
}

function getFormType(form) {
    if (form.closest('#loginForm')) return 'login';
    if (form.closest('#registerForm')) return 'register';
    if (form.closest('#forgotPasswordForm')) return 'forgot-password';
    if (form.closest('#contactForm')) return 'contact';
    if (form.classList.contains('newsletter-form')) return 'newsletter';
    return 'unknown';
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    // Password confirmation
    const password = form.querySelector('#registerPassword');
    const confirmPassword = form.querySelector('#confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        showFieldError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#e74c3c';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e9ecef';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleFormSubmission(formType, formData) {
    // Show loading state
    showNotification('Processing...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        switch(formType) {
            case 'login':
                showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                break;
            case 'register':
                showNotification('Account created successfully! Please check your email.', 'success');
                break;
            case 'forgot-password':
                showNotification('Password reset link sent to your email.', 'success');
                break;
            case 'contact':
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                break;
            case 'newsletter':
                showNotification('Successfully subscribed to newsletter!', 'success');
                break;
            default:
                showNotification('Form submitted successfully!', 'success');
        }
    }, 1000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Branch Selection
function initializeBranchSelection() {
    const branchCards = document.querySelectorAll('.branch-card');
    
    branchCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function() {
                const branch = card.getAttribute('data-branch');
                showSemesterNotes(branch);
            });
        }
    });
}

function showSemesterNotes(branch) {
    // Hide all semester sections
    const semesterSections = document.querySelectorAll('.semester-notes');
    semesterSections.forEach(section => section.style.display = 'none');
    
    // Show selected branch section
    const targetSection = document.getElementById(`${branch}-notes`);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more .btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more products
            showNotification('Loading more products...', 'info');
            
            setTimeout(() => {
                showNotification('More products loaded!', 'success');
                // Here you would typically load more content via AJAX
            }, 1000);
        });
    }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar Background on Scroll
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

// Animation on Scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .note-card, .pyq-card, .video-card, .product-card, .blog-card, .team-member, .testimonial-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Video Player Functionality
function initializeVideoPlayers() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        
        if (playButton) {
            playButton.addEventListener('click', function() {
                // In a real application, this would open a video player modal
                showNotification('Video player would open here', 'info');
            });
        }
    });
}

// Product Actions
function initializeProductActions() {
    const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            showNotification(`${productName} added to cart!`, 'success');
            
            // Add visual feedback
            this.textContent = 'Added!';
            this.style.background = '#27ae60';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '';
            }, 2000);
        });
    });
}

// Download Functionality
function initializeDownloads() {
    const downloadButtons = document.querySelectorAll('a[href*=".pdf"], .btn[data-action="download"]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.includes('.pdf')) {
                showNotification('Download started...', 'success');
            } else {
                e.preventDefault();
                showNotification('Download functionality would be implemented here', 'info');
            }
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeFilters();
    initializeBlogTags();
    initializeFAQ();
    initializeFormValidation();
    initializeBranchSelection();
    initializeLoadMore();
    initializeSmoothScrolling();
    initializeNavbarScroll();
    initializeScrollAnimations();
    initializeVideoPlayers();
    initializeProductActions();
    initializeDownloads();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    /* Loading Overlay */
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .loading-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Admin Login Modal */
    .admin-login-content {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        width: 90%;
        max-width: 400px;
        position: relative;
        animation: slideInUp 0.4s ease;
    }
    
    .close-admin {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 24px;
        cursor: pointer;
        color: #999;
        transition: color 0.3s ease;
    }
    
    .close-admin:hover {
        color: #dc3545;
    }
    
    .admin-login-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .admin-login-header i {
        font-size: 3rem;
        color: #dc3545;
        margin-bottom: 1rem;
    }
    
    .admin-login-header h3 {
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .admin-login-header p {
        color: #666;
        margin: 0;
    }
    
    .admin-input-group {
        position: relative;
        margin-bottom: 1.5rem;
    }
    
    .admin-input-group i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
    }
    
    .admin-input-group input {
        width: 100%;
        padding: 12px 15px 12px 45px;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .admin-input-group input:focus {
        outline: none;
        border-color: #dc3545;
    }
    
    .admin-login-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .admin-login-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Add loading overlay to body
const loadingOverlay = document.createElement('div');
loadingOverlay.className = 'loading-overlay';
loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
document.body.appendChild(loadingOverlay);

// Show loading function
function showLoading() {
    loadingOverlay.classList.add('active');
}

// Hide loading function
function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Page load animation
window.addEventListener('load', function() {
    hideLoading();
    document.body.style.opacity = '1';
});

// Show loading on page start
document.body.style.opacity = '0';
showLoading();

// Admin Authentication
function showAdminLogin() {
    const modal = document.createElement('div');
    modal.className = 'admin-login-modal';
    modal.innerHTML = `
        <div class="admin-login-content">
            <span class="close-admin" onclick="closeAdminLogin()">&times;</span>
            <div class="admin-login-header">
                <i class="fas fa-shield-alt"></i>
                <h3>Admin Access</h3>
                <p>Please enter admin credentials</p>
            </div>
            <form id="adminLoginForm">
                <div class="admin-input-group">
                    <i class="fas fa-user"></i>
                    <input type="text" id="adminUsername" placeholder="Username" required>
                </div>
                <div class="admin-input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="adminPassword" placeholder="Password" required>
                </div>
                <button type="submit" class="admin-login-btn">Access Admin Panel</button>
            </form>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        if (username === 'admin' && password === 'admin123') {
            sessionStorage.setItem('adminLoggedIn', 'true');
            closeAdminLogin();
            window.location.href = 'admin.html';
        } else {
            showNotification('Invalid credentials! Try: admin/admin123', 'error');
        }
    });
}

function closeAdminLogin() {
    const modal = document.querySelector('.admin-login-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

// Admin logout function
function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminLoggedIn');
        showNotification('Logged out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Check admin access on admin page
if (window.location.pathname.includes('admin.html')) {
    if (!sessionStorage.getItem('adminLoggedIn')) {
        alert('Unauthorized access! Redirecting to home page.');
        window.location.href = 'index.html';
    }
}

