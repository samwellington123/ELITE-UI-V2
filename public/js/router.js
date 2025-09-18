// Simple client-side router
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.init();
  }

  init() {
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });

    // Handle initial load
    this.handleRoute(window.location.pathname);
  }

  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  navigate(path) {
    if (path !== window.location.pathname) {
      window.history.pushState({}, '', path);
    }
    this.handleRoute(path);
  }

  async handleRoute(path) {
    // Update header active state
    if (window.header) {
      window.header.updateActive(path);
    }

    // Find matching route
    let handler = this.routes.get(path);
    
    // Try dynamic routes (e.g., /product/:id)
    if (!handler) {
      for (const [routePath, routeHandler] of this.routes) {
        if (routePath.includes(':')) {
          const regex = new RegExp('^' + routePath.replace(/:[^/]+/g, '([^/]+)') + '$');
          const match = path.match(regex);
          if (match) {
            handler = routeHandler;
            // Extract parameters
            const paramNames = routePath.match(/:[^/]+/g) || [];
            const params = {};
            paramNames.forEach((param, index) => {
              params[param.substring(1)] = match[index + 1];
            });
            // Pass parameters to handler
            handler = () => routeHandler(params);
            break;
          }
        }
      }
    }

    // Handle 404
    if (!handler) {
      handler = this.routes.get('404') || (() => {
        document.getElementById('main-content').innerHTML = `
          <div class="container" style="padding: 64px 0; text-align: center;">
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <a href="/" class="btn btn-primary" style="margin-top: 24px;">Go Home</a>
          </div>
        `;
      });
    }

    this.currentRoute = path;
    
    try {
      await handler();
    } catch (error) {
      console.error('Route handler error:', error);
      document.getElementById('main-content').innerHTML = `
        <div class="container" style="padding: 64px 0; text-align: center;">
          <h1>Something went wrong</h1>
          <p>Please try again later.</p>
          <a href="/" class="btn btn-primary" style="margin-top: 24px;">Go Home</a>
        </div>
      `;
    }
  }
}

// Initialize router
window.router = new Router();