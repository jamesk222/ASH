import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist, openQuickView } = useStore();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const badge = product.badges && product.badges.length > 0 ? product.badges[0] : null;

  // Derive active variant
  const activeVariant = product.variants && product.variants.length > 0
    ? product.variants[selectedColorIndex]
    : undefined;

  const currentPrice = activeVariant?.price ?? product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, activeVariant, 1, false);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1500);
  };

  return (
    <div 
      onClick={() => navigateTo('product-detail', product)}
      className="group relative flex flex-col bg-white rounded-xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img
          src={product.primaryImage}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300 ease-out"
        />

        {/* Subtle Badge */}
        {badge && (
          <div className="absolute top-3 left-3 bg-neutral-900/90 text-white text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded backdrop-blur-xs">
            {badge}
          </div>
        )}

        {/* Action Buttons Top-Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-colors ${
              inWishlist
                ? 'bg-neutral-900 text-white'
                : 'bg-white/90 text-neutral-700 hover:bg-neutral-900 hover:text-white'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-2 rounded-full bg-white/90 text-neutral-700 hover:bg-neutral-900 hover:text-white backdrop-blur-md shadow-sm transition-colors hidden sm:flex"
            aria-label="Quick view product"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Bar (Slide-up on Desktop hover) */}
        <div className="absolute bottom-2 inset-x-2 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2 px-3 bg-neutral-900/95 hover:bg-neutral-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            {isAddedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-neutral-400">
              {product.subcategory.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-neutral-800 tabular-nums">{product.rating}</span>
              <span className="text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-neutral-900 text-sm line-clamp-1 group-hover:text-neutral-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.shortDescription}
          </p>
        </div>

        {/* Color Swatches if available */}
        {product.variants && product.variants.length > 1 && product.variants.some(v => v.colorHex) && (
          <div className="flex items-center gap-1.5 pt-0.5" onClick={(e) => e.stopPropagation()}>
            {product.variants.slice(0, 4).map((variant, idx) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'ring-1 ring-neutral-900 ring-offset-1 border-neutral-400'
                    : 'border-neutral-300 hover:scale-110'
                }`}
                style={{ backgroundColor: variant.colorHex || '#ccc' }}
                title={variant.colorName}
              />
            ))}
            {product.variants.length > 4 && (
              <span className="text-[10px] text-neutral-400 font-medium">
                +{product.variants.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price & Mobile Add Button */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-neutral-900 tabular-nums">
              ${currentPrice.toFixed(2)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > currentPrice && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Mobile direct add icon */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="sm:hidden p-1.5 bg-neutral-900 text-white rounded-lg text-xs"
            aria-label="Add to bag"
          >
            {isAddedAnimation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
