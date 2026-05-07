import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

export default function Sedes() {
  const { isAdmin, canAdd, user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ nombre: '', ciudad: '', direccion: '', telefono: '' });
  const [error, setError] = useState('');

  const sedes = DB.getSedes();
  // Operador solo ve su sede
  const sedesFiltradas = user?.rol === 'OPERADOR' && user?.sede_id 
    ? sedes.filter(s => s.id === user.sede_id) 
    : sedes;

  const resetForm = () => { setForm({ nombre: '', ciudad: '', direccion: '', telefono: '' }); setEditId(null); setShowForm(false); setError(''); };

  const handleEdit = (s) => { setForm({ nombre: s.nombre, ciudad: s.ciudad, direccion: s.direccion, telefono: s.telefono }); setEditId(s.id); setShowForm(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.ciudad || !form.direccion) { setError('Complete los campos obligatorios.'); return; }
    if (editId) { DB.updateSede(editId, form); DB.addLog('Sede editada', form.nombre, user.username); }
    else { DB.createSede(form); DB.addLog('Sede creada', form.nombre, user.username); }
    resetForm(); setRefresh(r => r + 1);
  };

  const handleDelete = (id) => {
    const s = DB.getSede(id);
    const tieneActivos = DB.getActivos().some(a => a.sede_id === id);
    const tieneEmpleados = DB.getEmpleados().some(e => e.sede_id === id);
    const tieneDeps = DB.getDeps().some(d => d.sede_id === id);
    if (tieneActivos || tieneEmpleados || tieneDeps) {
      const deps = [];
      if (tieneActivos) deps.push('activos');
      if (tieneEmpleados) deps.push('empleados');
      if (tieneDeps) deps.push('departamentos');
      alert('No se puede eliminar: la sede tiene ' + deps.join(', ') + ' asociados.');
      return;
    }
    if (window.confirm(`¿Eliminar sede "${s.nombre}"?`)) { DB.deleteSede(id); DB.addLog('Sede eliminada', s.nombre, user.username); setRefresh(r => r + 1); }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Sedes ({sedesFiltradas.length})</h5>
        {isAdmin && <button className="btn btn-sm text-white" style={{ background: '#003087' }} onClick={() => { resetForm(); setShowForm(!showForm); }}>+ Nueva Sede</button>}
      </div>

      {showForm && isAdmin && (
        <div className="card shadow-sm mb-3">
          <div className="card-header fw-bold">{editId ? 'Editar' : 'Nueva'} Sede</div>
          <div className="card-body">
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label small fw-bold">Nombre *</label><input className="form-control" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Ciudad *</label><input className="form-control" value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} required /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Dirección *</label><input className="form-control" value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} required /></div>
                <div className="col-md-6"><label className="form-label small fw-bold">Teléfono</label><input className="form-control" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} /></div>
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
            <thead className="table-light"><tr><th>Sede</th><th>Ciudad</th><th>Dirección</th><th>Teléfono</th><th>Deptos</th><th>Activos</th>{isAdmin && <th></th>}</tr></thead>
            <tbody>
              {sedesFiltradas.length === 0 ? <tr><td colSpan={7} className="text-center text-muted py-4">No hay sedes</td></tr> :
                sedesFiltradas.map(s => {
                  const nd = DB.getDeps().filter(d => d.sede_id === s.id).length;
                  const na = DB.getActivos().filter(a => a.sede_id === s.id).length;
                  return (
                    <tr key={s.id}>
                      <td><strong>{s.nombre}</strong></td>
                      <td>{s.ciudad}</td>
                      <td>{s.direccion}</td>
                      <td>{s.telefono || '-'}</td>
                      <td><span className="badge bg-primary">{nd}</span></td>
                      <td><span className="badge bg-secondary">{na}</span></td>
                      {isAdmin && <td>
                        <button className="btn btn-outline-primary btn-sm me-1" onClick={() => handleEdit(s)}>Editar</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(s.id)}>Eliminar</button>
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
