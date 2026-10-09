import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, Video, Flame, CheckCircle2 } from 'lucide-react';
import { ASSET_PATHS } from '../../data/products';

export const SocialTrends: React.FC = () => {
  const { navigateTo } = useStore();

  const viralPicks = [
    {
      title: 'Silk Heatless Hair Curling Kit',
      category: 'Beauty Viral',
      price: '$17.99',
      image: ASSET_PATHS.beauty,
      hook: 'Overnight salon blowout without heat damage',
    },
    {
      title: 'Ergonomic Cloud Recovery Slides',
      category: 'Footwear Trend',
      price: '$21.99',
      image: ASSET_PATHS.hero,
      hook: 'Ultra-cushioned 4cm shock-absorbing foam',
    },
    {
      title: '3-in-1 Foldable MagSafe Charger',
      category: 'Tech Essential',
      price: '$36.99',
      image: ASSET_PATHS.tech,
      hook: 'Folds flat for travel, fast charges 3 devices',
    },
    {
      title: 'Fluted Acrylic Pantry Organizers',
      category: 'Home Aesthetic',
      price: '$34.99',
      image: ASSET_PATHS.home,
      hook: 'Aesthetic airtight pantry organization',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="bg-neutral-900 rounded-2xl text-white p-8 sm:p-12 border border-neutral-800 shadow-xl overflow-hidden relative">
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-800 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5" /> Social Commerce & Marketplace Hits
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Trending Now
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed max-w-xl">
              Compact, highly visual products taking over TikTok feeds and trending on Walmart Marketplace. Selected for instant demonstration, effortless gifting, and everyday utility.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('shop', null, 'deals')}
                className="px-5 py-3 bg-white text-neutral-950 font-bold text-xs rounded-lg flex items-center gap-2 hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <span>Shop The Trend</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4 Spotlight mini-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 relative z-10">
            {viralPicks.map((pick, i) => (
              <div 
                key={i} 
                onClick={() => navigateTo('shop')}
                className="bg-neutral-800/80 hover:bg-neutral-800 p-3.5 rounded-xl border border-neutral-700/60 backdrop-blur-xs cursor-pointer group transition-all"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 mb-3 relative">
                  <img src={pick.image} alt={pick.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-2 left-2 bg-neutral-950/80 px-2 py-0.5 rounded text-[10px] font-semibold text-neutral-200">
                    {pick.category}
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-xs font-semibold text-white truncate">{pick.title}</h4>
                  <span className="text-xs font-bold text-amber-300 tabular-nums">{pick.price}</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                  {pick.hook}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
