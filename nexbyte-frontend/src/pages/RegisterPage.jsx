import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

// Importamos los datos de las regiones
import regionesData from '../data/regiones.js';

// ===================================================================
// 1. Helper para la validación del RUN (tomado de tu validar-registro.js)
// ===================================================================
function isValidRUN(run) {
  // eslint-disable-next-line no-useless-escape
  const r = String(run || "").replace(/[.\-]/g, "").trim().toUpperCase();
  if (!/^\d{7,8}[0-9K]$/.test(r)) return false;
  const body = r.slice(0, -1);
  const dv = r.slice(-1);
  let sum = 0, mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const rest = 11 - (sum % 11);
  const dvCalc = rest === 11 ? "0" : rest === 10 ? "K" : String(rest);
  return dv === dvCalc;
}

// ===================================================================
// 2. Esquema de Validación con Zod (traducción de todas tus reglas)
// ===================================================================
const registerSchema = z.object({
  run: z.string().refine(isValidRUN, { message: 'El RUN ingresado no es válido.' }),
  nombre: z.string().min(2, 'El nombre es requerido.').max(100),
  apellidos: z.string().min(2, 'El apellido es requerido.').max(100),
  correo: z.string().email('Formato de correo inválido.').max(100)
    .refine(email => /(duoc.cl|profesor.duoc.cl|gmail.com)$/i.test(email), {
      message: 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com'
    }),
  telefono: z.string().optional().refine(tel => !tel || /^9\s\d{4}\s\d{4}$/.test(tel), {
    message: 'Formato de teléfono debe ser 9 XXXX XXXX'
  }),
  pass: z.string().min(4, 'La contraseña debe tener entre 4 y 10 caracteres.').max(10),
  pass2: z.string().min(4, 'La confirmación es requerida.'),
  region: z.string().min(1, 'Debes seleccionar una región.'),
  comuna: z.string().min(1, 'Debes seleccionar una comuna.'),
  direccion: z.string().min(3, 'La dirección es requerida.'),
}).refine(data => data.pass === data.pass2, {
  message: 'Las contraseñas no coinciden.',
  path: ['pass2'], // Muestra el error en el campo de confirmación
});

function RegisterPage() {
  const navigate = useNavigate();
  const [comunas, setComunas] = useState([]);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Observamos el valor del campo 'region' para actualizar las comunas
  const selectedRegion = watch('region');

  useEffect(() => {
    if (selectedRegion) {
      const regionData = regionesData.find(r => r.region === selectedRegion);
      setComunas(regionData ? regionData.comunas : []);
    } else {
      setComunas([]);
    }
  }, [selectedRegion]);

  const onSubmit = (data) => {
    // Aquí es donde llamaríamos al servicio para registrar al usuario en el backend.
    // Por ahora, simulamos el éxito.
    console.log('Datos de registro válidos:', data);
    alert('¡Registro exitoso! Redirigiendo al login...');
    navigate('/login');
  };

  return (
    <Container className="section auth">
      <div className="text-center">
        <h1>Crear cuenta</h1>
        <p className="muted">Los campos marcados con * son obligatorios.</p>
      </div>
      <Card className="card soft">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>RUN *</Form.Label>
              <Form.Control type="text" placeholder="Ej: 19011022K" {...register('run')} isInvalid={!!errors.run} />
              <Form.Control.Feedback type="invalid">{errors.run?.message}</Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control type="text" {...register('nombre')} isInvalid={!!errors.nombre} />
                  <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellidos *</Form.Label>
                  <Form.Control type="text" {...register('apellidos')} isInvalid={!!errors.apellidos} />
                  <Form.Control.Feedback type="invalid">{errors.apellidos?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Correo *</Form.Label>
              <Form.Control type="email" placeholder="usuario@duoc.cl" {...register('correo')} isInvalid={!!errors.correo} />
              <Form.Text className="muted">Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com</Form.Text>
              <Form.Control.Feedback type="invalid">{errors.correo?.message}</Form.Control.Feedback>
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña *</Form.Label>
                  <Form.Control type="password" placeholder="4 a 10 caracteres" {...register('pass')} isInvalid={!!errors.pass} />
                  <Form.Control.Feedback type="invalid">{errors.pass?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar contraseña *</Form.Label>
                  <Form.Control type="password" {...register('pass2')} isInvalid={!!errors.pass2} />
                  <Form.Control.Feedback type="invalid">{errors.pass2?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Región *</Form.Label>
                  <Form.Select {...register('region')} isInvalid={!!errors.region}>
                    <option value="">Seleccione...</option>
                    {regionesData.map(r => <option key={r.region} value={r.region}>{r.region}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.region?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Comuna *</Form.Label>
                  <Form.Select {...register('comuna')} isInvalid={!!errors.comuna} disabled={!selectedRegion}>
                    <option value="">Seleccione...</option>
                    {comunas.map(c => <option key={c} value={c}>{c}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.comuna?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Dirección *</Form.Label>
              <Form.Control type="text" {...register('direccion')} isInvalid={!!errors.direccion} />
              <Form.Control.Feedback type="invalid">{errors.direccion?.message}</Form.Control.Feedback>
            </Form.Group>

            <div className="mt-4 d-flex justify-content-end gap-2">
              <Link to="/login" className="btn btn-ghost">Ya tengo cuenta</Link>
              <Button variant="primary" type="submit">Crear cuenta</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;