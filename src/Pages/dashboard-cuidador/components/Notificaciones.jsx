import React, { useState, useEffect } from "react";
import { Bell, X, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { obtenerNotificaciones, marcarNotificacionLeida } from "../../../services/notificacionesService";

const Notificaciones = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar notificaciones al abrir
  useEffect(() => {
    if (isOpen) {
      cargarNotificaciones();
    }
  }, [isOpen]);

  // Polling cada 30 segundos para nuevas notificaciones
  useEffect(() => {
    cargarNotificaciones();
    const interval = setInterval(cargarNotificaciones, 30000);
    return () => clearInterval(interval);
  }, []);

  const cargarNotificaciones = async () => {
    try {
      // Solo cargar si hay token de sesión
      const token = localStorage.getItem("token");
      if (!token) {
        setNotificaciones([]);
        return;
      }

      setLoading(true);
      const data = await obtenerNotificaciones();
      setNotificaciones(data);
    } catch (error) {
      console.error("Error cargando notificaciones:", error);
      // Si es error 401, limpiar notificaciones
      if (error.response?.status === 401) {
        setNotificaciones([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMarcarLeida = async (id) => {
    try {
      await marcarNotificacionLeida(id);
      await cargarNotificaciones();
    } catch (error) {
      console.error("Error marcando notificación:", error);
    }
  };

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  const getIconByType = (tipo) => {
    switch (tipo) {
      case 'urgente':
      case 'emergency':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
      case 'advertencia':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgByType = (tipo) => {
    switch (tipo) {
      case 'urgente':
      case 'emergency':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'warning':
      case 'advertencia':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      default:
        return 'bg-blue-50 border-l-4 border-blue-500';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón flotante mejorado */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative ${noLeidas > 0
          ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/50"
          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30"
          } text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95`}
        title="Notificaciones"
      >
        <Bell className={`w-6 h-6 ${noLeidas > 0 ? 'animate-pulse' : ''}`} />
        {noLeidas > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center border-2 border-white shadow-md px-1.5 animate-bounce">
            {noLeidas > 99 ? '99+' : noLeidas}
          </span>
        )}
      </button>

      {/* Panel de notificaciones mejorado */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificaciones
                </h4>
                <p className="text-xs text-blue-100 mt-0.5">
                  {noLeidas === 0 ? 'Todo al día' : `${noLeidas} sin leer`}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white  hover:bg-white/20 rounded-full p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lista de notificaciones */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : notificaciones.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <Bell size={40} className="mb-2 opacity-20" />
                <p className="text-sm">No hay notificaciones</p>
              </div>
            ) : (
              notificaciones.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${!notif.leida ? 'bg-blue-50/40' : ''
                    }`}
                  onClick={() => handleMarcarLeida(notif._id)}
                >
                  <div className={`flex gap-3 p-3 rounded-lg ${getBgByType(notif.tipo)}`}>
                    <div className="flex-shrink-0 mt-0.5">
                      {getIconByType(notif.tipo)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-semibold text-gray-900 text-sm">
                          {notif.titulo}
                        </h5>
                        {!notif.leida && (
                          <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                        {notif.mensaje}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notif.fechaCreacion || notif.createdAt).toLocaleString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificaciones;
