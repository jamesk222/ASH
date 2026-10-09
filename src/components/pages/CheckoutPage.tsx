import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderItem } from '../../types';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard, 
  ShoppingBag,
  Clock,
  Printer
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    coupon, 
    cartTotal, 
    shippingFee, 
    estimatedTax, 
    addOrder, 
    clearCart, 
    navigateTo,
    user
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    firstName: user ? user.fullName.split(' ')[0] : 'Emily',
    lastName: user ? user.fullName.split(' ')[1] || 'Watson' : 'Watson',
    email: user ? user.email : 'emily.watson@example.com',
    phone: '+1 (307) 555-0192',
    street: '742 Evergreen Terrace',
    apt: 'Apt 4B',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    country: 'United States',
    shippingSpeed: 'standard', // 'standard' or 'expedited'
    paymentMethod: 'card', // 'card', 'paypal', 'applepay'
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Effective shipping fee based on speed
  const effectiveShipping = formData.shippingSpeed === 'expedited' ? 12.99 : shippingFee;
  const effectiveTotal = Number((cartSubtotal - cartDiscount + effectiveShipping + estimatedTax).toFixed(2));

  if (createdOrder) {
    return (
      <div className="bg-[#faf9f6] min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 sm:p-12 shadow-sm text-center space-y-6">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
                Order Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Thank you for your order!
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500">
                Order <strong className="text-neutral-900 font-mono">{createdOrder.orderNumber}</strong> has been received and is being prepared for shipment from our U.S. facility.
              </p>
            </div>

            {/* Order details summary */}
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 text-left space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-neutral-200">
                <div>
                  <span className="text-neutral-400 font-semibold block">Date</span>
                  <span className="font-semibold text-neutral-900">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-semibold block">Total</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">${createdOrder.total.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-semibold block">Carrier</span>
                  <span className="font-semibold text-neutral-900">{createdOrder.carrier}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-semibold block">Estimated Delivery</span>
                  <span className="font-semibold text-emerald-700">{createdOrder.estimatedDelivery}</span>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-neutral-900 block">Ordered Items:</span>
                {createdOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-neutral-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.productName} className="w-10 h-10 object-cover rounded bg-white border border-neutral-200" />
                      <div>
                        <div className="font-semibold text-neutral-900">{item.productName}</div>
                        <div className="text-[11px] text-neutral-400">Qty: {item.quantity} {item.variantName ? `· ${item.variantName}` : ''}</div>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-900 tabular-nums">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-200">
                <span className="text-neutral-400 font-semibold block">Shipping To:</span>
                <span className="text-neutral-800">
                  {createdOrder.shippingAddress.fullName}, {createdOrder.shippingAddress.street} {createdOrder.shippingAddress.apt}, {createdOrder.shippingAddress.city}, {createdOrder.shippingAddress.state} {createdOrder.shippingAddress.zipCode}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('order-tracking')}
                className="w-full sm:w-auto px-6 py-3 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs"
              >
                Track This Order
              </button>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-neutral-300 text-neutral-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" /> Print Order Receipt
              </button>

              <button
                onClick={() => navigateTo('home')}
                className="w-full sm:w-auto px-6 py-3 text-neutral-600 hover:text-neutral-900 text-xs font-semibold"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#faf9f6] min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto px-4 bg-white p-8 rounded-2xl border border-neutral-200">
          <ShoppingBag className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-neutral-900">Your bag is empty</h2>
          <p className="text-xs text-neutral-500 mt-1 mb-6">Add items before proceeding to checkout.</p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderNum = `ASH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderItems: OrderItem[] = cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.selectedVariant?.sku || item.product.sku,
        price: item.selectedVariant?.price ?? item.product.price,
        quantity: item.quantity,
        variantName: item.selectedVariant?.name,
        image: item.product.primaryImage,
      }));

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNum,
        createdAt: new Date().toISOString(),
        status: 'Processing',
        items: orderItems,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shippingFee: effectiveShipping,
        tax: estimatedTax,
        total: effectiveTotal,
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          street: formData.street,
          apt: formData.apt,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: 'United States',
        },
        shippingMethod: formData.shippingSpeed === 'expedited' ? 'Expedited 2-Day Air (UPS)' : 'Standard U.S. Ground (USPS)',
        trackingNumber: `940011189956${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        carrier: formData.shippingSpeed === 'expedited' ? 'UPS 2nd Day Air' : 'USPS Priority Mail',
        estimatedDelivery: formData.shippingSpeed === 'expedited' ? '2-3 Business Days' : '3-5 Business Days',
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      setCreatedOrder(newOrder);
    }, 1200);
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-neutral-800" />
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Express U.S. Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* 2-Column Split: Form Steps vs Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Steps Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact Information */}
            <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] flex items-center justify-center font-bold">1</span>
                Customer Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Email Address (for order tracking) *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Phone Number (delivery alerts) *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] flex items-center justify-center font-bold">2</span>
                Shipping Address (United States)
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="e.g. 30 N Gould St"
                    className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Apt / Suite / Unit</label>
                    <input
                      type="text"
                      value={formData.apt}
                      onChange={(e) => setFormData({ ...formData, apt: e.target.value })}
                      placeholder="Suite 67511"
                      className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">State / ZIP Code *</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="WY"
                        className="w-16 p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 text-center"
                      />
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        placeholder="82801"
                        className="flex-1 p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] flex items-center justify-center font-bold">3</span>
                Shipping Method
              </h2>

              <div className="space-y-3 text-xs">
                <label className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                  formData.shippingSpeed === 'standard' ? 'border-neutral-900 bg-neutral-50/50 ring-1 ring-neutral-900' : 'border-neutral-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping-speed"
                      checked={formData.shippingSpeed === 'standard'}
                      onChange={() => setFormData({ ...formData, shippingSpeed: 'standard' })}
                      className="text-neutral-900"
                    />
                    <div>
                      <span className="font-bold text-neutral-900 block">Standard U.S. Ground (USPS Priority)</span>
                      <span className="text-neutral-500">Delivered within 3–5 business days</span>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-900 tabular-nums">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                  formData.shippingSpeed === 'expedited' ? 'border-neutral-900 bg-neutral-50/50 ring-1 ring-neutral-900' : 'border-neutral-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping-speed"
                      checked={formData.shippingSpeed === 'expedited'}
                      onChange={() => setFormData({ ...formData, shippingSpeed: 'expedited' })}
                      className="text-neutral-900"
                    />
                    <div>
                      <span className="font-bold text-neutral-900 block">Expedited 2-Day Air (UPS)</span>
                      <span className="text-neutral-500">Guaranteed delivery within 2 business days</span>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-900 tabular-nums">$12.99</span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment */}
            <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[11px] flex items-center justify-center font-bold">4</span>
                Secure Payment
              </h2>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`py-2 px-3 border rounded-lg font-semibold text-center transition-all ${
                      formData.paymentMethod === 'card' ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    Credit / Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                    className={`py-2 px-3 border rounded-lg font-semibold text-center transition-all ${
                      formData.paymentMethod === 'paypal' ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    PayPal
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                    className={`py-2 px-3 border rounded-lg font-semibold text-center transition-all ${
                      formData.paymentMethod === 'applepay' ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    Apple / Google Pay
                  </button>
                </div>

                {formData.paymentMethod === 'card' ? (
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3">
                    <div>
                      <label className="font-semibold text-neutral-700 block mb-1">Card Number *</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full p-2.5 bg-white border border-neutral-300 rounded-lg outline-none font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1">Expires *</label>
                        <input
                          type="text"
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full p-2.5 bg-white border border-neutral-300 rounded-lg outline-none font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1">CVC *</label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full p-2.5 bg-white border border-neutral-300 rounded-lg outline-none font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-center text-neutral-600">
                    You will authenticate securely with {formData.paymentMethod === 'paypal' ? 'PayPal' : 'Apple/Google Pay'} upon placing order.
                  </div>
                )}

                <div className="flex items-center gap-2 text-[11px] text-neutral-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>PCI-DSS Compliant: Card details are securely tokenized and never stored in plain text.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Review & Final Submit (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-xs sticky top-24 space-y-6">
              
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const unitPrice = item.selectedVariant?.price ?? item.product.price;
                  return (
                    <div key={`${item.product.id}-${item.selectedVariant?.id || 'standard'}`} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={item.product.primaryImage} alt={item.product.name} className="w-12 h-12 object-cover rounded bg-neutral-100 border border-neutral-200 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-neutral-900 truncate">{item.product.name}</h4>
                          <span className="text-[11px] text-neutral-500">Qty: {item.quantity} {item.selectedVariant ? `· ${item.selectedVariant.name}` : ''}</span>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-900 tabular-nums shrink-0">${(unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Summary Calculations */}
              <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({coupon?.code})</span>
                    <span className="tabular-nums">-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="tabular-nums">
                    {effectiveShipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${effectiveShipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax (Colorado ~6.5%)</span>
                  <span className="tabular-nums">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-200">
                  <span>Order Total</span>
                  <span className="tabular-nums">${effectiveTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>Place Order (${effectiveTotal.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-neutral-500 space-y-1">
                <div>By clicking "Place Order", you agree to our Terms of Sale.</div>
                <div>30-Day Money Back Guarantee · Sheridan, WY Fulfillment</div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
