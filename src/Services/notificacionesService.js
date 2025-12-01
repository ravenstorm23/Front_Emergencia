import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000/api") + "/notificaciones";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const obtenerNotificaciones = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error al obtener notificaciones:", error);
        throw error;
    }
};

export const marcarNotificacionLeida = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/leida`, {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error al marcar notificación:", error);
        throw error;
    }
};

export const crearNotificacion = async (notificacionData) => {
    try {
        const response = await axios.post(API_URL, notificacionData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error al crear notificación:", error);
        throw error;
    }
};
