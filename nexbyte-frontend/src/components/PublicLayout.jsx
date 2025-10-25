import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Tu Header existente
import Footer from './Footer'; // Tu Footer existente

/**
 * Este layout envuelve todas las páginas PÚBLICAS de la tienda.
 * Muestra el Header y Footer estándar.
 */
function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        {/* El Outlet renderizará las páginas públicas (Home, Tienda, Login, etc.) */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;