import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { crearActividad, actualizarActividad } from "../../../services/actividadesService";
import ModalActividad from "./ModalActividad";

const CalendarioVistaDiaria = ({ actividades = [], onActividadChange }) => {
    const [fechaActual, setFechaActual] = useState(new Date());
    const [modalAbierto, setModalAbierto] = useState(false);
    const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

    const cambiarDia = (incremento) => {
        const nuevaFecha = new Date(fechaActual);
        nuevaFecha.setDate(fechaActual.getDate() + incremento);
        setFechaActual(nuevaFecha);
    };

    const horas = Array.from({ length: 24 }, (_, i) => i);

    const getActividadesPorHora = (hora) => {
        return actividades.filter(act => {
            const fechaAct = new Date(act.fechaHora);
            return (
                fechaAct.getDate() === fechaActual.getDate() &&
                fechaAct.getMonth() === fechaActual.getMonth() &&
                fechaAct.getFullYear() === fechaActual.getFullYear() &&
                fechaAct.getHours() === hora
            );
        });
    };

    const handleGuardar = async (data) => {
        try {
            if (actividadSeleccionada) {
                await actualizarActividad(actividadSeleccionada._id, data);
            } else {
                await crearActividad(data);
            }
            setModalAbierto(false);
            setActividadSeleccionada(null);
            if (onActividadChange) onActividadChange();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getTipoColor = (tipo) => {
        const colores = {
            visita: "bg-blue-50 border-l-4 border-blue-500 text-blue-800",
            medicamento: "bg-green-50 border-l-4 border-green-500 text-green-800",
            cita: "bg-purple-50 border-l-4 border-purple-500 text-purple-800",
            emergencia: "bg-red-50 border-l-4 border-red-500 text-red-800",
            tarea: "bg-orange-50 border-l-4 border-orange-500 text-orange-800",
        };
        return colores[tipo] || "bg-gray-50 border-l-4 border-gray-400 text-gray-800";
    };

    const esHoy = () => {
        const hoy = new Date();
        return (
            fechaActual.getDate() === hoy.getDate() &&
            fechaActual.getMonth() === hoy.getMonth() &&
            fechaActual.getFullYear() === hoy.getFullYear()
        );
    };

    const horaActual = new Date().getHours();
    const totalActividades = actividades.filter(act => {
        const fechaAct = new Date(act.fechaHora);
        return (
            fechaAct.getDate() === fechaActual.getDate() &&
            fechaAct.getMonth() === fechaActual.getMonth() &&
            fechaAct.getFullYear() === fechaActual.getFullYear()
        );
    }).length;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-purple-100 uppercase tracking-wide mb-1">
                            {esHoy() ? 'Hoy' : fechaActual.toLocaleDateString('es-ES', { weekday: 'long' })}
                        </div>
                        <h2 className="text-3xl font-bold">
                            {fechaActual.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </h2>
                        <p className="text-sm text-purple-100 mt-2">
                            {totalActividades} {totalActividades === 1 ? 'actividad programada' : 'actividades programadas'}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => cambiarDia(-1)}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setFechaActual(new Date())}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Hoy
                        </button>
                        <button
                            onClick={() => cambiarDia(1)}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => { setActividadSeleccionada(null); setModalAbierto(true); }}
                            className="ml-4 bg-white text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 shadow-lg"
                        >
                            <Plus size={18} /> Nueva
                        </button>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="max-h-[600px] overflow-y-auto">
                {horas.map(hora => {
                    const acts = getActividadesPorHora(hora);
                    const esHoraActual = esHoy() && hora === horaActual;
                    const esPasado = esHoy() && hora < horaActual;

                    return (
                        <div
                            key={hora}
                            className={`flex border-b border-gray-200 transition-colors ${esHoraActual ? 'bg-blue-50 ring-2 ring-inset ring-blue-500' : esPasado ? 'bg-gray-50/50' : 'hover:bg-gray-50'
                                }`}
                        >
                            {/* Hora */}
                            <div className={`w-24 flex-shrink-0 p-4 text-right border-r border-gray-200 ${esPasado ? 'bg-gray-100' : 'bg-gray-50'
                                }`}>
                                <div className={`text-lg font-bold ${esHoraActual ? 'text-blue-700' : 'text-gray-900'}`}>
                                    {hora.toString().padStart(2, '0')}:00
                                </div>
                                {esHoraActual && (
                                    <div className="text-xs text-blue-600 font-medium mt-1flex items-center gap-1 justify-end">
                                        <Clock className="w-3 h-3" /> Ahora
                                    </div>
                                )}
                            </div>

                            {/* Actividades */}
                            <div className="flex-1 p-3 min-h-[80px]">
                                {acts.length > 0 ? (
                                    <div className="space-y-2">
                                        {acts.map(act => (
                                            <div
                                                key={act._id}
                                                onClick={() => { setActividadSeleccionada(act); setModalAbierto(true); }}
                                                className={`${getTipoColor(act.tipo)} p-4 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02]`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-sm mb-1">{act.titulo}</h4>
                                                        {act.descripcion && (
                                                            <p className="text-xs opacity-80 line-clamp-2">{act.descripcion}</p>
                                                        )}
                                                        <div className="flex items-center gap-3 mt-2 text-xs opacity-75">
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {new Date(act.fechaHora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                            {act.prioridad && (
                                                                <span className={`px-2 py-0.5 rounded-full font-medium ${act.prioridad === 'alta' ? 'bg-red-200 text-red-800' :
                                                                    act.prioridad === 'media' ? 'bg-yellow-200 text-yellow-800' :
                                                                        'bg-green-200 text-green-800'
                                                                    }`}>
                                                                    {act.prioridad}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                        Sin actividades
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {modalAbierto && (
                <ModalActividad
                    actividad={actividadSeleccionada}
                    onClose={() => { setModalAbierto(false); setActividadSeleccionada(null); }}
                    onSave={handleGuardar}
                />
            )}
        </div>
    );
};

export default CalendarioVistaDiaria;
