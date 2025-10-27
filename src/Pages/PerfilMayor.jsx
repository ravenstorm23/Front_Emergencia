// ============================================
// ARCHIVO: src/Pages/PerfilMayor.jsx
// DESCRIPCIÓN: Paso 2 del registro - Información médica (solo adultos mayores)
// ============================================

// Este Codigo maneja el segundo paso del registro para adultos mayores.
// Aquí recopilamos su información médica importante para poder brindarles mejor
// atención en caso de emergencias.

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PerfilMayor() {
  // Estas herramientas nos ayudan a navegar entre páginas y obtener datos
  const location = useLocation();
  const navigate = useNavigate();

  // Primer paso: ¿Tenemos los datos básicos del usuario?
  // Revisamos si vinieron en la navegación o si están guardados localmente
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

  // Aquí guardamos toda la información médica que el usuario va completando 
  // Cada campo tiene un propósito específico para ayudar en emergencias
  const [formData, setFormData] = useState({
    tipo_sangre: "",           // Crucial para transfusiones
    alergias: "",             // Evitar reacciones alérgicas
    condiciones_cronicas: "",  // Enfermedades que requieren atención especial
    nombre_doctor: "",         // Contacto médico principal
    telefono_doctor: "",       // Para consultas urgentes
    seguro_medico: "",         // Cobertura médica
    numero_seguro: "",         // Identificación del seguro
    medicamentos_actuales: "", // Tratamientos en curso
    notas_emergencia: ""       // Información adicional importante
  });

  // Control de errores y estado de carga para mejor experiencia de usuario
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ¡Ojo! 👀 Si el usuario llegó aquí sin completar el paso 1,
  // lo devolvemos amablemente al registro
  useEffect(() => {
    if (!userData) {
      alert("⚠️ Debes completar el registro primero");
      navigate("/registro");
    }
  }, [userData, navigate]);

  // Cada vez que el usuario escribe algo, actualizamos el formulario
  // y quitamos cualquier mensaje de error para ese campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Verificamos que la información importante esté completa
  // Somos flexibles pero recomendamos llenar lo básico
  const validate = () => {
    const newErrors = {};

    if (!formData.tipo_sangre) {
      newErrors.tipo_sangre = "Recomendado: selecciona tu tipo de sangre";
    }

    // Necesitamos al menos alguna información médica
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

  // ¡El momento de guardar todo! 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si hay campos recomendados sin llenar, preguntamos si quiere continuar
    const hasWarnings = !formData.tipo_sangre;
    if (hasWarnings && !validate()) {
      const continuar = window.confirm(
        "⚠️ No completaste todos los campos recomendados.\n\n" +
        "¿Deseas continuar de todas formas?\n\n" +
        "(Puedes agregar esta información después)"
      );
      if (!continuar) return;
    }

    // Mostramos que estamos trabajando...
    setIsLoading(true);

    try {
      // En un futuro, aquí conectaremos con el backend
      // Por ahora, simulamos un pequeño delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Preparamos todos los datos para guardar
      const registroCompleto = {
        ...userData,
        perfil_medico: {
          tipo_sangre: formData.tipo_sangre,
          // Convertimos las listas separadas por comas en arrays ordenados
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

      // Guardamos temporalmente (en producción irá a la base de datos)
      localStorage.setItem("registroCompleto", JSON.stringify(registroCompleto));
      localStorage.removeItem("pendingUser");

      // ¡Éxito! 🎉 Avisamos al usuario
      alert(`✅ ¡Registro completo!\n\nBienvenido/a ${userData.nombre}\n\nAhora puedes iniciar sesión`);

      // Y lo llevamos a iniciar sesión
      navigate("/login", {
        state: { 
          message: "Registro exitoso. Ya puedes iniciar sesión.",
          email: userData.email 
        }
      });

    } catch (error) {
      // Si algo sale mal, mostramos un mensaje amigable
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