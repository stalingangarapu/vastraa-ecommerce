import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Store, Mail, Phone, MapPin, Share2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Settings = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    storeName: 'Vastraa',
    tagline: 'Elegance in Every Thread',
    contactEmail: 'contact@vastraa.com',
    contactPhone: '+91 98765 43210',
    storeAddress: 'Suite 401, Royal Silk Tower, MG Road, Jubilee Hills, Hyderabad, Telangana 500033',
    instagram: '@vastraa.official',
    facebook: 'facebook.com/vastraaofficial',
    pinterest: 'pinterest.com/vastraaofficial'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addToast) addToast('Store Settings updated successfully!', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl mx-auto"
    >
      <div>
        <h1 className="font-serif text-3xl font-bold text-gold-gradient">
          STORE CONFIGURATION & SETTINGS
        </h1>
        <p className="text-xs text-slate-400">
          Manage general store details, contact information, and social media handles.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Store Information */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-md">
          <h3 className="font-serif text-lg font-bold text-slate-100 pb-2 border-b border-slate-800 flex items-center gap-2">
            <Store className="w-5 h-5 text-gold" /> STORE INFORMATION
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">Store Name</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-md">
          <h3 className="font-serif text-lg font-bold text-slate-100 pb-2 border-b border-slate-800 flex items-center gap-2">
            <Mail className="w-5 h-5 text-gold" /> CONTACT & ADDRESS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">Support Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">Support Phone</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-slate-100"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">Physical Boutique Address</label>
              <textarea
                rows="2"
                value={formData.storeAddress}
                onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-md">
          <h3 className="font-serif text-lg font-bold text-slate-100 pb-2 border-b border-slate-800 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-gold" /> SOCIAL MEDIA CHANNELS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">Instagram Handle</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">Facebook Page</label>
              <input
                type="text"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase font-bold text-slate-300 tracking-wider">Pinterest Handle</label>
              <input
                type="text"
                value={formData.pinterest}
                onChange={(e) => setFormData({ ...formData, pinterest: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gold-gradient text-slate-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-gold hover:brightness-110 flex items-center justify-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" /> SAVE STORE SETTINGS
        </button>
      </form>
    </motion.div>
  );
};
