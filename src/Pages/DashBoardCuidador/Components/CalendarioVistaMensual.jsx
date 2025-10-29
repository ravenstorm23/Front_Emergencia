import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Trash2, Plus } from "lucide-react";

const colorMap = {
  visita: "bg-blue-500",
  medicamento: "bg-green-500",
  cita: "bg-purple-500",
  tarea: "bg-orange-500",
  emergencia: "bg-red-500",
};

const monthNames = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];
const dayNames = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const formatKey = (date) => date.toISOString().split("T")[0];

export default function CalendarioVistaMensual() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ titulo: "", hora: "", tipo: "visita", descripcion: "" });

  // --- 🔁 Cargar eventos y sincronizar con tareas ---
  useEffect(() => {
    const rawEventos = localStorage.getItem("eventosCuidador");
    const rawTareas = localStorage.getItem("tareasCuidador");

    let eventosGuardados = [];
    let tareas = [];

    try {
      if (rawEventos) eventosGuardados = JSON.parse(rawEventos);
      if (rawTareas) tareas = JSON.parse(rawTareas);
    } catch {
      console.warn("Error al cargar datos del localStorage");
    }

    // Convertir tareas a eventos visibles en el calendario
    const tareasComoEventos = tareas.map((t) => ({
      id: `tarea-${t.id || Date.now()}`,
      fecha: t.fecha || formatKey(new Date()),
      titulo: t.titulo || "Tarea pendiente",
      hora: t.hora || "",
      tipo: t.tipo || "tarea",
      descripcion: t.descripcion || "",
    }));

    // Fusionar ambos sin duplicados
    const todos = [...eventosGuardados, ...tareasComoEventos];
    const unique = todos.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    setEventos(unique);
  }, []);

  // --- Guardar automáticamente ---
  useEffect(() => {
    localStorage.setItem("eventosCuidador", JSON.stringify(eventos));
  }, [eventos]);

  // Helpers calendario
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysGrid = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startWeek = firstDay.getDay();
    const grid = [];

    for (let i = 0; i < startWeek; i++) {
      const d = new Date(y, m, i - startWeek + 1);
      grid.push({ date: d, isCurrentMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push({ date: new Date(y, m, d), isCurrentMonth: true });
    }
    while (grid.length < 42) {
      const d = grid.length - startWeek + 1;
      grid.push({ date: new Date(y, m + 1, d), isCurrentMonth: false });
    }
    return grid;
  };

  const days = getDaysGrid(currentDate);

  const isToday = (d) => {
    const t = new Date();
    return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
  };

  const eventosDelDia = (date) => {
    if (!date) return [];
    const key = formatKey(date);
    return eventos.filter((ev) => ev.fecha === key).sort((a,b)=> (a.hora||"") > (b.hora||"")?1:-1);
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const handleDayClick = (cell) => {
    if (!cell?.isCurrentMonth) {
      setCurrentDate(new Date(cell.date.getFullYear(), cell.date.getMonth(), 1));
      setSelectedDate(cell.date);
      return;
    }
    setSelectedDate(cell.date);
  };

  const openAddModal = () => {
    const base = selectedDate || new Date();
    setSelectedDate(base);
    setForm({ titulo: "", hora: "", tipo: "visita", descripcion: "" });
    setShowAddModal(true);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.titulo.trim()) return;
    const fechaKey = formatKey(selectedDate || new Date());
    const ev = {
      id: Date.now(),
      fecha: fechaKey,
      titulo: form.titulo.trim(),
      hora: form.hora,
      tipo: form.tipo,
      descripcion: form.descripcion || "",
    };
    setEventos((prev) => [...prev, ev]);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setEventos((prev) => prev.filter((ev) => ev.id !== id));
  };

  const selectedKey = selectedDate ? formatKey(selectedDate) : null;

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6 transition-all">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-2 rounded hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-lg font-bold text-gray-900">
            {monthNames[month]} {year}
          </div>
          <button onClick={nextMonth} className="p-2 rounded hover:bg-gray-100">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button onClick={goToday} className="px-3 py-1.5 bg-white border rounded text-sm hover:bg-gray-50">Hoy</button>
          <button onClick={openAddModal} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Agregar evento
          </button>
        </div>
      </div>

      {/* nombres días */}
      <div className="hidden sm:grid grid-cols-7 gap-1 mb-2 text-xs sm:text-sm">
        {dayNames.map((d) => <div key={d} className="text-center font-semibold text-gray-600 py-2">{d}</div>)}
      </div>

      {/* grid calendario */}
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 sm:gap-2 text-xs sm:text-sm">
        {days.map((cell, i) => {
          const d = cell.date;
          const evs = eventosDelDia(d);
          const today = isToday(d);
          const isSelected = selectedDate && formatKey(d) === selectedKey;

          return (
            <div
              key={i}
              onClick={() => handleDayClick(cell)}
              className={`p-1 sm:p-2 min-h-[5rem] border rounded-lg cursor-pointer transition
                ${cell.isCurrentMonth ? "bg-white hover:bg-gray-50" : "bg-gray-50"}
                ${today ? "border-blue-400 border-2" : "border-gray-200"}
                ${isSelected ? "ring-2 ring-blue-500" : ""}
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`${cell.isCurrentMonth ? "text-gray-900" : "text-gray-400"} text-xs sm:text-sm font-medium`}>
                  {d.getDate()}
                </span>
                {evs.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-[10px] sm:text-xs px-1.5 rounded-full">
                    {evs.length}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                {evs.slice(0, 2).map((ev) => (
                  <div key={ev.id} className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded text-white truncate ${colorMap[ev.tipo] || "bg-gray-500"}`} title={`${ev.hora || ""} ${ev.titulo}`}>
                    {ev.hora ? `${ev.hora} ` : ""}{ev.titulo}
                  </div>
                ))}
                {evs.length > 2 && <div className="text-[10px] text-gray-500">+{evs.length - 2} más</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* leyenda */}
      <div className="flex flex-wrap gap-3 mt-4 text-xs sm:text-sm">
        {Object.entries(colorMap).map(([key, cls]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`${cls} w-3 h-3 rounded`} />
            <span className="text-gray-700 capitalize text-sm">{key}</span>
          </div>
        ))}
      </div>

      {/* panel inferior */}
      <div className="mt-5 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">
            {selectedDate ? selectedDate.toLocaleDateString("es-CO") : "Selecciona un día"}
          </h3>
          <div className="text-sm text-gray-500">{selectedDate ? `${eventosDelDia(selectedDate).length} evento(s)` : ""}</div>
        </div>

        {!selectedDate && <p className="text-sm text-gray-500">Haz clic en cualquier día para ver los eventos de ese día. Usa "+ Agregar evento" para crear uno.</p>}

        {selectedDate && eventosDelDia(selectedDate).length === 0 && (
          <div className="text-sm text-gray-500">No hay eventos para este día.</div>
        )}

        {selectedDate && eventosDelDia(selectedDate).length > 0 && (
          <div className="space-y-2">
            {eventosDelDia(selectedDate).map((ev) => (
              <div key={ev.id} className="flex items-start justify-between gap-3 p-2 bg-white rounded border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${colorMap[ev.tipo] || "bg-gray-500"}`} />
                    <strong className="text-sm">{ev.titulo}</strong>
                  </div>
                  <div className="text-xs text-gray-500">{ev.hora || "Sin hora"}</div>
                  {ev.descripcion && <div className="text-xs text-gray-600 mt-1">{ev.descripcion}</div>}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => handleDelete(ev.id)} className="text-red-600 hover:underline text-sm flex items-center gap-1">
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* modal agregar */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative">
            <button className="absolute right-3 top-3 text-gray-500" onClick={() => setShowAddModal(false)}><X /></button>
            <h4 className="text-lg font-semibold mb-2">Agregar evento - {selectedDate ? selectedDate.toLocaleDateString("es-CO") : ""}</h4>

            <form onSubmit={handleAdd} className="space-y-3">
              <input className="w-full border px-3 py-2 rounded" placeholder="Título" value={form.titulo} onChange={(e)=>setForm({...form, titulo: e.target.value})} />
              <input className="w-full border px-3 py-2 rounded" type="time" value={form.hora} onChange={(e)=>setForm({...form, hora: e.target.value})} />
              <select className="w-full border px-3 py-2 rounded" value={form.tipo} onChange={(e)=>setForm({...form, tipo: e.target.value})}>
                <option value="visita">Visita</option>
                <option value="medicamento">Medicamento</option>
                <option value="cita">Cita médica</option>
                <option value="tarea">Tarea</option>
                <option value="emergencia">Emergencia</option>
              </select>
              <textarea className="w-full border px-3 py-2 rounded" rows="3" placeholder="Descripción (opcional)" value={form.descripcion} onChange={(e)=>setForm({...form, descripcion: e.target.value})} />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={()=>setShowAddModal(false)} className="px-3 py-2 rounded border">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
