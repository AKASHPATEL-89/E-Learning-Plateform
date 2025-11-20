// Admin Panel JavaScript

// File structure data
const fileStructure = {
    'gate PYQ': [
        '2015CS_S05_AnswerKey.pdf', '2016CS-1_AnsKey.pdf', '2019_CS_Paper1.pdf', '2019-Keys1.pdf',
        '2021-CS1-Answer-Keys.pdf', 'CS 2024 FinalAnswerKey.pdf', 'GATE-2022-Answer key.pdf',
        'GATE-2022-part-1.pdf', 'GATE-2023 CS.pdf', 'gate-2023-Answer-Key1.pdf',
        'GATE-CS-2020-Official-Keys.pdf', 'GATE-CS-2020-Original-Paper.pdf', 'GATE-CS-2024 set 1.pdf',
        'GATE-CS-2025-Set-1-Answer-Key.pdf', 'GATE-CS-2025-Set-1.pdf', 'GATE2015-Set-1.pdf',
        'GATE2016-Set-1.pdf', 'GATE2017-AnswerKey.pdf', 'GATE2017-Set-1_.pdf', 'GATE2018.pdf',
        'GATE2021_QP_CS-1.pdf', 'Keys2018.pdf'
    ],
    'ECE pyq': [
        '2019 ANSWER.pdf', '2019 QUES.pdf', '2020 ANSWER.pdf', '2020 QUES.pdf',
        '2021 ANWERKEY.pdf', '2021 QUES.pdf', '2022 ANSWERKEY.pdf', 'EC 2023 Ques.pdf',
        'EC2023 AnswerKEY.pdf', 'ECE 2022QUES.pdf'
    ],
    'Resourses': [
        'AI.pdf', 'C++ PW.pdf', 'Calculus.pdf', 'Circuit Analysis.pdf', 'CSS Notes.pdf',
        'Data Structure.pdf', 'DBMS series part-1.pdf', 'HTML.pdf', 'Java Programming.pdf',
        'Machine_Learning.pdf', 'Mechanics Basics.pdf', 'mySql notes.pdf', 'Organic chemistry.pdf',
        'PYTHON PROGRAMMING NOTES.pdf', 'Thermodynamics Basics.pdf'
    ],
    'Images': [
        '10 Effective Study Techniques for GATE Preparation.jpg', 'Abhay.webp', 'AI Images.jpg',
        'AI-in-Education.webp', 'akash.jpg', 'Anita Singh.webp', 'apptitude.jpg',
        'Best Programming Languages to Learn in 2024.webp', 'Career_Opportunities_after_BTech.jpg',
        'DataStructureHandbook.jpg', 'David Kumar.webp', 'DBMS.jpg', 'Dr. Sarah Johnson.webp',
        'Emily Rodriguez.webp', 'GATE-Mock-Test-.gif', 'How to Create an Effective Study Schedule.webp'
    ]
};

// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: '10 Effective Study Techniques for GATE Preparation',
        category: 'Study Tips',
        date: 'December 15, 2024',
        status: 'Published',
        author: 'Admin'
    },
    {
        id: 2,
        title: 'Top Career Opportunities After BTech in Computer Science',
        category: 'Career Guidance',
        date: 'December 12, 2024',
        status: 'Published',
        author: 'Dr. Sarah Johnson'
    },
    {
        id: 3,
        title: 'How to Create an Effective Study Schedule',
        category: 'Study Tips',
        date: 'December 10, 2024',
        status: 'Published',
        author: 'Prof. Michael Chen'
    },
    {
        id: 4,
        title: 'The Future of AI in Education',
        category: 'Technology',
        date: 'December 8, 2024',
        status: 'Published',
        author: 'Emily Rodriguez'
    }
];

// Sample users data
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-01-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', date: '2024-02-01', status: 'Inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', date: '2024-02-10', status: 'Active' }
];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    updateStats();
    loadDashboard();
});

function initializeAdmin() {
    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update page title
            document.getElementById('page-title').textContent = 
                this.textContent.replace(/^\s*\S+\s*/, '').trim();
        });
    });

    // Modal handling
    const modal = document.getElementById('uploadModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showSection(sectionId) {
    // Hide all sections with fade out
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.classList.remove('active');
        }, 150);
    });
    
    // Show selected section with fade in
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        setTimeout(() => {
            targetSection.classList.add('active');
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 50);
        }, 150);
        
        // Load section-specific content
        switch(sectionId) {
            case 'files':
                loadFileManager();
                break;
            case 'resources':
                loadResources();
                break;
            case 'pyq':
                loadPYQ();
                break;
            case 'blog':
                loadBlogPosts();
                break;
            case 'users':
                loadUsers();
                break;
        }
    }
}

function updateStats() {
    // Update file counts
    document.getElementById('gate-count').textContent = fileStructure['gate PYQ'].length;
    document.getElementById('ece-count').textContent = fileStructure['ECE pyq'].length;
    document.getElementById('resources-count').textContent = fileStructure['Resourses'].length;
    document.getElementById('images-count').textContent = fileStructure['Images'].length;
    
    // Update dashboard stats
    const totalFiles = Object.values(fileStructure).reduce((sum, files) => sum + files.length, 0);
    document.getElementById('total-files').textContent = totalFiles;
    document.getElementById('total-resources').textContent = fileStructure['Resourses'].length;
}

function loadDashboard() {
    // Dashboard is already loaded in HTML
    console.log('Dashboard loaded');
}

function loadFileManager() {
    updateStats();
}

function loadFolder(folderName) {
    const fileList = document.getElementById('file-list');
    const files = fileStructure[folderName] || [];
    
    if (files.length === 0) {
        fileList.innerHTML = '<p>No files found in this folder</p>';
        return;
    }
    
    let html = '<h4>' + folderName + '</h4>';
    files.forEach(file => {
        const fileType = file.split('.').pop().toLowerCase();
        const icon = getFileIcon(fileType);
        
        html += `
            <div class="file-item">
                <div class="file-info">
                    <i class="${icon}"></i>
                    <span>${file}</span>
                </div>
                <div class="file-actions">
                    <button class="btn btn-primary" onclick="downloadFile('${folderName}', '${file}')">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteFile('${folderName}', '${file}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    fileList.innerHTML = html;
}

function getFileIcon(fileType) {
    const icons = {
        'pdf': 'fas fa-file-pdf',
        'jpg': 'fas fa-image',
        'jpeg': 'fas fa-image',
        'png': 'fas fa-image',
        'gif': 'fas fa-image',
        'webp': 'fas fa-image',
        'avif': 'fas fa-image'
    };
    return icons[fileType] || 'fas fa-file';
}

function loadResources() {
    const resourcesGrid = document.getElementById('resources-grid');
    const resources = fileStructure['Resourses'];
    
    let html = '';
    resources.forEach(resource => {
        const subject = resource.replace('.pdf', '').replace(/[_-]/g, ' ');
        html += `
            <div class="resource-card">
                <div class="resource-header">
                    <h4>${subject}</h4>
                </div>
                <div class="resource-body">
                    <p>PDF Resource - ${resource}</p>
                    <div class="resource-actions">
                        <button class="btn btn-primary" onclick="viewResource('${resource}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-secondary" onclick="downloadFile('Resourses', '${resource}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    resourcesGrid.innerHTML = html;
}

function loadPYQ() {
    switchPYQTab('gate');
}

function switchPYQTab(type) {
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const pyqContent = document.getElementById('pyq-content');
    const folderName = type === 'gate' ? 'gate PYQ' : 'ECE pyq';
    const files = fileStructure[folderName];
    
    let html = `<h4>${type.toUpperCase()} Previous Year Questions</h4>`;
    files.forEach(file => {
        const year = extractYear(file);
        const isAnswer = file.toLowerCase().includes('answer') || file.toLowerCase().includes('key');
        
        html += `
            <div class="file-item">
                <div class="file-info">
                    <i class="fas fa-file-pdf"></i>
                    <div>
                        <strong>${file}</strong>
                        <div class="file-meta">
                            <span class="badge ${isAnswer ? 'badge-success' : 'badge-primary'}">
                                ${isAnswer ? 'Answer Key' : 'Question Paper'}
                            </span>
                            ${year ? `<span class="year">Year: ${year}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="file-actions">
                    <button class="btn btn-primary" onclick="viewFile('${folderName}', '${file}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-secondary" onclick="downloadFile('${folderName}', '${file}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        `;
    });
    
    pyqContent.innerHTML = html;
}

function extractYear(filename) {
    const yearMatch = filename.match(/20\d{2}/);
    return yearMatch ? yearMatch[0] : null;
}

function loadBlogPosts() {
    const blogList = document.getElementById('blog-list');
    
    let html = '';
    blogPosts.forEach(post => {
        html += `
            <div class="blog-item">
                <div class="blog-info">
                    <h4>${post.title}</h4>
                    <div class="blog-meta">
                        <span>Category: ${post.category}</span> | 
                        <span>Date: ${post.date}</span> | 
                        <span>Author: ${post.author}</span> | 
                        <span class="status ${post.status.toLowerCase()}">${post.status}</span>
                    </div>
                </div>
                <div class="blog-actions">
                    <button class="btn btn-primary" onclick="editBlogPost(${post.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deleteBlogPost(${post.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    });
    
    blogList.innerHTML = html;
}

function loadUsers() {
    const usersTable = document.getElementById('users-tbody');
    
    let html = '';
    users.forEach(user => {
        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.date}</td>
                <td><span class="status ${user.status.toLowerCase()}">${user.status}</span></td>
                <td>
                    <button class="btn btn-primary" onclick="editUser(${user.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    usersTable.innerHTML = html;
}

// Action functions
function refreshData() {
    updateStats();
    const activeSection = document.querySelector('.admin-section.active');
    if (activeSection) {
        const sectionId = activeSection.id;
        showSection(sectionId);
    }
    showNotification('Data refreshed successfully!', 'success');
}

function uploadFile() {
    document.getElementById('uploadModal').style.display = 'block';
}

function addResource() {
    showNotification('Add Resource functionality would be implemented here', 'info');
}

function addPYQ() {
    showNotification('Add PYQ functionality would be implemented here', 'info');
}

function addBlogPost() {
    showNotification('Add Blog Post functionality would be implemented here', 'info');
}

function downloadFile(folder, filename) {
    showNotification(`Downloading ${filename} from ${folder}`, 'info');
}

function deleteFile(folder, filename) {
    if (confirm(`Are you sure you want to delete ${filename}?`)) {
        showNotification(`${filename} deleted successfully`, 'success');
    }
}

function viewFile(folder, filename) {
    showNotification(`Opening ${filename}`, 'info');
}

function viewResource(filename) {
    showNotification(`Opening resource: ${filename}`, 'info');
}

function editBlogPost(id) {
    showNotification(`Editing blog post ID: ${id}`, 'info');
}

function deleteBlogPost(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        showNotification('Blog post deleted successfully', 'success');
    }
}

function editUser(id) {
    showNotification(`Editing user ID: ${id}`, 'info');
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        showNotification('User deleted successfully', 'success');
    }
}

function exportUsers() {
    showNotification('Exporting users data...', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger-admin');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !hamburger.contains(e.target) && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// Add CSS for notifications and mobile improvements
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .badge-primary { background: #007bff; color: white; }
    .badge-success { background: #28a745; color: white; }
    
    .status.active { color: #28a745; font-weight: 500; }
    .status.inactive { color: #dc3545; font-weight: 500; }
    .status.published { color: #28a745; font-weight: 500; }
    
    .file-meta {
        display: flex;
        gap: 10px;
        margin-top: 5px;
        font-size: 0.9rem;
        color: #666;
    }
    
    .year {
        color: #667eea;
        font-weight: 500;
    }
    
    .hamburger-admin {
        display: none;
    }
    
    @media (max-width: 768px) {
        .hamburger-admin {
            display: block !important;
        }
    }
`;
document.head.appendChild(style);