import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductFormPage from './pages/ProductFormPage';
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

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Rutas Principales */}
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductListPage />} />
          <Route path="/productos/detalle/:id" element={<ProductDetailPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />

          {/* Rutas de Blog */}
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />

          {/* Rutas de Ayuda/Soporte */}
          <Route path="/soporte" element={<SoportePage />} />
          <Route path="/garantias" element={<GarantiasPage />} />
          <Route path="/ayuda" element={<AyudaPage />} />

          {/* Rutas de Autenticación */}
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas de Admin */}
          <Route path="/productos/nuevo" element={<ProductFormPage />} />
          <Route path="/productos/editar/:id" element={<ProductFormPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;