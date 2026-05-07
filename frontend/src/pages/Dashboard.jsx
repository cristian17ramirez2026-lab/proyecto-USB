import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

export default function Dashboard() {
  const { user, filtrar, isAdmin } = useAuth();
  const activos = filtrar(DB.getActivos());
  const empleados = filtrar(DB.getEmpleados());
  const disp = activos.filter(a => a.estado === 'DISPONIBLE').length;
  const asig = activos.filter(a => a.estado === 'ASIGNADO').length;
  const dan = activos.filter(a => a.estado === 'DANADO').length;
  const valor = activos.reduce((s, a) => s + a.valor, 0);

  const stats = [
    { label: 'Total Activos', value: activos.length, color: '#FF0000', icon: '💻' },
    { label: 'Disponibles', value: disp, color: '#00AA00', icon: '✅' },
    { label: 'Asignados', value: asig, color: '#FF8800', icon: '📋' },
    { label: 'En Reparación', value: dan, color: '#003087', icon: '⚠️' },
    { label: 'Empleados', value: empleados.length, color: '#0066CC', icon: '👥' },
    { label: 'Sedes', value: DB.getSedes().length, color: '#FF0000', icon: '🏢' },
    { label: 'Departamentos', value: DB.getDeps().length, color: '#003087', icon: '🏛️' },
    { label: 'Valor Inventario', value: '$' + valor.toLocaleString('es-CO'), color: '#00AA00', icon: '💰' },
  ];

  return (
    <div>
      <div className="rounded-3 p-4 text-white mb-4" style={{ background: '#003087' }}>
        <h4 className="fw-bold mb-1">Bienvenido, {user?.username}</h4>
        <p className="mb-0 opacity-75">{isAdmin ? 'Vista global del sistema' : 'Vista de ' + (DB.getSede(user?.sede_id)?.nombre || 'tu sede')}</p>
      </div>
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-md-3 col-sm-6">
            <div className="bg-white rounded-3 p-3 shadow-sm d-flex align-items-center gap-3 border">
              <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 46, height: 46, background: s.color, fontSize: '1.2rem' }}>{s.icon}</div>
              <div><div className="fw-bold fs-4 lh-1">{s.value}</div><small className="text-muted">{s.label}</small></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
