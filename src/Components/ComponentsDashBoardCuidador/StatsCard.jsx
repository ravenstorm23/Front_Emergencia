// ============================================
// ARCHIVO: src/Components/StatsCard.jsx
// DESCRIPCIÓN: Componente de tarjeta de estadísticas reutilizable
// ============================================

import React from "react";

const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        {Icon && (
          <div className="bg-blue-100 p-2 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
