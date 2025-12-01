import axios from "axios";

const API_URL = "http://localhost:3000/api/mensajes";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            "x-token": token,
        },
    };
};

export const enviarMensaje = async (destinatarioId, contenido, tipo = 'texto') => {
    try {
        const response = await axios.post(API_URL, { destinatarioId, contenido, tipo }, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        throw error;
    }
};

export const obtenerConversacion = async (usuarioId) => {
    try {
        const response = await axios.get(`${API_URL}/${usuarioId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error al obtener conversación:", error);
        throw error;
    }
};

export const obtenerConversaciones = async () => {
    try {
        const response = await axios.get(`${API_URL}/conversaciones`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error al obtener conversaciones:", error);
        throw error;
    }
};

export const marcarComoLeido = async (usuarioId) => {
    try {
        const response = await axios.put(`${API_URL}/marcar-leidos/${usuarioId}`, {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error al marcar como leído:", error);
        throw error;
    }
};
