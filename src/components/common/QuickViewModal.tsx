import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductVariant } from '../../types';
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, navigateTo } = useStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const currentVariant = selectedVariant || quickViewProduct.variants[0];
  const price = currentVariant?.price ?? quickViewProduct.price;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentVariant, quantity, true);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-neutral-900 bg-white/80 rounded-full backdrop-blur-xs"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-[4/3] md:aspect-auto bg-neutral-100 min-h-[320px]">
              <img
                src={quickViewProduct.primaryImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content side */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                  <span className="uppercase font-semibold tracking-wider text-neutral-400">
                    SKU: {quickViewProduct.sku}
                  </span>
                  <span>·</span>
                  <div className="flex items-center gap-1 text-neutral-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold tabular-nums">{quickViewProduct.rating}</span>
                    <span className="text-neutral-400">({quickViewProduct.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 leading-snug">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-bold text-neutral-900 tabular-nums">
                    ${price.toFixed(2)}
                  </span>
                  {quickViewProduct.compareAtPrice && (
                    <span className="text-sm text-neutral-400 line-through tabular-nums">
                      ${quickViewProduct.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                  {quickViewProduct.compareAtPrice && (
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">
                      Save ${(quickViewProduct.compareAtPrice - price).toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                  {quickViewProduct.shortDescription}
                </p>

                {/* Variant selector */}
                {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                      Option: <span className="text-neutral-900 font-bold">{currentVariant?.name}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-all ${
                            currentVariant?.id === v.id
                              ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                              : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          {v.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-neutral-600 hover:bg-neutral-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold tabular-nums text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-neutral-600 hover:bg-neutral-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    closeQuickView();
                    navigateTo('product-detail', quickViewProduct);
                  }}
                  className="w-full text-xs font-semibold text-neutral-700 hover:text-neutral-950 flex items-center justify-center gap-1.5 py-1 transition-colors"
                >
                  <span>View Complete Details & Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-neutral-600" /> U.S. Dispatch
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" /> 30-Day Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
