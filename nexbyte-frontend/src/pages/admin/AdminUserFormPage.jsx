import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Col, Row, Spinner } from 'react-bootstrap';
import apiClient from '../../services/apiService'; // Importamos el cliente axios
import regiones from '../../data/regiones'; // Reutilizamos tu data de regiones

// 1. Esquema de validación con Zod
const userSchema = z.object({
  run: z.string().min(8, 'RUN inválido').max(10, 'RUN inválido'),
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellidos: z.string().min(1, 'El apellido es requerido'),
  correo: z.string().email('Correo inválido'),
  // La contraseña es requerida al crear, pero opcional al editar
  pass: z.string().optional(),
  role: z.enum(['ADMIN', 'VENDOR', 'CLIENT'], { message: 'Rol inválido' }),
  telefono: z.string().optional(),
  region: z.string().min(1, 'La región es requerida'),
  comuna: z.string().min(1, 'La comuna es requerida'),
  direccion: z.string().min(1, 'La dirección es requerida'),
});

// Esquema para crear (hace la contraseña obligatoria)
const createUserSchema = userSchema.extend({
  pass: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),
});

function AdminUserFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID de la URL
  const isEditing = !!id; // Boolean para saber si estamos editando

  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(false); // Para cargar el usuario
  const [comunas, setComunas] = useState([]);

  // 2. Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isEditing ? userSchema : createUserSchema), // Esquema dinámico
  });

  // Observamos el valor de la región para cargar comunas
  const selectedRegion = watch('region');
  useEffect(() => {
    if (selectedRegion) {
      const regionEncontrada = regiones.find((r) => r.nombre === selectedRegion);
      setComunas(regionEncontrada ? regionEncontrada.comunas : []);
    } else {
      setComunas([]);
    }
  }, [selectedRegion]);

  // 3. Cargar datos si estamos en modo "Editar"
  useEffect(() => {
    if (isEditing) {
      setLoadingData(true);
      apiClient.get(`/usuarios/${id}`)
        .then(response => {
          const user = response.data;
          // Llenamos el formulario con los datos del usuario
          setValue('run', user.run);
          setValue('nombre', user.nombre);
          setValue('apellidos', user.apellidos);
          setValue('correo', user.correo);
          setValue('role', user.role);
          setValue('telefono', user.telefono || '');
          setValue('region', user.region);
          // Pre-cargamos las comunas de esa región
          const regionData = regiones.find(r => r.nombre === user.region);
          if (regionData) {
            setComunas(regionData.comunas);
          }
          setValue('comuna', user.comuna);
          setValue('direccion', user.direccion);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => setError('No se pudo cargar el usuario.'))
        .finally(() => setLoadingData(false));
    }
  }, [id, isEditing, setValue]);

  // 4. Función de envío (Submit)
  const onSubmit = async (data) => {
    setError(null);
    try {
      if (isEditing) {
        // Modo Edición: Usamos PUT y el DTO de actualización
        // No enviamos el 'run' ni 'correo' si no se pueden cambiar
        const updateData = {
          nombre: data.nombre,
          apellidos: data.apellidos,
          role: data.role,
          telefono: data.telefono,
          region: data.region,
          comuna: data.comuna,
          direccion: data.direccion,
          // (No enviamos la contraseña si está vacía)
        };
        await apiClient.put(`/usuarios/${id}`, updateData);
      } else {
        // Modo Creación: Usamos POST (el endpoint que creamos)
        await apiClient.post('/usuarios', data);
      }
      navigate('/admin/usuarios'); // Redirigimos a la lista
    } catch (err) {
      console.error(err);
      setError('Error al guardar el usuario. ' + (err.response?.data?.message || err.message));
    }
  };

  if (loadingData) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <Card.Title as="h2" className="text-center">
                {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
              </Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  {/* --- ROL (¡El más importante!) --- */}
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="role">
                      <Form.Label>Rol del Usuario</Form.Label>
                      <Form.Select {...register('role')} isInvalid={!!errors.role}>
                        <option value="">Seleccione un rol...</option>
                        <option value="ADMIN">Administrador</option>
                        <option value="VENDOR">Vendedor</option>
                        <option value="CLIENT">Cliente</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.role?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {/* --- DATOS PERSONALES --- */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="nombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" {...register('nombre')} isInvalid={!!errors.nombre} />
                      <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="apellidos">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control type="text" {...register('apellidos')} isInvalid={!!errors.apellidos} />
                      <Form.Control.Feedback type="invalid">{errors.apellidos?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="run">
                      <Form.Label>RUN</Form.Label>
                      <Form.Control type="text" {...register('run')} isInvalid={!!errors.run} disabled={isEditing} />
                      <Form.Control.Feedback type="invalid">{errors.run?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="telefono">
                      <Form.Label>Teléfono (Opcional)</Form.Label>
                      <Form.Control type="text" {...register('telefono')} isInvalid={!!errors.telefono} />
                      <Form.Control.Feedback type="invalid">{errors.telefono?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* --- DATOS DE ACCESO --- */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="correo">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control type="email" {...register('correo')} isInvalid={!!errors.correo} disabled={isEditing} />
                      <Form.Control.Feedback type="invalid">{errors.correo?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="pass">
                      <Form.Label>{isEditing ? 'Nueva Contraseña (Opcional)' : 'Contraseña'}</Form.Label>
                      <Form.Control type="password" {...register('pass')} isInvalid={!!errors.pass} />
                      <Form.Control.Feedback type="invalid">{errors.pass?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* --- DIRECCIÓN --- */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="region">
                      <Form.Label>Región</Form.Label>
                      <Form.Select {...register('region')} isInvalid={!!errors.region}>
                        <option value="">Seleccione región...</option>
                        {regiones.map(r => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.region?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="comuna">
                      <Form.Label>Comuna</Form.Label>
                      <Form.Select {...register('comuna')} isInvalid={!!errors.comuna} disabled={comunas.length === 0}>
                        <option value="">Seleccione comuna...</option>
                        {comunas.map(c => <option key={c} value={c}>{c}</option>)}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.comuna?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="direccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control type="text" {...register('direccion')} isInvalid={!!errors.direccion} />
                  <Form.Control.Feedback type="invalid">{errors.direccion?.message}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" size="sm" /> : (isEditing ? 'Actualizar Usuario' : 'Guardar Usuario')}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminUserFormPage;