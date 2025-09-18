// Quote Builder implementation
class Quote {
  constructor(params = {}) {
    this.quoteId = params.quoteId || this.generateQuoteId();
    this.customerEmail = params.customerEmail || utils.url.getParams().customerEmail || '';
    this.products = [];
    this.quote = null;
    this.selectedVersions = {};
    this.init();
  }

  generateQuoteId() {
    return 'quote_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async init() {
    await this.loadProducts();
    await this.loadExistingQuote();
    this.handleQuickAdd(); // Handle quick add from catalog/product pages
    this.render();
    this.bindEvents();
    this.updateURL();
  }

  handleQuickAdd() {
    const params = utils.url.getParams();
    if (params.quickAdd) {
      const productId = params.quickAdd;
      const quantity = parseInt(params.quantity) || 1;
      
      // Add product to quote automatically
      setTimeout(() => {
        this.updateProductQuantity(productId, quantity);
        utils.toast.success(`Added ${quantity} items to your quote!`);
        
        // Clean up URL
        utils.url.removeParam('quickAdd');
        utils.url.removeParam('quantity');
      }, 500);
    }
  }

  async loadProducts() {
    try {
      this.products = await utils.api.get('/mock/products.json');
    } catch (error) {
      console.error('Error loading products:', error);
      this.products = [];
    }
  }

  async loadExistingQuote() {
    const existingQuote = utils.storage.get(`quote:${this.quoteId}`);
    if (existingQuote) {
      this.quote = existingQuote;
      this.selectedVersions = utils.storage.get('versionSelections') || {};
    } else {
      this.quote = {
        quoteId: this.quoteId,
        email: this.customerEmail,
        lines: [],
        subtotal: 0,
        taxEstimate: 0,
        shippingEstimate: 0,
        total: 0
      };
    }
  }

  updateURL() {
    const params = new URLSearchParams();
    params.set('quoteId', this.quoteId);
    if (this.customerEmail) {
      params.set('customerEmail', this.customerEmail);
    }
    const newURL = `/quote?${params.toString()}`;
    if (window.location.pathname + window.location.search !== newURL) {
      window.history.replaceState({}, '', newURL);
    }
  }

  render() {
    const mainContent = utils.$('#main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
      <div class="quote-builder">
        <div class="container">
          <div class="quote-header">
            <h1 class="quote-title">Build Your Quote</h1>
            ${this.customerEmail ? `<p class="customer-info">Quote for: <strong>${this.customerEmail}</strong></p>` : ''}
            <p class="quote-id">Quote ID: ${this.quoteId}</p>
          </div>

          <div class="quote-content">
            <div class="products-section">
              <div class="section-header">
                <h2>Select Products</h2>
                <div class="product-filters">
                  <select id="category-filter" class="filter-select">
                    <option value="">All Categories</option>
                    <option value="apparel">Apparel</option>
                    <option value="headwear">Headwear</option>
                    <option value="bags">Bags</option>
                    <option value="outerwear">Outerwear</option>
                  </select>
                </div>
              </div>

              <div class="products-grid" id="quote-products-grid">
                ${this.renderProducts()}
              </div>
            </div>

            <div class="quote-sidebar">
              <div class="quote-summary card">
                <h3>Quote Summary</h3>
                <div class="quote-lines" id="quote-lines">
                  ${this.renderQuoteLines()}
                </div>
                
                <div class="quote-totals">
                  <div class="total-line">
                    <span>Subtotal:</span>
                    <span id="subtotal">${utils.format.currency(this.quote.subtotal)}</span>
                  </div>
                  <div class="total-line">
                    <span>Tax Estimate:</span>
                    <span id="tax-estimate">${utils.format.currency(this.quote.taxEstimate)}</span>
                  </div>
                  <div class="total-line">
                    <span>Shipping Estimate:</span>
                    <span id="shipping-estimate">${utils.format.currency(this.quote.shippingEstimate)}</span>
                  </div>
                  <div class="total-line total">
                    <span><strong>Total:</strong></span>
                    <span id="total"><strong>${utils.format.currency(this.quote.total)}</strong></span>
                  </div>
                </div>

                <div class="quote-actions">
                  <button class="btn btn-primary btn-full" id="checkout-btn" ${this.quote.lines.length === 0 ? 'disabled' : ''}>
                    Proceed to Checkout
                  </button>
                  <button class="btn btn-secondary btn-full" id="save-quote-btn">
                    Save Quote
                  </button>
                </div>
              </div>

              ${this.customerEmail ? '' : this.renderEmailCapture()}
            </div>
          </div>
        </div>
      </div>

      <!-- BBox Modal -->
      <div id="bbox-modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Position Your Logo</h3>
            <button class="modal-close" id="close-bbox-modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="bbox-container">
              <canvas id="bbox-canvas" width="400" height="400"></canvas>
              <div class="bbox-controls">
                <div class="control-group">
                  <label>Version Name:</label>
                  <input type="text" id="version-name" placeholder="e.g., Front Logo" value="Version 1">
                </div>
                <div class="control-group">
                  <label>Logo Upload:</label>
                  <input type="file" id="logo-upload" accept="image/*">
                </div>
                <div class="bbox-instructions">
                  <p>Click and drag to position your logo on the product.</p>
                  <p>The red rectangle shows where your logo will be placed.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="cancel-bbox">Cancel</button>
            <button class="btn btn-primary" id="save-bbox">Save Position</button>
          </div>
        </div>
      </div>
    `;
  }

  renderProducts() {
    if (!this.products.length) {
      return '<div class="loading-state">Loading products...</div>';
    }

    return this.products.map(product => {
      const quoteLine = this.quote.lines.find(line => line.productId === product.id);
      const quantity = quoteLine ? quoteLine.quantity : 0;
      const currentPrice = this.calculatePrice(product, quantity || 1);

      return `
        <div class="quote-product-card" data-product-id="${product.id}">
          <div class="product-image">
            <img src="${product.baseImageUrl}" alt="${product.name}" loading="lazy">
            ${quantity > 0 ? `<div class="quantity-badge">${quantity}</div>` : ''}
          </div>
          
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-brand">${product.brand}</p>
            
            <div class="pricing-tiers">
              ${product.pricing.map(tier => `
                <div class="tier ${quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty) ? 'active' : ''}">
                  ${tier.minQty}${tier.maxQty ? `-${tier.maxQty}` : '+'}: ${utils.format.currency(tier.price)}
                </div>
              `).join('')}
            </div>

            <div class="product-controls">
              <div class="quantity-control">
                <button class="qty-btn" data-action="decrease" ${quantity <= 0 ? 'disabled' : ''}>-</button>
                <input type="number" class="qty-input" value="${quantity}" min="0" max="9999">
                <button class="qty-btn" data-action="increase">+</button>
              </div>
              
              <div class="product-actions">
                ${quantity > 0 ? `
                  <select class="version-select" data-product-id="${product.id}">
                    <option value="">Select Version</option>
                    ${this.renderVersionOptions(product.id)}
                  </select>
                  <button class="btn btn-sm btn-secondary setup-logo-btn" data-product-id="${product.id}">
                    Setup Logo
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderVersionOptions(productId) {
    const versions = this.getProductVersions(productId);
    return versions.map(version => `
      <option value="${version.id}" ${this.selectedVersions[productId] === version.id ? 'selected' : ''}>
        ${version.name}
      </option>
    `).join('');
  }

  getProductVersions(productId) {
    const versions = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith(`versionIndex:${this.quoteId}:`) && key.includes(`:${productId}`)) {
        const versionId = key.split(':')[2];
        const versionData = utils.storage.get(key);
        if (versionData) {
          versions.push({
            id: versionId,
            name: versionData.name || `Version ${versions.length + 1}`,
            createdAt: versionData.createdAt
          });
        }
      }
    });

    return versions;
  }

  renderQuoteLines() {
    if (!this.quote.lines.length) {
      return '<div class="empty-quote">No products selected</div>';
    }

    return this.quote.lines.map(line => {
      const product = this.products.find(p => p.id === line.productId);
      if (!product) return '';

      const versionName = this.getVersionName(line.productId, line.versionId);
      
      return `
        <div class="quote-line">
          <div class="line-product">
            <strong>${product.name}</strong>
            ${versionName ? `<br><small>Version: ${versionName}</small>` : ''}
          </div>
          <div class="line-quantity">Qty: ${line.quantity}</div>
          <div class="line-price">${utils.format.currency(line.unitPrice * line.quantity)}</div>
          <button class="remove-line-btn" data-product-id="${line.productId}">&times;</button>
        </div>
      `;
    }).join('');
  }

  getVersionName(productId, versionId) {
    if (!versionId) return null;
    const versionData = utils.storage.get(`versionIndex:${this.quoteId}:${versionId}:${productId}`);
    return versionData ? versionData.name : null;
  }

  renderEmailCapture() {
    return `
      <div class="email-capture-card card">
        <h3>Save Your Quote</h3>
        <p>Enter your email to save and continue later</p>
        <form id="quote-email-form">
          <input type="email" id="quote-email" placeholder="your@email.com" required>
          <button type="submit" class="btn btn-primary btn-full">Save Quote</button>
        </form>
      </div>
    `;
  }

  calculatePrice(product, quantity) {
    const tier = product.pricing.find(tier => 
      quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)
    );
    return tier ? tier.price : product.pricing[0].price;
  }

  bindEvents() {
    // Quantity controls
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('qty-btn')) {
        this.handleQuantityChange(e);
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('qty-input')) {
        this.handleQuantityInput(e);
      }
    });

    // Setup logo buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('setup-logo-btn')) {
        this.openBBoxModal(e.target.dataset.productId);
      }
    });

    // Version selection
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('version-select')) {
        this.handleVersionChange(e);
      }
    });

    // Remove line buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-line-btn')) {
        this.removeLine(e.target.dataset.productId);
      }
    });

    // BBox modal events
    this.bindBBoxEvents();

    // Quote actions
    const checkoutBtn = utils.$('#checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }

    const saveQuoteBtn = utils.$('#save-quote-btn');
    if (saveQuoteBtn) {
      saveQuoteBtn.addEventListener('click', () => this.saveQuote());
    }

    // Email capture
    const emailForm = utils.$('#quote-email-form');
    if (emailForm) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEmailCapture();
      });
    }

    // Category filter
    const categoryFilter = utils.$('#category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.filterProducts(e.target.value);
      });
    }
  }

  handleQuantityChange(e) {
    const productCard = e.target.closest('.quote-product-card');
    const productId = productCard.dataset.productId;
    const qtyInput = productCard.querySelector('.qty-input');
    const action = e.target.dataset.action;
    
    let newQty = parseInt(qtyInput.value) || 0;
    
    if (action === 'increase') {
      newQty++;
    } else if (action === 'decrease' && newQty > 0) {
      newQty--;
    }
    
    qtyInput.value = newQty;
    this.updateProductQuantity(productId, newQty);
  }

  handleQuantityInput(e) {
    const productCard = e.target.closest('.quote-product-card');
    const productId = productCard.dataset.productId;
    const quantity = Math.max(0, parseInt(e.target.value) || 0);
    
    e.target.value = quantity;
    this.updateProductQuantity(productId, quantity);
  }

  updateProductQuantity(productId, quantity) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    // Remove existing line
    this.quote.lines = this.quote.lines.filter(line => line.productId !== productId);

    // Add new line if quantity > 0
    if (quantity > 0) {
      const unitPrice = this.calculatePrice(product, quantity);
      this.quote.lines.push({
        productId,
        quantity,
        unitPrice,
        versionId: this.selectedVersions[productId] || null
      });
    }

    this.updateTotals();
    this.saveQuote();
    this.updateUI();
  }

  updateTotals() {
    this.quote.subtotal = this.quote.lines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0);
    this.quote.taxEstimate = this.quote.subtotal * 0.08; // 8% tax estimate
    this.quote.shippingEstimate = this.quote.subtotal > 100 ? 0 : 15; // Free shipping over $100
    this.quote.total = this.quote.subtotal + this.quote.taxEstimate + this.quote.shippingEstimate;
  }

  updateUI() {
    // Update quote summary
    const subtotalEl = utils.$('#subtotal');
    const taxEl = utils.$('#tax-estimate');
    const shippingEl = utils.$('#shipping-estimate');
    const totalEl = utils.$('#total');
    const quoteLinesEl = utils.$('#quote-lines');
    const checkoutBtn = utils.$('#checkout-btn');

    if (subtotalEl) subtotalEl.textContent = utils.format.currency(this.quote.subtotal);
    if (taxEl) taxEl.textContent = utils.format.currency(this.quote.taxEstimate);
    if (shippingEl) shippingEl.textContent = utils.format.currency(this.quote.shippingEstimate);
    if (totalEl) totalEl.innerHTML = `<strong>${utils.format.currency(this.quote.total)}</strong>`;
    if (quoteLinesEl) quoteLinesEl.innerHTML = this.renderQuoteLines();
    
    if (checkoutBtn) {
      checkoutBtn.disabled = this.quote.lines.length === 0;
    }

    // Update product cards
    this.updateProductCards();
  }

  updateProductCards() {
    this.quote.lines.forEach(line => {
      const productCard = utils.$(`[data-product-id="${line.productId}"]`);
      if (productCard) {
        const badge = productCard.querySelector('.quantity-badge');
        const actionsDiv = productCard.querySelector('.product-actions');
        
        if (badge) {
          badge.textContent = line.quantity;
        } else {
          const img = productCard.querySelector('.product-image');
          img.innerHTML += `<div class="quantity-badge">${line.quantity}</div>`;
        }

        if (actionsDiv && line.quantity > 0) {
          actionsDiv.innerHTML = `
            <select class="version-select" data-product-id="${line.productId}">
              <option value="">Select Version</option>
              ${this.renderVersionOptions(line.productId)}
            </select>
            <button class="btn btn-sm btn-secondary setup-logo-btn" data-product-id="${line.productId}">
              Setup Logo
            </button>
          `;
        }
      }
    });
  }

  handleVersionChange(e) {
    const productId = e.target.dataset.productId;
    const versionId = e.target.value;
    
    this.selectedVersions[productId] = versionId;
    utils.storage.set('versionSelections', this.selectedVersions);

    // Update quote line
    const line = this.quote.lines.find(l => l.productId === productId);
    if (line) {
      line.versionId = versionId;
      this.saveQuote();
      this.updateUI();
    }
  }

  removeLine(productId) {
    this.quote.lines = this.quote.lines.filter(line => line.productId !== productId);
    delete this.selectedVersions[productId];
    
    // Reset quantity input
    const productCard = utils.$(`[data-product-id="${productId}"]`);
    if (productCard) {
      const qtyInput = productCard.querySelector('.qty-input');
      if (qtyInput) qtyInput.value = 0;
    }

    this.updateTotals();
    this.saveQuote();
    this.updateUI();
  }

  bindBBoxEvents() {
    const modal = utils.$('#bbox-modal');
    const closeBtn = utils.$('#close-bbox-modal');
    const cancelBtn = utils.$('#cancel-bbox');
    const saveBtn = utils.$('#save-bbox');
    const logoUpload = utils.$('#logo-upload');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeBBoxModal());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeBBoxModal());
    if (saveBtn) saveBtn.addEventListener('click', () => this.saveBBoxPosition());
    if (logoUpload) logoUpload.addEventListener('change', (e) => this.handleLogoUpload(e));

    // Close modal on outside click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeBBoxModal();
      });
    }
  }

  openBBoxModal(productId) {
    this.currentBBoxProductId = productId;
    const modal = utils.$('#bbox-modal');
    if (modal) {
      modal.style.display = 'flex';
      this.initBBoxCanvas();
    }
  }

  closeBBoxModal() {
    const modal = utils.$('#bbox-modal');
    if (modal) {
      modal.style.display = 'none';
      this.currentBBoxProductId = null;
    }
  }

  initBBoxCanvas() {
    const canvas = utils.$('#bbox-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const product = this.products.find(p => p.id === this.currentBBoxProductId);
    
    // Load product image
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw initial bbox
      this.drawBBox(ctx, 100, 100, 200, 100);
    };
    img.src = product.baseImageUrl;

    // Add canvas interaction
    this.addCanvasInteraction(canvas, ctx);
  }

  drawBBox(ctx, x, y, width, height) {
    ctx.strokeStyle = '#E53E3E';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(x, y, width, height);
    
    // Draw corner handles
    ctx.fillStyle = '#E53E3E';
    ctx.fillRect(x - 3, y - 3, 6, 6);
    ctx.fillRect(x + width - 3, y - 3, 6, 6);
    ctx.fillRect(x - 3, y + height - 3, 6, 6);
    ctx.fillRect(x + width - 3, y + height - 3, 6, 6);
  }

  addCanvasInteraction(canvas, ctx) {
    let isDragging = false;
    let startX, startY, currentX = 100, currentY = 100, currentWidth = 200, currentHeight = 100;

    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      isDragging = true;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      currentX = Math.max(0, Math.min(mouseX - currentWidth/2, canvas.width - currentWidth));
      currentY = Math.max(0, Math.min(mouseY - currentHeight/2, canvas.height - currentHeight));
      
      // Redraw
      const product = this.products.find(p => p.id === this.currentBBoxProductId);
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        this.drawBBox(ctx, currentX, currentY, currentWidth, currentHeight);
      };
      img.src = product.baseImageUrl;
    });

    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Store current bbox position for saving
    this.currentBBox = { x: currentX, y: currentY, width: currentWidth, height: currentHeight };
  }

  handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      this.currentLogo = event.target.result;
      utils.storage.set(`logo:${this.customerEmail}`, this.currentLogo);
      utils.toast.success('Logo uploaded successfully');
    };
    reader.readAsDataURL(file);
  }

  saveBBoxPosition() {
    const versionName = utils.$('#version-name').value || 'Version 1';
    const versionId = 'v_' + Date.now();
    
    // Save version index
    const versionIndex = {
      name: versionName,
      createdAt: new Date().toISOString(),
      products: [{ productId: this.currentBBoxProductId, updatedAt: new Date().toISOString() }]
    };
    utils.storage.set(`versionIndex:${this.quoteId}:${versionId}:${this.currentBBoxProductId}`, versionIndex);

    // Save design manifest
    const designManifest = {
      productId: this.currentBBoxProductId,
      logoRef: this.customerEmail,
      placement: {
        name: 'Custom Position',
        view: 'front',
        px: {
          x1: this.currentBBox.x,
          y1: this.currentBBox.y,
          x2: this.currentBBox.x + this.currentBBox.width,
          y2: this.currentBBox.y + this.currentBBox.height
        }
      },
      updatedAt: new Date().toISOString()
    };
    utils.storage.set(`design:${this.quoteId}:${versionId}:${this.currentBBoxProductId}`, designManifest);

    // Generate preview
    this.generatePreview(versionId);

    // Update selected version
    this.selectedVersions[this.currentBBoxProductId] = versionId;
    utils.storage.set('versionSelections', this.selectedVersions);

    utils.toast.success('Logo position saved successfully');
    this.closeBBoxModal();
    this.updateUI();
  }

  generatePreview(versionId) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    const product = this.products.find(p => p.id === this.currentBBoxProductId);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Overlay logo if available
      if (this.currentLogo) {
        const logoImg = new Image();
        logoImg.onload = () => {
          ctx.drawImage(logoImg, this.currentBBox.x, this.currentBBox.y, this.currentBBox.width, this.currentBBox.height);
          const previewDataURL = canvas.toDataURL();
          utils.storage.set(`preview:${this.quoteId}:${versionId}:${this.currentBBoxProductId}`, previewDataURL);
        };
        logoImg.src = this.currentLogo;
      }
    };
    img.src = product.baseImageUrl;
  }

  filterProducts(category) {
    const productCards = document.querySelectorAll('.quote-product-card');
    productCards.forEach(card => {
      const productId = card.dataset.productId;
      const product = this.products.find(p => p.id === productId);
      
      if (!category || product.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  handleEmailCapture() {
    const emailInput = utils.$('#quote-email');
    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (!email) return;

    this.customerEmail = email;
    this.quote.email = email;
    utils.storage.set('customerEmail', email);
    
    this.saveQuote();
    utils.toast.success('Email saved! Your quote has been updated.');
    
    // Re-render to remove email capture form
    setTimeout(() => this.render(), 1000);
  }

  saveQuote() {
    utils.storage.set(`quote:${this.quoteId}`, this.quote);
    utils.storage.set('versionSelections', this.selectedVersions);
  }

  async handleCheckout() {
    if (this.quote.lines.length === 0) {
      utils.toast.error('Please add products to your quote first');
      return;
    }

    if (!this.customerEmail) {
      utils.toast.error('Please provide your email address');
      return;
    }

    // Mock checkout process
    utils.toast.success('Redirecting to checkout...');
    
    // Simulate checkout redirect
    setTimeout(() => {
      alert(`Mock Checkout:\n\nQuote ID: ${this.quoteId}\nEmail: ${this.customerEmail}\nTotal: ${utils.format.currency(this.quote.total)}\n\nIn a real implementation, this would redirect to a payment processor.`);
    }, 1000);
  }
}

// Export for router
window.Quote = Quote;