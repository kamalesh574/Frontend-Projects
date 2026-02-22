/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const AuthContext = createContext<{
  state: AuthState;
  login: (role: UserRole, name: string) => void;
  logout: () => void;
} | null>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('food_bridge_user');
    if (savedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = (role: UserRole, name: string) => {
    const user: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email: `${name.toLowerCase().replace(/\s/g, '')}@example.com`,
      role,
      location: 'T Nagar, Chennai',
    };
    localStorage.setItem('food_bridge_user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('food_bridge_user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
