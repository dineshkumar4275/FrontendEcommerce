// contexts/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
        router.push('/');
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, error: data.message };
      }
    } catch (error) {
      toast.error('Login failed');
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        toast.success('Account created successfully!');
        router.push('/');
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, error: data.message };
      }
    } catch (error) {
      toast.error('Registration failed');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/');
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);