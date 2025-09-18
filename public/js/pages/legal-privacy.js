// Privacy Policy page implementation
class LegalPrivacy {
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
            <h1 class="legal-title">Privacy Policy</h1>
            <p class="legal-updated">Last updated: ${new Date().toLocaleDateString()}</p>

            <div class="legal-section">
              <h2>Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
              
              <h3>Personal Information</h3>
              <ul>
                <li>Name and contact information (email, phone, address)</li>
                <li>Company information and billing details</li>
                <li>Order history and preferences</li>
                <li>Communications with our support team</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <ul>
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Website usage and interaction data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div class="legal-section">
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send order updates and important account information</li>
                <li>Improve our products and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div class="legal-section">
              <h2>Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
              <ul>
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in our operations</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>

            <div class="legal-section">
              <h2>Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
            </div>

            <div class="legal-section">
              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </div>

            <div class="legal-section">
              <h2>Cookies</h2>
              <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
            </div>

            <div class="legal-section">
              <h2>Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.</p>
            </div>

            <div class="legal-section">
              <h2>Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us:</p>
              <ul>
                <li>Email: privacy@directumsupply.com</li>
                <li>Phone: (555) 012-3456</li>
                <li>Address: 1234 Industrial Blvd, Manufacturing City, ST 12345</li>
              </ul>
            </div>

            <div class="legal-footer">
              <a href="/legal/terms" class="btn btn-secondary">View Terms of Service</a>
              <a href="/contact" class="btn btn-primary">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Export for router
window.LegalPrivacy = LegalPrivacy;