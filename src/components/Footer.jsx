import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Instagram, Facebook, PinIcon as Pinterest } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      if (addToast) addToast('Thank you for subscribing to VASTRAA newsletter!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-burgundy-deep text-ivory pt-20 pb-10 border-t border-gold/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1.5 bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-gold/20">
          
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-burgundy flex items-center justify-center border border-gold">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-widest text-gold-gradient">
                VASTRAA
              </span>
            </Link>
            <p className="text-xs text-gold uppercase tracking-[0.2em] font-sans font-bold">
              Elegance in Every Thread
            </p>
            <p className="text-sm text-ivory/80 font-sans leading-relaxed">
              Curated luxury Indian ethnic fashion celebrating heritage Kanjeevarams, Banarasi silks, and designer lehengas.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-ivory/90">
              <li><Link to="/shop?category=Sarees" className="hover:text-gold transition-colors">Sarees</Link></li>
              <li><Link to="/shop?category=Lehengas" className="hover:text-gold transition-colors">Lehengas</Link></li>
              <li><Link to="/shop?category=3 Piece Sets" className="hover:text-gold transition-colors">3 Piece Sets</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-gold transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?filter=bestseller" className="hover:text-gold transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-ivory/90">
              <li><a href="#about" className="hover:text-gold transition-colors">Contact Us</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Shipping Information</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Returns & Exchange</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">FAQs</a></li>
              <li><Link to="/admin" className="text-gold font-bold hover:underline">⚡ Admin Portal</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
              INFORMATION
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-ivory/90">
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">
              NEWSLETTER
            </h4>
            <p className="text-sm text-ivory/80">
              Subscribe for exclusive royal collections, trunk show invites, and offers.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3.5 py-3 text-sm bg-burgundy/60 border border-gold/30 rounded-xl outline-none focus:border-gold text-ivory placeholder:text-ivory/50"
              />
              <button
                type="submit"
                className="p-3 bg-gold-gradient text-charcoal rounded-xl hover:brightness-110 transition-all font-bold shrink-0 shadow-gold"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-gold block mb-2 font-bold">
                FOLLOW US
              </span>
              <div className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-burgundy border border-gold/30 text-gold hover:bg-gold hover:text-burgundy transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-burgundy border border-gold/30 text-gold hover:bg-gold hover:text-burgundy transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-burgundy border border-gold/30 text-gold hover:bg-gold hover:text-burgundy transition-all">
                  <Pinterest className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-ivory/70 gap-4">
          <p>© {new Date().getFullYear()} VASTRAA Couture Pvt. Ltd. All rights reserved.</p>
          <p className="tracking-widest uppercase text-gold font-bold">
            Designed for Royal Elegance
          </p>
        </div>
      </div>
    </footer>
  );
};
