import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Plus, Trash2, Power, X } from 'lucide-react';
import { useCoupons } from '../../context/CouponContext';

export const Coupons = () => {
  const { coupons, addCoupon, deleteCoupon, toggleCouponStatus } = useCoupons();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount: '15% OFF',
    minOrder: 2999,
    description: 'Special seasonal promotional discount'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code) return;
    addCoupon(formData);
    setFormData({ code: '', discount: '15% OFF', minOrder: 2999, description: '' });
    setIsAddModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gold-gradient">
            COUPONS & PROMOTIONS
          </h1>
          <p className="text-xs text-slate-400">
            Create discount promo codes for customer checkout.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 bg-gold-gradient text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-gold hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.id} className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="px-3 py-1.5 bg-burgundy rounded-lg border border-gold/40 text-gold font-mono font-bold text-sm tracking-wider">
                {c.code}
              </div>
              <button
                onClick={() => toggleCouponStatus(c.id)}
                className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold flex items-center gap-1 border transition-colors ${
                  c.status === 'Active'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                <Power className="w-3 h-3" /> {c.status}
              </button>
            </div>

            <div>
              <span className="font-serif text-2xl font-bold text-slate-100 block">{c.discount}</span>
              <p className="text-xs text-slate-400 mt-1">{c.description}</p>
              <span className="text-[10px] text-gold/80 uppercase font-semibold block mt-2">
                Min order: ₹{c.minOrder?.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => deleteCoupon(c.id)}
                className="p-2 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-lg transition-colors"
                title="Delete Coupon"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-sm w-full bg-slate-950 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <h3 className="font-serif text-xl font-bold text-gold-gradient">CREATE PROMO CODE</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="uppercase font-bold text-slate-300">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. LUXURY25"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-mono text-gold uppercase font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase font-bold text-slate-300">Discount Text</label>
                  <input
                    type="text"
                    required
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="25% OFF"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase font-bold text-slate-300">Minimum Order Amount (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    placeholder="1999"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-slate-100"
                  />
                </div>

                <button type="submit" className="w-full py-3.5 bg-gold-gradient text-slate-950 font-bold uppercase rounded-xl mt-2">
                  SAVE & ACTIVATE COUPON
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
