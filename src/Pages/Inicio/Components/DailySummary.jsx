import React from 'react';
import { SummaryItem } from './SummaryItem';
import { Heart, Pill, Activity, Calendar, Phone, ChevronRight } from 'lucide-react';


export const DailySummary = ({ medications, activities, appointment, caregiver, onNavigate }) => {
  const pendingMeds = medications.filter(m => !m.taken);
  const nextMed = pendingMeds[0];
  
  const pendingActivities = activities.filter(a => !a.completed);
  const nextActivity = pendingActivities[0];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
          <Heart size={28} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Lo importante de hoy</h2>
          <p className="text-lg text-gray-600">Todo lo que necesitas saber</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Medicamentos */}
        {nextMed && (
          <SummaryItem
            icon={Pill}
            title={nextMed.name}
            subtitle={`Tomar a las ${nextMed.time}`}
            status={nextMed.taken ? 'completed' : 'upcoming'}
            color="blue"
            onClick={() => onNavigate('salud')}
          />
        )}

        {/* Actividades */}
        {nextActivity && (
          <SummaryItem
            icon={Activity}
            title={nextActivity.name}
            subtitle={nextActivity.description}
            status={nextActivity.completed ? 'completed' : 'pending'}
            color="green"
            onClick={() => onNavigate('actividades')}
          />
        )}

        {/* Cita médica */}
        {appointment && (
          <SummaryItem
            icon={Calendar}
            title={`Cita con Dr. ${appointment.doctor}`}
            subtitle={`${appointment.date} a las ${appointment.time}`}
            status="upcoming"
            color="purple"
            onClick={() => onNavigate('salud')}
          />
        )}

        {/* Estado del cuidador */}
        <div className="bg-white rounded-xl p-5 border-2 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {caregiver.name.charAt(0)}
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">{caregiver.name}</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-lg text-gray-600">Disponible ahora</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('cuidador')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition flex items-center gap-2"
            >
              <Phone size={24} />
              <span className="hidden md:inline">Llamar</span>
            </button>
          </div>
        </div>

        {/* Resumen numérico */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 text-center border-2 border-gray-200">
            <div className="text-3xl font-bold text-blue-600">{pendingMeds.length}</div>
            <div className="text-sm text-gray-600 mt-1">Medicamentos pendientes</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border-2 border-gray-200">
            <div className="text-3xl font-bold text-green-600">{pendingActivities.length}</div>
            <div className="text-sm text-gray-600 mt-1">Actividades del día</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border-2 border-gray-200">
            <div className="text-3xl font-bold text-purple-600">{appointment ? 1 : 0}</div>
            <div className="text-sm text-gray-600 mt-1">Citas próximas</div>
          </div>
        </div>
      </div>
    </div>
  );
};