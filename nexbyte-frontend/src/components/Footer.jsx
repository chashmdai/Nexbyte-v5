import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <Container>
        <div className="cols">
          <div>
            <strong>Nexbyte</strong><br />
            <small>Tecnología y mantención de PC.</small>
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
            <h4>Newsletter</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <input className="input" placeholder="Tu email" />
              <button className="btn btn-primary mt-2">Suscribirse</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nexbyte — Todos los derechos reservados</span>
          <div className="socials">
            {/* Agrega tus links de redes sociales aquí */}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;