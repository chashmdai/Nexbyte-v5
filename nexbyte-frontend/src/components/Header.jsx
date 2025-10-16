import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function Header() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Navbar className="nb" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="nb-brand">Nexbyte<span className="dot" style={{color: 'var(--pri)'}}>.</span></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle className="nb-menu" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nb-nav">
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/productos"><Nav.Link>Productos</Nav.Link></LinkContainer>
            <LinkContainer to="/nosotros"><Nav.Link>Nosotros</Nav.Link></LinkContainer>
            <LinkContainer to="/blogs"><Nav.Link>Blog</Nav.Link></LinkContainer>
            <LinkContainer to="/contacto"><Nav.Link>Contacto</Nav.Link></LinkContainer>
          </Nav>
          <Nav className="nb-cta">
             <LinkContainer to="/login">
                <Nav.Link className="btn btn-ghost">Iniciar sesión</Nav.Link>
             </LinkContainer>
             <LinkContainer to="/registro">
                <Nav.Link className="btn btn-primary">Registrar</Nav.Link>
             </LinkContainer>
             <LinkContainer to="/carrito">
                {/* 👇 AQUÍ ESTÁ EL CAMBIO: Añadimos la clase 'btn-ghost' 👇 */}
                <Nav.Link className="btn btn-ghost nb-cart">
                    Carrito <Badge pill bg="primary" className="nb-pill">{cartItemCount}</Badge>
                </Nav.Link>
             </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;