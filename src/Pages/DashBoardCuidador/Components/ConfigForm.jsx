
import React, { useState } from "react";

const usuarioFake = {
  nombre: "Santiago",
  email: "addammyers@gmail.com",
  telefono: "3026291338",
  direccion: "Av 47#67-101",
};

const ConfigForm = () => {
  const [nombre, setNombre] = useState(usuarioFake.nombre);
  const [telefono, setTelefono] = useState(usuarioFake.telefono);
  const [direccion, setDireccion] = useState(usuarioFake.direccion);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codigoPaciente, setCodigoPaciente] = useState("");

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    // Validaciones básicas
    if (password && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Guardando cambios:", { nombre, telefono, direccion, password });
    alert("Cambios guardados correctamente");
  };

  const handleVincularPaciente = () => {
    if (!codigoPaciente.trim()) return alert("Ingresa un código válido");
    console.log("Vinculando paciente:", codigoPaciente);
    alert(`Paciente con código ${codigoPaciente} vinculado correctamente`);
    setCodigoPaciente("");
  };

  return (
    <div className="bg-white shadow rounded p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Configuración de cuenta</h2>

      <form onSubmit={handleGuardarCambios} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos personales */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Teléfono</label>
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Dirección</label>
            <input
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

      {/* Vinculación de pacientes */}
      <div className="mt-6 p-4 border rounded space-y-3 bg-gray-50">
        <h3 className="font-semibold mb-2">Vincular nuevo paciente</h3>
        <div className="flex gap-2 items-center">
          <input
            value={codigoPaciente}
            onChange={(e) => setCodigoPaciente(e.target.value)}
            placeholder="Código de paciente"
            className="flex-1 border px-3 py-2 rounded focus:ring focus:border-green-300"
          />
          <button
            onClick={handleVincularPaciente}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Vincular
          </button>
        </div>
        <p className="text-sm text-gray-500">Ingresa el código que te proporcionó el paciente.</p>
      </div>
    </div>
  );
};

export default ConfigForm;
