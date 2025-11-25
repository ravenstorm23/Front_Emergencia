// src/Pages/DashBoardCuidador/Components/ModalActividad.jsx
import React, { useState, useEffect } from "react";

const ModalActividad = ({ isOpen, onClose, onSave, actividad }) => {
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    if (actividad) setTitulo(actividad.titulo || "");
  }, [actividad]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...actividad, titulo });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-2">{actividad ? "Editar" : "Nueva"} Actividad</h2>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título de la actividad"
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalActividad;
