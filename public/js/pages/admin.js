// Admin page implementation (dev-only mock tools)
class Admin {
  constructor() {
    this.currentTab = 'import';
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    const mainContent = utils.$('#main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
      <div class="admin-page">
        <div class="container">
          <!-- Admin Header -->
          <section class="admin-header">
            <h1 class="admin-title">Admin Tools</h1>
            <p class="admin-subtitle">Development and management tools (mock implementation)</p>
            <div class="admin-warning">
              ⚠️ This is a development-only page with mock functionality
            </div>
          </section>

          <!-- Admin Tabs -->
          <div class="admin-tabs">
            <button class="tab-btn ${this.currentTab === 'import' ? 'active' : ''}" data-tab="import">
              SanMar Import
            </button>
            <button class="tab-btn ${this.currentTab === 'calibration' ? 'active' : ''}" data-tab="calibration">
              Calibration
            </button>
            <button class="tab-btn ${this.currentTab === 'images' ? 'active' : ''}" data-tab="images">
              Images
            </button>
          </div>

          <!-- Tab Content -->
          <div class="admin-content">
            ${this.renderTabContent()}
          </div>
        </div>
      </div>
    `;
  }

  renderTabContent() {
    switch (this.currentTab) {
      case 'import':
        return this.renderImportTab();
      case 'calibration':
        return this.renderCalibrationTab();
      case 'images':
        return this.renderImagesTab();
      default:
        return '<div>Tab not found</div>';
    }
  }

  renderImportTab() {
    const importHistory = utils.storage.get('admin:importHistory') || [];
    
    return `
      <div class="admin-tab-content">
        <div class="card">
          <h2>SanMar Product Import</h2>
          <p>Simulate importing products from SanMar catalog</p>
          
          <div class="import-controls">
            <div class="form-group">
              <label>Import Type:</label>
              <select id="import-type">
                <option value="full">Full Catalog</option>
                <option value="apparel">Apparel Only</option>
                <option value="headwear">Headwear Only</option>
                <option value="bags">Bags Only</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Batch Size:</label>
              <input type="number" id="batch-size" value="50" min="1" max="500">
            </div>
            
            <button class="btn btn-primary" id="start-import">
              Start Mock Import
            </button>
          </div>
          
          <div class="import-status" id="import-status" style="display: none;">
            <div class="status-bar">
              <div class="progress-bar">
                <div class="progress-fill" id="progress-fill"></div>
              </div>
              <span class="progress-text" id="progress-text">0%</span>
            </div>
            <div class="status-log" id="status-log"></div>
          </div>
        </div>

        <div class="card">
          <h3>Import History</h3>
          <div class="import-history">
            ${importHistory.length ? importHistory.map(item => `
              <div class="history-item">
                <div class="history-info">
                  <strong>${item.type}</strong> - ${item.count} products
                  <small>${utils.format.date(item.timestamp)}</small>
                </div>
                <div class="history-actions">
                  <button class="btn btn-sm btn-secondary" onclick="this.viewImportDetails('${item.id}')">
                    View Details
                  </button>
                </div>
              </div>
            `).join('') : '<p class="empty-state">No imports yet</p>'}
          </div>
        </div>
      </div>
    `;
  }

  renderCalibrationTab() {
    const calibrationData = utils.storage.get('admin:calibration') || {};
    
    return `
      <div class="admin-tab-content">
        <div class="card">
          <h2>Product Calibration</h2>
          <p>Set pixels-per-inch calibration for accurate logo positioning</p>
          
          <div class="calibration-form">
            <div class="form-group">
              <label>Style ID:</label>
              <input type="text" id="style-id" placeholder="e.g., TSHIRT-18500">
            </div>
            
            <div class="form-group">
              <label>Pixels per Inch:</label>
              <input type="number" id="pixels-per-inch" value="300" min="72" max="600" step="1">
            </div>
            
            <div class="form-group">
              <label>View:</label>
              <select id="calibration-view">
                <option value="front">Front</option>
                <option value="back">Back</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            
            <button class="btn btn-primary" id="save-calibration">
              Save Calibration
            </button>
          </div>
        </div>

        <div class="card">
          <h3>Current Calibrations</h3>
          <div class="calibration-list">
            ${Object.keys(calibrationData).length ? Object.entries(calibrationData).map(([styleId, data]) => `
              <div class="calibration-item">
                <div class="calibration-info">
                  <strong>${styleId}</strong>
                  <div class="calibration-details">
                    ${Object.entries(data).map(([view, ppi]) => `
                      <span class="calibration-detail">${view}: ${ppi}ppi</span>
                    `).join('')}
                  </div>
                </div>
                <button class="btn btn-sm btn-secondary" onclick="this.editCalibration('${styleId}')">
                  Edit
                </button>
              </div>
            `).join('') : '<p class="empty-state">No calibrations set</p>'}
          </div>
        </div>
      </div>
    `;
  }

  renderImagesTab() {
    const imageData = utils.storage.get('admin:images') || {};
    
    return `
      <div class="admin-tab-content">
        <div class="card">
          <h2>Image Management</h2>
          <p>View and manage product images by style</p>
          
          <div class="image-search">
            <input type="text" id="image-search" placeholder="Search by style ID...">
            <button class="btn btn-secondary" id="search-images">Search</button>
          </div>
        </div>

        <div class="card">
          <h3>Mock Image Catalog</h3>
          <div class="image-grid">
            <div class="image-item">
              <div class="image-preview">
                <img src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=200" alt="T-Shirt">
              </div>
              <div class="image-info">
                <strong>TSHIRT-18500</strong>
                <div class="image-views">
                  <span class="view-tag">Front</span>
                  <span class="view-tag">Back</span>
                </div>
              </div>
            </div>
            
            <div class="image-item">
              <div class="image-preview">
                <img src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Polo">
              </div>
              <div class="image-info">
                <strong>POLO-8500</strong>
                <div class="image-views">
                  <span class="view-tag">Front</span>
                  <span class="view-tag">Back</span>
                </div>
              </div>
            </div>
            
            <div class="image-item">
              <div class="image-preview">
                <img src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Hat">
              </div>
              <div class="image-info">
                <strong>HAT-CP80</strong>
                <div class="image-views">
                  <span class="view-tag">Front</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Tab switching
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-btn')) {
        this.currentTab = e.target.dataset.tab;
        this.render();
        this.bindEvents();
      }
    });

    // Import functionality
    const startImportBtn = utils.$('#start-import');
    if (startImportBtn) {
      startImportBtn.addEventListener('click', () => this.startMockImport());
    }

    // Calibration functionality
    const saveCalibrationBtn = utils.$('#save-calibration');
    if (saveCalibrationBtn) {
      saveCalibrationBtn.addEventListener('click', () => this.saveCalibration());
    }
  }

  async startMockImport() {
    const importType = utils.$('#import-type').value;
    const batchSize = parseInt(utils.$('#batch-size').value);
    const statusDiv = utils.$('#import-status');
    const progressFill = utils.$('#progress-fill');
    const progressText = utils.$('#progress-text');
    const statusLog = utils.$('#status-log');

    statusDiv.style.display = 'block';
    statusLog.innerHTML = '';

    // Mock import process
    const totalSteps = 10;
    for (let i = 0; i <= totalSteps; i++) {
      const progress = (i / totalSteps) * 100;
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${Math.round(progress)}%`;

      const logMessage = this.getImportLogMessage(i, totalSteps, importType, batchSize);
      statusLog.innerHTML += `<div class="log-entry">${logMessage}</div>`;
      statusLog.scrollTop = statusLog.scrollHeight;

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Save import to history
    const importHistory = utils.storage.get('admin:importHistory') || [];
    const newImport = {
      id: Date.now().toString(),
      type: importType,
      count: batchSize,
      timestamp: new Date().toISOString()
    };
    importHistory.unshift(newImport);
    utils.storage.set('admin:importHistory', importHistory.slice(0, 10)); // Keep last 10

    utils.toast.success(`Mock import completed: ${batchSize} ${importType} products`);
  }

  getImportLogMessage(step, total, type, batchSize) {
    const messages = [
      'Connecting to SanMar API...',
      'Authenticating credentials...',
      `Fetching ${type} catalog...`,
      'Processing product data...',
      'Downloading product images...',
      'Validating product information...',
      'Updating database records...',
      'Processing pricing tiers...',
      'Generating thumbnails...',
      'Finalizing import...',
      `Import complete: ${batchSize} products imported successfully`
    ];
    
    return `[${new Date().toLocaleTimeString()}] ${messages[step]}`;
  }

  saveCalibration() {
    const styleId = utils.$('#style-id').value.trim();
    const ppi = parseInt(utils.$('#pixels-per-inch').value);
    const view = utils.$('#calibration-view').value;

    if (!styleId) {
      utils.toast.error('Please enter a Style ID');
      return;
    }

    const calibrationData = utils.storage.get('admin:calibration') || {};
    if (!calibrationData[styleId]) {
      calibrationData[styleId] = {};
    }
    calibrationData[styleId][view] = ppi;

    utils.storage.set('admin:calibration', calibrationData);
    utils.toast.success(`Calibration saved: ${styleId} ${view} = ${ppi}ppi`);

    // Clear form
    utils.$('#style-id').value = '';
    utils.$('#pixels-per-inch').value = '300';

    // Re-render to show updated calibrations
    this.render();
    this.bindEvents();
  }
}

// Export for router
window.Admin = Admin;