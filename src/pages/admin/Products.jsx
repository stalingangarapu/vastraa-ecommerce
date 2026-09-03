import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, Filter, AlertTriangle } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export const Products = () => {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    }
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
            PRODUCTS MANAGEMENT
          </h1>
          <p className="text-sm text-slate-400">
            View, edit, filter, and manage your luxury product inventory.
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="px-6 py-3.5 bg-gold-gradient text-slate-950 font-bold uppercase text-sm tracking-wider rounded-xl shadow-gold hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" /> Add Product
        </Link>
      </div>

      {/* Toolbar Filters */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-md">
        <div className="w-full sm:w-auto flex-1 flex items-center gap-3 bg-slate-900 px-4 py-3 rounded-xl border border-slate-800">
          <Search className="w-5 h-5 text-gold shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full bg-transparent border-none outline-none text-sm text-slate-100 placeholder:text-slate-500 font-sans"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-5 h-5 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-gold outline-none cursor-pointer w-full sm:w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Sarees">Sarees</option>
            <option value="Lehengas">Lehengas</option>
            <option value="3 Piece Sets">3 Piece Sets</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-gold uppercase tracking-wider text-xs">
              <tr>
                <th className="py-4 px-4">Image</th>
                <th className="py-4 px-4">Product Name</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Sale Price</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-4">
                    <img src={p.image} alt={p.name} className="w-12 h-14 object-cover rounded-lg border border-slate-800" />
                  </td>
                  <td className="py-4 px-4 font-bold font-serif text-base text-slate-100">{p.name}</td>
                  <td className="py-4 px-4 text-gold font-semibold">{p.category}</td>
                  <td className="py-4 px-4 text-slate-400 line-through">₹{p.originalPrice?.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4 font-serif font-bold text-slate-100 text-base">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4 font-bold">{p.stock || 20}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {p.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <Link
                      to={`/product/${p.id}`}
                      target="_blank"
                      className="p-2.5 inline-block bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors"
                      title="View on Storefront"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="p-2.5 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-lg border border-red-800/40 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-sm w-full bg-slate-950 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-2xl text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400 mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-xl font-bold text-slate-100">Delete Product?</h3>
              <p className="text-sm text-slate-400">
                Are you sure you want to delete <strong className="text-gold">"{deleteTarget.name}"</strong>? This will remove it from the catalog.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-bold uppercase rounded-xl border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 bg-red-800 hover:bg-red-700 text-white text-sm font-bold uppercase rounded-xl shadow-md"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
