import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Este componente es el "guardia de seguridad" del panel de admin.
 * AHORA SÍ ACEPTA 'children' (hijos).
 */
function ProtectedRoute({ children }) { // <-- 1. Aceptamos 'children'
  const { isAuth, role } = useAuth();

  // 1. Verificamos si está logueado Y si su rol es ADMIN
  const esAdminAutenticado = isAuth && role === 'ADMIN';

  if (esAdminAutenticado) {
    // 2. Si es admin, renderiza el componente 'children' (el AdminLayout)
    return children; // <-- 2. Renderizamos 'children', NO <Outlet />
  }

  // 3. Si no, lo redirige a la página de login
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;