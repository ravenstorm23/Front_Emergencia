import { useState, useEffect } from "react";
import SidebarCuidador from "./Components/SidebarCuidador";
import StatsCard from "./Components/StatsCard";
import AlertsPanel from "./Components/AlertsPanel";
import ActivityFeed from "./Components/ActivityFeed";
import QuickActions from "./Components/QuickActions";
import PatientCard from "./Components/PatientCard";
import Notificaciones from "./Components/Notificaciones"; 

import { Users, Heart, ClipboardList } from "lucide-react";

import { getPacientes } from "../../Services/pacienteService"; 
import { getActividades } from "../../Services/actividadService"; 
import { getAlertas } from "../../Services/alertaService"; 


const DashBoardPerfilC = () => {
  const [usuario, setUsuario] = useState(null);
  const [patients, setPatients] = useState([]);
  const [activities, setActivities] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioStorage) return;

    setUsuario(usuarioStorage);

    // Fetch pacientes, actividades y alertas
    getPacientes(usuarioStorage._id)
      .then(data => setPatients(data))
      .catch(err => console.error(err));

    getActividades(usuarioStorage._id)
      .then(data => setActivities(data))
      .catch(err => console.error(err));

    getAlertas(usuarioStorage._id)
      .then(data => setAlerts(data))
      .catch(err => console.error(err));

  }, []);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <SidebarCuidador />
      <div className="flex-1 overflow-y-auto p-6 relative">
        <h1 className="text-3xl font-bold mb-6">
          Panel del Cuidador {usuario?.nombre}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Pacientes activos" value={patients.length} icon={Users} bg="bg-white" text="text-gray-900" />
          <StatsCard title="Signos vitales monitoreados" value={activities.length} icon={Heart} bg="bg-white" text="text-gray-900" />
          <StatsCard title="Tareas completadas" value="23" icon={ClipboardList} bg="bg-white" text="text-gray-900" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ActivityFeed activities={activities} bg="bg-white" text="text-gray-900" />
          <AlertsPanel alerts={alerts} bg="bg-white" text="text-gray-900" />
        </div>

        <QuickActions bg="bg-white" text="text-gray-900" />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {patients.map(patient => (
            <PatientCard key={patient._id} patient={patient} bg="bg-white" text="text-gray-900" />
          ))}
        </div>

        <Notificaciones />
      </div>
    </div>
  );
};

export default DashBoardPerfilC;
