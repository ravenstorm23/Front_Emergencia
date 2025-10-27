
import SidebarCuidador from "../Components/ComponentsDashBoardCuidador/SidebarCuidador";
import StatsCard from "../Components/ComponentsDashBoardCuidador/StatsCard";
import AlertsPanel from "../Components/ComponentsDashBoardCuidador/AlertsPanel";
import ActivityFeed from "../Components/ComponentsDashBoardCuidador/ActivityFeed";
import QuickActions from "../Components/ComponentsDashBoardCuidador/QuickActions";
import PatientCard from "../Components/ComponentsDashBoardCuidador/PatientCard";
import NotificacionesBell from "../Components/ComponentsDashBoardCuidador/NotificacionesBell";

import { Users, Heart, ClipboardList } from "lucide-react";

const DashboardCuidador = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* ======= SIDEBAR ======= */}
      <SidebarCuidador />

      {/* ======= CONTENIDO PRINCIPAL ======= */}
      <div className="flex-1 overflow-y-auto p-6 relative">
        <h1 className="text-2xl font-bold mb-6">Panel del Cuidador</h1>

        {/* ======= SECCIÓN DE ESTADÍSTICAS ======= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Pacientes activos" value="12" icon={Users} />
          <StatsCard title="Signos vitales monitoreados" value="58" icon={Heart} />
          <StatsCard title="Tareas completadas" value="23" icon={ClipboardList} />
        </div>

        {/* ======= SECCIÓN PRINCIPAL (ACTIVIDAD / ALERTAS) ======= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityFeed />
          <AlertsPanel />
        </div>

        {/* ======= ACCIONES RÁPIDAS ======= */}
        <div className="mt-6">
          <QuickActions />
        </div>

        {/* ======= TARJETAS DE PACIENTES ======= */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <PatientCard name="María García" condition="Hipertensión" lastVisit="Hace 2h" />
          <PatientCard name="Juan Pérez" condition="Diabetes Tipo II" lastVisit="Ayer" />
          <PatientCard name="Ana Rodríguez" condition="Artrosis leve" lastVisit="Hace 4h" />
        </div>

        {/* ======= CAMPANA DE NOTIFICACIONES ======= */}
        <NotificacionesBell />
      </div>
    </div>
  );
};

export default DashboardCuidador;
