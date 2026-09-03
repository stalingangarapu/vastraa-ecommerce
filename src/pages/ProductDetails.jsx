import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Footer } from '../components/Footer';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();

  const product = products.find((p) => p.id === id) || products[0];
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Free Size');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  React.useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize(product.sizes?.[0] || 'Free Size');
      setQuantity(1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, product]);

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-ivory pt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/60 hover:text-burgundy font-bold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-gold/30 shadow-lg relative">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 bg-burgundy text-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  {product.discount}
                </span>
              )}
            </div>

            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img ? 'border-gold scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-bold block mb-1">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-charcoal/70">
                  {product.rating || 5.0} ({product.reviewsCount || 1} verified reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 p-4 rounded-2xl bg-burgundy/5 border border-burgundy/10">
              <span className="font-serif text-3xl font-bold text-burgundy">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base text-charcoal/40 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-charcoal block">
                  Select Color:
                </span>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full border-2 transition-all shadow-sm ${
                        selectedColor === color ? 'border-gold scale-110 shadow-gold' : 'border-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-charcoal block">Select Size:</span>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === size
                          ? 'bg-burgundy text-ivory border-burgundy shadow-sm'
                          : 'bg-white text-charcoal border-burgundy/20 hover:border-burgundy'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-charcoal block">Quantity:</span>
              <div className="inline-flex items-center border border-burgundy/20 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2.5 text-burgundy hover:bg-burgundy/10 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 text-sm font-bold text-charcoal">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2.5 text-burgundy hover:bg-burgundy/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-burgundy/10">
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-burgundy text-ivory text-xs uppercase tracking-widest font-bold rounded-xl shadow-burgundy hover:bg-burgundy-dark flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-gold" /> ADD TO CART
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-xl border transition-all ${
                    isLiked
                      ? 'bg-burgundy/10 border-burgundy text-burgundy'
                      : 'border-burgundy/20 hover:border-burgundy text-charcoal'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-burgundy text-burgundy' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-gold-gradient text-charcoal text-xs uppercase tracking-widest font-bold rounded-xl shadow-gold hover:brightness-110 transition-all"
              >
                BUY NOW WITH EXPRESS CHECKOUT
              </button>
            </div>
          </div>
        </div>

        <div className="mb-20 bg-white rounded-2xl border border-burgundy/10 p-6 sm:p-10 shadow-sm">
          <div className="flex border-b border-burgundy/10 overflow-x-auto gap-8 mb-6">
            {[
              { id: 'description', label: 'Description' },
              { id: 'craftsmanship', label: 'Fabric & Craftsmanship' },
              { id: 'care', label: 'Care Instructions' },
              { id: 'shipping', label: 'Shipping & Returns' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-xs uppercase tracking-widest font-bold transition-all relative shrink-0 ${
                  activeTab === tab.id ? 'text-burgundy' : 'text-charcoal/50 hover:text-charcoal'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans space-y-4">
            {activeTab === 'description' && <p>{product.description}</p>}
            {activeTab === 'craftsmanship' && (
              <div className="space-y-2">
                <p><strong>Fabric:</strong> {product.fabric}</p>
                <p><strong>Craftsmanship:</strong> {product.craftsmanship}</p>
              </div>
            )}
            {activeTab === 'care' && <p>{product.careInstructions}</p>}
            {activeTab === 'shipping' && (
              <div className="space-y-2">
                <p><strong>Shipping:</strong> {product.shippingInfo}</p>
                <p><strong>Returns:</strong> {product.returnsInfo}</p>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif text-3xl font-bold text-burgundy mb-8">
              YOU MAY ALSO ADORE
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setSelectedQuickView(prod)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />

      <Footer />
    </motion.div>
  );
};
