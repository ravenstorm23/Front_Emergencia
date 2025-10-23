/**
 * Register.jsx
 * 
 * Componente de registro de usuarios para CuidApp.
 * Primer paso del proceso de registro donde se recopilan los datos básicos
 * del usuario (adulto mayor o cuidador).
 * 
 * Funcionalidades:
 * - Validación de formulario en tiempo real
 * - Diferenciación entre roles de usuario
 * - Navegación al paso 2 según el rol seleccionado
 * - Almacenamiento temporal de datos durante el proceso
 * 
 * Flujo:
 * 1. Usuario completa información básica
 * 2. Sistema valida los datos ingresados
 * 3. Redirige a PerfilMayor o PerfilCuidador según corresponda
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Estado del formulario con todos los campos necesarios
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
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Maneja los cambios en los campos del formulario
   * Actualiza el estado y limpia los errores del campo modificado
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Si el campo tenía un error, lo eliminamos al empezar a escribir
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  /**
   * Valida todos los campos del formulario
   * Retorna true si no hay errores, false en caso contrario
   */
  const validate = () => {
    const newErrors = {};
    
    // Validación del nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    }
    
    // Validación del email
    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    
    // Validación de la contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }
    
    // Validación de confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    // Validación del teléfono (opcional, pero si se llena debe ser válido)
    if (formData.telefono && !/^\d{7,15}$/.test(formData.telefono.replace(/\s|-/g, ''))) {
      newErrors.telefono = "Teléfono inválido (solo números, 7-15 dígitos)";
    }
    
    // Validación del rol
    if (!formData.rol) {
      newErrors.rol = "Debes seleccionar un rol";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   * Valida los datos y redirige al paso correspondiente según el rol
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);

    try {
      // Simulamos el tiempo de procesamiento del servidor
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Preparamos los datos del usuario para el siguiente paso
      const userData = {
        id: `user-${Date.now()}`,
        nombre: formData.nombre.trim(),
        email: formData.email.toLowerCase().trim(),
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(),
        rol: formData.rol,
        fecha_registro: new Date().toISOString()
      };

      // Guardamos temporalmente los datos durante el proceso de registro
      localStorage.setItem("pendingUser", JSON.stringify(userData));

      /**
       * En producción, aquí se haría la petición al backend:
       * 
       * const response = await fetch('http://localhost:3000/api/auth/register', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({ ...formData })
       * });
       * const data = await response.json();
       */

      // Redirigimos al paso 2 según el rol seleccionado
      if (formData.rol === "adulto_mayor") {
        // Para adultos mayores: completar información médica
        navigate("/perfil-mayor", { state: { userData } });
      } else if (formData.rol === "cuidador") {
        // Para cuidadores: vincular con un adulto mayor
        navigate("/perfil-cuidador", { state: { userData } });
      }

    } catch (error) {
      setErrors({ 
        general: "Error al registrar. Intenta nuevamente." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <div className="w-full max-w-md">
        
        {/* Encabezado con logo e información del paso actual */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4 shadow-lg backdrop-blur-md">
            <span className="text-4xl">🏥</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-300">
            Paso 1 de 2: Información básica
          </p>
        </div>

        {/* Formulario principal de registro */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-gray-800/80 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-md border border-gray-700 space-y-4"
        >
          
          {/* Mensaje de error general (si existe) */}
          {errors.general && (
            <div className="p-4 bg-red-900/40 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            </div>
          )}

          {/* Campo: Nombre completo */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-300 mb-2">
              Nombre Completo *
            </label>
            <input 
              type="text"
              id="nombre"
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange}
              placeholder="Juan Pérez"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.nombre 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-blue-500'
              }`}
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-400">{errors.nombre}</p>
            )}
          </div>

          {/* Campo: Correo electrónico */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
              Correo Electrónico *
            </label>
            <input 
              type="email"
              id="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="juan@ejemplo.com"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-blue-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
              Contraseña *
            </label>
            <input 
              type="password"
              id="password"
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.password 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-blue-500'
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Campo: Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
              Confirmar Contraseña *
            </label>
            <input 
              type="password"
              id="confirmPassword"
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.confirmPassword 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-blue-500'
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Campo: Teléfono (opcional) */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-semibold text-gray-300 mb-2">
              Teléfono (opcional)
            </label>
            <input 
              type="tel"
              id="telefono"
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange}
              placeholder="300-123-4567"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.telefono 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-blue-500'
              }`}
            />
            {errors.telefono && (
              <p className="mt-1 text-sm text-red-400">{errors.telefono}</p>
            )}
          </div>

          {/* Campo: Dirección (opcional) */}
          <div>
            <label htmlFor="direccion" className="block text-sm font-semibold text-gray-300 mb-2">
              Dirección (opcional)
            </label>
            <input 
              type="text"
              id="direccion"
              name="direccion" 
              value={formData.direccion} 
              onChange={handleChange}
              placeholder="Calle 10 #5-23"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo: Selección de rol */}
          <div>
            <label htmlFor="rol" className="block text-sm font-semibold text-gray-300 mb-2">
              Selecciona tu Rol *
            </label>
            <select 
              id="rol"
              name="rol" 
              value={formData.rol} 
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.rol 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-600 focus:ring-blue-500'
              }`}
            >
              <option value="">-- Selecciona una opción --</option>
              <option value="adulto_mayor">👴 Soy Adulto Mayor</option>
              <option value="cuidador">👨‍⚕️ Soy Cuidador</option>
            </select>
            {errors.rol && (
              <p className="mt-1 text-sm text-red-400">{errors.rol}</p>
            )}
          </div>

          {/* Botón de envío del formulario */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-lg transition-all duration-300 mt-6 ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Procesando...
              </span>
            ) : (
              'Continuar →'
            )}
          </button>

          {/* Enlace para usuarios que ya tienen cuenta */}
          <div className="text-center pt-4">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </form>

        {/* Nota informativa sobre campos obligatorios */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            * Campos obligatorios
          </p>
        </div>
      </div>
    </div>
  );
}