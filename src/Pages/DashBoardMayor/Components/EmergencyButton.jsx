import React from "react";
import { useNavigate } from "react-router-dom";
import { PhoneCall } from "lucide-react";

const EmergencyButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboardA/emergencia")}
      className="fixed bottom-6 right-6 bg-[#FF6B6B] hover:bg-red-600 text-white p-4 rounded-full shadow-2xl transition-all focus:outline-none"
    >
      <PhoneCall size={28} />
    </button>
  );
};

export default EmergencyButton;
