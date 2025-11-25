import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tareas, setTareas] = useLocalStorage("tareasCuidador", []);

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
