import { WelcomeHeader } from './Components/WelcomeHeader';
import { DateTimeDisplay } from './Components/DateTimeDisplay';
import { WeatherWidget } from './Components/WeatherWidget';
import { MoodCheck } from './Components/MoodCheck';
import { DailySummary } from './Components/DailySummary';
import { QuickActions } from './Components/QuickActions';
import { HealthTip } from './Components/HealthTip';
import React, { useState, useEffect } from 'react';
import { getLinkedCaregivers } from '../../services/vinculacionService';

export const Inicio = ({ onNavigate }) => {
  const [currentMood, setCurrentMood] = useState(null);
  const [caregiver, setCaregiver] = useState(null);

  // Obtener datos reales del usuario desde localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = storedUser.nombre || "Usuario";
  const userAvatar = userName.charAt(0).toUpperCase() || "U";
  const userData = { name: userName, avatar: userAvatar };

  // Cargar cuidador vinculado
  useEffect(() => {
    const loadCaregiver = async () => {
      try {
        const cuidadores = await getLinkedCaregivers();
        console.log("Cuidadores recibidos del backend:", cuidadores);
        console.log("Es un array?", Array.isArray(cuidadores));
        if (Array.isArray(cuidadores) && cuidadores.length > 0) {
          console.log("Primer cuidador:", cuidadores[0]);
          setCaregiver({
            name: cuidadores[0].nombre,
            available: true
          });
        } else {
          console.log("No hay cuidadores vinculados o la respuesta no es un array");
        }
      } catch (error) {
        console.error("Error al cargar cuidador:", error);
      }
    };
    loadCaregiver();
  }, []);

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
        medications={[]}
        activities={[]}
        appointment={null}
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