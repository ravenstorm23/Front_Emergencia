import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Bell,
  ClipboardList,
  Users,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SidebarCuidador = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { path: "/dashboard-perfil-c", label: "Dashboard", icon: LayoutDashboard },
    { path: "/vincular-paciente", label: "Vincular Paciente", icon: Users },
    { path: "/tareas", label: "Actividades", icon: ClipboardList },
    { path: "/alertas-config", label: "Configurar Alertas", icon: Bell },
    { path: "/pacientes", label: "Pacientes", icon: Users },
    { path: "/calendario", label: "Calendario", icon: Calendar },
    { path: "/reportes", label: "Reportes", icon: FileText },
    { path: "/chat", label: "Mensajes", icon: MessageCircle },
    { path: "/configuracion", label: "Configuración", icon: Settings },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    // Limpiar sesión / tokens
    localStorage.removeItem("token"); // si usas token
    // Redirigir a login
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
        <div className="p-6 border-b">
          <div className="text-xl font-bold text-blue-600">Panel del Cuidador</div>
          {user.nombre && (
            <div className="text-sm text-gray-600 mt-1 font-medium">{user.nombre}</div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors ${active ? "bg-blue-100 text-blue-700 font-medium" : ""
                  }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 border-t w-full"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SidebarCuidador;
