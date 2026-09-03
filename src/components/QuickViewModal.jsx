import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [activeImage, setActiveImage] = useState(product?.image || '');

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 max-w-3xl w-full bg-ivory text-charcoal rounded-2xl border border-gold/40 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-charcoal/10 hover:bg-burgundy text-charcoal hover:text-ivory rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery */}
          <div className="p-6 bg-ivory-soft flex flex-col justify-between">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-charcoal/5 border border-gold/20 mb-3 relative">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-burgundy text-gold text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-md">
                {product.discount}
              </span>
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      (activeImage || product.image) === img ? 'border-gold scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                {product.category}
              </span>
              <h2 className="font-serif text-2xl font-bold text-burgundy mt-1 mb-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs text-charcoal/60 font-semibold">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-2xl font-bold text-burgundy">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-charcoal/40 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Sizes Selection */}
              {product.sizes && (
                <div className="mb-4">
                  <span className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-2">
                    Size:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedSize === sz
                            ? 'bg-burgundy text-ivory border-burgundy shadow-sm'
                            : 'bg-white border-burgundy/20 text-charcoal hover:border-burgundy'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-burgundy/10">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-burgundy text-ivory text-xs uppercase tracking-widest font-bold rounded-xl shadow-burgundy hover:bg-burgundy-dark flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" /> ADD TO CART
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isLiked
                      ? 'bg-burgundy/10 border-burgundy text-burgundy'
                      : 'border-burgundy/20 hover:border-burgundy text-charcoal'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-burgundy text-burgundy' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
