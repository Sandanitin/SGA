import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem('opf_admin_token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
