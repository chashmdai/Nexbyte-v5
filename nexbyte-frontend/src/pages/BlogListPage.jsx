import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

export default function BlogListPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Todos');
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const set = new Set(blogPosts.map(p => p.category).filter(Boolean));
    return ['Todos', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return blogPosts.filter(p => {
      const matchCat = cat === 'Todos' || p.category === cat;
      const matchTxt =
        !term ||
        p.title?.toLowerCase().includes(term) ||
        p.summary?.toLowerCase().includes(term) ||
        p.author?.toLowerCase().includes(term);
      return matchCat && matchTxt;
    });
  }, [q, cat]);

  const PAGE_SIZE = 6;
  // eslint-disable-next-line no-unused-vars
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  React.useEffect(() => { setPage(1); }, [q, cat]);

  // ---- estilos inline reutilizables ----
  const titleBaseColor = 'rgba(255,255,255,.96)';
  const titleHoverColor = '#ffffff';
  const titleStyle = {
    color: titleBaseColor,
    textDecoration: 'none',
    display: 'block',
    fontWeight: 800,
    lineHeight: 1.25
  };
  const metaStyle = { color: 'rgba(255,255,255,.65)', fontSize: '.9rem' };

  return (
    <main className="section container">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Blog</span>
      </nav>

      <header style={{ marginBottom: 12 }}>
        <h1 style={{ margin: '0 0 .6rem 0', color: '#fff' }}>Blog</h1>

        <div className="toolbar" style={{ gap: 10, flexWrap: 'wrap' }}>
          <div className="spacer" />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {['Todos', ...categories.slice(1)].map(c => (
              <button
                key={c}
                className={`btn btn-ghost btn-small ${cat === c ? 'active' : ''}`}
                onClick={() => setCat(c)}
                style={{
                  borderColor: cat === c ? 'rgba(64,120,255,.45)' : 'rgba(255,255,255,.08)',
                  boxShadow: cat === c ? '0 0 0 2px rgba(64,120,255,.18) inset' : 'none'
                }}
              >
                {c}
              </button>
            ))}

            <div style={{ minWidth: 240 }}>
              <input
                className="input"
                type="search"
                placeholder="Buscar artículos…"
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => { if (e.key === 'Escape') setQ(''); }}
                aria-label="Buscar artículos"
              />
            </div>
          </div>
        </div>

        <p className="muted" style={{ margin: '6px 0 0' }}>
          {filtered.length === 1 ? '1 resultado' : `${filtered.length} resultados`}
          {cat !== 'Todos' ? ` · categoría: ${cat}` : ''}
          {q ? ` · búsqueda: “${q}”` : ''}
        </p>
      </header>

      {current.length > 0 ? (
        <section
          className="products"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--g4)' }}
        >
          {current.map(post => (
            <article key={post.id} className="card soft reveal in" style={{ padding: 0, overflow: 'hidden' }}>
              <Link to={`/blog/${post.id}`} aria-label={post.title} className="thumb" style={{ display: 'block' }}>
                <figure style={{ margin: 0, height: 160, overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </figure>
              </Link>

              <div style={{ padding: 'var(--g3)' }}>
                {/* TÍTULO con color forzado y micro hover sin CSS */}
                <Link
                  to={`/blog/${post.id}`}
                  style={titleStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = titleHoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = titleBaseColor)}
                >
                  {post.title}
                </Link>

                {/* Meta legible */}
                <div style={metaStyle}>
                  {post.author} · {post.date}{post.category ? ` · ${post.category}` : ''}
                </div>

                {post.summary && (
                  <p style={{ ...metaStyle, margin: '.55rem 0 0' }}>{post.summary}</p>
                )}

                <div style={{ marginTop: 10 }}>
                  <Link className="btn btn-ghost btn-small" to={`/blog/${post.id}`}>
                    Leer más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="card soft center" style={{ padding: 'var(--g5)', minHeight: 180 }}>
          <div>
            <h3 style={{ margin: 0, color: '#fff' }}>No encontramos artículos</h3>
            <p className="muted" style={{ marginTop: 6 }}>
              Ajusta la búsqueda o limpia el filtro de categoría.
            </p>
            <div className="mt-3" style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn btn-ghost btn-small" onClick={() => setQ('')}>Limpiar búsqueda</button>
              <button className="btn btn-ghost btn-small" onClick={() => setCat('Todos')}>Todas las categorías</button>
            </div>
          </div>
        </section>
      )}

      {filtered.length > 6 && (
        <nav className="toolbar mt-4" aria-label="Paginación" style={{ justifyContent: 'center', gap: 8 }}>
          <button className="btn btn-ghost btn-small" onClick={() => setPage(p => Math.max(1, p - 1))}>← Anterior</button>
          <span className="muted" style={{ padding: '0 8px' }}>Página {page} de {Math.ceil(filtered.length / 6)}</span>
          <button className="btn btn-ghost btn-small" onClick={() => setPage(p => Math.min(Math.ceil(filtered.length / 6), p + 1))}>Siguiente →</button>
        </nav>
      )}
    </main>
  );
}
