import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProductos, desactivarProducto } from '../../services/apiService';
import { useAuth } from '../../hooks/useAuth'; // Para el token (aunque apiService lo hace auto)

// Formateador de moneda
const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});

function AdminProductListPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const { token } = useAuth(); // Obtenemos el token (para futuras peticiones si apiService no lo hiciera)

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await getProductos();
      setProductos(response.data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los productos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDesactivar = async (id) => {
    // Pedimos confirmación
    if (!window.confirm(`¿Estás seguro de que quieres desactivar el producto ID ${id}?`)) {
      return;
    }

    try {
      // Llamamos al endpoint PATCH que ya existe en el backend
      await desactivarProducto(id);
      // Actualizamos la lista para reflejar el cambio (idealmente, el backend devuelve el producto actualizado)
      // Por ahora, solo recargamos todo
      fetchProductos(); 
    } catch (err) {
      setError(`Error al desactivar el producto ID ${id}.`);
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gestión de Productos</h1>
        <Button as={Link} to="/admin/productos/nuevo" variant="primary">
          + Crear Producto
        </Button>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.categoria?.nombre || 'N/A'}</td>
                <td>{CLP.format(prod.precio)}</td>
                <td>
                  {prod.stock <= 5 ? (
                    <Badge bg="danger">Bajo Stock ({prod.stock})</Badge>
                  ) : (
                    prod.stock
                  )}
                </td>
                <td>
                  {prod.activo ? (
                    <Badge bg="success">Activo</Badge>
                  ) : (
                    <Badge bg="secondary">Inactivo</Badge>
                  )}
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/productos/editar/${prod.id}`}
                    variant="warning"
                    size="sm"
                    className="me-2"
                  >
                    Editar
                  </Button>
                  
                  {/* Solo mostramos el botón si el producto está activo */}
                  {prod.activo && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDesactivar(prod.id)}
                    >
                      Desactivar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminProductListPage;