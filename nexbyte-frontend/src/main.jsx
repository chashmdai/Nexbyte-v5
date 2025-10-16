import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx'; // 1. Importa el Provider

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* 2. Envuelve la aplicación */}
      <App />
    </CartProvider>
  </React.StrictMode>,
);