import React, { useState } from "react";
import SidebarCuidador from "../Components/ComponentsDashBoardCuidador/SidebarCuidador";
import { useTasks } from "../Components/ComponentsDashBoardCuidador/TaskContext";
import { PlusCircle } from "lucide-react";

const Tareas = () => {
  const { agregarTarea } = useTasks();
  const [formVisible, setFormVisible] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    fecha: "",
    hora: "",
    descripcion: "",
  });

  const handleSubmit = (tipo) => {
    if ((tipo === "Cita" || tipo === "Medicamento") && (!formData.fecha || !formData.hora)) {
      alert("Por favor ingresa la fecha y hora.");
      return;
    }

    const nuevaTarea = {
      titulo:
        tipo === "Cita"
          ? `Cita médica: ${formData.titulo}`
          : tipo === "Medicamento"
          ? `Renovar medicamento: ${formData.titulo}`
          : formData.titulo,
      descripcion: formData.descripcion,
      fecha: formData.fecha || new Date().toISOString().split("T")[0],
      hora: formData.hora || "",
      tipo,
    };

    agregarTarea(nuevaTarea);
    setFormData({ titulo: "", fecha: "", hora: "", descripcion: "" });
    setFormVisible(null);
    alert("✅ Tarea guardada correctamente");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCuidador />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Centro de acciones rápidas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* --- QUICK ACTION 1: Agendar cita --- */}
          <div className="bg-white shadow rounded-lg p-5 border hover:border-blue-400 transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Agendar cita médica</h2>
            {formVisible === "cita" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit("Cita");
                }}
                className="space-y-2"
              >
                <input
                  type="text"
                  placeholder="Nombre del paciente"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="border w-full p-2 rounded"
                />
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="border w-full p-2 rounded"
                />
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  className="border w-full p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Agendar
                </button>
              </form>
            ) : (
              <button
                onClick={() => setFormVisible("cita")}
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <PlusCircle size={18} /> Agendar cita
              </button>
            )}
          </div>

          {/* --- QUICK ACTION 2: Renovar medicamentos --- */}
          <div className="bg-white shadow rounded-lg p-5 border hover:border-blue-400 transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Renovar medicamentos</h2>
            {formVisible === "medicamento" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit("Medicamento");
                }}
                className="space-y-2"
              >
                <input
                  type="text"
                  placeholder="Nombre del medicamento"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="border w-full p-2 rounded"
                />
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="border w-full p-2 rounded"
                />
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  className="border w-full p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Guardar
                </button>
              </form>
            ) : (
              <button
                onClick={() => setFormVisible("medicamento")}
                className="flex items-center gap-2 text-green-600 hover:underline"
              >
                <PlusCircle size={18} /> Renovar medicamento
              </button>
            )}
          </div>

          {/* --- QUICK ACTION 3: Llamada de seguimiento --- */}
          <div className="bg-white shadow rounded-lg p-5 border hover:border-blue-400 transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Llamada de seguimiento</h2>
            <button
              onClick={() =>
                agregarTarea({
                  titulo: "Llamada de seguimiento",
                  tipo: "Llamada",
                  fecha: new Date().toISOString().split("T")[0],
                })
              }
              className="flex items-center gap-2 text-yellow-600 hover:underline"
            >
              <PlusCircle size={18} /> Registrar llamada
            </button>
          </div>

          {/* --- QUICK ACTION 4: Generar informe paciente --- */}
          <div className="bg-white shadow rounded-lg p-5 border hover:border-blue-400 transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Generar informe del paciente</h2>
            <button
              onClick={() =>
                agregarTarea({
                  titulo: "Generar informe clínico",
                  tipo: "Informe",
                  fecha: new Date().toISOString().split("T")[0],
                })
              }
              className="flex items-center gap-2 text-purple-600 hover:underline"
            >
              <PlusCircle size={18} /> Generar informe
            </button>
          </div>

          {/* --- QUICK ACTION 5: Registrar visita --- */}
          <div className="bg-white shadow rounded-lg p-5 border hover:border-blue-400 transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Registrar visita</h2>
            <button
              onClick={() =>
                agregarTarea({
                  titulo: "Visita registrada",
                  tipo: "Visita",
                  fecha: new Date().toISOString().split("T")[0],
                })
              }
              className="flex items-center gap-2 text-indigo-600 hover:underline"
            >
              <PlusCircle size={18} /> Registrar visita
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tareas;
