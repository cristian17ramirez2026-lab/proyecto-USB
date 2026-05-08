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
    if (localStorage.getItem(PREFIX + 'react_v7')) return;
    // Limpiar TODOS los datos (incluyendo usuarios) para empezar desde cero
    ['s','d','e','a','g','log','u'].forEach(k => localStorage.removeItem(PREFIX + k));
    
    // Usuario administrador principal
    this.createUser({ 
      username: 'admin', 
      email: 'admin@olimpica.com.co', 
      password: 'admin123', 
      rol: 'ADMIN', 
      nombre: 'Cristian', 
      apellido: 'Ramírez' 
    });
    
    // Sedes principales de Olímpica S.A. en Colombia
    const sedes = [
      ['Sede Principal Barranquilla', 'Barranquilla', 'Calle 77B # 57-141 Centro Empresarial Las Américas', '(605) 361-6000'],
      ['Sede Bogotá', 'Bogotá D.C.', 'Av. Calle 26 # 69-76 Torre 3', '(601) 423-4000'],
      ['Sede Medellín', 'Medellín', 'Carrera 48 # 20-114 El Poblado', '(604) 444-5000'],
      ['Sede Cali', 'Cali', 'Av. 6 Norte # 25N-50', '(602) 667-8000'],
      ['Sede Cartagena', 'Cartagena', 'Av. Pedro de Heredia # 45-67', '(605) 669-1000'],
      ['Sede Santa Marta', 'Santa Marta', 'Carrera 4 # 22-35', '(605) 421-5000'],
      ['Sede Bucaramanga', 'Bucaramanga', 'Carrera 27 # 36-15', '(607) 645-2000'],
      ['Sede Pereira', 'Pereira', 'Av. Circunvalar # 8-50', '(606) 335-7000'],
      ['Sede Montería', 'Montería', 'Carrera 6 # 35-20', '(604) 784-3000'],
      ['Sede Sincelejo', 'Sincelejo', 'Calle 25 # 18-45', '(605) 282-6000'],
      ['Sede Valledupar', 'Valledupar', 'Carrera 9 # 16A-20', '(605) 573-4000'],
      ['Sede Riohacha', 'Riohacha', 'Calle 15 # 7-30', '(605) 728-1000'],
      ['Sede Centro de Distribución Malambo', 'Malambo', 'Parque Industrial Malambo Km 1', '(605) 375-8000'],
      ['Sede Centro de Distribución Siberia', 'Cota', 'Parque Industrial Siberia Km 3', '(601) 893-2000'],
    ];
    sedes.forEach(s => this.createSede({ nombre: s[0], ciudad: s[1], direccion: s[2], telefono: s[3] }));
    
    // Departamentos principales de Olímpica S.A.
    const deps = [
      // Sede Principal Barranquilla (id: 1)
      ['Gerencia General', 1, 'Dirección', 'Dirección Ejecutiva'],
      ['Gerencia Financiera', 1, 'Finanzas', 'Contabilidad y Tesorería'],
      ['Gerencia Comercial', 1, 'Comercial', 'Ventas y Mercadeo'],
      ['Gerencia de Operaciones', 1, 'Operaciones', 'Logística Nacional'],
      ['Tecnología e Información (TI)', 1, 'Sistemas', 'Infraestructura y Soporte'],
      ['Talento Humano', 1, 'RRHH', 'Gestión del Talento'],
      ['Auditoría Interna', 1, 'Control', 'Control Interno'],
      ['Jurídica', 1, 'Legal', 'Asesoría Legal'],
      ['Compras y Abastecimiento', 1, 'Comercial', 'Negociación Proveedores'],
      ['Mercadeo y Publicidad', 1, 'Comercial', 'Marketing'],
      // Sede Bogotá (id: 2)
      ['Operaciones Zona Centro', 2, 'Operaciones', 'Logística Regional'],
      ['Ventas Zona Centro', 2, 'Comercial', 'Ventas Regionales'],
      ['Soporte TI Bogotá', 2, 'Sistemas', 'Soporte Técnico'],
      // Sede Medellín (id: 3)
      ['Operaciones Zona Occidente', 3, 'Operaciones', 'Logística Regional'],
      ['Ventas Zona Occidente', 3, 'Comercial', 'Ventas Regionales'],
      // Sede Cali (id: 4)
      ['Operaciones Zona Suroccidente', 4, 'Operaciones', 'Logística Regional'],
      ['Ventas Zona Suroccidente', 4, 'Comercial', 'Ventas Regionales'],
      // Centro Distribución Malambo (id: 13)
      ['Logística y Distribución', 13, 'Operaciones', 'Centro de Distribución'],
      ['Almacén Central', 13, 'Operaciones', 'Inventario y Bodegas'],
      // Centro Distribución Siberia (id: 14)
      ['Distribución Centro', 14, 'Operaciones', 'Centro de Distribución'],
    ];
    deps.forEach(d => this.createDep({ nombre: d[0], sede_id: d[1], area: d[2], responsable: d[3] }));
    
    localStorage.setItem(PREFIX + 'react_v7', '1');
  }
};

DB.init();
export default DB;
