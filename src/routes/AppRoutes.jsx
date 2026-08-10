import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { PropFirms } from '../pages/PropFirms';
import { CompanyDetails } from '../pages/CompanyDetails';
import { Giveaways } from '../pages/Giveaways';
import { Contact } from '../pages/Contact';
import { Login } from '../pages/admin/Login';
import { Dashboard } from '../pages/admin/Dashboard';
import { Companies } from '../pages/admin/Companies';
import { Giveaways as AdminGiveaways } from '../pages/admin/Giveaways';
import { ProtectedRoute } from '../components/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/prop-firms" element={<PropFirms />} />
      <Route path="/prop-firms/:slug" element={<CompanyDetails />} />
      <Route path="/giveaways" element={<Giveaways />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin Auth */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Dashboard Protected Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/companies" 
        element={
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/giveaways" 
        element={
          <ProtectedRoute>
            <AdminGiveaways />
          </ProtectedRoute>
        } 
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
