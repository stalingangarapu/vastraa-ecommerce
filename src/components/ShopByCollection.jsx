import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/products';

const CollectionCard = ({ category }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer transition-transform duration-200 ease-out border border-gold/30"
    >
      <Link to={`/shop?category=${encodeURIComponent(category.name)}`} className="block w-full h-[450px] relative">
        {/* Card Background Image */}
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/40 to-transparent group-hover:via-burgundy-deep/60 transition-colors duration-500" />

        {/* Animated Gold Shimmer Border on Hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-colors duration-500 rounded-2xl pointer-events-none" />

        {/* Card Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-ivory z-10">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3 h-3" /> {category.count} CREATIONS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-ivory mb-2 group-hover:text-gold-gradient transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-ivory/80 font-sans font-light mb-6 line-clamp-2">
              "{category.tagline}"
            </p>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold font-semibold group-hover:gap-3 transition-all">
              EXPLORE COLLECTION
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const ShopByCollection = () => {
  return (
    <section className="py-24 bg-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-bold block mb-2">
            CURATED CATEGORIES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-burgundy">
            SHOP BY COLLECTION
          </h2>
          <div className="w-16 h-0.5 bg-gold-gradient mx-auto mt-4" />
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <CollectionCard key={cat.name} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};
