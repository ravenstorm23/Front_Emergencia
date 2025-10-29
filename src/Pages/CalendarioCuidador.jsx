import React, { useState, useEffect } from "react";
import SidebarCuidador from "../Components/ComponentsDashBoardCuidador/SidebarCuidador";
import CalendarioVistaMensual from "../Components/ComponentsDashBoardCuidador/CalendarioVistaMensual";
import { X } from "lucide-react";
import { useTasks } from "../Components/ComponentsDashBoardCuidador/TaskContext";

const CalendarioCuidador = () => {
  const { eventos, tareas, eliminarTarea, toggleTarea } = useTasks(); // usa contexto
  const [showDetalles, setShowDetalles] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [irADia, setIrADia] = useState(null);

  // eventos ya vienen del contexto: eventos === tareas (alias)
  const eventosOrdenados = [...(eventos || [])].sort(
    (a, b) => new Date(a.date || a.fecha) - new Date(b.date || b.fecha)
  );
  const proximosEventos = eventosOrdenados.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCuidador />

      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* COLUMNA IZQUIERDA: CALENDARIO */}
        <div className="xl:col-span-2 bg-white rounded-lg shadow p-4 md:p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Calendario</h1>
          <CalendarioVistaMensual onIrADia={(fn) => setIrADia(() => fn)} />
        </div>

        {/* COLUMNA DERECHA: PANEL DE CONTROL */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 flex flex-col gap-4">
          {/* Próximas citas */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Próximas actividades</h2>
            <div className="space-y-2">
              {proximosEventos.length === 0 ? (
                <p className="text-sm text-gray-500">Sin eventos próximos</p>
              ) : (
                proximosEventos.map((evento) => (
                  <div
                    key={evento.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      if (irADia) irADia(evento.date || evento.fecha);
                    }}
                  >
                    <div>
                      <p className="font-medium text-gray-800">{evento.titulo || evento.texto}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(evento.date || evento.fecha).toLocaleDateString("es-CO")} —{" "}
                        {evento.hora || "Sin hora"}
                      </p>
                    </div>
                    <button
                      className="text-blue-600 text-sm hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEventoSeleccionado(evento);
                        setShowDetalles(true);
                      }}
                    >
                      Ver más
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Tareas pendientes (usa tareas del contexto) */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex justify-between items-center">
              Tareas pendientes
            </h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {tareas.length === 0 ? (
                <p className="text-sm text-gray-500">No hay tareas pendientes</p>
              ) : (
                tareas.filter(t => !t.completa).map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={t.completa} onChange={() => toggleTarea(t.id)} />
                      <span className={`text-sm ${t.completa ? "line-through text-gray-400" : "text-gray-700"}`}>
                        {t.titulo || t.texto}
                      </span>
                    </label>
                    <button onClick={() => eliminarTarea(t.id)} className="text-gray-400 hover:text-red-500">✕</button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Cronología futura (línea de tiempo con todo el histórico) */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Línea de tiempo</h2>
            <div className="border-l border-gray-300 pl-4 space-y-3 max-h-60 overflow-y-auto">
              {eventosOrdenados.length === 0 ? (
                <p className="text-sm text-gray-500">Sin eventos registrados</p>
              ) : (
                eventosOrdenados.map((evento) => (
                  <div key={evento.id} className="relative">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <p className="text-sm font-medium text-gray-800">{evento.titulo || evento.texto}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(evento.date || evento.fecha).toLocaleDateString("es-CO")} — {evento.hora || "Sin hora"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Modal de detalles */}
      {showDetalles && eventoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setShowDetalles(false)}>
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{eventoSeleccionado.titulo || eventoSeleccionado.texto}</h3>
            <p className="text-gray-700 mb-2"><strong>Fecha:</strong> {new Date(eventoSeleccionado.date || eventoSeleccionado.fecha).toLocaleDateString("es-CO")}</p>
            <p className="text-gray-700 mb-2"><strong>Hora:</strong> {eventoSeleccionado.hora || "No especificada"}</p>
            <p className="text-gray-700 mb-2"><strong>Tipo:</strong> {eventoSeleccionado.tipo || eventoSeleccionado.type || "Evento"}</p>
            <p className="text-gray-600 italic mt-3">Puedes usar esta sección para agregar notas o detalles más adelante.</p>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowDetalles(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioCuidador;
