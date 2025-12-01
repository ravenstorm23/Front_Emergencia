import axios from "axios";

const API_URL = "http://localhost:3000/api/reportes";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            "x-token": token,
        },
    };
};

export const generarReporte = async (pacienteId, filtros = {}) => {
    try {
        // Construir query string con filtros (fechaInicio, fechaFin)
        const params = new URLSearchParams();
        if (filtros.fechaInicio) params.append("fechaInicio", filtros.fechaInicio);
        if (filtros.fechaFin) params.append("fechaFin", filtros.fechaFin);

        const response = await axios.get(`${API_URL}/${pacienteId}?${params.toString()}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error al generar reporte:", error);
        throw error;
    }
};
