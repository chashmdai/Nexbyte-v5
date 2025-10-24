import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoById } from '../services/apiService';
import { useCart } from '../context/CartContext';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const response = await getProductoById(id);
        if (!mounted) return;
        const p = response?.data;
        setProducto(p);
        setActiveImg(p?.imagen || '/assets/img/placeholder/product-1.jpg');
      } catch (err) {
        if (!mounted) return;
        console.error('Error al cargar el producto:', err);
        setError('No se pudo encontrar el producto.');
      } finally {
        mounted && setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleAdd = () => {
    if (!producto) return;
    // Sin control de cantidad aquí: el ajuste se hace en el carrito
    addToCart({ ...producto, qty: 1 });
  };

  if (loading) {
    return (
      <Container as="main" className="section">
        <div className="center" style={{ minHeight: 240 }}>
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container as="main" className="section">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container as="main" className="section">
        <Alert variant="warning">Producto no disponible.</Alert>
      </Container>
    );
  }

  return (
    <Container as="main" className="section" id="view">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link to="/">Inicio</Link> / <Link to="/productos">Productos</Link> / <span className="muted">{producto.nombre}</span>
      </nav>

      {/* Layout principal (usamos tu grid utilitaria) */}
      <div className="grid" style={{ gridTemplateColumns: 'minmax(260px, 480px) 1fr', gap: '16px' }}>
        {/* Imagen principal */}
        <section className="card soft" style={{ padding: 12 }}>
          <figure className="hero-img" style={{ height: 360, borderRadius: 10, overflow: 'hidden' }}>
            <img
              src={activeImg}
              alt={producto.nombre}
              className="is-loaded"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </figure>
        </section>

        {/* Información */}
        <section className="card soft" style={{ padding: 18 }}>
          <h1 style={{ margin: 0 }}>{producto.nombre}</h1>
          <div className="muted mt-2">{producto?.categoria?.nombre ?? '—'}</div>

          {/* PRECIO: claro/hero sin caja oscura detrás */}
          <div className="pdp-price">{CLP.format(producto.precio)}</div>

          <div className="d-flex align-items-center gap-2">
            <Button variant="primary" size="lg" onClick={handleAdd}>
              Añadir al carrito
            </Button>
          </div>

          <div className="hr" />

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <h3>Descripción</h3>
              <p className="muted">
                {producto.descripcion || 'Producto de alta calidad para tu setup. Rendimiento y compatibilidad asegurados.'}
              </p>
            </div>
            <div>
              <h3>Especificaciones</h3>
              <ul className="muted" style={{ margin: 0, paddingLeft: '1.1rem' }}>
                <li>Categoría: {producto?.categoria?.nombre ?? '—'}</li>
                <li>SKU: {producto.id}</li>
                <li>Garantía: 6 meses</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default ProductDetailPage;
