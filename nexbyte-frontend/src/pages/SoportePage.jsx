import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SoportePage() {
  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Soporte</span>
      </nav>
      <Card as="section" className="reveal in" style={{ padding: 'var(--g4)' }}>
        <h1 style={{ margin: '0 0 .5rem 0' }}>Soporte técnico</h1>
        <p className="meta" style={{ margin: '0 0 1rem 0' }}>Diagnóstico y ayuda para equipos y componentes.</p>
        <div className="products" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'var(--g4)' }}>
          <Card as="article" style={{ padding: 'var(--g4)' }}>
            <h2 style={{ margin: '0 0 .5rem 0' }}>Diagnóstico</h2>
            <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
              <li>Chequeo de temperaturas, almacenamiento y RAM.</li>
              <li>Pruebas básicas de estabilidad y drivers.</li>
              <li>Informe con hallazgos y pasos recomendados.</li>
            </ul>
          </Card>
          <Card as="article" style={{ padding: 'var(--g4)' }}>
            <h2 style={{ margin: '0 0 .5rem 0' }}>Servicios</h2>
            <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
              <li>Mantención preventiva (limpieza y flujo de aire).</li>
              <li>Instalación de componentes y actualización de BIOS/firmware.</li>
            </ul>
          </Card>
          <Card as="article" style={{ padding: 'var(--g4)' }}>
            <h2 style={{ margin: '0 0 .5rem 0' }}>¿Cómo solicitar soporte?</h2>
            <ol style={{ margin: 0, paddingLeft: '1.1rem' }}>
              <li>Describe el problema (síntomas, cuándo ocurre, etc.).</li>
              <li>Escríbenos desde <Link to="/contacto">Contacto</Link> y agenda.</li>
            </ol>
          </Card>
        </div>
      </Card>
    </Container>
  );
}

export default SoportePage;