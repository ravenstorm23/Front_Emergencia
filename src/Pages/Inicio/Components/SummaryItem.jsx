import React from 'react';
import { ChevronRight } from 'lucide-react';



export const SummaryItem = ({ icon: Icon, title, subtitle, status, onClick, color = 'blue' }) => {
  const statusConfig = {
    completed: { icon: '✅', text: 'Completado', color: 'text-green-600 bg-green-50' },
    pending: { icon: '⭕', text: 'Pendiente', color: 'text-gray-600 bg-gray-50' },
    upcoming: { icon: '⏰', text: 'Próximo', color: 'text-orange-600 bg-orange-50' },
    available: { icon: '✓', text: 'Disponible', color: 'text-green-600 bg-green-50' }
  };

  const statusInfo = statusConfig[status] || statusConfig.pending;

  return (
    <div 
      onClick={onClick}
      className="bg-white hover:bg-gray-50 rounded-xl p-5 border-2 border-gray-200 hover:border-blue-300 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 bg-${color}-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          <Icon size={28} className={`text-${color}-600`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-lg text-gray-600 mb-2">{subtitle}</p>
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
            <span>{statusInfo.icon}</span>
            <span>{statusInfo.text}</span>
          </span>
        </div>

        <ChevronRight size={24} className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
      </div>
    </div>
  );
};