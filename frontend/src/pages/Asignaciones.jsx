import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

export default function Asignaciones() {
  const { filtrar, canAdd, isAdmin } = useAuth();
  const [activoId, setActivoId] = useState('');
  const [empleadoId, setEmpleadoId] = useState('');
  const [obs, setObs] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);

  const actDisp = filtrar(DB.getActivos()).filter(a => a.estado === 'DISPONIBLE');
  const emps = filtrar(DB.getEmpleados());
  const allAsg = DB.getAsignaciones();
  const myActs = filtrar(DB.getActivos());
  const sedeActs = {};
  myActs.forEach(a => { sedeActs[a.id] = true; });
  const asigs = (isAdmin ? allAsg : allAsg.filter(a => sedeActs[a.activo_id])).sort((a, b) => new Date(b.fecha_asignacion) - new Date(a.fecha_asignacion));

  const handleAsignar = (e) => {
    e.preventDefault();
    setError('');
    const aid = parseInt(activoId), eid = parseInt(empleadoId);
    if (!aid || !eid) { setError('Seleccione activo y empleado.'); return; }
    const act = DB.getActivo(aid);
    if (!act || act.estado !== 'DISPONIBLE') { setError('Activo no disponible.'); return; }
    DB.createAsignacion({ activo_id: aid, empleado_id: eid, observaciones: obs });
    DB.updateActivo(aid, { estado: 'ASIGNADO' });
    DB.addLog('Asignación', act.nombre, 'admin');
    setActivoId(''); setEmpleadoId(''); setObs(''); setRefresh(r => r + 1);
  };

  const handleDevolver = (id) => {
    if (!window.confirm('Confirmar devolución?')) return;
    const asig = DB.getAsignacion(id);
    DB.updateAsignacion(id, { fecha_devolucion: new Date().toISOString() });
    DB.updateActivo(asig.activo_id, { estado: 'DISPONIBLE' });
    DB.addLog('Devolución', DB.getActivo(asig.activo_id)?.nombre, 'admin');
    setRefresh(r => r + 1);
  };

  const fd = (d) => d ? new Date(d).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' }) : '-';

  return (
    <div>
      <h5 className="fw-bold mb-3">Asignaciones ({asigs.length})</h5>
      {canAdd && (
        <div className="card shadow-sm mb-4">
          <div className="card-header fw-bold">Nueva Asignación</div>
          <div className="card-body">
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            <form onSubmit={handleAsignar} className="row g-3">
              <div className="col-md-4">
                <label className="form-label small fw-bold">Activo disponible</label>
                <select className="form-select" value={activoId} onChange={e => setActivoId(e.target.value)}>
                  <option value="">Seleccione...</option>
                  {actDisp.map(a => <option key={a.id} value={a.id}>{a.nombre} | {a.serial}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Empleado</label>
                <select className="form-select" value={empleadoId} onChange={e => setEmpleadoId(e.target.value)}>
                  <option value="">Seleccione...</option>
                  {emps.map(e => <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Observaciones</label>
                <input type="text" className="form-control" value={obs} onChange={e => setObs(e.target.value)} placeholder="Opcional" />
              </div>
              <div className="col-12"><button type="submit" className="btn" style={{ background: '#003087', color: '#FFFFFF' }}>Registrar</button></div>
            </form>
          </div>
        </div>
      )}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr><th>Activo</th><th>Empleado</th><th>Fecha</th><th>Estado</th><th>Notas</th>{canAdd && <th></th>}</tr>
            </thead>
            <tbody>
              {asigs.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted py-4">No hay asignaciones</td></tr>
              ) : asigs.map(x => {
                const act = DB.getActivo(x.activo_id);
                const emp = DB.getEmpleado(x.empleado_id);
                return (
                  <tr key={x.id}>
                    <td><strong>{act?.nombre || '?'}</strong><br /><small className="text-muted">{act?.serial}</small></td>
                    <td>{emp ? `${emp.nombre} ${emp.apellido}` : '?'}</td>
                    <td>
                      <small className="text-muted">Asignado: {fd(x.fecha_asignacion)}</small>
                      {x.fecha_devolucion && <><br/><small className="text-success">Devuelto: {fd(x.fecha_devolucion)}</small></>}
                      {!x.fecha_devolucion && <><br/><small className="text-warning">Días: {Math.floor((new Date() - new Date(x.fecha_asignacion)) / 86400000)}</small></>}
                    </td>
                    <td>{x.fecha_devolucion ? <><span className="badge bg-success">Devuelta</span><br /><small className="text-muted">{fd(x.fecha_devolucion)}</small></> : <span className="badge bg-warning">Activa</span>}</td>
                    <td>{x.observaciones || '-'}</td>
                    {canAdd && <td>{!x.fecha_devolucion && <button className="btn btn-success btn-sm" onClick={() => handleDevolver(x.id)}>Devolver</button>}</td>}
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
