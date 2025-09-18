// Header component
class Header {
  constructor() {
    this.currentPath = window.location.pathname;
    this.render();
    this.bindEvents();
  }

  render() {
    const headerEl = document.getElementById('main-header');
    if (!headerEl) return;

    headerEl.innerHTML = `
      <div class="header">
        <div class="container">
          <div class="header-content">
            <a href="/" class="logo">Directum Supply Co.</a>
            
            <nav class="nav">
              <a href="/" class="nav-link ${this.isActive('/') ? 'active' : ''}">Home</a>
              <a href="/catalog" class="nav-link ${this.isActive('/catalog') ? 'active' : ''}">Catalog</a>
              <a href="/how-it-works" class="nav-link ${this.isActive('/how-it-works') ? 'active' : ''}">How It Works</a>
              <a href="/services" class="nav-link ${this.isActive('/services') ? 'active' : ''}">Services</a>
              <a href="/about" class="nav-link ${this.isActive('/about') ? 'active' : ''}">About</a>
              <a href="/contact" class="nav-link ${this.isActive('/contact') ? 'active' : ''}">Contact</a>
              <a href="/quote" class="btn btn-primary">Build Your Quote</a>
            </nav>
            
            <button class="mobile-menu-toggle" id="mobile-menu-toggle">☰</button>
          </div>
        </div>
      </div>
    `;
  }

  isActive(path) {
    if (path === '/') {
      return this.currentPath === '/';
    }
    return this.currentPath.startsWith(path);
  }

  bindEvents() {
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const href = link.getAttribute('href');
        window.router.navigate(href);
      }
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
      mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
      });
    }
  }

  updateActive(path) {
    this.currentPath = path;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (href !== '/' && path.startsWith(href))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Initialize header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.header = new Header();
  });
} else {
  window.header = new Header();
}