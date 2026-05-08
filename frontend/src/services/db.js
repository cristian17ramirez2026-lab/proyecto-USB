// Base de datos simulada con localStorage (misma logica del HTML)
const PREFIX = 'ip_';

const DB = {
  g(k) { try { return JSON.parse(localStorage.getItem(PREFIX + k)) || []; } catch { return []; } },
  s(k, d) { localStorage.setItem(PREFIX + k, JSON.stringify(d)); },
  nid(k) { const i = this.g(k); return i.length ? Math.max(...i.map(x => x.id)) + 1 : 1; },

  // Usuarios
  getUsers() { return this.g('u'); },
  getUserByName(u) { return this.getUsers().find(x => x.username === u); },
  getUserByEmail(e) { return this.getUsers().find(x => x.email === e); },
  createUser(d) { const a = this.getUsers(); d.id = this.nid('u'); if (!d.rol) d.rol = 'OPERADOR'; d.fecha_creacion = new Date().toISOString(); d.ultimo_acceso = null; a.push(d); this.s('u', a); return d; },
  deleteUser(id) { this.s('u', this.getUsers().filter(x => x.id !== id)); },
  updateUser(id, d) { const a = this.getUsers(); const i = a.findIndex(x => x.id === id); if (i === -1) return null; Object.assign(a[i], d); this.s('u', a); return a[i]; },

  // Sedes
  getSedes() { return this.g('s'); },
  getSede(id) { return this.getSedes().find(x => x.id === id); },
  createSede(d) { const a = this.getSedes(); d.id = this.nid('s'); a.push(d); this.s('s', a); return d; },
  updateSede(id, d) { const a = this.getSedes(); const i = a.findIndex(x => x.id === id); if (i === -1) return null; Object.assign(a[i], d); this.s('s', a); return a[i]; },
  deleteSede(id) { this.s('s', this.getSedes().filter(x => x.id !== id)); },

  // Departamentos
  getDeps() { return this.g('d'); },
  getDep(id) { return this.getDeps().find(x => x.id === id); },
  createDep(d) { const a = this.getDeps(); d.id = this.nid('d'); a.push(d); this.s('d', a); return d; },
  updateDep(id, d) { const a = this.getDeps(); const i = a.findIndex(x => x.id === id); if (i === -1) return null; Object.assign(a[i], d); this.s('d', a); return a[i]; },
  deleteDep(id) { this.s('d', this.getDeps().filter(x => x.id !== id)); },

  // Activos
  getActivos() { return this.g('a'); },
  getActivo(id) { return this.getActivos().find(x => x.id === id); },
  createActivo(d) { const a = this.getActivos(); d.id = this.nid('a'); if (!d.estado) d.estado = 'DISPONIBLE'; d.fecha_registro = new Date().toISOString(); a.push(d); this.s('a', a); return d; },
  updateActivo(id, d) { const a = this.getActivos(); const i = a.findIndex(x => x.id === id); if (i === -1) return null; Object.assign(a[i], d); this.s('a', a); return a[i]; },
  deleteActivo(id) { this.s('a', this.getActivos().filter(x => x.id !== id)); },

  // Empleados
  getEmpleados() { return this.g('e'); },
  getEmpleado(id) { return this.getEmpleados().find(x => x.id === id); },
  createEmpleado(d) { const a = this.getEmpleados(); d.id = this.nid('e'); d.fecha_ingreso = d.fecha_ingreso || new Date().toISOString(); d.fecha_salida = null; d.activo = true; a.push(d); this.s('e', a); return d; },
  updateEmpleado(id, d) { const a = this.getEmpleados(); const i = a.findIndex(x => x.id === id); if (i === -1) return null; Object.assign(a[i], d); this.s('e', a); return a[i]; },
  deleteEmpleado(id) { this.s('e', this.getEmpleados().filter(x => x.id !== id)); },

  // Asignaciones
  getAsignaciones() { return this.g('g'); },
  getAsignacion(id) { return this.getAsignaciones().find(x => x.id === id); },
  createAsignacion(d) { const a = this.getAsignaciones(); d.id = this.nid('g'); d.fecha_asignacion = new Date().toISOString(); d.fecha_devolucion = null; a.push(d); this.s('g', a); return d; },
  updateAsignacion(id, d) { const a = this.getAsignaciones(); const i = a.findIndex(x => x.id === id); if (i === -1) return null; Object.assign(a[i], d); this.s('g', a); return a[i]; },

  // Log
  addLog(action, detail, user) { const l = this.g('log'); l.push({ id: l.length + 1, action, detail, user, fecha: new Date().toISOString() }); if (l.length > 200) l.splice(0, l.length - 200); this.s('log', l); },
  getLog() { return this.g('log').slice().reverse(); },
  clearLog() { this.s('log', []); },

  // Session
  setSession(u) { localStorage.setItem(PREFIX + 'ses', JSON.stringify(u)); },
  getSession() { try { return JSON.parse(localStorage.getItem(PREFIX + 'ses')); } catch { return null; } },
  clearSession() { localStorage.removeItem(PREFIX + 'ses'); },

  // Init
  init() {
    if (localStorage.getItem(PREFIX + 'react_v6')) return;
    // Limpiar TODOS los datos (incluyendo usuarios) para empezar desde cero
    ['s','d','e','a','g','log','u'].forEach(k => localStorage.removeItem(PREFIX + k));
    
    // Solo crear el usuario administrador principal
    this.createUser({ 
      username: 'admin', 
      email: 'admin@inventpro.com', 
      password: 'admin123', 
      rol: 'ADMIN', 
      nombre: 'Cristian', 
      apellido: 'Ramírez' 
    });
    
    localStorage.setItem(PREFIX + 'react_v6', '1');
  }
};

DB.init();
export default DB;
