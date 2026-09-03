import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';

export const WeaveShowcase = () => {
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('Gadwal');
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  const tabs = [
    { id: 'Gadwal', label: 'Gadwal Handlooms' },
    { id: 'Kanchi', label: 'Kanchi Pattu' },
    { id: 'Pellikuthuru', label: 'Pellikuthuru Bridal' },
    { id: 'Banarasi', label: 'Banarasi Kataan' }
  ];

  const displayedProducts = products.filter((p) => {
    if (activeTab === 'Gadwal') return p.name.toLowerCase().includes('gadwal') || p.fabric.toLowerCase().includes('gadwal');
    if (activeTab === 'Kanchi') return p.name.toLowerCase().includes('kanchi') || p.name.toLowerCase().includes('kanjeevaram');
    if (activeTab === 'Pellikuthuru') return p.name.toLowerCase().includes('pellikuthuru') || p.category === 'Lehengas';
    if (activeTab === 'Banarasi') return p.name.toLowerCase().includes('banarasi') || p.fabric.toLowerCase().includes('banarasi');
    return true;
  }).slice(0, 4);

  return (
    <section className="py-24 bg-ivory relative border-t border-burgundy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-bold block mb-2">
            HERITAGE WEAVING REGIONAL CRAFTS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-burgundy">
            EXPLORE REGIONAL WEAVES
          </h2>
          <div className="w-16 h-1 bg-gold-gradient mx-auto mt-4 rounded-full" />
        </div>

        {/* Weave Tabs */}
        <div className="flex justify-center border-b border-burgundy/10 mb-12 overflow-x-auto gap-4 sm:gap-8 pb-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`pb-3 text-sm uppercase tracking-widest font-bold transition-all relative shrink-0 ${
                activeTab === t.id ? 'text-burgundy text-base' : 'text-charcoal/60 hover:text-burgundy'
              }`}
            >
              {t.label}
              {activeTab === t.id && (
                <motion.div layoutId="weave-tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Display Products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={(prod) => setSelectedQuickView(prod)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-burgundy text-ivory text-xs uppercase font-bold tracking-widest rounded-full shadow-burgundy hover:bg-burgundy-dark transition-all"
          >
            DISCOVER ALL WEAVES <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </div>

      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />
    </section>
  );
};
