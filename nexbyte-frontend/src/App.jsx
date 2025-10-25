import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ToastProvider from './components/ToastProvider';

// --- Layouts y Seguridad (Los nuevos componentes) ---
import PublicLayout from './components/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';

// --- Páginas Públicas (Tus páginas existentes) ---
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import NosotrosPage from './pages/NosotrosPage';
import SoportePage from './pages/SoportePage';
import GarantiasPage from './pages/GarantiasPage';
import AyudaPage from './pages/AyudaPage';

// --- Páginas de Admin (Reusadas y Nuevas) ---
import ProductFormPage from './pages/ProductFormPage';
import AdminProductListPage from './pages/admin/AdminProductListPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import AdminUserFormPage from './pages/admin/AdminUserFormPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminContactoPage from './pages/admin/AdminContactoPage';
import AdminSoportePage from './pages/admin/AdminSoportePage'; // <-- 1. AÑADIR ESTE IMPORT


function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* === 1. RUTAS PÚBLICAS === */}
          {/* Todas las rutas públicas ahora viven dentro de PublicLayout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="productos" element={<ProductListPage />} />
            <Route path="productos/detalle/:id" element={<ProductDetailPage />} />
            <Route path="carrito" element={<CartPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="nosotros" element={<NosotrosPage />} />
            <Route path="blogs" element={<BlogListPage />} />
            <Route path="blog/:id" element={<BlogDetailPage />} />
            <Route path="soporte" element={<SoportePage />} />
            <Route path="garantias" element={<GarantiasPage />} />
            <Route path="ayuda" element={<AyudaPage />} />
            <Route path="registro" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>

          {/* === 2. RUTAS DE ADMINISTRADOR === */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />

            {/* PASO 3: Gestión de Productos (Completado) */}
            <Route path="productos" element={<AdminProductListPage />} />
            <Route path="productos/nuevo" element={<ProductFormPage />} />
            <Route path="productos/editar/:id" element={<ProductFormPage />} />

            {/* PASO 4: Gestión de Usuarios (Completado) */}
            <Route path="usuarios" element={<AdminUserListPage />} />
            <Route path="usuarios/nuevo" element={<AdminUserFormPage />} />
            <Route path="usuarios/editar/:id" element={<AdminUserFormPage />} />

            {/* Módulos extra */}
            <Route path="contacto" element={<AdminContactoPage />} />
            <Route path="soporte" element={<AdminSoportePage />} /> {/* <-- 2. AÑADIR ESTA RUTA */}

          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;