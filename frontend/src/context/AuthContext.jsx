import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'USR-8821',
  name: 'Alex Morgan',
  email: 'alex.morgan@healthmail.com',
  phone: '+1 (555) 234-8765',
  dob: '1992-05-14',
  gender: 'Female',
  bloodGroup: 'O+',
  height: '168 cm',
  weight: '64 kg',
  bmi: '22.7',
  allergies: ['Penicillin', 'Peanuts'],
  conditions: ['Mild Seasonal Asthma'],
  emergencyContact: {
    name: 'David Morgan',
    relationship: 'Spouse',
    phone: '+1 (555) 987-6543'
  },
  settings: {
    emailNotifications: true,
    smsAlerts: true,
    criticalOnly: false,
    aiDetailLevel: 'Standard',
    showMedicalTerms: true,
    twoFactorAuth: true
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('medilens_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('medilens_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('medilens_user', JSON.stringify(user));
  }, [user]);

  const login = async (email, password) => {
    // In-memory / client authentication
    const updatedUser = { ...user, email: email || user.email };
    setUser(updatedUser);
    setIsAuthenticated(true);
    localStorage.setItem('medilens_auth', 'true');
    return { success: true, user: updatedUser };
  };

  const register = async (userData) => {
    const newUser = {
      ...DEFAULT_USER,
      ...userData,
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('medilens_auth', 'true');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('medilens_auth');
  };

  const updateProfile = (profileData) => {
    setUser((prev) => ({
      ...prev,
      ...profileData,
    }));
    return { success: true };
  };

  const updateSettings = (newSettings) => {
    setUser((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile,
      updateSettings
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
