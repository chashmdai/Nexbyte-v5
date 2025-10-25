import React, { useState, useEffect } from 'react';
import { Table, Container, Alert, Spinner, Badge } from 'react-bootstrap';
import apiClient from '../../services/apiService';

// Función para formatear la fecha
const formatFecha = (fechaString) => {
  if (!fechaString) return 'N/A';
  try {
    return new Intl.DateTimeFormat('es-CL', {
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: false,
    }).format(new Date(fechaString));
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return fechaString;
  }
};

// Función para dar color a la prioridad
const getPrioridadBadge = (prioridad) => {
  switch (prioridad) {
    case 'URGENTE':
      return 'danger';
    case 'ALTA':
      return 'warning';
    case 'NORMAL':
      return 'primary';
    case 'BAJA':
      return 'secondary'; // <-- ASÍ
    default:
      return 'light';
  }
};

function AdminSoportePage() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      setLoading(true);
      try {
        // 1. Llamamos al endpoint GET que creamos
        const response = await apiClient.get('/soporte');
        setSolicitudes(response.data);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar las solicitudes de soporte.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Solicitudes de Soporte</h1>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Prioridad</th>
              <th>Equipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No hay solicitudes.</td>
              </tr>
            ) : (
              solicitudes.map((req) => (
                <tr key={req.id}>
                  <td><Badge bg="secondary">{req.id}</Badge></td>
                  <td>{formatFecha(req.fechaCreacion)}</td>
                  <td>{req.nombreCliente}</td>
                  <td>{req.emailCliente}</td>
                  <td>
                    <Badge bg={getPrioridadBadge(req.prioridad)}>
                      {req.prioridad}
                    </Badge>
                  </td>
                  <td>{req.equipo}</td>
                  <td style={{ minWidth: '300px' }}>{req.descripcionProblema}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminSoportePage;