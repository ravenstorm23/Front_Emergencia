import React, { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, UserPlus, Shield } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
import { generateCode, getCode, getLinkedCaregivers } from "../../services/vinculacionService";

export default function VincularCuidador() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [caregivers, setCaregivers] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [codeData, caregiversData] = await Promise.all([
                getCode().catch(() => ({ codigo: null })),
                getLinkedCaregivers().catch(() => []),
            ]);
            setCode(codeData.codigo || "");
            setCaregivers(caregiversData);
        } catch (error) {
            console.error("Error loading data:", error);
            setToast({ type: "error", message: "Error al cargar datos" });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateCode = async () => {
        try {
            setGenerating(true);
            const data = await generateCode();
            setCode(data.codigo);
            setToast({ type: "success", message: "Código generado exitosamente" });
        } catch (error) {
            console.error("Error generating code:", error);
            setToast({ type: "error", message: "Error al generar código" });
        } finally {
            setGenerating(false);
        }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setToast({ type: "success", message: "Código copiado al portapapeles" });
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner size="lg" message="Cargando información..." />
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Vincular con Cuidador</h1>
                    <p className="text-gray-600">
                        Comparte tu código con tu cuidador para que pueda monitorear tu salud y bienestar
                    </p>
                </div>

                {/* Code Generation Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-2 border-blue-100">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Tu Código de Vinculación
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Este código es único y seguro. Compártelo solo con tu cuidador de confianza.
                            </p>
                        </div>
                    </div>

                    {code ? (
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Tu código:</p>
                                        <p className="text-4xl font-mono font-bold text-blue-600 tracking-wider">
                                            {code}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCopyCode}
                                        className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl hover:bg-blue-50 transition shadow-sm border border-blue-200"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-5 h-5 text-green-600" />
                                                <span className="font-medium text-green-600">Copiado</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5 text-blue-600" />
                                                <span className="font-medium text-blue-600">Copiar</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleGenerateCode}
                                disabled={generating}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition"
                            >
                                <RefreshCw className={`w-4 h-4 ${generating ? "animate-spin" : ""}`} />
                                {generating ? "Generando..." : "Generar nuevo código"}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">Aún no tienes un código de vinculación</p>
                            <button
                                onClick={handleGenerateCode}
                                disabled={generating}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-lg disabled:opacity-50"
                            >
                                {generating ? "Generando..." : "Generar Código"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Linked Caregivers */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Cuidadores Vinculados</h2>

                    {caregivers.length > 0 ? (
                        <div className="space-y-3">
                            {caregivers.map((caregiver) => (
                                <div
                                    key={caregiver._id}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {caregiver.nombre?.charAt(0) || "C"}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{caregiver.nombre}</h3>
                                        <p className="text-sm text-gray-600">{caregiver.email}</p>
                                    </div>
                                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Activo
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus className="w-10 h-10 text-gray-400" />
                            </div>
                            <p className="text-gray-600">No tienes cuidadores vinculados</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Comparte tu código con un cuidador para empezar
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}
