import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormVinculacion from "./Components/FormVinculacion"; 

export default function PerfilCuidador() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState(() => {
    if (location.state?.userData) return location.state.userData;
    try {
      const stored = localStorage.getItem("pendingUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!userData) navigate("/register");
  }, [userData, navigate]);

  const [formData, setFormData] = useState({
    codigo_adulto_mayor: "",
    tipo_relacion: "",
    es_contacto_principal: false,
    puede_ver_ubicacion: true,
    puede_recibir_alertas: true,
    puede_gestionar_medicamentos: false,
    notas: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.codigo_adulto_mayor.trim() || !formData.tipo_relacion.trim()) {
      setErrors({
        codigo_adulto_mayor: !formData.codigo_adulto_mayor ? "El código es obligatorio" : "",
        tipo_relacion: !formData.tipo_relacion ? "Debe especificar la relación" : "",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("activeUser"))?.token;
      const res = await fetch("http://localhost:4000/api/vincular", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          cuidador_id: userData?.usuario?.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Error al registrar la vinculación");

      localStorage.setItem("activeUser", JSON.stringify(userData));
      navigate("/dashboard-perfil-c");
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("activeUser", JSON.stringify(userData));
    navigate("/dashboard-perfil-c");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <FormVinculacion
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
