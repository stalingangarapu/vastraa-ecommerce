import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, CreditCard, Smartphone, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Checkout = () => {
  const { cart, subtotal, discountAmount, deliveryFee, grandTotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Address Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Maharani Gayatri',
    phone: user?.phone || '+91 98765 43210',
    flat: user?.address?.flat || 'Suite 401, Royal Silk Tower',
    street: user?.address?.street || 'MG Road, Jubilee Hills',
    city: user?.address?.city || 'Hyderabad',
    state: user?.address?.state || 'Telangana',
    pincode: user?.address?.pincode || '500033'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('gayatri@upi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      addToast('Your cart is empty!', 'error');
      return;
    }

    setIsProcessing(true);
    addToast('Simulating secure royal payment...', 'info');

    setTimeout(() => {
      const order = addOrder({
        total: grandTotal,
        items: [...cart],
        shippingAddress: formData,
        paymentMethod
      });

      clearCart();
      setIsProcessing(false);
      navigate('/order-success', { state: { order } });
    }, 1800);
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-ivory pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-burgundy/10 shadow-md">
          <h2 className="font-serif text-2xl font-bold text-burgundy mb-2">No items in checkout</h2>
          <p className="text-xs text-charcoal/60 mb-6">Please add items to your cart before checking out.</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-burgundy text-ivory text-xs font-bold uppercase rounded-xl"
          >
            Go to Shop
          </button>
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
        {/* Step Indicator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-burgundy/10 -z-0" />
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Confirmation' }
            ].map((s) => (
              <div
                key={s.num}
                className={`relative z-10 flex flex-col items-center gap-1.5 ${
                  step >= s.num ? 'text-burgundy' : 'text-charcoal/40'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center border-2 transition-all ${
                    step >= s.num
                      ? 'bg-burgundy text-gold border-gold shadow-gold'
                      : 'bg-white text-charcoal/40 border-burgundy/20'
                  }`}
                >
                  {s.num}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-burgundy/10 shadow-sm space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-burgundy/10">
                  <h2 className="font-serif text-2xl font-bold text-burgundy flex items-center gap-2">
                    <Truck className="w-5 h-5 text-gold" /> Shipping Address
                  </h2>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> SSL Encrypted
                  </span>
                </div>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs uppercase font-bold text-charcoal tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-charcoal tracking-wider">Mobile Phone</label>
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-charcoal tracking-wider">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs font-sans"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs uppercase font-bold text-charcoal tracking-wider">House / Flat / Suite</label>
                    <input
                      type="text"
                      name="flat"
                      required
                      value={formData.flat}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs font-sans"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs uppercase font-bold text-charcoal tracking-wider">Street Address / Locality</label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-charcoal tracking-wider">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-charcoal tracking-wider">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ivory-soft border border-burgundy/20 rounded-xl outline-none focus:border-burgundy text-xs font-sans"
                    />
                  </div>
                </form>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-burgundy text-ivory text-xs uppercase tracking-widest font-bold rounded-xl shadow-burgundy hover:bg-burgundy-dark flex items-center justify-center gap-2"
                >
                  PROCEED TO PAYMENT <ArrowRight className="w-4 h-4 text-gold" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-burgundy/10 shadow-sm space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-burgundy/10">
                  <h2 className="font-serif text-2xl font-bold text-burgundy flex items-center gap-2">
                    <Lock className="w-5 h-5 text-gold" /> Select Payment Method
                  </h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-burgundy font-bold underline"
                  >
                    Edit Shipping Address
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'upi', name: 'Instant UPI (GPay / PhonePe / Paytm)', icon: Smartphone },
                    { id: 'card', name: 'Credit / Debit Card (Visa, Mastercard, Amex)', icon: CreditCard },
                    { id: 'cod', name: 'Cash on Delivery (COD)', icon: Truck }
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                        paymentMethod === method.id
                          ? 'border-gold bg-burgundy/5 text-burgundy shadow-sm'
                          : 'border-burgundy/10 bg-ivory-soft text-charcoal'
                      }`}
                    >
                      <method.icon className="w-5 h-5 text-gold shrink-0" />
                      <span className="text-xs font-bold font-sans flex-1">{method.name}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id ? 'border-burgundy bg-burgundy text-gold' : 'border-charcoal/30'
                        }`}
                      >
                        {paymentMethod === method.id && <CheckCircle2 className="w-4 h-4 fill-burgundy text-gold" />}
                      </div>
                    </div>
                  ))}
                </div>

                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-ivory-soft rounded-xl border border-burgundy/10 space-y-2">
                    <label className="text-xs uppercase font-bold text-charcoal tracking-wider">VPA / UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-burgundy/20 rounded-lg text-xs outline-none focus:border-burgundy"
                    />
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gold-gradient text-charcoal text-xs uppercase tracking-widest font-bold rounded-xl shadow-gold hover:brightness-110 flex items-center justify-center gap-2 transition-all"
                >
                  {isProcessing ? 'PROCESSING ROYAL PAYMENT...' : `PLACE ORDER (₹${grandTotal.toLocaleString('en-IN')})`}
                </button>
              </motion.div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="bg-white rounded-2xl p-6 border border-burgundy/10 shadow-sm h-fit space-y-6">
            <h3 className="font-serif text-xl font-bold text-burgundy pb-3 border-b border-burgundy/10">
              Order Summary ({cart.length} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} className="flex gap-3 text-xs">
                  <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg border border-gold/20" />
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-charcoal line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-charcoal/60">Qty: {item.quantity} • Size: {item.selectedSize}</p>
                    <span className="font-bold text-burgundy font-serif">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-4 border-t border-burgundy/10 text-charcoal/80">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo Discount:</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-burgundy pt-2 border-t border-burgundy/10">
                <span>Grand Total:</span>
                <span className="text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
