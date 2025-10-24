// src/components/Header.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { logoutUser } from '../services/apiService';

function Header() {
  const { cartItems } = useCart();
  const cartItemCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.qty, 0), [cartItems]);

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('nexbyte_token'));

  const location = useLocation();
  const navigate = useNavigate();

  const menuBtnRef = useRef(null);
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);
  const cartCountRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    if (open) {
      lastActiveRef.current = document.activeElement;
      setTimeout(() => firstLinkRef.current?.focus(), 0);
    } else {
      menuBtnRef.current?.focus();
    }
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  useEffect(() => {
    const update = () => setIsLoggedIn(!!localStorage.getItem('nexbyte_token'));
    update();
    window.addEventListener('auth-change', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('auth-change', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('nexbyte_token'));
  }, [location.pathname]);

  useEffect(() => {
    if (!cartCountRef.current) return;
    cartCountRef.current.classList.remove('pop');
    void cartCountRef.current.offsetWidth;
    cartCountRef.current.classList.add('pop');
  }, [cartItemCount]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) setOpen(false);
      if (e.key === 'Tab' && open && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);
  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  const handleLogout = async () => {
    try {
      if (typeof logoutUser === 'function') await logoutUser();
    // eslint-disable-next-line no-unused-vars
    } catch (_) { /* empty */ }
    finally {
      localStorage.removeItem('nexbyte_token');
      window.dispatchEvent(new Event('auth-change'));
      setIsLoggedIn(false);
      navigate('/login');
      setOpen(false);
    }
  };

  return (
    <header className="nb">
      <div className="container nb-bar">
        <Link to="/" className="nb-brand" aria-label="Inicio">
          Nexbyte<span className="dot">.</span>
        </Link>

        <nav className="nb-nav" aria-label="Principal">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/productos" className={linkClass}>Productos</NavLink>
        </nav>

        <div className="nb-cta">
          {isLoggedIn ? (
            <button className="btn btn-ghost" onClick={handleLogout}>Cerrar sesión</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Iniciar sesión</Link>
              <Link to="/registro" className="btn btn-primary">Registrar</Link>
            </>
          )}

          <Link to="/carrito" className="btn btn-ghost nb-cart" aria-label={`Carrito, ${cartItemCount} ítems`}>
            Carrito <span id="cart-count" ref={cartCountRef} className="nb-pill">{cartItemCount}</span>
          </Link>

          <button
            ref={menuBtnRef}
            className="nb-menu"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="nb-mobile-panel"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      <nav
        id="nb-mobile-panel"
        ref={panelRef}
        className={`nb-panel ${open ? 'show' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
          <li>
            <NavLink to="/" className={linkClass} end onClick={closeMenu} ref={firstLinkRef}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" className={linkClass} onClick={closeMenu}>
              Productos
            </NavLink>
          </li>
        </ul>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
          {isLoggedIn ? (
            <button className="btn btn-ghost" onClick={handleLogout}>Cerrar sesión</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost" onClick={closeMenu}>Iniciar sesión</Link>
              <Link to="/registro" className="btn btn-primary" onClick={closeMenu}>Registrar</Link>
            </>
          )}
        </div>

        <button className="nb-close" aria-label="Cerrar menú" onClick={closeMenu}>✕</button>
      </nav>
    </header>
  );
}

export default Header;
