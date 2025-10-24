import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Badge({ children }) {
  return (
    <span
      className="badge"
      style={{
        background: 'rgba(37,99,235,.18)',
        color: '#cfe0ff',
        border: '1px solid rgba(255,255,255,.12)',
        marginLeft: 8
      }}
    >
      {children}
    </span>
  );
}

const block = { padding: 'var(--g4)' };
const h2 = { margin: '0 0 .5rem 0', color: '#fff' };
const meta = { color: 'var(--text-dim)', margin: 0 };

export default function NosotrosPage() {
  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Nosotros</span>
      </nav>

      {/* Hero */}
      <Card className="card soft reveal in" style={{ padding: 0, overflow: 'hidden', marginBottom: 'var(--g4)' }}>
        <figure style={{ margin: 0, height: 220, position: 'relative', overflow: 'hidden' }}>
          <img
            src="/assets/img/placeholder/hero.jpg"
            alt="Equipo Nexbyte"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(.98) contrast(.98)' }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(9,13,23,.0), rgba(9,13,23,.6) 60%)'
            }}
          />
        </figure>
        <div style={{ padding: 'var(--g4)' }}>
          <h1 style={{ margin: 0 }}>Sobre Nexbyte</h1>
          <p style={{ margin: '6px 0 0', color: 'var(--text-dim)' }}>
            Tecnología honesta para armar, mantener y potenciar tu equipo.
            <Badge>Desde 2020</Badge>
          </p>
        </div>
      </Card>

      {/* Misión / Visión / Valores */}
      <section className="grid" style={{ gap: 'var(--g4)', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', marginBottom: 'var(--g4)' }}>
        <Card className="card soft" style={block}>
          <h2 style={h2}>Misión</h2>
          <p style={meta}>
            Ayudar a personas y empresas a obtener el mejor rendimiento de su hardware
            con una experiencia de compra clara, soporte cercano y diagnósticos honestos.
          </p>
        </Card>
        <Card className="card soft" style={block}>
          <h2 style={h2}>Visión</h2>
          <p style={meta}>
            Ser el partner técnico más confiable para entusiastas y creadores en Latinoamérica:
            simple, transparente y rápido.
          </p>
        </Card>
        <Card className="card soft" style={block}>
          <h2 style={h2}>Valores</h2>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-dim)' }}>
            <li>Transparencia y educación</li>
            <li>Soporte humano, sin scripts</li>
            <li>Respeto por tu tiempo y tu presupuesto</li>
          </ul>
        </Card>
      </section>

      {/* Qué nos diferencia */}
      <Card className="card soft" style={{ ...block, marginBottom: 'var(--g4)' }}>
        <h2 style={h2}>Qué nos diferencia</h2>
        <div className="grid" style={{ gap: 'var(--g3)', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
          {[
            { t: 'Diagnóstico real', d: 'Probamos tu equipo con métricas, no “se siente lento”.' },
            { t: 'Presupuestos claros', d: 'Partes, mano de obra y tiempos estimados por escrito.' },
            { t: 'Rápidos y ordenados', d: 'Checklists internos, respaldo de datos y trazabilidad.' },
            { t: 'Post venta', d: 'Te acompañamos después de la entrega con consejos y ajustes.' },
          ].map((x) => (
            <Card key={x.t} className="card" style={{ padding: 'var(--g3)' }}>
              <strong style={{ color: '#fff' }}>{x.t}</strong>
              <p style={{ ...meta, marginTop: 6 }}>{x.d}</p>
            </Card>
          ))}
        </div>
      </Card>

      {/* Línea de tiempo */}
      <Card className="card soft" style={{ ...block, marginBottom: 'var(--g4)' }}>
        <h2 style={h2}>Hitos</h2>
        <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-dim)' }}>
          <li><strong style={{ color: '#fff' }}>2020:</strong> lanzamos Nexbyte como tienda especializada.</li>
          <li><strong style={{ color: '#fff' }}>2022:</strong> abrimos soporte técnico con diagnóstico estructurado.</li>
          <li><strong style={{ color: '#fff' }}>2024:</strong> versión v3 del sitio con carrito, soporte y blog.</li>
        </ul>
      </Card>

      {/* Equipo */}
      <Card className="card soft" style={{ ...block, marginBottom: 'var(--g4)' }}>
        <h2 style={h2}>Equipo</h2>
        <div className="products" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 'var(--g3)' }}>
          {[
            { n: 'Benjamín Torrejon', r: 'Soporte y asesorías' },
            { n: 'Equipo Nexbyte', r: 'Abastecimiento y pruebas' },
            { n: 'Colaboradores', r: 'Logística y contenidos' },
          ].map((p) => (
            <Card key={p.n} className="card" style={{ padding: 'var(--g3)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                aria-hidden
                style={{
                  width: 42, height: 42, borderRadius: 999,
                  background: 'linear-gradient(180deg, rgba(37,99,235,.55), rgba(37,99,235,.18))',
                  border: '1px solid rgba(255,255,255,.14)', display: 'grid', placeItems: 'center',
                  fontWeight: 800
                }}
              >
                {p.n[0]}
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700 }}>{p.n}</div>
                <div style={{ color: 'var(--text-dim)' }}>{p.r}</div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* CTA */}
      <Card className="card soft" style={{ ...block, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h2 style={{ ...h2, margin: 0 }}>¿Necesitas ayuda con tu PC?</h2>
          <p style={{ ...meta, marginTop: 6 }}>Cotiza soporte técnico o escríbenos por contacto.</p>
        </div>
        <div className="toolbar">
          <Link to="/soporte" className="btn btn-primary">Solicitar soporte</Link>
          <Link to="/contacto" className="btn btn-ghost" style={{ marginLeft: 8 }}>Contacto</Link>
        </div>
      </Card>
    </Container>
  );
}
