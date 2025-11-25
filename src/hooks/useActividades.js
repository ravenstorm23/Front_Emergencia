import { useState, useEffect, useCallback } from "react";
import { getActividades } from "../services/actividadService";

export function useActividades(usuarioId) {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchActivities = useCallback(async () => {
        if (!usuarioId) return;
        setLoading(true);
        try {
            const data = await getActividades(usuarioId);
            setActivities(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Error al cargar actividades");
        } finally {
            setLoading(false);
        }
    }, [usuarioId]);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    return { activities, loading, error, refetch: fetchActivities };
}
