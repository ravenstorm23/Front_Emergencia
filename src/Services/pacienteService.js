import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const getPacientes = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No hay token, devolviendo array vacío");
    return [];
  }

  try {
    console.log("Haciendo petición a /vincular...");
    const res = await axios.get(`${API_URL}/vincular`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Respuesta completa de /vincular:", res.data);

    if (!Array.isArray(res.data)) {
      console.error("La respuesta del servidor no es un array:", res.data);
      return [];
    }

    console.log(`Se recibieron ${res.data.length} vinculaciones`);

    // res.data es un array de vinculaciones
    // Mapeamos para extraer la información del paciente
    const pacientes = res.data.map((vinculacion, index) => {
      console.log(`Procesando vinculación ${index}:`, vinculacion);
      const paciente = vinculacion.pacienteId;

      if (!paciente) {
        console.warn(`Vinculación ${index} no tiene pacienteId`);
        return null;
      }

      console.log(`Paciente ${index} extraído:`, paciente);

      // Agregamos campos adicionales de la vinculación
      return {
        ...paciente,
        codigo: vinculacion.codigo_adulto_mayor,
        relacion: vinculacion.tipo_relacion,
        _id: paciente._id || paciente.id
      };
    }).filter(Boolean); // Filtra los nulls

    console.log("Pacientes procesados finales:", pacientes);
    return pacientes;
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    console.error("Detalles del error:", error.response?.data);
    return [];
  }
};
