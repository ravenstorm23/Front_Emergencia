import React from 'react';
import { Plus, Calendar, FileText, Users, Phone, ClipboardList } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { id: 1, icon: Plus, label: 'Nueva Visita', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 2, icon: Calendar, label: 'Agendar Cita', color: 'bg-green-500 hover:bg-green-600' },
    { id: 3, icon: FileText, label: 'Nuevo Reporte', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 4, icon: Phone, label: 'Llamada', color: 'bg-orange-500 hover:bg-orange-600' },
    { id: 5, icon: ClipboardList, label: 'Nueva Tarea', color: 'bg-teal-500 hover:bg-teal-600' },
    { id: 6, icon: Users, label: 'Ver Pacientes', color: 'bg-indigo-500 hover:bg-indigo-600' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className={`${action.color} text-white p-4 rounded-lg transition-colors flex flex-col items-center justify-center text-center`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;