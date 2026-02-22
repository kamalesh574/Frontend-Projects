/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, User, Heart, LayoutDashboard, ClipboardList } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuthPage = location.pathname === '/auth';
  const isLandingPage = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <Heart className="text-white w-6 h-6" fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">
              Food<span className="text-emerald-600">Bridge</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {state.isAuthenticated ? (
              <>
                <Link
                  to={state.user?.role === 'RESTAURANT' ? '/restaurant' : '/ngo'}
                  className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                {state.user?.role === 'NGO' && (
                  <Link
                    to="/requests"
                    className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>My Requests</span>
                  </Link>
                )}
                <div className="h-6 w-px bg-gray-200" />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{state.user?.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-rose-500 hover:bg-rose-50">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              !isAuthPage && (
                <Link to="/auth">
                  <Button size="sm">Get Started</Button>
                </Link>
              )
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
