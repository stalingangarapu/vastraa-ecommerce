import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Footer } from '../components/Footer';

export const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order || {
    id: 'VAS20260001',
    date: new Date().toISOString().split('T')[0],
    total: 24999,
    items: [
      {
        name: 'Royal Burgundy Silk Saree',
        price: 24999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000'
      }
    ]
  };

  useEffect(() => {
    // Launch gold & burgundy celebration confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#7B1E3A', '#F3E5AB']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#7B1E3A', '#F3E5AB']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-ivory pt-28 pb-20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-gold/40 shadow-burgundy space-y-6 relative overflow-hidden">
          {/* Subtle gold glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1.5 bg-gold-gradient" />

          {/* Animated Gold Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-burgundy flex items-center justify-center text-gold mx-auto border-2 border-gold shadow-gold"
          >
            <CheckCircle className="w-10 h-10 fill-gold text-burgundy" />
          </motion.div>

          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-bold block">
            ROYAL CONGRATULATIONS
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-burgundy">
            ORDER PLACED SUCCESSFULLY
          </h1>

          <p className="text-sm text-charcoal/80 font-sans max-w-md mx-auto leading-relaxed">
            Thank you for choosing Vastraa. Your order has been registered and is being prepared with utmost care by our master weavers.
          </p>

          {/* Order Details Badge */}
          <div className="bg-ivory-soft p-6 rounded-2xl border border-burgundy/10 max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Order Reference</span>
              <span className="font-serif font-bold text-lg text-burgundy">{order.id}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Estimated Delivery</span>
              <span className="font-sans font-bold text-sm text-emerald-700 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> 3–5 Business Days
              </span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="max-w-lg mx-auto space-y-3 pt-4 border-t border-burgundy/10 text-left">
            <span className="text-xs uppercase font-bold text-charcoal tracking-wider block">Items In Order:</span>
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-burgundy/10">
                <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg border border-gold/20" />
                <div className="flex-1">
                  <h4 className="font-serif text-sm font-bold text-burgundy">{item.name}</h4>
                  <p className="text-[10px] text-charcoal/60">Qty: {item.quantity}</p>
                </div>
                <span className="font-serif font-bold text-sm text-burgundy">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              to="/shop"
              className="px-8 py-4 bg-burgundy text-ivory text-xs uppercase tracking-widest font-bold rounded-xl shadow-burgundy hover:bg-burgundy-dark transition-all flex items-center justify-center gap-2"
            >
              CONTINUE SHOPPING
            </Link>

            <Link
              to="/account"
              className="px-8 py-4 bg-gold-gradient text-charcoal text-xs uppercase tracking-widest font-bold rounded-xl shadow-gold hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              VIEW MY ORDERS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};
