import React, { useState, useEffect } from "react";
import { Phone, User, Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MiFamilia = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        setUsuario(storedUser);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-gray-600">Cargando...</p>
            </div>
        );
    }

    const tieneFamiliar = usuario?.nombreFamiliar && usuario?.telefonoFamiliar;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={() => navigate("/dashboard-mayor")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
            >
                <ArrowLeft size={20} /> Volver
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Familia</h1>

            {!tieneFamiliar ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={40} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-2">No tienes contactos familiares registrados</p>
                    <p className="text-sm text-gray-500">
                        Ve a Configuración para agregar información de tu familiar
                    </p>
                    <button
                        onClick={() => navigate("/dashboard-mayor/configuracion")}
                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition"
                    >
                        Ir a Configuración
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        {/* Encabezado */}
                        <div className="flex items-center gap-6 mb-8 pb-6 border-b">
                            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                {usuario.nombreFamiliar?.charAt(0).toUpperCase() || "F"}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{usuario.nombreFamiliar}</h2>
                                <p className="text-gray-600 flex items-center gap-2 mt-1">
                                    <Heart size={16} className="text-red-500" />
                                    Contacto familiar
                                </p>
                            </div>
                        </div>

                        {/* Información de contacto */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                <Phone className="w-6 h-6 text-green-600 mt-1" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                                    <p className="text-xl font-semibold text-gray-800">{usuario.telefonoFamiliar}</p>
                                </div>
                                <a
                                    href={`tel:${usuario.telefonoFamiliar}`}
                                    className="bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition"
                                >
                                    Llamar
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Emergencia */}
                    <div className="bg-red-50 border-2 border-red-200 p-6 rounded-2xl">
                        <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            En caso de emergencia
                        </h3>
                        <p className="text-red-700 mb-4">
                            Presiona el botón de emergencia en la pantalla principal o llama directamente a tu familiar.
                        </p>
                        <a
                            href={`tel:${usuario.telefonoFamiliar}`}
                            className="bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 transition inline-flex items-center gap-2 font-semibold"
                        >
                            <Phone size={20} />
                            Llamar Ahora
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MiFamilia;
