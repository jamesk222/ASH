import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight } from 'lucide-react';

export const TrendingGrid: React.FC = () => {
  const { products, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'trending' | 'bestsellers' | 'new' | 'under25'>('trending');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'trending') return p.badges?.includes('TRENDING') || p.rating >= 4.8;
    if (activeTab === 'bestsellers') return p.badges?.includes('BEST SELLER') || p.reviewCount >= 150;
    if (activeTab === 'new') return p.badges?.includes('NEW') || p.id.endsWith('1') || p.id.endsWith('5');
    if (activeTab === 'under25') return p.price <= 25.0;
    return true;
  }).slice(0, 8);

  return (
    <section className="py-16 bg-white border-y border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Segmented Control Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">
              Top Customer Favorites
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Trending This Week
            </h2>
          </div>

          {/* Functional segmented control tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg max-w-fit">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'trending'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Trending Now
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'bestsellers'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'new'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('under25')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'under25'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Under $25
            </button>
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            <span>Explore All 24+ Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
