import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AyudaPage() {
  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Ayuda</span>
      </nav>
      <Card as="section" className="reveal in" style={{ padding: 'var(--g4)' }}>
        <h1 style={{ margin: '0 0 .5rem 0' }}>Centro de ayuda</h1>
        <p className="meta" style={{ margin: '0 0 1rem 0' }}>Preguntas frecuentes sobre compras, envíos y devoluciones.</p>
        <div className="products" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'var(--g4)' }}>
          <Card as="article" style={{ padding: 'var(--g4)' }}>
            <h2 style={{ margin: '0 0 .5rem 0' }}>Compras y pagos</h2>
            <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
              <li>Medios de pago aceptados: tarjetas y transferencia.</li>
              <li>Recibirás un correo con el número de pedido al completar la compra.</li>
            </ul>
          </Card>
          <Card as="article" style={{ padding: 'var(--g4)' }}>
            <h2 style={{ margin: '0 0 .5rem 0' }}>Envíos y devoluciones</h2>
            <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
              <li>Los plazos de entrega dependen de la comuna.</li>
              <li>Para devoluciones, escríbenos con el número de pedido y motivo.</li>
            </ul>
          </Card>
        </div>
      </Card>
    </Container>
  );
}

export default AyudaPage;