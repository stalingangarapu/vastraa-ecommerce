import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminLogin = () => {
  const [email, setEmail] = useState('admin@vastraa.com');
  const [password, setPassword] = useState('admin123');
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin(email, password);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-12 px-4">
      <div className="max-w-md w-full mx-auto my-auto space-y-8">
        
        {/* Logo Banner */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-burgundy flex items-center justify-center text-gold border border-gold/50 shadow-gold group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-serif text-3xl font-bold tracking-widest text-gold-gradient">
              VASTRAA
            </span>
          </Link>
          <span className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold block">
            EXECUTIVE ADMIN PORTAL
          </span>
        </div>

        {/* Login Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6"
        >
          <div className="text-center space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-100">Portal Authentication</h2>
            <p className="text-xs text-slate-400">Sign in to manage store catalog, fulfillment, & patrons.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="uppercase font-bold text-slate-300 tracking-wider">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl outline-none focus:border-gold text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="uppercase font-bold text-slate-300 tracking-wider">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl outline-none focus:border-gold text-slate-100"
                />
              </div>
            </div>

            {/* Demo Helper Callout */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-0.5 font-mono">
              <p className="text-gold font-bold uppercase text-[10px]">Demo Login Credentials:</p>
              <p>Email: admin@vastraa.com</p>
              <p>Password: admin123</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gold-gradient text-slate-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-gold hover:brightness-110 flex items-center justify-center gap-2 transition-all mt-2"
            >
              LOGIN TO DASHBOARD <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

        {/* Back Link */}
        <div className="text-center">
          <Link to="/" className="text-xs font-bold text-slate-400 hover:text-gold transition-colors uppercase tracking-widest">
            ← Return to Customer Website
          </Link>
        </div>
      </div>
    </div>
  );
};
