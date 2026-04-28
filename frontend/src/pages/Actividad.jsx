import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

export default function Actividad() {
  const { isAdmin } = useAuth();
  const [refresh, setRefresh] = useState(0);

  if (!isAdmin) return <div className="alert alert-danger">Solo el administrador puede ver la actividad.</div>;

  const log = DB.getLog();
  const fd = (d) => d ? new Date(d).toLocaleString('es-CO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Registro de Actividad ({log.length})</h5>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => { if (window.confirm('Limpiar log?')) { DB.clearLog(); setRefresh(r => r + 1); } }}>Limpiar</button>
      </div>
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light"><tr><th>Fecha</th><th>Usuario</th><th>Accion</th><th>Detalle</th></tr></thead>
            <tbody>
              {log.length === 0 ? <tr><td colSpan={4} className="text-center text-muted py-4">Sin actividad</td></tr> :
                log.slice(0, 100).map((x, i) => (
                  <tr key={i}>
                    <td><small>{fd(x.fecha)}</small></td>
                    <td><strong>{x.user}</strong></td>
                    <td><span className="badge bg-primary">{x.action}</span></td>
                    <td>{x.detail}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
