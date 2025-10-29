import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const heroMessages = [
    "CuidApp: Emergencias rápidas para adultos mayores",
    "Tu bienestar, nuestra prioridad",
    "Conecta ayuda en segundos",
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % heroMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-[90vh] text-center px-6 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-700">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg transition-all duration-700 animate-fade-in">
        {heroMessages[currentMessage]}
      </h1>
      <p className="mt-4 text-lg text-white/90 drop-shadow-md">
        Seguridad, rapidez y confianza para cada momento.
      </p>
      <button
        onClick={() => navigate("/registro")}
        className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-50 hover:scale-105 transition-all"
      >
        Unirse Ahora
      </button>
    </section>
  );
}

