import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error: serverError, setError: setServerError } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
    rol: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.password) newErrors.password = "Contraseña requerida";
    else if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!formData.rol) newErrors.rol = "Debes seleccionar un rol";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register(formData);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Crear Cuenta</h1>

        {serverError && (
          <div className="p-3 bg-red-900/40 border border-red-700 rounded-lg mb-4 text-center text-red-300">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-2xl space-y-4 border border-gray-700"
        >
          <input type="text" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border" />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border" />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border" />
          <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border" />
          <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border" />
          <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border" />

          <select name="rol" value={formData.rol} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border">
            <option value="">-- Selecciona rol --</option>
            <option value="cuidador">👨‍⚕️ Cuidador</option>
            <option value="adulto mayor">👴 Adulto Mayor</option>
          </select>

          <button type="submit" disabled={isLoading} className={`w-full py-3 mt-4 bg-cyan-600 rounded-lg text-white font-bold ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 shadow-lg"}`}>
            {isLoading ? "Procesando..." : "Registrar"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-300">
          ¿Ya tienes cuenta?{" "}
          <button onClick={() => navigate("/login")} className="text-cyan-400 font-semibold">Inicia sesión</button>
        </p>
      </div>
    </div>
  );
}
