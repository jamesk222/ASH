import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { CATEGORIES } from '../../data/categories';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  Search,
  RotateCcw
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    navigateTo 
  } = useStore();

  const [priceRange, setPriceRange] = useState<'all' | 'under20' | '20to35' | 'over35'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'bestselling'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Active Category Meta
  const activeCategoryMeta = CATEGORIES.find(c => c.slug === selectedCategory);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesSubcat = product.subcategory.toLowerCase().includes(query);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
        const matchesSku = product.sku.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesSubcat && !matchesTags && !matchesSku) {
          return false;
        }
      }

      // Price filter
      if (priceRange === 'under20' && product.price >= 20) return false;
      if (priceRange === '20to35' && (product.price < 20 || product.price > 35)) return false;
      if (priceRange === 'over35' && product.price <= 35) return false;

      // Rating filter
      if (minRating > 0 && product.rating < minRating) return false;

      // In stock
      if (inStockOnly && product.inventory <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestselling') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, priceRange, minRating, sortBy, inStockOnly]);

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setPriceRange('all');
    setMinRating(0);
    setSortBy('featured');
    setInStockOnly(false);
  };

  const hasActiveFilters = Boolean(
    selectedCategory || searchQuery || priceRange !== 'all' || minRating > 0 || inStockOnly
  );

  return (
    <div className="bg-[#faf9f6] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-neutral-900">Home</button>
            <span>/</span>
            <span className="text-neutral-900 font-medium">
              {activeCategoryMeta ? activeCategoryMeta.name : 'All Products'}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                {activeCategoryMeta ? activeCategoryMeta.name : searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
                {activeCategoryMeta 
                  ? activeCategoryMeta.description 
                  : 'Explore our complete catalog of curated apparel, home accessories, personal care tools, and tech essentials.'}
              </p>
            </div>

            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-800"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-neutral-900" />
                )}
              </button>

              <div className="flex items-center gap-2 text-xs text-neutral-600 bg-white border border-neutral-200 rounded-lg px-3 py-2">
                <span className="text-neutral-400 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-neutral-900 font-semibold outline-none cursor-pointer"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated (4.8+)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-xl border border-neutral-200 text-xs">
            <span className="font-semibold text-neutral-500">Active Filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-md">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-md">
                Category: {activeCategoryMeta?.name}
                <button onClick={() => setSelectedCategory(null)}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-md">
                Price: {priceRange === 'under20' ? 'Under $20' : priceRange === '20to35' ? '$20 – $35' : 'Over $35'}
                <button onClick={() => setPriceRange('all')}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-md">
                Rating: {minRating}+ Stars
                <button onClick={() => setMinRating(0)}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-md">
                In Stock Only
                <button onClick={() => setInStockOnly(false)}><X className="w-3 h-3 hover:text-red-500" /></button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="ml-auto text-xs font-semibold text-neutral-700 hover:text-neutral-950 flex items-center gap-1 underline underline-offset-2"
            >
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>
        )}

        {/* Layout Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            
            {/* Department Categories List */}
            <div className="bg-white p-5 rounded-xl border border-neutral-200">
              <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-3">
                Departments
              </h3>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left py-1.5 px-2 rounded-md transition-colors ${
                      selectedCategory === null
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    All Departments
                  </button>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left py-1.5 px-2 rounded-md transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-neutral-900 text-white font-semibold'
                          : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-5 rounded-xl border border-neutral-200">
              <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-3">
                Price
              </h3>
              <div className="space-y-2 text-xs text-neutral-700">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under20', label: 'Under $20' },
                  { id: '20to35', label: '$20 to $35' },
                  { id: 'over35', label: 'Over $35' },
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={priceRange === tier.id}
                      onChange={() => setPriceRange(tier.id as any)}
                      className="text-neutral-900 focus:ring-neutral-900"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-white p-5 rounded-xl border border-neutral-200">
              <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-900 mb-3">
                Customer Rating
              </h3>
              <div className="space-y-2 text-xs text-neutral-700">
                {[
                  { rating: 0, label: 'Any Rating' },
                  { rating: 4.8, label: '4.8 Stars & Up' },
                  { rating: 4.9, label: '4.9 Stars & Up' },
                ].map((item) => (
                  <label key={item.rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating-filter"
                      checked={minRating === item.rating}
                      onChange={() => setMinRating(item.rating)}
                      className="text-neutral-900 focus:ring-neutral-900"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock status */}
            <div className="bg-white p-5 rounded-xl border border-neutral-200">
              <label className="flex items-center gap-2 text-xs text-neutral-800 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900"
                />
                <span>In Stock Only</span>
              </label>
            </div>

          </aside>

          {/* Product Listing Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  No matching products found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  We couldn't find any products matching your specific filters. Try resetting your filters to explore our full selection.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                  <span>Showing <strong className="text-neutral-900 tabular-nums">{filteredProducts.length}</strong> products</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col z-50 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h3 className="font-bold text-sm text-neutral-900">Filter Products</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="py-4 space-y-6 flex-1">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase text-neutral-500 mb-2">Category</h4>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full text-xs p-2 border border-neutral-300 rounded-lg"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-xs font-bold uppercase text-neutral-500 mb-2">Price Range</h4>
                <div className="space-y-1.5 text-xs text-neutral-700">
                  <label className="flex items-center gap-2">
                    <input type="radio" checked={priceRange === 'all'} onChange={() => setPriceRange('all')} />
                    <span>All Prices</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" checked={priceRange === 'under20'} onChange={() => setPriceRange('under20')} />
                    <span>Under $20</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" checked={priceRange === '20to35'} onChange={() => setPriceRange('20to35')} />
                    <span>$20 – $35</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" checked={priceRange === 'over35'} onChange={() => setPriceRange('over35')} />
                    <span>Over $35</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full py-2 bg-transparent text-neutral-600 rounded-lg text-xs font-medium"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
