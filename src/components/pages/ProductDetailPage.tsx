import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductVariant } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { 
  Star, 
  ShoppingBag, 
  Zap, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight, 
  Check, 
  Plus, 
  Minus,
  CheckCircle2,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    showToast 
  } = useStore();

  const product = selectedProduct || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping' | 'reviews'>('details');

  const inWishlist = isInWishlist(product.id);
  const currentVariant = selectedVariant || (product.variants && product.variants[0]);
  const activePrice = currentVariant?.price ?? product.price;

  const images = product.images && product.images.length > 0 ? product.images : [product.primaryImage];

  // Frequently bought together companion
  const companionProduct = products.find(p => p.id !== product.id && p.category !== product.category) || products[1];
  const bundleSavings = 5.00;
  const bundleTotal = activePrice + companionProduct.price - bundleSavings;

  const handleAddToCart = () => {
    addToCart(product, currentVariant, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, currentVariant, quantity, false);
    navigateTo('checkout');
  };

  const handleAddBundleToCart = () => {
    addToCart(product, currentVariant, 1, false);
    addToCart(companionProduct, companionProduct.variants[0], 1, true);
    showToast('Bundle added to bag with $5 savings!');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.rating >= 4.8))
    .slice(0, 4);

  return (
    <div className="bg-[#faf9f6] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
          <button onClick={() => navigateTo('home')} className="hover:text-neutral-900">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop', null, product.category)} className="hover:text-neutral-900 capitalize">
            {product.category.replace('-', ' ')}
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 lg:p-10 shadow-xs">
          
          {/* Gallery Col (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src={images[selectedImageIndex] || product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badges && product.badges.length > 0 && (
                <div className="absolute top-4 left-4 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded">
                  {product.badges[0]}
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 bg-neutral-100 transition-all ${
                      selectedImageIndex === idx ? 'border-neutral-900 ring-2 ring-neutral-900/10' : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Value Highlights Pill Row */}
            <div className="pt-4 grid grid-cols-3 gap-3 text-center text-xs text-neutral-600 border-t border-neutral-100">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <Truck className="w-4 h-4 mx-auto mb-1 text-neutral-800" />
                <span className="font-semibold text-neutral-900 block">Fast Dispatch</span>
                <span className="text-[11px] text-neutral-500">1-2 business days</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <RotateCcw className="w-4 h-4 mx-auto mb-1 text-neutral-800" />
                <span className="font-semibold text-neutral-900 block">30-Day Returns</span>
                <span className="text-[11px] text-neutral-500">Hassle-free guarantee</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-neutral-800" />
                <span className="font-semibold text-neutral-900 block">Authentic Quality</span>
                <span className="text-[11px] text-neutral-500">U.S. standard verified</span>
              </div>
            </div>
          </div>

          {/* Purchasing Module Col (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Header metadata */}
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-1">
                  <span className="uppercase tracking-wider font-semibold text-neutral-500">
                    ASH Global Commerce · SKU: {product.sku}
                  </span>
                  <div className="flex items-center gap-1 text-neutral-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold tabular-nums">{product.rating}</span>
                    <span className="text-neutral-500">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-neutral-100">
                <span className="text-3xl font-bold text-neutral-900 tabular-nums">
                  ${activePrice.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-neutral-400 line-through tabular-nums">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-md">
                    Save ${(product.compareAtPrice - activePrice).toFixed(2)} (
                    {Math.round(((product.compareAtPrice - activePrice) / product.compareAtPrice) * 100)}% off)
                  </span>
                )}
              </div>

              {/* Inventory Stock Indicator */}
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-semibold text-neutral-900">In Stock</span>
                <span className="text-neutral-500">· Ships from Sheridan, WY fulfillment center</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-500">
                      Select Option
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {currentVariant?.name}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-2 text-xs rounded-lg border font-medium transition-all ${
                          currentVariant?.id === v.id
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                            : 'border-neutral-200 text-neutral-800 hover:border-neutral-400 bg-white'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                  Quantity
                </label>
                <div className="flex items-center border border-neutral-300 rounded-lg w-fit bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-neutral-100 text-neutral-600 rounded-l"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-bold tabular-nums text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-neutral-100 text-neutral-600 rounded-r"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 border rounded-lg transition-colors ${
                    inWishlist 
                      ? 'bg-neutral-900 text-white border-neutral-900' 
                      : 'border-neutral-300 text-neutral-700 hover:border-neutral-900 bg-white'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-3.5 border border-neutral-300 text-neutral-700 hover:border-neutral-900 bg-white rounded-lg transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now (Instant Checkout)</span>
              </button>

              <div className="text-center text-[11px] text-neutral-500 pt-1">
                Guaranteed safe and secure checkout via Visa, MC, Amex, PayPal, Apple Pay
              </div>
            </div>

          </div>

        </div>

        {/* Frequently Bought Together Bundle */}
        <div className="mt-12 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8">
          <div className="text-xs uppercase tracking-wider font-bold text-neutral-500 mb-1">
            Smart Savings Bundle
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">
            Frequently Bought Together
          </h3>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Products paired */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3">
                <img src={product.primaryImage} alt={product.name} className="w-20 h-20 object-cover rounded-lg bg-neutral-100 border border-neutral-200" />
                <div>
                  <div className="text-xs font-bold text-neutral-900">{product.name}</div>
                  <div className="text-xs text-neutral-500 font-semibold">${activePrice.toFixed(2)}</div>
                </div>
              </div>

              <span className="text-xl font-bold text-neutral-400">+</span>

              <div className="flex items-center gap-3">
                <img src={companionProduct.primaryImage} alt={companionProduct.name} className="w-20 h-20 object-cover rounded-lg bg-neutral-100 border border-neutral-200" />
                <div>
                  <div className="text-xs font-bold text-neutral-900">{companionProduct.name}</div>
                  <div className="text-xs text-neutral-500 font-semibold">${companionProduct.price.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Bundle Price & Add */}
            <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200 w-full lg:w-auto justify-between lg:justify-start">
              <div>
                <div className="text-xs text-neutral-500">Bundle Price:</div>
                <div className="text-xl font-bold text-neutral-900 tabular-nums">${bundleTotal.toFixed(2)}</div>
                <div className="text-[11px] text-emerald-700 font-semibold">Save $5.00 automatically</div>
              </div>

              <button
                onClick={handleAddBundleToCart}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
              >
                Add Both to Bag
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications, Description & Shipping */}
        <div className="mt-12 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8">
          <div className="flex border-b border-neutral-200 gap-6 text-sm font-semibold mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 transition-colors whitespace-nowrap ${
                activeTab === 'details' ? 'border-b-2 border-neutral-900 text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Description & Features
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 transition-colors whitespace-nowrap ${
                activeTab === 'specs' ? 'border-b-2 border-neutral-900 text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Specifications & Materials
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 transition-colors whitespace-nowrap ${
                activeTab === 'shipping' ? 'border-b-2 border-neutral-900 text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              U.S. Shipping & Returns
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="space-y-4 text-xs sm:text-sm text-neutral-700 max-w-3xl leading-relaxed">
              <p>{product.description}</p>
              
              <h4 className="font-bold text-neutral-900 pt-2">Key Highlights:</h4>
              <ul className="space-y-2">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm max-w-3xl">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-400 font-semibold block text-xs">Materials</span>
                <span className="font-medium text-neutral-800">{product.materials || 'High-grade commercial materials'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-400 font-semibold block text-xs">Dimensions / Sizing</span>
                <span className="font-medium text-neutral-800">{product.dimensions || 'Standard US sizing specifications'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-400 font-semibold block text-xs">Care Instructions</span>
                <span className="font-medium text-neutral-800">{product.careInstructions || 'Wipe clean or gentle machine wash as indicated on inner label'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-400 font-semibold block text-xs">Shipping Weight</span>
                <span className="font-medium text-neutral-800">{product.weightLbs} lbs (Lightweight parcel)</span>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs sm:text-sm text-neutral-700 max-w-3xl leading-relaxed">
              <p>
                <strong>Order Processing:</strong> All orders are verified and dispatched from our fulfillment network within 1–2 business days.
              </p>
              <p>
                <strong>Delivery Timelines:</strong> Standard U.S. Ground delivery typically takes 3–5 business days via USPS Priority or UPS Ground. Free on qualifying orders over $45. Expedited shipping is available at checkout.
              </p>
              <p>
                <strong>30-Day Easy Returns:</strong> Items in original, unworn condition with tags attached are eligible for return or exchange within 30 days of confirmed delivery.
              </p>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
              You May Also Like
            </h3>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-semibold text-neutral-900 hover:underline"
            >
              View More
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
