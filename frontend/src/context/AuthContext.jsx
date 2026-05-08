import { createContext, useContext, useState, useCallback } from 'react';
import DB from '../services/db';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(DB.getSession());
  const isAdmin = user?.rol === 'ADMIN';
  const canAdd = user && (user.rol === 'ADMIN' || user.rol === 'OPERADOR');

  const login = useCallback((username, password) => {
    const u = DB.getUserByName(username);
    if (!u || u.password !== password) return 'Usuario o contraseña incorrectos';
    // Registrar último acceso
    DB.updateUser(u.id, { ultimo_acceso: new Date().toISOString() });
    const session = { 
      id: u.id, 
      username: u.username, 
      email: u.email, 
      rol: u.rol, 
      sede_id: u.sede_id || null,
      nombre: u.nombre || '',
      apellido: u.apellido || ''
    };
    DB.setSession(session);
    setUser(session);
    DB.addLog('Login', username, username);
    return null;
  }, []);

  const logout = useCallback(() => {
    if (user) DB.addLog('Logout', user.username, user.username);
    DB.clearSession();
    setUser(null);
  }, [user]);

  const filtrar = useCallback((arr) => {
    if (!user || isAdmin) return arr;
    const sid = user.sede_id;
    if (!sid) return arr;
    return arr.filter(x => x.sede_id === sid);
  }, [user, isAdmin]);

  return (
    <AuthContext.Provider value={{ user, isAdmin, canAdd, login, logout, filtrar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
