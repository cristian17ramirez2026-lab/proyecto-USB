/* InventPro v4 — Paginas del App (metodos de App) */

// ========== DASHBOARD ==========
App.page_dashboard = function(c) {
  var activos = this.filtrar(DB.getActivos());
  var disp = 0, asig = 0, dan = 0, valorTotal = 0;
  for (var i = 0; i < activos.length; i++) {
    valorTotal += activos[i].valor;
    if (activos[i].estado === 'DISPONIBLE') disp++;
    else if (activos[i].estado === 'ASIGNADO') asig++;
    else if (activos[i].estado === 'DANADO') dan++;
  }

  var empleados = this.filtrar(DB.getEmpleados());
  var allAsg = DB.getAsignaciones();

  // Filtrar asignaciones por activos de mi sede
  var sedeActIds = {};
  for (var z = 0; z < activos.length; z++) sedeActIds[activos[z].id] = true;
  var myAsg = allAsg.filter(function(x) { return sedeActIds[x.activo_id]; });
  var activasCount = 0;
  for (var j = 0; j < myAsg.length; j++) if (!myAsg[j].fecha_devolucion) activasCount++;

  // Ultimas 5 asignaciones
  var recientes = myAsg.slice().sort(function(a, b) { return new Date(b.fecha_asignacion) - new Date(a.fecha_asignacion); }).slice(0, 5);
  var recH = '';
  for (var k = 0; k < recientes.length; k++) {
    var x = recientes[k];
    var act = DB.getActivoById(x.activo_id);
    var emp = DB.getEmpleadoById(x.empleado_id);
    recH += '<tr><td>' + (act ? esc(act.nombre) : '?') + '</td><td>' + (emp ? esc(emp.nombre) + ' ' + esc(emp.apellido) : '?') + '</td><td>' + formatDate(x.fecha_asignacion) + '</td><td>' + (x.fecha_devolucion ? '<span class="badge badge-green">Devuelta</span>' : '<span class="badge badge-yellow">Activa</span>') + '</td></tr>';
  }

  c.innerHTML =
    '<div class="welcome-banner"><h2>Bienvenido, ' + esc(this.user.username) + '</h2><p>' + (this.isAdmin() ? 'Vista global del sistema' : 'Vista de ' + sedeName(this.user.sede_id)) + '</p></div>' +
    '<div class="stats-grid">' +
      '<div class="stat-card"><div class="stat-icon red">' + icon('pc') + '</div><div class="stat-info"><h3>' + activos.length + '</h3><p>Total Activos</p></div></div>' +
      '<div class="stat-card"><div class="stat-icon green">' + icon('check') + '</div><div class="stat-info"><h3>' + disp + '</h3><p>Disponibles</p></div></div>' +
      '<div class="stat-card"><div class="stat-icon yellow">' + icon('swap') + '</div><div class="stat-info"><h3>' + asig + '</h3><p>Asignados</p></div></div>' +
      '<div class="stat-card"><div class="stat-icon dark">' + icon('warn') + '</div><div class="stat-info"><h3>' + dan + '</h3><p>En reparacion</p></div></div>' +
    '</div>' +
    '<div class="stats-grid">' +
      '<div class="stat-card"><div class="stat-icon blue">' + icon('ppl') + '</div><div class="stat-info"><h3>' + empleados.length + '</h3><p>Empleados</p></div></div>' +
      '<div class="stat-card"><div class="stat-icon red">' + icon('bld') + '</div><div class="stat-info"><h3>' + DB.getSedes().length + '</h3><p>Sedes</p></div></div>' +
      '<div class="stat-card"><div class="stat-icon blue">' + icon('dept') + '</div><div class="stat-info"><h3>' + DB.getDepartamentos().length + '</h3><p>Departamentos</p></div></div>' +
      '<div class="stat-card"><div class="stat-icon green">' + icon('money') + '</div><div class="stat-info"><h3 style="font-size:1rem">' + formatCurrency(valorTotal) + '</h3><p>Valor inventario</p></div></div>' +
    '</div>' +
    '<div class="card"><div class="card-header">Actividad reciente</div><div class="card-body" style="padding:0;overflow-x:auto">' +
      (recientes.length ? '<table><thead><tr><th>Activo</th><th>Empleado</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>' + recH + '</tbody></table>' : '<div class="empty-state">Sin actividad reciente</div>') +
    '</div></div>';
};

// ========== ACTIVOS ==========
App.page_activos = function(c) {
  var activos = this.filtrar(DB.getActivos());
  var canA = this.canEdit();
  var self = this;

  var renderTable = function(items) {
    if (!items.length) return '<div class="empty-state">' + icon('pc', 48) + '<br>No hay activos</div>';
    var r = '<table><thead><tr><th>Activo</th><th>Tipo</th><th>Serial</th><th>Valor</th><th>Sede</th><th>Depto</th><th>Estado</th>' + (canA ? '<th>Acciones</th>' : '') + '</tr></thead><tbody>';
    for (var i = 0; i < items.length; i++) {
      var x = items[i];
      r += '<tr><td><b>' + esc(x.nombre) + '</b>' + (x.descripcion ? '<br><small style="color:#7f8c8d">' + esc(x.descripcion) + '</small>' : '') + '</td>' +
        '<td>' + esc(x.tipo) + '</td>' +
        '<td><code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:.76rem">' + esc(x.serial) + '</code></td>' +
        '<td><b>' + formatCurrency(x.valor) + '</b></td>' +
        '<td>' + sedeName(x.sede_id) + '</td>' +
        '<td>' + deptoName(x.departamento_id) + '</td>' +
        '<td>' + estadoBadge(x.estado) + '</td>' +
        (canA ? '<td class="actions"><button class="btn btn-outline btn-sm edit-activo" data-id="' + x.id + '" aria-label="Editar activo">' + icon('edit', 14) + '</button><button class="btn btn-red btn-sm del-activo" data-id="' + x.id + '" aria-label="Eliminar activo">' + icon('del', 14) + '</button></td>' : '') +
      '</tr>';
    }
    return r + '</tbody></table>';
  };

  c.innerHTML =
    '<div class="page-header"><h2>Activos (' + activos.length + ')</h2><div style="display:flex;gap:8px">' +
      (canA ? '<button class="btn btn-blue" id="btn-new-activo">' + icon('add', 15) + ' Nuevo Activo</button>' : '') +
      (canA ? '<button class="btn btn-green btn-sm" id="btn-export-activos">' + icon('save', 14) + ' CSV</button>' : '') +
    '</div></div>' +
    '<div style="display:flex;gap:10px;margin-bottom:14px"><input type="text" class="form-control" id="search-activos" placeholder="Buscar por nombre, serial o tipo..." style="max-width:350px"><select class="form-control" id="filter-estado" style="max-width:180px"><option value="">Todos los estados</option><option value="DISPONIBLE">Disponible</option><option value="ASIGNADO">Asignado</option><option value="DANADO">En reparacion</option></select></div>' +
    '<div class="card"><div class="card-body" style="padding:0;overflow-x:auto" id="activos-table">' + renderTable(activos) + '</div></div>';

  var doFilter = function() {
    var q = ($('search-activos').value || '').toLowerCase();
    var est = $('filter-estado').value;
    var filtered = activos.filter(function(x) {
      return (!q || x.nombre.toLowerCase().indexOf(q) > -1 || x.serial.toLowerCase().indexOf(q) > -1 || x.tipo.toLowerCase().indexOf(q) > -1) && (!est || x.estado === est);
    });
    $('activos-table').innerHTML = renderTable(filtered);
    bindButtons();
  };

  var bindButtons = function() {
    if ($('btn-new-activo')) $('btn-new-activo').onclick = function() { self.editId = null; self.go('activo_form'); };
    document.querySelectorAll('.edit-activo').forEach(function(b) { b.onclick = function() { self.editId = +b.getAttribute('data-id'); self.go('activo_form'); }; });
    document.querySelectorAll('.del-activo').forEach(function(b) {
      b.onclick = function() {
        var id = +b.getAttribute('data-id');
        var act = DB.getActivoById(id);
        var asigs = DB.getAsignaciones();
        for (var i = 0; i < asigs.length; i++) {
          if (asigs[i].activo_id === id && !asigs[i].fecha_devolucion) {
            alert('No se puede eliminar: esta asignado.');
            return;
          }
        }
        if (confirm('Eliminar "' + act.nombre + '"?')) {
          DB.deleteActivo(id);
          self.notify('Activo eliminado', 'er');
          self.log('Activo eliminado', act.nombre);
          self.go('activos');
        }
      };
    });
  };

  $('search-activos').oninput = doFilter;
  $('filter-estado').onchange = doFilter;
  bindButtons();

  if ($('btn-export-activos')) $('btn-export-activos').onclick = function() {
    exportCSV('activos.csv', ['Nombre','Tipo','Serial','Valor','Estado','Sede','Departamento'],
      activos.map(function(x) { return [x.nombre, x.tipo, x.serial, x.valor, x.estado, sedeName(x.sede_id), deptoName(x.departamento_id)]; }));
    self.notify('CSV exportado', 'ok');
    self.log('Exportar CSV', 'Activos');
  };
};

// ========== ACTIVO FORM ==========
App.page_activo_form = function(c) {
  var self = this, eid = this.editId;
  if (!this.canEdit()) { c.innerHTML = '<div class="alert alert-error">Sin permisos.</div>'; return; }

  var sedes = DB.getSedes(), deps = DB.getDepartamentos();
  var sedeOpts = '', depOpts = '';
  for (var i = 0; i < sedes.length; i++) sedeOpts += '<option value="' + sedes[i].id + '">' + esc(sedes[i].nombre) + '</option>';
  for (var j = 0; j < deps.length; j++) depOpts += '<option value="' + deps[j].id + '">' + esc(deps[j].nombre) + '</option>';

  c.innerHTML = '<div style="max-width:700px;margin:0 auto"><div class="card"><div class="card-header">' + icon('pc', 18) + ' ' + (eid ? 'Editar' : 'Nuevo') + ' Activo</div><div class="card-body">' +
    '<div id="activo-error" class="alert alert-error hidden"></div>' +
    '<form id="activo-form">' +
      '<div class="form-group"><label>Nombre del activo</label><input type="text" class="form-control" id="af-nombre" required></div>' +
      '<div class="form-group"><label>Descripcion</label><textarea class="form-control" id="af-desc" rows="2"></textarea></div>' +
      '<div class="form-row"><div class="form-group"><label>Tipo</label><input type="text" class="form-control" id="af-tipo" required></div><div class="form-group"><label>Serial (unico)</label><input type="text" class="form-control" id="af-serial" required></div></div>' +
      '<div class="form-row"><div class="form-group"><label>Valor ($)</label><input type="number" class="form-control" id="af-valor" min="1" required></div><div class="form-group"><label>Fecha de compra</label><input type="date" class="form-control" id="af-fecha" required></div></div>' +
      '<div class="form-row"><div class="form-group"><label>Sede</label><select class="form-control" id="af-sede"><option value="">Sin sede</option>' + sedeOpts + '</select></div><div class="form-group"><label>Departamento</label><select class="form-control" id="af-depto"><option value="">Sin depto</option>' + depOpts + '</select></div></div>' +
      (eid ? '<div class="form-group"><label>Estado</label><select class="form-control" id="af-estado"><option value="DISPONIBLE">Disponible</option><option value="ASIGNADO">Asignado</option><option value="DANADO">En reparacion / Baja</option></select></div>' : '') +
      '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button type="button" class="btn btn-gray" id="af-cancel">' + icon('back', 14) + ' Cancelar</button><button type="submit" class="btn btn-blue">' + icon('save', 14) + ' Guardar</button></div>' +
    '</form></div></div></div>';

  if (eid) {
    var a = DB.getActivoById(eid);
    if (a) {
      $('af-nombre').value = a.nombre; $('af-desc').value = a.descripcion || '';
      $('af-tipo').value = a.tipo; $('af-serial').value = a.serial;
      $('af-valor').value = a.valor; $('af-fecha').value = a.fecha_compra;
      if (a.sede_id) $('af-sede').value = a.sede_id;
      if (a.departamento_id) $('af-depto').value = a.departamento_id;
      if ($('af-estado')) $('af-estado').value = a.estado;
    }
  }

  $('activo-form').onsubmit = function(ev) {
    ev.preventDefault();
    var data = {
      nombre: $('af-nombre').value.trim(), descripcion: $('af-desc').value.trim(),
      tipo: $('af-tipo').value.trim(), serial: $('af-serial').value.trim(),
      valor: parseFloat($('af-valor').value), fecha_compra: $('af-fecha').value,
      sede_id: +($('af-sede').value) || null, departamento_id: +($('af-depto').value) || null
    };
    var er = $('activo-error');
    if (!data.nombre || !data.tipo || !data.serial || !data.valor || !data.fecha_compra) { er.textContent = 'Complete todos los campos.'; er.className = 'alert alert-error'; return; }
    if (data.valor <= 0) { er.textContent = 'Valor debe ser mayor a 0.'; er.className = 'alert alert-error'; return; }
    var dup = DB.getActivos();
    for (var i = 0; i < dup.length; i++) if (dup[i].serial === data.serial && dup[i].id !== eid) { er.textContent = 'Serial duplicado.'; er.className = 'alert alert-error'; return; }
    if (eid) { data.estado = $('af-estado').value; DB.updateActivo(eid, data); self.notify('Activo actualizado', 'ok'); self.log('Activo editado', data.nombre); }
    else { DB.createActivo(data); self.notify('Activo creado', 'ok'); self.log('Activo creado', data.nombre); }
    self.go('activos');
  };
  $('af-cancel').onclick = function() { self.go('activos'); };
};

// ========== EMPLEADOS ==========
App.page_empleados = function(c) {
  var empleados = this.filtrar(DB.getEmpleados());
  var canA = this.canEdit(), self = this;

  var renderTable = function(items) {
    if (!items.length) return '<div class="empty-state">' + icon('ppl', 48) + '<br>No hay empleados</div>';
    var r = '<table><thead><tr><th>Empleado</th><th>Cedula</th><th>Sede</th><th>Departamento</th><th>Cargo</th><th>Activos</th>' + (canA ? '<th>Acciones</th>' : '') + '</tr></thead><tbody>';
    for (var i = 0; i < items.length; i++) {
      var x = items[i], cnt = 0, asigs = DB.getAsignaciones();
      for (var j = 0; j < asigs.length; j++) if (asigs[j].empleado_id === x.id && !asigs[j].fecha_devolucion) cnt++;
      r += '<tr><td><b>' + esc(x.nombre) + ' ' + esc(x.apellido) + '</b>' + (x.email ? '<br><small style="color:#7f8c8d">' + esc(x.email) + '</small>' : '') + '</td>' +
        '<td>' + esc(x.cedula) + '</td><td>' + sedeName(x.sede_id) + '</td><td>' + deptoName(x.departamento_id) + '</td><td>' + esc(x.cargo) + '</td>' +
        '<td><span class="badge ' + (cnt > 0 ? 'badge-yellow' : 'badge-green') + '">' + cnt + '</span></td>' +
        (canA ? '<td class="actions"><button class="btn btn-outline btn-sm edit-emp" data-id="' + x.id + '" aria-label="Editar empleado">' + icon('edit', 14) + '</button><button class="btn btn-red btn-sm del-emp" data-id="' + x.id + '" aria-label="Eliminar empleado">' + icon('del', 14) + '</button></td>' : '') + '</tr>';
    }
    return r + '</tbody></table>';
  };

  c.innerHTML = '<div class="page-header"><h2>Empleados (' + empleados.length + ')</h2>' + (canA ? '<button class="btn btn-blue" id="btn-new-emp">' + icon('add', 15) + ' Nuevo Empleado</button>' : '') + '</div>' +
    '<div style="margin-bottom:14px"><input type="text" class="form-control" id="search-emp" placeholder="Buscar por nombre, cedula o cargo..." style="max-width:350px"></div>' +
    '<div class="card"><div class="card-body" style="padding:0;overflow-x:auto" id="emp-table">' + renderTable(empleados) + '</div></div>';

  var doFilter = function() {
    var q = ($('search-emp').value || '').toLowerCase();
    var filtered = empleados.filter(function(x) { return !q || (x.nombre + ' ' + x.apellido).toLowerCase().indexOf(q) > -1 || x.cedula.indexOf(q) > -1 || x.cargo.toLowerCase().indexOf(q) > -1; });
    $('emp-table').innerHTML = renderTable(filtered);
    bindButtons();
  };

  var bindButtons = function() {
    if ($('btn-new-emp')) $('btn-new-emp').onclick = function() { self.editId = null; self.go('empleado_form'); };
    document.querySelectorAll('.edit-emp').forEach(function(b) { b.onclick = function() { self.editId = +b.getAttribute('data-id'); self.go('empleado_form'); }; });
    document.querySelectorAll('.del-emp').forEach(function(b) {
      b.onclick = function() {
        var id = +b.getAttribute('data-id'), emp = DB.getEmpleadoById(id);
        var asigs = DB.getAsignaciones();
        for (var i = 0; i < asigs.length; i++) if (asigs[i].empleado_id === id && !asigs[i].fecha_devolucion) { alert('No se puede eliminar: tiene activos asignados.'); return; }
        if (confirm('Eliminar empleado?')) { DB.deleteEmpleado(id); self.notify('Empleado eliminado', 'er'); self.log('Empleado eliminado', emp.nombre); self.go('empleados'); }
      };
    });
  };

  $('search-emp').oninput = doFilter;
  bindButtons();
};

// ========== EMPLEADO FORM ==========
App.page_empleado_form = function(c) {
  var self = this, eid = this.editId;
  if (!this.canEdit()) { c.innerHTML = '<div class="alert alert-error">Sin permisos.</div>'; return; }

  var sedes = DB.getSedes(), deps = DB.getDepartamentos();
  var sedeOpts = '', depOpts = '';
  for (var i = 0; i < sedes.length; i++) sedeOpts += '<option value="' + sedes[i].id + '">' + esc(sedes[i].nombre) + '</option>';
  for (var j = 0; j < deps.length; j++) depOpts += '<option value="' + deps[j].id + '">' + esc(deps[j].nombre) + '</option>';

  c.innerHTML = '<div style="max-width:700px;margin:0 auto"><div class="card"><div class="card-header">' + icon('ppl', 18) + ' ' + (eid ? 'Editar' : 'Nuevo') + ' Empleado</div><div class="card-body">' +
    '<div id="emp-error" class="alert alert-error hidden"></div>' +
    '<form id="emp-form">' +
      '<div class="form-row"><div class="form-group"><label>Nombre</label><input type="text" class="form-control" id="ef-nombre" required></div><div class="form-group"><label>Apellido</label><input type="text" class="form-control" id="ef-apellido" required></div></div>' +
      '<div class="form-row"><div class="form-group"><label>Cedula (unica)</label><input type="text" class="form-control" id="ef-cedula" required></div><div class="form-group"><label>Email</label><input type="email" class="form-control" id="ef-email"></div></div>' +
      '<div class="form-row"><div class="form-group"><label>Sede</label><select class="form-control" id="ef-sede"><option value="">Seleccione...</option>' + sedeOpts + '</select></div><div class="form-group"><label>Departamento</label><select class="form-control" id="ef-depto"><option value="">Seleccione...</option>' + depOpts + '</select></div></div>' +
      '<div class="form-group"><label>Cargo</label><input type="text" class="form-control" id="ef-cargo" required></div>' +
      '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button type="button" class="btn btn-gray" id="ef-cancel">' + icon('back', 14) + ' Cancelar</button><button type="submit" class="btn btn-blue">' + icon('save', 14) + ' Guardar</button></div>' +
    '</form></div></div></div>';

  if (eid) {
    var emp = DB.getEmpleadoById(eid);
    if (emp) {
      $('ef-nombre').value = emp.nombre; $('ef-apellido').value = emp.apellido;
      $('ef-cedula').value = emp.cedula; $('ef-email').value = emp.email || '';
      if (emp.sede_id) $('ef-sede').value = emp.sede_id;
      if (emp.departamento_id) $('ef-depto').value = emp.departamento_id;
      $('ef-cargo').value = emp.cargo;
    }
  }

  $('emp-form').onsubmit = function(ev) {
    ev.preventDefault();
    var data = { nombre: $('ef-nombre').value.trim(), apellido: $('ef-apellido').value.trim(), cedula: $('ef-cedula').value.trim(), email: $('ef-email').value.trim(), sede_id: +($('ef-sede').value) || null, departamento_id: +($('ef-depto').value) || null, cargo: $('ef-cargo').value.trim() };
    var er = $('emp-error');
    if (!data.nombre || !data.apellido || !data.cedula || !data.cargo) { er.textContent = 'Complete los campos obligatorios.'; er.className = 'alert alert-error'; return; }
    var dup = DB.getEmpleados();
    for (var i = 0; i < dup.length; i++) if (dup[i].cedula === data.cedula && dup[i].id !== eid) { er.textContent = 'Cedula duplicada.'; er.className = 'alert alert-error'; return; }
    if (eid) { DB.updateEmpleado(eid, data); self.notify('Empleado actualizado', 'ok'); }
    else { DB.createEmpleado(data); self.notify('Empleado creado', 'ok'); }
    self.log('Empleado guardado', data.nombre);
    self.go('empleados');
  };
  $('ef-cancel').onclick = function() { self.go('empleados'); };
};
