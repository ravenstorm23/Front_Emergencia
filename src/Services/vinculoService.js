import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export const vincularPaciente = async (data) => {
  const user = getCurrentUser();
  const payload = { ...data, userId: user.id };
  const res = await axios.post(`${API_URL}/cuidadores/vincular`, payload, {
    headers: { Authorization: `Bearer ${user.token}` }
  });
  return res.data;
};
