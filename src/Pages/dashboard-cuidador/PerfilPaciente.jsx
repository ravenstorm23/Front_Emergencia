import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarCuidador from "./components/SidebarCuidador";
import { User, Phone, FileText, Heart, Activity, ArrowLeft, Bell, Calendar } from "lucide-react";
import { getPacientes } from "../../services/pacienteService";
import { getAlerts } from "../../services/alertService";
import { obtenerActividades } from "../../services/actividadesService";

// Componente para secciones de información
const InfoSection = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`bg-white p-6 rounded-lg shadow-sm mb-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4 border-b pb-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Icon size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        {children}
    </div>
);

const PerfilPaciente = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState(null);
    const [alertas, setAlertas] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user?._id) {
                    // 1. Cargar datos del paciente
                    const pacientes = await getPacientes(user._id);
                    const found = pacientes.find(p => p._id === id);
                    setPaciente(found);

                    if (found) {
                        // 2. Cargar alertas del paciente
                        const alertsData = await getAlerts(found._id);
                        setAlertas(alertsData);

                        // 3. Cargar actividades (filtrando por pacienteId si es necesario)
                        // Nota: Si el endpoint devuelve todas, filtramos aquí. Idealmente el endpoint soportaría ?pacienteId=...
                        const actividadesData = await obtenerActividades();
                        const filteredActividades = actividadesData.filter(a => a.pacienteId === found._id);
                        setActividades(filteredActividades);
                    }
                }
            } catch (error) {
                console.error("Error loading patient data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    if (loading) return <div className="flex h-screen items-center justify-center">Cargando...</div>;
    if (!paciente) return <div className="flex h-screen items-center justify-center">Paciente no encontrado</div>;

    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarCuidador />
            <main className="flex-1 overflow-y-auto p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} /> Volver
                </button>

                {/* Encabezado del Perfil */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8 shadow-lg">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl border-4 border-white/30">
                            {paciente.nombre?.charAt(0) || "P"}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{paciente.nombre}</h1>
                            <p className="text-blue-100 flex items-center gap-2">
                                <User size={16} /> Paciente Vinculado
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Información Personal */}
                    <InfoSection title="Información Personal" icon={User}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">Correo Electrónico</label>
                                    <p className="font-medium">{paciente.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Teléfono</label>
                                    <p className="font-medium">{paciente.telefono || "No registrado"}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Dirección</label>
                                    <p className="font-medium">{paciente.direccion || "No registrada"}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Edad</label>
                                    <p className="font-medium">{paciente.edad || "No registrada"} años</p>
                                </div>
                            </div>
                        </div>
                    </InfoSection>

                    {/* Contactos de Emergencia */}
                    <InfoSection title="Contactos de Emergencia" icon={Phone}>
                        <div className="space-y-4">
                            {paciente.nombreFamiliar ? (
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div>
                                        <p className="font-semibold text-gray-800">{paciente.nombreFamiliar} (Familiar)</p>
                                        <p className="text-sm text-gray-600">{paciente.telefonoFamiliar}</p>
                                    </div>
                                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
                                        <Phone size={20} />
                                    </button>
                                </div>
                            ) : (
                                <p className="text-gray-500">No hay contacto familiar registrado.</p>
                            )}
                        </div>
                    </InfoSection>

                    {/* Historial Médico */}
                    <InfoSection title="Historial Médico" icon={Activity}>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Medicamentos</h3>
                                <div className="flex flex-wrap gap-2">
                                    {paciente.medicamentos ? (
                                        paciente.medicamentos.split(',').map((med, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                                {med.trim()}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 text-sm">No registrados</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Enfermedades / Condiciones</h3>
                                <div className="flex flex-wrap gap-2">
                                    {paciente.enfermedades ? (
                                        paciente.enfermedades.split(',').map((enf, i) => (
                                            <span key={i} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">
                                                {enf.trim()}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 text-sm">No registradas</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </InfoSection>

                    {/* Alertas Recientes */}
                    <InfoSection title="Alertas Recientes" icon={Bell}>
                        {alertas.length > 0 ? (
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {alertas.slice(0, 5).map((alerta) => (
                                    <div key={alerta._id} className="p-3 bg-red-50 border border-red-100 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-red-800">{alerta.mensaje || "Alerta de emergencia"}</p>
                                            <p className="text-xs text-red-600">{new Date(alerta.fecha).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No hay alertas recientes.</p>
                        )}
                    </InfoSection>

                    {/* Próximas Actividades */}
                    <InfoSection title="Próximas Actividades" icon={Calendar}>
                        {actividades.length > 0 ? (
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {actividades.slice(0, 5).map((act) => (
                                    <div key={act._id} className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                        <p className="font-medium text-blue-800">{act.titulo}</p>
                                        <p className="text-sm text-blue-600">{act.descripcion}</p>
                                        <p className="text-xs text-blue-500 mt-1">{new Date(act.fechaHora).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No hay actividades programadas.</p>
                        )}
                    </InfoSection>
                </div>
            </main>
        </div>
    );
};

export default PerfilPaciente;
