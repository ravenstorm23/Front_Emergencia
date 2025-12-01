import React, { useState, useEffect } from "react";
import SidebarCuidador from "./components/SidebarCuidador";
import { generarReporte } from "../../services/reportesService";
import { getPacientes } from "../../services/pacienteService";
import { FileText, Download, Filter, BarChart2 } from "lucide-react";

const ReportesCuidador = () => {
    const [pacientes, setPacientes] = useState([]);
    const [pacienteId, setPacienteId] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [reporteData, setReporteData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPacientes = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("usuario"));
                if (user?._id) {
                    const data = await getPacientes(user._id);
                    setPacientes(data);
                    if (data.length > 0) setPacienteId(data[0]._id);
                }
            } catch (err) {
                console.error("Error cargando pacientes:", err);
            }
        };
        loadPacientes();
    }, []);

    const handleGenerarReporte = async () => {
        if (!pacienteId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await generarReporte(pacienteId, { fechaInicio, fechaFin });
            setReporteData(data);
        } catch (err) {
            setError("No se pudo generar el reporte. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarCuidador />
            <main className="flex-1 overflow-y-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FileText className="text-blue-600" /> Reportes de Actividad
                </h1>

                {/* Filtros */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                            <select
                                value={pacienteId}
                                onChange={(e) => setPacienteId(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                {pacientes.map((p) => (
                                    <option key={p._id} value={p._id}>{p.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            onClick={handleGenerarReporte}
                            disabled={loading || !pacienteId}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-blue-300"
                        >
                            {loading ? "Generando..." : <><Filter size={18} /> Generar Reporte</>}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                {/* Resultados del Reporte */}
                {reporteData ? (
                    <div className="space-y-6">
                        {/* Resumen Estadístico */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                                <p className="text-gray-500 text-sm">Total Actividades</p>
                                <p className="text-2xl font-bold">{reporteData.totalActividades}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                                <p className="text-gray-500 text-sm">Completadas</p>
                                <p className="text-2xl font-bold">{reporteData.completadas}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
                                <p className="text-gray-500 text-sm">Pendientes</p>
                                <p className="text-2xl font-bold">{reporteData.pendientes}</p>
                            </div>
                        </div>

                        {/* Detalle de Actividades */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b flex justify-between items-center">
                                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <BarChart2 size={20} className="text-gray-500" /> Detalle de Actividades
                                </h2>
                                <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
                                    <Download size={16} /> Exportar PDF
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-600 uppercase">
                                        <tr>
                                            <th className="px-6 py-3">Fecha</th>
                                            <th className="px-6 py-3">Actividad</th>
                                            <th className="px-6 py-3">Tipo</th>
                                            <th className="px-6 py-3">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {reporteData.actividades.length > 0 ? (
                                            reporteData.actividades.map((act) => (
                                                <tr key={act._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-3">{new Date(act.fechaHora).toLocaleDateString()}</td>
                                                    <td className="px-6 py-3 font-medium text-gray-900">{act.titulo}</td>
                                                    <td className="px-6 py-3 capitalize">{act.tipo}</td>
                                                    <td className="px-6 py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${act.estado === 'completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {act.estado}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                                    No se encontraron actividades en este rango de fechas.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm text-gray-500">
                        <BarChart2 size={48} className="mb-4 opacity-20" />
                        <p>Seleccione un paciente y un rango de fechas para generar el reporte.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ReportesCuidador;
