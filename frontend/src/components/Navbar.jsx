import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/dashboard">Inventario</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-navbar" />
        <BsNavbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/activos">Activos</Nav.Link>
            <Nav.Link as={Link} to="/empleados">Empleados</Nav.Link>
            <Nav.Link as={Link} to="/asignaciones">Asignaciones</Nav.Link>
            <Nav.Link as={Link} to="/reportes">Reportes</Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <BsNavbar.Text className="me-3">
              {user.username} ({user.rol})
            </BsNavbar.Text>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default AppNavbar;
