import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    deliveryFee,
    grandTotal,
    appliedDiscount,
    discountCode,
    applyPromoCode
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  const freeShippingThreshold = 10000;
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (inputCode) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9000] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-md h-full bg-ivory text-charcoal flex flex-col shadow-2xl border-l border-gold/30"
        >
          {/* Header */}
          <div className="p-6 border-b border-burgundy/10 flex items-center justify-between bg-ivory-soft">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-burgundy/10 text-burgundy">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold tracking-wide text-burgundy">
                Your Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-charcoal/60 hover:text-burgundy transition-colors rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-burgundy/5 px-6 py-3 border-b border-burgundy/10">
            <div className="flex items-center justify-between text-xs font-medium mb-1 text-charcoal/80">
              <span className="flex items-center gap-1.5 text-burgundy">
                <Truck className="w-4 h-4" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 font-semibold">You unlocked Complimentary Shipping!</span>
                ) : (
                  <span>
                    Add <strong className="text-burgundy">₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')}</strong> for Free Shipping
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-1.5 bg-burgundy/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-gradient transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-burgundy/5 flex items-center justify-center text-burgundy">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal">Your bag is currently empty</h3>
                <p className="text-xs text-charcoal/60 max-w-xs leading-relaxed">
                  Explore our luxury silk sarees, handcrafted lehengas, and designer sets to adorn your wardrobe.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-burgundy text-ivory text-xs uppercase tracking-widest font-semibold rounded-xl shadow-burgundy hover:bg-burgundy-dark transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  layout
                  className="flex gap-4 p-3 rounded-xl border border-burgundy/10 bg-white/60 hover:shadow-md transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg shrink-0 border border-burgundy/10"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-sm font-bold text-charcoal line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-charcoal/40 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-charcoal/60 mt-0.5">
                        Size: {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-burgundy/20 rounded-lg overflow-hidden bg-ivory">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="px-2 py-1 hover:bg-burgundy/10 text-burgundy transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="px-2 py-1 hover:bg-burgundy/10 text-burgundy transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Price */}
                      <span className="font-serif font-bold text-sm text-burgundy">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-burgundy/10 bg-ivory-soft space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-burgundy/50" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo Code (VASTRAA10)"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-burgundy/20 rounded-lg outline-none focus:border-burgundy font-sans uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-burgundy/10 hover:bg-burgundy text-burgundy hover:text-ivory text-xs font-bold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200">
                  <span>Code Applied ({discountCode}):</span>
                  <span>-{appliedDiscount}% (₹{discountAmount.toLocaleString('en-IN')})</span>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal/70">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Promo Discount:</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-burgundy pt-2 border-t border-burgundy/10">
                  <span>Total Amount:</span>
                  <span className="text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-burgundy text-ivory text-xs uppercase tracking-widest font-bold rounded-xl shadow-burgundy hover:bg-burgundy-dark flex items-center justify-center gap-2 group transition-all"
              >
                PROCEED TO CHECKOUT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
