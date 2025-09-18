// Product Detail page implementation
class ProductDetail {
  constructor(params = {}) {
    this.productId = params.id;
    this.product = null;
    this.relatedProducts = [];
    this.selectedQuantity = 1;
    this.selectedView = 'front';
    this.init();
  }

  async init() {
    await this.loadProduct();
    await this.loadRelatedProducts();
    this.render();
    this.bindEvents();
  }

  async loadProduct() {
    try {
      const products = await utils.api.get('/mock/products.json');
      this.product = products.find(p => p.id === this.productId);
      
      if (!this.product) {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      this.showNotFound();
    }
  }

  async loadRelatedProducts() {
    if (!this.product) return;
    
    try {
      const products = await utils.api.get('/mock/products.json');
      this.relatedProducts = products
        .filter(p => p.id !== this.productId && p.category === this.product.category)
        .slice(0, 4);
    } catch (error) {
      console.error('Error loading related products:', error);
      this.relatedProducts = [];
    }
  }

  showNotFound() {
    const mainContent = utils.$('#main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
      <div class="container" style="padding: 64px 0; text-align: center;">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <div style="margin-top: 24px;">
          <a href="/catalog" class="btn btn-primary">Browse Catalog</a>
          <a href="/" class="btn btn-secondary" style="margin-left: 16px;">Go Home</a>
        </div>
      </div>
    `;
  }

  render() {
    if (!this.product) return;

    const mainContent = utils.$('#main-content');
    if (!mainContent) return;

    const currentPrice = this.calculatePrice(this.selectedQuantity);
    const currentTier = this.getCurrentTier(this.selectedQuantity);

    mainContent.innerHTML = `
      <div class="product-detail-page">
        <div class="container">
          <!-- Breadcrumb -->
          <nav class="breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/catalog">Catalog</a>
            <span>/</span>
            <span class="current">${this.product.name}</span>
          </nav>

          <div class="product-detail-content">
            <!-- Product Gallery -->
            <div class="product-gallery">
              <div class="main-image">
                <img id="main-product-image" src="${this.product.baseImageUrl}" alt="${this.product.name}">
                ${this.product.calibrated ? '<div class="calibrated-badge">Calibrated for Perfect Positioning</div>' : ''}
              </div>
              
              ${this.product.views && this.product.views.length > 1 ? `
                <div class="view-thumbnails">
                  ${this.product.views.map(view => `
                    <button class="view-thumb ${view === this.selectedView ? 'active' : ''}" data-view="${view}">
                      ${view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <!-- Product Info -->
            <div class="product-info">
              <div class="product-header">
                <div class="product-category">${this.product.category}</div>
                <h1 class="product-title">${this.product.name}</h1>
                <p class="product-brand">by ${this.product.brand}</p>
                <p class="product-sku">SKU: ${this.product.sku}</p>
              </div>

              <div class="product-description">
                <p>${this.product.description}</p>
              </div>

              <!-- Pricing Tiers -->
              <div class="pricing-section">
                <h3>Pricing Tiers</h3>
                <div class="pricing-tiers">
                  ${this.product.pricing.map(tier => `
                    <div class="pricing-tier ${this.selectedQuantity >= tier.minQty && (tier.maxQty === null || this.selectedQuantity <= tier.maxQty) ? 'active' : ''}">
                      <div class="tier-quantity">
                        ${tier.minQty}${tier.maxQty ? `-${tier.maxQty}` : '+'} pieces
                      </div>
                      <div class="tier-price">${utils.format.currency(tier.price)} each</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Quantity & Actions -->
              <div class="product-actions">
                <div class="quantity-section">
                  <label>Quantity:</label>
                  <div class="quantity-control">
                    <button class="qty-btn" id="decrease-qty" ${this.selectedQuantity <= 1 ? 'disabled' : ''}>-</button>
                    <input type="number" id="quantity-input" value="${this.selectedQuantity}" min="1" max="9999">
                    <button class="qty-btn" id="increase-qty">+</button>
                  </div>
                  <div class="quantity-info">
                    <div class="current-price">
                      <strong>${utils.format.currency(currentPrice)} each</strong>
                      ${currentTier ? `<span class="tier-info">(${currentTier.minQty}${currentTier.maxQty ? `-${currentTier.maxQty}` : '+'} tier)</span>` : ''}
                    </div>
                    <div class="total-price">
                      Total: <strong>${utils.format.currency(currentPrice * this.selectedQuantity)}</strong>
                    </div>
                  </div>
                </div>

                <div class="action-buttons">
                  <button class="btn btn-primary btn-lg" id="add-to-quote-btn">
                    Add to Quote
                  </button>
                  <button class="btn btn-secondary btn-lg" id="setup-logo-btn">
                    Setup Logo Position
                  </button>
                  <button class="btn btn-secondary" id="generate-mockup-btn">
                    Generate Mockup
                  </button>
                </div>

                ${this.product.specSheetUrl ? `
                  <div class="spec-sheet">
                    <a href="${this.product.specSheetUrl}" target="_blank" class="btn btn-secondary btn-sm">
                      📄 View Spec Sheet
                    </a>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- Related Products -->
          ${this.relatedProducts.length > 0 ? `
            <section class="related-products">
              <h2>Related Products</h2>
              <div class="related-products-grid">
                ${this.relatedProducts.map(product => `
                  <div class="related-product-card" data-product-id="${product.id}">
                    <div class="product-image">
                      <img src="${product.baseImageUrl}" alt="${product.name}" loading="lazy">
                    </div>
                    <div class="product-info">
                      <h3 class="product-name">${product.name}</h3>
                      <p class="product-brand">${product.brand}</p>
                      <div class="product-pricing">
                        <span class="price-from">From ${utils.format.currency(Math.min(...product.pricing.map(p => p.price)))}</span>
                      </div>
                      <a href="/product/${product.id}" class="btn btn-secondary btn-sm">View Details</a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;
  }

  calculatePrice(quantity) {
    const tier = this.product.pricing.find(tier => 
      quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)
    );
    return tier ? tier.price : this.product.pricing[0].price;
  }

  getCurrentTier(quantity) {
    return this.product.pricing.find(tier => 
      quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)
    );
  }

  bindEvents() {
    // Quantity controls
    const decreaseBtn = utils.$('#decrease-qty');
    const increaseBtn = utils.$('#increase-qty');
    const quantityInput = utils.$('#quantity-input');

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        if (this.selectedQuantity > 1) {
          this.selectedQuantity--;
          this.updateQuantityUI();
        }
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        this.selectedQuantity++;
        this.updateQuantityUI();
      });
    }

    if (quantityInput) {
      quantityInput.addEventListener('change', (e) => {
        const newQty = Math.max(1, parseInt(e.target.value) || 1);
        this.selectedQuantity = newQty;
        this.updateQuantityUI();
      });
    }

    // View thumbnails
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-thumb')) {
        this.selectedView = e.target.dataset.view;
        this.updateViewUI();
      }
    });

    // Action buttons
    const addToQuoteBtn = utils.$('#add-to-quote-btn');
    const setupLogoBtn = utils.$('#setup-logo-btn');
    const generateMockupBtn = utils.$('#generate-mockup-btn');

    if (addToQuoteBtn) {
      addToQuoteBtn.addEventListener('click', () => this.addToQuote());
    }

    if (setupLogoBtn) {
      setupLogoBtn.addEventListener('click', () => this.setupLogoPosition());
    }

    if (generateMockupBtn) {
      generateMockupBtn.addEventListener('click', () => this.generateMockup());
    }

    // Related product clicks
    document.addEventListener('click', (e) => {
      const relatedCard = e.target.closest('.related-product-card');
      if (relatedCard && !e.target.closest('.btn')) {
        const productId = relatedCard.dataset.productId;
        window.router.navigate(`/product/${productId}`);
      }
    });
  }

  updateQuantityUI() {
    const quantityInput = utils.$('#quantity-input');
    const decreaseBtn = utils.$('#decrease-qty');
    const currentPrice = this.calculatePrice(this.selectedQuantity);
    const currentTier = this.getCurrentTier(this.selectedQuantity);

    if (quantityInput) {
      quantityInput.value = this.selectedQuantity;
    }

    if (decreaseBtn) {
      decreaseBtn.disabled = this.selectedQuantity <= 1;
    }

    // Update pricing display
    const currentPriceEl = document.querySelector('.current-price');
    const totalPriceEl = document.querySelector('.total-price');

    if (currentPriceEl) {
      currentPriceEl.innerHTML = `
        <strong>${utils.format.currency(currentPrice)} each</strong>
        ${currentTier ? `<span class="tier-info">(${currentTier.minQty}${currentTier.maxQty ? `-${currentTier.maxQty}` : '+'} tier)</span>` : ''}
      `;
    }

    if (totalPriceEl) {
      totalPriceEl.innerHTML = `Total: <strong>${utils.format.currency(currentPrice * this.selectedQuantity)}</strong>`;
    }

    // Update active pricing tier
    document.querySelectorAll('.pricing-tier').forEach((tier, index) => {
      const tierData = this.product.pricing[index];
      if (this.selectedQuantity >= tierData.minQty && (tierData.maxQty === null || this.selectedQuantity <= tierData.maxQty)) {
        tier.classList.add('active');
      } else {
        tier.classList.remove('active');
      }
    });
  }

  updateViewUI() {
    // Update active thumbnail
    document.querySelectorAll('.view-thumb').forEach(thumb => {
      if (thumb.dataset.view === this.selectedView) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });

    // Update main image (in a real implementation, this would load different view images)
    const mainImage = utils.$('#main-product-image');
    if (mainImage) {
      // For now, keep the same image since we don't have multiple view images in mock data
      // In real implementation: mainImage.src = this.getViewImageUrl(this.selectedView);
    }
  }

  addToQuote() {
    const customerEmail = utils.storage.get('customerEmail') || '';
    const params = new URLSearchParams();
    params.set('quickAdd', this.productId);
    params.set('quantity', this.selectedQuantity.toString());
    if (customerEmail) {
      params.set('customerEmail', customerEmail);
    }
    
    utils.toast.success(`Added ${this.selectedQuantity} ${this.product.name} to quote!`);
    setTimeout(() => {
      window.router.navigate(`/quote?${params.toString()}`);
    }, 1000);
  }

  setupLogoPosition() {
    const customerEmail = utils.storage.get('customerEmail');
    if (!customerEmail) {
      utils.toast.error('Please provide your email first to setup logo positioning');
      return;
    }

    const params = new URLSearchParams();
    params.set('bboxToken', 'directum-bbox-setup');
    params.set('productId', this.productId);
    params.set('customerEmail', customerEmail);
    
    utils.toast.success('Redirecting to logo positioning tool...');
    setTimeout(() => {
      window.router.navigate(`/quote?${params.toString()}`);
    }, 1000);
  }

  generateMockup() {
    const customerEmail = utils.storage.get('customerEmail');
    if (!customerEmail) {
      utils.toast.error('Please provide your email first to generate mockups');
      return;
    }

    // Mock mockup generation
    utils.toast.success('Generating mockup... This may take a few moments.');
    
    setTimeout(() => {
      // In real implementation, this would trigger actual mockup generation
      utils.toast.success('Mockup generated! Check your email for the preview.');
    }, 3000);
  }
}

// Export for router
window.ProductDetail = ProductDetail;