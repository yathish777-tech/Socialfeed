import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Rehydrate user from localStorage on initial load
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('socialUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save user to state + localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('socialUser', JSON.stringify(userData));
  };

  // Clear user from state + localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('socialUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy consumption
export const useAuth = () => useContext(AuthContext);
