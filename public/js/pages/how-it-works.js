// How It Works page implementation
class HowItWorks {
  constructor() {
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
      <div class="how-it-works-page">
        <div class="container">
          <!-- Hero Section -->
          <section class="page-hero">
            <h1 class="page-title">How It Works</h1>
            <p class="page-subtitle">From logo upload to finished product in 4 simple steps</p>
          </section>

          <!-- Detailed Steps -->
          <section class="detailed-steps">
            <div class="step-detail">
              <div class="step-content">
                <div class="step-number">1</div>
                <div class="step-info">
                  <h2>Upload Your Logo</h2>
                  <p>Upload your logo or artwork in any format - PNG, JPG, SVG, PDF, or AI files. Our system automatically processes and optimizes your design for decoration.</p>
                  <ul class="step-features">
                    <li>✓ Accepts all major file formats</li>
                    <li>✓ Automatic color separation</li>
                    <li>✓ Vector conversion when needed</li>
                    <li>✓ Quality optimization</li>
                  </ul>
                </div>
              </div>
              <div class="step-visual">
                <div class="upload-demo">
                  <div class="upload-icon">📤</div>
                  <p>Drag & drop or click to upload</p>
                </div>
              </div>
            </div>

            <div class="step-detail reverse">
              <div class="step-visual">
                <div class="positioning-demo">
                  <div class="product-outline"></div>
                  <div class="logo-box"></div>
                  <div class="positioning-controls">
                    <div class="control-dot"></div>
                    <div class="control-dot"></div>
                    <div class="control-dot"></div>
                    <div class="control-dot"></div>
                  </div>
                </div>
              </div>
              <div class="step-content">
                <div class="step-number">2</div>
                <div class="step-info">
                  <h2>Position & Preview</h2>
                  <p>Use our interactive positioning tool to place your logo exactly where you want it. See a realistic preview of how it will look on the finished product.</p>
                  <ul class="step-features">
                    <li>✓ Drag and drop positioning</li>
                    <li>✓ Real-time preview generation</li>
                    <li>✓ Multiple placement options</li>
                    <li>✓ Size and rotation controls</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="step-detail">
              <div class="step-content">
                <div class="step-number">3</div>
                <div class="step-info">
                  <h2>Build Your Quote</h2>
                  <p>Select products, adjust quantities, and get instant pricing with volume discounts. Our transparent pricing shows exactly what you'll pay.</p>
                  <ul class="step-features">
                    <li>✓ Instant price calculations</li>
                    <li>✓ Volume discount tiers</li>
                    <li>✓ Multiple product versions</li>
                    <li>✓ Tax and shipping estimates</li>
                  </ul>
                </div>
              </div>
              <div class="step-visual">
                <div class="quote-demo">
                  <div class="quote-line">
                    <span>T-Shirt × 50</span>
                    <span>$23.99</span>
                  </div>
                  <div class="quote-line">
                    <span>Polo Shirt × 25</span>
                    <span>$28.99</span>
                  </div>
                  <div class="quote-total">
                    <span><strong>Total: $1,924.75</strong></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="step-detail reverse">
              <div class="step-visual">
                <div class="delivery-demo">
                  <div class="timeline">
                    <div class="timeline-item active">
                      <div class="timeline-dot"></div>
                      <span>Order Placed</span>
                    </div>
                    <div class="timeline-item active">
                      <div class="timeline-dot"></div>
                      <span>In Production</span>
                    </div>
                    <div class="timeline-item">
                      <div class="timeline-dot"></div>
                      <span>Quality Check</span>
                    </div>
                    <div class="timeline-item">
                      <div class="timeline-dot"></div>
                      <span>Shipped</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="step-content">
                <div class="step-number">4</div>
                <div class="step-info">
                  <h2>Fast Production & Delivery</h2>
                  <p>Once you approve your order, we get to work immediately. Most orders ship within 48 hours with professional decoration and quality guaranteed.</p>
                  <ul class="step-features">
                    <li>✓ 48-hour average turnaround</li>
                    <li>✓ Professional decoration methods</li>
                    <li>✓ Quality guarantee</li>
                    <li>✓ Order tracking included</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- Guarantees Section -->
          <section class="guarantees-section">
            <h2 class="section-title">Our Guarantees</h2>
            <div class="guarantees-grid">
              <div class="guarantee-card">
                <div class="guarantee-icon">⚡</div>
                <h3>Fast Turnaround</h3>
                <p>Most orders ship within 48 hours. Rush orders available for same-day or next-day delivery.</p>
              </div>
              <div class="guarantee-card">
                <div class="guarantee-icon">✨</div>
                <h3>Quality Promise</h3>
                <p>100% satisfaction guarantee. If you're not happy with the quality, we'll make it right.</p>
              </div>
              <div class="guarantee-card">
                <div class="guarantee-icon">💰</div>
                <h3>Transparent Pricing</h3>
                <p>No hidden fees or surprise charges. What you see in your quote is exactly what you pay.</p>
              </div>
              <div class="guarantee-card">
                <div class="guarantee-icon">🎯</div>
                <h3>Perfect Positioning</h3>
                <p>Our calibrated positioning system ensures your logo is placed exactly where you want it.</p>
              </div>
            </div>
          </section>

          <!-- CTA Section -->
          <section class="page-cta">
            <div class="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of businesses who trust us with their custom apparel needs</p>
              <a href="/quote" class="btn btn-primary btn-lg">Start Building Your Quote</a>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Add any interactive behaviors here
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn[href="/quote"]')) {
        e.preventDefault();
        window.router.navigate('/quote');
      }
    });
  }
}

// Export for router
window.HowItWorks = HowItWorks;