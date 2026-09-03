import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  Grid,
  Tag,
  Image,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminAuthenticated, adminLogout } = useAdminAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Categories', path: '/admin/categories', icon: Grid },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Banners', path: '/admin/banners', icon: Image },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-72 bg-slate-950 border-r border-slate-800 p-6 flex-col justify-between shrink-0 shadow-2xl">
        <div>
          {/* Logo & Header */}
          <Link to="/" className="flex items-center gap-3 mb-8 group">
            <div className="w-10 h-10 rounded-xl bg-burgundy flex items-center justify-center text-gold border border-gold/50 shadow-gold group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-widest text-gold-gradient block">
                VASTRAA
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block font-sans">
                ADMIN PANEL
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-burgundy text-gold shadow-burgundy border border-gold/40'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-gold'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action Buttons */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gold-gradient text-slate-950 text-sm font-bold uppercase tracking-wider rounded-xl shadow-gold hover:brightness-110 transition-all w-full"
          >
            <ExternalLink className="w-4 h-4" /> VIEW STORE
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 text-slate-300 hover:text-red-400 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-red-950/30 transition-all w-full"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-300 hover:text-gold rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
                Good Morning, Admin
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                Here's what's happening with your store today.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-slate-300 hover:text-gold relative rounded-xl bg-slate-900 border border-slate-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gold rounded-full" />
            </button>

            <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-burgundy text-gold flex items-center justify-center font-bold text-sm">
                A
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-sm font-bold text-slate-100 block leading-tight">Admin User</span>
                <span className="text-xs text-gold block leading-tight">admin@vastraa.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-slate-900">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-[9500] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 w-4/5 max-w-xs h-full bg-slate-950 text-slate-100 p-6 flex flex-col justify-between border-r border-slate-800"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" />
                    <span className="font-serif text-2xl font-bold tracking-widest text-gold-gradient">
                      VASTRAA
                    </span>
                  </div>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 text-slate-400">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-200 hover:bg-burgundy hover:text-gold transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-gold" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800">
                <Link
                  to="/"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gold-gradient text-slate-950 text-sm font-bold uppercase rounded-xl"
                >
                  <ExternalLink className="w-4 h-4" /> VIEW STORE
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-red-400 text-sm font-bold uppercase w-full"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
