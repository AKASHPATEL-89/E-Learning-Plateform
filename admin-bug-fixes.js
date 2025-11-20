// Website Bug Detection and Auto-Fix System
class WebsiteBugFixer {
    constructor() {
        this.issues = [];
        this.fixedIssues = [];
    }

    // Detect common website issues
    detectIssues() {
        this.issues = [];
        
        // Check for missing alt tags
        const images = document.querySelectorAll('img:not([alt])');
        if (images.length > 0) {
            this.issues.push({
                type: 'accessibility',
                severity: 'medium',
                description: `${images.length} images missing alt attributes`,
                fix: () => this.fixMissingAltTags()
            });
        }

        // Check for broken links
        const links = document.querySelectorAll('a[href="#"], a[href=""]');
        if (links.length > 0) {
            this.issues.push({
                type: 'navigation',
                severity: 'low',
                description: `${links.length} empty or placeholder links found`,
                fix: () => this.fixBrokenLinks()
            });
        }

        // Check for missing meta descriptions
        const metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc || !metaDesc.content) {
            this.issues.push({
                type: 'seo',
                severity: 'medium',
                description: 'Missing meta description',
                fix: () => this.addMetaDescription()
            });
        }

        // Check for large images
        const largeImages = Array.from(document.querySelectorAll('img')).filter(img => {
            return img.naturalWidth > 1920 || img.naturalHeight > 1080;
        });
        if (largeImages.length > 0) {
            this.issues.push({
                type: 'performance',
                severity: 'high',
                description: `${largeImages.length} oversized images detected`,
                fix: () => this.optimizeImages()
            });
        }

        // Check for inline styles
        const inlineStyles = document.querySelectorAll('[style]');
        if (inlineStyles.length > 10) {
            this.issues.push({
                type: 'maintainability',
                severity: 'low',
                description: `${inlineStyles.length} elements with inline styles`,
                fix: () => this.moveInlineStylesToCSS()
            });
        }

        return this.issues;
    }

    // Fix missing alt tags
    fixMissingAltTags() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach((img, index) => {
            const src = img.src;
            const filename = src.split('/').pop().split('.')[0];
            img.alt = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        });
        this.fixedIssues.push('Added alt attributes to images');
    }

    // Fix broken links
    fixBrokenLinks() {
        const links = document.querySelectorAll('a[href="#"], a[href=""]');
        links.forEach(link => {
            if (link.textContent.toLowerCase().includes('home')) {
                link.href = 'index.html';
            } else if (link.textContent.toLowerCase().includes('contact')) {
                link.href = 'contact.html';
            } else if (link.textContent.toLowerCase().includes('about')) {
                link.href = 'about.html';
            } else {
                link.href = 'javascript:void(0)';
                link.style.cursor = 'default';
            }
        });
        this.fixedIssues.push('Fixed broken navigation links');
    }

    // Add meta description
    addMetaDescription() {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = 'EduPlatform - Your ultimate learning companion with comprehensive study materials, GATE PYQs, BTech notes, and video lectures.';
        this.fixedIssues.push('Added meta description for SEO');
    }

    // Optimize images
    optimizeImages() {
        const largeImages = Array.from(document.querySelectorAll('img')).filter(img => {
            return img.naturalWidth > 1920 || img.naturalHeight > 1080;
        });
        largeImages.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.loading = 'lazy';
        });
        this.fixedIssues.push('Optimized large images for better performance');
    }

    // Move inline styles to CSS
    moveInlineStylesToCSS() {
        const inlineStyles = document.querySelectorAll('[style]');
        let cssRules = '';
        inlineStyles.forEach((element, index) => {
            const className = `auto-fix-${index}`;
            element.classList.add(className);
            cssRules += `.${className} { ${element.style.cssText} }\n`;
            element.removeAttribute('style');
        });
        
        // Add CSS to head
        const style = document.createElement('style');
        style.textContent = cssRules;
        document.head.appendChild(style);
        this.fixedIssues.push('Moved inline styles to CSS classes');
    }

    // Performance check
    checkPerformance() {
        const performanceIssues = [];
        
        // Check for too many DOM elements
        const domElements = document.querySelectorAll('*').length;
        if (domElements > 1500) {
            performanceIssues.push(`High DOM complexity: ${domElements} elements`);
        }

        // Check for unoptimized scripts
        const scripts = document.querySelectorAll('script[src]');
        const externalScripts = Array.from(scripts).filter(script => 
            script.src.includes('http') && !script.async && !script.defer
        );
        if (externalScripts.length > 0) {
            performanceIssues.push(`${externalScripts.length} blocking scripts detected`);
        }

        return performanceIssues;
    }

    // Security check
    checkSecurity() {
        const securityIssues = [];
        
        // Check for external links without rel="noopener"
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([rel*="noopener"])');
        if (externalLinks.length > 0) {
            securityIssues.push(`${externalLinks.length} external links without security attributes`);
        }

        // Check for forms without CSRF protection
        const forms = document.querySelectorAll('form:not([data-csrf])');
        if (forms.length > 0) {
            securityIssues.push(`${forms.length} forms without CSRF protection`);
        }

        return securityIssues;
    }

    // Run complete health check
    runHealthCheck() {
        const issues = this.detectIssues();
        const performanceIssues = this.checkPerformance();
        const securityIssues = this.checkSecurity();
        
        return {
            accessibility: issues.filter(i => i.type === 'accessibility'),
            seo: issues.filter(i => i.type === 'seo'),
            performance: [...issues.filter(i => i.type === 'performance'), ...performanceIssues.map(desc => ({description: desc}))],
            security: securityIssues.map(desc => ({description: desc})),
            maintainability: issues.filter(i => i.type === 'maintainability'),
            total: issues.length + performanceIssues.length + securityIssues.length
        };
    }

    // Auto-fix all detected issues
    autoFixAll() {
        this.fixedIssues = [];
        const issues = this.detectIssues();
        
        issues.forEach(issue => {
            if (issue.fix) {
                issue.fix();
            }
        });

        // Fix external links security
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([rel*="noopener"])');
        externalLinks.forEach(link => {
            link.rel = 'noopener noreferrer';
        });
        if (externalLinks.length > 0) {
            this.fixedIssues.push('Added security attributes to external links');
        }

        return this.fixedIssues;
    }
}

// Export for use in admin panel
window.WebsiteBugFixer = WebsiteBugFixer;