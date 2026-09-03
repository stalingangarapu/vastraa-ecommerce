import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const MOCK_USER = {
  name: 'Maharani Gayatri',
  email: 'gayatri@vastraa.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  address: {
    fullName: 'Maharani Gayatri',
    phone: '+91 98765 43210',
    flat: 'Suite 401, Royal Silk Tower',
    street: 'MG Road, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vastraa_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('vastraa_orders');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'VAS20260001',
              date: '2026-08-25',
              total: 24999,
              status: 'Delivered',
              items: [
                {
                  name: 'Midnight Wine Designer Lehenga',
                  price: 24999,
                  quantity: 1,
                  image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000'
                }
              ]
            }
          ];
    } catch {
      return [];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('vastraa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vastraa_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vastraa_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (email, password) => {
    // Simulated instant success
    const newUser = {
      ...MOCK_USER,
      email: email || MOCK_USER.email
    };
    setUser(newUser);
    addToast(`Welcome back, ${newUser.name}!`, 'success');
    return true;
  };

  const register = (name, email, phone) => {
    const newUser = {
      ...MOCK_USER,
      name: name || 'Valued Patron',
      email: email || 'patron@vastraa.com',
      phone: phone || '+91 99000 11223'
    };
    setUser(newUser);
    addToast('Account created successfully! Welcome to VASTRAA.', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out safely.', 'info');
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `VAS${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString().split('T')[0],
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        login,
        register,
        logout,
        addOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
