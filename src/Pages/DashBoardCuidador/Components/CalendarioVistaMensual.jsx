// src/Components/CalendarioVistaMensual.jsx
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Plus, Trash2 } from "lucide-react";
import { obtenerActividades, crearActividad, actualizarActividad, eliminarActividad } from "../../../Services/actividadesService";

import ModalActividad from "./ModalActividad"; 

const CalendarioVistaMensual = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [actividades, setActividades] = useState([]);
  const [actividadDia, setActividadDia] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  // ===============================
  // Cargar todas las actividades desde el backend
  // ===============================
  const cargarActividades = async () => {
    try {
      const data = await obtenerActividades();
      setActividades(data);
    } catch (error) {
      console.error("Error cargando actividades:", error);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  const cambiarMes = (incremento) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setMonth(fechaActual.getMonth() + incremento);
    setFechaActual(nuevaFecha);
  };

  const seleccionarDia = (dia) => {
    const fechaStr = `${fechaActual.getFullYear()}-${fechaActual.getMonth() + 1}-${dia}`;
    const actividadesDelDia = actividades.filter(
      (act) => new Date(act.fecha).toDateString() === new Date(fechaStr).toDateString()
    );
    setActividadDia(actividadesDelDia);
  };

  const handleAgregarActividad = () => {
    setActividadSeleccionada(null);
    setModalAbierto(true);
  };


  const handleGuardarActividad = async (actividadData) => {
    try {
      if (actividadSeleccionada) {
        // Actualizar
        await actualizarActividad(actividadSeleccionada._id, actividadData);
      } else {
        // Crear nueva
        await crearActividad(actividadData);
      }
      setModalAbierto(false);
      cargarActividades();
    } catch (error) {
      console.error("Error guardando actividad:", error);
    }
  };

  const handleEliminarActividad = async (id) => {
    try {
      await eliminarActividad(id);
      cargarActividades();
      setActividadDia(actividadDia.filter((act) => act._id !== id));
    } catch (error) {
      console.error("Error eliminando actividad:", error);
    }
  };

  const diasDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();
  const diasArray = Array.from({ length: diasDelMes }, (_, i) => i + 1);

  return (
    <div className="calendario-mensual p-4">
      <div className="header flex justify-between items-center mb-4">
        <button onClick={() => cambiarMes(-1)}>
          <ChevronLeft />
        </button>
        <h2>
          {fechaActual.toLocaleString("default", { month: "long" })} {fechaActual.getFullYear()}
        </h2>
        <button onClick={() => cambiarMes(1)}>
          <ChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {diasArray.map((dia) => (
          <div
            key={dia}
            className="dia border p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => seleccionarDia(dia)}
          >
            {dia}
          </div>
        ))}
      </div>

      <div className="panel-actividades border p-4">
        <div className="flex justify-between items-center mb-2">
          <h3>Actividades del día</h3>
          <button onClick={handleAgregarActividad}>
            <Plus />
          </button>
        </div>

        {actividadDia.length === 0 ? (
          <p>No hay actividades para este día</p>
        ) : (
          <ul>
            {actividadDia.map((act) => (
              <li key={act._id} className="flex justify-between items-center mb-1">
                <span>{act.titulo}</span>
                <div className="flex gap-2">
                  <button onClick={() => { setActividadSeleccionada(act); setModalAbierto(true); }}>
                    Editar
                  </button>
                  <button onClick={() => handleEliminarActividad(act._id)}>
                    <Trash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {modalAbierto && (
        <ModalActividad
          actividad={actividadSeleccionada}
          onClose={() => setModalAbierto(false)}
          onSave={handleGuardarActividad}
        />
      )}
    </div>
  );
};

export default CalendarioVistaMensual;
