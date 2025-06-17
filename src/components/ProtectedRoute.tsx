import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';

export const ProtectedRoute: React.FC = () => {
  // Simulation de vérification d'authentification
  const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <AdminLayout />;
}; 