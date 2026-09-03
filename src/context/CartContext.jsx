import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('vastraa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('vastraa_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, color = null, size = null, quantity = 1) => {
    const selectedColor = color || (product.colors && product.colors[0]) || 'Standard';
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Free Size';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            selectedColor,
            selectedSize,
            quantity
          }
        ];
      }
    });

    addToast(`Added "${product.name}" to your Cart`, 'success');
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const item = prevCart[index];
      if (item) addToast(`Removed "${item.name}" from Cart`, 'info');
      return prevCart.filter((_, i) => i !== index);
    });
  };

  const updateQuantity = (index, delta) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prevCart.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(0);
    setDiscountCode('');
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VASTRAA10' || clean === 'ELEGANCE') {
      setAppliedDiscount(10);
      setDiscountCode(clean);
      addToast('Promo code applied! 10% discount added.', 'success');
      return true;
    } else if (clean === 'ROYAL20') {
      setAppliedDiscount(20);
      setDiscountCode(clean);
      addToast('Royal Offer applied! 20% discount added.', 'success');
      return true;
    } else {
      addToast('Invalid promo code. Try "VASTRAA10" or "ROYAL20"', 'error');
      return false;
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);

  const deliveryFee = subtotal > 10000 || cart.length === 0 ? 0 : 499;

  const grandTotal = subtotal - discountAmount + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        deliveryFee,
        grandTotal,
        appliedDiscount,
        discountCode,
        applyPromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
