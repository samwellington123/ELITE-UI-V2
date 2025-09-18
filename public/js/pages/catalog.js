// Catalog page implementation
class Catalog {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.currentFilters = {
      category: '',
      brand: '',
      search: '',
      priceMin: 0,
      priceMax: 1000
    };
    this.currentSort = 'popular';
    this.currentPage = 1;
    this.productsPerPage = 12;
    this.init();
  }

  async init() {
    await this.loadProducts();
    this.applyFilters();
    this.render();
    this.bindEvents();
  }

  async loadProducts() {
    try {
      this.products = await utils.api.get('/mock/products.json');
      this.filteredProducts = [...this.products];
    } catch (error) {
      console.error('Error loading products:', error);
      this.products = [];
      this.filteredProducts = [];
    }
  }

  render() {
    const mainContent = utils.$('#main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
      <div class="catalog-page">
        <div class="container">
          <div class="catalog-header">
            <h1 class="catalog-title">Product Catalog</h1>
            <p class="catalog-subtitle">Browse our complete selection of customizable products</p>
          </div>

          <div class="catalog-content">
            <aside class="catalog-sidebar">
              <div class="filters-section">
                <h3>Filters</h3>
                
                <div class="filter-group">
                  <label>Search</label>
                  <input type="text" id="search-input" placeholder="Search products..." value="${this.currentFilters.search}">
                </div>

                <div class="filter-group">
                  <label>Category</label>
                  <select id="category-filter">
                    <option value="">All Categories</option>
                    <option value="apparel" ${this.currentFilters.category === 'apparel' ? 'selected' : ''}>Apparel</option>
                    <option value="headwear" ${this.currentFilters.category === 'headwear' ? 'selected' : ''}>Headwear</option>
                    <option value="bags" ${this.currentFilters.category === 'bags' ? 'selected' : ''}>Bags</option>
                    <option value="outerwear" ${this.currentFilters.category === 'outerwear' ? 'selected' : ''}>Outerwear</option>
                  </select>
                </div>

                <div class="filter-group">
                  <label>Brand</label>
                  <select id="brand-filter">
                    <option value="">All Brands</option>
                    ${this.getBrandOptions()}
                  </select>
                </div>

                <div class="filter-group">
                  <label>Price Range</label>
                  <div class="price-range">
                    <input type="number" id="price-min" placeholder="Min" value="${this.currentFilters.priceMin}" min="0">
                    <span>to</span>
                    <input type="number" id="price-max" placeholder="Max" value="${this.currentFilters.priceMax}" min="0">
                  </div>
                </div>

                <button class="btn btn-secondary btn-full" id="clear-filters">Clear Filters</button>
              </div>
            </aside>

            <main class="catalog-main">
              <div class="catalog-controls">
                <div class="results-info">
                  <span id="results-count">${this.filteredProducts.length} products found</span>
                </div>
                
                <div class="sort-controls">
                  <label>Sort by:</label>
                  <select id="sort-select">
                    <option value="popular" ${this.currentSort === 'popular' ? 'selected' : ''}>Most Popular</option>
                    <option value="price-asc" ${this.currentSort === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                    <option value="price-desc" ${this.currentSort === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                    <option value="name" ${this.currentSort === 'name' ? 'selected' : ''}>Name A-Z</option>
                  </select>
                </div>
              </div>

              <div class="products-grid" id="products-grid">
                ${this.renderProducts()}
              </div>

              <div class="pagination" id="pagination">
                ${this.renderPagination()}
              </div>
            </main>
          </div>
        </div>
      </div>
    `;
  }

  getBrandOptions() {
    const brands = [...new Set(this.products.map(p => p.brand).filter(Boolean))];
    return brands.map(brand => 
      `<option value="${brand}" ${this.currentFilters.brand === brand ? 'selected' : ''}>${brand}</option>`
    ).join('');
  }

  renderProducts() {
    if (!this.filteredProducts.length) {
      return `
        <div class="empty-state">
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms</p>
          <button class="btn btn-primary" id="clear-filters-empty">Clear All Filters</button>
        </div>
      `;
    }

    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    const pageProducts = this.filteredProducts.slice(startIndex, endIndex);

    return pageProducts.map(product => {
      const minPrice = Math.min(...product.pricing.map(p => p.price));
      const maxPrice = Math.max(...product.pricing.map(p => p.price));
      const priceRange = minPrice === maxPrice ? 
        utils.format.currency(minPrice) : 
        `${utils.format.currency(minPrice)} - ${utils.format.currency(maxPrice)}`;

      return `
        <div class="catalog-product-card" data-product-id="${product.id}">
          <div class="product-image">
            <img src="${product.baseImageUrl}" alt="${product.name}" loading="lazy">
            <div class="product-overlay">
              <a href="/product/${product.id}" class="btn btn-primary btn-sm">View Details</a>
              <button class="btn btn-secondary btn-sm quick-add-btn" data-product-id="${product.id}">Quick Add</button>
            </div>
          </div>
          
          <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-brand">${product.brand || ''}</p>
            <div class="product-pricing">
              <span class="price-range">${priceRange}</span>
              <span class="min-qty">Min: ${product.pricing[0].minQty}</span>
            </div>
            ${product.calibrated ? '<div class="calibrated-badge">Calibrated</div>' : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  renderPagination() {
    const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
    if (totalPages <= 1) return '';

    let pagination = '<div class="pagination-controls">';
    
    // Previous button
    if (this.currentPage > 1) {
      pagination += `<button class="page-btn" data-page="${this.currentPage - 1}">Previous</button>`;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === this.currentPage) {
        pagination += `<button class="page-btn active">${i}</button>`;
      } else if (i === 1 || i === totalPages || Math.abs(i - this.currentPage) <= 2) {
        pagination += `<button class="page-btn" data-page="${i}">${i}</button>`;
      } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
        pagination += '<span class="page-ellipsis">...</span>';
      }
    }

    // Next button
    if (this.currentPage < totalPages) {
      pagination += `<button class="page-btn" data-page="${this.currentPage + 1}">Next</button>`;
    }

    pagination += '</div>';
    return pagination;
  }

  bindEvents() {
    // Search input
    const searchInput = utils.$('#search-input');
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.currentFilters.search = e.target.value;
          this.applyFilters();
          this.updateResults();
        }, 300);
      });
    }

    // Filter selects
    const categoryFilter = utils.$('#category-filter');
    const brandFilter = utils.$('#brand-filter');
    const sortSelect = utils.$('#sort-select');

    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.currentFilters.category = e.target.value;
        this.applyFilters();
        this.updateResults();
      });
    }

    if (brandFilter) {
      brandFilter.addEventListener('change', (e) => {
        this.currentFilters.brand = e.target.value;
        this.applyFilters();
        this.updateResults();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.applySorting();
        this.updateResults();
      });
    }

    // Price range inputs
    const priceMin = utils.$('#price-min');
    const priceMax = utils.$('#price-max');

    if (priceMin) {
      priceMin.addEventListener('change', (e) => {
        this.currentFilters.priceMin = parseFloat(e.target.value) || 0;
        this.applyFilters();
        this.updateResults();
      });
    }

    if (priceMax) {
      priceMax.addEventListener('change', (e) => {
        this.currentFilters.priceMax = parseFloat(e.target.value) || 1000;
        this.applyFilters();
        this.updateResults();
      });
    }

    // Clear filters
    document.addEventListener('click', (e) => {
      if (e.target.id === 'clear-filters' || e.target.id === 'clear-filters-empty') {
        this.clearFilters();
      }
    });

    // Quick add buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-add-btn')) {
        e.preventDefault();
        e.stopPropagation();
        this.handleQuickAdd(e.target.dataset.productId);
      }
    });

    // Pagination
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('page-btn') && e.target.dataset.page) {
        this.currentPage = parseInt(e.target.dataset.page);
        this.updateResults();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Product card clicks (navigate to detail)
    document.addEventListener('click', (e) => {
      const productCard = e.target.closest('.catalog-product-card');
      if (productCard && !e.target.closest('.product-overlay')) {
        const productId = productCard.dataset.productId;
        window.router.navigate(`/product/${productId}`);
      }
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      // Search filter
      if (this.currentFilters.search) {
        const searchTerm = this.currentFilters.search.toLowerCase();
        const searchableText = `${product.name} ${product.brand} ${product.sku} ${product.description}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) return false;
      }

      // Category filter
      if (this.currentFilters.category && product.category !== this.currentFilters.category) {
        return false;
      }

      // Brand filter
      if (this.currentFilters.brand && product.brand !== this.currentFilters.brand) {
        return false;
      }

      // Price range filter
      const minPrice = Math.min(...product.pricing.map(p => p.price));
      const maxPrice = Math.max(...product.pricing.map(p => p.price));
      
      if (minPrice > this.currentFilters.priceMax || maxPrice < this.currentFilters.priceMin) {
        return false;
      }

      return true;
    });

    this.applySorting();
    this.currentPage = 1; // Reset to first page when filters change
  }

  applySorting() {
    this.filteredProducts.sort((a, b) => {
      switch (this.currentSort) {
        case 'price-asc':
          return Math.min(...a.pricing.map(p => p.price)) - Math.min(...b.pricing.map(p => p.price));
        case 'price-desc':
          return Math.max(...b.pricing.map(p => p.price)) - Math.max(...a.pricing.map(p => p.price));
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
        default:
          // Mock popularity based on calibrated status and category
          const aScore = (a.calibrated ? 10 : 0) + (a.category === 'apparel' ? 5 : 0);
          const bScore = (b.calibrated ? 10 : 0) + (b.category === 'apparel' ? 5 : 0);
          return bScore - aScore;
      }
    });
  }

  clearFilters() {
    this.currentFilters = {
      category: '',
      brand: '',
      search: '',
      priceMin: 0,
      priceMax: 1000
    };
    this.currentSort = 'popular';
    this.currentPage = 1;
    
    this.applyFilters();
    this.render();
    this.bindEvents();
  }

  updateResults() {
    const resultsCount = utils.$('#results-count');
    const productsGrid = utils.$('#products-grid');
    const pagination = utils.$('#pagination');

    if (resultsCount) {
      resultsCount.textContent = `${this.filteredProducts.length} products found`;
    }

    if (productsGrid) {
      productsGrid.innerHTML = this.renderProducts();
    }

    if (pagination) {
      pagination.innerHTML = this.renderPagination();
    }
  }

  handleQuickAdd(productId) {
    // Store product for quote and redirect
    const customerEmail = utils.storage.get('customerEmail') || '';
    const params = new URLSearchParams();
    params.set('quickAdd', productId);
    if (customerEmail) {
      params.set('customerEmail', customerEmail);
    }
    
    utils.toast.success('Product added! Redirecting to quote builder...');
    setTimeout(() => {
      window.router.navigate(`/quote?${params.toString()}`);
    }, 1000);
  }
}

// Export for router
window.Catalog = Catalog;