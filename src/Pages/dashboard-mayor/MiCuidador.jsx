import React, { useState, useEffect } from "react";
import { User, Phone, Mail, MapPin, Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getLinkedCaregivers } from "../../services/vinculacionService";

const MiCuidador = () => {
    console.log("🔍 MiCuidador: Componente montado");
    const navigate = useNavigate();
    const [cuidadores, setCuidadores] = useState([]); // Cambio: plural y array vacío
    const [loading, setLoading] = useState(true);

    console.log("🔍 MiCuidador: Estado inicial - loading:", loading, "cuidadores:", cuidadores);

    useEffect(() => {
        const loadCuidador = async () => {
            try {
                const cuidadoresData = await getLinkedCaregivers();
                console.log("Cuidadores recibidos en MiCuidador:", cuidadoresData);
                if (Array.isArray(cuidadoresData) && cuidadoresData.length > 0) {
                    console.log("Datos de todos los cuidadores:", cuidadoresData);
                    setCuidadores(cuidadoresData); // Guardar TODOS los cuidadores
                } else {
                    console.log("No hay cuidadores o no es un array");
                }
            } catch (error) {
                console.error("Error al cargar cuidador:", error);
            } finally {
                setLoading(false);
            }
        };
        loadCuidador();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-gray-600">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={() => navigate("/dashboard-mayor")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
            >
                <ArrowLeft size={20} /> Volver
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Cuidadores</h1>

            {cuidadores.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={40} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-2">No tienes cuidadores vinculados</p>
                    <p className="text-sm text-gray-500">
                        Comparte tu código con un cuidador para empezar
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {cuidadores.map((cuidador, index) => (
                        <div key={cuidador.id || cuidador._id || index} className="bg-white p-8 rounded-2xl shadow-lg">
                            {/* Encabezado con avatar */}
                            <div className="flex items-center gap-6 mb-8 pb-6 border-b">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                    {cuidador.nombre?.charAt(0).toUpperCase() || "C"}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{cuidador.nombre}</h2>
                                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                                        <Heart size={16} className="text-red-500" />
                                        Tu cuidador
                                    </p>
                                </div>
                            </div>

                            {/* Información de contacto */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-blue-600 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Correo Electrónico</p>
                                            <p className="font-medium text-gray-800">{cuidador.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-green-600 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Teléfono</p>
                                            <p className="font-medium text-gray-800">
                                                {cuidador.telefono || "No registrado"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-red-600 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Dirección</p>
                                            <p className="font-medium text-gray-800">
                                                {cuidador.direccion || "No registrada"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="mt-8 pt-6 border-t flex gap-4">
                                <a
                                    href={`tel:${cuidador.telefono}`}
                                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                >
                                    <Phone size={20} />
                                    Llamar
                                </a>
                                <a
                                    href={`mailto:${cuidador.email}`}
                                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
                                >
                                    <Mail size={20} />
                                    Mensaje
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MiCuidador;
