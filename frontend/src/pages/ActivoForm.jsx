import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import apiService from '../services/apiService';

function ActivoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    tipo: '',
    serial: '',
    valor: '',
    fecha_compra: '',
    estado: 'DISPONIBLE',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    const fetchActivo = async () => {
      try {
        const { data } = await apiService.get(`activos/${id}/`);
        setFormData({
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          tipo: data.tipo || '',
          serial: data.serial || '',
          valor: data.valor || '',
          fecha_compra: data.fecha_compra || '',
          estado: data.estado || 'DISPONIBLE',
        });
      } catch (err) {
        setGeneralError('Error al cargar los datos del activo.');
      } finally {
        setFetching(false);
      }
    };
    fetchActivo();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.tipo.trim()) newErrors.tipo = 'El tipo es obligatorio.';
    if (!formData.serial.trim()) newErrors.serial = 'El serial es obligatorio.';
    if (!formData.valor || Number(formData.valor) < 0.01)
      newErrors.valor = 'El valor debe ser mayor a 0.';
    if (!formData.fecha_compra) newErrors.fecha_compra = 'La fecha de compra es obligatoria.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData };
      if (!isEdit) {
        delete payload.estado;
      }

      if (isEdit) {
        await apiService.put(`activos/${id}/`, payload);
      } else {
        await apiService.post('activos/', payload);
      }
      navigate('/activos');
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        const fieldErrors = {};
        let hasFieldError = false;
        for (const [key, value] of Object.entries(data)) {
          if (key === 'detail') {
            setGeneralError(value);
          } else {
            fieldErrors[key] = Array.isArray(value) ? value.join(' ') : value;
            hasFieldError = true;
          }
        }
        if (hasFieldError) setErrors(fieldErrors);
        if (!hasFieldError && !data.detail) {
          setGeneralError('Error al guardar el activo. Verifique los datos.');
        }
      } else {
        setGeneralError('Error de conexión con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">
                {isEdit ? 'Editar Activo' : 'Nuevo Activo'}
              </Card.Title>

              {generalError && <Alert variant="danger">{generalError}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    isInvalid={!!errors.nombre}
                    placeholder="Nombre del activo"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    isInvalid={!!errors.descripcion}
                    placeholder="Descripción del activo (opcional)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descripcion}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="tipo">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control
                        type="text"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        isInvalid={!!errors.tipo}
                        placeholder="Ej: Laptop, Monitor, Silla"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.tipo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="serial">
                      <Form.Label>Serial</Form.Label>
                      <Form.Control
                        type="text"
                        name="serial"
                        value={formData.serial}
                        onChange={handleChange}
                        isInvalid={!!errors.serial}
                        placeholder="Serial único del activo"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.serial}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="valor">
                      <Form.Label>Valor</Form.Label>
                      <Form.Control
                        type="number"
                        name="valor"
                        value={formData.valor}
                        onChange={handleChange}
                        isInvalid={!!errors.valor}
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.valor}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="fecha_compra">
                      <Form.Label>Fecha de Compra</Form.Label>
                      <Form.Control
                        type="date"
                        name="fecha_compra"
                        value={formData.fecha_compra}
                        onChange={handleChange}
                        isInvalid={!!errors.fecha_compra}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fecha_compra}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {isEdit && (
                  <Form.Group className="mb-3" controlId="estado">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      isInvalid={!!errors.estado}
                    >
                      <option value="DISPONIBLE">Disponible</option>
                      <option value="ASIGNADO">Asignado</option>
                      <option value="DAÑADO">Dañado</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.estado}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/activos')}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
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

export default ActivoForm;
