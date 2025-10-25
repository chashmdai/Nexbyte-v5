import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { /* getUsers */ eliminarUsuario } from '../../services/apiService'; // Asumiremos que 'getUsers' existe en apiService
import apiClient from '../../services/apiService'; // Importamos el cliente axios directamente

function AdminUserListPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Definimos la función para obtener usuarios aquí
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      // Usamos apiClient directamente ya que no creamos un 'getUsers'
      const response = await apiClient.get('/usuarios'); 
      setUsuarios(response.data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los usuarios.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEliminar = async (id) => {
    // Pedimos confirmación
    if (!window.confirm(`¿Estás seguro de que quieres ELIMINAR al usuario ID ${id}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      // Llamamos al endpoint DELETE que ya existe en el backend
      await eliminarUsuario(id);
      // Recargamos la lista para reflejar el cambio
      fetchUsuarios();
    } catch (err) {
      setError(`Error al eliminar el usuario ID ${id}.`);
      console.error(err);
    }
  };

  // Función para dar color al rol
  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'danger'; // Admin es "peligroso"
      case 'VENDOR':
        return 'success'; // Vendedor es "bueno"
      case 'CLIENT':
        return 'secondary'; // Cliente es "neutral"
      default:
        return 'light';
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gestión de Usuarios</h1>
        <Button as={Link} to="/admin/usuarios/nuevo" variant="primary">
          + Crear Usuario
        </Button>
      </div>

      {loading && <p>Cargando usuarios...</p>}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre} {user.apellidos}</td>
                <td>{user.correo}</td>
                <td>
                  <Badge bg={getRoleBadge(user.role)}>
                    {user.role}
                  </Badge>
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/usuarios/editar/${user.id}`}
                    variant="warning"
                    size="sm"
                    className="me-2"
                  >
                    Editar
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleEliminar(user.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminUserListPage;