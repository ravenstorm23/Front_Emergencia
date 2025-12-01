import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Heart, Calendar, Users, UserCheck, Bell, LogOut, Menu, X } from "lucide-react";

const SidebarA = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <Home size={22} />, label: "Inicio", path: "/dashboard-mayor" },
    { icon: <UserCheck size={22} />, label: "Vincular Cuidador", path: "/dashboard-mayor/vincular" },
    { icon: <Bell size={22} />, label: "Mis Alertas", path: "/dashboard-mayor/alertas" },
    { icon: <Heart size={22} />, label: "Mi Salud", path: "/dashboard-mayor/salud" },
    { icon: <Calendar size={22} />, label: "Actividades", path: "/dashboard-mayor/actividades" },
    { icon: <Users size={22} />, label: "Mi Familia", path: "/dashboard-mayor/familia" },
    { icon: <UserCheck size={22} />, label: "Mi Cuidador", path: "/dashboard-mayor/cuidador" },
    { icon: <Bell size={22} />, label: "Notificaciones", path: "/dashboard-mayor/notificaciones" },
    { icon: <Users size={22} />, label: "Configuración", path: "/dashboard-mayor/configuracion" },
  ];

  const handleClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Botón menú móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#5B9BD5] text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed md:static top-0 left-0 h-full w-64 bg-[#5B9BD5] text-white flex flex-col py-6 z-40 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}>
        <div className="flex flex-col items-center space-y-4 overflow-y-auto flex-1">
          <h1 className="text-2xl font-bold mb-2 mt-8 md:mt-0">CuidApp</h1>

          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleClick(item.path)}
              className="flex items-center gap-3 w-48 py-3 px-4 rounded-xl text-lg transition-all hover:bg-[#A8D8B9]"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Botón de cerrar sesión - al final */}
        <div className="mt-auto flex justify-center pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-48 py-3 px-4 rounded-xl text-lg transition-all hover:bg-red-400 bg-red-500"
          >
            <LogOut size={22} />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarA;

