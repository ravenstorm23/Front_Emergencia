import React from "react";
import { CheckCircle, Circle, Clock, AlertCircle } from "lucide-react";

const TaskList = ({ tasks = [], onToggleTask, onDeleteTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta": return "text-red-600";
      case "media": return "text-yellow-600";
      case "baja": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getPriorityIcon = (priority) => (priority === "alta" ? AlertCircle : Clock);

  if (tasks.length === 0) {
    return <div className="text-center text-gray-500 mt-6">No hay tareas pendientes.</div>;
  }

  return (
    <div className="space-y-2 mt-4">
      {tasks.map((task) => {
        const PriorityIcon = getPriorityIcon(task.priority);
        return (
          <div key={task.id} className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition ${task.completed ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <button onClick={() => onToggleTask(task.id)} className="mr-3 mt-1 flex-shrink-0">
                  {task.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-gray-400 hover:text-blue-500" />}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                      {task.titulo}
                    </h4>
                    <PriorityIcon className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                  </div>
                  {task.patient && <div className="text-sm text-gray-600">{task.patient}</div>}
                  {task.time && <div className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{task.time}</div>}
                  {task.notes && !task.completed && <div className="mt-1 text-sm text-gray-600 bg-gray-50 p-1 rounded">{task.notes}</div>}
                </div>
              </div>
              <button onClick={() => onDeleteTask(task.id)} className="text-red-600 hover:underline text-sm">Eliminar</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
