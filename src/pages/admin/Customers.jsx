import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Crown } from 'lucide-react';
import { INITIAL_ADMIN_CUSTOMERS } from '../../data/adminMockData';

export const Customers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="font-serif text-3xl font-bold text-gold-gradient">
          ROYAL PATRON DIRECTORY
        </h1>
        <p className="text-xs text-ivory/70">
          Customer database, order totals, and loyalty tier status.
        </p>
      </div>

      <div className="glass-card-dark p-6 rounded-2xl border border-gold/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gold/20 text-gold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Patron ID</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Tier Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10 text-ivory/90">
              {INITIAL_ADMIN_CUSTOMERS.map((cust) => (
                <tr key={cust.id} className="hover:bg-gold/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold font-serif text-gold">{cust.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-ivory">{cust.name}</td>
                  <td className="py-3.5 px-4 text-ivory/70">{cust.email}</td>
                  <td className="py-3.5 px-4 text-ivory/70">{cust.phone}</td>
                  <td className="py-3.5 px-4 font-bold">{cust.ordersCount} orders</td>
                  <td className="py-3.5 px-4 font-serif font-bold text-gold">₹{cust.totalSpent.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-fit ${
                        cust.status === 'VIP Member'
                          ? 'bg-amber-900/60 text-gold border border-gold/50'
                          : 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {cust.status === 'VIP Member' && <Crown className="w-3 h-3 fill-gold text-burgundy" />}
                      {cust.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
