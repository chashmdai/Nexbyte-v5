import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importa useParams
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { getCategorias, createProducto, getProductoById, updateProducto } from '../services/apiService';

function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // <-- 1. Obtenemos el ID de la URL. Si no hay, será 'undefined'.

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: { id: '' }
  });

  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isEditing = !!id; // <-- 2. Creamos una bandera para saber si estamos editando.

  // Efecto para cargar datos (categorías y, si estamos editando, el producto)
  useEffect(() => {
    const loadData = async () => {
      try {
        // Siempre cargamos las categorías
        const catResponse = await getCategorias();
        setCategorias(catResponse.data);

        // Si estamos en modo edición, cargamos los datos del producto
        if (isEditing) {
          setLoading(true);
          const prodResponse = await getProductoById(id);
          setProducto(prodResponse.data);
        }
      } catch (error) {
        setError('No se pudieron cargar los datos necesarios.');
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, isEditing]); // Se ejecutará si el ID cambia

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoria") {
      setProducto({ ...producto, categoria: { id: value } });
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 3. Decidimos qué función llamar
      if (isEditing) {
        await updateProducto(id, producto);
      } else {
        await createProducto(producto);
      }
      navigate('/productos');
    } catch (error) {
      setError(`Hubo un error al ${isEditing ? 'actualizar' : 'crear'} el producto.`);
      console.error('Detalle del error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          {/* 4. El título cambia dinámicamente */}
          <Card.Title>{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            {/* Los campos del formulario son los mismos, React se encarga de llenarlos */}
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} name="descripcion" value={producto.descripcion} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" step="0.01" name="precio" value={producto.precio} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" name="stock" value={producto.stock} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categoria" value={producto.categoria.id} onChange={handleChange} required>
                <option value="">Selecciona una categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Guardar Producto')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductFormPage;