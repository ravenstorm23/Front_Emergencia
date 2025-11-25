import React, { useState } from "react";
import {
    Heart,
    Activity,
    Footprints,
    Brain,
    TrendingUp,
    Target,
    Award,
    Sun,
    Moon,
    Droplets,
} from "lucide-react";

export default function MiSalud() {
    const [metrics] = useState({
        steps: 3247,
        heartRate: 72,
        sleep: 7.5,
        water: 6,
        bloodPressure: "120/80",
        weight: 70,
    });

    const healthGoals = [
        {
            id: 1,
            title: "Caminar Diario",
            target: "5,000 pasos",
            current: metrics.steps,
            max: 5000,
            icon: Footprints,
            color: "blue",
            tips: "Los paseos cortos después de las comidas ayudan a la digestión",
        },
        {
            id: 2,
            title: "Ritmo Cardíaco",
            target: "60-80 bpm",
            current: metrics.heartRate,
            max: 100,
            icon: Heart,
            color: "red",
            tips: "Un ritmo cardíaco estable indica buena salud cardiovascular",
        },
        {
            id: 3,
            title: "Horas de Sueño",
            target: "7-8 horas",
            current: metrics.sleep,
            max: 10,
            icon: Moon,
            color: "purple",
            tips: "El descanso adecuado mejora la memoria y el estado de ánimo",
        },
        {
            id: 4,
            title: "Hidratación",
            target: "8 vasos",
            current: metrics.water,
            max: 8,
            icon: Droplets,
            color: "cyan",
            tips: "Beber agua regularmente previene la deshidratación",
        },
    ];

    const quickActions = [
        {
            title: "Ejercicios Suaves",
            description: "Rutinas de estiramiento y movilidad",
            icon: Activity,
            color: "bg-green-500",
        },
        {
            title: "Bienestar Mental",
            description: "Ejercicios de memoria y relajación",
            icon: Brain,
            color: "bg-purple-500",
        },
        {
            title: "Mis Logros",
            description: "Ver progreso y medallas",
            icon: Award,
            color: "bg-yellow-500",
        },
    ];

    const getProgressColor = (color) => {
        const colors = {
            blue: "bg-blue-500",
            red: "bg-red-500",
            purple: "bg-purple-500",
            cyan: "bg-cyan-500",
        };
        return colors[color] || "bg-gray-500";
    };

    const getProgressPercent = (current, max) => {
        return Math.min((current / max) * 100, 100);
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-red-500 to-pink-500 p-4 rounded-2xl">
                        <Heart className="w-12 h-12 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Mi Salud</h1>
                        <p className="text-xl text-gray-600 mt-1">
                            Monitorea tu bienestar diario
                        </p>
                    </div>
                </div>
            </div>

            {/* Health Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {healthGoals.map((goal) => {
                    const Icon = goal.icon;
                    const progress = getProgressPercent(goal.current, goal.max);

                    return (
                        <div
                            key={goal.id}
                            className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${getProgressColor(goal.color)}`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {goal.title}
                                        </h3>
                                        <p className="text-gray-600">Meta: {goal.target}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {typeof goal.current === "number"
                                            ? goal.current.toLocaleString()
                                            : goal.current}
                                    </p>
                                    <p className="text-sm text-gray-500">actual</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className={`h-4 rounded-full ${getProgressColor(
                                            goal.color
                                        )} transition-all duration-500`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2 text-right">
                                    {Math.round(progress)}% completado
                                </p>
                            </div>

                            {/* Tip */}
                            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-current">
                                <p className="text-sm text-gray-700">💡 {goal.tips}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Vital Signs Summary */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-10 h-10" />
                    <h2 className="text-3xl font-bold">Signos Vitales</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Heart className="w-8 h-8" />
                            <h3 className="text-xl font-semibold">Presión Arterial</h3>
                        </div>
                        <p className="text-4xl font-bold">{metrics.bloodPressure}</p>
                        <p className="text-sm mt-1 opacity-90">mmHg</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="w-8 h-8" />
                            <h3 className="text-xl font-semibold">Frecuencia Cardíaca</h3>
                        </div>
                        <p className="text-4xl font-bold">{metrics.heartRate}</p>
                        <p className="text-sm mt-1 opacity-90">latidos/minuto</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Target className="w-8 h-8" />
                            <h3 className="text-xl font-semibold">Peso</h3>
                        </div>
                        <p className="text-4xl font-bold">{metrics.weight}</p>
                        <p className="text-sm mt-1 opacity-90">kg</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Actividades Recomendadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-105 text-left border-2 border-gray-100"
                            >
                                <div className={`${action.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {action.title}
                                </h3>
                                <p className="text-gray-600">{action.description}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Daily Wellness Tip */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-4">
                    <Sun className="w-12 h-12" />
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Consejo del Día</h3>
                        <p className="text-lg">
                            ☀️ Los 30 minutos de sol diarios ayudan a fortalecer tus huesos y mejorar tu estado de ánimo.
                            ¡Sal a caminar por el parque esta mañana!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
