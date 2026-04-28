import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

export default function Departamentos() {
  const { isAdmin, canAdd, user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ nombre: '', sede_id: '', area: '', responsable: '' });
  const [error, setError] = useState('');

  const allDeps = DB.getDeps();
  const deps = user?.rol === 'OPERADOR' && user?.sede_id 
    ? allDeps.filter(d => d.sede_id === user.sede_id) 
    : allDeps;
  const sedes = DB.getSedes();
  const sn = (id) => DB.getSede(id)?.nombre || '-';

  const resetForm = () => { setForm({ nombre: '', sede_id: '', area: '', responsable: '' }); setEditId(null); setShowForm(false); setError(''); };
  const handleEdit = (d) => { setForm({ nombre: d.nombre, sede_id: d.sede_id || '', area: d.area || '', responsable: d.responsable || '' }); setEditId(d.id); setShowForm(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.sede_id || !form.area) { setError('Complete los campos obligatorios.'); return; }
    const data = { ...form, sede_id: parseInt(form.sede_id) };
    if (editId) { DB.updateDep(editId, data); DB.addLog('Depto editado', data.nombre, user.username); }
    else { DB.createDep(data); DB.addLog('Depto creado', data.nombre, user.username); }
    resetForm(); setRefresh(r => r + 1);
  };

  const handleDelete = (id) => {
    const d = DB.getDep(id);
    const tieneEmps = DB.getEmpleados().some(e => e.departamento_id === id);
    const tieneActs = DB.getActivos().some(a => a.departamento_id === id);
    if (tieneEmps || tieneActs) {
      const deps = [];
      if (tieneEmps) deps.push('empleados');
      if (tieneActs) deps.push('activos');
      alert('No se puede eliminar: el departamento tiene ' + deps.join(' y ') + ' asociados.');
      return;
    }
    if (window.confirm(`Eliminar "${d.nombre}"?`)) { DB.deleteDep(id); DB.addLog('Depto eliminado', d.nombre, user.username); setRefresh(r => r + 1); }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Departamentos ({deps.length})</h5>
        {isAdmin && <button className="btn btn-sm text-white" style={{ background: '#003087' }} onClick={() => { resetForm(); setShowForm(!showForm); }}>+ Nuevo Depto</button>}
      </div>

      {showForm && isAdmin && (
        <div className="card shadow-sm mb-3">
          <div className="card-header fw-bold">{editId ? 'Editar' : 'Nuevo'} Departamento</div>
          <div className="card-body">
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label small fw-bold">Nombre *</label><input className="form-control" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Sede *</label>
                  <select className="form-select" value={form.sede_id} onChange={e => setForm({ ...form, sede_id: e.target.value })} required>
                    <option value="">Seleccione...</option>
                    {sedes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                  </select>
                </div>
                <div className="col-md-6"><label className="form-label small fw-bold">Area *</label><input className="form-control" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} required /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Responsable</label><input className="form-control" value={form.responsable} onChange={e => setForm({ ...form, responsable: e.target.value })} /></div>
              </div>
              <div className="mt-3 d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>Cancelar</button>
                <button type="submit" className="btn btn-sm text-white" style={{ background: '#003087' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light"><tr><th>Departamento</th><th>Sede</th><th>Area</th><th>Responsable</th><th>Empleados</th>{isAdmin && <th></th>}</tr></thead>
            <tbody>
              {deps.length === 0 ? <tr><td colSpan={6} className="text-center text-muted py-4">No hay departamentos</td></tr> :
                deps.map(d => {
                  const ne = DB.getEmpleados().filter(e => e.departamento_id === d.id).length;
                  return (
                    <tr key={d.id}>
                      <td><strong>{d.nombre}</strong></td>
                      <td>{sn(d.sede_id)}</td>
                      <td><span className="badge bg-primary">{d.area}</span></td>
                      <td>{d.responsable || '-'}</td>
                      <td><span className="badge bg-secondary">{ne}</span></td>
                      {isAdmin && <td>
                        <button className="btn btn-outline-primary btn-sm me-1" onClick={() => handleEdit(d)}>Editar</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(d.id)}>Eliminar</button>
                      </td>}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
