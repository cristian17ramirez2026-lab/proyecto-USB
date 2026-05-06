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
  const [confirmAction, setConfirmAction] = useState(null); // { id, type: 'asignar'|'editar'|'eliminar' }

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

  const handleEdit = (e) => { 
    setForm({ nombre: e.nombre, apellido: e.apellido, cedula: e.cedula, email: e.email || '', sede_id: e.sede_id || '', departamento_id: e.departamento_id || '', cargo: e.cargo }); 
    setEditId(e.id); 
    setShowForm(true);
    setConfirmAction(null);
  };

  const confirmarAccion = (id, tipo) => {
    const emp = DB.getEmpleado(id);
    if (tipo === 'asignar') {
      setViewId(viewId === id ? null : id);
      setConfirmAction(null);
    } else if (tipo === 'editar') {
      handleEdit(emp);
      setConfirmAction(null);
    } else if (tipo === 'eliminar') {
      const hasAsig = DB.getAsignaciones().some(a => a.empleado_id === id && !a.fecha_devolucion);
      if (hasAsig) { 
        alert('No se puede eliminar: tiene activos asignados.'); 
        setConfirmAction(null);
        return; 
      }
      DB.deleteEmpleado(id); 
      DB.addLog('Empleado eliminado', emp.nombre, user.username); 
      setRefresh(r => r + 1);
      setConfirmAction(null);
    }
  };

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

  const handleBajaConMotivo = (id, motivo) => {
    const e = DB.getEmpleado(id);
    if (window.confirm(`¿Dar de baja a "${e.nombre} ${e.apellido}" por motivo: ${motivo}?`)) {
      DB.updateEmpleado(id, { fecha_salida: new Date().toISOString(), activo: false, motivo_baja: motivo });
      DB.addLog('Empleado dado de baja', e.nombre + ' ' + e.apellido + ' - Motivo: ' + motivo, user.username);
      setRefresh(r => r + 1);
    }
  };

  const handleBaja = (id) => {
    const e = DB.getEmpleado(id);
    if (window.confirm('¿Dar de baja a "' + e.nombre + ' ' + e.apellido + '"?')) {
      DB.updateEmpleado(id, { fecha_salida: new Date().toISOString(), activo: false });
      DB.addLog('Empleado dado de baja', e.nombre + ' ' + e.apellido, user.username);
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
    setConfirmAction({ id, type: 'eliminar' });
  };

  return (
    <div className="container-fluid px-3 px-md-4 py-3">
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

      <input type="text" className="form-control mb-3" style={{ maxWidth: '100%', width: '100%', maxWidth: 350 }} placeholder="Buscar nombre, cédula, cargo..." value={search} onChange={e => setSearch(e.target.value)} />

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle" style={{ fontSize: '0.8125rem' }}>
            <thead className="table-light" style={{ fontSize: '0.75rem' }}>
              <tr>
                <th style={{ fontWeight: 600, padding: '0.5rem' }}>Empleado</th>
                <th className="d-none d-lg-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Cédula</th>
                <th className="d-none d-md-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Sede</th>
                <th className="d-none d-xl-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Depto</th>
                <th className="d-none d-md-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Cargo</th>
                <th style={{ fontWeight: 600, padding: '0.5rem' }}>Activos</th>
                <th className="d-none d-lg-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Ingreso</th>
                <th style={{ fontWeight: 600, padding: '0.5rem' }}>Estado</th>
                {canAdd && <th style={{ fontWeight: 600, padding: '0.5rem' }}>Acciones</th>}
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.8125rem' }}>
              {empleados.length === 0 ? <tr><td colSpan={9} className="text-center text-muted py-4">No hay empleados</td></tr> :
                empleados.map(e => {
                  const cnt = DB.getAsignaciones().filter(a => a.empleado_id === e.id && !a.fecha_devolucion).length;
                  return (
                    <React.Fragment key={e.id}>
                    <tr style={e.fecha_salida ? { opacity: 0.5 } : {}}>
                      <td style={{ maxWidth: '250px', padding: '0.5rem' }}>
                        <strong style={{ fontSize: '0.8125rem' }}>{e.nombre} {e.apellido}</strong>
                        {e.email && <><br /><small className="text-muted" style={{ fontSize: '0.7rem' }}>{e.email}</small></>}
                        <div className="d-lg-none mt-1">
                          <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Cédula: {e.cedula}</small>
                          <small className="text-muted d-block d-md-none" style={{ fontSize: '0.7rem' }}>Cargo: {e.cargo}</small>
                        </div>
                      </td>
                      <td className="d-none d-lg-table-cell" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>{e.cedula}</td>
                      <td className="d-none d-md-table-cell" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>{sn(e.sede_id)}</td>
                      <td className="d-none d-xl-table-cell" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>{dn(e.departamento_id)}</td>
                      <td className="d-none d-md-table-cell" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>{e.cargo}</td>
                      <td style={{ padding: '0.5rem' }}><span className={`badge bg-${cnt > 0 ? 'warning' : 'success'}`} style={{ fontSize: '0.7rem' }}>{cnt}</span></td>
                      <td className="d-none d-lg-table-cell" style={{ padding: '0.5rem' }}>
                        <small style={{ fontSize: '0.7rem' }}>{fd(e.fecha_ingreso)}</small>
                        {e.fecha_salida && <><br /><small className="text-danger" style={{ fontSize: '0.7rem' }}>Baja: {fd(e.fecha_salida)}</small></>}
                      </td>
                      <td style={{ padding: '0.5rem' }}><span className={`badge bg-${e.fecha_salida ? 'danger' : 'success'}`} style={{ fontSize: '0.7rem' }}>{e.fecha_salida ? 'Baja' : 'Activo'}</span></td>
                      {canAdd && (
                        <td style={{ padding: '0.5rem', verticalAlign: 'middle' }}>
                          <div className="d-flex gap-1 flex-nowrap align-items-center" style={{ minWidth: 'max-content' }}>
                            <button className="btn btn-outline-success btn-sm px-2 py-1" style={{ fontSize: '0.7rem', lineHeight: '1.2' }} onClick={() => {
                              if (confirmAction?.id === e.id && confirmAction?.type === 'asignar') {
                                setConfirmAction(null);
                              } else {
                                setConfirmAction({ id: e.id, type: 'asignar' });
                              }
                            }}>Asignar</button>
                            <button className="btn btn-outline-primary btn-sm px-2 py-1" style={{ fontSize: '0.7rem', lineHeight: '1.2' }} onClick={() => {
                              if (confirmAction?.id === e.id && confirmAction?.type === 'editar') {
                                setConfirmAction(null);
                              } else {
                                setConfirmAction({ id: e.id, type: 'editar' });
                              }
                            }}>Editar</button>
                            {isAdmin && <button className="btn btn-outline-danger btn-sm px-2 py-1" style={{ fontSize: '0.7rem', lineHeight: '1.2' }} onClick={() => {
                              if (confirmAction?.id === e.id && confirmAction?.type === 'eliminar') {
                                setConfirmAction(null);
                              } else {
                                handleDelete(e.id);
                              }
                            }}>Eliminar</button>}
                          </div>
                        </td>
                      )}
                    </tr>
                    {confirmAction && confirmAction.id === e.id && (
                      <tr>
                        <td colSpan={9} className="bg-warning bg-opacity-10 p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>
                                {confirmAction.type === 'asignar' && `¿Desea asignar activos a ${e.nombre} ${e.apellido}?`}
                                {confirmAction.type === 'editar' && `¿Desea editar los datos de ${e.nombre} ${e.apellido}?`}
                                {confirmAction.type === 'eliminar' && `¿Está seguro de eliminar a ${e.nombre} ${e.apellido}? Esta acción no se puede deshacer.`}
                              </strong>
                            </div>
                            <div className="d-flex gap-2">
                              <button className="btn btn-secondary btn-sm" onClick={() => setConfirmAction(null)}>Cancelar</button>
                              <button className="btn btn-primary btn-sm" onClick={() => confirmarAccion(e.id, confirmAction.type)}>Confirmar</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
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
