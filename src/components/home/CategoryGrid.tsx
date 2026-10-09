import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { ASSET_PATHS } from '../../data/products';

export const CategoryGrid: React.FC = () => {
  const { navigateTo } = useStore();

  const featuredCards = [
    {
      title: "Women's Fashion",
      subtitle: "Ribbed cardigans, parachute cargo & matching active sets",
      slug: 'womens-fashion',
      image: ASSET_PATHS.fashion,
      colSpan: 'lg:col-span-2',
    },
    {
      title: "Beauty & Hair Care",
      subtitle: "Viral silk heatless curlers, gua sha & cosmetics organizers",
      slug: 'beauty-hair',
      image: ASSET_PATHS.beauty,
      colSpan: 'lg:col-span-1',
    },
    {
      title: "Home & Organization",
      subtitle: "Fluted airtight acrylic pantry bins & drawer organizers",
      slug: 'home-lifestyle',
      image: ASSET_PATHS.home,
      colSpan: 'lg:col-span-1',
    },
    {
      title: "Tech & Everyday Accessories",
      subtitle: "Foldable MagSafe stands & precision aluminum desktop docks",
      slug: 'electronics-accessories',
      image: ASSET_PATHS.tech,
      colSpan: 'lg:col-span-2',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">
              Shop By Department
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Curated Collections
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5 hover:underline group"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCards.map((card) => (
            <div
              key={card.slug}
              onClick={() => navigateTo('shop', null, card.slug)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 aspect-[16/10] sm:aspect-[16/9] ${card.colSpan} border border-neutral-200/80 shadow-xs hover:shadow-md transition-all`}
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/35 to-transparent" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-medium text-neutral-300 mb-1">
                  Explore Department
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-md line-clamp-1">
                  {card.subtitle}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:underline">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
