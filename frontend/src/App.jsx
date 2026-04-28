import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Activos from './pages/Activos';
import Empleados from './pages/Empleados';
import Asignaciones from './pages/Asignaciones';
import Sedes from './pages/Sedes';
import Departamentos from './pages/Departamentos';
import Reportes from './pages/Reportes';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Actividad from './pages/Actividad';

function AppRoutes() {
  const { user } = useAuth();
  if (!user) return <Routes><Route path="*" element={<Login />} /></Routes>;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/activos" element={<Activos />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/asignaciones" element={<Asignaciones />} />
        <Route path="/sedes" element={<Sedes />} />
        <Route path="/departamentos" element={<Departamentos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/actividad" element={<Actividad />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
