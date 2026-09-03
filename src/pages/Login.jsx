import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Footer } from '../components/Footer';

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      register(name, email, phone);
    } else {
      login(email, password);
    }
    navigate('/account');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-ivory pt-28 pb-20 flex flex-col justify-between"
    >
      <div className="max-w-md mx-auto px-4 w-full my-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gold/30 shadow-burgundy space-y-6 relative overflow-hidden">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center text-gold mx-auto border border-gold">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
              ROYAL PATRON PORTAL
            </span>
            <h1 className="font-serif text-3xl font-bold text-burgundy">
              {isRegister ? 'JOIN VASTRAA' : 'WELCOME BACK'}
            </h1>
            <p className="text-xs text-charcoal/60">
              {isRegister
                ? 'Create your patron account for exclusive perks'
                : 'Sign in to access your saved drapes and order history'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-charcoal tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Maharani Gayatri"
                      className="w-full pl-10 pr-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-charcoal tracking-wider">Mobile Phone</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold text-charcoal tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@vastraa.com"
                  className="w-full pl-10 pr-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase font-bold text-charcoal tracking-wider">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-burgundy text-ivory text-xs uppercase tracking-widest font-bold rounded-xl shadow-burgundy hover:bg-burgundy-dark flex items-center justify-center gap-2 transition-all mt-4"
            >
              {isRegister ? 'CREATE PATRON ACCOUNT' : 'SIGN IN'}
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </form>

          {/* Toggle Register/Login */}
          <div className="text-center pt-2 border-t border-burgundy/10">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-semibold text-burgundy hover:underline"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register Now"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};
