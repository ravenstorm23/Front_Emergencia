import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarCuidador from "./components/SidebarCuidador";
import { User, Phone, FileText, Heart, Activity, ArrowLeft } from "lucide-react";
import { getPacientes } from "../../services/pacienteService";

// Componente para secciones de información
const InfoSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPaciente = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("usuario"));
                if (user?._id) {
                    // En una app real, tendríamos un endpoint getPacienteById
                    // Por ahora, filtramos de la lista de vinculados
                    const pacientes = await getPacientes(user._id);
                    const found = pacientes.find(p => p._id === id);
                    setPaciente(found);
                }
            } catch (error) {
                console.error("Error loading patient:", error);
            } finally {
                setLoading(false);
            }
        };
        loadPaciente();
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
                        {/* Datos simulados por ahora, ya que no vienen en el modelo básico de usuario */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <p className="font-semibold text-gray-800">Hijo/a Principal</p>
                                    <p className="text-sm text-gray-600">+57 300 123 4567</p>
                                </div>
                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
                                    <Phone size={20} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <p className="font-semibold text-gray-800">Servicio Médico</p>
                                    <p className="text-sm text-gray-600">123</p>
                                </div>
                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
                                    <Phone size={20} />
                                </button>
                            </div>
                        </div>
                    </InfoSection>

                    {/* Historial Médico Básico */}
                    <InfoSection title="Historial Médico" icon={Activity}>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Alergias</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">Penicilina</span>
                                    <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">Polen</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Condiciones</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Hipertensión</span>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Diabetes Tipo 2</span>
                                </div>
                            </div>
                        </div>
                    </InfoSection>

                    {/* Documentos y Archivos */}
                    <InfoSection title="Documentos" icon={FileText}>
                        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3">
                                <FileText size={24} />
                            </div>
                            <p className="text-gray-500 mb-2">No hay documentos subidos</p>
                            <button className="text-blue-600 font-medium hover:underline text-sm">
                                + Subir documento
                            </button>
                        </div>
                    </InfoSection>
                </div>
            </main>
        </div>
    );
};

export default PerfilPaciente;
