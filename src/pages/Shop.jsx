import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Footer } from '../components/Footer';

export const Shop = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialFilter = searchParams.get('filter') || 'all';
  const initialMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 50000;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  React.useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('maxPrice')) setMaxPrice(Number(searchParams.get('maxPrice')));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Special Filter Tag
    if (initialFilter === 'bestseller') {
      list = list.filter((p) => p.isBestseller);
    } else if (initialFilter === 'new') {
      list = list.filter((p) => p.isNewArrival);
    } else if (initialFilter === 'offers') {
      list = list.filter((p) => p.discount);
    }

    // Price Filter
    list = list.filter((p) => p.price <= maxPrice);

    // Sorting Logic
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : -1));
    } else if (sortBy === 'bestselling') {
      list.sort((a, b) => (b.isBestseller ? 1 : -1));
    }

    return list;
  }, [products, selectedCategory, initialFilter, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(50000);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-ivory pt-28"
    >
      {/* Header Banner */}
      <div className="bg-burgundy-deep text-ivory py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-bold block">
            ROYAL CATALOG 2026
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-wider text-ivory">
            {selectedCategory === 'All' ? 'SHOP ALL CREATIONS' : selectedCategory.toUpperCase()}
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 font-sans max-w-xl mx-auto">
            Discover handcrafted Kanjeevaram sarees, Varanasi Banarasi silk, and royal lehengas.
          </p>
        </div>
      </div>

      {/* Main Shop Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-burgundy/10">
              <h3 className="font-serif text-lg font-bold text-burgundy flex items-center gap-2">
                <Filter className="w-4 h-4 text-gold" /> FILTERS
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-burgundy/60 hover:text-burgundy flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-bold text-charcoal">
                Category
              </h4>
              <div className="space-y-2">
                {['All', 'Sarees', 'Lehengas', '3 Piece Sets'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-burgundy text-gold shadow-sm font-bold'
                        : 'text-charcoal/80 hover:bg-burgundy/5'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-burgundy/10">
              <div className="flex justify-between items-center text-xs font-bold text-charcoal">
                <span className="uppercase tracking-widest">Max Price</span>
                <span className="text-burgundy">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="999"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-burgundy cursor-pointer"
              />
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-burgundy/10 gap-4">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2.5 bg-burgundy/10 text-burgundy text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>

              <span className="text-xs text-charcoal/60 font-medium">
                Showing <strong className="text-burgundy">{filteredProducts.length}</strong> items
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold hidden sm:inline">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-xs font-semibold bg-white border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-burgundy cursor-pointer shadow-sm"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="bestselling">Best Sellers</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-burgundy/10">
                <p className="font-serif text-2xl font-bold text-burgundy mb-2">No creations match your filter criteria.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-burgundy text-ivory text-xs uppercase tracking-widest font-bold rounded-xl shadow-burgundy hover:bg-burgundy-dark transition-all mt-4"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedQuickView(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />

      <Footer />
    </motion.div>
  );
};
