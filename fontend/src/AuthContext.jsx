import { createContext, useState, useEffect } from 'react';
import api from './services/api';

export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState({  
//     token: localStorage.getItem('token'),
//     role: localStorage.getItem('role'),
//     username: localStorage.getItem('username'),
//     userId: parseInt(localStorage.getItem('userId')), // Ensure userId is a number
//   });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ token: null, role: null, username: null, userId: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    if (token && role && username && userId) {
      const parsedUserId = parseInt(userId);
      if (isNaN(parsedUserId)) {
        console.error('Invalid userId in localStorage:', userId);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setUser({ token: null, role: null, username: null, userId: null });
      } else {
        setUser({ token, role, username, userId: parsedUserId });
      }
    } else {
      console.warn('Missing auth data in localStorage:', { token, role, username, userId });
      setUser({ token: null, role: null, username: null, userId: null });
    }
  }, []);

  const login = (token, role, userId, username) => {
    console.log('Login called with:', { token, role, userId, username });
    if (!userId || isNaN(parseInt(userId))) {
      console.error('Invalid userId provided to login:', userId);
      return;
    }
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId.toString());
    console.log('Stored in localStorage:', {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username')
    });
    setUser({ token, role, userId: parseInt(userId), username });
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      setUser({ token: null, role: null, username: null, userId: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};