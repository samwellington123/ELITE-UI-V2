// Terms of Service page implementation
class LegalTerms {
  constructor() {
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const mainContent = utils.$('#main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
      <div class="legal-page">
        <div class="container">
          <div class="legal-content">
            <h1 class="legal-title">Terms of Service</h1>
            <p class="legal-updated">Last updated: ${new Date().toLocaleDateString()}</p>

            <div class="legal-section">
              <h2>Acceptance of Terms</h2>
              <p>By accessing and using Directum Supply Co.'s website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>

            <div class="legal-section">
              <h2>Services</h2>
              <p>Directum Supply Co. provides custom apparel decoration and promotional product services. We reserve the right to modify or discontinue services at any time without notice.</p>
            </div>

            <div class="legal-section">
              <h2>Orders and Payment</h2>
              <h3>Order Acceptance</h3>
              <ul>
                <li>All orders are subject to acceptance by Directum Supply Co.</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Prices are subject to change without notice</li>
              </ul>

              <h3>Payment Terms</h3>
              <ul>
                <li>Payment is due upon order placement unless other arrangements are made</li>
                <li>We accept major credit cards and ACH transfers</li>
                <li>Net 30 terms available for approved commercial accounts</li>
              </ul>
            </div>

            <div class="legal-section">
              <h2>Artwork and Intellectual Property</h2>
              <h3>Customer Responsibilities</h3>
              <ul>
                <li>You warrant that you own or have permission to use all submitted artwork</li>
                <li>You are responsible for any copyright or trademark infringement</li>
                <li>Artwork must be suitable for the intended decoration method</li>
              </ul>

              <h3>Our Rights</h3>
              <ul>
                <li>We may refuse to produce items that violate intellectual property rights</li>
                <li>We reserve the right to refuse offensive or inappropriate content</li>
                <li>We may use completed work for promotional purposes unless requested otherwise</li>
              </ul>
            </div>

            <div class="legal-section">
              <h2>Production and Delivery</h2>
              <h3>Turnaround Times</h3>
              <ul>
                <li>Standard turnaround is 5-7 business days from proof approval</li>
                <li>Rush orders available for additional fees</li>
                <li>Turnaround times are estimates, not guarantees</li>
              </ul>

              <h3>Shipping</h3>
              <ul>
                <li>Shipping costs are additional unless otherwise specified</li>
                <li>Risk of loss transfers to customer upon shipment</li>
                <li>We are not responsible for shipping delays beyond our control</li>
              </ul>
            </div>

            <div class="legal-section">
              <h2>Quality and Returns</h2>
              <h3>Quality Standards</h3>
              <ul>
                <li>We guarantee workmanship for 30 days from delivery</li>
                <li>Minor variations in color and placement are normal</li>
                <li>Custom products cannot be returned unless defective</li>
              </ul>

              <h3>Defective Products</h3>
              <ul>
                <li>Report defects within 7 days of receipt</li>
                <li>We will replace or refund defective items at our discretion</li>
                <li>Our liability is limited to the cost of the defective items</li>
              </ul>
            </div>

            <div class="legal-section">
              <h2>Limitation of Liability</h2>
              <p>In no event shall Directum Supply Co. be liable for any indirect, incidental, special, or consequential damages. Our total liability shall not exceed the amount paid for the specific order in question.</p>
            </div>

            <div class="legal-section">
              <h2>Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of the state where Directum Supply Co. is incorporated, without regard to conflict of law principles.</p>
            </div>

            <div class="legal-section">
              <h2>Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.</p>
            </div>

            <div class="legal-section">
              <h2>Contact Information</h2>
              <p>For questions about these terms, please contact us:</p>
              <ul>
                <li>Email: legal@directumsupply.com</li>
                <li>Phone: (555) 012-3456</li>
                <li>Address: 1234 Industrial Blvd, Manufacturing City, ST 12345</li>
              </ul>
            </div>

            <div class="legal-footer">
              <a href="/legal/privacy" class="btn btn-secondary">View Privacy Policy</a>
              <a href="/contact" class="btn btn-primary">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Export for router
window.LegalTerms = LegalTerms;