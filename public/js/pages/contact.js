// Contact page implementation
class Contact {
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
      <div class="contact-page">
        <div class="container">
          <!-- Hero Section -->
          <section class="page-hero">
            <h1 class="page-title">Contact Us</h1>
            <p class="page-subtitle">Get in touch with our team - we're here to help with your custom apparel needs</p>
          </section>

          <div class="contact-content">
            <!-- Contact Form -->
            <div class="contact-form-section">
              <div class="card">
                <h2>Send Us a Message</h2>
                <p class="form-description">Have a question about our services or need help with an order? Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form id="contact-form" class="contact-form">
                  <div class="form-row">
                    <div class="form-group">
                      <label for="contact-name">Name *</label>
                      <input type="text" id="contact-name" name="name" required>
                    </div>
                    <div class="form-group">
                      <label for="contact-company">Company</label>
                      <input type="text" id="contact-company" name="company">
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="contact-email">Email *</label>
                      <input type="email" id="contact-email" name="email" required>
                    </div>
                    <div class="form-group">
                      <label for="contact-phone">Phone</label>
                      <input type="tel" id="contact-phone" name="phone">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="contact-subject">Subject</label>
                    <select id="contact-subject" name="subject">
                      <option value="">Select a topic</option>
                      <option value="quote">Request a Quote</option>
                      <option value="order">Order Status</option>
                      <option value="quality">Quality Issue</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="contact-message">Message *</label>
                    <textarea id="contact-message" name="message" rows="6" placeholder="Tell us about your project or question..." required></textarea>
                  </div>

                  <button type="submit" class="btn btn-primary btn-lg btn-full" id="submit-contact">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="contact-info-section">
              <div class="contact-info-card card">
                <h3>Get in Touch</h3>
                <div class="contact-methods">
                  <div class="contact-method">
                    <div class="method-icon">📞</div>
                    <div class="method-info">
                      <h4>Phone</h4>
                      <p><a href="tel:+1-555-0123">(555) 012-3456</a></p>
                      <small>Mon-Fri 8AM-6PM EST</small>
                    </div>
                  </div>

                  <div class="contact-method">
                    <div class="method-icon">✉️</div>
                    <div class="method-info">
                      <h4>Email</h4>
                      <p><a href="mailto:hello@directumsupply.com">hello@directumsupply.com</a></p>
                      <small>We respond within 24 hours</small>
                    </div>
                  </div>

                  <div class="contact-method">
                    <div class="method-icon">📍</div>
                    <div class="method-info">
                      <h4>Address</h4>
                      <p>1234 Industrial Blvd<br>Manufacturing City, ST 12345</p>
                      <small>Facility tours by appointment</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="hours-card card">
                <h3>Business Hours</h3>
                <div class="hours-list">
                  <div class="hours-item">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div class="hours-item">
                    <span>Saturday</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </div>
                  <div class="hours-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p class="hours-note">Rush orders and emergency support available 24/7</p>
              </div>

              <div class="support-card card">
                <h3>Need Immediate Help?</h3>
                <p>For urgent order questions or support, you can also:</p>
                <ul class="support-options">
                  <li>📱 Text us at (555) 012-3456</li>
                  <li>💬 Use our live chat (bottom right)</li>
                  <li>📧 Email support@directumsupply.com</li>
                </ul>
                <div class="support-cta">
                  <a href="/quote" class="btn btn-secondary btn-full">Start a Quote Instead</a>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Section -->
          <section class="faq-section">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <div class="faq-grid">
              <div class="faq-item">
                <h4>What's your minimum order quantity?</h4>
                <p>Minimums vary by decoration method: 12 pieces for embroidery, 24 for screen printing, and no minimum for DTF/heat transfer.</p>
              </div>
              <div class="faq-item">
                <h4>How long does production take?</h4>
                <p>Most orders ship within 48 hours. Rush orders can be completed same-day or next-day for an additional fee.</p>
              </div>
              <div class="faq-item">
                <h4>Do you offer samples?</h4>
                <p>Yes! We can provide samples for $25 each, which is credited back when you place your full order.</p>
              </div>
              <div class="faq-item">
                <h4>What file formats do you accept?</h4>
                <p>We accept PNG, JPG, SVG, PDF, AI, and EPS files. Vector formats (AI, EPS, SVG) work best for embroidery.</p>
              </div>
              <div class="faq-item">
                <h4>Do you ship nationwide?</h4>
                <p>Yes, we ship to all 50 states. Free shipping on orders over $100, otherwise $15 flat rate.</p>
              </div>
              <div class="faq-item">
                <h4>What's your return policy?</h4>
                <p>We guarantee 100% satisfaction. If there's a quality issue with our work, we'll remake your order at no charge.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Handle form submission
    const contactForm = utils.$('#contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission();
      });
    }

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

  async handleFormSubmission() {
    const submitBtn = utils.$('#submit-contact');
    const form = utils.$('#contact-form');
    
    if (!form) return;

    // Get form data
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      utils.toast.error('Please fill in all required fields');
      return;
    }

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    }

    try {
      // Mock API call
      await utils.api.post('/contact', data);
      
      // Show success message
      utils.toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      utils.toast.error('There was an error sending your message. Please try again.');
    } finally {
      // Reset button state
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      }
    }
  }
}

// Export for router
window.Contact = Contact;