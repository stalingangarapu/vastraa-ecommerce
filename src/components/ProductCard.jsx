import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

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

    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;

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
      className="group relative bg-white rounded-2xl p-3.5 border border-burgundy/10 hover:border-gold shadow-sm hover:shadow-burgundy transition-all duration-300 flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-ivory-soft mb-3 group-hover:shadow-md transition-shadow">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-burgundy text-gold text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-gold/30">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
            isLiked
              ? 'bg-burgundy text-gold border border-gold/40'
              : 'bg-white/90 text-charcoal hover:bg-burgundy hover:text-gold'
          }`}
          title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-gold' : ''}`} />
        </button>

        {/* Quick View Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-3 bg-charcoal/90 text-ivory text-xs uppercase tracking-wider font-bold rounded-lg backdrop-blur-md hover:bg-gold hover:text-charcoal transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-4 h-4" /> Quick View
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="px-1 space-y-2">
        <div className="flex justify-between items-center text-xs text-charcoal/70 uppercase font-bold tracking-widest">
          <span>{product.category}</span>
          <div className="flex items-center gap-1 text-amber-600 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-burgundy line-clamp-1 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2.5 pt-1">
          <span className="font-serif font-bold text-lg sm:text-xl text-burgundy">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-charcoal/40 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>

      {/* Add To Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="w-full mt-4 py-3 bg-burgundy/10 hover:bg-burgundy text-burgundy hover:text-ivory text-xs sm:text-sm uppercase tracking-widest font-bold rounded-xl border border-burgundy/20 hover:border-burgundy transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
      >
        <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
        ADD TO CART
      </button>

      {/* Gold Hover Accent Bar */}
      <div className="h-1 w-0 group-hover:w-full bg-gold-gradient transition-all duration-500 rounded-b-2xl mt-2" />
    </motion.div>
  );
};
