import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import apiService from '../services/apiService';

function EmpleadoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    departamento: '',
    cargo: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    const fetchEmpleado = async () => {
      try {
        const { data } = await apiService.get(`empleados/${id}/`);
        setFormData({
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          cedula: data.cedula || '',
          departamento: data.departamento || '',
          cargo: data.cargo || '',
        });
      } catch (err) {
        setGeneralError('Error al cargar los datos del empleado.');
      } finally {
        setFetching(false);
      }
    };
    fetchEmpleado();
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
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio.';
    if (!formData.cedula.trim()) newErrors.cedula = 'La cédula es obligatoria.';
    if (!formData.departamento.trim()) newErrors.departamento = 'El departamento es obligatorio.';
    if (!formData.cargo.trim()) newErrors.cargo = 'El cargo es obligatorio.';
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
      if (isEdit) {
        await apiService.put(`empleados/${id}/`, formData);
      } else {
        await apiService.post('empleados/', formData);
      }
      navigate('/empleados');
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
          setGeneralError('Error al guardar el empleado. Verifique los datos.');
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
                {isEdit ? 'Editar Empleado' : 'Nuevo Empleado'}
              </Card.Title>

              {generalError && <Alert variant="danger">{generalError}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="nombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        isInvalid={!!errors.nombre}
                        placeholder="Nombre del empleado"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="apellido">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        isInvalid={!!errors.apellido}
                        placeholder="Apellido del empleado"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.apellido}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="cedula">
                  <Form.Label>Cédula</Form.Label>
                  <Form.Control
                    type="text"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleChange}
                    isInvalid={!!errors.cedula}
                    placeholder="Cédula de identidad"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cedula}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="departamento">
                      <Form.Label>Departamento</Form.Label>
                      <Form.Control
                        type="text"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        isInvalid={!!errors.departamento}
                        placeholder="Departamento"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.departamento}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="cargo">
                      <Form.Label>Cargo</Form.Label>
                      <Form.Control
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        isInvalid={!!errors.cargo}
                        placeholder="Cargo del empleado"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cargo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/empleados')}
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

export default EmpleadoForm;
