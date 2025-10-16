import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'; // Ayuda a que los links de Bootstrap funcionen con React Router
import { Navbar, Nav, Container } from 'react-bootstrap'; // Importamos los componentes de Bootstrap

function AppNavbar() { // Cambié el nombre a AppNavbar para evitar conflictos
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Nexbyte</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productos">
              <Nav.Link>Productos</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;