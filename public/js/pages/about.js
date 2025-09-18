// About page implementation
class About {
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
      <div class="about-page">
        <div class="container">
          <!-- Hero Section -->
          <section class="page-hero">
            <h1 class="page-title">About Directum Supply Co.</h1>
            <p class="page-subtitle">Your trusted partner for custom apparel and promotional products since 2015</p>
          </section>

          <!-- Company Story -->
          <section class="company-story">
            <div class="story-content">
              <div class="story-text">
                <h2>Our Story</h2>
                <p>Founded in 2015, Directum Supply Co. began with a simple mission: make custom apparel decoration fast, affordable, and hassle-free. What started as a small operation has grown into a trusted partner for thousands of businesses nationwide.</p>
                
                <p>We've always believed that great promotional products shouldn't require weeks of waiting or complicated processes. That's why we've invested heavily in technology and streamlined workflows to deliver professional results in record time.</p>
                
                <p>Today, we're proud to serve everyone from small startups to Fortune 500 companies, helping them build their brands through high-quality custom apparel and promotional products.</p>
              </div>
              <div class="story-image">
                <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Our facility" loading="lazy">
              </div>
            </div>
          </section>

          <!-- Values Section -->
          <section class="values-section">
            <h2 class="section-title">Our Values</h2>
            <div class="values-grid">
              <div class="value-card">
                <div class="value-icon">⚡</div>
                <h3>Speed</h3>
                <p>We understand that time is money. Our streamlined processes and advanced technology ensure your orders are completed quickly without sacrificing quality.</p>
              </div>
              <div class="value-card">
                <div class="value-icon">✨</div>
                <h3>Quality</h3>
                <p>Every product that leaves our facility meets the highest standards. We use premium materials and professional decoration techniques to ensure lasting results.</p>
              </div>
              <div class="value-card">
                <div class="value-icon">🤝</div>
                <h3>Service</h3>
                <p>Our team is here to help every step of the way. From design consultation to order tracking, we provide the support you need to succeed.</p>
              </div>
              <div class="value-card">
                <div class="value-icon">💡</div>
                <h3>Innovation</h3>
                <p>We continuously invest in new technology and processes to make custom apparel decoration easier and more accessible for businesses of all sizes.</p>
              </div>
            </div>
          </section>

          <!-- Team Section -->
          <section class="team-section">
            <h2 class="section-title">Meet Our Team</h2>
            <div class="team-grid">
              <div class="team-member">
                <div class="member-photo">
                  <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Sarah Johnson" loading="lazy">
                </div>
                <div class="member-info">
                  <h3>Sarah Johnson</h3>
                  <p class="member-title">Founder & CEO</p>
                  <p class="member-bio">Sarah founded Directum Supply Co. with a vision to revolutionize the custom apparel industry through technology and exceptional service.</p>
                </div>
              </div>
              <div class="team-member">
                <div class="member-photo">
                  <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Mike Chen" loading="lazy">
                </div>
                <div class="member-info">
                  <h3>Mike Chen</h3>
                  <p class="member-title">Head of Production</p>
                  <p class="member-bio">With over 15 years in the decoration industry, Mike ensures every order meets our exacting quality standards.</p>
                </div>
              </div>
              <div class="team-member">
                <div class="member-photo">
                  <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Lisa Rodriguez" loading="lazy">
                </div>
                <div class="member-info">
                  <h3>Lisa Rodriguez</h3>
                  <p class="member-title">Customer Success Manager</p>
                  <p class="member-bio">Lisa leads our customer success team, ensuring every client has an exceptional experience from quote to delivery.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Facility Section -->
          <section class="facility-section">
            <div class="facility-content">
              <div class="facility-image">
                <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Our production facility" loading="lazy">
              </div>
              <div class="facility-text">
                <h2>State-of-the-Art Facility</h2>
                <p>Our 25,000 square foot facility houses the latest in decoration technology, from high-speed embroidery machines to advanced screen printing equipment.</p>
                
                <div class="facility-features">
                  <div class="feature">
                    <h4>🏭 Modern Equipment</h4>
                    <p>Latest generation embroidery, screen printing, and DTF equipment for superior results</p>
                  </div>
                  <div class="feature">
                    <h4>📦 Efficient Fulfillment</h4>
                    <p>Streamlined workflow and inventory management for fast turnaround times</p>
                  </div>
                  <div class="feature">
                    <h4>🔍 Quality Control</h4>
                    <p>Dedicated QC stations ensure every item meets our high standards</p>
                  </div>
                  <div class="feature">
                    <h4>🌱 Eco-Friendly</h4>
                    <p>Sustainable practices and eco-friendly inks and materials when possible</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Stats Section -->
          <section class="stats-section">
            <h2 class="section-title">By the Numbers</h2>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">50,000+</div>
                <div class="stat-label">Orders Completed</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">2,500+</div>
                <div class="stat-label">Happy Customers</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">48hrs</div>
                <div class="stat-label">Average Turnaround</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">99.2%</div>
                <div class="stat-label">Customer Satisfaction</div>
              </div>
            </div>
          </section>

          <!-- CTA Section -->
          <section class="page-cta">
            <div class="cta-content">
              <h2>Ready to Work Together?</h2>
              <p>Join thousands of businesses who trust us with their custom apparel needs</p>
              <div class="cta-buttons">
                <a href="/quote" class="btn btn-primary btn-lg">Get Started</a>
                <a href="/contact" class="btn btn-secondary btn-lg">Contact Us</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
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
  }
}

// Export for router
window.About = About;