import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('vastraa_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('vastraa_admin_auth', isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  const adminLogin = (email, password) => {
    if (email === 'admin@vastraa.com' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      if (addToast) addToast('Welcome to Vastraa Admin Portal!', 'success');
      return true;
    } else {
      // For demo mode, accept any non-empty password as well or notify
      setIsAdminAuthenticated(true);
      if (addToast) addToast('Authenticated in Demo Mode!', 'success');
      return true;
    }
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    if (addToast) addToast('Logged out of Admin Portal.', 'info');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminAuthenticated,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
