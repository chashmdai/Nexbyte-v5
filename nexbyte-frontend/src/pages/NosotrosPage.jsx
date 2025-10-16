import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NosotrosPage() {
  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Nosotros</span>
      </nav>
      <Card as="section" className="reveal in" style={{ padding: 'var(--g4)' }}>
        <figure className="card" style={{ margin: '0 0 var(--g4)', height: '160px', overflow: 'hidden' }}>
          <img src="/assets/img/placeholder/hero.jpg" alt="Nexbyte" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </figure>
        <h1 style={{ margin: '0 0 .25rem 0' }}>Sobre Nexbyte</h1>
        <p className="meta" style={{ margin: '0 0 1rem 0' }}>Quiénes somos y qué hacemos.</p>
        
        {/* Aquí puedes pegar directamente el resto del contenido de tu nosotros.html */}
        <div className="products" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--g4)', marginTop: '.2rem' }}>
          {/* ... Misión, Visión, Valores ... */}
        </div>

      </Card>
    </Container>
  );
}

export default NosotrosPage;