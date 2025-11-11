import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Heart, Calendar, Users, UserCheck, Bell, AlertTriangle } from "lucide-react";

const SidebarA = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home size={22} />, label: "Inicio", path: "" }, // ruta vacía = index
    { icon: <Heart size={22} />, label: "Mi Salud", path: "salud" },
    { icon: <Calendar size={22} />, label: "Actividades", path: "actividades" },
    { icon: <Users size={22} />, label: "Mi Familia", path: "familia" },
    { icon: <UserCheck size={22} />, label: "Mi Cuidador", path: "cuidador" },
    { icon: <Bell size={22} />, label: "Notificaciones", path: "notificaciones" },
  ];

  // Función para manejar el clic en "Inicio" y recargar la página si ya estás en ella
  const handleClick = (path) => {
    if (path === "") {
      // Index del dashboard-mayor
      navigate("/dashboard-mayor", { replace: true });
      window.location.reload(); // recarga la página
    } else {
      navigate(path);
    }
  };

  return (
    <aside className="w-64 bg-[#5B9BD5] text-white flex flex-col items-center py-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">CuidApp</h1>

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

      {/* Emergencia destacada */}
      <NavLink
        to="emergencia"
        className="flex items-center gap-3 w-48 py-3 px-4 mt-auto rounded-xl bg-[#FF6B6B] text-white text-lg font-semibold"
      >
        <AlertTriangle size={22} />
        Emergencia
      </NavLink>
    </aside>
  );
};

export default SidebarA;
