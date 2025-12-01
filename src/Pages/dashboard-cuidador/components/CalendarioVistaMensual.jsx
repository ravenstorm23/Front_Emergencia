import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { crearActividad, actualizarActividad, eliminarActividad } from "../../../services/actividadesService";
import ModalActividad from "./ModalActividad";

const CalendarioVistaMensual = ({ actividades = [], onActividadChange }) => {
  const [mesActual, setMesActual] = useState(new Date());
  const [modalAbierto, setModalAbierto] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  const cambiarMes = (incremento) => {
    const nuevaFecha = new Date(mesActual);
    nuevaFecha.setMonth(mesActual.getMonth() + incremento);
    setMesActual(nuevaFecha);
  };

  const getDiasDelMes = () => {
    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasPrevios = primerDia.getDay();
    const diasEnMes = ultimoDia.getDate();

    const dias = [];
    // Días del mes anterior (grises)
    for (let i = diasPrevios - 1; i >= 0; i--) {
      const fecha = new Date(año, mes, -i);
      dias.push({ fecha, esOtroMes: true });
    }
    // Días del mes actual
    for (let i = 1; i <= diasEnMes; i++) {
      dias.push({ fecha: new Date(año, mes, i), esOtroMes: false });
    }
    // Completar la última semana
    const diasRestantes = 42 - dias.length;
    for (let i = 1; i <= diasRestantes; i++) {
      dias.push({ fecha: new Date(año, mes + 1, i), esOtroMes: true });
    }
    return dias;
  };

  const getActividadesPorDia = (fecha) => {
    return actividades.filter((act) => {
      const fechaAct = new Date(act.fechaHora);
      return (
        fechaAct.getDate() === fecha.getDate() &&
        fechaAct.getMonth() === fecha.getMonth() &&
        fechaAct.getFullYear() === fecha.getFullYear()
      );
    });
  };

  const handleGuardarActividad = async (actividadData) => {
    try {
      if (actividadSeleccionada) {
        await actualizarActividad(actividadSeleccionada._id, actividadData);
      } else {
        await crearActividad(actividadData);
      }
      setModalAbierto(false);
      setActividadSeleccionada(null);
      if (onActividadChange) onActividadChange();
    } catch (error) {
      console.error("Error guardando actividad:", error);
    }
  };

  const handleEliminarActividad = async (id) => {
    try {
      await eliminarActividad(id);
      if (onActividadChange) onActividadChange();
    } catch (error) {
      console.error("Error eliminando actividad:", error);
    }
  };

  const esHoy = (fecha) => {
    const hoy = new Date();
    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    );
  };

  const getTipoColor = (tipo) => {
    const colores = {
      visita: "bg-blue-50 border-l-4 border-blue-500 text-blue-700",
      medicamento: "bg-green-50 border-l-4 border-green-500 text-green-700",
      cita: "bg-purple-50 border-l-4 border-purple-500 text-purple-700",
      emergencia: "bg-red-50 border-l-4 border-red-500 text-red-700",
      tarea: "bg-orange-50 border-l-4 border-orange-500 text-orange-700",
    };
    return colores[tipo] || "bg-gray-50 border-l-4 border-gray-400 text-gray-700";
  };

  const getTipoIconColor = (tipo) => {
    const colores = {
      visita: "text-blue-600",
      medicamento: "text-green-600",
      cita: "text-purple-600",
      emergencia: "text-red-600",
      tarea: "text-orange-600",
    };
    return colores[tipo] || "text-gray-600";
  };

  const dias = getDiasDelMes();
  const nombreMes = mesActual.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold capitalize">{nombreMes}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => cambiarMes(-1)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMesActual(new Date())}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Hoy
            </button>
            <button
              onClick={() => cambiarMes(1)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setActividadSeleccionada(null);
                setDiaSeleccionado(null);
                setModalAbierto(true);
              }}
              className="ml-4 bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 shadow-lg active:scale-95"
            >
              <Plus size={18} /> Nueva Actividad
            </button>
          </div>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia, i) => (
          <div
            key={i}
            className="p-3 text-center text-sm font-semibold text-gray-600 uppercase tracking-wide"
          >
            {dia}
          </div>
        ))}
      </div>

      {/* Grid de días mejorado */}
      <div className="grid grid-cols-7 divide-x divide-y divide-gray-200">
        {dias.map((dia, index) => {
          const actividadesDia = getActividadesPorDia(dia.fecha);
          const hoy = esHoy(dia.fecha);

          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 transition-all duration-200 hover:bg-gray-50 ${dia.esOtroMes ? "bg-gray-50/50" : "bg-white"
                } ${hoy ? "ring-2 ring-blue-500 ring-inset bg-blue-50/30" : ""}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-medium ${dia.esOtroMes
                    ? "text-gray-400"
                    : hoy
                      ? "bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                      : "text-gray-700"
                    }`}
                >
                  {dia.fecha.getDate()}
                </span>
                {actividadesDia.length > 0 && !dia.esOtroMes && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
                    {actividadesDia.length}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                {actividadesDia.slice(0, 2).map((act) => (
                  <div
                    key={act._id}
                    onClick={() => {
                      setActividadSeleccionada(act);
                      setModalAbierto(true);
                    }}
                    className={`${getTipoColor(act.tipo)} px-2 py-1 rounded-md text-xs cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 group`}
                  >
                    <div className="flex items-center gap-1">
                      <Clock className={`w-3 h-3 ${getTipoIconColor(act.tipo)} flex-shrink-0`} />
                      <span className="font-medium truncate">{act.titulo}</span>
                    </div>
                  </div>
                ))}
                {actividadesDia.length > 2 && (
                  <button
                    onClick={() => {
                      setDiaSeleccionado(dia.fecha);
                      // Aquí podrías abrir un modal con todas las actividades del día
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    +{actividadesDia.length - 2} más
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {modalAbierto && (
        <ModalActividad
          actividad={actividadSeleccionada}
          onClose={() => {
            setModalAbierto(false);
            setActividadSeleccionada(null);
          }}
          onSave={handleGuardarActividad}
          onDelete={actividadSeleccionada ? () => handleEliminarActividad(actividadSeleccionada._id) : null}
        />
      )}
    </div>
  );
};

export default CalendarioVistaMensual;
