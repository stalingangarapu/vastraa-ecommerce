import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { Link } from 'react-router-dom';

export const NewArrivals = () => {
  const { products } = useProducts();
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  const newItems = products.filter((p) => p.isNewArrival).slice(0, 6);

  return (
    <section className="py-24 bg-ivory relative border-t border-burgundy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-gold font-sans font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" /> JUST DROPPED
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-burgundy">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            to="/shop?filter=new"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy hover:text-gold transition-colors"
          >
            DISCOVER NEW DESIGNS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gold scrollbar-track-transparent">
          {newItems.map((product) => (
            <div key={product.id} className="min-w-[260px] sm:min-w-[280px] flex-shrink-0">
              <ProductCard
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            </div>
          ))}
        </div>
      </div>

      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />
    </section>
  );
};
