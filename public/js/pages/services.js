// Services page implementation
class Services {
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
      <div class="services-page">
        <div class="container">
          <!-- Hero Section -->
          <section class="page-hero">
            <h1 class="page-title">Our Services</h1>
            <p class="page-subtitle">Professional decoration methods for every need and budget</p>
          </section>

          <!-- Services Grid -->
          <section class="services-grid">
            <div class="service-card" id="embroidery">
              <div class="service-header">
                <div class="service-icon">🧵</div>
                <h2>Embroidery</h2>
                <p class="service-tagline">Premium, durable, professional</p>
              </div>
              
              <div class="service-content">
                <div class="service-description">
                  <p>Our embroidery services provide the most professional and durable decoration option. Perfect for corporate uniforms, team apparel, and high-end promotional items.</p>
                </div>

                <div class="service-details">
                  <div class="detail-section">
                    <h4>Best For:</h4>
                    <ul>
                      <li>Corporate uniforms and polos</li>
                      <li>Hats and caps</li>
                      <li>Jackets and outerwear</li>
                      <li>Premium promotional items</li>
                    </ul>
                  </div>

                  <div class="detail-section">
                    <h4>Specifications:</h4>
                    <ul>
                      <li>Up to 15,000 stitches per design</li>
                      <li>12+ thread colors available</li>
                      <li>Minimum order: 12 pieces</li>
                      <li>Setup fee: $45 per design</li>
                    </ul>
                  </div>

                  <div class="pricing-preview">
                    <h4>Sample Pricing:</h4>
                    <div class="pricing-tiers">
                      <div class="tier">12-23 pieces: <strong>$8.50 each</strong></div>
                      <div class="tier">24-49 pieces: <strong>$7.25 each</strong></div>
                      <div class="tier">50+ pieces: <strong>$6.00 each</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="service-card" id="screen-print">
              <div class="service-header">
                <div class="service-icon">🎨</div>
                <h2>Screen Printing</h2>
                <p class="service-tagline">Vibrant colors, cost-effective</p>
              </div>
              
              <div class="service-content">
                <div class="service-description">
                  <p>Screen printing delivers vibrant, long-lasting colors at an economical price point. Ideal for large orders and designs with solid colors.</p>
                </div>

                <div class="service-details">
                  <div class="detail-section">
                    <h4>Best For:</h4>
                    <ul>
                      <li>T-shirts and apparel</li>
                      <li>Large quantity orders</li>
                      <li>Event and team merchandise</li>
                      <li>Simple logo designs</li>
                    </ul>
                  </div>

                  <div class="detail-section">
                    <h4>Specifications:</h4>
                    <ul>
                      <li>Up to 6 colors per design</li>
                      <li>Pantone color matching</li>
                      <li>Minimum order: 24 pieces</li>
                      <li>Setup fee: $25 per color</li>
                    </ul>
                  </div>

                  <div class="pricing-preview">
                    <h4>Sample Pricing:</h4>
                    <div class="pricing-tiers">
                      <div class="tier">24-49 pieces: <strong>$4.50 each</strong></div>
                      <div class="tier">50-99 pieces: <strong>$3.75 each</strong></div>
                      <div class="tier">100+ pieces: <strong>$2.95 each</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="service-card" id="dtf">
              <div class="service-header">
                <div class="service-icon">🔥</div>
                <h2>DTF / Heat Transfer</h2>
                <p class="service-tagline">Full-color, small quantities</p>
              </div>
              
              <div class="service-content">
                <div class="service-description">
                  <p>Direct-to-Film (DTF) and heat transfer methods allow for full-color, photo-quality prints with no minimum order requirements. Perfect for small runs and complex designs.</p>
                </div>

                <div class="service-details">
                  <div class="detail-section">
                    <h4>Best For:</h4>
                    <ul>
                      <li>Full-color photographs</li>
                      <li>Complex gradient designs</li>
                      <li>Small quantity orders</li>
                      <li>Personalized items</li>
                    </ul>
                  </div>

                  <div class="detail-section">
                    <h4>Specifications:</h4>
                    <ul>
                      <li>Unlimited colors</li>
                      <li>Photo-quality resolution</li>
                      <li>No minimum order</li>
                      <li>Setup fee: $15 per design</li>
                    </ul>
                  </div>

                  <div class="pricing-preview">
                    <h4>Sample Pricing:</h4>
                    <div class="pricing-tiers">
                      <div class="tier">1-11 pieces: <strong>$12.50 each</strong></div>
                      <div class="tier">12-23 pieces: <strong>$9.75 each</strong></div>
                      <div class="tier">24+ pieces: <strong>$7.50 each</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="service-card" id="promotional">
              <div class="service-header">
                <div class="service-icon">🎁</div>
                <h2>Promotional Products</h2>
                <p class="service-tagline">Beyond apparel</p>
              </div>
              
              <div class="service-content">
                <div class="service-description">
                  <p>Expand your brand reach with custom promotional products. From drinkware to tech accessories, we offer a wide range of items to promote your business.</p>
                </div>

                <div class="service-details">
                  <div class="detail-section">
                    <h4>Popular Items:</h4>
                    <ul>
                      <li>Custom mugs and drinkware</li>
                      <li>Branded pens and notebooks</li>
                      <li>Tech accessories and chargers</li>
                      <li>Trade show giveaways</li>
                    </ul>
                  </div>

                  <div class="detail-section">
                    <h4>Decoration Options:</h4>
                    <ul>
                      <li>Laser engraving</li>
                      <li>Pad printing</li>
                      <li>Digital printing</li>
                      <li>Debossing/embossing</li>
                    </ul>
                  </div>

                  <div class="pricing-preview">
                    <h4>Starting Prices:</h4>
                    <div class="pricing-tiers">
                      <div class="tier">Pens: <strong>$0.85 each</strong></div>
                      <div class="tier">Mugs: <strong>$4.25 each</strong></div>
                      <div class="tier">Tech items: <strong>$12.50 each</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Process Overview -->
          <section class="process-overview">
            <h2 class="section-title">Our Process</h2>
            <div class="process-steps">
              <div class="process-step">
                <div class="process-number">1</div>
                <h3>Consultation</h3>
                <p>We review your artwork and recommend the best decoration method for your needs and budget.</p>
              </div>
              <div class="process-step">
                <div class="process-number">2</div>
                <h3>Proof Approval</h3>
                <p>You'll receive a digital proof showing exactly how your finished product will look.</p>
              </div>
              <div class="process-step">
                <div class="process-number">3</div>
                <h3>Production</h3>
                <p>Our skilled technicians use professional equipment to decorate your items to perfection.</p>
              </div>
              <div class="process-step">
                <div class="process-number">4</div>
                <h3>Quality Control</h3>
                <p>Every item is inspected to ensure it meets our high standards before shipping.</p>
              </div>
            </div>
          </section>

          <!-- CTA Section -->
          <section class="page-cta">
            <div class="cta-content">
              <h2>Ready to Start Your Project?</h2>
              <p>Get instant quotes and see your designs come to life</p>
              <a href="/quote" class="btn btn-primary btn-lg">Build Your Quote</a>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Smooth scroll to service sections
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Handle quote button clicks
      if (e.target.closest('.btn[href="/quote"]')) {
        e.preventDefault();
        window.router.navigate('/quote');
      }
    });
  }
}

// Export for router
window.Services = Services;