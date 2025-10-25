import React, { useState, useEffect } from 'react';
import { Table, Container, Alert, Spinner, Badge } from 'react-bootstrap';
import apiClient from '../../services/apiService'; // Usamos el cliente axios

// Función simple para formatear la fecha
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
    return fechaString; // Devuelve el string original si falla
  }
};

function AdminContactoPage() {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMensajes = async () => {
      setLoading(true);
      try {
        // 1. Llamamos al endpoint GET que creamos y protegimos
        const response = await apiClient.get('/contactos');
        setMensajes(response.data);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los mensajes de contacto.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMensajes();
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Mensajes de Contacto</h1>

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
              <th>Nombre</th>
              <th>Email</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {mensajes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No hay mensajes.</td>
              </tr>
            ) : (
              mensajes.map((msg) => (
                <tr key={msg.id}>
                  <td><Badge bg="secondary">{msg.id}</Badge></td>
                  <td>{formatFecha(msg.fechaEnvio)}</td>
                  <td>{msg.nombre}</td>
                  <td>{msg.email}</td>
                  {/* Damos un ancho máx. al mensaje para que no rompa la tabla */}
                  <td style={{ minWidth: '300px' }}>{msg.mensaje}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminContactoPage;