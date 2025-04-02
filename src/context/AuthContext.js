import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// Fake user data for the mock backend
const DEFAULT_USER = {
  id: '1',
  username: 'testuser',
  email: 'siju@gmail.com',
  role: 'user'
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Simulating a server response with fake user data
        setUser(DEFAULT_USER);
      }
    } catch (err) {
      console.log('Auth check error:', err);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      // Simulate login - always returns success
      console.log('Login attempt with:', { email, password });
      
      // For demo purposes, we accept any login
      // In a real app, this would validate credentials
      
      // Create a fake token
      const token = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('token', token);
      
      // Set the user with demo data
      setUser(DEFAULT_USER);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      setError(null);
      console.log('Registration attempt with:', { username, email, password });
      
      // Simulate a successful registration
      // In a real app, this would create a new user

      // Create a fake token
      const token = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('token', token);
      
      // Set the user with custom data merged with default
      setUser({
        ...DEFAULT_USER,
        username,
        email
      });
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const recordVisit = async (visitData) => {
    try {
      console.log('Recording visit:', visitData);
      
      // Create a fake visit record
      const visit = {
        id: Math.random().toString(36).substring(2),
        userId: user?.id,
        ...visitData,
        date: new Date().toISOString()
      };
      
      // Update local user data with new visit
      const updatedUser = { ...user };
      updatedUser.visits = [...(updatedUser.visits || []), visit];
      setUser(updatedUser);

      return visit;
    } catch (error) {
      console.error('Error recording visit:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      recordVisit
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