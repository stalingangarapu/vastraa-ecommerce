import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Footer } from '../components/Footer';

export const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
    setIsCartOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-ivory pt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 fill-burgundy" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-burgundy">
            YOUR WISHLIST ({wishlist.length})
          </h1>
          <p className="text-xs uppercase tracking-widest text-charcoal/60 mt-1">
            Curated pieces saved for your upcoming occasions
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-burgundy/10 max-w-lg mx-auto p-8 shadow-sm">
            <p className="font-serif text-2xl font-bold text-burgundy mb-2">Your wishlist is empty</p>
            <p className="text-xs text-charcoal/60 mb-6 leading-relaxed">
              Explore our luxury collections and click the heart icon on any design to save it here.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-burgundy text-ivory text-xs uppercase tracking-widest font-bold rounded-xl shadow-burgundy hover:bg-burgundy-dark transition-all"
            >
              EXPLORE CATALOG <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                layout
                className="bg-white rounded-2xl p-4 border border-burgundy/10 hover:border-gold shadow-sm flex flex-col justify-between"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-ivory-soft mb-3 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-white/80 text-charcoal hover:text-red-600 rounded-full shadow-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-bold text-gold tracking-widest">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-burgundy line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="font-serif font-bold text-base text-burgundy block">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => handleMoveToCart(product)}
                  className="w-full py-2.5 bg-burgundy text-ivory text-xs uppercase tracking-widest font-bold rounded-xl shadow-burgundy hover:bg-burgundy-dark transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-gold" /> MOVE TO CART
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </motion.div>
  );
};
