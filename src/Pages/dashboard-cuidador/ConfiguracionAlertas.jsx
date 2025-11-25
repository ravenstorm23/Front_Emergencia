import React, { useState, useEffect } from "react";
import {
    Bell,
    Pill,
    AlertTriangle,
    Calendar,
    FileText,
    Phone,
    Volume2,
    Mail,
    Smartphone,
    Clock,
    Settings,
    Save,
} from "lucide-react";
import SidebarCuidador from "./components/SidebarCuidador";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
import { getAlertConfig, updateAlertConfig } from "../../services/alertService";

const ALERT_TYPES = [
    {
        id: "medicamento",
        name: "Medicamentos",
        icon: Pill,
        color: "blue",
        description: "Recordatorios para tomar medicamentos",
    },
    {
        id: "emergencia",
        name: "Emergencias",
        icon: AlertTriangle,
        color: "red",
        description: "Alertas de situaciones críticas",
    },
    {
        id: "cita",
        name: "Citas Médicas",
        icon: Calendar,
        color: "green",
        description: "Recordatorios de citas programadas",
    },
    {
        id: "revision",
        name: "Revisiones",
        icon: FileText,
        color: "purple",
        description: "Chequeos y seguimientos médicos",
    },
    {
        id: "llamada",
        name: "Llamadas",
        icon: Phone,
        color: "yellow",
        description: "Recordatorios de llamadas programadas",
    },
];

const NOTIFICATION_CHANNELS = [
    { id: "app", name: "Notificación en App", icon: Smartphone },
    { id: "email", name: "Correo Electrónico", icon: Mail },
    { id: "sound", name: "Sonido", icon: Volume2 },
];

export default function ConfiguracionAlertas() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);
    const [config, setConfig] = useState({
        alertTypes: {},
        notificationChannels: {},
        advanceNotice: {
            medicamento: 30,
            cita: 60,
            llamada: 15,
            revision: 120,
        },
        quietHours: {
            enabled: false,
            start: "22:00",
            end: "07:00",
        },
        priority: {
            emergencia: "critica",
            medicamento: "alta",
            cita: "media",
            revision: "media",
            llamada: "baja",
        },
    });

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        try {
            setLoading(true);
            const data = await getAlertConfig();
            if (data) {
                setConfig((prev) => ({ ...prev, ...data }));
            }
        } catch (error) {
            console.error("Error loading config:", error);
            // Initialize with defaults if no config exists
            const defaultTypes = {};
            const defaultChannels = {};
            ALERT_TYPES.forEach((type) => {
                defaultTypes[type.id] = true;
            });
            NOTIFICATION_CHANNELS.forEach((channel) => {
                defaultChannels[channel.id] = true;
            });
            setConfig((prev) => ({
                ...prev,
                alertTypes: defaultTypes,
                notificationChannels: defaultChannels,
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await updateAlertConfig(config);
            setToast({ type: "success", message: "Configuración guardada exitosamente" });
        } catch (error) {
            console.error("Error saving config:", error);
            setToast({ type: "error", message: "Error al guardar configuración" });
        } finally {
            setSaving(false);
        }
    };

    const toggleAlertType = (typeId) => {
        setConfig((prev) => ({
            ...prev,
            alertTypes: {
                ...prev.alertTypes,
                [typeId]: !prev.alertTypes[typeId],
            },
        }));
    };

    const toggleChannel = (channelId) => {
        setConfig((prev) => ({
            ...prev,
            notificationChannels: {
                ...prev.notificationChannels,
                [channelId]: !prev.notificationChannels[channelId],
            },
        }));
    };

    const updateAdvanceNotice = (typeId, value) => {
        setConfig((prev) => ({
            ...prev,
            advanceNotice: {
                ...prev.advanceNotice,
                [typeId]: parseInt(value) || 0,
            },
        }));
    };

    const colorClasses = {
        blue: "bg-blue-100 text-blue-700 border-blue-300",
        red: "bg-red-100 text-red-700 border-red-300",
        green: "bg-green-100 text-green-700 border-green-300",
        purple: "bg-purple-100 text-purple-700 border-purple-300",
        yellow: "bg-yellow-100 text-yellow-700 border-yellow-300",
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-100">
                <SidebarCuidador />
                <div className="flex-1 flex items-center justify-center">
                    <LoadingSpinner size="lg" message="Cargando configuración..." />
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidebarCuidador />

            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="w-8 h-8 text-gray-700" />
                            <h1 className="text-3xl font-bold text-gray-900">Configuración de Alertas</h1>
                        </div>
                        <p className="text-gray-600">
                            Personaliza cómo y cuándo recibir notificaciones sobre tus pacientes
                        </p>
                    </div>

                    {/* Alert Types */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="w-6 h-6 text-gray-700" />
                            <h2 className="text-xl font-semibold text-gray-900">Tipos de Alertas</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {ALERT_TYPES.map((type) => {
                                const Icon = type.icon;
                                const isEnabled = config.alertTypes[type.id];

                                return (
                                    <div
                                        key={type.id}
                                        className={`border-2 rounded-xl p-5 transition cursor-pointer ${isEnabled
                                                ? `${colorClasses[type.color]} border-opacity-100`
                                                : "bg-gray-50 text-gray-400 border-gray-200"
                                            }`}
                                        onClick={() => toggleAlertType(type.id)}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <Icon className="w-7 h-7" />
                                            <div className={`w-12 h-6 rounded-full transition ${isEnabled ? `bg-${type.color}-500` : "bg-gray-300"
                                                } relative`}>
                                                <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${isEnabled ? "right-0.5" : "left-0.5"
                                                    }`} />
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-1">{type.name}</h3>
                                        <p className="text-sm opacity-80">{type.description}</p>

                                        {isEnabled && type.id !== "emergencia" && (
                                            <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                                                <label className="text-xs font-medium mb-2 block">
                                                    Aviso anticipado (minutos)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={config.advanceNotice[type.id] || 0}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        updateAdvanceNotice(type.id, e.target.value);
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-full px-3 py-2 border-2 border-current border-opacity-30 rounded-lg bg-white text-gray-900"
                                                    min="0"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Notification Channels */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Smartphone className="w-6 h-6 text-gray-700" />
                            <h2 className="text-xl font-semibold text-gray-900">Canales de Notificación</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {NOTIFICATION_CHANNELS.map((channel) => {
                                const Icon = channel.icon;
                                const isEnabled = config.notificationChannels[channel.id];

                                return (
                                    <div
                                        key={channel.id}
                                        className={`border-2 rounded-xl p-5 transition cursor-pointer ${isEnabled
                                                ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300"
                                                : "bg-gray-50 border-gray-200"
                                            }`}
                                        onClick={() => toggleChannel(channel.id)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Icon className={`w-6 h-6 ${isEnabled ? "text-blue-600" : "text-gray-400"}`} />
                                            <div className={`w-11 h-6 rounded-full transition ${isEnabled ? "bg-blue-500" : "bg-gray-300"
                                                } relative`}>
                                                <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${isEnabled ? "right-0.5" : "left-0.5"
                                                    }`} />
                                            </div>
                                        </div>
                                        <h3 className={`font-semibold ${isEnabled ? "text-gray-900" : "text-gray-500"}`}>
                                            {channel.name}
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quiet Hours */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Clock className="w-6 h-6 text-gray-700" />
                                <h2 className="text-xl font-semibold text-gray-900">Horario de Silencio</h2>
                            </div>
                            <button
                                onClick={() => setConfig((prev) => ({
                                    ...prev,
                                    quietHours: { ...prev.quietHours, enabled: !prev.quietHours.enabled },
                                }))}
                                className={`px-6 py-2 rounded-lg font-medium transition ${config.quietHours.enabled
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {config.quietHours.enabled ? "Activado" : "Desactivado"}
                            </button>
                        </div>

                        {config.quietHours.enabled && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Inicio
                                    </label>
                                    <input
                                        type="time"
                                        value={config.quietHours.start}
                                        onChange={(e) => setConfig((prev) => ({
                                            ...prev,
                                            quietHours: { ...prev.quietHours, start: e.target.value },
                                        }))}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fin
                                    </label>
                                    <input
                                        type="time"
                                        value={config.quietHours.end}
                                        onChange={(e) => setConfig((prev) => ({
                                            ...prev,
                                            quietHours: { ...prev.quietHours, end: e.target.value },
                                        }))}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                    />
                                </div>
                            </div>
                        )}

                        <p className="text-sm text-gray-600 mt-4">
                            {config.quietHours.enabled
                                ? `No recibirás notificaciones entre ${config.quietHours.start} y ${config.quietHours.end} (excepto emergencias)`
                                : "Las notificaciones estarán activas 24/7"}
                        </p>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold shadow-lg flex items-center gap-3"
                        >
                            <Save className="w-5 h-5" />
                            {saving ? "Guardando..." : "Guardar Configuración"}
                        </button>
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
