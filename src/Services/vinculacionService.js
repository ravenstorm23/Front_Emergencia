import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Generar código único para adulto mayor
export const generateCode = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        `${API_URL}/perfil-mayor/generar-codigo`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

// Obtener código del adulto mayor
export const getCode = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/perfil-mayor/codigo`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Vincular adulto mayor con cuidador usando código
export const linkWithCaregiver = async (code) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        `${API_URL}/perfil-mayor/vincular-cuidador`,
        { codigo: code },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

// Obtener cuidadores vinculados (adulto mayor)
export const getLinkedCaregivers = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/perfil-mayor/cuidadores`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Respuesta completa del backend:", response.data);

        // El backend devuelve { cuidadores: [...] }
        const cuidadores = response.data.cuidadores || response.data;

        console.log("Cuidadores extraídos:", cuidadores);

        if (!Array.isArray(cuidadores)) {
            console.error("Los cuidadores no son un array:", cuidadores);
            return [];
        }

        // Los cuidadores ya vienen con toda la info (nombre, email, telefono, direccion)
        return cuidadores;
    } catch (error) {
        console.error("Error al obtener cuidadores:", error);
        return [];
    }
};

// Vincular paciente con código (cuidador)
export const linkPatientWithCode = async (code, relationship) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        `${API_URL}/vincular`,
        {
            codigo_adulto_mayor: code,
            tipo_relacion: relationship
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};
