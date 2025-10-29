import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Bell,
  ClipboardList,
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SidebarCuidador = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menu = [
    { path: "/dashboard-perfil-c", label: "Dashboard", icon: LayoutDashboard },
    { path: "/tareas", label: "Actividades", icon: ClipboardList },
    { path: "/alertas", label: "Alertas", icon: Bell },
    { path: "/pacientes", label: "Pacientes", icon: Users },
    { path: "/calendario", label: "Calendario", icon: Calendar },
    { path: "/configuracion", label: "Configuración", icon: Settings },
  ];

  useEffect(() => {
    // cerrar menú móvil al cambiar ruta
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen((s) => !s)}
        aria-label="Abrir menú"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">CuidApp</div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors ${
                  active ? "bg-blue-100 text-blue-700 font-medium" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/logout"
          className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 border-t"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </Link>
      </aside>

      {/* overlay móvil */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default SidebarCuidador;
