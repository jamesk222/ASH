import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Lock,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      showToast('Thank you! Use promo code WELCOME10 for 10% off your first order.');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Column 1: Brand & Business Details */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white text-neutral-950 font-bold text-sm flex items-center justify-center">
                ASH
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight leading-none">
                  ASH GLOBAL
                </span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mt-0.5">
                  Commerce LLC
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated modern retail storefront bringing high-demand everyday essentials, stylish fashion, beauty tools, and tech accessories to consumers across the United States.
            </p>

            <div className="space-y-2 text-xs text-neutral-400 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>30 N GOULD ST 67511<br />SHERIDAN, WY 82801, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href="tel:+447930452817" className="hover:text-white transition-colors">+44 7930452817</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href="mailto:info@ashglobalcommercellc.com" className="hover:text-white transition-colors">
                  info@ashglobalcommercellc.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Shop Departments */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-4">
              Shop Departments
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => navigateTo('shop', null, 'womens-fashion')} className="hover:text-white transition-colors">
                  Women's Fashion
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'mens-fashion')} className="hover:text-white transition-colors">
                  Men's Fashion
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'shoes')} className="hover:text-white transition-colors">
                  Shoes & Slides
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'bags-accessories')} className="hover:text-white transition-colors">
                  Bags & Accessories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'jewelry')} className="hover:text-white transition-colors">
                  Jewelry & Accents
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'beauty-hair')} className="hover:text-white transition-colors">
                  Beauty & Hair Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'home-lifestyle')} className="hover:text-white transition-colors">
                  Home & Organization
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'electronics-accessories')} className="hover:text-white transition-colors">
                  Tech Essentials
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', null, 'deals')} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Deals Under $25
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => navigateTo('order-tracking')} className="hover:text-white transition-colors flex items-center gap-1.5 font-medium text-neutral-200">
                  Track Your Order <ArrowRight className="w-3 h-3 text-neutral-500" />
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-policy')} className="hover:text-white transition-colors">
                  Shipping & Handling
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('returns-policy')} className="hover:text-white transition-colors">
                  30-Day Returns & Refunds
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  Manage Account
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: About & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About ASH Global Commerce
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy (CCPA)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms-conditions')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('accessibility')} className="hover:text-white transition-colors">
                  Accessibility Statement
                </button>
              </li>
              <li>
                <a 
                  href="https://www.ashglobalcommercellc.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Globe className="w-3 h-3 text-neutral-500" /> www.ashglobalcommercellc.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter & Guarantee */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-3">
              Get 10% Off Your Order
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              Subscribe for new drop alerts, viral marketplace trends, and exclusive member discounts.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-neutral-900 border border-emerald-900/60 rounded-lg text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Check your inbox for your 10% welcome voucher.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs rounded-lg transition-colors"
                >
                  Join Newsletter
                </button>
                <div className="text-[11px] text-neutral-500 leading-tight">
                  By joining, you agree to receive retail promotional updates. Unsubscribe anytime.
                </div>
              </form>
            )}

            {/* Marketplace Ready Badge */}
            <div className="mt-6 pt-4 border-t border-neutral-900">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                Multi-Channel Standard
              </span>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Catalog compliant with Walmart Marketplace, TikTok Shop, and Poshmark cross-listing standards.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Methods, Trust & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified U.S. Business
            </span>
            <span className="hidden md:inline text-neutral-700">·</span>
            <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <Lock className="w-4 h-4 text-neutral-400" />
              PCI-DSS Compliant Encryption
            </span>
          </div>

          {/* Payment Badges (Clean text/cards, no broken images) */}
          <div className="flex items-center gap-2">
            {['Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal', 'Apple Pay', 'Google Pay'].map((brand) => (
              <span 
                key={brand}
                className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[10px] font-medium text-neutral-400 rounded"
              >
                {brand}
              </span>
            ))}
          </div>

          <div className="text-center md:text-right text-neutral-400 text-[11px]">
            © {new Date().getFullYear()} ASH Global Commerce LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
