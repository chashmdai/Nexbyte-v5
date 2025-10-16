import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { sendContactMessage } from '../services/apiService';

// 1. Esquema de validación con Zod, basado en tu validar-contacto.js
const contactSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido.').max(100, 'Máximo 100 caracteres.'),
  email: z.string().email('Formato de correo inválido.').max(100)
    .refine(email => /(duoc.cl|profesor.duoc.cl|gmail.com)$/i.test(email), {
      message: 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com'
    }),
  mensaje: z.string().min(1, 'El mensaje es requerido.').max(500, 'Máximo 500 caracteres.'),
});

function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    try {
      await sendContactMessage(data);
      setIsSuccess(true);
      reset(); // Limpia el formulario
      setTimeout(() => setIsSuccess(false), 3000); // Oculta el mensaje después de 3 segundos
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      // Aquí podrías mostrar un error si la API falla
    }
  };

  return (
    <Container className="section auth">
      <div className="text-center mb-4">
        <h1>Contacto</h1>
        <p className="muted">¿Tienes alguna duda? Escríbenos.</p>
      </div>
      <Card className="card soft">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo *</Form.Label>
                  <Form.Control type="text" {...register('nombre')} isInvalid={!!errors.nombre} />
                  <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo *</Form.Label>
                  <Form.Control type="email" {...register('email')} isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Mensaje *</Form.Label>
              <Form.Control as="textarea" rows={6} {...register('mensaje')} isInvalid={!!errors.mensaje} />
              <Form.Control.Feedback type="invalid">{errors.mensaje?.message}</Form.Control.Feedback>
            </Form.Group>

            <div className="text-center mt-4">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </div>
            
            {isSuccess && (
              <Alert variant="success" className="mt-3 text-center">
                ¡Gracias! Tu mensaje fue enviado.
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ContactPage;