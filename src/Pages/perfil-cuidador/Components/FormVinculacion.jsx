export default function FormVinculacion({ formData, errors, isLoading, onChange, onSubmit, onSkip }) {
  return (
    <div className="w-full max-w-lg bg-gray-800/80 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700">
      <div className="text-center mb-6">
        <span className="text-5xl">👨‍⚕️</span>
        <h1 className="text-3xl font-bold mt-2">Vincular con Adulto Mayor</h1>
        <p className="text-gray-400 mt-2 text-sm">Paso 2 de 2: Registra la relación o vincula más tarde</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-900/40 border border-red-700 rounded-lg">
            <p className="text-red-400 text-sm text-center">{errors.general}</p>
          </div>
        )}

        {/* Código adulto mayor */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Código del Adulto Mayor *</label>
          <input
            type="text"
            name="codigo_adulto_mayor"
            value={formData.codigo_adulto_mayor}
            onChange={onChange}
            placeholder="Ejemplo: AM-10234"
            className={`w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white border placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.codigo_adulto_mayor ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-blue-500"
            }`}
          />
          {errors.codigo_adulto_mayor && <p className="mt-1 text-sm text-red-400">{errors.codigo_adulto_mayor}</p>}
        </div>

        {/* Resto del formulario idéntico */}
        {/* ... */}

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
            onClick={onSkip}
            className="w-full py-3 border border-gray-500 text-gray-300 font-semibold rounded-lg hover:bg-gray-700/40 transition-all duration-300"
          >
            Vincular más tarde
          </button>
        </div>
      </form>
    </div>
  );
}
