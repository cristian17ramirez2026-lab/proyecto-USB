import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

export default function Usuarios() {
  const { user, isAdmin } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '', nombre: '', apellido: '', rol: 'OPERADOR', sede_id: '' });
  const [error, setError] = useState('');

  if (!isAdmin) return <div className="alert alert-danger">Solo el administrador puede gestionar usuarios.</div>;

  const users = DB.getUsers();
  const sedes = DB.getSedes();
  const sn = (id) => DB.getSede(id)?.nombre || '-';
  const fd = (d) => d ? new Date(d).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' }) : '-';

  const resetForm = () => { setForm({ username: '', email: '', password: '', nombre: '', apellido: '', rol: 'OPERADOR', sede_id: '' }); setEditId(null); setError(''); };

  const handleEdit = (u) => {
    setForm({ username: u.username, email: u.email, password: '', nombre: u.nombre || '', apellido: u.apellido || '', rol: u.rol, sede_id: u.sede_id || '' });
    setEditId(u.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); setError('');
    if (!form.username || !form.email) { setError('Complete usuario y email.'); return; }
    if (!editId && !form.password) { setError('Contraseña requerida para nuevo usuario.'); return; }
    if (form.password && form.password.length < 6) { setError('Contraseña mínimo 6 caracteres.'); return; }

    if (editId) {
      // Actualizar
      const data = { username: form.username, email: form.email, nombre: form.nombre, apellido: form.apellido, rol: form.rol, sede_id: form.sede_id ? parseInt(form.sede_id) : null };
      if (form.password) data.password = form.password;
      const allUsers = DB.getUsers();
      const idx = allUsers.findIndex(u => u.id === editId);
      if (idx !== -1) { Object.assign(allUsers[idx], data); DB.s('u', allUsers); }
      DB.addLog('Usuario actualizado', form.username, user.username);
    } else {
      // Crear
      if (DB.getUserByName(form.username)) { setError('Usuario ya existe.'); return; }
      DB.createUser({ ...form, sede_id: form.sede_id ? parseInt(form.sede_id) : null });
      DB.addLog('Usuario creado', form.username, user.username);
    }
    resetForm(); setRefresh(r => r + 1);
  };

  const handleDelete = (id) => {
    if (id === user.id) { alert('No puede eliminar su propia cuenta.'); return; }
    if (window.confirm('¿Eliminar usuario?')) { DB.deleteUser(id); DB.addLog('Usuario eliminado', 'ID ' + id, user.username); setRefresh(r => r + 1); }
  };

  return (
    <div>
      <h5 className="fw-bold mb-3">Usuarios del Sistema ({users.length})</h5>
      <div className="card shadow-sm mb-4">
        <div className="card-header fw-bold">{editId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</div>
        <div className="card-body">
          {error && <div className="alert alert-danger py-2 small">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4"><label className="form-label small fw-bold">Usuario *</label><input className="form-control" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required disabled={!!editId} /></div>
              <div className="col-md-4"><label className="form-label small fw-bold">Email *</label><input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
              <div className="col-md-4"><label className="form-label small fw-bold">Contraseña {editId ? '(dejar vacío para no cambiar)' : '*'}</label><input type="password" className="form-control" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required={!editId} /></div>
              <div className="col-md-3"><label className="form-label small fw-bold">Nombre</label><input className="form-control" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} /></div>
              <div className="col-md-3"><label className="form-label small fw-bold">Apellido</label><input className="form-control" value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })} /></div>
              <div className="col-md-3"><label className="form-label small fw-bold">Rol</label>
                <select className="form-select" value={form.rol} onChange={e => setForm({ ...form, rol: e.target.value })}>
                  <option value="OPERADOR">Operador (solo su sede)</option>
                  <option value="ADMIN">Administrador (todo)</option>
                </select>
              </div>
              <div className="col-md-3"><label className="form-label small fw-bold">Sede</label>
                <select className="form-select" value={form.sede_id} onChange={e => setForm({ ...form, sede_id: e.target.value })}>
                  <option value="">Sin sede</option>
                  {sedes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-sm text-white" style={{ background: '#003087' }}>{editId ? 'Actualizar' : 'Crear'} Usuario</button>
              {editId && <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>Cancelar</button>}
            </div>
          </form>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light"><tr><th>Usuario</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Sede</th><th>Registro</th><th></th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td><strong>{u.username}</strong></td>
                  <td>{u.nombre || ''} {u.apellido || ''}</td>
                  <td>{u.email}</td>
                  <td><span className={`badge ${u.rol === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>{u.rol}</span></td>
                  <td>{sn(u.sede_id)}</td>
                  <td><small className="text-muted">{fd(u.fecha)}</small></td>
                  <td className="d-flex gap-1">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(u)}>Editar</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(u.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
