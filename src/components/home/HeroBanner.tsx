import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Truck, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { ASSET_PATHS } from '../../data/products';

export const HeroBanner: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="relative bg-neutral-900 text-white overflow-hidden">
      {/* Background Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_PATHS.hero}
          alt="Curated modern retail essentials"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-102 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          
          {/* Unboxed natural kicker */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            <span>U.S. Online Retail Storefront</span>
            <span aria-hidden="true">·</span>
            <span>New 2026 Drops</span>
          </div>

          {/* Balanced Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
            Discover Your Next Favorite Everyday Find.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
            Thoughtfully curated fashion, beauty essentials, home organizers, and smart electronics accessories. High-utility everyday products delivered directly to your doorstep.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-950 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-md"
            >
              Shop New Arrivals <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('shop', null, 'deals')}
              className="px-6 py-3.5 bg-neutral-800/80 hover:bg-neutral-800 text-white border border-neutral-700 rounded-lg text-sm font-semibold transition-all backdrop-blur-xs"
            >
              Explore Trending Under $25
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Free U.S. Shipping $45+</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>1-2 Day Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>30-Day Easy Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Verified Quality</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
