import React, { useState, useEffect } from "react";
import SidebarA from "./components/SidebarA";
import TopbarA from "./components/TopbarA";
import { User, Phone, Heart, Activity, Save } from "lucide-react";
import { updateUser } from "../../services/userService";
import Toast from "../../components/Toast";

const ConfiguracionMayor = () => {
    const [user, setUser] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        password: "",
        nombreFamiliar: "",
        telefonoFamiliar: "",
        medicamentos: "",
        enfermedades: "",
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser) {
            setUser({
                ...user,
                ...storedUser,
                password: "", // No mostrar contraseña actual
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
            if (!storedUser._id) throw new Error("No hay sesión activa");

            // Filtrar campos vacíos si es necesario, o enviar todo
            const dataToUpdate = { ...user };
            if (!dataToUpdate.password) delete dataToUpdate.password;

            const updatedUser = await updateUser(storedUser._id, dataToUpdate);

            // Actualizar localStorage
            localStorage.setItem("user", JSON.stringify(updatedUser));

            setToast({ type: "success", message: "Perfil actualizado correctamente" });
        } catch (error) {
            console.error("Error updating profile:", error);
            setToast({ type: "error", message: "Error al actualizar el perfil" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidebarA />
            <div className="flex-1 flex flex-col">
                <TopbarA />
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Configuración de Perfil</h1>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Información Personal */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <User size={24} />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={user.nombre}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            value={user.telefono}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            value={user.direccion}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            placeholder="Dejar en blanco para mantener actual"
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contacto Familiar */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                        <Phone size={24} />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Contacto Familiar</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Familiar</label>
                                        <input
                                            type="text"
                                            name="nombreFamiliar"
                                            value={user.nombreFamiliar}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-200 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono del Familiar</label>
                                        <input
                                            type="tel"
                                            name="telefonoFamiliar"
                                            value={user.telefonoFamiliar}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-200 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Información Médica */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                        <Activity size={24} />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Información Médica</h2>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Medicamentos (separados por coma)</label>
                                        <textarea
                                            name="medicamentos"
                                            value={user.medicamentos}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-200 outline-none"
                                            placeholder="Ej: Aspirina, Metformina..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Enfermedades / Condiciones</label>
                                        <textarea
                                            name="enfermedades"
                                            value={user.enfermedades}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-200 outline-none"
                                            placeholder="Ej: Hipertensión, Diabetes..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
                                >
                                    <Save size={20} />
                                    {loading ? "Guardando..." : "Guardar Cambios"}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default ConfiguracionMayor;
