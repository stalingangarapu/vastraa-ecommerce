import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Sparkles } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Sarees',
    description: '',
    sku: `VAS-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    originalPrice: '',
    price: '',
    stock: 25,
    colors: '#7B1E3A, #D4AF37',
    sizes: 'Free Size',
    fabric: 'Pure Kanjeevaram Silk',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false,
    isBestseller: true,
    isNewArrival: true,
    status: 'Active'
  });

  const [imagePreview, setImagePreview] = useState(formData.image);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const orig = Number(formData.originalPrice) || Number(formData.price) || 0;
  const sale = Number(formData.price) || 0;
  const discountPct = orig > sale && sale > 0 ? Math.round(((orig - sale) / orig) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill in Product Name and Selling Price');
      return;
    }

    const colorArray = formData.colors.split(',').map((c) => c.trim()).filter(Boolean);
    const sizeArray = formData.sizes.split(',').map((s) => s.trim()).filter(Boolean);

    addProduct({
      ...formData,
      image: imagePreview,
      colors: colorArray.length > 0 ? colorArray : ['#7B1E3A', '#D4AF37'],
      sizes: sizeArray.length > 0 ? sizeArray : ['Free Size']
    });

    navigate('/admin/products');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/products')}
            className="p-2.5 text-slate-300 hover:text-gold rounded-xl bg-slate-950 border border-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-serif text-3xl font-bold text-gold-gradient">
              ADD NEW PRODUCT
            </h1>
            <p className="text-sm text-slate-400">
              Create a new luxury creation to feature across customer catalog and shop.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-md">
          <h3 className="font-serif text-xl font-bold text-slate-100 pb-2 border-b border-slate-800">
            BASIC INFORMATION
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Product Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Royal Burgundy Silk Saree"
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-gold text-sm text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-gold text-sm text-slate-100 cursor-pointer"
              >
                <option value="Sarees">Sarees</option>
                <option value="Lehengas">Lehengas</option>
                <option value="3 Piece Sets">3 Piece Sets</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-gold text-sm text-slate-100"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe fabric, weave, embroidery details, and occasion suitability..."
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-gold text-sm text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Discount Calculation */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-md">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h3 className="font-serif text-xl font-bold text-slate-100">PRICING</h3>
            {discountPct > 0 && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-800">
                Calculated Discount: {discountPct}% OFF
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Original Price (₹)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="e.g. 4999"
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-gold text-sm text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Selling / Sale Price (₹) *</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g. 3999"
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-gold text-sm text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Inventory & Product Options */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-md">
          <h3 className="font-serif text-xl font-bold text-slate-100 pb-2 border-b border-slate-800">
            INVENTORY & OPTIONS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-gold text-sm text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fabric Type</label>
              <input
                type="text"
                name="fabric"
                value={formData.fabric}
                onChange={handleInputChange}
                placeholder="e.g. Pure Kanjeevaram Silk"
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-gold text-sm text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Sizes (Comma separated)</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleInputChange}
                placeholder="Free Size, S, M, L"
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-gold text-sm text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Product Image Selection */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-md">
          <h3 className="font-serif text-xl font-bold text-slate-100 pb-2 border-b border-slate-800">
            PRODUCT IMAGE
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block p-6 border-2 border-dashed border-slate-700 hover:border-gold rounded-2xl text-center cursor-pointer bg-slate-900/60 transition-colors">
                <Upload className="w-8 h-8 text-gold mx-auto mb-2" />
                <span className="text-sm font-bold text-slate-200 block">Click to upload image file</span>
                <span className="text-xs text-slate-400 block mt-1">Select from computer or enter URL below</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>

              <div className="mt-4">
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={(e) => {
                    handleInputChange(e);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="Or paste Image URL..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm outline-none text-slate-200"
                />
              </div>
            </div>

            {/* Preview Box */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Live Image Preview</span>
              <div className="w-40 h-48 rounded-xl overflow-hidden border border-gold/40 shadow-gold bg-slate-900">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Flags & Status */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-md">
          <h3 className="font-serif text-xl font-bold text-slate-100 pb-2 border-b border-slate-800">
            FLAGS & STATUS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="w-5 h-5 accent-burgundy"
              />
              <span className="text-sm font-bold text-slate-200">Featured Product</span>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                name="isBestseller"
                checked={formData.isBestseller}
                onChange={handleInputChange}
                className="w-5 h-5 accent-burgundy"
              />
              <span className="text-sm font-bold text-slate-200">Best Seller</span>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                name="isNewArrival"
                checked={formData.isNewArrival}
                onChange={handleInputChange}
                className="w-5 h-5 accent-burgundy"
              />
              <span className="text-sm font-bold text-slate-200">New Arrival</span>
            </label>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 py-4 bg-gold-gradient text-slate-950 font-bold uppercase tracking-widest text-sm rounded-xl shadow-gold hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" /> ADD PRODUCT TO CATALOG
          </button>
        </div>
      </form>
    </motion.div>
  );
};
