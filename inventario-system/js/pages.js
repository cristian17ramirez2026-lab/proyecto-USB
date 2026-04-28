/* InventPro v4 — Paginas */

var Pages = {

  // ========== LANDING ==========
  landing: function() {
    var stats = [['200+','Activos'],['100+','Empleados'],['20','Sedes'],['10','Departamentos']];
    var statsH = '';
    for (var s = 0; s < stats.length; s++) {
      statsH += '<div><div style="font-size:1.8rem;font-weight:800;color:#fff">' + stats[s][0] + '</div><div style="font-size:.78rem;color:#475569;margin-top:2px">' + stats[s][1] + '</div></div>';
    }

    var feats = [
      ['pc','Inventario','Control total de activos con serial unico, valor y estado.','#c0392b'],
      ['swap','Asignaciones','Asigne y devuelva activos con trazabilidad completa.','#2c3e50'],
      ['ppl','Personal','Gestione empleados por sede, departamento y cargo.','#27ae60'],
      ['bld','Multi-Sede','20 sedes con operadores independientes.','#f39c12'],
      ['chart','Reportes','Reportes por estado, sede y empleado con exportacion CSV.','#7c3aed'],
      ['id','Seguridad','Admin total + Operadores con permisos limitados.','#2c3e50']
    ];
    var featsH = '';
    for (var f = 0; f < feats.length; f++) {
      var ft = feats[f];
      featsH += '<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);border-radius:12px;padding:24px">' +
        '<div style="width:42px;height:42px;border-radius:10px;background:' + ft[3] + ';display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:#fff">' + icon(ft[0]) + '</div>' +
        '<h3 style="font-size:.9rem;font-weight:700;color:#e2e8f0;margin-bottom:6px">' + ft[1] + '</h3>' +
        '<p style="font-size:.82rem;color:#64748b;line-height:1.6">' + ft[2] + '</p></div>';
    }

    return '<div style="min-height:100vh;background:#1c2833">' +
      '<nav class="landing-nav"><div style="display:flex;align-items:center;gap:10px;color:#fff;font-weight:800;font-size:1.15rem">' + icon('bld', 24) + ' Invent<span style="color:#c0392b">Pro</span></div><button class="btn btn-red" id="lp-login" style="padding:8px 24px">Iniciar Sesion</button></nav>' +
      '<section style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:100px 24px 60px;text-align:center;position:relative;overflow:hidden">' +
        '<div style="position:absolute;width:700px;height:700px;background:radial-gradient(circle,rgba(220,38,38,.08),transparent 65%);top:-300px;left:50%;transform:translateX(-50%);border-radius:50%"></div>' +
        '<div style="position:relative;z-index:1;max-width:700px">' +
          '<div style="display:inline-block;background:rgba(220,38,38,.1);border:1px solid rgba(220,38,38,.18);color:#c0392b;padding:6px 18px;border-radius:20px;font-size:.72rem;font-weight:700;letter-spacing:1px;margin-bottom:24px">PLATAFORMA EMPRESARIAL</div>' +
          '<h1 style="font-size:3rem;font-weight:800;color:#fff;line-height:1.1;margin-bottom:20px">Control integral de<br><span style="background:linear-gradient(135deg,#c0392b,#2980b9);-webkit-background-clip:text;-webkit-text-fill-color:transparent">activos empresariales</span></h1>' +
          '<p style="color:#7b8fa8;font-size:1.05rem;line-height:1.8;margin-bottom:36px;max-width:560px;margin-left:auto;margin-right:auto">Administre inventario, empleados, sedes y departamentos desde una plataforma centralizada con trazabilidad completa y seguridad por roles.</p>' +
          '<button class="btn btn-red" id="lp-start" style="padding:14px 36px;font-size:1rem;border-radius:8px;margin-bottom:48px">Acceder al Sistema</button>' +
          '<div style="display:flex;justify-content:center;gap:48px;flex-wrap:wrap">' + statsH + '</div>' +
        '</div>' +
      '</section>' +
      '<section style="padding:80px 48px;background:#0f1629"><div style="text-align:center;margin-bottom:48px"><h2 style="font-size:1.7rem;font-weight:700;color:#fff;margin-bottom:8px">Funcionalidades</h2><p style="color:#64748b;font-size:.95rem">Todo en una sola plataforma</p></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:960px;margin:0 auto">' + featsH + '</div></section>' +
      '<section style="padding:56px 48px;background:linear-gradient(135deg,#2c3e50,#c0392b);text-align:center"><h2 style="font-size:1.4rem;font-weight:700;color:#fff;margin-bottom:8px">Listo para comenzar?</h2><p style="color:rgba(255,255,255,.7);margin-bottom:24px;font-size:.9rem">Inicie sesion para acceder al sistema</p><button class="btn" id="lp-cta" style="background:#fff;color:#c0392b;padding:12px 32px;font-size:.92rem;font-weight:600">Iniciar Sesion</button><div style="margin-top:20px;font-size:.74rem;color:rgba(255,255,255,.45)">Admin: <b>admin</b> / admin123</div></section>' +
      '<footer style="background:#1c2833;padding:18px 48px;text-align:center;color:#334155;font-size:.74rem;border-top:1px solid rgba(255,255,255,.04)">InventPro v4.0 &mdash; Plataforma Empresarial de Activos</footer></div>';
  },

  // ========== LOGIN ==========
  login: function() {
    return '<div style="display:flex;min-height:100vh">' +
      '<div class="auth-left" style="background:linear-gradient(160deg,#1c2833,#0c2135)">' +
        '<div style="position:relative;z-index:1">' +
          '<div style="display:flex;align-items:center;gap:10px;color:#fff;font-weight:800;font-size:1.2rem;margin-bottom:40px">' + icon('bld', 26) + ' Invent<span style="color:#c0392b">Pro</span></div>' +
          '<h1 style="font-size:2.2rem;font-weight:800;color:#fff;line-height:1.15;margin-bottom:14px">Bienvenido al<br><span style="color:#c0392b">sistema</span></h1>' +
          '<p style="color:#64748b;font-size:.95rem;line-height:1.7;max-width:400px;margin-bottom:32px">Acceda a su panel de control para gestionar activos, empleados, sedes y departamentos.</p>' +
          '<div style="display:flex;flex-direction:column;gap:14px">' +
            '<div style="display:flex;align-items:center;gap:12px;color:#7b8fa8;font-size:.88rem"><div style="width:32px;height:32px;border-radius:6px;background:rgba(192,57,43,.15);display:flex;align-items:center;justify-content:center;color:#c0392b">' + icon('check', 16) + '</div>Control de inventario en tiempo real</div>' +
            '<div style="display:flex;align-items:center;gap:12px;color:#7b8fa8;font-size:.88rem"><div style="width:32px;height:32px;border-radius:6px;background:rgba(41,128,185,.15);display:flex;align-items:center;justify-content:center;color:#2980b9">' + icon('check', 16) + '</div>Gestion multi-sede con roles</div>' +
            '<div style="display:flex;align-items:center;gap:12px;color:#7b8fa8;font-size:.88rem"><div style="width:32px;height:32px;border-radius:6px;background:rgba(192,57,43,.15);display:flex;align-items:center;justify-content:center;color:#c0392b">' + icon('check', 16) + '</div>Reportes y trazabilidad completa</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="auth-right">' +
        '<div style="width:100%;max-width:380px">' +
          '<h2 style="font-size:1.3rem;font-weight:700;color:#2c3e50;margin-bottom:4px">Iniciar Sesion</h2>' +
          '<p style="font-size:.86rem;color:#7f8c8d;margin-bottom:24px">Ingrese sus credenciales de acceso</p>' +
          '<div id="login-error" class="alert alert-error hidden"></div>' +
          '<form id="login-form">' +
            '<div class="form-group"><label>Usuario</label><input type="text" class="form-control" id="login-user" placeholder="admin" required></div>' +
            '<div class="form-group"><label>Contrasena</label><input type="password" class="form-control" id="login-pass" placeholder="admin123" required></div>' +
            '<button type="submit" class="btn btn-red" style="width:100%;justify-content:center;padding:12px;font-size:.9rem">Iniciar Sesion</button>' +
          '</form>' +
          '<p style="text-align:center;margin-top:12px"><a id="go-back" style="color:#94a3b8;font-size:.82rem;cursor:pointer;text-decoration:none">Volver al inicio</a></p>' +
          '<div style="margin-top:20px;padding:14px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;font-size:.76rem;color:#991b1b"><b>Credenciales:</b><br>Admin: <b>admin</b> / <b>admin123</b><br>Cree operadores desde el menu Usuarios</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  },

  // ========== APP SHELL ==========
  appShell: function(user, isAdmin) {
    var menu = [
      { section: 'PRINCIPAL' },
      { page: 'dashboard', ic: 'dash', label: 'Dashboard' },
      { section: 'INVENTARIO' },
      { page: 'activos', ic: 'pc', label: 'Activos' },
      { page: 'empleados', ic: 'ppl', label: 'Empleados' },
      { page: 'asignaciones', ic: 'swap', label: 'Asignaciones' },
      { section: 'ORGANIZACION' },
      { page: 'sedes', ic: 'bld', label: 'Sedes' },
      { page: 'departamentos', ic: 'dept', label: 'Departamentos' },
      { section: 'ANALISIS' },
      { page: 'reportes', ic: 'chart', label: 'Reportes' }
    ];
    if (isAdmin) {
      menu.push({ section: 'ADMINISTRACION' });
      menu.push({ page: 'usuarios', ic: 'id', label: 'Usuarios' });
      menu.push({ page: 'actividad', ic: 'save', label: 'Actividad' });
    }

    var navH = '';
    for (var i = 0; i < menu.length; i++) {
      var m = menu[i];
      if (m.section) {
        navH += '<div class="nav-section">' + m.section + '</div>';
      } else {
        navH += '<div class="nav-item" data-page="' + m.page + '" role="button" tabindex="0" aria-label="' + m.label + '">' + icon(m.ic) + ' ' + m.label + '</div>';
      }
    }

    var rolBadge = user.rol === 'ADMIN' ? 'badge-red' : 'badge-blue';

    return '<div class="layout">' +
      '<div class="sidebar-overlay"></div>' +
      '<aside class="sidebar" role="navigation" aria-label="Menu principal">' +
        '<div class="sidebar-header"><h1>' + icon('bld', 22) + ' Invent<span>Pro</span></h1><small>Plataforma Empresarial v4</small></div>' +
        '<div class="sidebar-user"><div class="avatar">' + esc(user.username[0]).toUpperCase() + '</div><div class="sidebar-user-info"><b>' + esc(user.username) + '</b><small>' + user.rol + (user.sede_id ? ' | Sede ' + user.sede_id : '') + '</small></div></div>' +
        '<nav class="sidebar-nav">' + navH + '</nav>' +
        '<div class="sidebar-footer"><button id="btn-logout" aria-label="Cerrar sesion">' + icon('exit', 16) + ' Cerrar sesion</button></div>' +
      '</aside>' +
      '<div class="main">' +
        '<div class="topbar">' +
          '<div style="display:flex;align-items:center;gap:12px"><button class="mobile-toggle" id="mobile-toggle" aria-label="Abrir menu">' + icon('menu', 24) + '</button><h2 id="topbar-title">' + icon('dash', 20) + ' Dashboard</h2></div>' +
          '<div class="topbar-right">' + formatDate(new Date()) + ' <span class="badge ' + rolBadge + '">' + user.rol + '</span></div>' +
        '</div>' +
        '<div class="content" id="page-content"></div>' +
      '</div>' +
    '</div>';
  }
};
