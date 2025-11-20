// User Authentication State Management
(function() {
    'use strict';

    // Check login state on page load
    function checkAuthState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userEmail = localStorage.getItem('userEmail');
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        
        if (isLoggedIn || isAdmin) {
            const username = getUsernameFromEmail(userEmail) || 'User';
            updateNavbarForLoggedInUser(username, isAdmin);
        }
    }

    function getUsernameFromEmail(email) {
        if (!email) return null;
        return email.split('@')[0];
    }

    function updateNavbarForLoggedInUser(username, isAdmin = false) {
        const loginBtn = document.querySelector('.login-btn');
        
        if (loginBtn) {
            // Replace login button with user greeting and logout
            const userMenu = document.createElement('li');
            userMenu.className = 'nav-item user-menu';
            userMenu.innerHTML = `
                <div class="user-dropdown">
                    <span class="user-greeting">Hello, ${username}</span>
                    <div class="user-dropdown-content">
                        ${isAdmin ? '<a href="admin.html">Admin Panel</a>' : ''}
                        <a href="#" onclick="logout()">Logout</a>
                    </div>
                </div>
            `;
            
            // Replace the login button's parent li
            loginBtn.parentElement.replaceWith(userMenu);
            
            // Add CSS for user menu
            addUserMenuStyles();
        }
    }

    function addUserMenuStyles() {
        if (document.getElementById('userMenuStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'userMenuStyles';
        style.textContent = `
            .user-menu {
                position: relative;
            }
            
            .user-dropdown {
                position: relative;
                cursor: pointer;
            }
            
            .user-greeting {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-weight: 500;
                display: inline-block;
                transition: all 0.3s ease;
            }
            
            .user-greeting:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            }
            
            .user-dropdown-content {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                min-width: 150px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                border-radius: 8px;
                padding: 0.5rem 0;
                z-index: 1001;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                margin-top: 10px;
            }
            
            .user-dropdown:hover .user-dropdown-content {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .user-dropdown-content a {
                display: block;
                padding: 0.5rem 1rem;
                color: #333;
                text-decoration: none;
                transition: background 0.3s ease;
            }
            
            .user-dropdown-content a:hover {
                background: #f8f9fa;
                color: #667eea;
            }
            
            @media (max-width: 768px) {
                .user-dropdown-content {
                    position: static;
                    opacity: 1;
                    visibility: visible;
                    transform: none;
                    box-shadow: none;
                    background: transparent;
                    margin-top: 0;
                }
                
                .user-greeting {
                    display: block;
                    text-align: center;
                    margin-bottom: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Global logout function
    window.logout = function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userRole');
        
        alert('Logged out successfully!');
        window.location.reload();
    };

    // Enhanced login function for login page
    window.handleLogin = function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const urlParams = new URLSearchParams(window.location.search);
        const isAdminLogin = urlParams.get('admin') === 'true';
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        if (isAdminLogin) {
            if (email === 'admin@edu.com' && password === 'admin123') {
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userEmail', email);
                alert('Admin login successful!');
                window.location.href = 'admin.html';
            } else {
                alert('Invalid admin credentials!\\nEmail: admin@edu.com\\nPassword: admin123');
            }
        } else {
            // Demo regular user login
            if (email && password.length >= 6) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials or password too short (min 6 characters)');
            }
        }
    };

    // Initialize auth state check
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAuthState);
    } else {
        checkAuthState();
    }

})();