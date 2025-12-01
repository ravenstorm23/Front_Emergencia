import React, { useState, useEffect } from "react";
import SidebarCuidador from "./components/SidebarCuidador";
import ConfigForm from "./components/ConfigForm";
import { updateUser } from "../../services/userService";
import Toast from "../../components/Toast";

const Configuracion = () => {
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSave = async (data) => {
    try {
      if (!user?._id) return;

      const updatedUser = await updateUser(user._id, data);

      // Actualizar estado y localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setToast({ type: "success", message: "Perfil actualizado correctamente" });
    } catch (error) {
      console.error("Error updating profile:", error);
      setToast({ type: "error", message: "Error al actualizar el perfil" });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCuidador />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración</h1>
        {user && <ConfigForm user={user} onSave={handleSave} />}
      </main>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Configuracion;
