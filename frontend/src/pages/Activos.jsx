import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

export default function Activos() {
  const { user, filtrar, canAdd, isAdmin } = useAuth();
  const [search, setSearch] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ nombre: '', descripcion: '', tipo: '', serial: '', valor: '', fecha_compra: '', sede_id: '', departamento_id: '', estado: 'DISPONIBLE' });
  const [error, setError] = useState('');
  const [showBajaModal, setShowBajaModal] = useState(false);
  const [bajaActivoId, setBajaActivoId] = useState(null);
  const [motivoBaja, setMotivoBaja] = useState('');
  const [showBajaDropdown, setShowBajaDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef({});

  const activos = filtrar(DB.getActivos()).filter(a => {
    const q = search.toLowerCase();
    return (!q || a.nombre.toLowerCase().includes(q) || a.serial.toLowerCase().includes(q) || a.tipo.toLowerCase().includes(q)) && (!filtroEstado || a.estado === filtroEstado);
  });

  const sedes = DB.getSedes();
  const deps = DB.getDeps();
  const sn = (id) => DB.getSede(id)?.nombre || '-';
  const dn = (id) => DB.getDep(id)?.nombre || '-';
  const fc = (v) => '$' + Number(v).toLocaleString('es-CO');
  const eb = (e) => { const m = { DISPONIBLE: 'success', ASIGNADO: 'warning', DANADO: 'danger', BAJA: 'secondary' }; return <span className={`badge bg-${m[e] || 'secondary'}`}>{e}</span>; };

  const resetForm = () => { setForm({ nombre: '', descripcion: '', tipo: '', serial: '', valor: '', fecha_compra: '', sede_id: '', departamento_id: '', estado: 'DISPONIBLE' }); setEditId(null); setShowForm(false); setError(''); };

  const handleEdit = (a) => { setForm({ nombre: a.nombre, descripcion: a.descripcion || '', tipo: a.tipo, serial: a.serial, valor: a.valor, fecha_compra: a.fecha_compra, sede_id: a.sede_id || '', departamento_id: a.departamento_id || '', estado: a.estado }); setEditId(a.id); setShowForm(true); };

  const handleSubmit = (e) => {
    e.preventDefault(); setError('');
    if (!form.nombre || !form.tipo || !form.serial || !form.valor || !form.fecha_compra) { setError('Complete todos los campos obligatorios.'); return; }
    if (parseFloat(form.valor) <= 0) { setError('Valor debe ser mayor a 0.'); return; }
    const dup = DB.getActivos().find(a => a.serial === form.serial && a.id !== editId);
    if (dup) { setError('Serial "' + form.serial + '" ya existe.'); return; }
    const data = { ...form, valor: parseFloat(form.valor), sede_id: form.sede_id ? parseInt(form.sede_id) : null, departamento_id: form.departamento_id ? parseInt(form.departamento_id) : null };
    if (editId) { DB.updateActivo(editId, data); DB.addLog('Activo editado', data.nombre, user.username); }
    else { DB.createActivo(data); DB.addLog('Activo creado', data.nombre, user.username); }
    resetForm(); setRefresh(r => r + 1);
  };

  const handleBaja = (id) => {
    const a = DB.getActivo(id);
    if (DB.getAsignaciones().some(x => x.activo_id === id && !x.fecha_devolucion)) { 
      alert('No se puede dar de baja: el activo está asignado. Debe devolverlo primero.'); 
      return; 
    }
    setBajaActivoId(id);
    setMotivoBaja('');
    setShowBajaModal(true);
  };

  const handleBajaConMotivo = (id, motivo) => {
    const a = DB.getActivo(id);
    if (DB.getAsignaciones().some(x => x.activo_id === id && !x.fecha_devolucion)) { 
      alert('No se puede dar de baja: el activo está asignado. Debe devolverlo primero.'); 
      return; 
    }
    if (window.confirm(`¿Dar de baja el activo "${a.nombre}" por motivo: ${motivo}?`)) {
      DB.updateActivo(id, { estado: 'BAJA', motivo_baja: motivo, fecha_baja: new Date().toISOString() });
      DB.addLog('Activo dado de baja', a.nombre + ' - Motivo: ' + motivo, user.username);
      setRefresh(r => r + 1);
    }
  };

  const confirmarBaja = () => {
    if (!motivoBaja.trim()) {
      alert('Debe seleccionar un motivo de baja');
      return;
    }
    const a = DB.getActivo(bajaActivoId);
    DB.updateActivo(bajaActivoId, { estado: 'BAJA', motivo_baja: motivoBaja, fecha_baja: new Date().toISOString() });
    DB.addLog('Activo dado de baja', a.nombre + ' - Motivo: ' + motivoBaja, user.username);
    setShowBajaModal(false);
    setBajaActivoId(null);
    setMotivoBaja('');
    setRefresh(r => r + 1);
  };

  const cancelarBaja = () => {
    setShowBajaModal(false);
    setBajaActivoId(null);
    setMotivoBaja('');
  };

  const handleDelete = (id) => {
    const a = DB.getActivo(id);
    if (DB.getAsignaciones().some(x => x.activo_id === id && !x.fecha_devolucion)) { alert('No se puede eliminar: está asignado.'); return; }
    if (window.confirm(`¿Eliminar "${a.nombre}"?`)) { DB.deleteActivo(id); DB.addLog('Activo eliminado', a.nombre, user.username); setRefresh(r => r + 1); }
  };

  const exportCSV = () => {
    let csv = 'Nombre,Tipo,Serial,Valor,Estado,Sede,Departamento\n';
    activos.forEach(a => { csv += `"${a.nombre}","${a.tipo}","${a.serial}",${a.valor},"${a.estado}","${sn(a.sede_id)}","${dn(a.departamento_id)}"\n`; });
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); link.download = 'activos.csv'; link.click();
    DB.addLog('Exportar CSV', 'Activos', user.username);
  };

  return (
    <div className="container-fluid px-3 px-md-4 py-3">
      {/* Modal de Baja */}
      {showBajaModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={cancelarBaja}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Motivo de baja del activo</h5>
                <button type="button" className="btn-close" onClick={cancelarBaja}></button>
              </div>
              <div className="modal-body">
                <p className="mb-3">Seleccione el motivo de baja del activo <strong>{DB.getActivo(bajaActivoId)?.nombre}</strong> (Serial: <code>{DB.getActivo(bajaActivoId)?.serial}</code>):</p>
                <select 
                  className="form-select" 
                  value={motivoBaja} 
                  onChange={(e) => setMotivoBaja(e.target.value)}
                  autoFocus
                >
                  <option value="">-- Seleccione un motivo --</option>
                  <option value="Daño irreparable">Daño irreparable</option>
                  <option value="Obsolescencia">Obsolescencia</option>
                  <option value="Pérdida">Pérdida</option>
                  <option value="Robo">Robo</option>
                  <option value="Fin de vida útil">Fin de vida útil</option>
                  <option value="Venta">Venta</option>
                  <option value="Donación">Donación</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelarBaja}>Cancelar</button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmarBaja}
                  disabled={!motivoBaja.trim()}
                >
                  Confirmar Baja
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h5 className="fw-bold mb-0">Activos ({activos.length})</h5>
        <div className="d-flex gap-2">
          {canAdd && <button className="btn btn-sm text-white" style={{ background: '#003087' }} onClick={() => { resetForm(); setShowForm(!showForm); }}>{showForm ? 'Cerrar' : '+ Nuevo Activo'}</button>}
          <button className="btn btn-success btn-sm" onClick={exportCSV}>CSV</button>
        </div>
      </div>

      {showForm && canAdd && (
        <div className="card shadow-sm mb-3">
          <div className="card-header fw-bold">{editId ? 'Editar' : 'Nuevo'} Activo</div>
          <div className="card-body">
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label small fw-bold">Nombre *</label><input className="form-control" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Serial * (único)</label><input className="form-control" value={form.serial} onChange={e => setForm({ ...form, serial: e.target.value })} required /></div>
                <div className="col-md-12"><label className="form-label small fw-bold">Descripción</label><input className="form-control" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Tipo *</label><input className="form-control" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} required /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Valor *</label><input type="number" className="form-control" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} min="1" required /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Fecha Compra *</label><input type="date" className="form-control" value={form.fecha_compra} onChange={e => setForm({ ...form, fecha_compra: e.target.value })} required /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Sede</label>
                  <select className="form-select" value={form.sede_id} onChange={e => setForm({ ...form, sede_id: e.target.value })}><option value="">Sin sede</option>{sedes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}</select></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Departamento</label>
                  <select className="form-select" value={form.departamento_id} onChange={e => setForm({ ...form, departamento_id: e.target.value })}><option value="">Sin depto</option>{deps.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}</select></div>
                {editId && <div className="col-md-4"><label className="form-label small fw-bold">Estado</label>
                  <select className="form-select" value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}><option value="DISPONIBLE">Disponible</option><option value="ASIGNADO">Asignado</option><option value="DANADO">Reparación / Baja</option><option value="BAJA">Baja</option></select></div>}
              </div>
              <div className="mt-3 d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>Cancelar</button>
                <button type="submit" className="btn btn-sm text-white" style={{ background: '#003087' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="d-flex gap-2 mb-3 flex-wrap">
        <input type="text" className="form-control flex-grow-1" style={{ maxWidth: 350 }} placeholder="Buscar nombre, serial, tipo..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="form-select" style={{ maxWidth: 180, minWidth: 150 }} value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
          <option value="">Todos</option><option value="DISPONIBLE">Disponible</option><option value="ASIGNADO">Asignado</option><option value="DANADO">Reparación</option><option value="BAJA">Baja</option>
        </select>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle" style={{ fontSize: '0.8125rem' }}>
            <thead className="table-light" style={{ fontSize: '0.75rem' }}>
              <tr>
                <th style={{ fontWeight: 600, padding: '0.5rem' }}>Activo</th>
                <th className="d-none d-md-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Tipo</th>
                <th className="d-none d-lg-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Serial</th>
                <th style={{ fontWeight: 600, padding: '0.5rem' }}>Valor</th>
                <th className="d-none d-lg-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Fecha Compra</th>
                <th className="d-none d-md-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Sede</th>
                <th className="d-none d-xl-table-cell" style={{ fontWeight: 600, padding: '0.5rem' }}>Depto</th>
                <th style={{ fontWeight: 600, padding: '0.5rem' }}>Estado</th>
                {canAdd && <th style={{ fontWeight: 600, padding: '0.5rem' }}>Acciones</th>}
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.8125rem' }}>
              {activos.length === 0 ? <tr><td colSpan={9} className="text-center text-muted py-4">No hay activos</td></tr> :
                activos.map(a => (
                  <tr key={a.id}>
                    <td style={{ maxWidth: '250px', padding: '0.5rem' }}>
                      <strong style={{ fontSize: '0.8125rem' }}>{a.nombre}</strong>
                      {a.descripcion && <><br /><small className="text-muted" style={{ fontSize: '0.7rem' }}>{a.descripcion}</small></>}
                      <div className="d-md-none mt-1">
                        <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>{a.tipo}</small>
                        <code className="bg-light px-1 rounded" style={{ fontSize: '0.65rem' }}>{a.serial}</code>
                      </div>
                    </td>
                    <td className="d-none d-md-table-cell" style={{ padding: '0.5rem' }}>{a.tipo}</td>
                    <td className="d-none d-lg-table-cell" style={{ padding: '0.5rem' }}><code className="bg-light px-1 rounded" style={{ fontSize: '0.7rem' }}>{a.serial}</code></td>
                    <td style={{ padding: '0.5rem' }}><strong className="text-nowrap" style={{ fontSize: '0.8125rem' }}>{fc(a.valor)}</strong></td>
                    <td className="d-none d-lg-table-cell" style={{ padding: '0.5rem' }}><small style={{ fontSize: '0.7rem' }}>{a.fecha_compra ? new Date(a.fecha_compra + 'T00:00:00').toLocaleDateString('es-CO', {year:'numeric',month:'short',day:'numeric'}) : '-'}</small></td>
                    <td className="d-none d-md-table-cell" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>{sn(a.sede_id)}</td>
                    <td className="d-none d-xl-table-cell" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>{dn(a.departamento_id)}</td>
                    <td style={{ padding: '0.5rem' }}>{eb(a.estado)}</td>
                    {canAdd && <td style={{ padding: '0.5rem', verticalAlign: 'middle' }}>
                      <div className="d-flex gap-1 flex-nowrap align-items-center" style={{ minWidth: 'max-content' }}>
                        <button className="btn btn-outline-success btn-sm px-2 py-1" style={{ fontSize: '0.7rem', lineHeight: '1.2' }} onClick={() => handleEdit(a)}>Asignar</button>
                        <button className="btn btn-outline-primary btn-sm px-2 py-1" style={{ fontSize: '0.7rem', lineHeight: '1.2' }} onClick={() => handleEdit(a)}>Editar</button>
                        {(a.estado !== 'BAJA' && a.estado !== 'DANADO') && (
                          <div style={{ position: 'relative' }}>
                            <button 
                              ref={el => buttonRefs.current[a.id] = el}
                              className="btn btn-outline-warning btn-sm px-2 py-1" 
                              style={{ fontSize: '0.7rem', lineHeight: '1.2' }}
                              type="button" 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (showBajaDropdown === a.id) {
                                  setShowBajaDropdown(null);
                                } else {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  const menuWidth = 180;
                                  let left = rect.left;
                                  
                                  if (left + menuWidth > window.innerWidth) {
                                    left = window.innerWidth - menuWidth - 10;
                                  }
                                  
                                  setDropdownPosition({
                                    top: rect.bottom + 2,
                                    left: left
                                  });
                                  setShowBajaDropdown(a.id);
                                }
                              }}
                            >
                              Baja ▼
                            </button>
                          </div>
                        )}
                        {isAdmin && <button className="btn btn-outline-danger btn-sm px-2 py-1" style={{ fontSize: '0.7rem', lineHeight: '1.2' }} onClick={() => handleDelete(a.id)}>Eliminar</button>}
                      </div>
                    </td>}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dropdown de Baja - Renderizado fuera de la tabla */}
      {showBajaDropdown && (
        <>
          <div 
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              zIndex: 1040 
            }}
            onClick={() => setShowBajaDropdown(null)}
          ></div>
          <div 
            style={{ 
              position: 'fixed',
              top: dropdownPosition.top + 'px',
              left: dropdownPosition.left + 'px',
              zIndex: 1050, 
              width: 'auto',
              minWidth: '180px',
              maxHeight: '300px',
              overflowY: 'auto',
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '0.375rem',
              boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
              padding: '0.25rem 0'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="btn btn-sm text-start w-100 border-0 rounded-0 px-3 py-2" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => { handleBajaConMotivo(showBajaDropdown, 'Daño irreparable'); setShowBajaDropdown(null); }}>Daño irreparable</button>
            <button type="button" className="btn btn-sm text-start w-100 border-0 rounded-0 px-3 py-2" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => { handleBajaConMotivo(showBajaDropdown, 'Obsolescencia'); setShowBajaDropdown(null); }}>Obsolescencia</button>
            <button type="button" className="btn btn-sm text-start w-100 border-0 rounded-0 px-3 py-2" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => { handleBajaConMotivo(showBajaDropdown, 'Pérdida'); setShowBajaDropdown(null); }}>Pérdida</button>
            <button type="button" className="btn btn-sm text-start w-100 border-0 rounded-0 px-3 py-2" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => { handleBajaConMotivo(showBajaDropdown, 'Robo'); setShowBajaDropdown(null); }}>Robo</button>
            <button type="button" className="btn btn-sm text-start w-100 border-0 rounded-0 px-3 py-2" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => { handleBajaConMotivo(showBajaDropdown, 'Fin de vida útil'); setShowBajaDropdown(null); }}>Fin de vida útil</button>
            <button type="button" className="btn btn-sm text-start w-100 border-0 rounded-0 px-3 py-2" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => { handleBajaConMotivo(showBajaDropdown, 'Venta'); setShowBajaDropdown(null); }}>Venta</button>
            <button type="button" className="btn btn-sm text-start w-100 border-0 rounded-0 px-3 py-2" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => { handleBajaConMotivo(showBajaDropdown, 'Donación'); setShowBajaDropdown(null); }}>Donación</button>
            <button type="button" className="btn btn-sm text-start w-100 border-0 rounded-0 px-3 py-2" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => { handleBajaConMotivo(showBajaDropdown, 'Otro'); setShowBajaDropdown(null); }}>Otro</button>
          </div>
        </>
      )}
    </div>
  );
}
