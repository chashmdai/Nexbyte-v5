// src/pages/AyudaPage.jsx
import React, { useMemo, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AyudaPage() {
  const faqs = useMemo(() => ([
    {
      id: 'pago-medios',
      cat: 'Compras y pagos',
      q: '¿Qué medios de pago aceptan?',
      a: (
        <>
          Aceptamos tarjetas de débito/crédito y transferencia bancaria.
          Tras completar el pago, recibirás un correo con el número de pedido.
        </>
      ),
      text: 'medios de pago tarjetas credito debito transferencia correo numero pedido',
    },
    {
      id: 'pago-comprobante',
      cat: 'Compras y pagos',
      q: '¿Recibo comprobante o boleta?',
      a: (
        <>
          Sí. Al finalizar la compra enviamos un comprobante por correo.
          Si necesitas factura, indícalo en <Link to="/contacto">Contacto</Link>.
        </>
      ),
      text: 'comprobante boleta factura correo finalizar compra',
    },
    {
      id: 'envio-plazos',
      cat: 'Envíos',
      q: '¿Cuánto tarda el envío?',
      a: (
        <>
          Depende de la comuna y del operador logístico. En regiones urbanas
          suele demorar entre 1 y 3 días hábiles tras la confirmación del pago.
        </>
      ),
      text: 'envios plazo demora comuna operador logistico 1 a 3 dias habil',
    },
    {
      id: 'envio-seguimiento',
      cat: 'Envíos',
      q: '¿Cómo hago seguimiento de mi pedido?',
      a: (
        <>
          Te enviamos el tracking por correo cuando el pedido es despachado.
          Si no lo ves, revisa el spam o escríbenos por <Link to="/contacto">Contacto</Link>.
        </>
      ),
      text: 'seguimiento tracking correo despacho spam contacto',
    },
    {
      id: 'devolucion-proceso',
      cat: 'Devoluciones y garantías',
      q: '¿Cómo gestiono una devolución o garantía?',
      a: (
        <>
          Escríbenos desde <Link to="/contacto">Contacto</Link> con el número de pedido y el motivo.
          Luego coordinamos la recepción y diagnóstico. Más detalle en <Link to="/garantias">Garantías</Link>.
        </>
      ),
      text: 'devolucion garantia contacto numero de pedido recepcion diagnostico',
    },
    {
      id: 'garantia-alcance',
      cat: 'Devoluciones y garantías',
      q: '¿Qué cubre la garantía?',
      a: (
        <>
          Cubre fallas de fabricación dentro del período de garantía.
          No cubre daños por golpes, humedad o instalación incorrecta.
        </>
      ),
      text: 'garantia cubre fallas fabricacion no cubre golpes humedad instalacion incorrecta',
    },
    {
      id: 'soporte-cotizacion',
      cat: 'Soporte técnico',
      q: '¿Cómo solicito soporte técnico o mantención?',
      a: (
        <>
          Completa el formulario de <Link to="/soporte">Soporte</Link> con tu caso (equipo, prioridad y síntomas).
          Te responderemos con una cotización estimada y los siguientes pasos.
        </>
      ),
      text: 'soporte tecnico mantencion formulario equipo prioridad sintomas cotizacion',
    },
    {
      id: 'soporte-tiempo',
      cat: 'Soporte técnico',
      q: '¿Cuánto se demora el diagnóstico?',
      a: (
        <>
          Generalmente 24–48 horas hábiles desde la recepción del equipo.
          En casos críticos priorizamos según disponibilidad.
        </>
      ),
      text: 'diagnostico demora 24 48 horas habiles recepcion equipo prioridad critica',
    },
  ]), []);

  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Todas');

  const categories = useMemo(() => {
    const s = new Set(faqs.map(f => f.cat));
    return ['Todas', ...Array.from(s)];
  }, [faqs]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return faqs.filter(f => {
      const byCat = cat === 'Todas' || f.cat === cat;
      const byText = !term || f.q.toLowerCase().includes(term) || f.text.includes(term);
      return byCat && byText;
    });
  }, [faqs, q, cat]);

  const titleStyle = { color: '#fff', margin: 0 };
  const metaStyle = { color: 'var(--text-dim)', margin: 0 };
  const chipActive = {
    borderColor: 'rgba(64,120,255,.45)',
    boxShadow: '0 0 0 2px rgba(64,120,255,.18) inset',
  };
  const summaryStyle = {
    listStyle: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    color: '#fff',
    fontWeight: 700,
    padding: '14px 16px',
    borderBottom: '1px solid rgba(255,255,255,.08)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };
  const detailsBody = { padding: '10px 14px 14px', color: 'var(--text-dim)' };

  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Ayuda</span>
      </nav>

      <Card as="section" className="reveal in card soft" style={{ padding: 'var(--g4)' }}>
        <h1 style={titleStyle}>Centro de ayuda</h1>
        <p className="meta" style={{ ...metaStyle, marginTop: 6 }}>
          Preguntas frecuentes sobre compras, envíos, devoluciones y soporte técnico.
        </p>

        <div className="toolbar" style={{ gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c}
                className="btn btn-ghost btn-small"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                style={cat === c ? chipActive : undefined}
                title={`Filtrar por ${c}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="spacer" />
          <div style={{ minWidth: 260 }}>
            <input
              className="input"
              type="search"
              placeholder="Buscar en las preguntas…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') setQ(''); }}
              aria-label="Buscar preguntas frecuentes"
            />
          </div>
        </div>

        <p className="muted" style={{ marginTop: 8 }}>
          {filtered.length === 1 ? '1 resultado' : `${filtered.length} resultados`}
          {cat !== 'Todas' ? ` · ${cat}` : ''}
          {q ? ` · “${q}”` : ''}
        </p>

        {filtered.length > 0 ? (
          <section className="grid" style={{ gap: 'var(--g3)', marginTop: 14 }}>
            {filtered.map((f) => (
              <details key={f.id} className="card" style={{ borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                <summary style={summaryStyle}>
                  <span style={{
                    width: 27, height: 27, display: 'inline-grid', placeItems: 'center',
                    borderRadius: 6, border: '1px solid rgba(255,255,255,.14)'
                  }}>
                    ?
                  </span>
                  {f.q}
                </summary>
                <div style={detailsBody}>
                  <p style={{ margin: 0, lineHeight: 1.7 }}>{f.a}</p>
                </div>
              </details>
              
            ))}
          </section>
        ) : (
          <section className="card soft center" style={{ padding: 'var(--g5)', marginTop: 14 }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#fff', margin: 0 }}>No encontramos lo que buscas</h3>
              <p className="muted" style={{ marginTop: 6 }}>
                Prueba cambiando las palabras o limpia los filtros.
              </p>
              <div className="mt-3" style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button className="btn btn-ghost btn-small" onClick={() => setQ('')}>Limpiar búsqueda</button>
                <button className="btn btn-ghost btn-small" onClick={() => setCat('Todas')}>Todas las categorías</button>
              </div>
            </div>
          </section>
        )}

        <div className="grid" style={{ gap: 'var(--g4)', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginTop: 'var(--g4)' }}>
          <Card className="card" style={{ padding: 'var(--g3)' }}>
            <strong style={{ color: '#fff' }}>Soporte técnico</strong>
            <p className="muted" style={{ marginTop: 6 }}>Diagnóstico, mantención y upgrades.</p>
            <div className="mt-2">
              <Link to="/soporte" className="btn btn-primary btn-small">Solicitar soporte</Link>
            </div>
          </Card>

          <Card className="card" style={{ padding: 'var(--g3)' }}>
            <strong style={{ color: '#fff' }}>Garantías y devoluciones</strong>
            <p className="muted" style={{ marginTop: 6 }}>Cobertura, plazos y proceso.</p>
            <div className="mt-2">
              <Link to="/garantias" className="btn btn-ghost btn-small">Ver detalles</Link>
            </div>
          </Card>

          <Card className="card" style={{ padding: 'var(--g3)' }}>
            <strong style={{ color: '#fff' }}>¿Aún tienes dudas?</strong>
            <p className="muted" style={{ marginTop: 6 }}>Escríbenos y te respondemos hoy.</p>
            <div className="mt-2">
              <Link to="/contacto" className="btn btn-ghost btn-small">Ir a contacto</Link>
            </div>
          </Card>
        </div>
      </Card>
    </Container>
  );
}
