// ============================================
// ARCHIVO: src/Pages/PerfilCuidador.jsx
// DESCRIPCIÓN: Paso 2 del registro - Vinculación (solo cuidadores)
// ============================================

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PerfilCuidador() {
  const navigate = useNavigate();
  const location = useLocation();

  // ========================================
  // OBTENER DATOS DEL PASO 1
  // ========================================
  const [userData, setUserData] = useState(() => {
    // Primero intentar desde el state de navegación
    if (location.state?.userData) {
      return location.state.userData;
    }
    
    // Si no, intentar desde localStorage
    try {
      const stored = localStorage.getItem("pendingUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // ========================================
  // FORMULARIO DE VINCULACIÓN
  // ========================================
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
  const [vinculacionExitosa, setVinculacionExitosa] = useState(false);

  // ========================================
  // VERIFICAR QUE TENGA DATOS DEL PASO 1
  // ========================================
  useEffect(() => {
    if (!userData) {
      alert("⚠️ Debes completar el registro primero");
      navigate("/registro");
    }
  }, [userData, navigate]);

  // ========================================
  // MANEJO DE CAMBIOS
  // ========================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // ========================================
  // VALIDACIÓN
  // ========================================
  const validate = () => {
    const newErrors = {};

    // Código de adulto mayor
    if (!formData.codigo_adulto_mayor.trim()) {
      newErrors.codigo_adulto_mayor = "El código es obligatorio";
    } else if (formData.codigo_adulto_mayor.trim().length < 4) {
      newErrors.codigo_adulto_mayor = "El código debe tener al menos 4 caracteres";
    }

    // Tipo de relación
    if (!formData.tipo_relacion) {
      newErrors.tipo_relacion = "Selecciona el tipo de relación";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========================================
  // SUBMIT - VINCULAR
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);

    try {
      // Simulación de vinculación con el backend
      await new Promise(resolve => setTimeout(resolve, 2000));

      // TODO: Validar código en backend
      // const response = await fetch('http://localhost:3000/api/usuarios/validar-codigo', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ codigo: formData.codigo_adulto_mayor })
      // });
      // const adultoMayorData = await response.json();

      // SIMULACIÓN: Validar código (en producción esto viene del backend)
      const codigosValidos = ["AM-2024-001", "AM-2024-002", "MAYOR-001"];
      const codigoValido = codigosValidos.includes(formData.codigo_adulto_mayor.toUpperCase());

      if (!codigoValido) {
        setErrors({ 
          codigo_adulto_mayor: "Código no válido. Verifica con el adulto mayor." 
        });
        setIsLoading(false);
        return;
      }

      // Preparar datos de la vinculación (tabla RELACIONES_CUIDADO)
      const vinculacion = {
        cuidador_id: userData.id,
        adulto_mayor_codigo: formData.codigo_adulto_mayor.toUpperCase(),
        tipo_relacion: formData.tipo_relacion,
        nivel_prioridad: formData.es_contacto_principal ? 1 : 2,
        puede_ver_ubicacion: formData.puede_ver_ubicacion,
        puede_recibir_alertas: formData.puede_recibir_alertas,
        puede_gestionar_medicamentos: formData.puede_gestionar_medicamentos,
        notas: formData.notas,
        fecha_vinculacion: new Date().toISOString(),
        esta_activo: true
      };

      // TODO: Guardar vinculación en backend
      // const responseVinculacion = await fetch('http://localhost:3000/api/relaciones-cuidado', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(vinculacion)
      // });

      // Combinar datos completos
      const registroCompleto = {
        ...userData,
        vinculacion: vinculacion,
        registro_completo: true
      };

      // Guardar temporalmente
      localStorage.setItem("registroCompleto", JSON.stringify(registroCompleto));
      
      // Marcar vinculación exitosa
      setVinculacionExitosa(true);

      // Mostrar mensaje
      setTimeout(() => {
        // Limpiar datos temporales
        localStorage.removeItem("pendingUser");
        
        // Redirigir al login
        navigate("/login", {
          state: { 
            message: `¡Registro completo! Ahora cuidas de un adulto mayor.`,
            email: userData.email 
          }
        });
      }, 2000);

    } catch (error) {
      setErrors({ 
        general: "Error al vincular. Intenta nuevamente." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ========================================
  // OMITIR VINCULACIÓN (opcional)
  // ========================================
  const handleOmitir = () => {
    if (window.confirm("¿Omitir vinculación?\n\nPodrás vincular con un adulto mayor más tarde desde tu perfil.")) {
      localStorage.removeItem("pendingUser");
      navigate("/login", { 
        state: { 
          message: "Registro completo. Vincula con un adulto mayor desde tu perfil.",
          email: userData.email 
        }
      });
    }
  };

  // ========================================
  // SI NO HAY DATOS DEL PASO 1
  // ========================================
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
        <div className="text-center">
          <p className="text-xl mb-4">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  // ========================================
  // PANTALLA DE ÉXITO
  // ========================================
  if (vinculacionExitosa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mb-6">
            <span className="text-6xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">¡Vinculación Exitosa!</h1>
          <p className="text-gray-300 mb-6">
            Ya estás registrado como cuidador. Ahora puedes iniciar sesión.
          </p>
          <div className="animate-pulse text-cyan-400">
            Redirigiendo al login...
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // RENDERIZADO PRINCIPAL
  // ========================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4 shadow-lg backdrop-blur-md">
            <span className="text-4xl">👨‍⚕️</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Vinculación con Adulto Mayor
          </h1>
          <p className="text-gray-300 mb-1">
            Paso 2 de 2: Conecta con la persona que cuidarás
          </p>
          <p className="text-sm text-gray-400">
            Cuidador: <span className="text-cyan-400 font-semibold">{userData.nombre}</span>
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gray-800/80 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-md border border-gray-700">
          
          {/* Instrucciones */}
          <div className="mb-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
            <p className="text-blue-300 text-sm mb-2">
              <strong>💡 ¿Cómo obtener el código?</strong>
            </p>
            <p className="text-blue-300 text-xs">
              El adulto mayor debe compartirte su código de vinculación. Lo puede encontrar en su perfil o durante su registro.
            </p>
          </div>

          {/* Códigos de prueba */}
          <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <p className="text-green-300 text-xs font-semibold mb-2">🧪 Códigos de prueba:</p>
            <p className="text-green-300 text-xs font-mono">AM-2024-001 | AM-2024-002 | MAYOR-001</p>
          </div>

          {/* Error general */}
          {errors.general && (
            <div className="mb-4 p-4 bg-red-900/40 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Código del Adulto Mayor */}
            <div>
              <label htmlFor="codigo_adulto_mayor" className="block text-sm font-semibold text-gray-300 mb-2">
                Código del Adulto Mayor *
              </label>
              <input 
                type="text"
                id="codigo_adulto_mayor"
                name="codigo_adulto_mayor" 
                value={formData.codigo_adulto_mayor} 
                onChange={handleChange}
                placeholder="Ej: AM-2024-001"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 uppercase ${
                  errors.codigo_adulto_mayor 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-600 focus:ring-blue-500'
                }`}
              />
              {errors.codigo_adulto_mayor && (
                <p className="mt-1 text-sm text-red-400">{errors.codigo_adulto_mayor}</p>
              )}
            </div>

            {/* Tipo de Relación */}
            <div>
              <label htmlFor="tipo_relacion" className="block text-sm font-semibold text-gray-300 mb-2">
                ¿Cuál es tu relación? *
              </label>
              <select 
                id="tipo_relacion"
                name="tipo_relacion" 
                value={formData.tipo_relacion} 
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border focus:outline-none focus:ring-2 ${
                  errors.tipo_relacion 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-600 focus:ring-blue-500'
                }`}
              >
                <option value="">-- Selecciona --</option>
                <option value="familiar">👨‍👩‍👦 Familiar (hijo/a, nieto/a, etc.)</option>
                <option value="profesional">🏥 Cuidador Profesional</option>
                <option value="voluntario">🤝 Voluntario</option>
                <option value="vecino">🏘️ Vecino/a</option>
              </select>
              {errors.tipo_relacion && (
                <p className="mt-1 text-sm text-red-400">{errors.tipo_relacion}</p>
              )}
            </div>

            {/* Contacto Principal */}
            <div className="p-4 bg-gray-900/40 rounded-lg border border-gray-700">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="es_contacto_principal"
                  checked={formData.es_contacto_principal}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <span className="block text-sm font-semibold text-gray-300">
                    Soy el contacto principal
                  </span>
                  <span className="block text-xs text-gray-400 mt-1">
                    Recibirás todas las notificaciones importantes y tendrás prioridad en las alertas
                  </span>
                </div>
              </label>
            </div>

            {/* Permisos */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Permisos de Cuidado
              </label>
              
              <div className="space-y-3">
                {/* Ver Ubicación */}
                <label className="flex items-start cursor-pointer p-3 bg-gray-900/40 rounded-lg border border-gray-700 hover:border-gray-600 transition">
                  <input
                    type="checkbox"
                    name="puede_ver_ubicacion"
                    checked={formData.puede_ver_ubicacion}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-300">
                      📍 Ver ubicación en tiempo real
                    </span>
                    <span className="block text-xs text-gray-400 mt-1">
                      Podrás ver dónde se encuentra el adulto mayor
                    </span>
                  </div>
                </label>

                {/* Recibir Alertas */}
                <label className="flex items-start cursor-pointer p-3 bg-gray-900/40 rounded-lg border border-gray-700 hover:border-gray-600 transition">
                  <input
                    type="checkbox"
                    name="puede_recibir_alertas"
                    checked={formData.puede_recibir_alertas}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-300">
                      🚨 Recibir alertas de emergencia
                    </span>
                    <span className="block text-xs text-gray-400 mt-1">
                      Te notificaremos cuando haya una emergencia
                    </span>
                  </div>
                </label>

                {/* Gestionar Medicamentos */}
                <label className="flex items-start cursor-pointer p-3 bg-gray-900/40 rounded-lg border border-gray-700 hover:border-gray-600 transition">
                  <input
                    type="checkbox"
                    name="puede_gestionar_medicamentos"
                    checked={formData.puede_gestionar_medicamentos}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-300">
                      💊 Gestionar medicamentos
                    </span>
                    <span className="block text-xs text-gray-400 mt-1">
                      Podrás agregar, editar y ver recordatorios de medicamentos
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Notas */}
            <div>
              <label htmlFor="notas" className="block text-sm font-semibold text-gray-300 mb-2">
                Notas Adicionales (opcional)
              </label>
              <textarea 
                id="notas"
                name="notas" 
                value={formData.notas} 
                onChange={handleChange}
                placeholder="Ej: Disponible de lunes a viernes de 8am a 6pm"
                rows="2"
                className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("¿Volver al paso anterior? Se perderán los cambios.")) {
                    navigate("/registro");
                  }
                }}
                className="flex-1 py-3 px-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all"
              >
                ← Atrás
              </button>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className={`flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-lg transition-all duration-300 ${
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
                    Vinculando...
                  </span>
                ) : (
                  'Completar Registro ✓'
                )}
              </button>
            </div>

            {/* Opción de omitir */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleOmitir}
                className="text-gray-400 hover:text-gray-300 text-sm underline"
              >
                Vincular más tarde
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            🔒 La vinculación puede ser revocada en cualquier momento por el adulto mayor desde su perfil.
          </p>
        </div>
      </div>
    </div>
  );
}


// ============================================
// NOTAS DE IMPLEMENTACIÓN
// ============================================
/*
FLUJO COMPLETO PARA CUIDADORES:

1. Register.jsx → datos básicos
2. PerfilCuidador.jsx (este archivo) → vinculación
3. Login → acceso al dashboard

CAMPOS DEL MODELO ER CUBIERTOS (tabla RELACIONES_CUIDADO):
✅ cuidador_id (del paso 1)
✅ adulto_mayor_id (mediante código)
✅ tipo_relacion (familiar, profesional, voluntario, vecino)
✅ nivel_prioridad (1 si es contacto principal, 2 si no)
✅ puede_ver_ubicacion
✅ puede_recibir_alertas
✅ puede_gestionar_medicamentos
✅ notas
✅ esta_activo

CARACTERÍSTICAS:
✅ Validación de código
✅ Selección de permisos
✅ Checkbox de contacto principal
✅ UI clara con instrucciones
✅ Códigos de prueba visibles
✅ Opción de omitir y vincular después
✅ Pantalla de éxito
✅ Loading state
✅ Volver atrás

BACKEND:
1. Validar que el código existe en tabla USUARIOS (rol adulto_mayor)
2. Crear registro en tabla RELACIONES_CUIDADO
3. Asociar cuidador_id con adulto_mayor_id

SEGURIDAD:
- El adulto mayor debe aprobar la vinculación (opcional)
- El código debe ser único y temporal
- La vinculación puede ser revocada
*/