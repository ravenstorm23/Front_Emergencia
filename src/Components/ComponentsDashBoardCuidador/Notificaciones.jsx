// src/Components/Notificationes.jsx
import React, { useState } from "react";
import { Bell, X } from "lucide-react";
import AlertsPanel from "./AlertsPanel";

const Notificaciones = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
        
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition relative"
      >
        <Bell className="w-6 h-6" />
        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          3
        </span>
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-gray-900">Notificaciones</h4>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <AlertsPanel />
        </div>
      )}
    </div>
  );
};

export default Notificaciones;
