import { useState } from "react";
import { LayoutDashboard, Bell, ClipboardList, Users, Calendar, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarCuidador = () => {
  const [active, setActive] = useState("dashboard");

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "actividades", label: "Actividades", icon: ClipboardList },
    { id: "alertas", label: "Alertas", icon: Bell },
    { id: "pacientes", label: "Pacientes", icon: Users },
    { id: "calendario", label: "Calendario", icon: Calendar },
    { id: "configuracion", label: "Configuración", icon: Settings },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-blue-600 border-b">ConexCare</div>

      {/* Menú principal */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={`/${item.id}`}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 ${
                active === item.id ? "bg-blue-100 text-blue-700 font-medium" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Cerrar sesión */}
      <button
        className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 border-t"
        onClick={() => console.log("Cerrar sesión")}
      >
        <LogOut className="w-5 h-5" />
        Cerrar sesión
      </button>
    </div>
  );
};

export default SidebarCuidador;
