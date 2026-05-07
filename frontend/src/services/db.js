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
    if (localStorage.getItem(PREFIX + 'react_v4')) return;
    // Solo limpiar datos de ejemplo, NO usuarios
    ['s','d','e','a','g','log','u'].forEach(k => localStorage.removeItem(PREFIX + k));
    
    // Usuarios predefinidos que existen en TODOS los PCs
    // Admin y operadores de cada sede, para que todos puedan entrar desde cualquier navegador
    this.createUser({ username: 'admin', email: 'admin@inventpro.com', password: 'admin123', rol: 'ADMIN', nombre: 'Administrador', apellido: 'General' });
    this.createUser({ username: 'operador', email: 'operador@inventpro.com', password: 'operador123', rol: 'OPERADOR', nombre: 'Operador', apellido: 'General', sede_id: 1 });
    this.createUser({ username: 'consulta', email: 'consulta@inventpro.com', password: 'consulta123', rol: 'CONSULTA', nombre: 'Usuario', apellido: 'Consulta', sede_id: 1 });
    this.createUser({ username: 'admin2', email: 'admin2@inventpro.com', password: 'admin123', rol: 'ADMIN', nombre: 'Administrador', apellido: 'Secundario' });
    this.createUser({ username: 'operador2', email: 'operador2@inventpro.com', password: 'operador123', rol: 'OPERADOR', nombre: 'Operador', apellido: 'Medellin', sede_id: 2 });
    this.createUser({ username: 'usuario1', email: 'usuario1@inventpro.com', password: 'usuario123', rol: 'OPERADOR', nombre: 'Usuario', apellido: 'Uno', sede_id: 1 });
    this.createUser({ username: 'usuario2', email: 'usuario2@inventpro.com', password: 'usuario123', rol: 'OPERADOR', nombre: 'Usuario', apellido: 'Dos', sede_id: 2 });
    this.createUser({ username: 'demo', email: 'demo@inventpro.com', password: 'demo123', rol: 'CONSULTA', nombre: 'Usuario', apellido: 'Demo', sede_id: 1 });
    // 20 Sedes
    const sedes = [['Sede Bogota','Bogota','Cra 7 #72-41','601-555-0100'],['Sede Medellin','Medellin','Calle 10 #43','604-555-0200'],['Sede Cali','Cali','Av 6N #25','602-555-0300'],['Sede Barranquilla','Barranquilla','Cra 54 #72','605-555-0400'],['Sede Cartagena','Cartagena','Bocagrande','605-555-0500'],['Sede Bucaramanga','Bucaramanga','Calle 36','607-555-0600'],['Sede Pereira','Pereira','Av Circunvalar','606-555-0700'],['Sede Manizales','Manizales','Cra 23','606-555-0800'],['Sede Santa Marta','Santa Marta','Calle 22','605-555-0900'],['Sede Ibague','Ibague','Cra 5','608-555-1000'],['Sede Cucuta','Cucuta','Av 0','607-555-1100'],['Sede Villavicencio','Villavicencio','Calle 39','608-555-1200'],['Sede Pasto','Pasto','Cra 27','602-555-1300'],['Sede Neiva','Neiva','Calle 8','608-555-1400'],['Sede Armenia','Armenia','Cra 14','606-555-1500'],['Sede Popayan','Popayan','Calle 5','602-555-1600'],['Sede Monteria','Monteria','Cra 6','604-555-1700'],['Sede Sincelejo','Sincelejo','Calle 25','605-555-1800'],['Sede Tunja','Tunja','Cra 10','608-555-1900'],['Sede Florencia','Florencia','Calle 16','608-555-2000']];
    sedes.forEach(s => this.createSede({ nombre: s[0], ciudad: s[1], direccion: s[2], telefono: s[3] }));
    // 10 Departamentos
    const deps = [['Tecnologia',1,'Sistemas'],['Contabilidad',1,'Finanzas'],['RRHH',1,'Admin'],['Gerencia',1,'Direccion'],['Soporte TI',2,'Sistemas'],['Ventas',2,'Comercial'],['Logistica',3,'Operaciones'],['Marketing',1,'Comunicaciones'],['Legal',1,'Legal'],['Compras',4,'Admin']];
    deps.forEach(d => this.createDep({ nombre: d[0], sede_id: d[1], area: d[2], responsable: '' }));
    // 50 Empleados
    const noms = ['Carlos','Maria','Juan','Ana','Pedro','Laura','Diego','Sofia','Roberto','Carmen','Andres','Valentina','Felipe','Daniela','Santiago','Camila','Nicolas','Isabella','Sebastian','Natalia','Alejandro','Gabriela','David','Mariana','Jorge','Paula','Luis','Andrea','Fernando','Catalina','Ivan','Tatiana','Jaime','Viviana','Mauricio','Sandra','Ernesto','Luz','Arturo','Pilar','Gonzalo','Rocio','Hernan','Olga','Rodrigo','Yolanda','Enrique','Marta','Alvaro','Beatriz'];
    const apes = ['Rodriguez','Lopez','Martinez','Garcia','Sanchez','Diaz','Torres','Herrera','Mendez','Ruiz','Gomez','Morales','Ortiz','Ramirez','Vargas','Castro','Rojas','Reyes','Jimenez','Pena'];
    const cargos = ['Desarrollador','Analista','Coordinador','Asistente','Ingeniero','Contador','Abogado','Tecnico','Consultor','Especialista'];
    for (let m = 0; m < 50; m++) {
      const fechaIng = '202' + (2 + Math.floor(m / 20)) + '-' + String(1 + m % 12).padStart(2, '0') + '-' + String(1 + m % 28).padStart(2, '0');
      this.createEmpleado({ nombre: noms[m % noms.length], apellido: apes[m % apes.length], cedula: '' + (1000000000 + m * 111), departamento_id: (m % 10) + 1, sede_id: (m % 20) + 1, cargo: cargos[m % cargos.length], email: noms[m % noms.length].toLowerCase() + m + '@empresa.com', fecha_ingreso: fechaIng + 'T08:00:00.000Z' });
    }
    // 100 Activos
    const items = [['Laptop Dell','16GB i7','Computador',3500000],['Laptop HP','8GB i5','Computador',2800000],['Monitor Samsung 27','4K','Monitor',1200000],['Monitor LG 24','FHD','Monitor',650000],['Impresora HP','Laser','Impresora',850000],['Silla Ergonomica','Ajustable','Mobiliario',650000],['Escritorio','En L','Mobiliario',780000],['Teclado Logitech','Inalambrico','Periferico',180000],['Mouse Logitech','Ergonomico','Periferico',120000],['Servidor Dell','64GB','Servidor',12500000],['Switch Cisco','48P PoE','Red',3200000],['UPS APC','3000VA','Energia',1800000],['Proyector Epson','4000L','Audiovisual',2100000],['Telefono IP','Cisco','Telefonia',280000],['Camara Seguridad','4MP','Seguridad',320000]];
    for (let k = 0; k < 100; k++) {
      const it = items[k % items.length];
      this.createActivo({ nombre: it[0] + ' #' + (k + 1), descripcion: it[1], tipo: it[2], serial: it[2].substring(0, 3).toUpperCase() + '-' + String(2024) + '-' + String(k + 1).padStart(4, '0'), valor: it[3], fecha_compra: '2024-' + String(1 + k % 12).padStart(2, '0') + '-' + String(1 + k % 28).padStart(2, '0'), sede_id: (k % 20) + 1, departamento_id: (k % 10) + 1 });
    }
    // Algunos danados y asignados
    for (let d = 0; d < 8; d++) this.updateActivo(5 + d * 12, { estado: 'DANADO' });
    for (let g = 0; g < 20; g++) {
      this.createAsignacion({ activo_id: 1 + g * 4, empleado_id: 1 + (g % 50), observaciones: 'Asignacion inicial' });
      this.updateActivo(1 + g * 4, { estado: 'ASIGNADO' });
    }
    localStorage.setItem(PREFIX + 'react_v4', '1');
  }
};

DB.init();
export default DB;
