import React, { useState, useEffect } from "react";
import SidebarCuidador from "./components/SidebarCuidador";
import CalendarioVistaMensual from "./components/CalendarioVistaMensual";
import CalendarioVistaSemanal from "./components/CalendarioVistaSemanal";
import CalendarioVistaDiaria from "./components/CalendarioVistaDiaria";
import FiltrosCalendario from "./components/FiltrosCalendario";
import { obtenerActividades } from "../../Services/actividadesService";
import { Calendar, List, Clock } from "lucide-react";

const CalendarioCuidador = () => {
  const [vista, setVista] = useState("mensual"); // mensual, semanal, diaria
  const [actividades, setActividades] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroPrioridad, setFiltroPrioridad] = useState("todas");
  const [loading, setLoading] = useState(true);

  const cargarActividades = async () => {
    try {
      setLoading(true);
      const data = await obtenerActividades();
      setActividades(data);
    } catch (error) {
      console.error("Error cargando actividades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  const actividadesFiltradas = actividades.filter((act) => {
    const cumpleTipo = filtroTipo === "todos" || act.tipo === filtroTipo;
    const cumplePrioridad = filtroPrioridad === "todas" || act.prioridad === filtroPrioridad;
    return cumpleTipo && cumplePrioridad;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarCuidador />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 pb-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Calendario de Actividades</h1>

            <div className="flex bg-white rounded-lg shadow-sm p-1">
              <button
                onClick={() => setVista("mensual")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${vista === "mensual" ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Calendar size={18} /> Mensual
              </button>
              <button
                onClick={() => setVista("semanal")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${vista === "semanal" ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <List size={18} /> Semanal
              </button>
              <button
                onClick={() => setVista("diaria")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${vista === "diaria" ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Clock size={18} /> Diaria
              </button>
            </div>
          </div>

          <FiltrosCalendario
            filtroTipo={filtroTipo}
            setFiltroTipo={setFiltroTipo}
            filtroPrioridad={filtroPrioridad}
            setFiltroPrioridad={setFiltroPrioridad}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {vista === "mensual" && (
                <CalendarioVistaMensual
                  actividades={actividadesFiltradas}
                  onActividadChange={cargarActividades}
                />
              )}
              {vista === "semanal" && (
                <CalendarioVistaSemanal
                  actividades={actividadesFiltradas}
                  onActividadChange={cargarActividades}
                />
              )}
              {vista === "diaria" && (
                <CalendarioVistaDiaria
                  actividades={actividadesFiltradas}
                  onActividadChange={cargarActividades}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CalendarioCuidador;
