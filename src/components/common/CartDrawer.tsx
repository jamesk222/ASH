import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    estimatedTax,
    cartTotal,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    coupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput.trim());
    if (res.success) {
      setPromoFeedback({ type: 'success', text: res.message });
      setPromoInput('');
    } else {
      setPromoFeedback({ type: 'error', text: res.message });
    }
  };

  const freeShippingProgress = Math.min(100, Math.round(((freeShippingThreshold - amountNeededForFreeShipping) / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-800" />
            <h3 className="font-bold text-base text-neutral-900">Your Shopping Bag</h3>
            <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full font-semibold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-neutral-50 p-3.5 border-b border-neutral-200">
          <div className="flex items-center justify-between text-xs font-medium text-neutral-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-neutral-600" />
              {amountNeededForFreeShipping === 0 ? (
                <strong className="text-emerald-700 font-semibold">You've unlocked FREE U.S. Shipping!</strong>
              ) : (
                <span>Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more for FREE U.S. Shipping</span>
              )}
            </span>
            <span className="text-neutral-500 font-mono text-[11px]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${amountNeededForFreeShipping === 0 ? 'bg-emerald-600' : 'bg-neutral-900'}`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-semibold text-neutral-900 mb-1">Your bag is empty</h4>
              <p className="text-xs text-neutral-500 max-w-xs mb-6">
                Explore our curated collections of trending apparel, everyday essentials, and tech accessories.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('shop');
                }}
                className="px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const unitPrice = item.selectedVariant?.price ?? item.product.price;
              const itemTotal = unitPrice * item.quantity;
              return (
                <div 
                  key={`${item.product.id}-${item.selectedVariant?.id || 'standard'}`}
                  className="flex gap-3.5 pb-4 border-b border-neutral-100 last:border-0"
                >
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-neutral-100 shrink-0 border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            navigateTo('product-detail', item.product);
                          }}
                          className="text-sm font-semibold text-neutral-900 truncate hover:underline cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <div className="text-xs text-neutral-500 mt-0.5">
                          Variant: {item.selectedVariant.name}
                        </div>
                      )}

                      <div className="text-xs font-medium text-neutral-500 mt-0.5">
                        ${unitPrice.toFixed(2)} each
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-200 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 rounded-l transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 rounded-r transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-sm font-bold text-neutral-900 tabular-nums">
                        ${itemTotal.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Calculations & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 space-y-3">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    setPromoFeedback(null);
                  }}
                  placeholder="Promo code (e.g. SAVE15)"
                  className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Apply
              </button>
            </form>

            {promoFeedback && (
              <div className={`text-xs ${promoFeedback.type === 'success' ? 'text-emerald-700' : 'text-red-600'}`}>
                {promoFeedback.text}
              </div>
            )}

            {coupon && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                <span>Code <strong>{coupon.code}</strong> applied ({coupon.discountPercent}% off)</span>
                <button 
                  onClick={removeCoupon}
                  className="text-xs text-neutral-500 hover:text-red-600 underline"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900 tabular-nums">${cartSubtotal.toFixed(2)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="tabular-nums">-${cartDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated U.S. Shipping</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span className="tabular-nums">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total</span>
                <span className="tabular-nums">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('cart');
                }}
                className="w-full py-2 bg-transparent text-neutral-700 hover:text-neutral-950 text-xs font-semibold text-center hover:underline"
              >
                View Full Cart
              </button>
            </div>

            {/* Trust Micro-Badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
              <span>Secure 256-Bit Encrypted Checkout · U.S. Domestic Shipping</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
