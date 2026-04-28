import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

export default function Empleados() {
  const { user, filtrar, canAdd, isAdmin } = useAuth();
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [asigActivo, setAsigActivo] = useState('');
  const [form, setForm] = useState({ nombre: '', apellido: '', cedula: '', email: '', sede_id: '', departamento_id: '', cargo: '' });
  const [error, setError] = useState('');

  const empleados = filtrar(DB.getEmpleados()).filter(e => {
    const q = search.toLowerCase();
    return !q || (e.nombre + ' ' + e.apellido).toLowerCase().includes(q) || e.cedula.includes(q) || e.cargo.toLowerCase().includes(q);
  });

  const sedes = DB.getSedes();
  const deps = DB.getDeps();
  const sn = (id) => DB.getSede(id)?.nombre || '-';
  const dn = (id) => DB.getDep(id)?.nombre || '-';
  const fd = (d) => d ? new Date(d).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' }) : '-';

  const resetForm = () => { setForm({ nombre: '', apellido: '', cedula: '', email: '', sede_id: '', departamento_id: '', cargo: '' }); setEditId(null); setShowForm(false); setError(''); };

  const handleEdit = (e) => { setForm({ nombre: e.nombre, apellido: e.apellido, cedula: e.cedula, email: e.email || '', sede_id: e.sede_id || '', departamento_id: e.departamento_id || '', cargo: e.cargo }); setEditId(e.id); setShowForm(true); };

  const handleSubmit = (ev) => {
    ev.preventDefault(); setError('');
    if (!form.nombre || !form.apellido || !form.cedula || !form.cargo) { setError('Complete los campos obligatorios.'); return; }
    const dup = DB.getEmpleados().find(x => x.cedula === form.cedula && x.id !== editId);
    if (dup) { setError('Cedula "' + form.cedula + '" ya existe.'); return; }
    const data = { ...form, sede_id: form.sede_id ? parseInt(form.sede_id) : null, departamento_id: form.departamento_id ? parseInt(form.departamento_id) : null };
    if (editId) { DB.updateEmpleado(editId, data); DB.addLog('Empleado editado', data.nombre + ' ' + data.apellido, user.username); }
    else { DB.createEmpleado(data); DB.addLog('Empleado creado', data.nombre + ' ' + data.apellido, user.username); }
    resetForm(); setRefresh(r => r + 1);
  };

  const handleBaja = (id) => {
    const e = DB.getEmpleado(id);
    if (window.confirm('Dar de baja a "' + e.nombre + ' ' + e.apellido + '"?')) {
      DB.updateEmpleado(id, { fecha_salida: new Date().toISOString(), activo: false });
      DB.addLog('Empleado baja', e.nombre + ' ' + e.apellido, user.username);
      setRefresh(r => r + 1);
    }
  };

  const handleReactivar = (id) => {
    const e = DB.getEmpleado(id);
    DB.updateEmpleado(id, { fecha_salida: null, activo: true });
    DB.addLog('Empleado reactivado', e.nombre + ' ' + e.apellido, user.username);
    setRefresh(r => r + 1);
  };

  const handleDelete = (id) => {
    const e = DB.getEmpleado(id);
    const hasAsig = DB.getAsignaciones().some(a => a.empleado_id === id && !a.fecha_devolucion);
    if (hasAsig) { alert('No se puede eliminar: tiene activos asignados.'); return; }
    if (window.confirm('Eliminar "' + e.nombre + ' ' + e.apellido + '"?')) {
      DB.deleteEmpleado(id); DB.addLog('Empleado eliminado', e.nombre, user.username); setRefresh(r => r + 1);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h5 className="fw-bold mb-0">Empleados ({empleados.length})</h5>
        {canAdd && <button className="btn btn-sm text-white" style={{ background: '#003087' }} onClick={() => { resetForm(); setShowForm(!showForm); }}>{showForm ? 'Cerrar' : '+ Nuevo Empleado'}</button>}
      </div>

      {showForm && canAdd && (
        <div className="card shadow-sm mb-3">
          <div className="card-header fw-bold">{editId ? 'Editar' : 'Nuevo'} Empleado</div>
          <div className="card-body">
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4"><label className="form-label small fw-bold">Nombre *</label><input className="form-control" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Apellido *</label><input className="form-control" value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })} required /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Cedula * (unica)</label><input className="form-control" value={form.cedula} onChange={e => setForm({ ...form, cedula: e.target.value })} required /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Email</label><input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Sede</label>
                  <select className="form-select" value={form.sede_id} onChange={e => setForm({ ...form, sede_id: e.target.value })}><option value="">Seleccione...</option>{sedes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}</select></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Departamento</label>
                  <select className="form-select" value={form.departamento_id} onChange={e => setForm({ ...form, departamento_id: e.target.value })}><option value="">Seleccione...</option>{deps.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}</select></div>
                <div className="col-md-12"><label className="form-label small fw-bold">Cargo *</label><input className="form-control" value={form.cargo} onChange={e => setForm({ ...form, cargo: e.target.value })} required /></div>
              </div>
              <div className="mt-3 d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>Cancelar</button>
                <button type="submit" className="btn btn-sm text-white" style={{ background: '#003087' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <input type="text" className="form-control mb-3" style={{ maxWidth: 350 }} placeholder="Buscar nombre, cedula, cargo..." value={search} onChange={e => setSearch(e.target.value)} />

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr><th>Empleado</th><th>Cedula</th><th>Sede</th><th>Depto</th><th>Cargo</th><th>Activos</th><th>Ingreso</th><th>Estado</th>{canAdd && <th>Acciones</th>}</tr>
            </thead>
            <tbody>
              {empleados.length === 0 ? <tr><td colSpan={9} className="text-center text-muted py-4">No hay empleados</td></tr> :
                empleados.map(e => {
                  const cnt = DB.getAsignaciones().filter(a => a.empleado_id === e.id && !a.fecha_devolucion).length;
                  return (
                    <React.Fragment key={e.id}>
                    <tr style={e.fecha_salida ? { opacity: 0.5 } : {}}>
                      <td><strong>{e.nombre} {e.apellido}</strong>{e.email && <><br /><small className="text-muted">{e.email}</small></>}</td>
                      <td>{e.cedula}</td>
                      <td>{sn(e.sede_id)}</td>
                      <td>{dn(e.departamento_id)}</td>
                      <td>{e.cargo}</td>
                      <td><span className={`badge bg-${cnt > 0 ? 'warning' : 'success'}`}>{cnt}</span></td>
                      <td>
                        <small>{fd(e.fecha_ingreso)}</small>
                        {e.fecha_salida && <><br /><small className="text-danger">Baja: {fd(e.fecha_salida)}</small></>}
                      </td>
                      <td>{e.fecha_salida ? <span className="badge bg-danger">Baja</span> : <span className="badge bg-success">Activo</span>}</td>
                      {canAdd && (
                        <td className="d-flex gap-1 flex-wrap">
                          <button className="btn btn-outline-info btn-sm" onClick={() => setViewId(viewId === e.id ? null : e.id)}>Ver</button>
                          <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(e)}>Editar</button>
                          {!e.fecha_salida && <button className="btn btn-outline-warning btn-sm" onClick={() => handleBaja(e.id)}>Baja</button>}
                          {e.fecha_salida && <button className="btn btn-outline-success btn-sm" onClick={() => handleReactivar(e.id)}>Reactivar</button>}
                          {isAdmin && <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(e.id)}>Eliminar</button>}
                        </td>
                      )}
                    </tr>
                    {viewId === e.id && (
                      <tr><td colSpan={9} style={{ background: '#f8f9fa', padding: 16 }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong>Activos asignados a {e.nombre} {e.apellido}:</strong>
                          {canAdd && (
                            <div className="d-flex gap-2">
                              <select className="form-select form-select-sm" style={{ width: 250 }} value={asigActivo} onChange={ev => setAsigActivo(ev.target.value)}>
                                <option value="">Asignar activo...</option>
                                {filtrar(DB.getActivos()).filter(a => a.estado === 'DISPONIBLE').map(a => <option key={a.id} value={a.id}>{a.nombre} ({a.serial})</option>)}
                              </select>
                              <button className="btn btn-sm text-white" style={{ background: '#003087' }} disabled={!asigActivo} onClick={() => {
                                if (!asigActivo) return;
                                DB.createAsignacion({ activo_id: parseInt(asigActivo), empleado_id: e.id, observaciones: 'Asignado desde perfil' });
                                DB.updateActivo(parseInt(asigActivo), { estado: 'ASIGNADO' });
                                DB.addLog('Asignacion', DB.getActivo(parseInt(asigActivo))?.nombre + ' -> ' + e.nombre, user.username);
                                setAsigActivo(''); setRefresh(r => r + 1);
                              }}>Asignar</button>
                            </div>
                          )}
                        </div>
                        {(() => {
                          const asigs = DB.getAsignaciones().filter(a => a.empleado_id === e.id && !a.fecha_devolucion);
                          if (!asigs.length) return <p className="text-muted small mb-0">Sin activos asignados.</p>;
                          return (
                            <table className="table table-sm table-bordered mb-0">
                              <thead><tr><th>Activo</th><th>Serial</th><th>Tipo</th><th>Valor</th><th>Fecha Asignacion</th>{canAdd && <th></th>}</tr></thead>
                              <tbody>
                                {asigs.map(a => {
                                  const act = DB.getActivo(a.activo_id);
                                  return (
                                    <tr key={a.id}>
                                      <td><strong>{act?.nombre || '?'}</strong></td>
                                      <td><code>{act?.serial}</code></td>
                                      <td>{act?.tipo}</td>
                                      <td>{'$' + Number(act?.valor || 0).toLocaleString('es-CO')}</td>
                                      <td><small>{fd(a.fecha_asignacion)}</small></td>
                                      {canAdd && <td>
                                        <button className="btn btn-outline-success btn-sm" onClick={() => {
                                          if (!window.confirm('Devolver este activo?')) return;
                                          DB.updateAsignacion(a.id, { fecha_devolucion: new Date().toISOString() });
                                          DB.updateActivo(a.activo_id, { estado: 'DISPONIBLE' });
                                          DB.addLog('Devolucion', act?.nombre, user.username);
                                          setRefresh(r => r + 1);
                                        }}>Devolver</button>
                                      </td>}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          );
                        })()}
                      </td></tr>
                    )}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
