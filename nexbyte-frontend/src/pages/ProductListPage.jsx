import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../services/apiService';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Importamos el hook del carrito

// Componente reutilizable para la tarjeta de producto
const ProductCard = ({ producto }) => {
    const { addToCart } = useCart();
    const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
    const productUrl = `/productos/detalle/${producto.id}`;

    return (
        <article className="card product" data-id={producto.id}>
            <Link className="thumb" to={productUrl}>
                <img src={producto.imagen || '/assets/img/placeholder/product-1.jpg'} alt={producto.nombre} loading="lazy" />
            </Link>
            <div className="body">
                <Link className="title" to={productUrl}>{producto.nombre}</Link>
                <div className="meta">{producto.categoria.nombre}</div>
                <div className="price">{CLP.format(producto.precio)}</div>
            </div>
            <div className="actions">
                <Button variant="primary" onClick={() => addToCart(producto)}>
                    Añadir al carrito
                </Button>
            </div>
        </article>
    );
};

// Página principal del listado de productos
function ProductListPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getProductos();
        setProductos(response.data);
      } catch (err) {
        setError('No se pudieron cargar los productos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  if (loading) {
    return <div className="text-center mt-4"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container as="main" className="section">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Productos</h1>
            {/* Mantendremos este botón para el admin en el futuro */}
            {/* <Link to="/productos/nuevo"><Button variant="primary">Crear Producto</Button></Link> */}
        </div>

      {productos.length === 0 ? (
        <Alert variant="info">No hay productos disponibles.</Alert>
      ) : (
        <section className="products">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </section>
      )}
    </Container>
  );
}

export default ProductListPage;