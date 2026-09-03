import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { SearchOverlay } from './SearchOverlay';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/shop?category=Sarees' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Best Sellers', path: '/shop?filter=bestseller' },
    { name: 'About', path: '/#about' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[8000] transition-all duration-500 ${
          isScrolled
            ? 'glass-card border-b border-gold/30 shadow-glass py-4'
            : isHome
            ? 'bg-gradient-to-b from-charcoal/90 to-transparent py-5 text-ivory'
            : 'bg-ivory/95 border-b border-burgundy/10 py-5 text-charcoal'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gold hover:text-burgundy transition-colors"
          >
            <Menu className="w-7 h-7" />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-burgundy flex items-center justify-center border border-gold/50 shadow-gold group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-2xl sm:text-3xl tracking-[0.2em] font-bold ${
                isScrolled || !isHome ? 'text-burgundy' : 'text-gold-gradient'
              }`}>
                VASTRAA
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold -mt-1">
                Elegance in Every Thread
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm uppercase tracking-[0.18em] font-bold transition-all relative group py-1 ${
                  isScrolled || !isHome
                    ? 'text-charcoal hover:text-burgundy'
                    : 'text-ivory hover:text-gold'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 transition-colors relative ${
                isScrolled || !isHome ? 'text-charcoal hover:text-burgundy' : 'text-ivory hover:text-gold'
              }`}
              title="Search"
            >
              <Search className="w-6 h-6" />
            </button>

            <Link
              to="/wishlist"
              className={`p-2 transition-colors relative ${
                isScrolled || !isHome ? 'text-charcoal hover:text-burgundy' : 'text-ivory hover:text-gold'
              }`}
              title="Wishlist"
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-burgundy text-gold text-xs font-bold rounded-full flex items-center justify-center border border-gold/40">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to={user ? '/account' : '/login'}
              className={`p-2 transition-colors relative ${
                isScrolled || !isHome ? 'text-charcoal hover:text-burgundy' : 'text-ivory hover:text-gold'
              }`}
              title={user ? 'Account' : 'Login'}
            >
              <User className="w-6 h-6" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-burgundy text-ivory border border-gold/40 shadow-burgundy hover:bg-burgundy-dark transition-all transform hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 text-gold" />
              <span className="text-sm font-bold text-gold">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[9500] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 w-4/5 max-w-sm h-full bg-burgundy-deep text-ivory p-6 flex flex-col justify-between shadow-2xl border-r border-gold/30"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gold/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-gold" />
                    <span className="font-serif text-2xl font-bold tracking-widest text-gold-gradient">
                      VASTRAA
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-ivory/70 hover:text-gold"
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>

                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between text-base uppercase tracking-widest py-3 border-b border-gold/10 font-semibold hover:text-gold transition-colors"
                    >
                      {link.name}
                      <ChevronRight className="w-5 h-5 text-gold/60" />
                    </Link>
                  ))}
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base uppercase tracking-widest py-3 border-b border-gold/10 text-gold font-bold"
                  >
                    ⚡ Admin Portal Demo
                    <ChevronRight className="w-5 h-5 text-gold" />
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-gold/20 text-center space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-gold/80 font-semibold">
                  "Elegance in Every Thread"
                </p>
                <div className="flex justify-center gap-4 text-sm text-ivory/80 font-medium">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold">
                    Sign In
                  </Link>
                  <span>•</span>
                  <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold">
                    View Catalog
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
