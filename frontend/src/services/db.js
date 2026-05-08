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
    if (localStorage.getItem(PREFIX + 'react_v10')) return;
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
    
    // Usuarios del sistema adicionales
    // Estructura: [username, email, password, rol, nombre, apellido, sede_id]
    const usuarios = [
      // Administradores
      ['jrodriguez', 'jrodriguez@olimpica.com.co', 'olimpica2024', 'ADMIN', 'Javier', 'Rodríguez', 1],
      ['jperez', 'jperez@olimpica.com.co', 'olimpica2024', 'ADMIN', 'Juan Carlos', 'Pérez', 1],
      ['ebarrios', 'ebarrios@olimpica.com.co', 'olimpica2024', 'ADMIN', 'Elena', 'Barrios', 1],
      
      // Operadores por sede
      ['pmartinez', 'pmartinez@olimpica.com.co', 'olimpica2024', 'OPERADOR', 'Patricia', 'Martínez', 1],
      ['lcastro', 'lcastro@olimpica.com.co', 'olimpica2024', 'OPERADOR', 'Laura', 'Castro', 1],
      ['cmoreno', 'cmoreno@olimpica.com.co', 'olimpica2024', 'OPERADOR', 'Camilo', 'Moreno', 1],
      ['dcardenas', 'dcardenas@olimpica.com.co', 'olimpica2024', 'OPERADOR', 'Daniel', 'Cárdenas', 2],
      ['jserrano', 'jserrano@olimpica.com.co', 'olimpica2024', 'OPERADOR', 'Juliana', 'Serrano', 2],
      ['amejia', 'amejia@olimpica.com.co', 'olimpica2024', 'OPERADOR', 'Adriana', 'Mejía', 3],
      ['dvaldes', 'dvaldes@olimpica.com.co', 'olimpica2024', 'OPERADOR', 'Diana', 'Valdés', 4],
      ['lfontalvo', 'lfontalvo@olimpica.com.co', 'olimpica2024', 'OPERADOR', 'Luis Miguel', 'Fontalvo', 13],
      ['cmoreno2', 'cmoreno2@olimpica.com.co', 'olimpica2024', 'OPERADOR', 'Carolina', 'Moreno', 14],
      
      // Consulta (solo lectura)
      ['preyes', 'preyes@olimpica.com.co', 'olimpica2024', 'CONSULTA', 'Paola', 'Reyes', 1],
      ['rospina', 'rospina@olimpica.com.co', 'olimpica2024', 'CONSULTA', 'Ricardo', 'Ospina', 1],
      ['avega', 'avega@olimpica.com.co', 'olimpica2024', 'CONSULTA', 'Alejandro', 'Vega', 1],
    ];
    
    usuarios.forEach(u => this.createUser({
      username: u[0],
      email: u[1],
      password: u[2],
      rol: u[3],
      nombre: u[4],
      apellido: u[5],
      sede_id: u[6],
    }));
    
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
    
    // Empleados de Olímpica S.A.
    // Estructura: [nombre, apellido, cedula, sede_id, dep_id, cargo, email, fecha_ingreso]
    const empleados = [
      // ========== SEDE PRINCIPAL BARRANQUILLA (sede_id: 1) ==========
      // Gerencia General (dep_id: 1)
      ['Carlos Eduardo', 'Char Chaljub', '72234567', 1, 1, 'Gerente General', 'cchar@olimpica.com.co', '2015-03-15'],
      ['Patricia', 'Martínez Osorio', '72345678', 1, 1, 'Asistente de Gerencia', 'pmartinez@olimpica.com.co', '2018-06-20'],
      
      // Gerencia Financiera (dep_id: 2)
      ['Javier Alfonso', 'Rodríguez Vargas', '72456789', 1, 2, 'Gerente Financiero', 'jrodriguez@olimpica.com.co', '2016-02-10'],
      ['Sandra Milena', 'López Pérez', '72567890', 1, 2, 'Contador Senior', 'slopez@olimpica.com.co', '2017-08-05'],
      ['Andrés Felipe', 'Gómez Castro', '72678901', 1, 2, 'Analista Financiero', 'agomez@olimpica.com.co', '2019-11-12'],
      ['Mónica Andrea', 'Díaz Herrera', '72789012', 1, 2, 'Tesorera', 'mdiaz@olimpica.com.co', '2018-04-18'],
      
      // Gerencia Comercial (dep_id: 3)
      ['Luis Fernando', 'Gutiérrez Mendoza', '72890123', 1, 3, 'Gerente Comercial', 'lgutierrez@olimpica.com.co', '2014-07-22'],
      ['Diana Carolina', 'Ramírez Torres', '72901234', 1, 3, 'Coordinadora Comercial', 'dramirez@olimpica.com.co', '2019-03-08'],
      
      // Gerencia de Operaciones (dep_id: 4)
      ['Rafael Enrique', 'Muñoz Herrera', '73012345', 1, 4, 'Gerente de Operaciones', 'rmunoz@olimpica.com.co', '2015-09-14'],
      ['Claudia Patricia', 'Sánchez Ortega', '73123456', 1, 4, 'Coordinadora de Logística', 'csanchez@olimpica.com.co', '2018-01-25'],
      
      // Tecnología e Información - TI (dep_id: 5)
      ['Juan Carlos', 'Pérez Mendoza', '73234567', 1, 5, 'Director de TI', 'jperez@olimpica.com.co', '2016-05-10'],
      ['Laura Victoria', 'Castro Jiménez', '73345678', 1, 5, 'Desarrolladora Senior', 'lcastro@olimpica.com.co', '2020-02-15'],
      ['Camilo Andrés', 'Moreno Reyes', '73456789', 1, 5, 'Ingeniero de Sistemas', 'cmoreno@olimpica.com.co', '2021-07-01'],
      ['Natalia', 'Vargas Ruíz', '73567890', 1, 5, 'Analista de Datos', 'nvargas@olimpica.com.co', '2022-03-20'],
      ['Jorge Luis', 'Herrera Peña', '73678901', 1, 5, 'Soporte Técnico', 'jherrera@olimpica.com.co', '2021-11-08'],
      
      // Talento Humano (dep_id: 6)
      ['Elena María', 'Barrios Ospina', '73789012', 1, 6, 'Directora de Talento Humano', 'ebarrios@olimpica.com.co', '2017-04-12'],
      ['Fernando', 'Jiménez Rojas', '73890123', 1, 6, 'Coordinador de Nómina', 'fjimenez@olimpica.com.co', '2019-08-18'],
      ['Isabella', 'Torres Vargas', '73901234', 1, 6, 'Analista de Selección', 'itorres@olimpica.com.co', '2022-01-10'],
      
      // Auditoría Interna (dep_id: 7)
      ['Ricardo', 'Ospina Mejía', '74012345', 1, 7, 'Jefe de Auditoría', 'rospina@olimpica.com.co', '2015-12-05'],
      ['Paola Andrea', 'Reyes Castillo', '74123456', 1, 7, 'Auditor Senior', 'preyes@olimpica.com.co', '2020-06-15'],
      
      // Jurídica (dep_id: 8)
      ['Alejandro', 'Vega Martínez', '74234567', 1, 8, 'Director Jurídico', 'avega@olimpica.com.co', '2016-10-03'],
      ['Valentina', 'Cárdenas López', '74345678', 1, 8, 'Abogada Senior', 'vcardenas@olimpica.com.co', '2020-09-22'],
      
      // Compras y Abastecimiento (dep_id: 9)
      ['Hernán Dario', 'Ramos Gutiérrez', '74456789', 1, 9, 'Gerente de Compras', 'hramos@olimpica.com.co', '2017-02-08'],
      ['Carolina', 'Pineda Serrano', '74567890', 1, 9, 'Negociadora de Proveedores', 'cpineda@olimpica.com.co', '2019-05-14'],
      
      // Mercadeo y Publicidad (dep_id: 10)
      ['Sergio Andrés', 'Quintero Campo', '74678901', 1, 10, 'Director de Mercadeo', 'squintero@olimpica.com.co', '2018-11-20'],
      ['Daniela', 'Fernández Ríos', '74789012', 1, 10, 'Community Manager', 'dfernandez@olimpica.com.co', '2021-04-05'],
      ['Andrés Mauricio', 'Páez Solano', '74890123', 1, 10, 'Diseñador Gráfico', 'apaez@olimpica.com.co', '2020-08-30'],
      
      // ========== SEDE BOGOTÁ (sede_id: 2) ==========
      // Operaciones Zona Centro (dep_id: 11)
      ['Mauricio', 'Rojas Aguirre', '79012345', 2, 11, 'Jefe de Operaciones Centro', 'mrojas@olimpica.com.co', '2017-07-15'],
      ['Ana María', 'Cortés Bello', '79123456', 2, 11, 'Coordinadora Logística', 'acortes@olimpica.com.co', '2019-10-08'],
      
      // Ventas Zona Centro (dep_id: 12)
      ['Oscar Iván', 'Bedoya Gallego', '79234567', 2, 12, 'Jefe de Ventas Centro', 'obedoya@olimpica.com.co', '2016-03-22'],
      ['Marcela', 'Acosta Navarro', '79345678', 2, 12, 'Ejecutiva Comercial', 'macosta@olimpica.com.co', '2020-05-11'],
      ['Felipe', 'Duarte Zapata', '79456789', 2, 12, 'Asesor Comercial', 'fduarte@olimpica.com.co', '2022-09-14'],
      
      // Soporte TI Bogotá (dep_id: 13)
      ['Daniel', 'Cárdenas Ochoa', '79567890', 2, 13, 'Soporte Técnico Senior', 'dcardenas@olimpica.com.co', '2019-12-02'],
      ['Juliana', 'Serrano Vela', '79678901', 2, 13, 'Técnica de Sistemas', 'jserrano@olimpica.com.co', '2021-06-28'],
      
      // ========== SEDE MEDELLÍN (sede_id: 3) ==========
      // Operaciones Zona Occidente (dep_id: 14)
      ['Juan David', 'Álvarez Restrepo', '71012345', 3, 14, 'Jefe de Operaciones Occidente', 'jalvarez@olimpica.com.co', '2016-09-10'],
      ['Adriana', 'Mejía Ospina', '71123456', 3, 14, 'Coordinadora Logística', 'amejia@olimpica.com.co', '2018-12-05'],
      
      // Ventas Zona Occidente (dep_id: 15)
      ['Esteban', 'Zuluaga Henao', '71234567', 3, 15, 'Jefe de Ventas Occidente', 'ezuluaga@olimpica.com.co', '2017-01-18'],
      ['Laura', 'Ríos Valencia', '71345678', 3, 15, 'Ejecutiva Comercial', 'lrios@olimpica.com.co', '2020-04-22'],
      
      // ========== SEDE CALI (sede_id: 4) ==========
      // Operaciones Zona Suroccidente (dep_id: 16)
      ['Carlos Alberto', 'Muñoz Rengifo', '94012345', 4, 16, 'Jefe de Operaciones Suroccidente', 'cmunoz@olimpica.com.co', '2017-05-20'],
      ['Diana', 'Valdés Arango', '94123456', 4, 16, 'Coordinadora Logística', 'dvaldes@olimpica.com.co', '2019-09-15'],
      
      // Ventas Zona Suroccidente (dep_id: 17)
      ['Andrés', 'Torres Gómez', '94234567', 4, 17, 'Jefe de Ventas Suroccidente', 'atorres@olimpica.com.co', '2018-02-28'],
      ['Sofía', 'Buitrago Paz', '94345678', 4, 17, 'Ejecutiva Comercial', 'sbuitrago@olimpica.com.co', '2021-08-10'],
      
      // ========== CENTRO DISTRIBUCIÓN MALAMBO (sede_id: 13) ==========
      // Logística y Distribución (dep_id: 18)
      ['José Antonio', 'Pacheco Bolaño', '85012345', 13, 18, 'Jefe de Distribución', 'jpacheco@olimpica.com.co', '2015-08-14'],
      ['Luis Miguel', 'Fontalvo Movilla', '85123456', 13, 18, 'Supervisor de Logística', 'lfontalvo@olimpica.com.co', '2017-11-03'],
      ['Carmen Elena', 'Castillo Polo', '85234567', 13, 18, 'Coordinadora de Rutas', 'ccastillo@olimpica.com.co', '2019-04-16'],
      
      // Almacén Central (dep_id: 19)
      ['Roberto', 'Mendoza Pérez', '85345678', 13, 19, 'Jefe de Almacén', 'rmendoza@olimpica.com.co', '2016-06-20'],
      ['Yesica', 'Polo Orozco', '85456789', 13, 19, 'Auxiliar de Inventario', 'ypolo@olimpica.com.co', '2020-10-12'],
      ['William', 'De la Hoz Barrios', '85567890', 13, 19, 'Operario de Bodega', 'wdelahoz@olimpica.com.co', '2021-03-08'],
      
      // ========== CENTRO DISTRIBUCIÓN SIBERIA (sede_id: 14) ==========
      // Distribución Centro (dep_id: 20)
      ['Ernesto', 'Beltrán Cruz', '80012345', 14, 20, 'Jefe de Distribución Centro', 'ebeltran@olimpica.com.co', '2016-01-25'],
      ['Carolina', 'Moreno Salinas', '80123456', 14, 20, 'Supervisora de Despachos', 'cmoreno2@olimpica.com.co', '2018-07-18'],
      ['Héctor', 'Rincón Mora', '80234567', 14, 20, 'Conductor Supervisor', 'hrincon@olimpica.com.co', '2019-12-10'],
    ];
    
    empleados.forEach(e => this.createEmpleado({ 
      nombre: e[0], 
      apellido: e[1], 
      cedula: e[2], 
      sede_id: e[3], 
      departamento_id: e[4], 
      cargo: e[5], 
      email: e[6], 
      fecha_ingreso: e[7] + 'T08:00:00.000Z' 
    }));
    
    // Activos de Olímpica S.A.
    // Estructura: [nombre, descripcion, tipo, serial, valor, fecha_compra, sede_id, dep_id]
    const activos = [
      // ========== SEDE PRINCIPAL BARRANQUILLA ==========
      // Gerencia General (dep 1)
      ['Laptop Dell Latitude 7420', 'i7 11va Gen, 16GB RAM, 512GB SSD', 'Computador', 'DELL-BAQ-2023-0001', 5800000, '2023-03-15', 1, 1],
      ['Monitor Dell UltraSharp 27"', '4K UHD, USB-C', 'Monitor', 'DELL-BAQ-2023-0002', 2200000, '2023-03-15', 1, 1],
      ['iPhone 14 Pro', '256GB, Gerencia', 'Celular', 'APPL-BAQ-2023-0003', 5500000, '2023-05-20', 1, 1],
      ['Impresora HP LaserJet Pro M404dn', 'Láser monocromática, dúplex', 'Impresora', 'HPLJ-BAQ-2022-0004', 1800000, '2022-11-10', 1, 1],
      
      // Gerencia Financiera (dep 2)
      ['Laptop HP EliteBook 850', 'i5 11va, 16GB, 256GB SSD', 'Computador', 'HPEB-BAQ-2022-0005', 4200000, '2022-08-15', 1, 2],
      ['Laptop HP EliteBook 850', 'i5 11va, 16GB, 256GB SSD', 'Computador', 'HPEB-BAQ-2022-0006', 4200000, '2022-08-15', 1, 2],
      ['Monitor LG 24"', 'Full HD, IPS', 'Monitor', 'LG-BAQ-2022-0007', 850000, '2022-08-20', 1, 2],
      ['Monitor LG 24"', 'Full HD, IPS', 'Monitor', 'LG-BAQ-2022-0008', 850000, '2022-08-20', 1, 2],
      ['Impresora Multifuncional Canon', 'MF445DW Wi-Fi', 'Impresora', 'CANO-BAQ-2022-0009', 2500000, '2022-10-05', 1, 2],
      ['Calculadora Casio FR-2650T', 'Impresora térmica', 'Oficina', 'CASI-BAQ-2023-0010', 450000, '2023-02-12', 1, 2],
      
      // Gerencia Comercial (dep 3)
      ['Laptop Lenovo ThinkPad T14', 'i7, 16GB, 512GB', 'Computador', 'LENO-BAQ-2023-0011', 4800000, '2023-01-18', 1, 3],
      ['iPad Pro 12.9"', 'M2, 256GB, para presentaciones', 'Tablet', 'APPL-BAQ-2023-0012', 5200000, '2023-06-10', 1, 3],
      ['Proyector Epson PowerLite', '4500 lúmenes, WUXGA', 'Audiovisual', 'EPSN-BAQ-2022-0013', 3800000, '2022-09-08', 1, 3],
      
      // Gerencia de Operaciones (dep 4)
      ['Laptop Dell Latitude 5530', 'i5, 16GB, 256GB', 'Computador', 'DELL-BAQ-2023-0014', 4500000, '2023-04-20', 1, 4],
      ['Monitor Dell 24"', 'Full HD', 'Monitor', 'DELL-BAQ-2023-0015', 950000, '2023-04-20', 1, 4],
      ['Radio Comunicación Motorola', 'EP450 UHF', 'Comunicación', 'MOTO-BAQ-2022-0016', 650000, '2022-07-15', 1, 4],
      
      // TI (dep 5)
      ['Servidor Dell PowerEdge R750', 'Xeon Silver, 64GB RAM, 2TB', 'Servidor', 'DELL-BAQ-2023-0017', 28000000, '2023-02-10', 1, 5],
      ['Servidor HP ProLiant DL380', 'Xeon Gold, 128GB, 4TB', 'Servidor', 'HPEX-BAQ-2022-0018', 35000000, '2022-05-15', 1, 5],
      ['Switch Cisco Catalyst 9300', '48 puertos PoE+', 'Red', 'CISC-BAQ-2022-0019', 12500000, '2022-06-20', 1, 5],
      ['Switch Cisco Catalyst 9200', '24 puertos', 'Red', 'CISC-BAQ-2022-0020', 6800000, '2022-06-20', 1, 5],
      ['Firewall Fortinet FortiGate 100F', 'Next Gen Firewall', 'Red', 'FORT-BAQ-2023-0021', 15000000, '2023-01-25', 1, 5],
      ['UPS APC Smart 3000VA', 'Online, rack', 'Energía', 'APCU-BAQ-2022-0022', 2800000, '2022-04-18', 1, 5],
      ['UPS APC Smart 3000VA', 'Online, rack', 'Energía', 'APCU-BAQ-2022-0023', 2800000, '2022-04-18', 1, 5],
      ['Laptop Dell Precision 5570', 'i9, 32GB, 1TB, para desarrollo', 'Computador', 'DELL-BAQ-2023-0024', 9500000, '2023-03-08', 1, 5],
      ['Laptop MacBook Pro 14"', 'M2 Pro, 16GB, 512GB', 'Computador', 'APPL-BAQ-2023-0025', 11500000, '2023-05-12', 1, 5],
      ['Monitor Dell UltraSharp 32"', '4K, USB-C', 'Monitor', 'DELL-BAQ-2023-0026', 3500000, '2023-03-08', 1, 5],
      ['Estación de trabajo HP Z4', 'Xeon, 64GB, 1TB', 'Computador', 'HPEW-BAQ-2023-0027', 15000000, '2023-07-22', 1, 5],
      
      // Talento Humano (dep 6)
      ['Laptop HP ProBook 450', 'i5, 8GB, 256GB', 'Computador', 'HPPB-BAQ-2022-0028', 3200000, '2022-10-18', 1, 6],
      ['Laptop HP ProBook 450', 'i5, 8GB, 256GB', 'Computador', 'HPPB-BAQ-2022-0029', 3200000, '2022-10-18', 1, 6],
      ['Impresora HP LaserJet Pro MFP', 'Multifuncional', 'Impresora', 'HPLJ-BAQ-2022-0030', 1650000, '2022-11-25', 1, 6],
      
      // Auditoría (dep 7)
      ['Laptop Dell Latitude 5420', 'i5, 16GB, 256GB', 'Computador', 'DELL-BAQ-2022-0031', 3800000, '2022-06-10', 1, 7],
      ['Laptop Dell Latitude 5420', 'i5, 16GB, 256GB', 'Computador', 'DELL-BAQ-2022-0032', 3800000, '2022-06-10', 1, 7],
      
      // Jurídica (dep 8)
      ['Laptop Lenovo ThinkPad L14', 'i5, 16GB, 512GB', 'Computador', 'LENO-BAQ-2023-0033', 4100000, '2023-02-28', 1, 8],
      ['Escáner Canon ImageFormula', 'DR-C225 II', 'Oficina', 'CANO-BAQ-2023-0034', 1400000, '2023-03-15', 1, 8],
      
      // Compras (dep 9)
      ['Laptop HP EliteBook 840', 'i7, 16GB, 256GB', 'Computador', 'HPEB-BAQ-2023-0035', 4600000, '2023-04-05', 1, 9],
      ['Laptop HP EliteBook 840', 'i7, 16GB, 256GB', 'Computador', 'HPEB-BAQ-2023-0036', 4600000, '2023-04-05', 1, 9],
      
      // Mercadeo (dep 10)
      ['iMac 24" M3', '16GB, 512GB, para diseño', 'Computador', 'APPL-BAQ-2023-0037', 8500000, '2023-09-15', 1, 10],
      ['iMac 24" M3', '16GB, 512GB, para diseño', 'Computador', 'APPL-BAQ-2023-0038', 8500000, '2023-09-15', 1, 10],
      ['Tableta Wacom Intuos Pro', 'Medium, para diseño', 'Periférico', 'WACO-BAQ-2023-0039', 1200000, '2023-10-02', 1, 10],
      ['Cámara Canon EOS R6', 'Para sesiones publicitarias', 'Audiovisual', 'CANO-BAQ-2023-0040', 9800000, '2023-08-20', 1, 10],
      
      // ========== SEDE BOGOTÁ ==========
      // Operaciones Zona Centro (dep 11)
      ['Laptop Dell Latitude 5530', 'i5, 16GB', 'Computador', 'DELL-BOG-2023-0041', 4500000, '2023-05-10', 2, 11],
      ['Laptop Dell Latitude 5530', 'i5, 16GB', 'Computador', 'DELL-BOG-2023-0042', 4500000, '2023-05-10', 2, 11],
      ['Monitor LG 27"', 'Full HD', 'Monitor', 'LG-BOG-2023-0043', 1100000, '2023-05-10', 2, 11],
      ['Impresora HP LaserJet', 'Pro M404', 'Impresora', 'HPLJ-BOG-2023-0044', 1800000, '2023-06-18', 2, 11],
      
      // Ventas Zona Centro (dep 12)
      ['Laptop Lenovo ThinkPad E14', 'i5, 8GB, 256GB', 'Computador', 'LENO-BOG-2023-0045', 3400000, '2023-03-22', 2, 12],
      ['Laptop Lenovo ThinkPad E14', 'i5, 8GB, 256GB', 'Computador', 'LENO-BOG-2023-0046', 3400000, '2023-03-22', 2, 12],
      ['Laptop Lenovo ThinkPad E14', 'i5, 8GB, 256GB', 'Computador', 'LENO-BOG-2023-0047', 3400000, '2023-03-22', 2, 12],
      ['iPhone 13', '128GB, para ejecutivos', 'Celular', 'APPL-BOG-2023-0048', 3200000, '2023-07-10', 2, 12],
      ['iPhone 13', '128GB, para ejecutivos', 'Celular', 'APPL-BOG-2023-0049', 3200000, '2023-07-10', 2, 12],
      
      // Soporte TI Bogotá (dep 13)
      ['Laptop Dell Precision 3570', 'i7, 16GB, 512GB', 'Computador', 'DELL-BOG-2023-0050', 6800000, '2023-04-15', 2, 13],
      ['Switch Cisco Catalyst 2960', '24 puertos', 'Red', 'CISC-BOG-2022-0051', 3500000, '2022-09-10', 2, 13],
      ['UPS APC 1500VA', 'Line interactive', 'Energía', 'APCU-BOG-2023-0052', 950000, '2023-02-08', 2, 13],
      ['Kit herramientas técnicas', 'Klein Tools profesional', 'Herramienta', 'KLEI-BOG-2023-0053', 850000, '2023-05-18', 2, 13],
      
      // ========== SEDE MEDELLÍN ==========
      // Operaciones Zona Occidente (dep 14)
      ['Laptop HP EliteBook 840', 'i5, 8GB, 256GB', 'Computador', 'HPEB-MED-2023-0054', 3800000, '2023-02-12', 3, 14],
      ['Laptop HP EliteBook 840', 'i5, 8GB, 256GB', 'Computador', 'HPEB-MED-2023-0055', 3800000, '2023-02-12', 3, 14],
      ['Impresora HP Multifuncional', 'LaserJet Pro M283', 'Impresora', 'HPLJ-MED-2023-0056', 2100000, '2023-04-08', 3, 14],
      
      // Ventas Zona Occidente (dep 15)
      ['Laptop Lenovo IdeaPad', 'i5, 8GB, 512GB', 'Computador', 'LENO-MED-2023-0057', 2900000, '2023-01-15', 3, 15],
      ['Laptop Lenovo IdeaPad', 'i5, 8GB, 512GB', 'Computador', 'LENO-MED-2023-0058', 2900000, '2023-01-15', 3, 15],
      
      // ========== SEDE CALI ==========
      // Operaciones Zona Suroccidente (dep 16)
      ['Laptop Dell Vostro 3520', 'i5, 8GB, 256GB', 'Computador', 'DELL-CAL-2023-0059', 3200000, '2023-03-20', 4, 16],
      ['Laptop Dell Vostro 3520', 'i5, 8GB, 256GB', 'Computador', 'DELL-CAL-2023-0060', 3200000, '2023-03-20', 4, 16],
      ['Monitor Samsung 22"', 'Full HD', 'Monitor', 'SAMS-CAL-2023-0061', 650000, '2023-03-20', 4, 16],
      
      // Ventas Zona Suroccidente (dep 17)
      ['Laptop HP ProBook 440', 'i5, 8GB', 'Computador', 'HPPB-CAL-2023-0062', 3400000, '2023-02-28', 4, 17],
      ['Laptop HP ProBook 440', 'i5, 8GB', 'Computador', 'HPPB-CAL-2023-0063', 3400000, '2023-02-28', 4, 17],
      
      // ========== CENTRO DISTRIBUCIÓN MALAMBO ==========
      // Logística y Distribución (dep 18)
      ['Laptop Panasonic Toughbook', 'Rugged, para bodega', 'Computador', 'PANA-MAL-2023-0064', 7500000, '2023-06-10', 13, 18],
      ['Montacargas Toyota 8FBE20', 'Eléctrico 2 ton', 'Maquinaria', 'TOYO-MAL-2022-0065', 85000000, '2022-03-15', 13, 18],
      ['Montacargas Toyota 8FBE20', 'Eléctrico 2 ton', 'Maquinaria', 'TOYO-MAL-2022-0066', 85000000, '2022-03-15', 13, 18],
      ['Montacargas Yale Pallet', 'Pallet manual', 'Maquinaria', 'YALE-MAL-2022-0067', 3200000, '2022-08-20', 13, 18],
      ['Lector Código de Barras Zebra', 'DS2208 USB', 'Equipo', 'ZEBR-MAL-2023-0068', 480000, '2023-04-18', 13, 18],
      ['Lector Código de Barras Zebra', 'DS2208 USB', 'Equipo', 'ZEBR-MAL-2023-0069', 480000, '2023-04-18', 13, 18],
      ['Radio Comunicación Motorola', 'EP450 kit 4 unidades', 'Comunicación', 'MOTO-MAL-2023-0070', 2400000, '2023-02-10', 13, 18],
      
      // Almacén Central (dep 19)
      ['Báscula Industrial 500kg', 'Digital, plataforma', 'Equipo', 'BASC-MAL-2022-0071', 2800000, '2022-11-10', 13, 19],
      ['Báscula Industrial 2000kg', 'Para palets', 'Equipo', 'BASC-MAL-2022-0072', 5500000, '2022-11-10', 13, 19],
      ['Estantería Industrial 5 Niveles', 'Capacidad 1000kg/nivel', 'Mobiliario', 'ESTA-MAL-2022-0073', 1800000, '2022-05-25', 13, 19],
      ['Estantería Industrial 5 Niveles', 'Capacidad 1000kg/nivel', 'Mobiliario', 'ESTA-MAL-2022-0074', 1800000, '2022-05-25', 13, 19],
      ['Estantería Industrial 5 Niveles', 'Capacidad 1000kg/nivel', 'Mobiliario', 'ESTA-MAL-2022-0075', 1800000, '2022-05-25', 13, 19],
      ['Computador Todo en Uno HP', 'Para inventario', 'Computador', 'HPAI-MAL-2023-0076', 2400000, '2023-07-15', 13, 19],
      ['Cámara Seguridad Hikvision', 'IP 4MP Dome', 'Seguridad', 'HIKV-MAL-2022-0077', 450000, '2022-04-12', 13, 19],
      ['Cámara Seguridad Hikvision', 'IP 4MP Dome', 'Seguridad', 'HIKV-MAL-2022-0078', 450000, '2022-04-12', 13, 19],
      
      // ========== CENTRO DISTRIBUCIÓN SIBERIA ==========
      // Distribución Centro (dep 20)
      ['Laptop Panasonic Toughbook', 'Rugged, para despachos', 'Computador', 'PANA-SIB-2023-0079', 7500000, '2023-05-08', 14, 20],
      ['Montacargas Hyster H2.5FT', 'Combustión, 2.5 ton', 'Maquinaria', 'HYST-SIB-2022-0080', 72000000, '2022-06-20', 14, 20],
      ['Sistema GPS Flota Wialon', 'Licencia 15 vehículos', 'Software', 'WIAL-SIB-2023-0081', 5800000, '2023-01-25', 14, 20],
      ['Lector Código de Barras Honeywell', 'Voyager 1250g', 'Equipo', 'HONE-SIB-2023-0082', 520000, '2023-03-18', 14, 20],
      ['Impresora Etiquetas Zebra', 'ZD220 térmica', 'Impresora', 'ZEBR-SIB-2023-0083', 1100000, '2023-02-14', 14, 20],
    ];
    
    activos.forEach(a => this.createActivo({
      nombre: a[0],
      descripcion: a[1],
      tipo: a[2],
      serial: a[3],
      valor: a[4],
      fecha_compra: a[5],
      sede_id: a[6],
      departamento_id: a[7],
    }));
    
    localStorage.setItem(PREFIX + 'react_v10', '1');
  }
};

DB.init();
export default DB;
