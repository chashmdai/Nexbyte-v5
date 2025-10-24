import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const block = { padding: 'var(--g4)' };
const h2 = { margin: '0 0 .5rem 0', color: '#fff' };
const meta = { color: 'var(--text-dim)', margin: 0 };

export default function GarantiasPage() {
  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Garantías</span>
      </nav>

      <Card className="card soft reveal in" style={{ ...block, marginBottom: 'var(--g4)' }}>
        <h1 style={{ margin: '0 0 .25rem 0' }}>Garantías</h1>
        <p style={{ ...meta, marginTop: 6 }}>
          Procesos de cambio, reparación o reembolso según normativa local y políticas de fabricante.
        </p>
      </Card>

      <section className="grid" style={{ gap: 'var(--g4)', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', marginBottom: 'var(--g4)' }}>
        <Card className="card soft" style={block}>
          <h2 style={h2}>Qué cubre</h2>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-dim)' }}>
            <li>Fallas de fabricación durante el período de garantía.</li>
            <li>Productos DOA (defectuosos al llegar) dentro de 10 días.</li>
            <li>Reparación o cambio según disponibilidad.</li>
          </ul>
        </Card>
        <Card className="card soft" style={block}>
          <h2 style={h2}>Qué no cubre</h2>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-dim)' }}>
            <li>Daños por instalación incorrecta, golpes o humedad.</li>
            <li>Modificaciones no autorizadas o sobrevoltaje.</li>
            <li>Desgaste natural por uso.</li>
          </ul>
        </Card>
        <Card className="card soft" style={block}>
          <h2 style={h2}>Plazos y evidencias</h2>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-dim)' }}>
            <li>Boleta o factura del pedido.</li>
            <li>Imágenes/video del síntoma cuando sea posible.</li>
            <li>Plazos sujetos a evaluación del fabricante (RMA).</li>
          </ul>
        </Card>
      </section>

      <Card className="card soft" style={{ ...block, marginBottom: 'var(--g4)' }}>
        <h2 style={h2}>¿Cómo iniciar el proceso?</h2>
        <ol style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-dim)' }}>
          <li>
            Escríbenos desde <Link to="/contacto">Contacto</Link> con número de pedido y síntoma.  
            Para hardware armado con nosotros, puedes ir directo a <Link to="/soporte">Soporte</Link>.
          </li>
          <li>Recepción y diagnóstico: confirmamos la falla y definimos si procede RMA.</li>
          <li>Resolución: reparación, cambio o devolución según el caso y stock.</li>
        </ol>
      </Card>

      <Card className="card soft" style={{ ...block, marginBottom: 'var(--g4)' }}>
        <h2 style={h2}>Estados de tu solicitud</h2>
        <div className="grid" style={{ gap: 'var(--g3)', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
          {[
            { t: 'Recibida', d: 'Hemos recibido tus datos y documentos.' },
            { t: 'En diagnóstico', d: 'Probamos y registramos el síntoma.' },
            { t: 'En fabricante', d: 'Derivado a RMA o espera de repuesto.' },
            { t: 'Resuelto', d: 'Listo para retiro, envío o reembolso.' },
          ].map((x) => (
            <Card key={x.t} className="card" style={{ padding: 'var(--g3)' }}>
              <strong style={{ color: '#fff' }}>{x.t}</strong>
              <p style={{ ...meta, marginTop: 6 }}>{x.d}</p>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="card soft" style={{ ...block, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h2 style={{ ...h2, margin: 0 }}>¿Tienes un problema con tu producto?</h2>
          <p style={{ ...meta, marginTop: 6 }}>Cuéntanos tu caso y lo revisamos hoy mismo.</p>
        </div>
        <div className="toolbar">
          <Link to="/contacto" className="btn btn-primary">Iniciar garantía</Link>
          <Link to="/soporte" className="btn btn-ghost" style={{ marginLeft: 8 }}>Soporte técnico</Link>
        </div>
      </Card>
    </Container>
  );
}
