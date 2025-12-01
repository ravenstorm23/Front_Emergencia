import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import { crearActividad, actualizarActividad } from "../../../services/actividadesService";
import ModalActividad from "./ModalActividad";

const CalendarioVistaSemanal = ({ actividades = [], onActividadChange }) => {
    const [fechaInicioSemana, setFechaInicioSemana] = useState(new Date());
    const [modalAbierto, setModalAbierto] = useState(false);
    const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

    const cambiarSemana = (incremento) => {
        const nuevaFecha = new Date(fechaInicioSemana);
        nuevaFecha.setDate(fechaInicioSemana.getDate() + incremento * 7);
        setFechaInicioSemana(nuevaFecha);
    };

    const getDiasSemana = () => {
        const dias = [];
        const inicio = new Date(fechaInicioSemana);
        const diaSemana = inicio.getDay();
        const diff = inicio.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
        const lunes = new Date(inicio.setDate(diff));

        for (let i = 0; i < 7; i++) {
            const dia = new Date(lunes);
            dia.setDate(lunes.getDate() + i);
            dias.push(dia);
        }
        return dias;
    };

    const diasSemana = getDiasSemana();
    const horas = Array.from({ length: 24 }, (_, i) => i);

    const getActividadesPorDiaYHora = (dia, hora) => {
        return actividades.filter(act => {
            const fechaAct = new Date(act.fechaHora);
            return (
                fechaAct.getDate() === dia.getDate() &&
                fechaAct.getMonth() === dia.getMonth() &&
                fechaAct.getFullYear() === dia.getFullYear() &&
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
            visita: "bg-blue-50 border-l-4 border-blue-500 text-blue-700 hover:bg-blue-100",
            medicamento: "bg-green-50 border-l-4 border-green-500 text-green-700 hover:bg-green-100",
            cita: "bg-purple-50 border-l-4 border-purple-500 text-purple-700 hover:bg-purple-100",
            emergencia: "bg-red-50 border-l-4 border-red-500 text-red-700 hover:bg-red-100",
            tarea: "bg-orange-50 border-l-4 border-orange-500 text-orange-700 hover:bg-orange-100",
        };
        return colores[tipo] || "bg-gray-50 border-l-4 border-gray-400 text-gray-700 hover:bg-gray-100";
    };

    const esHoy = (dia) => {
        const hoy = new Date();
        return (
            dia.getDate() === hoy.getDate() &&
            dia.getMonth() === hoy.getMonth() &&
            dia.getFullYear() === hoy.getFullYear()
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Semana del {diasSemana[0].toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                            {' al '}
                            {diasSemana[6].toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => cambiarSemana(-1)}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setFechaInicioSemana(new Date())}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Hoy
                        </button>
                        <button
                            onClick={() => cambiarSemana(1)}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => { setActividadSeleccionada(null); setModalAbierto(true); }}
                            className="ml-4 bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 shadow-lg"
                        >
                            <Plus size={18} /> Nueva
                        </button>
                    </div>
                </div>
            </div>

            {/* Timeline Grid */}
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    {/* Encabezado de días */}
                    <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
                        <div className="p-3 text-sm font-semibold text-gray-600">Hora</div>
                        {diasSemana.map((dia, i) => (
                            <div
                                key={i}
                                className={`p-3 text-center border-l border-gray-200 ${esHoy(dia) ? 'bg-blue-50 font-bold' : ''
                                    }`}
                            >
                                <div className={`text-xs uppercase tracking-wide ${esHoy(dia) ? 'text-blue-700' : 'text-gray-500'}`}>
                                    {dia.toLocaleDateString('es-ES', { weekday: 'short' })}
                                </div>
                                <div className={`text-lg font-bold ${esHoy(dia) ? 'text-blue-700' : 'text-gray-900'}`}>
                                    {dia.getDate()}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Grid de horas */}
                    <div className="grid grid-cols-8">
                        {horas.map(hora => (
                            <React.Fragment key={hora}>
                                <div className="p-3 text-right text-xs text-gray-500 font-medium bg-gray-50 border-b border-r border-gray-200">
                                    {hora.toString().padStart(2, '0')}:00
                                </div>
                                {diasSemana.map((dia, i) => {
                                    const acts = getActividadesPorDiaYHora(dia, hora);
                                    const horaActual = new Date().getHours();
                                    const esHorActual = esHoy(dia) && hora === horaActual;

                                    return (
                                        <div
                                            key={i}
                                            className={`border-b border-l border-gray-200 min-h-[60px] p-1 transition-colors hover:bg-gray-50 ${esHorActual ? 'bg-blue-50/30 ring-2 ring-blue-500 ring-inset' : ''
                                                }`}
                                        >
                                            {acts.map(act => (
                                                <div
                                                    key={act._id}
                                                    onClick={() => { setActividadSeleccionada(act); setModalAbierto(true); }}
                                                    className={`${getTipoColor(act.tipo)} p-2 mb-1 rounded-md text-xs cursor-pointer transition-all duration-200 shadow-sm`}
                                                >
                                                    <div className="font-medium truncate flex items-center gap-1">
                                                        <Clock className="w-3 h-3 flex-shrink-0" />
                                                        {act.titulo}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
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

export default CalendarioVistaSemanal;
