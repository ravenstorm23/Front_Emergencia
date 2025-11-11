import { WelcomeHeader } from './Components/WelcomeHeader';
import { DateTimeDisplay } from './Components/DateTimeDisplay';
import { WeatherWidget } from './Components/WeatherWidget';
import { MoodCheck } from './Components/MoodCheck';
import { DailySummary } from './Components/DailySummary';
import { QuickActions } from './Components/QuickActions';
import { HealthTip } from './Components/HealthTip';
import React, { useState } from 'react';

export const Inicio = ({ onNavigate }) => {
  const [currentMood, setCurrentMood] = useState(null);

  const userData = { name: 'Doña Marta', avatar: 'M' };
  const medications = [
    { id: 1, name: 'Losartán 50mg', time: '8:00 AM', taken: true },
    { id: 2, name: 'Metformina 850mg', time: '2:00 PM', taken: false },
    { id: 3, name: 'Atorvastatina 20mg', time: '8:00 PM', taken: false }
  ];
  const activities = [
    { id: 1, name: 'Caminar 15 minutos', description: 'Ejercicio de la mañana', completed: true },
    { id: 2, name: 'Leer 5 páginas', description: 'Libro: Cien años de soledad', completed: false },
    { id: 3, name: 'Llamar a Juan', description: 'Tu hijo', completed: false }
  ];
  const appointment = { doctor: 'María González', date: 'Mañana', time: '10:00 AM' };
  const caregiver = { name: 'Ana Martínez', available: true };
  const weather = { temperature: 24, condition: 'sunny' };
  const healthTip = "Recuerda tomar agua cada 2 horas. La hidratación es clave para tu salud y bienestar.";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <WelcomeHeader userName={userData.name} userAvatar={userData.avatar} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DateTimeDisplay />
        <WeatherWidget temperature={weather.temperature} condition={weather.condition} />
      </div>
      <MoodCheck savedMood={currentMood} onMoodSelect={setCurrentMood} />
      <DailySummary 
        medications={medications} 
        activities={activities} 
        appointment={appointment} 
        caregiver={caregiver} 
        onNavigate={onNavigate} 
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions onNavigate={onNavigate} />
        <HealthTip tip={healthTip} />
      </div>
    </div>
  );
};

export default Inicio;