import { useState, useEffect } from 'react';

// Esta función lee el localStorage de forma segura
function getAuthData() {
  try {
    const token = localStorage.getItem('nexbyte_token');
    const userString = localStorage.getItem('nexbyte_user');
    
    // Si no tenemos ambos, no estamos autenticados como admin
    if (!token || !userString) {
      return { token: null, user: null, role: null, isAuth: false };
    }
    
    const user = JSON.parse(userString);
    
    return { 
      token, 
      user, 
      role: user?.role, // Acceso fácil al rol
      isAuth: true     // Sabemos que está logueado
    };
  } catch (error) {
    console.error("Error al parsear datos de auth:", error);
    // Si hay un error (ej. JSON malformado), limpiamos todo por seguridad
    localStorage.removeItem('nexbyte_token');
    localStorage.removeItem('nexbyte_user');
    return { token: null, user: null, role: null, isAuth: false };
  }
}

/**
 * Hook reutilizable para obtener el estado de autenticación
 * y reaccionar a cambios (como login/logout).
 */
export function useAuth() {
  const [auth, setAuth] = useState(getAuthData());

  useEffect(() => {
    // Escuchamos el evento 'auth-change' que disparamos en Login y Logout
    const handleAuthChange = () => {
      setAuth(getAuthData());
    };

    window.addEventListener('auth-change', handleAuthChange);
    
    // Limpiamos el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []); // El array vacío asegura que esto solo se ejecute al montar/desmontar

  return auth;
}