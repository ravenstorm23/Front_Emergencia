// ============================================
// ARCHIVO: src/Pages/PerfilMayor.jsx
// DESCRIPCIÓN: Paso 2 del registro - Información médica (solo adultos mayores)
// ============================================

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PerfilMayor() {
  const location = useLocation();
  const navigate = useNavigate();

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
  // FORMULARIO DE INFORMACIÓN MÉDICA
  // ========================================
  const [formData, setFormData] = useState({
    tipo_sangre: "",
    alergias: "",
    condiciones_cronicas: "",
    nombre_doctor: "",
    telefono_doctor: "",
    seguro_medico: "",
    numero_seguro: "",
    medicamentos_actuales: "",
    notas_emergencia: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // ========================================
  // VALIDACIÓN
  // ========================================
  const validate = () => {
    const newErrors = {};

    // Tipo de sangre (opcional pero recomendado)
    if (!formData.tipo_sangre) {
      newErrors.tipo_sangre = "Recomendado: selecciona tu tipo de sangre";
    }

    // Al menos uno de los campos médicos debe estar lleno
    const hasMedicalInfo = formData.alergias || 
                          formData.condiciones_cronicas || 
                          formData.medicamentos_actuales ||
                          formData.notas_emergencia;

    if (!hasMedicalInfo) {
      newErrors.general = "Por favor completa al menos un campo de información médica";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ========================================
  // SUBMIT
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Advertencia si no completa, pero permitir continuar
    const hasWarnings = !formData.tipo_sangre;
    if (hasWarnings && !validate()) {
      const continuar = window.confirm(
        "⚠️ No completaste todos los campos recomendados.\n\n¿Deseas continuar de todas formas?\n\n(Puedes agregar esta información después)"
      );
      if (!continuar) return;
    }

    setIsLoading(true);

    try {
      // Simulación de guardado
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Combinar datos del paso 1 y paso 2
      const registroCompleto = {
        // Datos básicos (paso 1)
        ...userData,
        
        // Datos médicos (paso 2)
        perfil_medico: {
          tipo_sangre: formData.tipo_sangre,
          alergias: formData.alergias.split(',').map(a => a.trim()).filter(Boolean),
          condiciones_cronicas: formData.condiciones_cronicas.split(',').map(c => c.trim()).filter(Boolean),
          nombre_doctor: formData.nombre_doctor,
          telefono_doctor: formData.telefono_doctor,
          seguro_medico: formData.seguro_medico,
          numero_seguro: formData.numero_seguro,
          medicamentos_actuales: formData.medicamentos_actuales.split(',').map(m => m.trim()).filter(Boolean),
          notas_emergencia: formData.notas_emergencia,
          fecha_completado: new Date().toISOString()
        }
      };

      // TODO: Guardar en backend
      // const response = await fetch('http://localhost:3000/api/usuarios/completar-perfil', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(registroCompleto)
      // });
      // const data = await response.json();

      // Guardar temporalmente
      localStorage.setItem("registroCompleto", JSON.stringify(registroCompleto));
      
      // Limpiar datos temporales
      localStorage.removeItem("pendingUser");

      // Mostrar éxito
      alert(`✅ ¡Registro completo!\n\nBienvenido/a ${userData.nombre}\n\nAhora puedes iniciar sesión`);

      // Redirigir al login
      navigate("/login", {
        state: { 
          message: "Registro exitoso. Ya puedes iniciar sesión.",
          email: userData.email 
        }
      });

    } catch (error) {
      setErrors({ 
        general: "Error al guardar información. Intenta nuevamente." 
      });
    } finally {
      setIsLoading(false);
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
  // RENDERIZADO
  // ========================================
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4 shadow-lg backdrop-blur-md">
            <span className="text-4xl">👴</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Información Médica
          </h1>
          <p className="text-gray-300 mb-1">
            Paso 2 de 2: Completa tu perfil médico
          </p>
          <p className="text-sm text-gray-400">
            Usuario: <span className="text-cyan-400 font-semibold">{userData.nombre}</span>
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gray-800/70 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-md border border-gray-700">
          
          {/* Info importante */}
          <div className="mb-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
            <p className="text-blue-300 text-sm">
              💡 <strong>Importante:</strong> Esta información ayudará a tus cuidadores y servicios de emergencia a brindarte mejor atención.
            </p>
          </div>

          {/* Error general */}
          {errors.general && (
            <div className="mb-4 p-4 bg-red-900/40 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Tipo de Sangre */}
            <div>
              <label htmlFor="tipo_sangre" className="block text-sm font-semibold text-gray-300 mb-2">
                Tipo de Sangre *
              </label>
              <select 
                id="tipo_sangre"
                name="tipo_sangre" 
                value={formData.tipo_sangre} 
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border focus:outline-none focus:ring-2 ${
                  errors.tipo_sangre 
                    ? 'border-yellow-500 focus:ring-yellow-500' 
                    : 'border-gray-600 focus:ring-blue-500'
                }`}
              >
                <option value="">-- Selecciona --</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {errors.tipo_sangre && (
                <p className="mt-1 text-sm text-yellow-400">{errors.tipo_sangre}</p>
              )}
            </div>

            {/* Alergias */}
            <div>
              <label htmlFor="alergias" className="block text-sm font-semibold text-gray-300 mb-2">
                Alergias (separadas por comas)
              </label>
              <textarea 
                id="alergias"
                name="alergias" 
                value={formData.alergias} 
                onChange={handleChange}
                placeholder="Ej: Penicilina, Mariscos, Polen"
                rows="2"
                className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Condiciones Crónicas */}
            <div>
              <label htmlFor="condiciones_cronicas" className="block text-sm font-semibold text-gray-300 mb-2">
                Condiciones Crónicas (separadas por comas)
              </label>
              <textarea 
                id="condiciones_cronicas"
                name="condiciones_cronicas" 
                value={formData.condiciones_cronicas} 
                onChange={handleChange}
                placeholder="Ej: Diabetes tipo 2, Hipertensión, Artritis"
                rows="2"
                className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Medicamentos Actuales */}
            <div>
              <label htmlFor="medicamentos_actuales" className="block text-sm font-semibold text-gray-300 mb-2">
                Medicamentos Actuales (separados por comas)
              </label>
              <textarea 
                id="medicamentos_actuales"
                name="medicamentos_actuales" 
                value={formData.medicamentos_actuales} 
                onChange={handleChange}
                placeholder="Ej: Losartán 50mg, Metformina 850mg, Aspirina 100mg"
                rows="2"
                className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Doctor de Cabecera */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre_doctor" className="block text-sm font-semibold text-gray-300 mb-2">
                  Doctor de Cabecera
                </label>
                <input 
                  type="text"
                  id="nombre_doctor"
                  name="nombre_doctor" 
                  value={formData.nombre_doctor} 
                  onChange={handleChange}
                  placeholder="Dr. Juan Ramírez"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="telefono_doctor" className="block text-sm font-semibold text-gray-300 mb-2">
                  Teléfono del Doctor
                </label>
                <input 
                  type="tel"
                  id="telefono_doctor"
                  name="telefono_doctor" 
                  value={formData.telefono_doctor} 
                  onChange={handleChange}
                  placeholder="300-555-1234"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Seguro Médico */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="seguro_medico" className="block text-sm font-semibold text-gray-300 mb-2">
                  Seguro Médico
                </label>
                <input 
                  type="text"
                  id="seguro_medico"
                  name="seguro_medico" 
                  value={formData.seguro_medico} 
                  onChange={handleChange}
                  placeholder="Ej: Sura, Sanitas, Compensar"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="numero_seguro" className="block text-sm font-semibold text-gray-300 mb-2">
                  Número de Póliza
                </label>
                <input 
                  type="text"
                  id="numero_seguro"
                  name="numero_seguro" 
                  value={formData.numero_seguro} 
                  onChange={handleChange}
                  placeholder="123456789"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Notas de Emergencia */}
            <div>
              <label htmlFor="notas_emergencia" className="block text-sm font-semibold text-gray-300 mb-2">
                Notas Importantes para Emergencias
              </label>
              <textarea 
                id="notas_emergencia"
                name="notas_emergencia" 
                value={formData.notas_emergencia} 
                onChange={handleChange}
                placeholder="Ej: Requiere insulina cada 12 horas, No puede tomar aspirina, Tiene marcapasos"
                rows="3"
                className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-400">
                Esta información será visible para servicios de emergencia
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("¿Deseas volver al paso anterior? Se perderán los cambios.")) {
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
                    Guardando...
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
                onClick={() => {
                  if (window.confirm("¿Omitir este paso?\n\nPodrás completar tu información médica más tarde desde tu perfil.")) {
                    localStorage.removeItem("pendingUser");
                    navigate("/login", { 
                      state: { 
                        message: "Registro básico completo. Completa tu perfil médico después.",
                        email: userData.email 
                      }
                    });
                  }
                }}
                className="text-gray-400 hover:text-gray-300 text-sm underline"
              >
                Omitir por ahora
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            🔒 Tu información médica está protegida y solo será visible para tus cuidadores autorizados y servicios de emergencia.
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
FLUJO COMPLETO DEL REGISTRO:

1. Usuario llena Register.jsx (datos básicos)
   ↓
2. Si rol = "adulto_mayor" → PerfilMayor.jsx (este archivo)
   - Completa información médica
   - Datos se guardan en tabla ADULTOS_MAYORES del ER
   ↓
3. Redirige a Login
   - Usuario puede iniciar sesión
   - Sus datos ya están guardados

CAMPOS DEL MODELO ER CUBIERTOS:
✅ tipo_sangre
✅ alergias (array)
✅ condiciones_cronicas (array)
✅ nombre_doctor_principal
✅ telefono_doctor_principal
✅ seguro_medico
✅ numero_seguro
✅ notas_emergencia
✅ medicamentos actuales (para crear después en tabla MEDICAMENTOS)

CARACTERÍSTICAS:
✅ Validación flexible (permite omitir)
✅ UI amigable para adultos mayores
✅ Textos grandes y claros
✅ Placeholders con ejemplos
✅ Opción de volver atrás
✅ Opción de omitir y completar después
✅ Loading state
✅ Mensajes claros

BACKEND:
Cuando conectes con el backend, este formulario debe:
1. Crear registro en tabla USUARIOS (ya creado en paso 1)
2. Crear registro en tabla ADULTOS_MAYORES (este paso)
3. Asociar ambas tablas por usuario_id

PRÓXIMOS PASOS:
- Crear PerfilCuidador.jsx (paso 2 para cuidadores)
- Implementar el backend
- Crear las páginas de perfil real (dashboard)
*/