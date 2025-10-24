// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/apiService';

const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

const ProductCard = ({ producto }) => {
  const productUrl = `/productos/detalle/${producto.id}`;
  const img = producto.imagen || '/assets/img/placeholder/product-1.jpg';
  const categoria = producto.categoria?.nombre || 'Sin categoría';

  return (
    <article className="card product">
      <Link className="thumb" to={productUrl}>
        <img
          src={img}
          alt={producto.nombre || 'Producto'}
          loading="lazy"
          width="640"
          height="400"
          onLoad={e => e.currentTarget.classList.add('is-loaded')}
        />
      </Link>
      <div className="body">
        <Link className="title" to={productUrl}>{producto.nombre || 'Producto'}</Link>
        <div className="meta">{categoria}</div>
        <div className="price">{CLP.format(producto.precio || 0)}</div>
      </div>
      <div className="actions">
        <Link className="btn btn-ghost btn-small" to={productUrl}>Ver detalles</Link>
      </div>
    </article>
  );
};

function HomePage() {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await getProductos();
        setDestacados((response?.data || []).slice(0, 4));
      } catch (e) {
        console.error('Error al cargar productos destacados:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

return (
  <main className="page-shell">
    {/* HERO en banda full-bleed */}
    <section className="band bleed">
      <div className="container"> {/* contenido centrado dentro de la banda */}
        <div className="hero">
          <div className="hero-copy card soft">
            <h1>TIENDA ONLINE</h1>
            <p className="muted">Descubre nuestros productos destacados y mejora tu setup. Compra fácil, rápido y seguro.</p>
            <Link className="btn btn-primary" to="/productos">Ver productos</Link>
          </div>
          <figure className="hero-img card">
            <img
              alt="Hero Nexbyte"
              src="/assets/img/placeholder/hero.jpg"
              width="1600"
              height="900"
              loading="eager"
              onLoad={e => e.currentTarget.classList.add('is-loaded')}
            />
          </figure>
        </div>
      </div>
    </section>

    {/* DESTACADOS — en la pista central, con menos padding arriba */}
    <section className="section after-hero">
      <div className="container">
        <div className="toolbar">
          <h2 style={{ margin: 0 }}>Destacados</h2>
        </div>

        {loading ? (
          <p className="muted mt-3">Cargando…</p>
        ) : destacados.length > 0 ? (
          <div className="products mt-3">
            {destacados.map(p => <ProductCard key={p.id} producto={p} />)}
          </div>
        ) : (
          <div className="card soft mt-3" style={{ padding: 16 }}>
            No hay productos disponibles por ahora.
          </div>
        )}
      </div>
    </section>
  </main>
);
}

export default HomePage;
