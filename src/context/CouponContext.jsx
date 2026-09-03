import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CouponContext = createContext();

const INITIAL_COUPONS = [
  { id: 'c1', code: 'WELCOME10', discount: '10% OFF', minOrder: 1999, status: 'Active', description: '10% off on minimum order of ₹1,999' },
  { id: 'c2', code: 'VASTRAA10', discount: '10% OFF', minOrder: 0, status: 'Active', description: '10% off for new patrons' },
  { id: 'c3', code: 'ROYAL20', discount: '20% OFF', minOrder: 9999, status: 'Active', description: '20% off on royal bridal collections' },
  { id: 'c4', code: 'FESTIVE30', discount: '30% OFF', minOrder: 15000, status: 'Draft', description: 'Festive season mega offer' }
];

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('vastraa_coupons');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_COUPONS;
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('vastraa_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const addCoupon = (couponData) => {
    const newC = {
      id: `c-${Date.now()}`,
      code: couponData.code.toUpperCase(),
      discount: couponData.discount,
      minOrder: Number(couponData.minOrder) || 0,
      status: couponData.status || 'Active',
      description: couponData.description || 'Promotional coupon discount'
    };
    setCoupons((prev) => [newC, ...prev]);
    if (addToast) addToast(`Coupon "${newC.code}" created!`, 'success');
  };

  const deleteCoupon = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    if (addToast) addToast(`Coupon deleted!`, 'info');
  };

  const toggleCouponStatus = (id) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c))
    );
    if (addToast) addToast(`Coupon status updated!`, 'success');
  };

  return (
    <CouponContext.Provider value={{ coupons, addCoupon, deleteCoupon, toggleCouponStatus }}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupons = () => useContext(CouponContext);
