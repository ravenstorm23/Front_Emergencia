import { useState, useEffect } from "react";
import SidebarCuidador from "./components/SidebarCuidador";
import StatsCard from "./components/StatsCard";
import AlertsPanel from "./components/AlertsPanel";
import ActivityFeed from "./components/ActivityFeed";
import QuickActions from "./components/QuickActions";
import PatientCard from "./components/PatientCard";
import Notificaciones from "./components/Notificaciones";

import { Users, Heart, ClipboardList } from "lucide-react";

import { usePacientes } from "../../hooks/usePacientes";
import { useActividades } from "../../hooks/useActividades";
import { getAlertas } from "../../services/alertaService";


const DashBoardPerfilC = () => {
  const [usuario, setUsuario] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Obtenemos usuario del storage para pasar el ID a los hooks
  useEffect(() => {
    const usuarioStorage = JSON.parse(localStorage.getItem("user"));
    if (usuarioStorage) setUsuario(usuarioStorage);
  }, []);

  const { patients, loading: loadingPatients } = usePacientes(usuario?._id);
  const { activities, loading: loadingActivities } = useActividades(usuario?._id);

  useEffect(() => {
    if (!usuario?._id) return;
    getAlertas(usuario._id)
      .then(data => setAlerts(data))
      .catch(err => console.error(err));
  }, [usuario]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <SidebarCuidador />
      <div className="flex-1 overflow-y-auto p-6 relative">
        <h1 className="text-3xl font-bold mb-6">
          Panel del Cuidador {usuario?.nombre}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Pacientes activos" value={Array.isArray(patients) ? patients.length : 0} icon={Users} bg="bg-white" text="text-gray-900" />
          <StatsCard title="Signos vitales monitoreados" value={Array.isArray(activities) ? activities.length : 0} icon={Heart} bg="bg-white" text="text-gray-900" />
          <StatsCard title="Tareas pendientes" value={Array.isArray(activities) ? activities.filter(a => a.estado === 'pendiente').length : 0} icon={ClipboardList} bg="bg-white" text="text-gray-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ActivityFeed activities={activities} bg="bg-white" text="text-gray-900" />
          <AlertsPanel alerts={alerts} bg="bg-white" text="text-gray-900" />
        </div>

        <QuickActions bg="bg-white" text="text-gray-900" />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.isArray(patients) && patients.map(patient => (
            <PatientCard key={patient._id} patient={patient} bg="bg-white" text="text-gray-900" />
          ))}
        </div>

        <Notificaciones alerts={alerts} />
      </div>
    </div>
  );
};

export default DashBoardPerfilC;
