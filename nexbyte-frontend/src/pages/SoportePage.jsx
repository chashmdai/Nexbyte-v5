import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import regionesData from '../data/regiones.js';
import { sendSupportRequest } from '../services/apiService';
import { useToast } from '../components/ToastProvider.jsx';

/* ---------------- Helpers ---------------- */
const formatTel = (val) => {
  const nums = (val || '').replace(/\D/g, '');
  if (!nums) return '';
  const first = nums[0] || '';
  const mid = nums.slice(1, 5);
  const end = nums.slice(5, 9);
  return [first, mid && ' ' + mid, end && ' ' + end].filter(Boolean).join('');
};

// UI labels -> Enum backend
const equipoToEnum = (v) => ({
  'PC de escritorio': 'PC_ESCRITORIO',
  'Notebook': 'NOTEBOOK',
  'Consola': 'CONSOLA',
  'Otro': 'OTRO',
}[v] || 'OTRO');

/* -------------- Validación Zod -------------- */
const schema = z.object({
  nombreCliente: z.string().min(2, 'Tu nombre es requerido.').max(100),
  emailCliente: z.string().email('Correo inválido.')
    .refine((e) => /(duoc.cl|profesor.duoc.cl|gmail.com)$/i.test(e), {
      message: 'Solo @duoc.cl, @profesor.duoc.cl o @gmail.com'
    }),
  telefonoCliente: z.string().optional().refine(t => !t || /^9\s\d{4}\s\d{4}$/.test(t), {
    message: 'Formato: 9 XXXX XXXX'
  }),
  region: z.string().min(1, 'Selecciona región.'),
  comuna: z.string().min(1, 'Selecciona comuna.'),
  direccion: z.string().optional().or(z.literal('')),
  equipo: z.enum(['PC de escritorio', 'Notebook', 'Consola', 'Otro'], {
    errorMap: () => ({ message: 'Selecciona el equipo.' })
  }),
  prioridad: z.enum(['NORMAL', 'ALTA', 'CRITICA']).default('NORMAL'),
  serviciosRequeridos: z.array(z.string()).min(1, 'Elige al menos un servicio.'),
  descripcionProblema: z.string().min(10, 'Cuéntanos más (≥10 caracteres).').max(600),
  company: z.string().max(0, { message: 'Campo oculto inválido' }).optional(), // honeypot
});

export default function SoportePage() {
  const toast = useToast();
  const [comunas, setComunas] = useState([]);

  const {
    register, handleSubmit, watch, setValue, reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      prioridad: 'NORMAL',
      serviciosRequeridos: [],
    }
  });

  const selectedRegion = watch('region') || '';
  const telVal = watch('telefonoCliente') || '';

  useEffect(() => {
    if (selectedRegion) {
      const r = regionesData.find((x) => x.region === selectedRegion);
      setComunas(r ? r.comunas : []);
      setValue('comuna', '');
    } else {
      setComunas([]);
      setValue('comuna', '');
    }
  }, [selectedRegion, setValue]);

  const onSubmit = async (data) => {
    if (data.company) return; // honeypot

    // Mapear equipo al ENUM de backend
    const equipoEnum = equipoToEnum(data.equipo);

    // Payload EXACTO que espera tu DTO en backend
    const payload = {
      nombreCliente: data.nombreCliente,
      emailCliente: data.emailCliente,
      telefonoCliente: data.telefonoCliente || null,
      region: data.region,
      comuna: data.comuna,
      direccion: data.direccion || null,
      equipo: equipoEnum,                         // << enum mapeado
      prioridad: data.prioridad.toUpperCase(),    // << NORMAL/ALTA/CRITICA
      serviciosRequeridos: data.serviciosRequeridos,
      descripcionProblema: data.descripcionProblema,
    };

    try {
      await sendSupportRequest(payload);
      toast.success({
        title: 'Solicitud enviada',
        message: 'Te contactaremos con una cotización estimada.',
      });
      reset({
        nombreCliente: '',
        emailCliente: '',
        telefonoCliente: '',
        region: '',
        comuna: '',
        direccion: '',
        equipo: 'PC de escritorio',
        prioridad: 'NORMAL',
        serviciosRequeridos: [],
        descripcionProblema: ''
      });
      setComunas([]);
    } catch (err) {
      console.error(err);
      let msg = 'No pudimos enviar tu solicitud. Inténtalo más tarde.';
      if (err?.response?.data?.message) msg = err.response.data.message;
      toast.error({ title: 'Error al enviar', message: msg });
    }
  };

  const handleClearForm = () => {
    reset({
      nombreCliente: '',
      emailCliente: '',
      telefonoCliente: '',
      region: '',
      comuna: '',
      direccion: '',
      equipo: 'PC de escritorio',
      prioridad: 'NORMAL',
      serviciosRequeridos: [],
      descripcionProblema: ''
    });
    setComunas([]);
  };

  return (
    <Container as="main" className="section">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <span>Soporte</span>
      </nav>

      <div className="grid" style={{ gridTemplateColumns: 'minmax(320px, 420px) 1fr', gap: 16 }}>
        {/* Lateral informativo */}
        <div className="grid" style={{ gap: 16 }}>
          <Card className="card soft">
            <Card.Body>
              <h1 style={{ margin: 0 }}>Soporte técnico</h1>
              <p className="meta" style={{ margin: '6px 0 0' }}>
                Diagnóstico y ayuda para equipos y componentes.
              </p>
            </Card.Body>
          </Card>

          <Card className="card soft">
            <Card.Body>
              <h3 style={{ marginTop: 0 }}>¿Qué hacemos?</h3>
              <ul className="muted" style={{ margin: 0, paddingLeft: '1.1rem' }}>
                <li>Diagnóstico: temperaturas, almacenamiento, memoria y drivers.</li>
                <li>Mantención preventiva: limpieza, pasta térmica, flujo de aire.</li>
                <li>Instalación/upgrade: RAM, SSD, GPU, BIOS/Firmware.</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="card soft">
            <Card.Body>
              <h3 style={{ marginTop: 0 }}>Cómo funciona</h3>
              <ol className="muted" style={{ margin: 0, paddingLeft: '1.1rem' }}>
                <li>Completa el formulario con tu problema.</li>
                <li>Te respondemos con una cotización estimada.</li>
                <li>Agendamos retiro/visita o te indicamos el punto de atención.</li>
              </ol>
            </Card.Body>
          </Card>
        </div>

        {/* Formulario */}
        <Card className="card soft">
          <Card.Body>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-5000px', opacity: 0, width: 0, height: 0 }}
                {...register('company')}
              />

              {/* Contacto */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      autoComplete="name"
                      {...register('nombreCliente')}
                      isInvalid={!!errors.nombreCliente}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombreCliente?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Correo *</Form.Label>
                    <Form.Control
                      type="email"
                      autoComplete="email"
                      {...register('emailCliente')}
                      isInvalid={!!errors.emailCliente}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.emailCliente?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono (opcional)</Form.Label>
                    <Form.Control
                      type="text"
                      inputMode="numeric"
                      placeholder="9 XXXX XXXX"
                      value={telVal}
                      onChange={(e) =>
                        setValue('telefonoCliente', formatTel(e.target.value), { shouldValidate: true })
                      }
                      isInvalid={!!errors.telefonoCliente}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.telefonoCliente?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Ubicación */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Región *</Form.Label>
                    <Form.Select
                      {...register('region')}
                      isInvalid={!!errors.region}
                      defaultValue=""
                    >
                      <option value="">Seleccione…</option>
                      {regionesData.map((r) => (
                        <option key={r.region} value={r.region}>{r.region}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.region?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Comuna *</Form.Label>
                    <Form.Select
                      {...register('comuna')}
                      isInvalid={!!errors.comuna}
                      disabled={!selectedRegion}
                      defaultValue=""
                    >
                      <option value="">Seleccione…</option>
                      {comunas.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.comuna?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Dirección (opcional)</Form.Label>
                <Form.Control type="text" {...register('direccion')} />
              </Form.Group>

              {/* Equipo + prioridad */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Equipo *</Form.Label>
                    <Form.Select
                      {...register('equipo')}
                      isInvalid={!!errors.equipo}
                      defaultValue="PC de escritorio"
                    >
                      <option value="PC de escritorio">PC de escritorio</option>
                      <option value="Notebook">Notebook</option>
                      <option value="Consola">Consola</option>
                      <option value="Otro">Otro</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.equipo?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Prioridad</Form.Label>
                    <Form.Select {...register('prioridad')} defaultValue="NORMAL">
                      <option value="NORMAL">Normal</option>
                      <option value="ALTA">Alta</option>
                      <option value="CRITICA">Crítica</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Servicios (chips) */}
              <Form.Group className="mb-3">
                <Form.Label>Servicios requeridos *</Form.Label>
                <div className="chips">
                  {[
                    'Diagnóstico',
                    'Mantención preventiva',
                    'Instalación/Upgrade',
                    'Respaldo de datos',
                    'Formateo/OS limpio'
                  ].map((svc) => (
                    <label key={svc} className="chip">
                      <input type="checkbox" value={svc} {...register('serviciosRequeridos')} />
                      <span>{svc}</span>
                    </label>
                  ))}
                </div>
                {errors.serviciosRequeridos && (
                  <div className="form-text" style={{ color: 'var(--err)' }}>
                    {errors.serviciosRequeridos.message}
                  </div>
                )}
              </Form.Group>

              {/* Problema */}
              <Form.Group className="mb-2">
                <Form.Label>Describe el problema *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Síntomas, cuándo ocurre, cambios recientes, etc."
                  {...register('descripcionProblema')}
                  isInvalid={!!errors.descripcionProblema}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.descripcionProblema?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Botones */}
              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button type="button" className="btn-ghost" variant="ghost" onClick={handleClearForm}>
                  Limpiar
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando…' : 'Solicitar cotización'}
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
