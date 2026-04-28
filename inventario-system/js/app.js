/* InventPro v4 — Aplicacion principal */

// Iconos SVG
var IC = {
  dash: '<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>',
  pc: '<path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>',
  ppl: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
  swap: '<path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>',
  bld: '<path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>',
  dept: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  chart: '<path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/>',
  exit: '<path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>',
  add: '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>',
  edit: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
  del: '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>',
  save: '<path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>',
  back: '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>',
  check: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  warn: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
  ret: '<path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>',
  money: '<path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>',
  id: '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25S9.75 10.24 9.75 9 10.76 6.75 12 6.75zM17 17H7v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z"/>',
  pin: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>',
  menu: '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>'
};

function icon(name, size) {
  size = size || 18;
  var path = IC[name] || '';
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="currentColor" aria-hidden="true">' + path + '</svg>';
}

// Helpers
function $(id) { return document.getElementById(id); }
function esc(s) { if (!s) return ''; var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function formatCurrency(v) { return '$' + Number(v).toLocaleString('es-CO'); }
function formatDate(d) { if (!d) return '\u2014'; return new Date(d).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' }); }
function formatDateTime(d) { if (!d) return '\u2014'; return new Date(d).toLocaleString('es-CO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); }
function estadoBadge(e) { var m = { 'DISPONIBLE': 'badge-green', 'ASIGNADO': 'badge-yellow', 'DANADO': 'badge-red' }; return '<span class="badge ' + (m[e] || 'badge-gray') + '">' + e + '</span>'; }
function sedeName(id) { var s = DB.getSedeById(id); return s ? s.nombre : '\u2014'; }
function deptoName(id) { var d = DB.getDepartamentoById(id); return d ? d.nombre : '\u2014'; }

function exportCSV(filename, headers, rows) {
  var csv = headers.join(',') + '\n';
  for (var i = 0; i < rows.length; i++) {
    csv += rows[i].map(function(x) { return '"' + String(x || '').replace(/"/g, '""') + '"'; }).join(',') + '\n';
  }
  var blob = new Blob(['\ufeff' + csv], { type: 'text/csv' });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// App principal
var App = {
  user: null,
  editId: null,

  init: function() {
    this.user = DB.getSession();
    if (this.user) {
      this.showApp('dashboard');
    } else {
      this.showLanding();
    }
  },

  isAdmin: function() { return this.user && this.user.rol === 'ADMIN'; },
  canEdit: function() { return this.user && (this.user.rol === 'ADMIN' || this.user.rol === 'OPERADOR'); },

  // Filtra datos por sede del operador. Admin ve todo.
  filtrar: function(arr) {
    if (this.isAdmin()) return arr;
    var sid = this.user.sede_id;
    if (!sid) return arr;
    return arr.filter(function(x) { return x.sede_id === sid; });
  },

  notify: function(msg, type) {
    var d = document.createElement('div');
    d.setAttribute('role', 'alert');
    d.style.cssText = 'position:fixed;top:16px;right:16px;z-index:9999;padding:12px 20px;border-radius:8px;font-size:.86rem;font-weight:500;color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.2)';
    d.style.background = type === 'ok' ? '#059669' : type === 'er' ? '#dc2626' : '#2980b9';
    d.textContent = msg;
    document.body.appendChild(d);
    setTimeout(function() { d.style.opacity = '0'; d.style.transition = 'opacity .3s'; setTimeout(function() { d.remove(); }, 300); }, 2500);
  },

  log: function(action, detail) {
    DB.addLog(action, detail, this.user ? this.user.username : 'sistema');
  },

  toggleMobile: function() {
    var sb = document.querySelector('.sidebar');
    var ov = document.querySelector('.sidebar-overlay');
    if (sb) sb.classList.toggle('open');
    if (ov) ov.classList.toggle('open');
  },

  closeMobile: function() {
    var sb = document.querySelector('.sidebar');
    var ov = document.querySelector('.sidebar-overlay');
    if (sb) sb.classList.remove('open');
    if (ov) ov.classList.remove('open');
  },

  // ========== LANDING ==========
  showLanding: function() {
    $('app').innerHTML = '';
    $('auth').className = '';
    $('auth').innerHTML = Pages.landing();
    var self = this;
    ['lp-login', 'lp-start', 'lp-cta'].forEach(function(id) {
      if ($(id)) $(id).onclick = function() { self.showLogin(); };
    });
  },

  // ========== LOGIN ==========
  showLogin: function() {
    $('app').innerHTML = '';
    $('auth').className = '';
    $('auth').innerHTML = Pages.login();
    var self = this;
    $('login-form').onsubmit = function(ev) {
      ev.preventDefault();
      var u = DB.getUsuarioByUsername($('login-user').value);
      if (!u || u.password !== $('login-pass').value) {
        $('login-error').textContent = 'Usuario o contrasena incorrectos';
        $('login-error').className = 'alert alert-error';
        return;
      }
      DB.setSession({ id: u.id, username: u.username, email: u.email, rol: u.rol, sede_id: u.sede_id || null });
      self.user = DB.getSession();
      self.showApp('dashboard');
    };
    if ($('go-back')) $('go-back').onclick = function() { self.showLanding(); };
  },

  // ========== APP SHELL ==========
  showApp: function(page) {
    $('auth').className = 'hidden';
    $('auth').innerHTML = '';
    $('app').innerHTML = Pages.appShell(this.user, this.isAdmin());
    var self = this;

    // Nav clicks
    document.querySelectorAll('[data-page]').forEach(function(el) {
      el.onclick = function() { self.closeMobile(); self.go(el.getAttribute('data-page')); };
    });

    // Logout
    $('btn-logout').onclick = function() { self.user = null; DB.clearSession(); self.showLanding(); };

    // Mobile toggle
    if ($('mobile-toggle')) $('mobile-toggle').onclick = function() { self.toggleMobile(); };
    var overlay = document.querySelector('.sidebar-overlay');
    if (overlay) overlay.onclick = function() { self.closeMobile(); };

    this.go(page);
  },

  go: function(page) {
    if (page !== 'activo_form' && page !== 'empleado_form' && page !== 'sede_form' && page !== 'dep_form') {
      this.editId = null;
    }

    // Update active nav
    document.querySelectorAll('.nav-item').forEach(function(n) {
      n.className = 'nav-item' + (n.getAttribute('data-page') === page ? ' active' : '');
    });

    // Update topbar title
    var titles = {
      dashboard: icon('dash', 20) + ' Dashboard',
      activos: icon('pc', 20) + ' Activos',
      empleados: icon('ppl', 20) + ' Empleados',
      asignaciones: icon('swap', 20) + ' Asignaciones',
      sedes: icon('bld', 20) + ' Sedes',
      departamentos: icon('dept', 20) + ' Departamentos',
      reportes: icon('chart', 20) + ' Reportes',
      usuarios: icon('id', 20) + ' Usuarios',
      actividad: icon('save', 20) + ' Actividad',
      activo_form: icon('pc', 20) + ' Formulario Activo',
      empleado_form: icon('ppl', 20) + ' Formulario Empleado',
      sede_form: icon('bld', 20) + ' Formulario Sede',
      dep_form: icon('dept', 20) + ' Formulario Departamento'
    };
    $('topbar-title').innerHTML = titles[page] || page;

    // Render page
    if (this['page_' + page]) {
      this['page_' + page]($('page-content'));
    }
  },

  // Pages are defined in pages.js
};

document.addEventListener('DOMContentLoaded', function() { App.init(); });
