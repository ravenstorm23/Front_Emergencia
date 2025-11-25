import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarA from "./components/SidebarA";
import TopbarA from "./components/TopbarA";
import EmergencyButton from "./components/EmergencyButton";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FAF7F2]">
      {/* Sidebar */}
      <SidebarA isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <TopbarA onMenuToggle={() => setSidebarOpen(true)} />

        {/* Área de contenido */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          {/* Aquí se renderiza la página actual */}
          <Outlet />
          <EmergencyButton />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
