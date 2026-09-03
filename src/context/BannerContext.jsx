import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const BannerContext = createContext();

const INITIAL_BANNERS = [
  {
    id: 'b1',
    title: 'Festive Season Couture 2026',
    subtitle: 'Royal Kanjeevaram & Banarasi Weaves',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
    status: 'Active'
  },
  {
    id: 'b2',
    title: 'Bridal Heritage Velvet Lehengas',
    subtitle: 'Handcrafted Zardozi Artistry',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
    status: 'Active'
  }
];

export const BannerProvider = ({ children }) => {
  const [banners, setBanners] = useState(() => {
    try {
      const saved = localStorage.getItem('vastraa_banners');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_BANNERS;
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('vastraa_banners', JSON.stringify(banners));
  }, [banners]);

  const addBanner = (bannerData) => {
    const newB = {
      id: `b-${Date.now()}`,
      title: bannerData.title,
      subtitle: bannerData.subtitle,
      image: bannerData.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
      status: bannerData.status || 'Active'
    };
    setBanners((prev) => [newB, ...prev]);
    if (addToast) addToast(`Banner "${newB.title}" added!`, 'success');
  };

  const deleteBanner = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    if (addToast) addToast(`Banner deleted!`, 'info');
  };

  return (
    <BannerContext.Provider value={{ banners, addBanner, deleteBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanners = () => useContext(BannerContext);
