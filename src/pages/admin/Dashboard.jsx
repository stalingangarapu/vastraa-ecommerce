import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, ShoppingBag, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';

export const Dashboard = () => {
  const { orders } = useAuth();
  const { products } = useProducts();
  const [timeRange, setTimeRange] = useState('7d');

  const liveOrderRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalRevenue = 248650 + liveOrderRevenue;
  const totalOrdersCount = 128 + orders.length;

  const statCards = [
    {
      title: 'TOTAL REVENUE',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      change: '+18.4%',
      desc: 'vs. previous period',
      icon: IndianRupee,
      color: 'text-amber-400'
    },
    {
      title: 'ORDERS',
      value: totalOrdersCount,
      change: '+12.1%',
      desc: 'vs. previous period',
      icon: ShoppingCart,
      color: 'text-blue-400'
    },
    {
      title: 'PRODUCTS',
      value: products.length,
      change: '+4 new',
      desc: 'active catalog items',
      icon: ShoppingBag,
      color: 'text-emerald-400'
    },
    {
      title: 'CUSTOMERS',
      value: 86,
      change: '+24.6%',
      desc: 'vs. previous period',
      icon: Users,
      color: 'text-purple-400'
    }
  ];

  const salesData7d = [
    { day: 'Mon', sales: 28000 },
    { day: 'Tue', sales: 34000 },
    { day: 'Wed', sales: 42000 },
    { day: 'Thu', sales: 31000 },
    { day: 'Fri', sales: 48000 },
    { day: 'Sat', sales: 55000 },
    { day: 'Sun', sales: 62000 }
  ];

  const salesData30d = [
    { day: 'W1', sales: 180000 },
    { day: 'W2', sales: 210000 },
    { day: 'W3', sales: 240000 },
    { day: 'W4', sales: 280000 }
  ];

  const chartData = timeRange === '7d' ? salesData7d : salesData30d;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-md hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-slate-100">{card.value}</div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> {card.change}
              </span>
              <span className="text-slate-400">{card.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-100">Sales Overview</h3>
            <p className="text-sm text-slate-400">Revenue performance over time</p>
          </div>

          <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
            {[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: '3m', label: '3 Months' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeRange(t.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  timeRange === t.id ? 'bg-burgundy text-gold shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-3 px-4 border-b border-slate-800">
          {chartData.map((bar) => {
            const maxVal = 70000;
            const heightPct = Math.min(100, (bar.sales / maxVal) * 100);
            return (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-slate-800 text-gold text-xs font-bold px-2.5 py-1 rounded transition-opacity shadow-md">
                  ₹{bar.sales.toLocaleString('en-IN')}
                </div>
                <div
                  className="w-full bg-gold-gradient rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-sm font-bold text-slate-300">{bar.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-md">
        <h3 className="font-serif text-2xl font-bold text-slate-100">Recent Store Orders</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-gold uppercase tracking-wider text-xs">
              <tr>
                <th className="py-4 px-4">Order ID</th>
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Product</th>
                <th className="py-4 px-4">Amount</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-4 font-bold font-serif text-gold text-base">{ord.id}</td>
                  <td className="py-4 px-4 font-semibold text-slate-100">{ord.shippingAddress?.fullName || 'Patron Customer'}</td>
                  <td className="py-4 px-4 text-slate-300">{ord.items?.[0]?.name || 'Luxury Fashion Item'}</td>
                  <td className="py-4 px-4 font-serif font-bold text-slate-100 text-base">₹{ord.total?.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : ord.status === 'Shipped'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {ord.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{ord.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
