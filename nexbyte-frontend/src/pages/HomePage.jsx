import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/apiService'; // Nuestro servicio de API
import { Container, Alert } from 'react-bootstrap';

// Creamos un componente reutilizable para la tarjeta de producto
const ProductCard = ({ producto }) => {
    const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
    const productUrl = `/productos/detalle/${producto.id}`; // Asumimos una futura ruta de detalle

    return (
        <article className="card product">
            <Link className="thumb" to={productUrl}>
                <img src={producto.imagen || '/assets/img/placeholder/product-1.jpg'} alt={producto.nombre} loading="lazy" />
            </Link>
            <div className="body">
                <Link className="title" to={productUrl}>{producto.nombre}</Link>
                <div className="meta">{producto.categoria.nombre}</div>
                <div className="price">{CLP.format(producto.precio)}</div>
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
    const fetchDestacados = async () => {
      try {
        const response = await getProductos();
        // Por ahora, mostraremos los últimos 4 productos como "destacados"
        setDestacados(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error al cargar productos destacados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestacados();
  }, []);

  return (
    <Container as="main" className="section">
      {/* Sección Hero */}
      <section className="hero">
        <div className="hero-copy card soft">
          <h1>TIENDA ONLINE</h1>
          <p style={{ maxWidth: '560px', margin: '.5rem 0 1rem 0' }}>
            Descubre nuestros productos destacados y mejora tu setup. Compra fácil, rápido y seguro.
          </p>
          <Link className="btn btn-primary" to="/productos">Ver productos</Link>
        </div>
        <figure className="hero-img card">
          <img alt="Hero Nexbyte" src="/assets/img/placeholder/hero.jpg" width="1600" height="900" />
        </figure>
      </section>

      {/* Sección Destacados */}
      <section className="section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ margin: 0 }}>Destacados</h2>
          <span style={{ flex: '1 1 auto' }}></span>
          <Link className="btn btn-ghost" to="/productos">Ver todo</Link>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          destacados.length > 0 ? (
            <section className="products" style={{ marginTop: '10px' }}>
              {destacados.map(producto => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </section>
          ) : (
            <Alert variant="info" className="mt-3">No hay productos disponibles por ahora.</Alert>
          )
        )}
      </section>
    </Container>
  );
}

export default HomePage;