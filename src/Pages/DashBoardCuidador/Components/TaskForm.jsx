import React from "react";

const TaskForm = ({ onAddTask }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = Object.fromEntries(formData.entries());
    onAddTask({ ...task, completed: false });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
      <input
        name="title"
        placeholder="Título de la tarea"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="patient"
        placeholder="Nombre del paciente"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="time"
        placeholder="Hora (ej: 09:00 AM)"
        className="border p-2 w-full rounded"
      />
      <input
        name="duration"
        placeholder="Duración (ej: 30 min)"
        className="border p-2 w-full rounded"
      />

      <select name="priority" className="border p-2 w-full rounded">
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notas"
        className="border p-2 w-full rounded"
      ></textarea>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar tarea
      </button>
    </form>
  );
};

export default TaskForm;
