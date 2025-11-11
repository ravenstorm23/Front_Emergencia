import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormPerfilMayor from "./Components/FormPerfilMayor";

export default function PerfilMayor() {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener datos del usuario desde el registro previo o localStorage
  const [userData, setUserData] = useState(() => {
    if (location.state?.userData) return location.state.userData;
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!userData) navigate("/register");
  }, [userData, navigate]);

  const [formData, setFormData] = useState({
    edad: "",
    condiciones_medicas: "",
    medicamentos: "",
    alergias: "",
    contacto_emergencia: "",
    telefono_emergencia: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    const newErrors = {};
    if (!formData.edad.trim()) newErrors.edad = "La edad es obligatoria";
    if (!formData.contacto_emergencia.trim()) newErrors.contacto_emergencia = "Ingrese un contacto de emergencia";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Sesión expirada, por favor inicia sesión de nuevo");

      const res = await fetch("http://localhost:4000/api/perfil-mayor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          edad: formData.edad,
          enfermedades: formData.condiciones_medicas ? formData.condiciones_medicas.split(",").map(s => s.trim()) : [],
          medicamentos: formData.medicamentos ? formData.medicamentos.split(",").map(s => s.trim()) : [],
          alergias: formData.alergias ? formData.alergias.split(",").map(s => s.trim()) : [],
          contactoEmergencia: formData.contacto_emergencia,
          telefonoEmergencia: formData.telefono_emergencia,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 401 = token inválido o expirado
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
        throw new Error(data.msg || "Error al guardar el perfil del adulto mayor");
      }

      // Guardar info actualizada del usuario si es necesario
      const updatedUser = { ...userData, perfilMayor: data.user };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/dashboard-mayor");
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/dashboard-mayor");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <FormPerfilMayor
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onSkip={handleSkip}
      />
    </div>
  );
}
