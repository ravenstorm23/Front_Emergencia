import React, { useState } from 'react';

export const MoodCheck = ({ savedMood, onMoodSelect }) => {
  const [selected, setSelected] = useState(savedMood || null);
  const [showFeedback, setShowFeedback] = useState(false);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Bien', color: 'bg-green-100 hover:bg-green-200 border-green-300' },
    { id: 'neutral', emoji: '😐', label: 'Regular', color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300' },
    { id: 'sad', emoji: '😔', label: 'Mal', color: 'bg-red-100 hover:bg-red-200 border-red-300' }
  ];

  const handleSelect = (moodId) => {
    setSelected(moodId);
    onMoodSelect(moodId);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          ¿Cómo se siente hoy?
        </h2>
        <p className="text-xl text-gray-600">
          Su bienestar es importante para nosotros
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleSelect(mood.id)}
            className={`
              ${mood.color}
              ${selected === mood.id ? 'ring-4 ring-blue-500 scale-105' : ''}
              border-2 rounded-2xl p-6 transition-all duration-200 transform hover:scale-105
            `}
          >
            <div className="text-6xl mb-3">{mood.emoji}</div>
            <p className="text-xl font-semibold text-gray-800">{mood.label}</p>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center animate-pulse">
          <p className="text-lg text-blue-800 font-semibold">
            ✓ Gracias por compartir cómo te sientes
          </p>
        </div>
      )}
    </div>
  );
};

