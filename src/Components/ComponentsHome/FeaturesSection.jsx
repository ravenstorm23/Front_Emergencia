import React, { useState } from "react";

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      title: "Emergencias Rápidas",
      text: "Conecta con servicios médicos y familiares al instante.",
      icon: "🚑",
      detail:
        "Nuestra función de emergencia prioriza la asistencia inmediata, conectando al adulto mayor con familiares o servicios médicos cercanos con un solo toque.",
    },
    {
      title: "Red de Apoyo",
      text: "Profesionales y cuidadores listos para asistir 24/7.",
      icon: "🤝",
      detail:
        "Contamos con una comunidad de cuidadores certificados y familiares conectados en tiempo real para brindar acompañamiento constante.",
    },
    {
      title: "Monitoreo Inteligente",
      text: "Alertas automáticas y notificaciones en tiempo real.",
      icon: "📱",
      detail:
        "La app detecta patrones inusuales y envía alertas automáticas a los contactos registrados, garantizando atención rápida ante cualquier eventualidad.",
    },
  ];

  return (
    <section className="relative py-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {/* Cards principales */}
      {features.map((card, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 text-center transform transition-all hover:scale-105 hover:shadow-2xl"
        >
          <div className="text-blue-600 dark:text-blue-400 text-7xl mb-5">
            {card.icon}
          </div>
          <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{card.text}</p>
          <button
            onClick={() => setSelectedFeature(card)}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Ver más
          </button>
        </div>
      ))}

      {/* Modal emergente */}
      {selectedFeature && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in px-4">
          <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl shadow-2xl max-w-lg w-full p-8">
            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold"
            >
              ×
            </button>

            {/* Contenido del modal */}
            <div className="text-center mt-4">
              <div className="text-6xl mb-4">{selectedFeature.icon}</div>
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {selectedFeature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {selectedFeature.detail}
              </p>

              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Unirse Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
