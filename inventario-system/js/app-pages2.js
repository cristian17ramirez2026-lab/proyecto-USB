/* InventPro v4 - Sedes, Departamentos, Asignaciones, Reportes, Usuarios, Actividad */

// ========== SEDES (solo ADMIN puede crear/editar/eliminar) ==========
App.page_sedes = function(c) {
  var sedes = DB.getSedes(), adm = this.isAdmin(), self = this;
  var r = '';
  if (!sedes.length) {
    r = '<div class="empty-state">No hay sedes</div>';
  } else {
    r = '<table><thead><tr><th>Sede</th><th>Ciudad</th><th>Direccion</th><th>Telefono</th><th>Deptos</th><th>Activos</th>';
    if (adm) r += '<th>Acciones</th>';
    r += '</tr></thead><tbody>';
    for (var i = 0; i < sedes.length; i++) {
      var x = sedes[i];
      var nd = DB.getDepartamentos().filter(function(d) { return d.sede_id === x.id; }).length;
      var na = DB.getActivos().filter(function(a) { return a.sede_id === x.id; }).length;
      r += '<tr><td><b>' + esc(x.nombre) + '</b></td><td>' + esc(x.ciudad) + '</td><td>' + esc(x.direccion) + '</td><td>' + esc(x.telefono) + '</td>';
      r += '<td><span class="badge badge-blue">' + nd + '</span></td><td><span class="badge badge-purple">' + na + '</span></td>';
      if (adm) r += '<td class="actions"><button class="btn btn-outline btn-sm edit-sede" data-id="' + x.id + '" aria-label="Editar sede">' + icon('edit', 14) + '</button><button class="btn btn-red btn-sm del-sede" data-id="' + x.id + '" aria-label="Eliminar sede">' + icon('del', 14) + '</button></td>';
      r += '</tr>';
    }
    r += '</tbody></table>';
  }

  c.innerHTML = '<div class="page-header"><h2>Sedes (' + sedes.length + ')</h2>' +
    (adm ? '<button class="btn btn-blue" id="btn-new-sede">' + icon('add', 15) + ' Nueva Sede</button>' : '') +
    '</div><div class="card"><div class="card-body" style="padding:0;overflow-x:auto">' + r + '</div></div>';

  if ($('btn-new-sede')) $('btn-new-sede').onclick = function() { self.editId = null; self.go('sede_form'); };
  document.querySelectorAll('.edit-sede').forEach(function(b) {
    b.onclick = function() { self.editId = +b.getAttribute('data-id'); self.go('sede_form'); };
  });
  document.querySelectorAll('.del-sede').forEach(function(b) {
    b.onclick = function() {
      var id = +b.getAttribute('data-id');
      // Validar dependencias
      var tieneActivos = DB.getActivos().some(function(a) { return a.sede_id === id; });
      var tieneEmpleados = DB.getEmpleados().some(function(e) { return e.sede_id === id; });
      var tieneDeps = DB.getDepartamentos().some(function(d) { return d.sede_id === id; });
      if (tieneActivos || tieneEmpleados || tieneDeps) {
        alert('No se puede eliminar: la sede tiene ' +
          (tieneActivos ? 'activos' : '') +
          (tieneEmpleados ? (tieneActivos ? ', ' : '') + 'empleados' : '') +
          (tieneDeps ? ((tieneActivos || tieneEmpleados) ? ', ' : '') + 'departamentos' : '') +
          ' asociados.');
        return;
      }
      if (confirm('Eliminar sede?')) {
        DB.deleteSede(id);
        self.notify('Sede eliminada', 'er');
        self.log('Sede eliminada', 'ID ' + id);
        self.go('sedes');
      }
    };
  });
};

// ========== SEDE FORM (solo ADMIN) ==========
App.page_sede_form = function(c) {
  var self = this, eid = this.editId;
  if (!this.isAdmin()) { c.innerHTML = '<div class="alert alert-error">Solo el administrador puede gestionar sedes.</div>'; return; }

  c.innerHTML = '<div style="max-width:600px;margin:0 auto"><div class="card"><div class="card-header">' + icon('bld', 18) + ' ' + (eid ? 'Editar' : 'Nueva') + ' Sede</div><div class="card-body">' +
    '<div id="sede-error" class="alert alert-error hidden"></div>' +
    '<form id="sede-form">' +
      '<div class="form-group"><label>Nombre</label><input type="text" class="form-control" id="sf-nombre" required></div>' +
      '<div class="form-row"><div class="form-group"><label>Ciudad</label><input type="text" class="form-control" id="sf-ciudad" required></div><div class="form-group"><label>Telefono</label><input type="text" class="form-control" id="sf-tel"></div></div>' +
      '<div class="form-group"><label>Direccion</label><input type="text" class="form-control" id="sf-dir" required></div>' +
      '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button type="button" class="btn btn-gray" id="sf-cancel">Cancelar</button><button type="submit" class="btn btn-blue">Guardar</button></div>' +
    '</form></div></div></div>';

  if (eid) {
    var s = DB.getSedeById(eid);
    if (s) { $('sf-nombre').value = s.nombre; $('sf-ciudad').value = s.ciudad; $('sf-tel').value = s.telefono || ''; $('sf-dir').value = s.direccion; }
  }

  $('sede-form').onsubmit = function(ev) {
    ev.preventDefault();
    var data = { nombre: $('sf-nombre').value.trim(), ciudad: $('sf-ciudad').value.trim(), telefono: $('sf-tel').value.trim(), direccion: $('sf-dir').value.trim() };
    if (!data.nombre || !data.ciudad || !data.direccion) { $('sede-error').textContent = 'Complete los campos.'; $('sede-error').className = 'alert alert-error'; return; }
    if (eid) DB.updateSede(eid, data);
    else DB.createSede(data);
    self.notify('Sede guardada', 'ok');
    self.log('Sede', data.nombre);
    self.go('sedes');
  };
  $('sf-cancel').onclick = function() { self.go('sedes'); };
};

// ========== DEPARTAMENTOS ==========
App.page_departamentos = function(c) {
  var deps = DB.getDepartamentos(), adm = this.isAdmin(), self = this;
  var r = '';
  if (!deps.length) {
    r = '<div class="empty-state">No hay departamentos</div>';
  } else {
    r = '<table><thead><tr><th>Departamento</th><th>Sede</th><th>Area</th><th>Responsable</th><th>Empleados</th>';
    if (adm) r += '<th>Acciones</th>';
    r += '</tr></thead><tbody>';
    for (var i = 0; i < deps.length; i++) {
      var x = deps[i];
      var ne = DB.getEmpleados().filter(function(e) { return e.departamento_id === x.id; }).length;
      r += '<tr><td><b>' + esc(x.nombre) + '</b></td><td>' + sedeName(x.sede_id) + '</td><td><span class="badge badge-blue">' + esc(x.area) + '</span></td><td>' + esc(x.responsable) + '</td><td><span class="badge badge-purple">' + ne + '</span></td>';
      if (adm) r += '<td class="actions"><button class="btn btn-outline btn-sm edit-dep" data-id="' + x.id + '" aria-label="Editar departamento">' + icon('edit', 14) + '</button><button class="btn btn-red btn-sm del-dep" data-id="' + x.id + '" aria-label="Eliminar departamento">' + icon('del', 14) + '</button></td>';
      r += '</tr>';
    }
    r += '</tbody></table>';
  }

  c.innerHTML = '<div class="page-header"><h2>Departamentos (' + deps.length + ')</h2>' +
    (adm ? '<button class="btn btn-blue" id="btn-new-dep">' + icon('add', 15) + ' Nuevo Depto</button>' : '') +
    '</div><div class="card"><div class="card-body" style="padding:0;overflow-x:auto">' + r + '</div></div>';

  if ($('btn-new-dep')) $('btn-new-dep').onclick = function() { self.editId = null; self.go('dep_form'); };
  document.querySelectorAll('.edit-dep').forEach(function(b) { b.onclick = function() { self.editId = +b.getAttribute('data-id'); self.go('dep_form'); }; });
  document.querySelectorAll('.del-dep').forEach(function(b) {
    b.onclick = function() {
      var id = +b.getAttribute('data-id');
      var tieneEmps = DB.getEmpleados().some(function(e) { return e.departamento_id === id; });
      var tieneActs = DB.getActivos().some(function(a) { return a.departamento_id === id; });
      if (tieneEmps || tieneActs) {
        alert('No se puede eliminar: el departamento tiene ' + (tieneEmps ? 'empleados' : '') + (tieneEmps && tieneActs ? ' y ' : '') + (tieneActs ? 'activos' : '') + ' asociados.');
        return;
      }
      if (confirm('Eliminar departamento?')) { DB.deleteDepartamento(id); self.notify('Departamento eliminado', 'er'); self.go('departamentos'); }
    };
  });
};

// ========== DEPARTAMENTO FORM (solo ADMIN) ==========
App.page_dep_form = function(c) {
  var self = this, eid = this.editId;
  if (!this.isAdmin()) { c.innerHTML = '<div class="alert alert-error">Solo el administrador puede gestionar departamentos.</div>'; return; }

  var sedes = DB.getSedes();
  var sedeOpts = '';
  for (var i = 0; i < sedes.length; i++) sedeOpts += '<option value="' + sedes[i].id + '">' + esc(sedes[i].nombre) + '</option>';

  c.innerHTML = '<div style="max-width:600px;margin:0 auto"><div class="card"><div class="card-header">' + icon('dept', 18) + ' ' + (eid ? 'Editar' : 'Nuevo') + ' Departamento</div><div class="card-body">' +
    '<div id="dep-error" class="alert alert-error hidden"></div>' +
    '<form id="dep-form">' +
      '<div class="form-row"><div class="form-group"><label>Nombre</label><input type="text" class="form-control" id="df-nombre" required></div><div class="form-group"><label>Sede</label><select class="form-control" id="df-sede" required><option value="">Seleccione...</option>' + sedeOpts + '</select></div></div>' +
      '<div class="form-row"><div class="form-group"><label>Area</label><input type="text" class="form-control" id="df-area" required></div><div class="form-group"><label>Responsable</label><input type="text" class="form-control" id="df-resp"></div></div>' +
      '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button type="button" class="btn btn-gray" id="df-cancel">Cancelar</button><button type="submit" class="btn btn-blue">Guardar</button></div>' +
    '</form></div></div></div>';

  if (eid) {
    var d = DB.getDepartamentoById(eid);
    if (d) { $('df-nombre').value = d.nombre; $('df-sede').value = d.sede_id; $('df-area').value = d.area; $('df-resp').value = d.responsable || ''; }
  }

  $('dep-form').onsubmit = function(ev) {
    ev.preventDefault();
    var data = { nombre: $('df-nombre').value.trim(), sede_id: +$('df-sede').value, area: $('df-area').value.trim(), responsable: $('df-resp').value.trim() };
    if (!data.nombre || !data.sede_id || !data.area) { $('dep-error').textContent = 'Complete los campos.'; $('dep-error').className = 'alert alert-error'; return; }
    if (eid) DB.updateDepartamento(eid, data);
    else DB.createDepartamento(data);
    self.notify('Departamento guardado', 'ok');
    self.log('Departamento', data.nombre);
    self.go('departamentos');
  };
  $('df-cancel').onclick = function() { self.go('departamentos'); };
};


// ========== ASIGNACIONES ==========
App.page_asignaciones = function(c) {
  var self = this, adm = this.isAdmin(), canA = this.canEdit();
  var misActivos = this.filtrar(DB.getActivos());
  var aDisp = misActivos.filter(function(a) { return a.estado === 'DISPONIBLE'; });
  var emps = this.filtrar(DB.getEmpleados());
  var allAsg = DB.getAsignaciones();

  // Filtrar asignaciones por sede
  var asigs;
  if (adm) {
    asigs = allAsg;
  } else {
    var sedeActIds = {};
    for (var z = 0; z < misActivos.length; z++) sedeActIds[misActivos[z].id] = true;
    asigs = allAsg.filter(function(a) { return sedeActIds[a.activo_id]; });
  }
  asigs = asigs.slice().sort(function(a, b) { return new Date(b.fecha_asignacion) - new Date(a.fecha_asignacion); });

  var activoOpts = '', empOpts = '';
  for (var i = 0; i < aDisp.length; i++) activoOpts += '<option value="' + aDisp[i].id + '">' + esc(aDisp[i].nombre) + ' | ' + esc(aDisp[i].serial) + '</option>';
  for (var j = 0; j < emps.length; j++) empOpts += '<option value="' + emps[j].id + '">' + esc(emps[j].nombre) + ' ' + esc(emps[j].apellido) + '</option>';

  var rows = '';
  if (!asigs.length) {
    rows = '<div class="empty-state">No hay asignaciones</div>';
  } else {
    rows = '<table><thead><tr><th>Activo</th><th>Empleado</th><th>Sede</th><th>Fecha</th><th>Estado</th><th>Notas</th>';
    if (canA) rows += '<th>Acciones</th>';
    rows += '</tr></thead><tbody>';
    for (var k = 0; k < asigs.length; k++) {
      var x = asigs[k];
      var act = DB.getActivoById(x.activo_id);
      var emp = DB.getEmpleadoById(x.empleado_id);
      var est = x.fecha_devolucion
        ? '<span class="badge badge-green">Devuelta</span><br><small>' + formatDate(x.fecha_devolucion) + '</small>'
        : '<span class="badge badge-yellow">Activa</span>';
      var acc = (!x.fecha_devolucion && canA)
        ? '<button class="btn btn-green btn-sm btn-devolver" data-id="' + x.id + '" aria-label="Devolver activo">' + icon('ret', 14) + ' Devolver</button>'
        : '';
      rows += '<tr><td>' + (act ? '<b>' + esc(act.nombre) + '</b><br><small style="color:#7f8c8d">' + esc(act.serial) + '</small>' : '?') + '</td>';
      rows += '<td>' + (emp ? esc(emp.nombre) + ' ' + esc(emp.apellido) : '?') + '</td>';
      rows += '<td>' + (act ? sedeName(act.sede_id) : '-') + '</td>';
      rows += '<td>' + formatDateTime(x.fecha_asignacion) + '</td>';
      rows += '<td>' + est + '</td>';
      rows += '<td style="max-width:150px">' + (x.observaciones ? esc(x.observaciones) : '-') + '</td>';
      if (canA) rows += '<td>' + acc + '</td>';
      rows += '</tr>';
    }
    rows += '</tbody></table>';
  }

  var formH = '';
  if (canA) {
    formH = '<div class="card" style="margin-bottom:20px"><div class="card-header">Nueva Asignacion</div><div class="card-body">' +
      '<div id="asig-error" class="alert alert-error hidden"></div>' +
      '<form id="asig-form"><div class="form-row-3">' +
        '<div class="form-group"><label>Activo disponible</label><select class="form-control" id="asig-activo">' + (aDisp.length ? '<option value="">Seleccione...</option>' + activoOpts : '<option value="">Sin disponibles</option>') + '</select></div>' +
        '<div class="form-group"><label>Empleado</label><select class="form-control" id="asig-emp">' + (emps.length ? '<option value="">Seleccione...</option>' + empOpts : '<option value="">Sin empleados</option>') + '</select></div>' +
        '<div class="form-group"><label>Observaciones</label><input type="text" class="form-control" id="asig-obs" placeholder="Opcional"></div>' +
      '</div><button type="submit" class="btn btn-blue"' + (aDisp.length === 0 || emps.length === 0 ? ' disabled' : '') + '>Registrar</button></form></div></div>';
  }

  c.innerHTML = '<div class="page-header"><h2>Asignaciones (' + asigs.length + ')</h2></div>' + formH +
    '<div class="card"><div class="card-body" style="padding:0;overflow-x:auto">' + rows + '</div></div>';

  if ($('asig-form')) {
    $('asig-form').onsubmit = function(ev) {
      ev.preventDefault();
      var aid = +$('asig-activo').value, eid = +$('asig-emp').value, obs = $('asig-obs').value.trim();
      var er = $('asig-error');
      if (!aid || !eid) { er.textContent = 'Seleccione activo y empleado.'; er.className = 'alert alert-error'; return; }
      var act = DB.getActivoById(aid);
      if (!act || act.estado !== 'DISPONIBLE') { er.textContent = 'Activo no disponible.'; er.className = 'alert alert-error'; return; }
      DB.createAsignacion({ activo_id: aid, empleado_id: eid, observaciones: obs });
      DB.updateActivo(aid, { estado: 'ASIGNADO' });
      self.notify('Asignacion registrada', 'ok');
      self.log('Asignacion', act.nombre);
      self.go('asignaciones');
    };
  }

  document.querySelectorAll('.btn-devolver').forEach(function(b) {
    b.onclick = function() {
      if (!confirm('Confirmar devolucion?')) return;
      var id = +b.getAttribute('data-id');
      var asig = DB.getAsignacionById(id);
      if (!asig) return;
      DB.updateAsignacion(id, { fecha_devolucion: new Date().toISOString() });
      DB.updateActivo(asig.activo_id, { estado: 'DISPONIBLE' });
      var actDev = DB.getActivoById(asig.activo_id);
      self.notify('Devolucion registrada', 'ok');
      self.log('Devolucion', actDev ? actDev.nombre : 'ID ' + asig.activo_id);
      self.go('asignaciones');
    };
  });
};

// ========== REPORTES ==========
App.page_reportes = function(c) {
  var activos = this.filtrar(DB.getActivos());
  var asigs = DB.getAsignaciones();
  var emps = this.filtrar(DB.getEmpleados());
  var sedes = DB.getSedes();
  var self = this, canA = this.canEdit();

  var disp = [], asig = [], dan = [], vt = 0;
  for (var i = 0; i < activos.length; i++) {
    vt += activos[i].valor;
    if (activos[i].estado === 'DISPONIBLE') disp.push(activos[i]);
    else if (activos[i].estado === 'ASIGNADO') asig.push(activos[i]);
    else dan.push(activos[i]);
  }

  // Tabla disponibles
  var tD = !disp.length ? '<div class="empty-state">Sin disponibles</div>' :
    '<table><thead><tr><th>Nombre</th><th>Tipo</th><th>Serial</th><th>Valor</th><th>Sede</th></tr></thead><tbody>' +
    disp.map(function(a) { return '<tr><td>' + esc(a.nombre) + '</td><td>' + esc(a.tipo) + '</td><td><code>' + esc(a.serial) + '</code></td><td>' + formatCurrency(a.valor) + '</td><td>' + sedeName(a.sede_id) + '</td></tr>'; }).join('') + '</tbody></table>';

  // Tabla asignados
  var tA = !asig.length ? '<div class="empty-state">Sin asignados</div>' :
    '<table><thead><tr><th>Nombre</th><th>Serial</th><th>Valor</th><th>Empleado</th><th>Sede</th></tr></thead><tbody>' +
    asig.map(function(a) {
      var xa = null;
      for (var z = 0; z < asigs.length; z++) if (asigs[z].activo_id === a.id && !asigs[z].fecha_devolucion) { xa = asigs[z]; break; }
      var emp = xa ? DB.getEmpleadoById(xa.empleado_id) : null;
      return '<tr><td>' + esc(a.nombre) + '</td><td><code>' + esc(a.serial) + '</code></td><td>' + formatCurrency(a.valor) + '</td><td>' + (emp ? esc(emp.nombre) + ' ' + esc(emp.apellido) : '-') + '</td><td>' + sedeName(a.sede_id) + '</td></tr>';
    }).join('') + '</tbody></table>';

  // Tabla danados
  var tN = !dan.length ? '<div class="empty-state">Sin activos en reparacion</div>' :
    '<table><thead><tr><th>Nombre</th><th>Tipo</th><th>Serial</th><th>Valor</th></tr></thead><tbody>' +
    dan.map(function(a) { return '<tr><td>' + esc(a.nombre) + '</td><td>' + esc(a.tipo) + '</td><td><code>' + esc(a.serial) + '</code></td><td>' + formatCurrency(a.valor) + '</td></tr>'; }).join('') + '</tbody></table>';

  // Por sede (accordion)
  var tS = '';
  for (var s = 0; s < sedes.length; s++) {
    var sd = sedes[s];
    var sa = activos.filter(function(a) { return a.sede_id === sd.id; });
    var sv = 0;
    for (var v = 0; v < sa.length; v++) sv += sa[v].valor;
    if (sa.length) {
      tS += '<div class="accordion-item"><div class="accordion-header">' + esc(sd.nombre) + ' (' + esc(sd.ciudad) + ') &mdash; ' + sa.length + ' activos &mdash; ' + formatCurrency(sv) + ' <span>&#9660;</span></div><div class="accordion-body">' +
        '<table><thead><tr><th>Activo</th><th>Tipo</th><th>Estado</th><th>Valor</th></tr></thead><tbody>' +
        sa.map(function(a) { return '<tr><td>' + esc(a.nombre) + '</td><td>' + esc(a.tipo) + '</td><td>' + estadoBadge(a.estado) + '</td><td>' + formatCurrency(a.valor) + '</td></tr>'; }).join('') +
        '</tbody></table></div></div>';
    }
  }
  if (!tS) tS = '<div class="empty-state">Sin datos</div>';

  // Por empleado (accordion)
  var tE = '';
  for (var m = 0; m < emps.length; m++) {
    var emp = emps[m];
    var eh = asigs.filter(function(a) { return a.empleado_id === emp.id; });
    if (eh.length) {
      var ecnt = eh.filter(function(a) { return !a.fecha_devolucion; }).length;
      tE += '<div class="accordion-item"><div class="accordion-header">' + esc(emp.nombre) + ' ' + esc(emp.apellido) + ' &mdash; ' + ecnt + ' activos &mdash; ' + eh.length + ' historial <span>&#9660;</span></div><div class="accordion-body">' +
        '<table><thead><tr><th>Activo</th><th>Asignacion</th><th>Devolucion</th><th>Estado</th></tr></thead><tbody>' +
        eh.sort(function(a, b) { return new Date(b.fecha_asignacion) - new Date(a.fecha_asignacion); }).map(function(h) {
          var ha = DB.getActivoById(h.activo_id);
          return '<tr><td>' + (ha ? esc(ha.nombre) : '?') + '</td><td>' + formatDateTime(h.fecha_asignacion) + '</td><td>' + (h.fecha_devolucion ? formatDateTime(h.fecha_devolucion) : '-') + '</td><td>' + (h.fecha_devolucion ? '<span class="badge badge-green">Devuelto</span>' : '<span class="badge badge-yellow">Activo</span>') + '</td></tr>';
        }).join('') + '</tbody></table></div></div>';
    }
  }
  if (!tE) tE = '<div class="empty-state">Sin historial</div>';

  c.innerHTML = '<div class="page-header"><h2>Reportes</h2>' +
    (canA ? '<button class="btn btn-green" id="btn-export-report">' + icon('save', 14) + ' Exportar CSV</button>' : '') +
    '</div>' +
    '<div class="stats-grid">' +
      '<div class="stat-card"><div class="stat-icon green">' + icon('money') + '</div><div class="stat-info"><h3 style="font-size:1rem">' + formatCurrency(vt) + '</h3><p>Valor total</p></div></div>' +
      '<div class="stat-card"><div class="stat-icon blue">' + icon('pc') + '</div><div class="stat-info"><h3>' + activos.length + '</h3><p>Total activos</p></div></div>' +
      '<div class="stat-card"><div class="stat-icon yellow">' + icon('swap') + '</div><div class="stat-info"><h3>' + asigs.length + '</h3><p>Asignaciones</p></div></div>' +
      '<div class="stat-card"><div class="stat-icon red">' + icon('ppl') + '</div><div class="stat-info"><h3>' + emps.length + '</h3><p>Empleados</p></div></div>' +
    '</div>' +
    '<div class="tabs">' +
      '<button class="tab active" data-tab="d">Disponibles (' + disp.length + ')</button>' +
      '<button class="tab" data-tab="a">Asignados (' + asig.length + ')</button>' +
      '<button class="tab" data-tab="n">Reparacion (' + dan.length + ')</button>' +
      '<button class="tab" data-tab="s">Por Sede</button>' +
      '<button class="tab" data-tab="e">Por Empleado</button>' +
    '</div>' +
    '<div class="card"><div class="card-body">' +
      '<div id="tab-d" class="tab-content">' + tD + '</div>' +
      '<div id="tab-a" class="tab-content hidden">' + tA + '</div>' +
      '<div id="tab-n" class="tab-content hidden">' + tN + '</div>' +
      '<div id="tab-s" class="tab-content hidden">' + tS + '</div>' +
      '<div id="tab-e" class="tab-content hidden">' + tE + '</div>' +
    '</div></div>';

  // Tab switching
  document.querySelectorAll('.tab').forEach(function(t) {
    t.onclick = function() {
      document.querySelectorAll('.tab').forEach(function(x) { x.className = 'tab'; });
      t.className = 'tab active';
      document.querySelectorAll('.tab-content').forEach(function(s) { s.className = 'tab-content hidden'; });
      $('tab-' + t.getAttribute('data-tab')).className = 'tab-content';
    };
  });

  // Accordion
  document.querySelectorAll('.accordion-header').forEach(function(h) {
    h.onclick = function() { h.parentElement.classList.toggle('open'); };
  });

  // Export
  if ($('btn-export-report')) $('btn-export-report').onclick = function() {
    exportCSV('activos_reporte.csv', ['Nombre','Tipo','Serial','Valor','Estado','Sede','Depto'],
      activos.map(function(a) { return [a.nombre, a.tipo, a.serial, a.valor, a.estado, sedeName(a.sede_id), deptoName(a.departamento_id)]; }));
    self.notify('CSV exportado', 'ok');
    self.log('Exportar CSV', 'Reporte');
  };
};

// ========== USUARIOS (solo ADMIN) ==========
App.page_usuarios = function(c) {
  if (!this.isAdmin()) { c.innerHTML = '<div class="alert alert-error">Solo el administrador puede gestionar usuarios.</div>'; return; }

  var usuarios = DB.getUsuarios(), self = this;
  var r = '<table><thead><tr><th>Usuario</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Sede</th><th>Acciones</th></tr></thead><tbody>';
  for (var i = 0; i < usuarios.length; i++) {
    var x = usuarios[i];
    r += '<tr><td><b>' + esc(x.username) + '</b></td><td>' + esc(x.nombre || '') + ' ' + esc(x.apellido || '') + '</td><td>' + esc(x.email) + '</td>';
    r += '<td><span class="badge ' + (x.rol === 'ADMIN' ? 'badge-red' : 'badge-blue') + '">' + x.rol + '</span></td>';
    r += '<td>' + sedeName(x.sede_id) + '</td>';
    r += '<td class="actions"><button class="btn btn-red btn-sm del-user" data-id="' + x.id + '" aria-label="Eliminar usuario">' + icon('del', 14) + '</button></td></tr>';
  }
  r += '</tbody></table>';

  var sedes = DB.getSedes();
  var sedeOpts = '';
  for (var j = 0; j < sedes.length; j++) sedeOpts += '<option value="' + sedes[j].id + '">' + esc(sedes[j].nombre) + '</option>';

  c.innerHTML = '<div class="page-header"><h2>Usuarios del Sistema (' + usuarios.length + ')</h2></div>' +
    '<div class="card" style="margin-bottom:20px"><div class="card-header">Crear Nuevo Usuario</div><div class="card-body">' +
      '<div id="user-error" class="alert alert-error hidden"></div>' +
      '<form id="user-form">' +
        '<div class="form-row-3"><div class="form-group"><label>Usuario</label><input type="text" class="form-control" id="uf-user" required></div><div class="form-group"><label>Email</label><input type="email" class="form-control" id="uf-email" required></div><div class="form-group"><label>Contrasena</label><input type="password" class="form-control" id="uf-pass" required></div></div>' +
        '<div class="form-row-3"><div class="form-group"><label>Nombre</label><input type="text" class="form-control" id="uf-nombre"></div><div class="form-group"><label>Apellido</label><input type="text" class="form-control" id="uf-apellido"></div><div class="form-group"><label>Rol</label><select class="form-control" id="uf-rol"><option value="OPERADOR">Operador</option><option value="ADMIN">Administrador</option></select></div></div>' +
        '<div class="form-group"><label>Sede (para operadores)</label><select class="form-control" id="uf-sede"><option value="">Sin sede</option>' + sedeOpts + '</select></div>' +
        '<button type="submit" class="btn btn-blue">' + icon('add', 14) + ' Crear Usuario</button>' +
      '</form></div></div>' +
    '<div class="card"><div class="card-body" style="padding:0;overflow-x:auto">' + r + '</div></div>';

  $('user-form').onsubmit = function(ev) {
    ev.preventDefault();
    var er = $('user-error');
    var data = {
      username: $('uf-user').value.trim(), email: $('uf-email').value.trim(),
      password: $('uf-pass').value, nombre: $('uf-nombre').value.trim(),
      apellido: $('uf-apellido').value.trim(), rol: $('uf-rol').value,
      sede_id: +$('uf-sede').value || null
    };
    if (!data.username || !data.email || !data.password) { er.textContent = 'Complete usuario, email y contrasena.'; er.className = 'alert alert-error'; return; }
    if (data.password.length < 6) { er.textContent = 'Contrasena minimo 6 caracteres.'; er.className = 'alert alert-error'; return; }
    if (DB.getUsuarioByUsername(data.username)) { er.textContent = 'Usuario ya existe.'; er.className = 'alert alert-error'; return; }
    DB.createUsuario(data);
    self.notify('Usuario creado: ' + data.username, 'ok');
    self.log('Usuario creado', data.username);
    self.go('usuarios');
  };

  document.querySelectorAll('.del-user').forEach(function(b) {
    b.onclick = function() {
      var id = +b.getAttribute('data-id');
      if (id === self.user.id) { alert('No puede eliminar su propia cuenta.'); return; }
      if (confirm('Eliminar usuario?')) {
        DB.deleteUsuario(id);
        self.notify('Usuario eliminado', 'er');
        self.log('Usuario eliminado', 'ID ' + id);
        self.go('usuarios');
      }
    };
  });
};

// ========== ACTIVIDAD (solo ADMIN) ==========
App.page_actividad = function(c) {
  if (!this.isAdmin()) { c.innerHTML = '<div class="alert alert-error">Solo el administrador puede ver la actividad.</div>'; return; }

  var log = DB.getLog(), self = this;
  var r = '';
  if (!log.length) {
    r = '<div class="empty-state">Sin actividad registrada</div>';
  } else {
    r = '<table><thead><tr><th>Fecha</th><th>Usuario</th><th>Accion</th><th>Detalle</th></tr></thead><tbody>';
    for (var i = 0; i < Math.min(log.length, 100); i++) {
      var x = log[i];
      r += '<tr><td>' + formatDateTime(x.fecha) + '</td><td><b>' + esc(x.user) + '</b></td><td><span class="badge badge-blue">' + esc(x.action) + '</span></td><td>' + esc(x.detail) + '</td></tr>';
    }
    r += '</tbody></table>';
  }

  c.innerHTML = '<div class="page-header"><h2>Registro de Actividad</h2><button class="btn btn-outline" id="btn-clear-log">Limpiar log</button></div>' +
    '<div class="card"><div class="card-body" style="padding:0;overflow-x:auto">' + r + '</div></div>';

  if ($('btn-clear-log')) $('btn-clear-log').onclick = function() {
    if (confirm('Limpiar todo el registro?')) {
      DB.clearLog();
      self.notify('Log limpiado', 'ok');
      self.go('actividad');
    }
  };
};
