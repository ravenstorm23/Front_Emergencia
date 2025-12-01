import React from "react";
import { Filter } from "lucide-react";

const FiltrosCalendario = ({ filtroTipo, setFiltroTipo, filtroPrioridad, setFiltroPrioridad }) => {
    const tipos = [
        { value: "todos", label: "Todos", color: "bg-gray-100 text-gray-700" },
        { value: "visita", label: "Visitas", color: "bg-blue-100 text-blue-700" },
        { value: "medicamento", label: "Medicamentos", color: "bg-green-100 text-green-700" },
        { value: "cita", label: "Citas", color: "bg-purple-100 text-purple-700" },
        { value: "emergencia", label: "Emergencias", color: "bg-red-100 text-red-700" },
        { value: "tarea", label: "Tareas", color: "bg-orange-100 text-orange-700" },
    ];

    const prioridades = [
        { value: "todas", label: "Todas" },
        { value: "alta", label: "Alta" },
        { value: "media", label: "Media" },
        { value: "baja", label: "Baja" },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 text-gray-700">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-semibold">Filtros:</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Filtro por Tipo */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">
                        Tipo de Actividad
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {tipos.map((tipo) => (
                            <button
                                key={tipo.value}
                                onClick={() => setFiltroTipo(tipo.value)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${filtroTipo === tipo.value
                                        ? `${tipo.color} ring-2 ring-offset-2 ${tipo.value === 'todos' ? 'ring-gray-400' : tipo.value === 'visita' ? 'ring-blue-500' : tipo.value === 'medicamento' ? 'ring-green-500' : tipo.value === 'cita' ? 'ring-purple-500' : tipo.value === 'emergencia' ? 'ring-red-500' : 'ring-orange-500'} shadow-sm`
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {tipo.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filtro por Prioridad */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">
                        Prioridad
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {prioridades.map((prioridad) => (
                            <button
                                key={prioridad.value}
                                onClick={() => setFiltroPrioridad(prioridad.value)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${filtroPrioridad === prioridad.value
                                        ? prioridad.value === 'alta' ? 'bg-red-100 text-red-700 ring-2 ring-offset-2 ring-red-500 shadow-sm'
                                            : prioridad.value === 'media' ? 'bg-yellow-100 text-yellow-700 ring-2 ring-offset-2 ring-yellow-500 shadow-sm'
                                                : prioridad.value === 'baja' ? 'bg-green-100 text-green-700 ring-2 ring-offset-2 ring-green-500 shadow-sm'
                                                    : 'bg-gray-100 text-gray-700 ring-2 ring-offset-2 ring-gray-400 shadow-sm'
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {prioridad.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FiltrosCalendario;
