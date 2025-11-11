import axios from "axios";

// Configuración base del backend
const authApi = axios.create({
  baseURL: "http://localhost:4000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// LOGIN de usuario
// POST /api/auth/login
export const loginUser = async ({ email, password }) => {
  try {
    const response = await authApi.post("/login", { email, password });
    return response.data; // { token, user }
  } catch (error) {
    console.error("Error en loginUser:", error.response?.data || error.message);
    throw error;
  }
};

// REGISTRO de usuario
// POST /api/auth/register
export const registerUser = async (userData) => {
  try {
    if (!userData.nombre || !userData.email || !userData.password || !userData.rol) {
      throw new Error("Faltan campos requeridos: nombre, email, password o rol");
    }

    const dataToSend = {
      nombre: userData.nombre.trim(),
      email: userData.email.trim(),
      password: userData.password.trim(),
      telefono: userData.telefono?.trim(),
      direccion: userData.direccion?.trim(),
      rol: userData.rol.trim(),
    };

    const response = await authApi.post("/register", dataToSend);
    return response.data; // { msg, user, token }
  } catch (error) {
    console.error("Error en registerUser:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener usuario actual (desde localStorage)
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
