

import React, { useState, useEffect } from 'react';
import { Heart,  Activity, User, AlertCircle} from 'lucide-react';



export const QuickActions = ({ onNavigate }) => {
  const actions = [
    { id: 'salud', icon: Heart, label: 'Mi Salud', color: 'bg-red-500 hover:bg-red-600' },
    { id: 'actividades', icon: Activity, label: 'Actividades', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'cuidador', icon: User, label: 'Mi Cuidador', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'emergencia', icon: AlertCircle, label: 'Emergencia', color: 'bg-red-600 hover:bg-red-700' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Accesos Rápidos</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`${action.color} text-white font-bold py-6 px-4 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg`}
            >
              <Icon size={32} className="mx-auto mb-2" />
              <span className="text-lg">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
