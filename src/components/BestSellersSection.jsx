import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';

export const BestSellersSection = () => {
  const { products } = useProducts();
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  const bestSellers = products.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <section className="py-24 bg-ivory-soft relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-bold block mb-1">
              PATRON FAVORITES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-burgundy">
              BEST SELLERS
            </h2>
          </div>
          <Link
            to="/shop?filter=bestseller"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy hover:text-gold transition-colors"
          >
            VIEW ALL BEST SELLERS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedQuickView(p)}
            />
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
