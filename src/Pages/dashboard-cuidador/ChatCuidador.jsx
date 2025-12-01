import React, { useState, useEffect, useRef } from "react";
import SidebarCuidador from "./components/SidebarCuidador";
import {
    obtenerConversaciones,
    obtenerConversacion,
    enviarMensaje,
    marcarComoLeido
} from "../../services/mensajesService";
import { MessageCircle, Send, User } from "lucide-react";

const ChatCuidador = () => {
    const [conversaciones, setConversaciones] = useState([]);
    const [conversacionActiva, setConversacionActiva] = useState(null);
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const mensajesEndRef = useRef(null);
    const pollingIntervalRef = useRef(null);

    const miId = JSON.parse(localStorage.getItem("usuario"))?._id;

    // Cargar lista de conversaciones al iniciar
    useEffect(() => {
        cargarConversaciones();
    }, []);

    // Polling para actualizar mensajes en tiempo real
    useEffect(() => {
        if (conversacionActiva) {
            // Polling cada 3 segundos
            pollingIntervalRef.current = setInterval(() => {
                cargarMensajes(conversacionActiva._id, false);
            }, 3000);
        }

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, [conversacionActiva]);

    // Auto-scroll al último mensaje
    useEffect(() => {
        mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    const cargarConversaciones = async () => {
        try {
            const data = await obtenerConversaciones();
            setConversaciones(data);
        } catch (error) {
            console.error("Error cargando conversaciones:", error);
        }
    };

    const cargarMensajes = async (usuarioId, mostrarLoading = true) => {
        try {
            if (mostrarLoading) setLoading(true);
            const data = await obtenerConversacion(usuarioId);
            setMensajes(data);

            // Marcar como leídos
            await marcarComoLeido(usuarioId);
        } catch (error) {
            console.error("Error cargando mensajes:", error);
        } finally {
            if (mostrarLoading) setLoading(false);
        }
    };

    const seleccionarConversacion = async (conversacion) => {
        setConversacionActiva(conversacion.usuario);
        await cargarMensajes(conversacion.usuario._id);

        // Actualizar la lista de conversaciones para quitar el indicador de no leídos
        await cargarConversaciones();
    };

    const handleEnviarMensaje = async (e) => {
        e.preventDefault();
        if (!nuevoMensaje.trim() || !conversacionActiva) return;

        try {
            await enviarMensaje(conversacionActiva._id, nuevoMensaje);
            setNuevoMensaje("");

            // Recargar mensajes inmediatamente
            await cargarMensajes(conversacionActiva._id, false);
            await cargarConversaciones();
        } catch (error) {
            console.error("Error enviando mensaje:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarCuidador />
            <main className="flex-1 flex overflow-hidden">
                {/* Lista de Conversaciones */}
                <aside className="w-80 bg-white border-r flex flex-col">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <MessageCircle className="text-blue-600" /> Mensajes
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversaciones.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                <p>No tienes conversaciones aún</p>
                            </div>
                        ) : (
                            conversaciones.map((conv) => (
                                <button
                                    key={conv.usuario._id}
                                    onClick={() => seleccionarConversacion(conv)}
                                    className={`w-full p-4 border-b hover:bg-gray-50 transition text-left ${conversacionActiva?._id === conv.usuario._id ? "bg-blue-50" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                                            {conv.usuario.nombre?.charAt(0) || "U"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <p className="font-semibold text-gray-800 truncate">
                                                    {conv.usuario.nombre}
                                                </p>
                                                {conv.noLeidos > 0 && (
                                                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                                        {conv.noLeidos}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">
                                                {conv.ultimoMensaje.contenido}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </aside>

                {/* Área de Chat */}
                <div className="flex-1 flex flex-col bg-gray-50">
                    {conversacionActiva ? (
                        <>
                            {/* Header de la conversación */}
                            <div className="bg-white p-4 border-b flex items-center gap-3 shadow-sm">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                                    {conversacionActiva.nombre?.charAt(0) || "U"}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{conversacionActiva.nombre}</h3>
                                    <p className="text-xs text-gray-500">{conversacionActiva.email}</p>
                                </div>
                            </div>

                            {/* Mensajes */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {loading ? (
                                    <div className="flex justify-center items-center h-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : mensajes.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <MessageCircle size={48} className="mb-2 opacity-20" />
                                        <p>No hay mensajes aún. ¡Envía el primero!</p>
                                    </div>
                                ) : (
                                    mensajes.map((msg) => {
                                        const esMio = msg.remitenteId._id === miId;
                                        return (
                                            <div
                                                key={msg._id}
                                                className={`flex ${esMio ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${esMio
                                                            ? "bg-blue-600 text-white rounded-br-none"
                                                            : "bg-white text-gray-800 rounded-bl-none"
                                                        }`}
                                                >
                                                    <p className="break-words">{msg.contenido}</p>
                                                    <p
                                                        className={`text-xs mt-1 ${esMio ? "text-blue-100" : "text-gray-400"
                                                            }`}
                                                    >
                                                        {new Date(msg.createdAt).toLocaleTimeString("es-ES", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={mensajesEndRef} />
                            </div>

                            {/* Input de mensaje */}
                            <form onSubmit={handleEnviarMensaje} className="bg-white p-4 border-t">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={nuevoMensaje}
                                        onChange={(e) => setNuevoMensaje(e.target.value)}
                                        placeholder="Escribe un mensaje..."
                                        className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!nuevoMensaje.trim()}
                                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition disabled:bg-blue-300"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <MessageCircle size={64} className="mb-4 opacity-20" />
                            <p className="text-lg">Selecciona una conversación para comenzar</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ChatCuidador;
