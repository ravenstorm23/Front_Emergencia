import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export const getPacientes = async () => {
  const user = getCurrentUser();
  if (!user) return [];

  const res = await axios.get(`${API_URL}/usuarios`, {
    headers: { Authorization: `Bearer ${user.token}` }
  });

  // filtra solo los adultos mayores vinculados si quieres
  if (user.rol === "cuidador") {
    return res.data.filter(u => u.rol === "adulto_mayor");
  }
  return res.data;
};
