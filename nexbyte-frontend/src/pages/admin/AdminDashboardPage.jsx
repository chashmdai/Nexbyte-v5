import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiService';

// Un componente simple para las tarjetas de estadísticas
function StatCard({ title, value, linkTo, variant = 'primary' }) {
  return (
    <Col md={4} className="mb-3">
      <Card bg={variant.toLowerCase()} text="white" className="h-100">
        <Card.Body>
          <Card.Title as="h3">{value}</Card.Title>
          <Card.Text>{title}</Card.Text>
          {linkTo && (
            <Button as={Link} to={linkTo} variant={`outline-${variant}`}>
              Gestionar &rarr;
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalUsuarios: 0,
    stockBajo: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Hacemos ambas peticiones en paralelo para más eficiencia
        const [productosRes, usuariosRes] = await Promise.all([
          apiClient.get('/productos'),
          apiClient.get('/usuarios')
        ]);

        const productos = productosRes.data;
        const usuarios = usuariosRes.data;

        // Calculamos las estadísticas
        const totalProductos = productos.length;
        const totalUsuarios = usuarios.length;
        // La rúbrica pide stock < 5 [cite: 1151]
        const stockBajo = productos.filter(p => p.stock < 5).length; 

        setStats({
          totalProductos,
          totalUsuarios,
          stockBajo
        });
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar las estadísticas del dashboard.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Dashboard</h1>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Row>
          {/* Tarjeta de Total de Productos */}
          <StatCard
            title="Productos Totales"
            value={stats.totalProductos}
            linkTo="/admin/productos"
            variant="primary"
          />

          {/* Tarjeta de Total de Usuarios */}
          <StatCard
            title="Usuarios Registrados"
            value={stats.totalUsuarios}
            linkTo="/admin/usuarios"
            variant="success"
          />

          {/* Tarjeta de Stock Crítico */}
          <StatCard
            title="Productos con Stock Crítico"
            value={stats.stockBajo}
            linkTo="/admin/productos" // (Podríamos hacer un filtro en el futuro)
            variant={stats.stockBajo > 0 ? 'danger' : 'secondary'}
          />
        </Row>
      )}

      {/* Aquí podrías añadir más componentes, como accesos directos
          similares a los mockups [cite: 40-45] */}
    </Container>
  );
}

export default AdminDashboardPage;