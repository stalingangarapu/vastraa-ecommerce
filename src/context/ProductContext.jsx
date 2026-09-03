import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('vastraa_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge initial products with saved products to ensure any new items appear
          const savedIds = new Set(parsed.map((p) => p.id));
          const missingDefaults = INITIAL_PRODUCTS.filter((p) => !savedIds.has(p.id));
          return [...parsed, ...missingDefaults];
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('vastraa_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const addProduct = (newProductData) => {
    const original = Number(newProductData.originalPrice) || Number(newProductData.price);
    const sale = Number(newProductData.price);
    const discountPct = original > sale ? Math.round(((original - sale) / original) * 100) : 0;
    const discountText = discountPct > 0 ? `${discountPct}% OFF` : '';

    const newProduct = {
      id: newProductData.id || `vastraa-prod-${Date.now()}`,
      name: newProductData.name,
      category: newProductData.category || 'Sarees',
      price: sale,
      originalPrice: original,
      discount: discountText,
      rating: 5.0,
      reviewsCount: 1,
      image: newProductData.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
      gallery: newProductData.gallery && newProductData.gallery.length > 0
        ? newProductData.gallery
        : [newProductData.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000'],
      colors: newProductData.colors || ['#7B1E3A', '#D4AF37'],
      sizes: newProductData.sizes || ['Free Size'],
      fabric: newProductData.fabric || 'Pure Kanjeevaram Silk',
      craftsmanship: newProductData.craftsmanship || 'Handcrafted Zari Weaving',
      careInstructions: newProductData.careInstructions || 'Dry Clean Only.',
      description: newProductData.description || 'Authentic Indian ethnic couture piece.',
      shippingInfo: 'Ships within 48 hours.',
      returnsInfo: 'Easy 7-day returns guaranteed.',
      stock: Number(newProductData.stock) || 20,
      sku: newProductData.sku || `VAS-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      status: newProductData.status || 'Active',
      isFeatured: !!newProductData.isFeatured,
      isBestseller: !!newProductData.isBestseller,
      isNewArrival: newProductData.isNewArrival !== undefined ? !!newProductData.isNewArrival : true,
    };

    setProducts((prev) => [newProduct, ...prev]);
    if (addToast) addToast(`Product "${newProduct.name}" added successfully!`, 'success');
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const original = Number(updatedData.originalPrice) || Number(updatedData.price) || p.originalPrice;
          const sale = Number(updatedData.price) || p.price;
          const discountPct = original > sale ? Math.round(((original - sale) / original) * 100) : 0;
          return {
            ...p,
            ...updatedData,
            price: sale,
            originalPrice: original,
            discount: discountPct > 0 ? `${discountPct}% OFF` : p.discount,
          };
        }
        return p;
      })
    );
    if (addToast) addToast(`Product updated successfully!`, 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target && addToast) addToast(`Product "${target.name}" deleted successfully!`, 'info');
      return prev.filter((p) => p.id !== id);
    });
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('vastraa_products');
    if (addToast) addToast('Reset products to default mock data', 'info');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
