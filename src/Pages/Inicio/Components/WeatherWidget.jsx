import React from 'react';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

export const WeatherWidget = ({ temperature, condition }) => {
  const weatherConfig = {
    sunny: {
      icon: Sun,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      recommendation: 'Buen día para salir a caminar'
    },
    cloudy: {
      icon: Cloud,
      color: 'text-gray-500',
      bg: 'bg-gray-50',
      recommendation: 'Día tranquilo, perfecto para actividades en casa'
    },
    rainy: {
      icon: CloudRain,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      recommendation: 'Mejor quedarse en casa hoy'
    },
    windy: {
      icon: Wind,
      color: 'text-cyan-500',
      bg: 'bg-cyan-50',
      recommendation: 'Abrígate bien si sales'
    }
  };

  const config = weatherConfig[condition] || weatherConfig.sunny;
  const WeatherIcon = config.icon;

  return (
    <div className={`${config.bg} rounded-2xl p-6 border-2 border-gray-200 shadow-sm`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-16 h-16 ${config.bg} rounded-xl flex items-center justify-center`}>
          <WeatherIcon size={36} className={config.color} />
        </div>
        <div>
          <p className="text-5xl font-bold text-gray-800">{temperature}°C</p>
          <p className="text-xl text-gray-600 capitalize">{condition === 'sunny' ? 'Soleado' : condition}</p>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-50 rounded-xl p-4">
        <p className="text-lg text-gray-700">
          💡 {config.recommendation}
        </p>
      </div>
    </div>
  );
};
