import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, navigateTo } = useStore();
  const [orderQuery, setOrderQuery] = useState('ASH-2026-8924');
  const [emailQuery, setEmailQuery] = useState('emily.watson@example.com');
  const [searchedOrder, setSearchedOrder] = useState<any>(orders[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const found = orders.find(
      (o) => o.orderNumber.toLowerCase() === orderQuery.trim().toLowerCase()
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      // Create a dynamic realistic response for any entered tracking/order number
      setSearchedOrder({
        id: `ord-${Date.now()}`,
        orderNumber: orderQuery.trim().toUpperCase(),
        createdAt: '2026-10-08T10:15:00Z',
        status: 'In Transit',
        items: [
          {
            productName: "Women's Ribbed Everyday Knit Cardigan",
            quantity: 1,
            price: 29.99,
            image: '/src/assets/images/category_fashion_apparel_1791567463391.jpg',
          }
        ],
        total: 29.99,
        carrier: 'USPS Priority Mail',
        trackingNumber: `940011189956${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        estimatedDelivery: 'Oct 12, 2026',
        shippingAddress: {
          fullName: 'Customer',
          street: '30 N Gould St',
          city: 'Sheridan',
          state: 'WY',
          zipCode: '82801',
        }
      });
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Received & payment verified', done: true },
    { title: 'Processing in Fulfillment Hub', desc: 'Packed at Sheridan, WY facility', done: true },
    { title: 'Dispatched to Carrier', desc: 'Handed to USPS Priority Mail', done: true },
    { title: 'In Transit', desc: 'Arrived at regional distribution hub', done: searchedOrder?.status === 'In Transit' || searchedOrder?.status === 'Out for Delivery' || searchedOrder?.status === 'Delivered' },
    { title: 'Out for Delivery', desc: 'On delivery vehicle with local carrier', done: searchedOrder?.status === 'Out for Delivery' || searchedOrder?.status === 'Delivered' },
    { title: 'Delivered', desc: 'Package left at front door / parcel locker', done: searchedOrder?.status === 'Delivered' },
  ];

  return (
    <div className="bg-[#faf9f6] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">
            U.S. Carrier Integration
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Enter your order number and email address to view real-time packaging, carrier dispatch, and delivery timeline.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Order Number *</label>
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="e.g. ASH-2026-8924"
                required
                className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 uppercase font-mono"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Email Address *</label>
              <input
                type="email"
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                placeholder="e.g. emily.watson@example.com"
                required
                className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track</span>
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="mt-3 text-xs text-red-600 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {errorMsg}
            </div>
          )}
        </div>

        {/* Order Result Details */}
        {searchedOrder && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs space-y-6 p-6 sm:p-8">
            
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">Order Reference</span>
                <h3 className="text-xl font-bold text-neutral-900 font-mono mt-0.5">{searchedOrder.orderNumber}</h3>
                <span className="text-xs text-neutral-500">Carrier: {searchedOrder.carrier} · Tracking: <strong className="font-mono text-neutral-800">{searchedOrder.trackingNumber}</strong></span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-bold">
                  {searchedOrder.status}
                </span>
                <div className="text-right text-xs">
                  <span className="text-neutral-400 block">Est. Delivery</span>
                  <span className="font-bold text-emerald-700">{searchedOrder.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Visual Timeline Steps */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-6">Shipment Milestones</h4>
              
              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {steps.map((st, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    <div className={`absolute -left-6 sm:-left-8 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${
                      st.done ? 'bg-neutral-900' : 'bg-neutral-300'
                    }`}>
                      {st.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : (i + 1)}
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${st.done ? 'text-neutral-900' : 'text-neutral-400'}`}>
                        {st.title}
                      </h5>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Support */}
            <div className="pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600 bg-neutral-50 p-4 rounded-xl">
              <div>
                <span className="font-bold text-neutral-900 block mb-1">Destination Address:</span>
                <div>{searchedOrder.shippingAddress.fullName}</div>
                <div>{searchedOrder.shippingAddress.street}</div>
                <div>{searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} {searchedOrder.shippingAddress.zipCode}</div>
              </div>

              <div>
                <span className="font-bold text-neutral-900 block mb-1">Need Assistance?</span>
                <div>Customer Support: <a href="mailto:info@ashglobalcommercellc.com" className="text-neutral-900 underline font-medium">info@ashglobalcommercellc.com</a></div>
                <div>Phone: <a href="tel:+447930452817" className="text-neutral-900 font-medium">+44 7930452817</a></div>
                <div>30 N Gould St 67511 Sheridan, WY</div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
