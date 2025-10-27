import React from "react";
import { CheckCircle, Circle, Clock, AlertCircle } from "lucide-react";

const TaskList = ({ tasks = [], onToggleTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "text-red-600";
      case "media":
        return "text-yellow-600";
      case "baja":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getPriorityIcon = (priority) => {
    return priority === "alta" ? AlertCircle : Clock;
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">
        No hay tareas asignadas.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => {
        const PriorityIcon = getPriorityIcon(task.priority);

        return (
          <div
            key={task.id}
            className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow ${
              task.completed ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start">
              <button
                onClick={() => onToggleTask(task.id)}
                className="mr-3 mt-1 flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 hover:text-blue-500" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4
                    className={`font-medium ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h4>
                  <div
                    className={`flex items-center ml-2 ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    <PriorityIcon className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium uppercase">
                      {task.priority}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-1">{task.patient}</p>

                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{task.time}</span>
                  {task.duration && (
                    <span className="ml-2">• {task.duration}</span>
                  )}
                </div>

                {task.notes && !task.completed && (
                  <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {task.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
