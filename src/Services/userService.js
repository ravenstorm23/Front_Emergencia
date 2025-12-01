// src/services/userService.js

import axios from "axios";

// Configuración base del backend para usuarios
const API_URL = "http://localhost:4000/api/usuarios";

// GET → Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Devuelve array de usuarios
  } catch (error) {
    console.error("Error en getAllUsers:", error.response?.data || error.message);
    throw error;
  }
};

// GET → Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getUserById:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH → Actualizar usuario
export const updateUser = async (id, userData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${API_URL}/${id}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.usuario || response.data;
  } catch (error) {
    console.error("Error en updateUser:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE → Eliminar usuario
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error en deleteUser:", error.response?.data || error.message);
    throw error;
  }
};
