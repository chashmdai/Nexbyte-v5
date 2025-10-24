// src/pages/ContactPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container, Form, Button, Card, Row, Col, InputGroup
} from 'react-bootstrap';
import { sendContactMessage } from '../services/apiService';
import { useToast } from '../components/ToastProvider';

// Validación con Zod
const contactSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido.').max(100, 'Máximo 100 caracteres.'),
  email: z.string().email('Formato de correo inválido.').max(100)
    .refine(email => /(duoc.cl|profesor.duoc.cl|gmail.com)$/i.test(email), {
      message: 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com'
    }),
  mensaje: z.string().min(1, 'El mensaje es requerido.').max(500, 'Máximo 500 caracteres.'),
  // Honeypot anti-spam (debe quedar vacío)
  company: z.string().max(0).optional(),
});

function ContactPage() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const mensaje = watch('mensaje') || '';
  const maxLen = 500;

  const onSubmit = async (data) => {
    // Si el honeypot trae algo, ignoramos silenciosamente
    if (data.company && data.company.trim() !== '') return;

    try {
      await sendContactMessage({
        nombre: data.nombre,
        email: data.email,
        mensaje: data.mensaje,
      });

      toast.success({
        title: 'Mensaje enviado',
        message: '¡Gracias! Te responderemos a la brevedad.',
      });
      reset();
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      toast.error({
        title: 'No pudimos enviar tu mensaje',
        message: 'Inténtalo nuevamente más tarde.',
      });
    }
  };

  return (
    <Container as="main" className="section">
      {/* Encabezado */}
      <div className="text-center mb-4">
        <h1>Contacto</h1>
        <p className="muted">¿Tienes dudas? Escríbenos y te respondemos a la brevedad.</p>
      </div>

      {/* Layout 2 columnas */}
      <div className="grid" style={{ gridTemplateColumns: 'minmax(320px, 420px) 1fr', gap: 16 }}>
        {/* Columna izquierda: info/FAQ/mapa */}
        <div className="grid" style={{ gap: 16 }}>
          <Card className="card soft">
            <Card.Body>
              <h3 style={{ marginTop: 0 }}>Ayuda rápida</h3>
              <p className="muted" style={{ marginBottom: 12 }}>
                Puedes contactarnos por los siguientes medios:
              </p>
              <ul className="muted" style={{ margin: 0, paddingLeft: '1.1rem' }}>
                <li>Email: <a href="mailto:soporte@nexbyte.cl">soporte@nexbyte.cl</a></li>
                <li>WhatsApp: <a href="https://wa.me/56911112222" target="_blank" rel="noreferrer">+56 9 1111 2222</a></li>
                <li>Horario: Lunes a Viernes, 9:00 a 18:00</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="card soft">
            <Card.Body>
              <h3 style={{ marginTop: 0 }}>Preguntas frecuentes</h3>
              <details className="muted" style={{ marginBottom: 8 }}>
                <summary>¿Cuánto demora el envío?</summary>
                <div style={{ marginTop: 6 }}>
                  Entre 24 y 72 horas hábiles según tu comuna/ciudad.
                </div>
              </details>
              <details className="muted" style={{ marginBottom: 8 }}>
                <summary>¿Puedo devolver un producto?</summary>
                <div style={{ marginTop: 6 }}>
                  Tienes 10 días para arrepentimiento y 6 meses por garantía legal.
                </div>
              </details>
              <details className="muted">
                <summary>¿Qué medios de pago aceptan?</summary>
                <div style={{ marginTop: 6 }}>
                  Tarjetas débito/crédito y transferencias.
                </div>
              </details>
            </Card.Body>
          </Card>

          <Card className="card soft">
            <Card.Body>
              <h3 style={{ marginTop: 0 }}>Ubicación</h3>
              <figure style={{ borderRadius: 10, overflow: 'hidden', margin: 0 }}>
                {/* Placeholder; reemplaza por un mapa real cuando quieras */}
                <img
                  src="/assets/img/placeholder/post-4.jpg"
                  alt="Mapa/Ubicación Nexbyte"
                  style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                  className="is-loaded"
                />
              </figure>
            </Card.Body>
          </Card>
        </div>

        {/* Columna derecha: formulario */}
        <Card className="card soft">
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Honeypot invisible para bots */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-5000px', opacity: 0, height: 0, width: 0 }}
                aria-hidden="true"
                {...register('company')}
              />

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre completo *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tu nombre"
                      autoComplete="name"
                      autoFocus
                      {...register('nombre')}
                      isInvalid={!!errors.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombre?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Correo *</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="tu@duoc.cl"
                      autoComplete="email"
                      {...register('email')}
                      isInvalid={!!errors.email}
                    />
                    <Form.Text className="muted">
                      Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-2">
  <Form.Label>Mensaje *</Form.Label>
  <InputGroup className="w-100">
    <Form.Control
      as="textarea"
      rows={6}
      className="w-100"
      style={{ minWidth: '100%' }}
      placeholder="Cuéntanos en qué podemos ayudarte…"
      {...register('mensaje')}
      isInvalid={!!errors.mensaje}
    />
  </InputGroup>
  <div className="muted" style={{ marginTop: 6, fontSize: '.92rem' }}>
    {mensaje.length}/{maxLen}
  </div>
  <Form.Control.Feedback type="invalid">
    {errors.mensaje?.message}
  </Form.Control.Feedback>
</Form.Group>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button
                  variant="ghost"
                  className="btn-ghost"
                  type="button"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                >
                  Limpiar
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando…' : 'Enviar mensaje'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default ContactPage;
