import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  Lock, 
  ShieldCheck, 
  ChevronRight,
  Plus
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, loginUser, logoutUser, orders, wishlist, products, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'settings'>('orders');

  // Login form state
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('jamalshah199110@gmail.com');
  const [fullName, setFullName] = useState('Jamal Shah');
  const [password, setPassword] = useState('••••••••••••');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, fullName);
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (!user) {
    return (
      <div className="bg-[#faf9f6] min-h-screen py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 shadow-sm space-y-6">
            
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-neutral-900">
                {isSignUp ? 'Create an Account' : 'Sign In to Your Account'}
              </h1>
              <p className="text-xs text-neutral-500">
                {isSignUp 
                  ? 'Access order history, faster checkout, and saved wishlists.' 
                  : 'Welcome back to ASH Global Commerce LLC.'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
              {isSignUp && (
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2.5 border border-neutral-300 rounded-lg outline-none focus:border-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-neutral-500 border-t border-neutral-100">
              {isSignUp ? (
                <span>
                  Already have an account?{' '}
                  <button onClick={() => setIsSignUp(false)} className="font-bold text-neutral-900 underline">
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button onClick={() => setIsSignUp(true)} className="font-bold text-neutral-900 underline">
                    Create Account
                  </button>
                </span>
              )}
            </div>

            <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-center text-[11px] text-neutral-500">
              <span className="font-semibold text-neutral-700 block mb-0.5">Quick Demo Access</span>
              Clicking Sign In loads your pre-configured account with active orders and shipping address.
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f6] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Banner */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-neutral-900 text-white font-bold text-xl flex items-center justify-center">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">{user.fullName}</h1>
              <p className="text-xs text-neutral-500">{user.email} · Registered Customer</p>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Navigation Sidebar */}
          <div className="space-y-1.5">
            {[
              { id: 'orders', label: 'Order History', icon: Package, count: orders.length },
              { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: wishlist.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
              { id: 'settings', label: 'Security & Preferences', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      activeTab === tab.id ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content (3 cols) */}
          <div className="lg:col-span-3">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-neutral-900">Your Recent Orders</h2>
                {orders.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl border border-neutral-200 text-center text-xs text-neutral-500">
                    No orders placed yet.
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div key={ord.id} className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
                        <div>
                          <span className="text-[11px] uppercase font-bold text-neutral-400">Order</span>
                          <h4 className="text-sm font-bold text-neutral-900 font-mono">{ord.orderNumber}</h4>
                          <span className="text-xs text-neutral-500">Placed on {new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-xs font-semibold">
                            {ord.status}
                          </span>
                          <span className="text-sm font-bold text-neutral-900 tabular-nums">
                            ${ord.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img src={it.image} alt={it.productName} className="w-12 h-12 object-cover rounded bg-neutral-100 border border-neutral-200" />
                              <div>
                                <h5 className="font-semibold text-neutral-900">{it.productName}</h5>
                                <span className="text-[11px] text-neutral-500">Qty: {it.quantity} {it.variantName ? `· ${it.variantName}` : ''}</span>
                              </div>
                            </div>
                            <span className="font-bold text-neutral-900 tabular-nums">${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Carrier: {ord.carrier} ({ord.trackingNumber})</span>
                        <button
                          onClick={() => navigateTo('order-tracking')}
                          className="font-bold text-neutral-900 hover:underline flex items-center gap-1"
                        >
                          Track Shipment <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-neutral-900">Saved Wishlist ({wishlistProducts.length})</h2>
                {wishlistProducts.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl border border-neutral-200 text-center text-xs text-neutral-500">
                    Your wishlist is currently empty.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistProducts.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-neutral-900">Shipping Addresses</h2>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold">
                    <Plus className="w-3.5 h-3.5" /> Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div key={addr.id} className="bg-white p-5 rounded-xl border border-neutral-200/90 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            Default Address
                          </span>
                        )}
                      </div>
                      <div className="text-neutral-600 leading-relaxed">
                        {addr.street} {addr.apt && `· ${addr.apt}`}<br />
                        {addr.city}, {addr.state} {addr.zipCode}<br />
                        United States
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white p-6 rounded-xl border border-neutral-200/90 space-y-6 text-xs">
                <h2 className="text-base font-bold text-neutral-900">Account Security & Privacy</h2>
                
                <div className="space-y-3 max-w-md">
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Email Address</label>
                    <input type="email" defaultValue={user.email} disabled className="w-full p-2 bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-500" />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Registered Phone</label>
                    <input type="tel" defaultValue={user.phone} className="w-full p-2 border border-neutral-300 rounded-lg" />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 text-neutral-500">
                  <span className="font-bold text-neutral-900 block mb-1">Data Protection Notice</span>
                  ASH Global Commerce LLC adheres to standard consumer privacy regulations (including CCPA). You may request an export or deletion of your saved information by contacting <a href="mailto:info@ashglobalcommercellc.com" className="underline">info@ashglobalcommercellc.com</a>.
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
