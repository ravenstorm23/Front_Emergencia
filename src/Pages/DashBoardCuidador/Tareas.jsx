import React, { useState, useEffect } from "react";
import SidebarCuidador from "./Components/SidebarCuidador";
import PacienteSelector from "./Components/PacienteSelector"; // <-- Importa el nuevo selector
import {
  obtenerActividades,
  crearActividad,
  eliminarActividad,
  actualizarActividad,
} from "../../Services/actividadesService";

// Simulamos listado de pacientes (puedes reemplazarlo con tu fetch real)
const pacientesFake = [
  { _id: "64fa2b1c8a1234567890abcd", nombre: "Juan Pérez" },
  { _id: "64fa2b1c8a1234567890abce", nombre: "María López" },
];

const Tareas = ({ pacienteId: pacienteIdProp }) => {
  const [actividades, setActividades] = useState([]);
  const [formVisible, setFormVisible] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    fecha: "",
    hora: "",
    descripcion: "",
    tipo: "",
    recordatorio: false,
    duracion: "",
    prioridad: "media",
  });

  const [pacienteId, setPacienteId] = useState(pacienteIdProp || "");

  // Mapear tipos de frontend a enum del backend
  const tipoMap = {
    Cita: "cita",
    Medicamento: "medicamento",
    Llamada: "revision",
    Informe: "revision",
    Visita: "otro",
  };

  // Traer actividades
  useEffect(() => {
    if (!pacienteId) return; // no cargamos si no hay paciente
    const fetchActividades = async () => {
      try {
        const data = await obtenerActividades(pacienteId);
        setActividades(data);
      } catch (error) {
        console.error(error);
        alert("Error al cargar actividades: " + (error.message || "Desconocido"));
      }
    };
    fetchActividades();
  }, [pacienteId]);

  // Crear actividad
  const handleSubmit = async (tipo) => {
    if (!pacienteId) {
      alert("Selecciona un paciente primero");
      return;
    }

    if ((tipo === "Cita" || tipo === "Medicamento") && (!formData.fecha || !formData.hora)) {
      alert("Por favor ingresa la fecha y hora.");
      return;
    }

    if (!formData.titulo) {
      alert("Faltan campos obligatorios");
      return;
    }

    const nuevaActividad = {
      titulo: formData.titulo,
      descripcion: formData.descripcion || "",
      tipo: tipoMap[tipo],
      pacienteId,
      fechaHora:
        formData.fecha && formData.hora
          ? new Date(`${formData.fecha}T${formData.hora}`).toISOString()
          : new Date().toISOString(),
      recordatorio: formData.recordatorio || false,
      duracion: formData.duracion || "",
      prioridad: formData.prioridad || "media",
    };

    try {
      const res = await crearActividad(nuevaActividad);
      setActividades([...actividades, res]);
      setFormData({
        titulo: "",
        fecha: "",
        hora: "",
        descripcion: "",
        tipo: "",
        recordatorio: false,
        duracion: "",
        prioridad: "media",
      });
      setFormVisible(null);
      alert("Actividad creada correctamente");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.msg || error.message || "Error desconocido";
      alert(msg);
    }
  };

  // Eliminar actividad
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro quieres eliminar esta actividad?")) return;
    try {
      await eliminarActividad(id);
      setActividades(actividades.filter((a) => a._id !== id));
      alert("Actividad eliminada correctamente");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.msg || error.message || "Error desconocido";
      alert(msg);
    }
  };

  // Actualizar actividad (marcar completada)
  const handleActualizar = async (actividad, estado) => {
    try {
      const res = await actualizarActividad(actividad._id, { estado });
      setActividades(
        actividades.map((a) => (a._id === actividad._id ? res : a))
      );
      alert("Actividad actualizada correctamente");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.msg || error.message || "Error desconocido";
      alert(msg);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCuidador />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Centro de acciones rápidas</h1>

        {/* Barra de selección de paciente mejorada */}
        {!pacienteId && (
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Selecciona paciente:</label>
            <PacienteSelector
              pacienteId={pacienteId}
              setPacienteId={setPacienteId}
              pacientes={pacientesFake} // reemplaza con tu fetch real
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {["Cita", "Medicamento", "Llamada", "Informe", "Visita"].map((tipo) => (
            <div
              key={tipo}
              className="bg-white shadow rounded-lg p-5 border hover:border-blue-400 transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {tipo === "Cita"
                  ? "Agendar cita médica"
                  : tipo === "Medicamento"
                  ? "Renovar medicamento"
                  : tipo === "Llamada"
                  ? "Llamada de seguimiento"
                  : tipo === "Informe"
                  ? "Generar informe del paciente"
                  : "Registrar visita"}
              </h2>

              {formVisible === tipo.toLowerCase() ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(tipo);
                  }}
                  className="space-y-2"
                >
                  <input
                    type="text"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={(e) =>
                      setFormData({ ...formData, titulo: e.target.value })
                    }
                    className="border w-full p-2 rounded"
                  />
                  {(tipo === "Cita" || tipo === "Medicamento") && (
                    <>
                      <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) =>
                          setFormData({ ...formData, fecha: e.target.value })
                        }
                        className="border w-full p-2 rounded"
                      />
                      <input
                        type="time"
                        value={formData.hora}
                        onChange={(e) =>
                          setFormData({ ...formData, hora: e.target.value })
                        }
                        className="border w-full p-2 rounded"
                      />
                    </>
                  )}
                  <textarea
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={(e) =>
                      setFormData({ ...formData, descripcion: e.target.value })
                    }
                    className="border w-full p-2 rounded"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setFormVisible(tipo.toLowerCase())}
                  className="text-blue-600 hover:underline"
                >
                  {tipo === "Cita" ? "Agendar cita" : `Agregar ${tipo}`}
                </button>
              )}
            </div>
          ))}

          <div className="col-span-full bg-white shadow rounded-lg p-5 border">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Actividades registradas
            </h2>
            {actividades.length === 0 ? (
              <p>No hay actividades</p>
            ) : (
              <ul>
                {actividades.map((a) => (
                  <li
                    key={a._id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <strong>{a.titulo}</strong> - {a.tipo} -{" "}
                      {a.fechaHora ? new Date(a.fechaHora).toLocaleString() : ""}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleActualizar(a, "completada")}
                        className="text-green-600 hover:underline"
                      >
                        Marcar completada
                      </button>
                      <button
                        onClick={() => handleEliminar(a._id)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tareas;
