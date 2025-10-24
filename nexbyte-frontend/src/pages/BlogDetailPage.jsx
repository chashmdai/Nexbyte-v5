import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link, useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

// Contenido de ejemplo para los posts
const postContent = {
  'mantenimiento-programado-v3': (
    <>
      <p>
        Durante este fin de semana realizaremos un mantenimiento programado de la
        plataforma Nexbyte v3. El objetivo es desplegar optimizaciones en la base de
        datos de productos, mejorar la indexación de búsqueda y ajustar los reportes
        del administrador.
      </p>
      <p>
        <strong>Ventana estimada:</strong> sábado 22:00 a domingo 02:00 (hora de Chile).
        Durante ese período la tienda podría mostrar mensajes de “solo lectura” y no se
        podrán crear cuentas nuevas ni finalizar compras.
      </p>
    </>
  ),
  '7-trucos-geek-setup': (
    <>
      <p>
        Si pasas muchas horas frente al PC, estos trucos pueden mejorar tu experiencia
        diaria. No necesitas gastar mucho: solo organización e intención.
      </p>
      <ol>
        <li>
          <strong>Atajos de teclado universales:</strong> Ctrl/⌘+K (buscar), Ctrl/⌘+Shift+T
          (reabrir pestaña), Win+V (historial en Windows).
        </li>
        <li>
          <strong>Ergonomía:</strong> eleva el monitor y usa una silla con soporte lumbar.
        </li>
      </ol>
    </>
  ),
  // agrega el resto...
};

function BlogDetailPage() {
  const { id } = useParams();
  const postIndex = blogPosts.findIndex((p) => p.id === id);
  const post = postIndex >= 0 ? blogPosts[postIndex] : null;

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const prev = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const next = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  // estilos legibles en dark, sin tocar CSS global
  const titleStyle = { color: 'rgba(255,255,255,.98)', margin: '0 0 .35rem 0', lineHeight: 1.2 };
  const metaStyle = { color: 'rgba(255,255,255,.65)', margin: '0 0 1rem 0' };
  const bodyStyle = { color: 'rgba(255,255,255,.88)', fontSize: '1.05rem', lineHeight: 1.75 };
  const figureStyle = {
    margin: '0 0 var(--g4)',
    height: 'clamp(220px, 38vh, 420px)',
    overflow: 'hidden',
    borderRadius: '12px',
  };

  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <Link to="/blogs">Blog</Link> / <span>{post.title}</span>
      </nav>

      <Card
        as="article"
        className="reveal in"
        style={{
          padding: 'var(--g5)',
          width: 'min(920px, 100%)',
          margin: '0 auto',
        }}
      >
        <h1 style={titleStyle}>{post.title}</h1>
        <p className="meta" style={metaStyle}>
          {post.author} · {post.date} · {post.category}
        </p>

        <figure className="card" style={figureStyle}>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </figure>

        {/* Contenido del post con mejor legibilidad */}
        <div style={bodyStyle}>
          {postContent[post.id] || <p>Contenido no disponible.</p>}
        </div>

        {/* Navegación Anterior / Siguiente */}
        <div
          className="mt-4"
          style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 'var(--g5)' }}
        >
          {prev ? (
            <Link className="btn btn-ghost" to={`/blog/${prev.id}`} title={prev.title}>
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <Link className="btn btn-ghost" to="/blogs">
              Volver al blog
            </Link>
            {next && (
              <Link className="btn btn-ghost" to={`/blog/${next.id}`} title={next.title}>
                {next.title} →
              </Link>
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default BlogDetailPage;
