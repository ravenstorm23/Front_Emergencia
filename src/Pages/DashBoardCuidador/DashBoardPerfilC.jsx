// ============================================
// ARCHIVO: src/Pages/DashBoardPerfilC.jsx
// DESCRIPCIÓN: Dashboard completo del cuidador listo para funcionar
// ============================================

import SidebarCuidador from "./Components/SidebarCuidador";
import StatsCard from "./Components/StatsCard";
import AlertsPanel from "./Components/AlertsPanel";
import ActivityFeed from "./Components/ActivityFeed";
import QuickActions from "./Components/QuickActions";
import PatientCard from "./Components/PatientCard";
import Notificaciones from "./Components/Notificaciones"; 

import { Users, Heart, ClipboardList } from "lucide-react";

const DashBoardPerfilC = () => {
  // Datos de ejemplo
  const activities = [
    { id: 1, icon: Users, color: "bg-blue-500 text-white", title: "Paciente agregado", description: "María García se agregó a tu lista", time: "10 min" },
    { id: 2, icon: Heart, color: "bg-red-500 text-white", title: "Signo vital", description: "Juan Pérez: presión arterial alta", time: "1 h" },
  ];

  const alerts = [
    { id: 1, type: "urgent", title: "Alerta crítica", message: "Paciente Ana Rodríguez requiere atención inmediata", time: "Hace 5 min" },
    { id: 2, type: "warning", title: "Recordatorio", message: "Revisar signos vitales de Juan Pérez", time: "Hace 30 min" },
  ];

  const patients = [
    { name: "María García", age: 70, status: "estable", location: "Medellín", nextVisit: "Mañana", lastVisit: "Hace 2h", alerts: [] },
    { name: "Juan Pérez", age: 65, status: "atencion", location: "Medellín", nextVisit: "Hoy", lastVisit: "Ayer", alerts: ["Presión arterial alta"] },
    { name: "Ana Rodríguez", age: 68, status: "critico", location: "Medellín", nextVisit: "Hoy", lastVisit: "Hace 4h", alerts: ["Dolor intenso en articulaciones"] },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* ======= SIDEBAR ======= */}
      <SidebarCuidador />

      {/* ======= CONTENIDO PRINCIPAL ======= */}
      <div className="flex-1 overflow-y-auto p-6 relative">
        <h1 className="text-3xl font-bold mb-6">Panel del Cuidador</h1>

        {/* ======= SECCIÓN DE ESTADÍSTICAS ======= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Pacientes activos" value={patients.length} icon={Users} bg="bg-white" text="text-gray-900" />
          <StatsCard title="Signos vitales monitoreados" value="58" icon={Heart} bg="bg-white" text="text-gray-900" />
          <StatsCard title="Tareas completadas" value="23" icon={ClipboardList} bg="bg-white" text="text-gray-900" />
        </div>

        {/* ======= SECCIÓN PRINCIPAL (ACTIVIDAD / ALERTAS) ======= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ActivityFeed activities={activities} bg="bg-white" text="text-gray-900" />
          <AlertsPanel alerts={alerts} bg="bg-white" text="text-gray-900" />
        </div>

        {/* ======= ACCIONES RÁPIDAS ======= */}
        <div className="mt-6">
          <QuickActions bg="bg-white" text="text-gray-900" />
        </div>

        {/* ======= TARJETAS DE PACIENTES ======= */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <PatientCard key={patient.name} patient={patient} bg="bg-white" text="text-gray-900" />
          ))}
        </div>

        {/* ======= CAMPANA DE NOTIFICACIONES ======= */}
        <Notificaciones /> {/* Campana funcional */}
      </div>
    </div>
  );
};

export default DashBoardPerfilC;
