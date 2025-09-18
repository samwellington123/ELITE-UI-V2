// Main application initialization
class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupRoutes());
    } else {
      this.setupRoutes();
    }
  }

  setupRoutes() {
    // Add page styles
    this.loadPageStyles();
    
    // Define all routes
    window.router.addRoute('/', () => this.loadPage('homepage'));
    window.router.addRoute('/catalog', () => this.loadPage('catalog'));
    window.router.addRoute('/product/:id', (params) => this.loadPage('product-detail', params));
    window.router.addRoute('/quote', () => this.loadPage('quote'));
    window.router.addRoute('/how-it-works', () => this.loadPage('how-it-works'));
    window.router.addRoute('/services', () => this.loadPage('services'));
    window.router.addRoute('/about', () => this.loadPage('about'));
    window.router.addRoute('/contact', () => this.loadPage('contact'));
    window.router.addRoute('/legal/privacy', () => this.loadPage('legal-privacy'));
    window.router.addRoute('/legal/terms', () => this.loadPage('legal-terms'));
    window.router.addRoute('/admin', () => this.loadPage('admin'));
  }

  loadPageStyles() {
    // Load page-specific styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/pages.css';
    document.head.appendChild(link);
  }

  async loadPage(pageName, params = {}) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Show loading state
    mainContent.innerHTML = `
      <div class="container" style="padding: 64px 0; text-align: center;">
        <div class="loading"></div>
        <p style="margin-top: 16px; color: var(--muted);">Loading...</p>
      </div>
    `;

    try {
      // Load page script if not already loaded
      if (!window[this.getPageClassName(pageName)]) {
        await this.loadScript(`/js/pages/${pageName}.js`);
      }

      // Initialize page
      const PageClass = window[this.getPageClassName(pageName)];
      if (PageClass) {
        new PageClass(params);
      } else {
        throw new Error(`Page class not found: ${pageName}`);
      }
    } catch (error) {
      console.error(`Error loading page ${pageName}:`, error);
      this.showErrorPage();
    }
  }

  getPageClassName(pageName) {
    // Convert kebab-case to PascalCase
    return pageName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  showErrorPage() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
      <div class="container" style="padding: 64px 0; text-align: center;">
        <h1>Something went wrong</h1>
        <p>We're having trouble loading this page. Please try again.</p>
        <a href="/" class="btn btn-primary" style="margin-top: 24px;">Go Home</a>
      </div>
    `;
  }
}

// Initialize app
new App();