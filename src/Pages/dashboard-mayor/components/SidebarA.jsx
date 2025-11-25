import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Heart, Calendar, Users, UserCheck, Bell, LogOut } from "lucide-react";

const SidebarA = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home size={22} />, label: "Inicio", path: "/dashboard-mayor" },
    { icon: <UserCheck size={22} />, label: "Vincular Cuidador", path: "/dashboard-mayor/vincular" },
    { icon: <Bell size={22} />, label: "Mis Alertas", path: "/dashboard-mayor/alertas" },
    { icon: <Heart size={22} />, label: "Mi Salud", path: "/dashboard-mayor/salud" },
    { icon: <Calendar size={22} />, label: "Actividades", path: "/dashboard-mayor/actividades" },
    { icon: <Users size={22} />, label: "Mi Familia", path: "/dashboard-mayor/familia" },
    { icon: <UserCheck size={22} />, label: "Mi Cuidador", path: "/dashboard-mayor/cuidador" },
    { icon: <Bell size={22} />, label: "Notificaciones", path: "/dashboard-mayor/notificaciones" },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-[#5B9BD5] text-white flex flex-col py-6">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold mb-2">CuidApp</h1>

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
      <div className="mt-auto flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-48 py-3 px-4 rounded-xl text-lg transition-all hover:bg-red-400 bg-red-500"
        >
          <LogOut size={22} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default SidebarA;

