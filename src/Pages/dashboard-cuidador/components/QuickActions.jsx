import React, { useMemo, useState } from "react";
import { Plus, Calendar, FileText, Users, Phone } from "lucide-react";
import { useTasks } from "../../../context/TaskContext";

const QuickActions = () => {
  const { tareas, agregarTarea, toggleTarea, eliminarVariasTareas } = useTasks();
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filter, setFilter] = useState("todas"); // todas / pendientes / completadas

  const actions = useMemo(
    () => [
      { id: "medicamento", icon: Plus, label: "Renovación medicamentos", color: "bg-blue-500", type: "Medicamento" },
      { id: "cita", icon: Calendar, label: "Agendar cita", color: "bg-green-500", type: "Cita" },
      { id: "informe", icon: FileText, label: "Generar informe", color: "bg-purple-500", type: "Informe" },
      { id: "llamada", icon: Phone, label: "Registrar llamada", color: "bg-orange-400", type: "Llamada" },
      { id: "pacientes", icon: Users, label: "Ver pacientes", color: "bg-indigo-500", type: "Pacientes" },
    ],
    []
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllVisible = () => {
    const visible = visibleTasks.map((t) => t.id);
    setSelectedIds(new Set(visible));
  };

  const clearSelection = () => setSelectedIds(new Set());

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Eliminar ${selectedIds.size} tarea(s)?`)) return;
    eliminarVariasTareas(Array.from(selectedIds));
    clearSelection();
  };

  const visibleTasks = tareas.filter((t) => {
    if (filter === "pendientes") return !t.completa;
    if (filter === "completadas") return !!t.completa;
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.id}
              className={`${a.color} text-white p-3 rounded-lg transition flex flex-col items-center justify-center`}
              onClick={() => {
                // Para llamadas e informes hacemos acción rápida, para cita/medicamento abrimos prompt simple
                if (a.type === "Llamada") {
                  agregarTarea({
                    titulo: "Llamada de seguimiento",
                    tipo: "Llamada",
                    date: new Date().toISOString().split("T")[0],
                  });
                  return;
                }
                if (a.type === "Informe") {
                  agregarTarea({
                    titulo: "Generar informe clínico",
                    tipo: "Informe",
                    date: new Date().toISOString().split("T")[0],
                  });
                  return;
                }
                // Para citas y medicamentos pedimos datos simples
                const titulo = prompt(`${a.label} - Nombre o título:`);
                if (!titulo) return;
                const fecha = prompt("Fecha (YYYY-MM-DD) — dejar vacío para hoy:") || new Date().toISOString().split("T")[0];
                const hora = prompt("Hora (HH:MM) — opcional:") || "";
                agregarTarea({
                  titulo,
                  tipo: a.type,
                  date: fecha,
                  hora,
                });
              }}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-sm font-medium">{a.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filtro y acciones sobre la lista */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Mostrar:</label>
          <select className="border p-1 rounded text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="todas">Todas</option>
            <option value="pendientes">Pendientes</option>
            <option value="completadas">Completadas</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={selectAllVisible} className="text-sm text-blue-600 hover:underline">Seleccionar visibles</button>
          <button onClick={clearSelection} className="text-sm text-gray-500 hover:underline">Limpiar</button>
        </div>
      </div>

      {/* Lista de tareas dentro del QuickActions */}
      <div className="max-h-56 overflow-y-auto space-y-2">
        {visibleTasks.length === 0 ? (
          <p className="text-sm text-gray-500">No hay tareas aquí.</p>
        ) : (
          visibleTasks.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.has(t.id)}
                  onChange={() => toggleSelect(t.id)}
                />
                <div className="flex flex-col">
                  <span className={`${t.completa ? "line-through text-gray-400" : "text-gray-800"} font-medium text-sm`}>
                    {t.titulo || t.texto}
                  </span>
                  <span className="text-xs text-gray-500">
                    {t.date || ""} {t.hora ? `• ${t.hora}` : ""}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.completa}
                  onChange={() => toggleTarea(t.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={handleBulkDelete}
          className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          disabled={selectedIds.size === 0}
        >
          Eliminar seleccionadas
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
