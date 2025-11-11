import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export const getActividades = async () => {
  const user = getCurrentUser();
  const res = await axios.get(`${API_URL}/actividades`, {
    headers: { Authorization: `Bearer ${user.token}` }
  });
  return res.data;
};

export const crearActividad = async (actividad) => {
  const user = getCurrentUser();
  const res = await axios.post(`${API_URL}/actividades`, actividad, {
    headers: { Authorization: `Bearer ${user.token}` }
  });
  return res.data;
};

export const eliminarActividad = async (id) => {
  const user = getCurrentUser();
  const res = await axios.delete(`${API_URL}/actividades/${id}`, {
    headers: { Authorization: `Bearer ${user.token}` }
  });
  return res.data;
};
