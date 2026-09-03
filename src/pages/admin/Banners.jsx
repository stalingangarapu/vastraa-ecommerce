import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Plus, Trash2, X } from 'lucide-react';
import { useBanners } from '../../context/BannerContext';

export const Banners = () => {
  const { banners, addBanner, deleteBanner } = useBanners();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addBanner({ title, subtitle, image, status: 'Active' });
    setTitle('');
    setSubtitle('');
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
            HOMEPAGE BANNERS
          </h1>
          <p className="text-xs text-slate-400">
            Manage promotional hero graphics and seasonal campaign banners.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 bg-gold-gradient text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-gold hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-md group">
            <div className="aspect-[16/9] relative overflow-hidden bg-slate-900">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gold tracking-widest block mb-1">BANNER ADVERT</span>
                  <h3 className="font-serif text-xl font-bold text-slate-100">{b.title}</h3>
                  <p className="text-xs text-slate-300 font-sans">{b.subtitle}</p>
                </div>
                <button
                  onClick={() => deleteBanner(b.id)}
                  className="p-2 bg-red-950/80 hover:bg-red-800 text-red-300 rounded-lg border border-red-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                <h3 className="font-serif text-xl font-bold text-gold-gradient">ADD BANNER</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="uppercase font-bold text-slate-300">Banner Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Royal Wedding Heritage 2026"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase font-bold text-slate-300">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Handcrafted Kanjeevarams & Velvet Lehengas"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase font-bold text-slate-300">Image URL</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Image URL..."
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-slate-100"
                  />
                </div>

                <button type="submit" className="w-full py-3.5 bg-gold-gradient text-slate-950 font-bold uppercase rounded-xl mt-2">
                  SAVE BANNER
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
