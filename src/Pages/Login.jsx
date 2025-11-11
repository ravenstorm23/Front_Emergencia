import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Llamamos loginUser con objeto
      const response = await loginUser(formData); // { token, user }

      // Guardar token y usuario en localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Redirigir según rol
      if (response.user.rol === "cuidador") navigate("/perfil-cuidador");
      else if (response.user.rol === "adulto_mayor") navigate("/perfil-mayor");
      else navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Error al iniciar sesión. Verifica tus datos."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 py-8">
      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>

        {error && (
          <div className="p-3 bg-red-900/40 border border-red-700 rounded-lg mb-4 text-center text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:ring-2 focus:ring-cyan-400"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <label className="block mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border focus:ring-2 focus:ring-cyan-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 mt-4 bg-cyan-600 rounded-lg text-white font-bold ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 shadow-lg"
            }`}
          >
            {isLoading ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          ¿No tienes cuenta?{" "}
          <button onClick={() => navigate("/registro")} className="text-cyan-400 font-semibold">
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
