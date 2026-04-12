import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import AdminProducts from './admin/AdminProducts';
import AdminCatalog from './admin/AdminCatalog';
import AdminContent from './admin/AdminContent';
import AdminLegal from './admin/AdminLegal';
import AdminSettings from './admin/AdminSettings';

const Admin: React.FC = () => {
  const [authed, setAuthed] = useState(false);

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout onLogout={() => setAuthed(false)} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="catalog" element={<AdminCatalog />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="legal" element={<AdminLegal />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default Admin;
