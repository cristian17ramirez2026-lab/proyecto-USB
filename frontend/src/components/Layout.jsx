import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

const menu = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/activos', icon: '💻', label: 'Activos' },
  { to: '/empleados', icon: '👥', label: 'Empleados' },
  { to: '/asignaciones', icon: '🔄', label: 'Asignaciones' },
  { to: '/sedes', icon: '🏢', label: 'Sedes' },
  { to: '/departamentos', icon: '🏛️', label: 'Departamentos' },
  { to: '/reportes', icon: '📈', label: 'Reportes' },
];

const Logo = () => (
  <svg width="30" height="30" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="18" fill="#FF0000"/>
    <path d="M50 15 C35 35, 25 50, 30 70 C32 78, 40 85, 50 85 C60 85, 68 78, 70 70 C75 50, 65 35, 50 15Z" fill="#003087"/>
    <path d="M50 30 C42 42, 37 52, 40 65 C41 70, 45 75, 50 75 C55 75, 59 70, 60 65 C63 52, 58 42, 50 30Z" fill="#FFFFFF"/>
    <circle cx="50" cy="58" r="8" fill="#FF0000"/>
  </svg>
);

const NavItem = ({ to, icon, label }) => (
  <NavLink to={to} className="d-flex align-items-center gap-2 px-3 py-2 text-decoration-none"
    style={({ isActive }) => ({ borderLeft: isActive ? '3px solid #FF0000' : '3px solid transparent', background: isActive ? 'rgba(255,0,0,.15)' : 'transparent', fontSize: '.84rem', color: isActive ? '#FFFFFF' : 'rgba(255,255,255,.55)' })}>
    <span>{icon}</span> {label}
  </NavLink>
);

const SectionTitle = ({ title }) => (
  <div style={{ padding: '10px 20px 4px', fontSize: '.58rem', textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(255,255,255,.25)', fontWeight: 700 }}>{title}</div>
);

export default function Layout({ children }) {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };
  const sedeName = user?.sede_id ? DB.getSede(user.sede_id)?.nombre : null;

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <aside className="text-white d-flex flex-column" style={{ width: 250, background: '#003087', position: 'fixed', top: 0, bottom: 0, overflowY: 'hidden' }}>
        {/* Logo */}
        <div className="p-3 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,.1)' }}>
          <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
            <Logo />
          </div>
          <div style={{ fontSize: '.58rem', letterSpacing: 1, color: 'rgba(255,255,255,.4)', lineHeight: 1.4, fontWeight: 700 }}>SISTEMA DE GESTION<br/>DE INVENTARIO Y CONTROL<br/>DE ACTIVOS EMPRESARIALES</div>
        </div>

        {/* Usuario */}
        <div className="px-3 py-2 d-flex align-items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,.1)' }}>
          <div className="rounded-2 d-flex align-items-center justify-content-center fw-bold" style={{ width: 30, height: 30, background: '#FF0000', fontSize: '.75rem', flexShrink: 0 }}>{user?.username?.[0]?.toUpperCase()}</div>
          <div style={{ minWidth: 0 }}>
            <div className="fw-bold text-truncate" style={{ fontSize: '.8rem' }}>{user?.username}</div>
            <small className="text-truncate d-block" style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.4)' }}>{user?.rol}{sedeName ? ' | ' + sedeName : ''}</small>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-grow-1 py-1" style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}>
          <SectionTitle title="PRINCIPAL" />
          <NavItem to="/dashboard" icon="📊" label="Dashboard" />
          <SectionTitle title="INVENTARIO" />
          {menu.slice(1, 4).map(m => <NavItem key={m.to} {...m} />)}
          <SectionTitle title="ORGANIZACION" />
          {menu.slice(4, 6).map(m => <NavItem key={m.to} {...m} />)}
          <SectionTitle title="ANALISIS" />
          {menu.slice(6).map(m => <NavItem key={m.to} {...m} />)}
          {isAdmin && (
            <div>
              <SectionTitle title="ADMINISTRACION" />
              <NavItem to="/usuarios" icon="👤" label="Usuarios" />
              <NavItem to="/actividad" icon="📋" label="Actividad" />
            </div>
          )}
        </nav>

        {/* Boton Cerrar Sesion */}
        <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,.1)', flexShrink: 0 }}>
          <button onClick={handleLogout} className="btn btn-sm w-100 d-flex align-items-center justify-content-center gap-2" style={{ background: '#FF0000', color: '#FFFFFF', border: 'none', padding: '8px 0', fontWeight: 600, fontSize: '.82rem' }}>
            🚪 Cerrar Sesion
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-grow-1" style={{ marginLeft: 250, background: '#FFFFFF', minHeight: '100vh' }}>
        <div className="px-4 py-2 d-flex justify-content-between align-items-center" style={{ position: 'sticky', top: 0, zIndex: 10, background: '#FFFFFF', borderBottom: '2px solid #003087' }}>
          <div className="d-flex align-items-center gap-2">
            <Logo />
            <div>
              <h6 className="mb-0 fw-bold" style={{ color: '#003087', fontSize: '.9rem' }}>Sistema de Gestion de Inventario</h6>
              <small style={{ color: '#999', fontSize: '.65rem' }}>Control de Activos Empresariales</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <small style={{ color: '#999' }}>{new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</small>
            <span className="badge" style={{ background: user?.rol === 'ADMIN' ? '#FF0000' : '#003087' }}>{user?.rol}</span>
          </div>
        </div>
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
