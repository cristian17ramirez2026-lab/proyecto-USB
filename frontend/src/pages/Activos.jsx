import { useState } from 'react';
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

  const activos = filtrar(DB.getActivos()).filter(a => {
    const q = search.toLowerCase();
    return (!q || a.nombre.toLowerCase().includes(q) || a.serial.toLowerCase().includes(q) || a.tipo.toLowerCase().includes(q)) && (!filtroEstado || a.estado === filtroEstado);
  });

  const sedes = DB.getSedes();
  const deps = DB.getDeps();
  const sn = (id) => DB.getSede(id)?.nombre || '-';
  const dn = (id) => DB.getDep(id)?.nombre || '-';
  const fc = (v) => '$' + Number(v).toLocaleString('es-CO');
  const eb = (e) => { const m = { DISPONIBLE: 'success', ASIGNADO: 'warning', DANADO: 'danger' }; return <span className={`badge bg-${m[e] || 'secondary'}`}>{e}</span>; };

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

  const handleDelete = (id) => {
    const a = DB.getActivo(id);
    if (DB.getAsignaciones().some(x => x.activo_id === id && !x.fecha_devolucion)) { alert('No se puede eliminar: esta asignado.'); return; }
    if (window.confirm(`Eliminar "${a.nombre}"?`)) { DB.deleteActivo(id); DB.addLog('Activo eliminado', a.nombre, user.username); setRefresh(r => r + 1); }
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
    <div>
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
                <div className="col-md-6"><label className="form-label small fw-bold">Serial * (unico)</label><input className="form-control" value={form.serial} onChange={e => setForm({ ...form, serial: e.target.value })} required /></div>
                <div className="col-md-12"><label className="form-label small fw-bold">Descripcion</label><input className="form-control" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Tipo *</label><input className="form-control" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} required /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Valor *</label><input type="number" className="form-control" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} min="1" required /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Fecha Compra *</label><input type="date" className="form-control" value={form.fecha_compra} onChange={e => setForm({ ...form, fecha_compra: e.target.value })} required /></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Sede</label>
                  <select className="form-select" value={form.sede_id} onChange={e => setForm({ ...form, sede_id: e.target.value })}><option value="">Sin sede</option>{sedes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}</select></div>
                <div className="col-md-4"><label className="form-label small fw-bold">Departamento</label>
                  <select className="form-select" value={form.departamento_id} onChange={e => setForm({ ...form, departamento_id: e.target.value })}><option value="">Sin depto</option>{deps.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}</select></div>
                {editId && <div className="col-md-4"><label className="form-label small fw-bold">Estado</label>
                  <select className="form-select" value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}><option value="DISPONIBLE">Disponible</option><option value="ASIGNADO">Asignado</option><option value="DANADO">Reparacion / Baja</option></select></div>}
              </div>
              <div className="mt-3 d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>Cancelar</button>
                <button type="submit" className="btn btn-sm text-white" style={{ background: '#003087' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="d-flex gap-2 mb-3">
        <input type="text" className="form-control" style={{ maxWidth: 350 }} placeholder="Buscar nombre, serial, tipo..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="form-select" style={{ maxWidth: 180 }} value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
          <option value="">Todos</option><option value="DISPONIBLE">Disponible</option><option value="ASIGNADO">Asignado</option><option value="DANADO">Reparacion</option>
        </select>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light"><tr><th>Activo</th><th>Tipo</th><th>Serial</th><th>Valor</th><th>Fecha Compra</th><th>Sede</th><th>Depto</th><th>Estado</th>{canAdd && <th></th>}</tr></thead>
            <tbody>
              {activos.length === 0 ? <tr><td colSpan={9} className="text-center text-muted py-4">No hay activos</td></tr> :
                activos.map(a => (
                  <tr key={a.id}>
                    <td><strong>{a.nombre}</strong>{a.descripcion && <><br /><small className="text-muted">{a.descripcion}</small></>}</td>
                    <td>{a.tipo}</td>
                    <td><code className="bg-light px-1 rounded">{a.serial}</code></td>
                    <td><strong>{fc(a.valor)}</strong></td>
                    <td><small>{a.fecha_compra ? new Date(a.fecha_compra + 'T00:00:00').toLocaleDateString('es-CO', {year:'numeric',month:'short',day:'numeric'}) : '-'}</small></td>
                    <td>{sn(a.sede_id)}</td>
                    <td>{dn(a.departamento_id)}</td>
                    <td>{eb(a.estado)}</td>
                    {canAdd && <td className="d-flex gap-1">
                      <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(a)}>Editar</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(a.id)}>Eliminar</button>
                    </td>}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
