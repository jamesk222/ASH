import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { Toast } from './components/common/Toast';

// Home components
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryGrid } from './components/home/CategoryGrid';
import { TrendingGrid } from './components/home/TrendingGrid';
import { SocialTrends } from './components/home/SocialTrends';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { ReviewsSection } from './components/home/ReviewsSection';

// Pages
import { ShopPage } from './components/pages/ShopPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';
import { AccountPage } from './components/pages/AccountPage';
import { 
  AboutUsPage, 
  ContactUsPage, 
  FAQPage, 
  PolicyPage 
} from './components/pages/InfoPages';
import { ShoppingBag } from 'lucide-react';

const StoreContent: React.FC = () => {
  const { activeRoute, navigateTo } = useStore();

  const renderCurrentView = () => {
    switch (activeRoute) {
      case 'home':
        return (
          <main>
            <HeroBanner />
            <CategoryGrid />
            <TrendingGrid />
            <SocialTrends />
            <WhyChooseUs />
            <ReviewsSection />
          </main>
        );

      case 'shop':
        return <ShopPage />;

      case 'product-detail':
        return <ProductDetailPage />;

      case 'cart':
      case 'checkout':
        return <CheckoutPage />;

      case 'order-tracking':
        return <OrderTrackingPage />;

      case 'account':
      case 'wishlist':
        return <AccountPage />;

      case 'about':
        return <AboutUsPage />;

      case 'contact':
        return <ContactUsPage />;

      case 'faq':
        return <FAQPage />;

      case 'shipping-policy':
        return <PolicyPage type="shipping" />;

      case 'returns-policy':
        return <PolicyPage type="returns" />;

      case 'privacy-policy':
        return <PolicyPage type="privacy" />;

      case 'terms-conditions':
        return <PolicyPage type="terms" />;

      case 'accessibility':
        return <PolicyPage type="accessibility" />;

      default:
        // Section 37: 404 Page requirement
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#faf9f6]">
            <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center mb-4 text-neutral-600">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              LOOKS LIKE THIS PAGE WENT SHOPPING.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mt-2 mb-6">
              The page or product you were looking for is currently unavailable or has been relocated in our catalog.
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 font-sans antialiased">
      <Header />
      <div className="flex-1">
        {renderCurrentView()}
      </div>
      <Footer />

      {/* Global Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
