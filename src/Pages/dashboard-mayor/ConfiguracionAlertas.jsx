import React, { useState, useEffect } from "react";
import {
    Bell,
    Pill,
    Calendar,
    Phone,
    Volume2,
    VolumeX,
    Save,
    Check,
} from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
import { getAlertConfig, updateAlertConfig } from "../../services/alertService";

const ALERT_OPTIONS = [
    {
        id: "medicamento",
        name: "Medicamentos",
        icon: Pill,
        description: "Recordatorios para tomar tus medicinas",
        color: "blue",
    },
    {
        id: "cita",
        name: "Citas Médicas",
        icon: Calendar,
        description: "Avisos de visitas al doctor",
        color: "green",
    },
    {
        id: "llamada",
        name: "Llamadas",
        icon: Phone,
        description: "Recordatorios de llamadas",
        color: "purple",
    },
];

export default function ConfiguracionAlertas() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);
    const [config, setConfig] = useState({
        alertTypes: {},
        soundEnabled: true,
    });

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        try {
            setLoading(true);
            const data = await getAlertConfig();
            if (data) {
                setConfig({
                    alertTypes: data.alertTypes || {},
                    soundEnabled: data.notificationChannels?.sound !== false,
                });
            } else {
                const defaultTypes = {};
                ALERT_OPTIONS.forEach((opt) => {
                    defaultTypes[opt.id] = true;
                });
                setConfig({
                    alertTypes: defaultTypes,
                    soundEnabled: true,
                });
            }
        } catch (error) {
            console.error("Error loading config:", error);
            const defaultTypes = {};
            ALERT_OPTIONS.forEach((opt) => {
                defaultTypes[opt.id] = true;
            });
            setConfig({
                alertTypes: defaultTypes,
                soundEnabled: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await updateAlertConfig({
                alertTypes: config.alertTypes,
                notificationChannels: {
                    app: true,
                    sound: config.soundEnabled,
                    email: false,
                },
            });
            setToast({ type: "success", message: "✓ Configuración guardada" });
        } catch (error) {
            console.error("Error saving config:", error);
            setToast({ type: "error", message: "No se pudo guardar" });
        } finally {
            setSaving(false);
        }
    };

    const toggleAlert = (id) => {
        setConfig((prev) => ({
            ...prev,
            alertTypes: {
                ...prev.alertTypes,
                [id]: !prev.alertTypes[id],
            },
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner size="lg" message="Cargando..." />
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-500 p-4 rounded-2xl">
                            <Bell className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Mis Alertas</h1>
                            <p className="text-xl text-gray-600 mt-1">
                                Elige qué recordatorios quieres recibir
                            </p>
                        </div>
                    </div>
                </div>

                {/* Alert Types - Large Cards */}
                <div className="space-y-6 mb-10">
                    {ALERT_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const isEnabled = config.alertTypes[option.id];

                        return (
                            <button
                                key={option.id}
                                onClick={() => toggleAlert(option.id)}
                                className={`w-full p-8 rounded-3xl border-4 transition-all transform hover:scale-[1.02] ${isEnabled
                                        ? `bg-gradient-to-r from-${option.color}-50 to-${option.color}-100 border-${option.color}-400 shadow-lg`
                                        : "bg-white border-gray-200 shadow-sm"
                                    }`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`p-5 rounded-2xl ${isEnabled ? `bg-${option.color}-500` : "bg-gray-300"
                                        }`}>
                                        <Icon className="w-12 h-12 text-white" />
                                    </div>

                                    <div className="flex-1 text-left">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {option.name}
                                        </h3>
                                        <p className="text-lg text-gray-600">
                                            {option.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {isEnabled && (
                                            <div className="bg-green-500 p-3 rounded-full">
                                                <Check className="w-8 h-8 text-white" />
                                            </div>
                                        )}
                                        <div className={`w-20 h-10 rounded-full transition-all ${isEnabled ? `bg-${option.color}-500` : "bg-gray-300"
                                            } relative`}>
                                            <div className={`absolute w-8 h-8 bg-white rounded-full top-1 transition-all shadow-md ${isEnabled ? "right-1" : "left-1"
                                                }`} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Sound Toggle */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-gray-200 mb-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className={`p-5 rounded-2xl ${config.soundEnabled ? "bg-yellow-500" : "bg-gray-300"
                                }`}>
                                {config.soundEnabled ? (
                                    <Volume2 className="w-12 h-12 text-white" />
                                ) : (
                                    <VolumeX className="w-12 h-12 text-white" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Sonido de Alertas
                                </h3>
                                <p className="text-lg text-gray-600">
                                    {config.soundEnabled
                                        ? "Las alertas sonarán en tu dispositivo"
                                        : "Las alertas serán silenciosas"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setConfig((prev) => ({
                                ...prev,
                                soundEnabled: !prev.soundEnabled,
                            }))}
                            className={`w-20 h-10 rounded-full transition-all ${config.soundEnabled ? "bg-yellow-500" : "bg-gray-300"
                                } relative`}
                        >
                            <div className={`absolute w-8 h-8 bg-white rounded-full top-1 transition-all shadow-md ${config.soundEnabled ? "right-1" : "left-1"
                                }`} />
                        </button>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-6 rounded-3xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 transition-all shadow-2xl flex items-center justify-center gap-4 text-2xl font-bold"
                >
                    <Save className="w-10 h-10" />
                    {saving ? "Guardando..." : "Guardar Configuración"}
                </button>

                {/* Info */}
                <div className="mt-8 bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                    <p className="text-lg text-blue-900 text-center">
                        💡 Tus recordatorios te ayudarán a mantenerte saludable
                    </p>
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
