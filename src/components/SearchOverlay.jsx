import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

export const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { products } = useProducts();
  const navigate = useNavigate();

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9000] flex flex-col bg-charcoal/95 backdrop-blur-xl text-ivory">
        <div className="border-b border-gold/30 px-6 py-6 max-w-5xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4 bg-burgundy-deep/60 px-5 py-3.5 rounded-full border border-gold/40">
            <Search className="w-5 h-5 text-gold shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sarees, lehengas, silk, collections..."
              className="bg-transparent border-none outline-none text-ivory placeholder:text-ivory/40 w-full text-base font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-ivory/60 hover:text-gold transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-3 text-ivory/70 hover:text-gold transition-colors rounded-full hover:bg-white/5"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full px-6 py-8">
          {!query ? (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-4">
                  <TrendingUp className="w-4 h-4" /> Popular Searches
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {['Banarasi Saree', 'Kanjeevaram Silk', 'Royal Burgundy', 'Bridal Lehenga', 'Velvet Set', 'Organza Pearl'].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="px-4 py-2 rounded-full border border-gold/30 bg-burgundy/30 text-ivory/90 hover:bg-gold hover:text-charcoal hover:border-gold transition-all text-sm"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gold font-semibold mb-4">
                  Explore Categories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: 'Sarees', count: '7 items', category: 'Sarees' },
                    { name: 'Lehengas', count: '5 items', category: 'Lehengas' },
                    { name: '3 Piece Sets', count: '4 items', category: '3 Piece Sets' }
                  ].map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        onClose();
                        navigate(`/shop?category=${cat.category}`);
                      }}
                      className="p-4 rounded-xl border border-gold/20 bg-burgundy-deep/40 hover:border-gold text-left flex items-center justify-between group transition-all"
                    >
                      <div>
                        <h4 className="font-serif text-lg font-bold text-ivory group-hover:text-gold transition-colors">
                          {cat.name}
                        </h4>
                        <p className="text-xs text-ivory/60">{cat.count}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs uppercase tracking-widest text-ivory/60 mb-6">
                Found {filteredProducts.length} results for "{query}"
              </p>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg font-serif text-ivory/80">No matching creations found.</p>
                  <p className="text-xs text-ivory/50 mt-2">Try searching for "silk", "lehenga", or "burgundy".</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="cursor-pointer group glass-card-dark rounded-xl p-3 border border-gold/20 hover:border-gold transition-all"
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-charcoal relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-serif text-sm font-semibold line-clamp-1 group-hover:text-gold transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gold font-sans mt-1 font-semibold">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};
