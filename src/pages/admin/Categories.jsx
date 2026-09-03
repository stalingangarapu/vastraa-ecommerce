import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, Plus, Trash2, Edit2, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Sarees', tagline: 'Timeless drapes, modern elegance', count: 7, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000' },
  { id: 'cat-2', name: 'Lehengas', tagline: 'Celebrate every unforgettable moment', count: 5, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000' },
  { id: 'cat-3', name: '3 Piece Sets', tagline: 'Effortless style, beautifully curated', count: 4, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000' },
  { id: 'cat-4', name: 'Festive Wear', tagline: 'Vibrant celebratory attires', count: 8, image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000' },
  { id: 'cat-5', name: 'Wedding Collection', tagline: 'Royal heritage bridal trousseau', count: 6, image: 'https://images.unsplash.com/photo-1583391733975-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000' }
];

export const Categories = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatTagline, setNewCatTagline] = useState('');
  const { addToast } = useToast();

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    const created = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      tagline: newCatTagline || 'Curated luxury fashion',
      count: 0,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000'
    };
    setCategories([...categories, created]);
    setNewCatName('');
    setNewCatTagline('');
    setIsAddModalOpen(false);
    if (addToast) addToast(`Category "${created.name}" created!`, 'success');
  };

  const handleDelete = (id, name) => {
    setCategories(categories.filter((c) => c.id !== id));
    if (addToast) addToast(`Category "${name}" deleted!`, 'info');
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
            CATEGORIES MANAGEMENT
          </h1>
          <p className="text-xs text-slate-400">
            Organize catalog groupings, collection taglines, and hero banners.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 bg-gold-gradient text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-gold hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <img src={cat.image} alt={cat.name} className="w-14 h-16 object-cover rounded-xl border border-slate-800 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider">{cat.count} Items</span>
                <h3 className="font-serif text-xl font-bold text-slate-100">{cat.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-1">"{cat.tagline}"</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-2 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-lg transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
                <h3 className="font-serif text-xl font-bold text-gold-gradient">ADD CATEGORY</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="uppercase font-bold text-slate-300">Category Name</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Silk Dupattas"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase font-bold text-slate-300">Tagline</label>
                  <input
                    type="text"
                    value={newCatTagline}
                    onChange={(e) => setNewCatTagline(e.target.value)}
                    placeholder="e.g. Royal accent wraps"
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-slate-100"
                  />
                </div>

                <button type="submit" className="w-full py-3.5 bg-gold-gradient text-slate-950 font-bold uppercase rounded-xl mt-2">
                  SAVE CATEGORY
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
