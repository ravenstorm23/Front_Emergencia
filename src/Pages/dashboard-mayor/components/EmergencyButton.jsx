import React from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmergencyButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard-mayor/emergencia")}
      className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full p-6 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center gap-3 group animate-pulse hover:animate-none"
      aria-label="Botón de emergencia"
    >
      <AlertTriangle className="w-10 h-10" />
      <span className="font-bold text-xl hidden group-hover:inline-block">
        EMERGENCIA
      </span>
    </button>
  );
};

export default EmergencyButton;
