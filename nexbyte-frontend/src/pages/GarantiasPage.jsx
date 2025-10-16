import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function GarantiasPage() {
  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Garantías</span>
      </nav>
      <Card as="section" className="reveal in" style={{ padding: 'var(--g4)' }}>
        <h1 style={{ margin: '0 0 .5rem 0' }}>Garantías</h1>
        <p className="meta" style={{ margin: '0 0 1rem 0' }}>Información sobre procesos de cambio, reparación o reembolso.</p>
        <h2 style={{ margin: '.5rem 0' }}>Proceso</h2>
        <ol style={{ margin: '0 0 var(--g3) 0', paddingLeft: '1.1rem' }}>
          <li>Contáctanos desde <Link to="/contacto">Contacto</Link> con número de pedido y síntoma.</li>
          <li>Recepción y diagnóstico.</li>
          <li>Resolución: reparación, cambio o devolución según el caso.</li>
        </ol>
        <div className="mt-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link className="btn btn-ghost" to="/contacto">Iniciar solicitud de garantía</Link>
        </div>
      </Card>
    </Container>
  );
}

export default GarantiasPage;