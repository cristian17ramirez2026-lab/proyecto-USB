import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password, passwordConfirm);
      navigate('/login', { state: { success: 'Registro exitoso. Inicia sesión.' } });
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.detail) {
          setError(data.detail);
        } else {
          setFieldErrors(data);
        }
      } else {
        setError('Error de conexión con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Registro</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese un nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!fieldErrors.username}
                    required
                  />
                  {fieldErrors.username && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.username.join(' ')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!fieldErrors.email}
                    required
                  />
                  {fieldErrors.email && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.email.join(' ')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!fieldErrors.password}
                    required
                  />
                  {fieldErrors.password && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.password.join(' ')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordConfirm">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repita la contraseña"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span>¿Ya tienes cuenta? </span>
                <Link to="/login">Inicia sesión</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
