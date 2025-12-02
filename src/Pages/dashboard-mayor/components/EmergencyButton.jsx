import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const EmergencyButton = () => {
  const [telefonoFamiliar, setTelefonoFamiliar] = useState('');

  useEffect(() => {
    // Obtener el teléfono del familiar desde localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const telefono = user.telefonoFamiliar || '';
    setTelefonoFamiliar(telefono);
    console.log('EmergencyButton: Teléfono del familiar:', telefono);
  }, []);

  if (!telefonoFamiliar) {
    // Si no hay teléfono registrado, mostrar mensaje
    return (
      <button
        onClick={() => alert('⚠️ Por favor registra un contacto de emergencia en Configuración')}
        className="fixed bottom-8 right-8 bg-gray-400 text-white p-6 rounded-full shadow-2xl hover:bg-gray-500 transition-all z-50 flex items-center justify-center cursor-not-allowed"
        title="Registra un contacto de emergencia"
      >
        <Phone size={32} />
      </button>
    );
  }

  return (
    <a
      href={`tel:${telefonoFamiliar}`}
      className="fixed bottom-8 right-8 bg-red-600 text-white p-6 rounded-full shadow-2xl hover:bg-red-700 hover:scale-110 transition-all animate-pulse z-50 flex items-center justify-center"
      title={`Llamar a emergencia: ${telefonoFamiliar}`}
    >
      <Phone size={32} />
    </a>
  );
};

export default EmergencyButton;
