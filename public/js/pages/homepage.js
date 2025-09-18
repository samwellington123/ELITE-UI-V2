// Homepage implementation
class Homepage {
  constructor() {
    this.featuredProducts = [];
    this.init();
  }

  async init() {
    await this.loadFeaturedProducts();
    this.render();
    this.bindEvents();
  }

  async loadFeaturedProducts() {
    try {
      const products = await utils.api.get('/mock/products.json');
      // Get first 6 products as featured
      this.featuredProducts = products.slice(0, 6);
    } catch (error) {
      console.error('Error loading featured products:', error);
      this.featuredProducts = [];
    }
  }

  render() {
    const mainContent = utils.$('#main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">Custom Apparel Made Simple</h1>
              <p class="hero-subtitle">Upload your logo, position it perfectly, and get instant quotes. Professional decoration with fast turnaround times.</p>
              
              <div class="hero-cta">
                <form class="email-capture" id="email-capture-form">
                  <div class="email-input-group">
                    <input type="email" id="customer-email" placeholder="Enter your email to get started" required>
                    <button type="submit" class="btn btn-primary">Start Your Quote</button>
                  </div>
                  <p class="email-disclaimer">Get instant access to our quote builder and pricing</p>
                </form>
              </div>
            </div>
            
            <div class="hero-visual">
              <div class="hero-image">
                <img src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Custom apparel samples" loading="lazy">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Section -->
      <section class="trust-section">
        <div class="container">
          <div class="trust-content">
            <h2 class="section-title">Trusted by Businesses Nationwide</h2>
            <div class="trust-stats">
              <div class="trust-stat">
                <div class="stat-number">10,000+</div>
                <div class="stat-label">Orders Completed</div>
              </div>
              <div class="trust-stat">
                <div class="stat-number">48hr</div>
                <div class="stat-label">Average Turnaround</div>
              </div>
              <div class="trust-stat">
                <div class="stat-number">99%</div>
                <div class="stat-label">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Preview -->
      <section class="how-it-works-preview">
        <div class="container">
          <h2 class="section-title text-center">How It Works</h2>
          <div class="steps-grid">
            <div class="step">
              <div class="step-icon">📤</div>
              <h3 class="step-title">Upload Logo</h3>
              <p class="step-description">Upload your logo or artwork in any format</p>
            </div>
            <div class="step">
              <div class="step-icon">🎯</div>
              <h3 class="step-title">Position & Preview</h3>
              <p class="step-description">See exactly how it will look on your products</p>
            </div>
            <div class="step">
              <div class="step-icon">💰</div>
              <h3 class="step-title">Get Instant Quote</h3>
              <p class="step-description">Transparent pricing with quantity discounts</p>
            </div>
            <div class="step">
              <div class="step-icon">🚀</div>
              <h3 class="step-title">Fast Delivery</h3>
              <p class="step-description">Professional decoration and quick turnaround</p>
            </div>
          </div>
          <div class="text-center">
            <a href="/how-it-works" class="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="featured-products">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Featured Products</h2>
            <a href="/catalog" class="btn btn-secondary">View All Products</a>
          </div>
          
          <div class="products-grid" id="featured-products-grid">
            ${this.renderFeaturedProducts()}
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="final-cta">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Get Started?</h2>
            <p class="cta-subtitle">Join thousands of businesses who trust us with their custom apparel needs</p>
            <a href="/quote" class="btn btn-primary btn-lg">Build Your Quote Now</a>
          </div>
        </div>
      </section>
    `;
  }

  renderFeaturedProducts() {
    if (!this.featuredProducts.length) {
      return '<div class="loading-state">Loading featured products...</div>';
    }

    return this.featuredProducts.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.baseImageUrl || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'}" 
               alt="${product.name}" 
               loading="lazy">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-brand">${product.brand || ''}</p>
          <div class="product-pricing">
            <span class="price-from">From ${utils.format.currency(product.pricing[product.pricing.length - 1].price)}</span>
            <span class="price-range">${product.pricing[0].minQty}+ pieces</span>
          </div>
          <a href="/product/${product.id}" class="btn btn-secondary btn-sm">View Details</a>
        </div>
      </div>
    `).join('');
  }

  bindEvents() {
    // Email capture form
    const emailForm = utils.$('#email-capture-form');
    if (emailForm) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEmailCapture();
      });
    }

    // Product card clicks
    document.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      if (productCard && !e.target.closest('.btn')) {
        const productLink = productCard.querySelector('a[href^="/product/"]');
        if (productLink) {
          window.router.navigate(productLink.getAttribute('href'));
        }
      }
    });
  }

  handleEmailCapture() {
    const emailInput = utils.$('#customer-email');
    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (!email) return;

    // Store email for quote builder
    utils.storage.set('customerEmail', email);
    
    // Show success message
    utils.toast.success('Email saved! Redirecting to quote builder...');
    
    // Redirect to quote builder with email
    setTimeout(() => {
      window.router.navigate(`/quote?customerEmail=${encodeURIComponent(email)}`);
    }, 1000);
  }
}

// Export for router
window.Homepage = Homepage;