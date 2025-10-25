import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminLayout.css'; 

function AdminLayout() {
  return (
    <Container fluid className="admin-layout-container">
      <Row className="vh-100">
        
        {/* --- 1. BARRA LATERAL (SIDEBAR) --- */}
        <Col md={3} lg={2} className="admin-sidebar bg-light">
          <h5 className="my-3 text-center">Nexbyte Admin</h5>
          <hr />
          <Nav variant="pills" className="flex-column">
            <Nav.Link as={NavLink} to="/admin" end>
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/usuarios">
              Usuarios
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/contacto">
              Contacto
            </Nav.Link>
            {/* --- ENLACE DE SOPORTE YA AÑADIDO --- */}
            <Nav.Link as={NavLink} to="/admin/soporte">
              Soporte
            </Nav.Link>
            {/* ------------------------------- */}
          </Nav>

          <hr />
          {/* Enlace para volver a la tienda pública */}
          <Nav.Link as={NavLink} to="/productos" className="mt-auto">
            &larr; Volver a la Tienda
          </Nav.Link>
        </Col>

        {/* --- 2. CONTENIDO PRINCIPAL --- */}
        <Col md={9} lg={10} className="admin-main-content">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLayout;