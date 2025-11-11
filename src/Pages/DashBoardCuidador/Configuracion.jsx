import React, { useState } from "react";
import SidebarCuidador from "./Components/SidebarCuidador";
import ConfigForm from "./Components/ConfigForm";

// Simulación de usuario
const usuarioFake = {
  nombre: "Juan Pérez",
  correo: "juan.perez@mail.com",
  telefono: "3123456789",
};

const Configuracion = () => {
  const [user, setUser] = useState(usuarioFake);

  const handleSave = (data) => {
    // Aquí harías llamada a la API para guardar cambios
    console.log("Guardando usuario:", data);
    setUser({ ...user, ...data });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCuidador />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración</h1>
        <ConfigForm user={user} onSave={handleSave} />
      </main>
    </div>
  );
};

export default Configuracion;
