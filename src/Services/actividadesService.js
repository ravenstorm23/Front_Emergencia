import axios from "axios";

const API_URL = "http://localhost:4000/api/actividades";

const getToken = () => localStorage.getItem("token");

// Obtener actividades (con filtro opcional por pacienteId)
export const obtenerActividades = async (pacienteId = null) => {
  const url = pacienteId ? `${API_URL}?pacienteId=${pacienteId}` : API_URL;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

// Crear actividad
export const crearActividad = async (actividad) => {
  const fechaHora =
    actividad.fecha && actividad.hora
      ? new Date(`${actividad.fecha}T${actividad.hora}`).toISOString()
      : new Date().toISOString();

  const body = {
    pacienteId: actividad.pacienteId,
    tipo: actividad.tipo,
    titulo: actividad.titulo,
    descripcion: actividad.descripcion,
    fechaHora,
    recordatorio: actividad.recordatorio || false,
  };

  const res = await axios.post(API_URL, body, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  return res.data.actividad;
};

// Eliminar actividad
export const eliminarActividad = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

// Actualizar actividad
export const actualizarActividad = async (id, body) => {
  const res = await axios.put(`${API_URL}/${id}`, body, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data.actividad;
};
