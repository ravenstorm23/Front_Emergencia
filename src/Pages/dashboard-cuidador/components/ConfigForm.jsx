import React, { useState, useEffect } from "react";

const ConfigForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nombre: user.nombre || "",
        telefono: user.telefono || "",
        direccion: user.direccion || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const dataToSave = { ...formData };
    delete dataToSave.confirmPassword;
    if (!dataToSave.password) delete dataToSave.password;

    onSave(dataToSave);
  };

  return (
    <div className="bg-white shadow rounded p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Configuración de cuenta</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos personales */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Teléfono</label>
            <input
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Dirección</label>
            <input
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring focus:border-blue-300"
            />
          </div>
        </div>

        {/* Contraseña */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nueva contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Dejar en blanco para mantener"
              className="w-full border px-3 py-2 rounded focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full mt-2"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfigForm;
