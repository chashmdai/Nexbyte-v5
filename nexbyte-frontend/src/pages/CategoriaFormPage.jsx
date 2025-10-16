import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { createCategoria } from '../services/apiService'; // Asumimos que esta función existirá

function CategoriaFormPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createCategoria({ nombre });
      navigate('/admin/categorias'); // Redirigiremos a una futura lista de categorías
    } catch (error) {
      setError('Hubo un error al crear la categoría.');
      console.error('Detalle del error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Crear Nueva Categoría</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre de la Categoría</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Categoría'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CategoriaFormPage;