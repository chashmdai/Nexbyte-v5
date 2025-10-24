// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-cols">
          <div className="brand">
            <Link to="/" className="nb-brand" aria-label="Ir al inicio">
              <strong>Nexbyte<span className="dot">.</span></strong>
            </Link>
            <div className="muted">Tecnología y mantención de PC.</div>
          </div>

          <div>
            <h4>Categorías</h4>
            <div><Link to="/productos">Periféricos</Link></div>
            <div><Link to="/productos">Componentes</Link></div>
            <div><Link to="/productos">Accesorios</Link></div>
          </div>

          <div>
            <h4>Ayuda</h4>
            <div><Link to="/soporte">Soporte</Link></div>
            <div><Link to="/ayuda">Envíos y devoluciones</Link></div>
            <div><Link to="/garantias">Garantías</Link></div>
          </div>

          <div>
            <h4>Navegación</h4>
            <div><Link to="/nosotros">Nosotros</Link></div>
            <div><Link to="/blogs">Blog</Link></div>
            <div><Link to="/contacto">Contacto</Link></div>
          </div>

          <div className="newsletter">
            <h4>Newsletter</h4>
            <form onSubmit={handleSubmit}>
              <input
                className="input"
                type="email"
                placeholder="Tu email"
                aria-label="Tu email"
                autoComplete="email"
                required
              />
              <button className="btn btn-primary" type="submit">Suscribirse</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Nexbyte — Todos los derechos reservados</span>
          <div className="socials" aria-label="Redes sociales"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
