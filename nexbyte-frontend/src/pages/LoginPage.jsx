
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

// 1. Esquema de validación con Zod, traduciendo las reglas de tu validar-login.js
const loginSchema = z.object({
  correo: z.string().email('Formato de correo inválido.')
    .refine(email => /(duoc.cl|profesor.duoc.cl|gmail.com)$/i.test(email), {
      message: 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com'
    }),
    pass: z.string()
    .min(4, 'La contraseña debe tener entre 4 y 10 caracteres.')
    .max(10, 'La contraseña debe tener entre 4 y 10 caracteres.'), // <-- MENSAJE AÑADIDO
})

function LoginPage() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  // Estado para un error general (ej. "Credenciales incorrectas")
  const [loginError, setLoginError] = React.useState('');

  const onSubmit = (data) => {
    // Lógica de autenticación irá aquí.
    // Por ahora, simulamos que siempre falla para mostrar el mensaje de error.
    console.log('Intentando iniciar sesión con:', data);
    setLoginError('Correo o contraseña incorrectos (simulación).');
    
    // En un futuro, si el login es exitoso:
    // navigate('/productos'); 
  };

  return (
    <Container className="section auth">
      <Card className="card soft">
        <Card.Body>
          <div className="text-center">
            <h1>Iniciar sesión</h1>
            <p className="muted">¿No tienes una cuenta? <Link to="/registro">Crea una aquí</Link></p>
          </div>
          
          {loginError && <Alert variant="danger">{loginError}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" {...register('correo')} isInvalid={!!errors.correo} />
              <Form.Control.Feedback type="invalid">{errors.correo?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" {...register('pass')} isInvalid={!!errors.pass} />
              <Form.Control.Feedback type="invalid">{errors.pass?.message}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">Iniciar sesión</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;