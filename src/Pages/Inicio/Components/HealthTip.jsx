import React from 'react';
export const HealthTip = ({ tip }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
      <div className="flex items-start gap-4">
        <div className="text-4xl">💡</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Consejo del día</h3>
          <p className="text-lg text-gray-700">{tip}</p>
        </div>
      </div>
    </div>
  );
};