import React, { useState, useEffect } from 'react';



export const WelcomeHeader = ({ userName, userAvatar }) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('¡Buenos días');
    } else if (hour >= 12 && hour < 19) {
      setGreeting('¡Buenas tardes');
    } else {
      setGreeting('¡Buenas noches');
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm border-4 border-white border-opacity-30">
          {userAvatar || userName?.charAt(0) || 'U'}
        </div>
        
        {/* Saludo */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {greeting}, {userName}! 👋
          </h1>
          <p className="text-xl text-blue-100">
            Es un placer verte hoy
          </p>
        </div>
      </div>
    </div>
  );
};
