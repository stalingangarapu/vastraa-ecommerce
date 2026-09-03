import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CouponProvider } from './context/CouponContext';
import { BannerProvider } from './context/BannerContext';

// Global Components
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { WelcomePopup } from './components/WelcomePopup';

// Storefront Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Login } from './pages/Login';
import { Account } from './pages/Account';

// Admin Suite Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Products } from './pages/admin/Products';
import { AddProduct } from './pages/admin/AddProduct';
import { Orders } from './pages/admin/Orders';
import { Customers } from './pages/admin/Customers';
import { Categories } from './pages/admin/Categories';
import { Coupons } from './pages/admin/Coupons';
import { Banners } from './pages/admin/Banners';
import { Settings } from './pages/admin/Settings';

// Auto Scroll to Top on Navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Storefront Wrapper to include Header Navbar and Cart Drawer
const StorefrontLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <CartDrawer />
      {children}
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <AuthProvider>
                <AdminAuthProvider>
                  <CouponProvider>
                    <BannerProvider>
                      {/* Initial Loading Screen Splash */}
                      <LoadingScreen />

                      {/* First-Time Welcome Modal */}
                      <WelcomePopup />

                      {/* Desktop Dual Ring Custom Cursor */}
                      <CustomCursor />

                      <ScrollToTop />

                      <AnimatePresence mode="wait">
                        <Routes>
                          {/* Public Storefront Routes */}
                          <Route
                            path="/"
                            element={
                              <StorefrontLayout>
                                <Home />
                              </StorefrontLayout>
                            }
                          />
                          <Route
                            path="/shop"
                            element={
                              <StorefrontLayout>
                                <Shop />
                              </StorefrontLayout>
                            }
                          />
                          <Route
                            path="/product/:id"
                            element={
                              <StorefrontLayout>
                                <ProductDetails />
                              </StorefrontLayout>
                            }
                          />
                          <Route
                            path="/wishlist"
                            element={
                              <StorefrontLayout>
                                <Wishlist />
                              </StorefrontLayout>
                            }
                          />
                          <Route
                            path="/checkout"
                            element={
                              <StorefrontLayout>
                                <Checkout />
                              </StorefrontLayout>
                            }
                          />
                          <Route
                            path="/order-success"
                            element={
                              <StorefrontLayout>
                                <OrderSuccess />
                              </StorefrontLayout>
                            }
                          />
                          <Route
                            path="/login"
                            element={
                              <StorefrontLayout>
                                <Login />
                              </StorefrontLayout>
                            }
                          />
                          <Route
                            path="/account"
                            element={
                              <StorefrontLayout>
                                <Account />
                              </StorefrontLayout>
                            }
                          />

                          {/* Admin Login Route */}
                          <Route path="/admin/login" element={<AdminLogin />} />

                          {/* Admin Suite Routes */}
                          <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="products" element={<Products />} />
                            <Route path="products/add" element={<AddProduct />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="customers" element={<Customers />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="coupons" element={<Coupons />} />
                            <Route path="banners" element={<Banners />} />
                            <Route path="settings" element={<Settings />} />
                          </Route>
                        </Routes>
                      </AnimatePresence>
                    </BannerProvider>
                  </CouponProvider>
                </AdminAuthProvider>
              </AuthProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
