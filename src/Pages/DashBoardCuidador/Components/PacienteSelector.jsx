// src/Pages/Pacientes/Components/Pacientes.jsx
import React, { useState, useEffect } from "react";
import { Search, Check, Edit, Calendar } from "lucide-react";

const pacientesFake = [
  { _id: "64fa2b1c8a1234567890abcd", nombre: "Juan Pérez", estado: "activo" },
  { _id: "64fa2b1c8a1234567890abce", nombre: "María López", estado: "seguimiento" },
  { _id: "64fa2b1c8a1234567890abcf", nombre: "Carlos Gómez", estado: "inactivo" },
];

const estadoColor = {
  activo: "bg-green-100 text-green-800",
  seguimiento: "bg-yellow-100 text-yellow-800",
  inactivo: "bg-gray-100 text-gray-600",
};

const Pacientes = ({ pacienteId, setPacienteId, onVerCalendario, onVerActividades }) => {
  const [search, setSearch] = useState("");
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    // Simulamos fetch de la API
    setPacientes(pacientesFake);
  }, []);

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Buscar paciente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          aria-label="Buscar paciente"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
        {pacientesFiltrados.length === 0 && (
          <p className="text-gray-500 col-span-full">No se encontraron pacientes</p>
        )}

        {pacientesFiltrados.map((p) => {
          const isSelected = p._id === pacienteId;
          return (
            <div
              key={p._id}
              className={`relative border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300
                ${isSelected ? "border-blue-500" : "border-gray-200"}`}
              onClick={() => setPacienteId(p._id)}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{p.nombre}</h3>
                  <span
                    className={`text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded ${estadoColor[p.estado]}`}
                  >
                    {p.estado}
                  </span>
                </div>
                {isSelected && <Check className="w-5 h-5 text-blue-500" />}
              </div>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  className="text-gray-500 hover:text-gray-800"
                  title="Editar paciente"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  title="Ver calendario"
                  onClick={() => onVerCalendario(p._id)}
                >
                  <Calendar className="w-4 h-4" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  title="Ver actividades"
                  onClick={() => onVerActividades(p._id)}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pacientes;
