import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoById } from '../services/apiService';
import { useCart } from '../context/CartContext'; // 1. Importa nuestro nuevo hook
import { Container, Row, Col, Image, Card, Button, Spinner, Alert } from 'react-bootstrap';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart(); // 2. Obtén la función para añadir al carrito

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await getProductoById(id);
        setProducto(response.data);
      } catch (err) {
        setError('No se pudo encontrar el producto.');
        console.error("Error al cargar el producto:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading) {
    return <div className="text-center"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!producto) {
    return <Alert variant="warning">Producto no disponible.</Alert>;
  }

  return (
    <Container className="section">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> / <Link to="/productos">Productos</Link> / {producto.nombre}
      </div>
      <Row>
        <Col md={6}>
          <Image src={producto.imagen || '/assets/img/placeholder/product-1.jpg'} alt={producto.nombre} fluid rounded />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h1">{producto.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{producto.categoria.nombre}</Card.Subtitle>
              <Card.Text className="price" style={{ fontSize: '1.5rem' }}>
                ${new Intl.NumberFormat('es-CL').format(producto.precio)}
              </Card.Text>
              <Card.Text>{producto.descripcion}</Card.Text>
              <hr />
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => addToCart(producto)} // 3. Llama a la función al hacer clic
                >
                  Añadir al carrito
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailPage;