import React, { useState, useEffect } from "react";
import SidebarCuidador from "./Components/SidebarCuidador";
import CalendarioVistaMensual from "./Components/CalendarioVistaMensual";
import { useTasks } from "./Components/TaskContext";
import { X } from "lucide-react";

const CalendarioCuidador = () => {
  const { eventos = [], tareas = [], eliminarTarea, toggleTarea } = useTasks?.() ?? {};
  const [showDetalles, setShowDetalles] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [irADia, setIrADia] = useState(null);

  const eventosOrdenados = [...(eventos || [])].sort(
    (a, b) => new Date(a.date || a.fecha) - new Date(b.date || b.fecha)
  );
  const proximosEventos = eventosOrdenados.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCuidador />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Calendario</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white rounded-lg shadow p-4">
            <CalendarioVistaMensual onSelectDate={(d) => setIrADia(d)} />
          </section>
          <aside className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Próximos eventos</h2>
            <div className="space-y-3">
              {proximosEventos.length === 0 ? (
                <p className="text-sm text-gray-500">No hay eventos próximos.</p>
              ) : (
                proximosEventos.map((ev) => {
                  const id = ev.id ?? ev.titulo ?? `${ev.fecha || ev.date}-${Math.random()}`;
                  return (
                    <div key={id} className="flex items-start justify-between bg-gray-50 rounded p-3 border">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => toggleTarea?.(ev.id ?? id)}
                            className={`text-sm font-medium ${ev.completada ? "text-green-600" : "text-gray-800"}`}
                          >
                            {ev.titulo || ev.title}
                          </button>
                          <button onClick={() => eliminarTarea?.(ev.id ?? id)} className="text-gray-400 hover:text-red-500 ml-3" aria-label="Eliminar tarea">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{(ev.fecha || ev.date) ?? "Fecha no disponible"} {ev.hora ? `· ${ev.hora}` : ""}</p>
                        {ev.descripcion && <p className="text-sm text-gray-600 mt-2">{ev.descripcion}</p>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CalendarioCuidador;
