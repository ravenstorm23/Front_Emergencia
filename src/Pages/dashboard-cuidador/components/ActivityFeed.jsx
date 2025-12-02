

import { Calendar, CheckCircle, FileText, Phone } from "lucide-react";

const ActivityFeed = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Actividad Reciente
      </h3>

      <div className="space-y-4">
        {!Array.isArray(activities) || activities.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No hay actividades registradas recientemente.
          </p>
        ) : (
          activities.map((activity, index) => {
            const Icon = activity.icon;
            const isLast = index === activities.length - 1;

            return (
              <div key={activity.id} className="relative">
                {/* Línea vertical entre los íconos */}
                {!isLast && (
                  <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200" />
                )}

                {/* Contenido */}
                <div className="flex items-start">
                  <div
                    className={`${activity.color} rounded-full p-2 flex-shrink-0 relative z-10`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {activity.description}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {activity.time}
                      </span>
                    </div>
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

export default ActivityFeed;
