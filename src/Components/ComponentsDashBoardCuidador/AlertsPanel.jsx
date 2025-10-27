// ============================================
// ARCHIVO: src/Components/AlertsPanel.jsx
// DESCRIPCIÓN: Panel dinámico de alertas (para el cuidador)
// ============================================

import { AlertCircle, AlertTriangle, Info, X } from "lucide-react";

const AlertsPanel = ({ alerts = [], onDismiss }) => {
  const getAlertStyle = (type) => {
    switch (type) {
      case "urgent":
        return {
          bg: "bg-red-50 border-red-200",
          icon: AlertCircle,
          iconColor: "text-red-600",
          titleColor: "text-red-900",
        };
      case "warning":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          icon: AlertTriangle,
          iconColor: "text-yellow-600",
          titleColor: "text-yellow-900",
        };
      case "info":
        return {
          bg: "bg-blue-50 border-blue-200",
          icon: Info,
          iconColor: "text-blue-600",
          titleColor: "text-blue-900",
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-200",
          icon: Info,
          iconColor: "text-gray-600",
          titleColor: "text-gray-900",
        };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Alertas</h3>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {alerts.filter((a) => a.type === "urgent").length}
        </span>
      </div>

      {/* Contenedor de alertas */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No hay alertas recientes.
          </p>
        ) : (
          alerts.map((alert) => {
            const style = getAlertStyle(alert.type);
            const Icon = style.icon;
            return (
              <div
                key={alert.id}
                className={`${style.bg} border rounded-lg p-4 relative`}
              >
                <button
                  onClick={() => onDismiss && onDismiss(alert.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-start">
                  <Icon
                    className={`w-5 h-5 ${style.iconColor} mr-3 flex-shrink-0 mt-0.5`}
                  />
                  <div className="flex-1">
                    <h4 className={`font-semibold text-sm ${style.titleColor}`}>
                      {alert.title}
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {alert.message}
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      {alert.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;
