import React, { useState, useEffect } from "react";
import { UserPlus, Users, CheckCircle } from "lucide-react";
import SidebarCuidador from "./components/SidebarCuidador";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
import { linkPatientWithCode } from "../../services/vinculacionService";
import { getPacientes } from "../../services/pacienteService";

export default function VincularPaciente() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [toast, setToast] = useState(null);
    const [linking, setLinking] = useState(false);
    const [relationship, setRelationship] = useState("");

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user?._id) {
                const data = await getPacientes(user._id);
                setPatients(data);
            }
        } catch (error) {
            console.error("Error loading patients:", error);
        }
    };

    const handleLinkPatient = async (e) => {
        e.preventDefault();

        if (!code.trim()) {
            setToast({ type: "warning", message: "Por favor ingresa un código" });
            return;
        }

        if (!relationship) {
            setToast({ type: "warning", message: "Por favor selecciona el tipo de relación" });
            return;
        }

        try {
            setLinking(true);
            await linkPatientWithCode(code, relationship);
            setToast({ type: "success", message: "✅ Paciente vinculado exitosamente" });
            setCode("");
            setRelationship("");
            loadPatients();
        } catch (error) {
            console.error("Error linking patient:", error);

            if (error.response) {
                const status = error.response.status;
                const msg = error.response.data?.msg || error.response.data?.message;

                if (status === 403) {
                    // ⛔ Error de Rol: Intentando vincular desde cuenta de Adulto Mayor
                    setToast({
                        type: "error",
                        message: `⛔ ACCESO DENEGADO: ${msg || 'Solo los cuidadores pueden vincular pacientes'}`
                    });
                } else if (status === 400) {
                    // ⚠️ Error de Validación: Auto-vinculación o código vacío
                    setToast({
                        type: "warning",
                        message: `⚠️ ATENCIÓN: ${msg || 'Verifica los datos ingresados'}`
                    });
                } else if (status === 404) {
                    // ❌ Error de Código: El código no existe
                    setToast({
                        type: "error",
                        message: `❌ CÓDIGO INVÁLIDO: ${msg || 'El código no existe o es incorrecto'}`
                    });
                } else {
                    setToast({
                        type: "error",
                        message: msg || "Error al vincular paciente"
                    });
                }
            } else if (error.request) {
                setToast({
                    type: "error",
                    message: "⚠️ Error de conexión. Verifica que el servidor esté corriendo."
                });
            } else {
                setToast({
                    type: "error",
                    message: error.message || "Error inesperado al vincular"
                });
            }
        } finally {
            setLinking(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidebarCuidador />

            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vincular Paciente</h1>
                        <p className="text-gray-600">
                            Ingresa el código del adulto mayor para comenzar a monitorear su salud
                        </p>
                    </div>

                    {/* Link Code Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <UserPlus className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    Vincular Nuevo Paciente
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    El adulto mayor debe compartir contigo su código de vinculación único
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleLinkPatient} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Código de Vinculación
                                </label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                    placeholder="Ej: AM-XY7K9Q"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-lg font-mono tracking-wider"
                                    disabled={linking}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Formato: AM-XXXXXX (10 caracteres)
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo de Relación
                                </label>
                                <select
                                    value={relationship}
                                    onChange={(e) => setRelationship(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-lg"
                                    disabled={linking}
                                >
                                    <option value="">Selecciona una relación</option>
                                    <option value="Familiar">Familiar</option>
                                    <option value="Enfermero">Enfermero</option>
                                    <option value="Amigo">Amigo</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={linking || !code.trim() || !relationship}
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium shadow-lg flex items-center justify-center gap-2"
                            >
                                {linking ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Vinculando...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5" />
                                        Vincular Paciente
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Linked Patients */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-6 h-6 text-gray-700" />
                            <h2 className="text-xl font-semibold text-gray-900">
                                Pacientes Vinculados ({patients.length})
                            </h2>
                        </div>

                        {patients.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {patients.map((patient) => (
                                    <div
                                        key={patient._id}
                                        className="border-2 border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                                {patient.nombre?.charAt(0) || "P"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                                                    {patient.nombre}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2 truncate">
                                                    {patient.email}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    <span className="text-xs text-green-600 font-medium">
                                                        Vinculado
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-10 h-10 text-gray-400" />
                                </div>
                                <p className="text-gray-600">No tienes pacientes vinculados</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Ingresa un código de vinculación para agregar tu primer paciente
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
