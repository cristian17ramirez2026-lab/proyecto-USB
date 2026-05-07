import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DB from '../services/db';

export default function Reportes() {
  const { filtrar } = useAuth();
  const [tab, setTab] = useState('disp');
  const activos = filtrar(DB.getActivos());
  const disp = activos.filter(a => a.estado === 'DISPONIBLE');
  const asig = activos.filter(a => a.estado === 'ASIGNADO');
  const dan = activos.filter(a => a.estado === 'DANADO');
  const valor = activos.reduce((s, a) => s + a.valor, 0);
  const fc = (v) => '$' + Number(v).toLocaleString('es-CO');
  const sn = (id) => DB.getSede(id)?.nombre || '-';

  const exportCSV = () => {
    let csv = 'Nombre,Tipo,Serial,Valor,Estado,Sede\n';
    activos.forEach(a => { csv += `"${a.nombre}","${a.tipo}","${a.serial}",${a.valor},"${a.estado}","${sn(a.sede_id)}"\n`; });
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'activos_reporte.csv';
    link.click();
  };

  const renderTable = (items, showEmp) => (
    <table className="table table-hover mb-0">
      <thead className="table-light">
        <tr><th>Nombre</th><th>Tipo</th><th>Serial</th><th>Valor</th>{showEmp ? <th>Empleado</th> : <th>Sede</th>}</tr>
      </thead>
      <tbody>
        {items.length === 0 ? <tr><td colSpan={5} className="text-center text-muted py-4">Sin datos</td></tr> :
          items.map(a => {
            let empName = '-';
            if (showEmp) {
              const x = DB.getAsignaciones().find(g => g.activo_id === a.id && !g.fecha_devolucion);
              const emp = x ? DB.getEmpleado(x.empleado_id) : null;
              empName = emp ? `${emp.nombre} ${emp.apellido}` : '-';
            }
            return (
              <tr key={a.id}>
                <td>{a.nombre}</td><td>{a.tipo}</td><td><code>{a.serial}</code></td><td><strong>{fc(a.valor)}</strong></td>
                <td>{showEmp ? empName : sn(a.sede_id)}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );

  const tabs = [
    { id: 'disp', label: `Disponibles (${disp.length})` },
    { id: 'asig', label: `Asignados (${asig.length})` },
    { id: 'dan', label: `Reparación (${dan.length})` },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Reportes</h5>
        <button className="btn btn-success btn-sm" onClick={exportCSV}>📥 Exportar CSV</button>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-3"><div className="bg-white rounded-3 p-3 shadow-sm border text-center"><div className="fw-bold fs-5" style={{ color: '#00AA00' }}>{fc(valor)}</div><small className="text-muted">Valor Total</small></div></div>
        <div className="col-md-3"><div className="bg-white rounded-3 p-3 shadow-sm border text-center"><div className="fw-bold fs-5" style={{ color: '#003087' }}>{activos.length}</div><small className="text-muted">Total Activos</small></div></div>
        <div className="col-md-3"><div className="bg-white rounded-3 p-3 shadow-sm border text-center"><div className="fw-bold fs-5" style={{ color: '#FF8800' }}>{asig.length}</div><small className="text-muted">Asignados</small></div></div>
        <div className="col-md-3"><div className="bg-white rounded-3 p-3 shadow-sm border text-center"><div className="fw-bold fs-5" style={{ color: '#FF0000' }}>{dan.length}</div><small className="text-muted">Reparación</small></div></div>
      </div>
      <div className="d-flex gap-2 mb-3">
        {tabs.map(t => (
          <button key={t.id} className={`btn btn-sm ${tab === t.id ? 'text-white' : 'btn-outline-secondary'}`} style={tab === t.id ? { background: '#FF0000' } : {}} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      <div className="card shadow-sm">
        <div className="table-responsive">
          {tab === 'disp' && renderTable(disp, false)}
          {tab === 'asig' && renderTable(asig, true)}
          {tab === 'dan' && renderTable(dan, false)}
        </div>
      </div>
    </div>
  );
}
