import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarCuidador from "./components/SidebarCuidador";
import Pacientes from "./components/PacienteSelector";

const Paciente = () => {
  const [pacienteId, setPacienteId] = useState("");
  const navigate = useNavigate();

  const handleVerCalendario = (id) => {
    setPacienteId(id);
    navigate("/calendario");
  };

  const handleVerActividades = (id) => {
    setPacienteId(id);
    navigate("/tareas");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCuidador />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Pacientes</h1>

        <Pacientes
          pacienteId={pacienteId}
          setPacienteId={setPacienteId}
          onVerCalendario={handleVerCalendario}
          onVerActividades={handleVerActividades}
        />
      </main>
    </div>
  );
};

export default Paciente;
