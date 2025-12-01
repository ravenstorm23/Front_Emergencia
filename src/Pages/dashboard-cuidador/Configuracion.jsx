import React, { useState, useEffect } from "react";
import SidebarCuidador from "./components/SidebarCuidador";
import ConfigForm from "./components/ConfigForm";

const Configuracion = () => {
  const [user, setUser] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    if (storedUser) {
      setUser({
        nombre: storedUser.nombre || "",
        correo: storedUser.email || "",
        telefono: storedUser.telefono || "",
      });
    }
  }, []);

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
