/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ListingsProvider } from './context/ListingsContext';
import { Layout } from './components/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import RestaurantDashboard from './pages/RestaurantDashboard';
import NGODashboard from './pages/NGODashboard';
import RequestsPage from './pages/RequestsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'RESTAURANT' | 'NGO' }> = ({ children, role }) => {
  const { state } = useAuth();

  if (state.loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!state.isAuthenticated) return <Navigate to="/auth" />;
  if (role && state.user?.role !== role) return <Navigate to="/" />;

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <ListingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="auth" element={<AuthPage />} />
              
              <Route
                path="restaurant"
                element={
                  <ProtectedRoute role="RESTAURANT">
                    <RestaurantDashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="ngo"
                element={
                  <ProtectedRoute role="NGO">
                    <NGODashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="requests"
                element={
                  <ProtectedRoute role="NGO">
                    <RequestsPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ListingsProvider>
    </AuthProvider>
  );
}
