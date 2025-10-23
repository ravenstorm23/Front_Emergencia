// ============================================
// ARCHIVO: src/Pages/Login.jsx
// DESCRIPCIÓN: Login con fondo oscuro y acceso a registro
// ============================================

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importar para navegación

const Login = () => {
  const navigate = useNavigate(); // ✅ Hook para redirigir
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "El correo electrónico es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El correo electrónico no es válido";

    if (!formData.password) newErrors.password = "La contraseña es obligatoria";
    else if (formData.password.length < 6)
      newErrors.password = "Debe tener al menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const credencialesCorrectas =
        formData.email === "admin@cuidapp.com" && formData.password === "123456";

      if (credencialesCorrectas) {
        if (rememberMe) localStorage.setItem("userEmail", formData.email);
        alert("✅ ¡Login exitoso! (Simulación)");
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch {
      setErrors({
        general:
          "Credenciales incorrectas. Intenta con admin@cuidapp.com / 123456",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4 shadow-lg backdrop-blur-md">
            <span className="text-4xl">🏥</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            CuidApp
          </h1>
          <p className="text-gray-300 text-lg">Tu familia siempre protegida</p>
        </div>

        {/* Formulario */}
        <div className="bg-gray-800/80 rounded-2xl shadow-2xl p-8 md:p-10 backdrop-blur-md border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Iniciar Sesión
          </h2>

          {errors.general && (
            <div className="mb-4 p-4 bg-red-900/40 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={`w-full px-4 py-3 bg-gray-900/60 text-white border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-gray-900/60 text-white border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:ring-blue-500"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between text-gray-300">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">Recordarme</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Función de recuperación próximamente")}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón enviar */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-lg transition-all duration-300 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transform hover:scale-105"
              }`}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          {/* Link a registro */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => navigate("/registro")} // ✅ Redirección al formulario de registro
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CuidApp. Sistema de emergencias para adultos mayores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
