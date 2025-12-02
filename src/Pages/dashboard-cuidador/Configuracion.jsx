import React, { useState, useEffect } from "react";
import SidebarCuidador from "./components/SidebarCuidador";
import ConfigForm from "./components/ConfigForm";
import { updateUser } from "../../services/userService";
import { getPacientes } from "../../services/pacienteService";
import { Users, CheckCircle } from "lucide-react";
import Toast from "../../components/Toast";

const Configuracion = () => {
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser._id || storedUser.id;

      if (storedUser && userId) {
        setUser({ ...storedUser, _id: userId });
        try {
          const patientsData = await getPacientes(userId);
          console.log("Datos de pacientes recibidos:", patientsData);
          if (Array.isArray(patientsData)) {
            setPatients(patientsData);
          } else {
            console.error("Datos de pacientes inválidos:", patientsData);
            setPatients([]);
          }
        } catch (error) {
          console.error("Error loading patients:", error);
        }
      } else {
        setToast({ type: "error", message: "Debes iniciar sesión primero" });
      }
    };
    loadData();
  }, []);

  const handleSave = async (data) => {
    try {
      if (!user?._id) return;

      const updatedUser = await updateUser(user._id, data);

      // Actualizar estado y localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setToast({ type: "success", message: "Perfil actualizado correctamente" });
    } catch (error) {
      console.error("Error updating profile:", error);
      setToast({ type: "error", message: "Error al actualizar el perfil" });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCuidador />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración</h1>
        {user && <ConfigForm user={user} onSave={handleSave} />}

        {/* Lista de Pacientes Vinculados */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">
              Pacientes Vinculados ({patients.length})
            </h2>
          </div>

          {/* Debug info */}
          {/* <pre>{JSON.stringify(patients, null, 2)}</pre> */}

          {Array.isArray(patients) && patients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patients.map((patient) => (
                <div
                  key={patient._id || patient.id}
                  className="border-2 border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {patient.nombre?.charAt(0) || "P"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                        {patient.nombre}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 truncate">
                        {patient.email}
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">
                          Vinculado
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600">No tienes pacientes vinculados</p>
            </div>
          )}
        </div>
      </main>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Configuracion;
