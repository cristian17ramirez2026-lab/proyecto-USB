import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Logo SVG InventPro (llama azul/roja similar a Olimpica)
const Logo = () => (
  <svg width="60" height="60" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="18" fill="#FF0000"/>
    <path d="M50 15 C35 35, 25 50, 30 70 C32 78, 40 85, 50 85 C60 85, 68 78, 70 70 C75 50, 65 35, 50 15Z" fill="#003087"/>
    <path d="M50 30 C42 42, 37 52, 40 65 C41 70, 45 75, 50 75 C55 75, 59 70, 60 65 C63 52, 58 42, 50 30Z" fill="#FFFFFF"/>
    <circle cx="50" cy="58" r="8" fill="#FF0000"/>
  </svg>
);

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = login(username, password);
    if (err) setError(err);
    else navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#CC0000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Card principal */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,.3)', width: '100%', maxWidth: 800, display: 'flex', overflow: 'hidden' }}>
        
        {/* Lado izquierdo - Formulario */}
        <div style={{ flex: 1, padding: '50px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
            <Logo />
            <div>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', display: 'block' }}>Sistema de Gestion de Inventario</span>
              <span style={{ fontSize: '.75rem', color: '#666' }}>Control de Activos Empresariales</span>
            </div>
          </div>

          {error && <div className="alert alert-danger py-2" style={{ fontSize: '.85rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Usuario</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #ddd', borderRadius: 8, fontSize: '.95rem', outline: 'none', fontFamily: 'inherit' }}
                onFocus={e => e.target.style.borderColor = '#003087'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Contrasena</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #ddd', borderRadius: 8, fontSize: '.95rem', outline: 'none', fontFamily: 'inherit' }}
                onFocus={e => e.target.style.borderColor = '#003087'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '14px', background: '#8B0000', color: '#FFFFFF', border: 'none', borderRadius: 8, fontSize: '.95rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: .5 }}>
              Ingresar
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: '.85rem', color: '#999' }}>Inicie sesion para continuar</p>
        </div>

        {/* Lado derecho - Visual */}
        <div style={{ width: 340, background: 'linear-gradient(135deg, #CC0000, #8B0000)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, position: 'relative', overflow: 'hidden' }}>
          {/* Decoracion de fondo */}
          <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'rgba(255,255,255,.05)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, background: 'rgba(255,255,255,.03)', borderRadius: '50%' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <svg width="100" height="100" viewBox="0 0 100 100" style={{ marginBottom: 20 }}>
              <path d="M50 10 C30 35, 18 55, 25 72 C28 82, 38 90, 50 90 C62 90, 72 82, 75 72 C82 55, 70 35, 50 10Z" fill="#003087" opacity=".9"/>
              <path d="M50 25 C38 42, 30 55, 35 68 C37 74, 43 80, 50 80 C57 80, 63 74, 65 68 C70 55, 62 42, 50 25Z" fill="#FFFFFF" opacity=".9"/>
              <circle cx="50" cy="60" r="10" fill="#FF0000"/>
            </svg>
            <h3 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem', marginBottom: 8 }}>Sistema de Gestion</h3>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.82rem', lineHeight: 1.5 }}>de Inventario y Control<br/>de Activos Empresariales</p>
          </div>

          <div style={{ position: 'absolute', bottom: 20, textAlign: 'center', width: '100%' }}>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.7rem' }}>Plataforma Empresarial</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem', marginTop: 24 }}>
        Sistema de Gestion de Inventario y Control de Activos &copy; 2026. Todos los derechos reservados.
      </p>

      {/* Info de credenciales (solo para demo) */}
      <div style={{ marginTop: 12, padding: '10px 20px', background: 'rgba(0,0,0,.2)', borderRadius: 8, fontSize: '.75rem', color: 'rgba(255,255,255,.9)', textAlign: 'center', maxWidth: 800 }}>
        <strong style={{ display: 'block', marginBottom: 4 }}>Usuarios de prueba:</strong>
        <span style={{ display: 'inline-block', margin: '0 8px' }}>admin / admin123</span>
        <span style={{ display: 'inline-block', margin: '0 8px' }}>operador / operador123</span>
        <span style={{ display: 'inline-block', margin: '0 8px' }}>consulta / consulta123</span>
        <span style={{ display: 'inline-block', margin: '0 8px' }}>demo / demo123</span>
      </div>
    </div>
  );
}
