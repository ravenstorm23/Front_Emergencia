export default function FormPerfilMayor({ formData, errors, isLoading, onChange, onSubmit, onSkip }) {
  return (
    <div className="w-full max-w-lg bg-gray-800/80 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700">
      <div className="text-center mb-6">
        <span className="text-5xl">👵</span>
        <h1 className="text-3xl font-bold mt-2">Perfil del Adulto Mayor</h1>
        <p className="text-gray-400 mt-2 text-sm">Paso 2 de 2: Completa tu información médica</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-900/40 border border-red-700 rounded-lg">
            <p className="text-red-400 text-sm text-center">{errors.general}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Edad *</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={onChange}
            placeholder="Ejemplo: 72"
            className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border ${
              errors.edad ? "border-red-500" : "border-gray-600"
            }`}
          />
          {errors.edad && <p className="mt-1 text-sm text-red-400">{errors.edad}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Condiciones médicas</label>
          <textarea
            name="condiciones_medicas"
            value={formData.condiciones_medicas}
            onChange={onChange}
            placeholder="Ejemplo: hipertensión, diabetes"
            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Medicamentos actuales</label>
          <textarea
            name="medicamentos"
            value={formData.medicamentos}
            onChange={onChange}
            placeholder="Ejemplo: losartán, metformina"
            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Alergias</label>
          <input
            type="text"
            name="alergias"
            value={formData.alergias}
            onChange={onChange}
            placeholder="Ejemplo: penicilina"
            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Contacto de emergencia *</label>
          <input
            type="text"
            name="contacto_emergencia"
            value={formData.contacto_emergencia}
            onChange={onChange}
            placeholder="Ejemplo: María López"
            className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border ${
              errors.contacto_emergencia ? "border-red-500" : "border-gray-600"
            }`}
          />
          {errors.contacto_emergencia && (
            <p className="mt-1 text-sm text-red-400">{errors.contacto_emergencia}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Teléfono de emergencia</label>
          <input
            type="text"
            name="telefono_emergencia"
            value={formData.telefono_emergencia}
            onChange={onChange}
            placeholder="Ejemplo: 301 555 8899"
            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border border-gray-600"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold rounded-lg transition-all duration-300 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-emerald-700 hover:to-green-600 hover:shadow-lg transform hover:scale-105"
            }`}
          >
            {isLoading ? "Guardando..." : "Completar Registro →"}
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="w-full py-3 border border-gray-500 text-gray-300 font-semibold rounded-lg hover:bg-gray-700/40 transition-all duration-300"
          >
            Completar más tarde
          </button>
        </div>
      </form>
    </div>
  );
}
