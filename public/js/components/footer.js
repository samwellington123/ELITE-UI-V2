// Footer component
class Footer {
  constructor() {
    this.render();
  }

  render() {
    const footerEl = document.getElementById('main-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
      <div class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>Directum Supply Co.</h3>
              <p>Professional custom apparel decoration with fast turnaround times and exceptional quality.</p>
            </div>
            
            <div class="footer-section">
              <h3>Services</h3>
              <ul>
                <li><a href="/services#embroidery">Embroidery</a></li>
                <li><a href="/services#screen-print">Screen Printing</a></li>
                <li><a href="/services#dtf">DTF / Heat Transfer</a></li>
                <li><a href="/services#promotional">Promotional Products</a></li>
              </ul>
            </div>
            
            <div class="footer-section">
              <h3>Company</h3>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/how-it-works">How It Works</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/quote">Get Quote</a></li>
              </ul>
            </div>
            
            <div class="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="/legal/terms">Terms of Service</a></li>
                <li><a href="/legal/privacy">Privacy Policy</a></li>
                <li><a href="mailto:support@directumsupply.com">support@directumsupply.com</a></li>
                <li><a href="tel:+1-555-0123">(555) 012-3456</a></li>
              </ul>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Directum Supply Co. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.footer = new Footer();
  });
} else {
  window.footer = new Footer();
}