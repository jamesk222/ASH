import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    navigateTo, 
    cart, 
    wishlist, 
    user, 
    setIsCartDrawerOpen, 
    totalCartItemCount,
    products,
    setSearchQuery
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigateTo('shop', null, null);
      setIsSearchOpen(false);
    }
  };

  const filteredSearchResults = searchInput.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchInput.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="bg-neutral-900 text-neutral-100 text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center font-medium tracking-wide">
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-neutral-400" /> Free U.S. Shipping on orders $45+
            </span>
            <span className="hidden md:inline text-neutral-600">·</span>
            <span className="hidden md:flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-neutral-400" /> 30-Day Easy Returns
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="hidden sm:inline">Use code <strong className="text-white">WELCOME10</strong> for 10% off</span>
            <button 
              onClick={() => navigateTo('order-tracking')}
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header (Top Bar Contract: 3 Zones) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-neutral-700 hover:text-neutral-900"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Zone 1: Single Element Brand Wordmark */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-left text-neutral-900 group whitespace-nowrap shrink-0"
            aria-label="ASH Global Commerce Homepage"
          >
            <div className="w-9 h-9 rounded bg-neutral-900 flex items-center justify-center text-white font-bold text-base tracking-tighter shadow-sm group-hover:bg-neutral-800 transition-colors">
              ASH
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-neutral-900 leading-none">
                ASH GLOBAL
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mt-0.5">
                Commerce LLC
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links with Mega Menu Hover */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-700">
            <button
              onClick={() => navigateTo('shop', null, null)}
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
            >
              Shop All
            </button>

            {/* Category Dropdowns */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setActiveMegaCategory('women')}
              onMouseLeave={() => setActiveMegaCategory(null)}
            >
              <button 
                onClick={() => navigateTo('shop', null, 'womens-fashion')}
                className="flex items-center gap-1 hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
              >
                Women <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:rotate-180 transition-transform" />
              </button>

              {activeMegaCategory === 'women' && (
                <div className="absolute top-full -left-20 w-[640px] bg-white rounded-xl shadow-2xl border border-neutral-200 p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3">Apparel</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li><button onClick={() => { navigateTo('shop', null, 'womens-fashion'); setActiveMegaCategory(null); }} className="hover:text-neutral-900">Cardigans & Sweaters</button></li>
                      <li><button onClick={() => { navigateTo('shop', null, 'womens-fashion'); setActiveMegaCategory(null); }} className="hover:text-neutral-900">High-Waist Cargo</button></li>
                      <li><button onClick={() => { navigateTo('shop', null, 'womens-fashion'); setActiveMegaCategory(null); }} className="hover:text-neutral-900">Activewear Sets</button></li>
                      <li><button onClick={() => { navigateTo('shop', null, 'womens-fashion'); setActiveMegaCategory(null); }} className="hover:text-neutral-900">Everyday Tops</button></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3">Trending Collections</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li><button onClick={() => { navigateTo('shop', null, 'womens-fashion'); setActiveMegaCategory(null); }} className="hover:text-neutral-900">Fall / Winter Essentials</button></li>
                      <li><button onClick={() => { navigateTo('shop', null, 'womens-fashion'); setActiveMegaCategory(null); }} className="hover:text-neutral-900">Pilates & Studio</button></li>
                      <li><button onClick={() => { navigateTo('shop', null, 'womens-fashion'); setActiveMegaCategory(null); }} className="hover:text-neutral-900">TikTok Best Sellers</button></li>
                    </ul>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Curated Edit</span>
                      <h5 className="font-semibold text-sm text-neutral-900 mt-1">Ribbed Everyday Cardigan</h5>
                      <p className="text-xs text-neutral-500 mt-1">Ultra-soft modal knit with horn buttons.</p>
                    </div>
                    <button
                      onClick={() => { navigateTo('shop', null, 'womens-fashion'); setActiveMegaCategory(null); }}
                      className="mt-3 text-xs font-semibold text-neutral-900 flex items-center gap-1 hover:underline"
                    >
                      Shop Collection <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('shop', null, 'mens-fashion')}
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
            >
              Men
            </button>

            <button
              onClick={() => navigateTo('shop', null, 'bags-accessories')}
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
            >
              Bags & Jewelry
            </button>

            <button
              onClick={() => navigateTo('shop', null, 'beauty-hair')}
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
            >
              Beauty & Care
            </button>

            <button
              onClick={() => navigateTo('shop', null, 'electronics-accessories')}
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-2"
            >
              Tech Essentials
            </button>

            <button
              onClick={() => navigateTo('shop', null, 'deals')}
              className="text-amber-800 font-semibold hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 py-2"
            >
              Deals Under $25
            </button>
          </nav>

          {/* Zone 3: Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account */}
            <button
              onClick={() => navigateTo('account')}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors flex items-center gap-1.5"
              aria-label="Customer account"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-medium text-neutral-800">
                {user ? user.fullName.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors shadow-sm"
              aria-label={`Shopping bag with ${totalCartItemCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold tabular-nums">
                {totalCartItemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products, styles, materials, or SKU..."
                  className="w-full text-base bg-transparent border-none outline-none text-neutral-900 placeholder-neutral-400"
                  autoFocus
                />
              </form>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick search tags */}
            <div className="p-4 bg-neutral-50/50">
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 font-medium">
                <span>Popular Searches:</span>
                <button 
                  onClick={() => { setSearchInput('Cardigan'); }} 
                  className="text-neutral-800 hover:underline"
                >
                  Cardigan
                </button>
                <span>·</span>
                <button 
                  onClick={() => { setSearchInput('Wireless'); }} 
                  className="text-neutral-800 hover:underline"
                >
                  Wireless Charger
                </button>
                <span>·</span>
                <button 
                  onClick={() => { setSearchInput('Earrings'); }} 
                  className="text-neutral-800 hover:underline"
                >
                  Gold Earrings
                </button>
                <span>·</span>
                <button 
                  onClick={() => { setSearchInput('Slides'); }} 
                  className="text-neutral-800 hover:underline"
                >
                  Recovery Slides
                </button>
              </div>

              {filteredSearchResults.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Matching Products</div>
                  {filteredSearchResults.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigateTo('product-detail', product);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer border border-transparent hover:border-neutral-200 transition-all"
                    >
                      <img src={product.primaryImage} alt={product.name} className="w-12 h-12 object-cover rounded bg-neutral-100" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-neutral-900 truncate">{product.name}</div>
                        <div className="text-xs text-neutral-500">${product.price.toFixed(2)} · {product.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Responsive Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50 overflow-y-auto">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                  ASH
                </div>
                <span className="font-bold text-sm tracking-tight text-neutral-900">
                  ASH GLOBAL COMMERCE
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Department Links */}
            <div className="p-4 divide-y divide-neutral-100 flex-1">
              <div className="py-2">
                <button
                  onClick={() => { navigateTo('shop'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-2 font-semibold text-neutral-900 text-sm"
                >
                  Shop All Products
                </button>
              </div>

              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="py-2.5">
                  <button
                    onClick={() => {
                      navigateTo('shop', null, cat.slug);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-left text-sm font-medium text-neutral-800 hover:text-neutral-950"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                </div>
              ))}

              <div className="pt-4 space-y-2 text-sm text-neutral-600">
                <button
                  onClick={() => { navigateTo('order-tracking'); setIsMobileMenuOpen(false); }}
                  className="block py-1 hover:text-neutral-900"
                >
                  Order Tracking
                </button>
                <button
                  onClick={() => { navigateTo('account'); setIsMobileMenuOpen(false); }}
                  className="block py-1 hover:text-neutral-900"
                >
                  My Account
                </button>
                <button
                  onClick={() => { navigateTo('contact'); setIsMobileMenuOpen(false); }}
                  className="block py-1 hover:text-neutral-900"
                >
                  Contact Support
                </button>
              </div>
            </div>

            {/* Footer inside mobile menu */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
              <div className="font-medium text-neutral-700">ASH Global Commerce LLC</div>
              <div className="mt-0.5">30 N Gould St 67511 Sheridan, WY</div>
              <div className="mt-0.5">+44 7930452817</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
