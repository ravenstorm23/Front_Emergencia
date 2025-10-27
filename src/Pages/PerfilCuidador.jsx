/**
 * PerfilCuidador.jsx
 * 
 * Paso 2 del registro — Vinculación del cuidador con un adulto mayor.
 * Si el usuario decide no vincularse aún, lo lleva igual al DashboardCuidador.
 */

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PerfilCuidador() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera los datos del registro anterior o del localStorage
  const [userData, setUserData] = useState(() => {
    if (location.state?.userData) {
      return location.state.userData;
    }
    try {
      const stored = localStorage.getItem("pendingUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Si no hay datos del paso anterior, redirige al registro
  useEffect(() => {
    if (!userData) {
      navigate("/register");
    }
  }, [userData, navigate]);

  // Datos del formulario de vinculación
  const [formData, setFormData] = useState({
    codigo_adulto_mayor: "",
    tipo_relacion: "",
    es_contacto_principal: false,
    puede_ver_ubicacion: true,
    puede_recibir_alertas: true,
    puede_gestionar_medicamentos: false,
    notas: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Maneja cambios de campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Validar campos
  const validate = () => {
    const newErrors = {};
    if (!formData.codigo_adulto_mayor.trim()) {
      newErrors.codigo_adulto_mayor = "El código del adulto mayor es obligatorio";
    }
    if (!formData.tipo_relacion.trim()) {
      newErrors.tipo_relacion = "Debe especificar la relación con el adulto mayor";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Aquí podrías guardar la vinculación en el backend.
      console.log("Vinculación registrada:", { userData, formData });

      // Guardamos como "usuario activo"
      localStorage.setItem("activeUser", JSON.stringify(userData));

      // Redirigir al dashboard del cuidador
      navigate("/dashboard-cuidador");
    } catch (error) {
      setErrors({ general: "Error al registrar la vinculación" });
    } finally {
      setIsLoading(false);
    }
  };

  // Si el usuario decide vincular más tarde
  const handleSkip = () => {
    localStorage.setItem("activeUser", JSON.stringify(userData));
    navigate("/dashboard-cuidador");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <div className="w-full max-w-lg bg-gray-800/80 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700">
        <div className="text-center mb-6">
          <span className="text-5xl">👨‍⚕️</span>
          <h1 className="text-3xl font-bold mt-2">Vincular con Adulto Mayor</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Paso 2 de 2: Registra la relación o vincula más tarde
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-3 bg-red-900/40 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Código del Adulto Mayor *
            </label>
            <input
              type="text"
              name="codigo_adulto_mayor"
              value={formData.codigo_adulto_mayor}
              onChange={handleChange}
              placeholder="Ejemplo: AM-10234"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.codigo_adulto_mayor
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-blue-500"
              }`}
            />
            {errors.codigo_adulto_mayor && (
              <p className="mt-1 text-sm text-red-400">{errors.codigo_adulto_mayor}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Tipo de Relación *
            </label>
            <input
              type="text"
              name="tipo_relacion"
              value={formData.tipo_relacion}
              onChange={handleChange}
              placeholder="Hijo, vecino, cuidador contratado, etc."
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.tipo_relacion
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-blue-500"
              }`}
            />
            {errors.tipo_relacion && (
              <p className="mt-1 text-sm text-red-400">{errors.tipo_relacion}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="es_contacto_principal"
              checked={formData.es_contacto_principal}
              onChange={handleChange}
              className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-300">Soy el contacto principal</label>
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="puede_ver_ubicacion"
                checked={formData.puede_ver_ubicacion}
                onChange={handleChange}
                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded"
              />
              Ver ubicación en tiempo real
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="puede_recibir_alertas"
                checked={formData.puede_recibir_alertas}
                onChange={handleChange}
                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded"
              />
              Recibir alertas de emergencia
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="puede_gestionar_medicamentos"
                checked={formData.puede_gestionar_medicamentos}
                onChange={handleChange}
                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded"
              />
              Gestionar recordatorios de medicamentos
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Notas adicionales
            </label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows={3}
              placeholder="Información útil o condiciones especiales"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg transition-all duration-300 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transform hover:scale-105"
              }`}
            >
              {isLoading ? "Procesando..." : "Completar Registro →"}
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-3 border border-gray-500 text-gray-300 font-semibold rounded-lg hover:bg-gray-700/40 transition-all duration-300"
            >
              Vincular más tarde
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
