import React, { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);

  // cargar desde localStorage al inicio
  useEffect(() => {
    const raw = localStorage.getItem("tareasCuidador");
    if (raw) {
      try {
        setTareas(JSON.parse(raw));
      } catch (e) {
        console.error("Error leyendo tareas:", e);
        setTareas([]);
      }
    }
  }, []);

  // persistir cambios
  useEffect(() => {
    localStorage.setItem("tareasCuidador", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (payload) => {
    const tarea =
      typeof payload === "string"
        ? {
            id: Date.now(),
            texto: payload,
            completa: false,
            date: new Date().toISOString().split("T")[0],
            hora: "",
            tipo: "Tarea",
          }
        : {
            id: Date.now(),
            completa: false,
            ...payload,
          };

    setTareas((p) => [tarea, ...p]);
    return tarea;
  };

  const eliminarTarea = (id) => setTareas((p) => p.filter((t) => t.id !== id));
  const toggleTarea = (id) =>
    setTareas((p) => p.map((t) => (t.id === id ? { ...t, completa: !t.completa } : t)));
  const actualizarTarea = (id, changes) =>
    setTareas((p) => p.map((t) => (t.id === id ? { ...t, ...changes } : t)));

  const eliminarVariasTareas = (ids = []) =>
    setTareas((p) => p.filter((t) => !ids.includes(t.id)));

  return (
    <TaskContext.Provider
      value={{
        tareas,
        eventos: tareas, // alias para calendario
        agregarTarea,
        eliminarTarea,
        toggleTarea,
        actualizarTarea,
        eliminarVariasTareas,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
