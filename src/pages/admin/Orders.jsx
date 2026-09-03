import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Eye, MapPin, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const Orders = () => {
  const { orders } = useAuth();
  const { addToast } = useToast();

  const [ordersState, setOrdersState] = useState(() => {
    try {
      const saved = localStorage.getItem('vastraa_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return orders;
  });

  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    const updated = ordersState.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrdersState(updated);
    try {
      localStorage.setItem('vastraa_orders', JSON.stringify(updated));
    } catch (e) {}
    if (addToast) addToast(`Order ${orderId} status updated to ${newStatus}`, 'success');
  };

  const pendingCount = ordersState.filter((o) => o.status === 'Pending' || !o.status).length;
  const processingCount = ordersState.filter((o) => o.status === 'Processing').length;
  const shippedCount = ordersState.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = ordersState.filter((o) => o.status === 'Delivered').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="font-serif text-3xl font-bold text-gold-gradient">
          ORDERS MANAGEMENT
        </h1>
        <p className="text-sm text-slate-400">
          Track customer purchases, inspect order timelines, and update shipping status.
        </p>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Total Orders', count: ordersState.length, color: 'text-slate-100' },
          { label: 'Pending', count: pendingCount, color: 'text-amber-400' },
          { label: 'Processing', count: processingCount, color: 'text-blue-400' },
          { label: 'Shipped', count: shippedCount, color: 'text-purple-400' },
          { label: 'Delivered', count: deliveredCount, color: 'text-emerald-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-xs uppercase font-bold text-slate-400 block">{stat.label}</span>
            <span className={`font-serif text-3xl font-bold ${stat.color}`}>{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Order Table */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-gold uppercase tracking-wider text-xs">
              <tr>
                <th className="py-4 px-4">Order ID</th>
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Items</th>
                <th className="py-4 px-4">Amount</th>
                <th className="py-4 px-4">Payment</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {ordersState.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-4 font-bold font-serif text-gold text-base">{ord.id}</td>
                  <td className="py-4 px-4 font-semibold text-slate-100">{ord.shippingAddress?.fullName || 'Ananya Sharma'}</td>
                  <td className="py-4 px-4 text-slate-300">{ord.items?.length || 1} items</td>
                  <td className="py-4 px-4 font-serif font-bold text-slate-100 text-base">₹{ord.total?.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4 text-slate-400">{ord.paymentMethod?.toUpperCase() || 'PAID (UPI)'}</td>
                  <td className="py-4 px-4">
                    <select
                      value={ord.status || 'Pending'}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-gold outline-none cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{ord.date}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrderDetails(ord)}
                      className="p-2.5 bg-slate-900 hover:bg-slate-800 text-gold rounded-xl border border-slate-800 transition-colors"
                      title="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrderDetails && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-lg w-full bg-slate-950 text-slate-100 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase font-bold text-gold tracking-widest block">ORDER DETAILS</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-100">{selectedOrderDetails.id}</h3>
                </div>
                <button onClick={() => setSelectedOrderDetails(null)} className="text-slate-400 hover:text-gold p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Order Timeline */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">Fulfillment Timeline</span>
                <div className="flex justify-between items-center text-xs text-slate-300 bg-slate-900 p-3.5 rounded-xl border border-slate-800 font-bold">
                  {['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'].map((step, idx) => (
                    <span
                      key={step}
                      className={
                        idx <= (selectedOrderDetails.status === 'Delivered' ? 4 : selectedOrderDetails.status === 'Shipped' ? 3 : 1)
                          ? 'text-emerald-400'
                          : 'text-slate-600'
                      }
                    >
                      ✓ {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-1 bg-slate-900 p-4 rounded-xl border border-slate-800 text-sm">
                <span className="font-bold text-gold flex items-center gap-1.5 mb-1">
                  <MapPin className="w-4 h-4" /> Shipping Address
                </span>
                <p className="font-bold text-slate-100 text-base">{selectedOrderDetails.shippingAddress?.fullName || 'Patron Customer'}</p>
                <p className="text-slate-300">{selectedOrderDetails.shippingAddress?.flat}, {selectedOrderDetails.shippingAddress?.street}</p>
                <p className="text-slate-300">{selectedOrderDetails.shippingAddress?.city}, {selectedOrderDetails.shippingAddress?.state} - {selectedOrderDetails.shippingAddress?.pincode}</p>
                <p className="text-slate-400 font-semibold mt-1">Phone: {selectedOrderDetails.shippingAddress?.phone}</p>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">Purchased Products</span>
                {selectedOrderDetails.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-sm">
                    <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg border border-slate-800" />
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-slate-100 text-base">{item.name}</h4>
                      <p className="text-xs text-slate-400">Qty: {item.quantity} • Size: {item.selectedSize || 'Free Size'}</p>
                    </div>
                    <span className="font-serif font-bold text-gold text-base">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Amount Breakdown */}
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                <span className="text-slate-300">Total Amount:</span>
                <span className="font-serif text-2xl font-bold text-gold-gradient">₹{selectedOrderDetails.total?.toLocaleString('en-IN')}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
