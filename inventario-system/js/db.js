/* InventPro v4 — Base de datos con localStorage */
var DB = {
  get: function(key) {
    try { return JSON.parse(localStorage.getItem('ip_' + key)) || []; }
    catch(e) { return []; }
  },
  set: function(key, data) {
    localStorage.setItem('ip_' + key, JSON.stringify(data));
  },
  nextId: function(key) {
    var items = this.get(key);
    return items.length ? Math.max.apply(null, items.map(function(x) { return x.id; })) + 1 : 1;
  },

  // — Usuarios —
  getUsuarios: function() { return this.get('usuarios'); },
  getUsuarioById: function(id) {
    var arr = this.getUsuarios();
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  },
  getUsuarioByUsername: function(u) {
    var arr = this.getUsuarios();
    for (var i = 0; i < arr.length; i++) if (arr[i].username === u) return arr[i];
    return null;
  },
  getUsuarioByEmail: function(e) {
    var arr = this.getUsuarios();
    for (var i = 0; i < arr.length; i++) if (arr[i].email === e) return arr[i];
    return null;
  },
  createUsuario: function(data) {
    var arr = this.getUsuarios();
    data.id = this.nextId('usuarios');
    if (!data.rol) data.rol = 'OPERADOR';
    arr.push(data);
    this.set('usuarios', arr);
    return data;
  },
  deleteUsuario: function(id) {
    this.set('usuarios', this.getUsuarios().filter(function(x) { return x.id !== id; }));
  },

  // — Sedes —
  getSedes: function() { return this.get('sedes'); },
  getSedeById: function(id) {
    var arr = this.getSedes();
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  },
  createSede: function(data) {
    var arr = this.getSedes();
    data.id = this.nextId('sedes');
    arr.push(data);
    this.set('sedes', arr);
    return data;
  },
  updateSede: function(id, data) {
    var arr = this.getSedes();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        for (var k in data) arr[i][k] = data[k];
        this.set('sedes', arr);
        return arr[i];
      }
    }
    return null;
  },
  deleteSede: function(id) {
    this.set('sedes', this.getSedes().filter(function(x) { return x.id !== id; }));
  },

  // — Departamentos —
  getDepartamentos: function() { return this.get('departamentos'); },
  getDepartamentoById: function(id) {
    var arr = this.getDepartamentos();
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  },
  createDepartamento: function(data) {
    var arr = this.getDepartamentos();
    data.id = this.nextId('departamentos');
    arr.push(data);
    this.set('departamentos', arr);
    return data;
  },
  updateDepartamento: function(id, data) {
    var arr = this.getDepartamentos();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        for (var k in data) arr[i][k] = data[k];
        this.set('departamentos', arr);
        return arr[i];
      }
    }
    return null;
  },
  deleteDepartamento: function(id) {
    this.set('departamentos', this.getDepartamentos().filter(function(x) { return x.id !== id; }));
  },

  // — Activos —
  getActivos: function() { return this.get('activos'); },
  getActivoById: function(id) {
    var arr = this.getActivos();
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  },
  createActivo: function(data) {
    var arr = this.getActivos();
    data.id = this.nextId('activos');
    if (!data.estado) data.estado = 'DISPONIBLE';
    arr.push(data);
    this.set('activos', arr);
    return data;
  },
  updateActivo: function(id, data) {
    var arr = this.getActivos();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        for (var k in data) arr[i][k] = data[k];
        this.set('activos', arr);
        return arr[i];
      }
    }
    return null;
  },
  deleteActivo: function(id) {
    this.set('activos', this.getActivos().filter(function(x) { return x.id !== id; }));
  },

  // — Empleados —
  getEmpleados: function() { return this.get('empleados'); },
  getEmpleadoById: function(id) {
    var arr = this.getEmpleados();
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  },
  createEmpleado: function(data) {
    var arr = this.getEmpleados();
    data.id = this.nextId('empleados');
    arr.push(data);
    this.set('empleados', arr);
    return data;
  },
  updateEmpleado: function(id, data) {
    var arr = this.getEmpleados();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        for (var k in data) arr[i][k] = data[k];
        this.set('empleados', arr);
        return arr[i];
      }
    }
    return null;
  },
  deleteEmpleado: function(id) {
    this.set('empleados', this.getEmpleados().filter(function(x) { return x.id !== id; }));
  },

  // — Asignaciones —
  getAsignaciones: function() { return this.get('asignaciones'); },
  getAsignacionById: function(id) {
    var arr = this.getAsignaciones();
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    return null;
  },
  createAsignacion: function(data) {
    var arr = this.getAsignaciones();
    data.id = this.nextId('asignaciones');
    data.fecha_asignacion = new Date().toISOString();
    data.fecha_devolucion = null;
    arr.push(data);
    this.set('asignaciones', arr);
    return data;
  },
  updateAsignacion: function(id, data) {
    var arr = this.getAsignaciones();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        for (var k in data) arr[i][k] = data[k];
        this.set('asignaciones', arr);
        return arr[i];
      }
    }
    return null;
  },

  // — Log de actividad —
  getLog: function() { return this.get('log').slice().reverse(); },
  addLog: function(action, detail, username) {
    var log = this.get('log');
    log.push({
      id: log.length + 1,
      action: action,
      detail: detail,
      user: username || 'sistema',
      fecha: new Date().toISOString()
    });
    if (log.length > 200) log = log.slice(-200);
    this.set('log', log);
  },
  clearLog: function() { this.set('log', []); },

  // — Sesion —
  setSession: function(u) { localStorage.setItem('ip_session', JSON.stringify(u)); },
  getSession: function() {
    try { return JSON.parse(localStorage.getItem('ip_session')); }
    catch(e) { return null; }
  },
  clearSession: function() { localStorage.removeItem('ip_session'); },

  // — Inicializar datos de ejemplo —
  init: function() {
    if (localStorage.getItem('ip_initialized')) return;

    // Limpiar datos previos
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf('ip_') === 0) keys.push(k);
    }
    for (var j = 0; j < keys.length; j++) localStorage.removeItem(keys[j]);

    // Admin
    this.createUsuario({
      username: 'admin', email: 'admin@inventpro.com',
      password: 'admin123', rol: 'ADMIN',
      nombre: 'Administrador', apellido: 'General'
    });

    // 20 Sedes colombianas
    var sedes = [
      ['Sede Bogota','Bogota','Cra 7 #72-41','601-555-0100'],
      ['Sede Medellin','Medellin','Calle 10 #43','604-555-0200'],
      ['Sede Cali','Cali','Av 6N #25','602-555-0300'],
      ['Sede Barranquilla','Barranquilla','Cra 54 #72','605-555-0400'],
      ['Sede Cartagena','Cartagena','Bocagrande Cra 3','605-555-0500'],
      ['Sede Bucaramanga','Bucaramanga','Calle 36 #19','607-555-0600'],
      ['Sede Pereira','Pereira','Av Circunvalar','606-555-0700'],
      ['Sede Manizales','Manizales','Cra 23 #65','606-555-0800'],
      ['Sede Santa Marta','Santa Marta','Calle 22 #3','605-555-0900'],
      ['Sede Ibague','Ibague','Cra 5 #40','608-555-1000'],
      ['Sede Cucuta','Cucuta','Av 0 #10','607-555-1100'],
      ['Sede Villavicencio','Villavicencio','Calle 39','608-555-1200'],
      ['Sede Pasto','Pasto','Cra 27 #18','602-555-1300'],
      ['Sede Neiva','Neiva','Calle 8 #5','608-555-1400'],
      ['Sede Armenia','Armenia','Cra 14 #20','606-555-1500'],
      ['Sede Popayan','Popayan','Calle 5 #8','602-555-1600'],
      ['Sede Monteria','Monteria','Cra 6 #62','604-555-1700'],
      ['Sede Sincelejo','Sincelejo','Calle 25','605-555-1800'],
      ['Sede Tunja','Tunja','Cra 10 #18','608-555-1900'],
      ['Sede Florencia','Florencia','Calle 16','608-555-2000']
    ];
    for (var s = 0; s < sedes.length; s++) {
      this.createSede({ nombre: sedes[s][0], ciudad: sedes[s][1], direccion: sedes[s][2], telefono: sedes[s][3] });
    }

    // 10 Departamentos
    var deps = [
      ['Tecnologia',1,'Sistemas'],['Contabilidad',1,'Finanzas'],
      ['Recursos Humanos',1,'Admin'],['Gerencia',1,'Direccion'],
      ['Soporte TI',2,'Sistemas'],['Ventas',2,'Comercial'],
      ['Logistica',3,'Operaciones'],['Marketing',1,'Comunicaciones'],
      ['Legal',1,'Legal'],['Compras',4,'Admin']
    ];
    for (var d = 0; d < deps.length; d++) {
      this.createDepartamento({ nombre: deps[d][0], sede_id: deps[d][1], area: deps[d][2], responsable: '' });
    }

    // 100 Empleados
    var noms = ['Carlos','Maria','Juan','Ana','Pedro','Laura','Diego','Sofia','Roberto','Carmen','Andres','Valentina','Felipe','Daniela','Santiago','Camila','Nicolas','Isabella','Sebastian','Natalia','Alejandro','Gabriela','David','Mariana','Jorge','Paula','Luis','Andrea','Fernando','Catalina','Ivan','Tatiana','Jaime','Viviana','Mauricio','Sandra','Ernesto','Luz','Arturo','Pilar','Gonzalo','Rocio','Hernan','Olga','Rodrigo','Yolanda','Enrique','Marta','Alvaro','Beatriz'];
    var apes = ['Rodriguez','Lopez','Martinez','Garcia','Sanchez','Diaz','Torres','Herrera','Mendez','Ruiz','Gomez','Morales','Ortiz','Ramirez','Vargas','Castro','Rojas','Reyes','Jimenez','Pena','Cardenas','Gutierrez','Salazar','Rios','Acosta','Navarro','Aguilar','Molina','Delgado','Guerrero','Medina','Suarez','Vega','Romero','Soto','Contreras','Paredes','Espinoza','Fuentes','Valenzuela','Bravo','Campos','Figueroa','Flores','Lara','Leon','Marin','Mejia','Munoz','Ospina'];
    var cargos = ['Desarrollador','Analista','Coordinador','Asistente','Auxiliar','Ingeniero','Contador','Abogado','Disenador','Ejecutivo','Supervisor','Tecnico','Consultor','Especialista','Auditor','Secretaria','Recepcionista','Mensajero','Vigilante','Operario'];

    for (var m = 0; m < 100; m++) {
      var ni = m % noms.length, ai = m % apes.length, ci = m % cargos.length;
      var di = (m % 10) + 1, si = (m % 20) + 1;
      this.createEmpleado({
        nombre: noms[ni], apellido: apes[ai],
        cedula: '' + (1000000000 + m * 111),
        departamento_id: di, sede_id: si,
        cargo: cargos[ci] + ' ' + deps[(di - 1) % 10][0],
        email: noms[ni].toLowerCase() + '.' + apes[ai].toLowerCase() + m + '@empresa.com'
      });
    }

    // 200 Activos
    var items = [
      ['Laptop Dell Latitude','16GB i7 SSD','Computador',3500000],
      ['Laptop HP ProBook','8GB i5','Computador',2800000],
      ['Laptop Lenovo ThinkPad','16GB i7','Computador',3200000],
      ['MacBook Pro M3','16GB 512GB','Computador',5200000],
      ['Desktop Dell OptiPlex','16GB i5','Computador',2200000],
      ['Monitor Samsung 27','4K Curvo','Monitor',1200000],
      ['Monitor LG 24','FHD IPS','Monitor',650000],
      ['Monitor Dell 32','4K USB-C','Monitor',1800000],
      ['Impresora HP LaserJet','Laser color','Impresora',850000],
      ['Impresora Epson L3250','Tinta continua','Impresora',420000],
      ['Silla Ergonomica','Ajustable lumbar','Mobiliario',650000],
      ['Escritorio Ejecutivo','En L cajones','Mobiliario',780000],
      ['Mesa Reunion 8p','Madera roble','Mobiliario',1500000],
      ['Teclado Logitech MX','Inalambrico','Periferico',180000],
      ['Mouse Logitech MX','Ergonomico','Periferico',120000],
      ['Webcam Logitech C920','FHD','Periferico',250000],
      ['Headset Jabra Evolve','Bluetooth','Periferico',380000],
      ['Servidor Dell PowerEdge','64GB RAID','Servidor',12500000],
      ['NAS Synology 4Bay','16TB','Almacenamiento',2800000],
      ['Switch Cisco 48P','Gigabit PoE','Red',3200000],
      ['Router Cisco ISR','VPN','Red',2800000],
      ['Access Point Ubiquiti','WiFi 6','Red',450000],
      ['Firewall FortiGate','100E','Red',4500000],
      ['UPS APC 3000VA','Respaldo 30min','Energia',1800000],
      ['Proyector Epson 4000L','HDMI','Audiovisual',2100000],
      ['TV Samsung 65','4K Smart','Audiovisual',3200000],
      ['Telefono IP Cisco','PoE','Telefonia',280000],
      ['Camara Hikvision 4MP','PoE IR','Seguridad',320000],
      ['DVR Hikvision 16CH','4TB','Seguridad',850000],
      ['Aire Acondicionado','24000BTU','Climatizacion',2800000]
    ];

    for (var a = 0; a < 200; a++) {
      var it = items[a % items.length];
      var si2 = (a % 20) + 1, di2 = (a % 10) + 1;
      this.createActivo({
        nombre: it[0] + ' #' + (a + 1),
        descripcion: it[1], tipo: it[2],
        serial: it[2].substring(0, 2).toUpperCase() + '-' + String(1000 + a),
        valor: it[3] + Math.floor(Math.random() * 200000) - 100000,
        fecha_compra: '202' + (3 + Math.floor(a / 80)) + '-' + String(1 + a % 12).padStart(2, '0') + '-' + String(1 + a % 28).padStart(2, '0'),
        sede_id: si2, departamento_id: di2
      });
    }

    // Marcar algunos como danados
    for (var dd = 0; dd < 15; dd++) this.updateActivo(10 + dd * 13, { estado: 'DANADO' });

    // Crear asignaciones iniciales
    for (var g = 0; g < 40; g++) {
      this.createAsignacion({ activo_id: 1 + g * 4, empleado_id: 1 + (g % 100), observaciones: 'Asignacion inicial' });
      this.updateActivo(1 + g * 4, { estado: 'ASIGNADO' });
    }

    localStorage.setItem('ip_initialized', '1');
  }
};

DB.init();
