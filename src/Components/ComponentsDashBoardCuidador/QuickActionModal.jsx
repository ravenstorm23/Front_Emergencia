import React, { useState } from "react";
import { X } from "lucide-react";
import { useTasks } from "./TaskContext";

const QuickActionModal = ({ actionType, onClose }) => {
  const { agregarTarea } = useTasks();
  const [form, setForm] = useState({
    titulo: "",
    patient: "",
    date: "",
    time: "",
    notes: "",
    priority: "media"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // crear la tarea local
    const nuevaTarea = {
      ...form,
      tipo: actionType,
      completa: false,
    };

    agregarTarea(nuevaTarea);

    // sincronizar con calendario si aplica
    if (actionType === "agendar-cita" || actionType === "renovacion-medicamentos") {
      const rawEventos = localStorage.getItem("eventosCuidador");
      const eventos = rawEventos ? JSON.parse(rawEventos) : [];

      eventos.push({
        id: Date.now(),
        fecha: form.date || new Date().toISOString().split("T")[0],
        titulo: form.titulo || "Sin título",
        hora: form.time || "",
        tipo: actionType,
        descripcion: form.notes || "",
      });

      localStorage.setItem("eventosCuidador", JSON.stringify(eventos));
    }

    onClose();
  };

  const getTitle = () => {
    switch (actionType) {
      case "renovacion-medicamentos":
        return "Renovación de Medicamentos";
      case "agendar-cita":
        return "Agendar Cita";
      case "reporte":
        return "Nuevo Reporte";
      case "llamada":
        return "Registrar Llamada";
      case "tarea":
        return "Nueva Tarea";
      default:
        return "Acción Rápida";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative animate-fadeIn">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X />
        </button>

        <h4 className="text-lg font-semibold mb-4 text-gray-800">{getTitle()}</h4>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          {/* Campos adicionales */}
          <input
            name="patient"
            placeholder="Nombre del paciente"
            value={form.patient}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notas o descripción"
            value={form.notes}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          ></textarea>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded border hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickActionModal;
