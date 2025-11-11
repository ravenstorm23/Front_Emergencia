import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export const getAlertas = async () => {
  const user = getCurrentUser();
  // aquí asumimos que alertas vienen del mismo endpoint de actividades u otro
  const res = await axios.get(`${API_URL}/alertas`, {
    headers: { Authorization: `Bearer ${user.token}` }
  });
  return res.data;
};
