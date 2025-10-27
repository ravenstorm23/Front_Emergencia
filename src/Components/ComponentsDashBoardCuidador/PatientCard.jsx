// ============================================
// ARCHIVO: src/Components/PatientCard.jsx
// DESCRIPCIÓN: Componente de tarjeta de paciente para el dashboard del cuidador
// ============================================

import { MapPin, Calendar, AlertCircle } from "lucide-react";

const PatientCard = ({ patient }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "estable":
        return "bg-green-100 text-green-800";
      case "atencion":
        return "bg-yellow-100 text-yellow-800";
      case "critico":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer">
      {/* Encabezado con nombre y estado */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-semibold text-lg">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{patient.name}</h4>
            <p className="text-sm text-gray-500">{patient.age} años</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            patient.status
          )}`}
        >
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </span>
      </div>

      {/* Información general */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{patient.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Próxima visita: {patient.nextVisit}</span>
        </div>

        {patient.alerts && patient.alerts.length > 0 && (
          <div className="flex items-start text-orange-600 mt-2 p-2 bg-orange-50 rounded">
            <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-xs">{patient.alerts[0]}</span>
          </div>
        )}
      </div>

      {/* Pie de tarjeta */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Última visita: {patient.lastVisit}</span>
          <span className="text-blue-600 font-medium">Ver detalles →</span>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
