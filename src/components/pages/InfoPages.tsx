import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  HelpCircle, 
  Truck, 
  RotateCcw, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-[#faf9f6] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            About Our Company
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Curated Commerce Built for Modern Life
          </h1>
          <p className="text-sm text-neutral-500 max-w-xl mx-auto">
            ASH Global Commerce LLC is a dedicated U.S. online retailer committed to bringing customers practical, stylish, and durable products at accessible prices.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 sm:p-12 shadow-xs space-y-6 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-xl font-bold text-neutral-900">Our Story & Mission</h2>
          <p>
            Founded and registered in Sheridan, Wyoming, <strong>ASH Global Commerce LLC</strong> was created to solve a common frustration in modern online shopping: endless pages of low-quality, overpriced items with unpredictable shipping times.
          </p>
          <p>
            We curate and supply trending lifestyle products across women's and men's apparel, beauty tools, kitchen and home organizers, and smart electronics accessories. Every item in our catalog is selected against strict standards: durable materials, intuitive utility, and strong price-to-performance value within our signature $15 to $50 range.
          </p>

          <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs border-t border-neutral-100">
            <div className="p-4 bg-neutral-50 rounded-xl space-y-1.5">
              <span className="font-bold text-neutral-900 block text-sm">Quality Focused</span>
              <p className="text-neutral-600">We partner with verified manufacturing sources to guarantee construction integrity and finish.</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl space-y-1.5">
              <span className="font-bold text-neutral-900 block text-sm">U.S. Fulfillment</span>
              <p className="text-neutral-600">Orders are packed and dispatched via USPS Priority and UPS Ground with transparent tracking.</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl space-y-1.5">
              <span className="font-bold text-neutral-900 block text-sm">Customer First</span>
              <p className="text-neutral-600">30-day hassle-free returns and direct email and phone support for all shoppers.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100">
            <h3 className="font-bold text-neutral-900 text-base mb-2">Registered Entity Details</h3>
            <div className="text-xs text-neutral-600 space-y-1 font-mono">
              <div>Entity Name: ASH Global Commerce LLC</div>
              <div>Principal Office: 30 N GOULD ST 67511 SHERIDAN, WY 82801, USA</div>
              <div>Inquiries: info@ashglobalcommercellc.com</div>
              <div>Telephone: +44 7930452817</div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs"
          >
            Explore Our Catalog
          </button>
        </div>

      </div>
    </div>
  );
};

export const ContactUsPage: React.FC = () => {
  const { showToast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', orderNumber: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent! We will respond within 24 business hours.');
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            Support & Inquiries
          </span>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Contact Customer Support
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
            Have a question about an order, shipment, or return? Our team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Info Card (5 cols) */}
          <div className="md:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs space-y-6 text-xs text-neutral-700">
            <div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Corporate Office</h3>
              <div className="flex items-start gap-3 mt-2">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>
                  <strong>ASH Global Commerce LLC</strong><br />
                  30 N GOULD ST 67511<br />
                  SHERIDAN, WY 82801, United States
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Direct Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                  <a href="mailto:info@ashglobalcommercellc.com" className="text-neutral-900 underline font-medium">
                    info@ashglobalcommercellc.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                  <a href="tel:+447930452817" className="text-neutral-900 font-medium">
                    +44 7930452817
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <span className="font-bold text-neutral-900 block mb-1">Operating Hours:</span>
              <p className="text-neutral-500">Monday – Friday: 9:00 AM – 5:00 PM (Mountain Time)</p>
              <p className="text-neutral-500 mt-0.5">Average email response time: Under 12 hours</p>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Message Received</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Thank you for reaching out. A customer support representative will follow up with you at <strong>{form.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Order Number (if applicable)</label>
                    <input
                      type="text"
                      placeholder="e.g. ASH-2026-8924"
                      value={form.orderNumber}
                      onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                      className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does shipping take within the United States?',
      a: 'We process and pack all orders within 1 to 2 business days from our Sheridan, WY fulfillment network. Standard U.S. Ground delivery takes approximately 3 to 5 business days via USPS Priority or UPS Ground. Expedited 2-day delivery is also available at checkout.'
    },
    {
      q: 'Do you offer free shipping?',
      a: 'Yes! Standard domestic shipping is 100% FREE on all qualifying orders of $45 or more. For orders below $45, standard ground delivery is a flat $4.99.'
    },
    {
      q: 'What is your return policy?',
      a: 'We offer a 30-day return window from the date of confirmed delivery. Items must be in their original, unused condition with all original packaging and tags. Once received at our facility, refunds are processed to your original payment method within 3 to 5 business days.'
    },
    {
      q: 'Are your payment methods secure?',
      a: 'Absolutely. We utilize PCI-DSS Level 1 compliant tokenized payment processing with 256-bit SSL encryption. We accept Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, and Google Pay. We never store raw card credentials.'
    },
    {
      q: 'How can I track my order?',
      a: 'Once your order ships, you will receive an email confirmation with an active tracking number. You can also visit our Order Tracking page at any time and enter your Order Number and email to see live shipment checkpoints.'
    },
    {
      q: 'Are these products also sold on Walmart or TikTok Shop?',
      a: 'Yes, our catalog is specifically curated to meet the high quality, demonstration, and packaging standards required for top marketplaces including Walmart Marketplace, TikTok Shop, and Poshmark.'
    }
  ];

  return (
    <div className="bg-[#faf9f6] min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Clear, straightforward answers regarding our products, shipping, returns, and ordering.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-neutral-200/90 overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 hover:bg-neutral-50/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export const PolicyPage: React.FC<{ type: 'shipping' | 'returns' | 'privacy' | 'terms' | 'accessibility' }> = ({ type }) => {
  return (
    <div className="bg-[#faf9f6] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 sm:p-12 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          
          {type === 'shipping' && (
            <>
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-500 block">Shipping & Fulfillment</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">U.S. Domestic Shipping Policy</h1>
              <p>Last updated: October 2026. ASH Global Commerce LLC ("we", "us") fulfills orders to addresses within the 50 United States and Puerto Rico.</p>
              <h3 className="font-bold text-neutral-900 text-base">Processing Time</h3>
              <p>All in-stock orders are verified and packed within 1 to 2 business days (excluding federal holidays). Orders placed on weekends will process on the following Monday.</p>
              <h3 className="font-bold text-neutral-900 text-base">Shipping Rates & Estimates</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Standard U.S. Shipping (3–5 Business Days):</strong> $4.99 flat-rate, or FREE on qualifying orders of $45.00 or more.</li>
                <li><strong>Expedited Air Shipping (2 Business Days):</strong> $12.99 flat-rate via UPS 2nd Day Air.</li>
              </ul>
              <h3 className="font-bold text-neutral-900 text-base">Tracking</h3>
              <p>You will receive a shipment notification email containing a tracking number upon carrier pickup. If you experience unexpected transit delays, please contact info@ashglobalcommercellc.com.</p>
            </>
          )}

          {type === 'returns' && (
            <>
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-500 block">Customer Guarantee</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">30-Day Returns & Refund Policy</h1>
              <p>We stand behind the quality of every product we curate. If you are not completely satisfied with your purchase, you may initiate a return within 30 days of confirmed carrier delivery.</p>
              <h3 className="font-bold text-neutral-900 text-base">Eligibility Conditions</h3>
              <p>To qualify for a refund, items must be in their original, unused condition, with all tags and protective packaging intact. Personal care items such as opened facial oils or hygienic cosmetics must be unopened.</p>
              <h3 className="font-bold text-neutral-900 text-base">How to Return an Item</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Contact customer service at info@ashglobalcommercellc.com with your order number.</li>
                <li>Receive a return authorization number (RMA) and prepaid shipping label instructions.</li>
                <li>Drop the packaged item off at any authorized USPS or UPS drop-off location.</li>
              </ol>
              <p>Refunds are processed back to the original method of payment within 3 to 5 business days after inspection at our Sheridan, WY facility.</p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-500 block">Data Protection</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Privacy Policy (CCPA Compliant)</h1>
              <p>ASH Global Commerce LLC respects your privacy. This policy describes our practices regarding information collected through our website at www.ashglobalcommercellc.com.</p>
              <h3 className="font-bold text-neutral-900 text-base">Information We Collect</h3>
              <p>We collect information necessary to fulfill orders, provide customer service, and improve browsing: name, shipping address, email address, phone number, and purchase history. Payment details are processed via secure tokenized gateways; we do not store full payment card numbers.</p>
              <h3 className="font-bold text-neutral-900 text-base">Your Privacy Rights</h3>
              <p>Under the California Consumer Privacy Act (CCPA) and applicable state laws, you have the right to request access to the personal data we hold about you or request its deletion. To exercise these rights, please email info@ashglobalcommercellc.com.</p>
            </>
          )}

          {type === 'terms' && (
            <>
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-500 block">Legal Agreement</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Terms & Conditions of Sale</h1>
              <p>By using this website and submitting an order to ASH Global Commerce LLC, you agree to comply with and be bound by the following terms.</p>
              <h3 className="font-bold text-neutral-900 text-base">Accuracy of Information</h3>
              <p>We make every effort to display accurate product descriptions, pricing, and availability. We reserve the right to correct typographical errors and cancel orders placed with inaccurate pricing.</p>
              <h3 className="font-bold text-neutral-900 text-base">Governing Law</h3>
              <p>These terms and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of the State of Wyoming, United States.</p>
            </>
          )}

          {type === 'accessibility' && (
            <>
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-500 block">Inclusive Design</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Accessibility Statement</h1>
              <p>ASH Global Commerce LLC is dedicated to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards (WCAG 2.2 Level AA guidelines).</p>
              <h3 className="font-bold text-neutral-900 text-base">Measures Taken</h3>
              <p>Our website utilizes semantic HTML5, clear heading structures, high-contrast typography, keyboard navigation focus indicators, descriptive alt tags on product visuals, and accessible form labels.</p>
              <p>If you encounter any accessibility barriers on this website, please contact us at info@ashglobalcommercellc.com or call +44 7930452817.</p>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
