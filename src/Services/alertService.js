import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Tipos de alertas disponibles
export const ALERT_TYPES = {
    MEDICATION: "medicamento",
    EMERGENCY: "emergencia",
    APPOINTMENT: "cita",
    REVIEW: "revision",
    CALL: "llamada",
};

// Prioridades de alertas
export const ALERT_PRIORITIES = {
    LOW: "baja",
    MEDIUM: "media",
    HIGH: "alta",
    CRITICAL: "critica",
};

// Obtener todas las alertas del usuario
export const getAlerts = async (userId) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/alertas/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Crear nueva alerta
export const createAlert = async (alertData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/alertas`, alertData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Actualizar alerta
export const updateAlert = async (alertId, alertData) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/alertas/${alertId}`, alertData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Eliminar alerta
export const deleteAlert = async (alertId) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/alertas/${alertId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Marcar alerta como leída
export const markAlertAsRead = async (alertId) => {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
        `${API_URL}/alertas/${alertId}/leer`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

// Obtener configuración de alertas
export const getAlertConfig = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/alertas/configuracion`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Actualizar configuración de alertas
export const updateAlertConfig = async (config) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/alertas/configuracion`, config, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Obtener alertas por tipo
export const getAlertsByType = async (userId, type) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/alertas/${userId}?tipo=${type}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Obtener alertas activas (no leídas)
export const getActiveAlerts = async (userId) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/alertas/${userId}?activas=true`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
