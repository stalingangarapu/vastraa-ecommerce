import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, MapPin, LogOut, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Footer } from '../components/Footer';

export const Account = () => {
  const { user, orders, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  if (!user) {
    return (
      <div className="min-h-screen bg-ivory pt-32 text-center px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-burgundy/10 shadow-md space-y-4">
          <h2 className="font-serif text-2xl font-bold text-burgundy">Please Sign In</h2>
          <p className="text-xs text-charcoal/60">You need to be signed in to view your account & orders.</p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-burgundy text-ivory text-xs font-bold uppercase rounded-xl"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-ivory pt-28 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Banner */}
        <div className="bg-burgundy-deep text-ivory p-8 rounded-3xl border border-gold/40 shadow-burgundy mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gold shadow-gold shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest bg-burgundy/80 px-2.5 py-0.5 rounded-full border border-gold/30">
                  ROYAL PATRON
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-ivory mt-1">{user.name}</h1>
              <p className="text-xs text-ivory/70 font-sans">{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-5 py-2.5 bg-burgundy/60 hover:bg-gold hover:text-charcoal text-gold text-xs uppercase font-bold rounded-xl border border-gold/40 transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Account Sidebar Navigation */}
          <div className="space-y-2">
            {[
              { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
              { id: 'address', label: 'Saved Address', icon: MapPin },
              { id: 'admin', label: '⚡ Admin Portal Demo', icon: Sparkles }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'admin') navigate('/admin');
                  else setActiveTab(tab.id);
                }}
                className={`w-full text-left p-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                  activeTab === tab.id
                    ? 'bg-burgundy text-gold shadow-burgundy'
                    : 'bg-white text-charcoal/80 hover:bg-burgundy/5 border border-burgundy/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="w-4 h-4 text-gold" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px]">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-burgundy">ORDER HISTORY</h2>
                {orders.length === 0 ? (
                  <div className="p-8 bg-white rounded-2xl text-center border border-burgundy/10">
                    <p className="font-serif text-lg font-bold text-burgundy">No orders placed yet.</p>
                    <Link to="/shop" className="text-xs text-gold font-bold underline mt-2 block">
                      Explore Creations
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-2xl border border-burgundy/10 shadow-sm space-y-4">
                      <div className="flex flex-wrap justify-between items-center pb-3 border-b border-burgundy/10 gap-2">
                        <div>
                          <span className="font-serif font-bold text-base text-burgundy">{order.id}</span>
                          <span className="text-xs text-charcoal/50 block font-sans">Placed on {order.date}</span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs">
                            <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg border border-gold/20" />
                            <div className="flex-1">
                              <h4 className="font-serif font-bold text-charcoal">{item.name}</h4>
                              <p className="text-[10px] text-charcoal/60">Qty: {item.quantity}</p>
                            </div>
                            <span className="font-serif font-bold text-burgundy">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-burgundy/10 flex justify-between items-center text-xs font-bold">
                        <span>Total Paid:</span>
                        <span className="font-serif text-base text-burgundy">₹{order.total?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'address' && (
              <div className="bg-white p-8 rounded-2xl border border-burgundy/10 space-y-4">
                <h2 className="font-serif text-2xl font-bold text-burgundy">DEFAULT SHIPPING ADDRESS</h2>
                <div className="p-4 rounded-xl bg-ivory-soft border border-burgundy/20 text-xs space-y-1 font-sans">
                  <p className="font-bold text-burgundy text-sm">{user.address?.fullName}</p>
                  <p>{user.address?.flat}</p>
                  <p>{user.address?.street}</p>
                  <p>{user.address?.city}, {user.address?.state} - {user.address?.pincode}</p>
                  <p className="pt-2 text-charcoal/60 font-semibold">Phone: {user.address?.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};
