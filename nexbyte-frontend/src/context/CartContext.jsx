// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'nexbyte_cart';

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe ser usado dentro de un CartProvider');
  return ctx;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Error al cargar el carrito:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error al guardar el carrito:', e);
    }
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const q = Math.max(1, parseInt(quantity, 10) || 1);
    setCartItems((prev) => prev.map((i) => (i.id === productId ? { ...i, qty: q } : i)));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const itemCount = useMemo(() => cartItems.reduce((acc, i) => acc + i.qty, 0), [cartItems]);

  const subtotal = useMemo(
    () => cartItems.reduce((acc, i) => acc + i.qty * Number(i.precio || 0), 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
