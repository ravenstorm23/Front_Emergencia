import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Calendar size={28} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Fecha y Hora</h2>
      </div>
      
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-800">
          {formatDate(dateTime)}
        </p>
        <p className="text-5xl font-bold text-blue-600">
          {formatTime(dateTime)}
        </p>
      </div>
    </div>
  );
};

