import { useState, useEffect, useCallback } from "react";
import { getPacientes } from "../services/pacienteService";

export function usePacientes(usuarioId) {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPatients = useCallback(async () => {
        if (!usuarioId) return;
        setLoading(true);
        try {
            const data = await getPacientes(usuarioId);
            setPatients(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Error al cargar pacientes");
        } finally {
            setLoading(false);
        }
    }, [usuarioId]);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    return { patients, loading, error, refetch: fetchPatients };
}
