import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { AdminDashboard } from '../pages/AdminDashboard';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
    </div>
  );
}; 