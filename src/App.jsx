import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PerfilMayor from "./pages/form-perfil-mayor/PerfilMayor";
import PerfilCuidador from "./pages/perfil-cuidador/PerfilCuidador";
import DashBoardPerfilC from "./pages/dashboard-cuidador/DashBoardPerfilC";
import CalendarioCuidador from "./pages/dashboard-cuidador/CalendarioCuidador";
import Tareas from "./pages/dashboard-cuidador/Tareas";
import Paciente from "./pages/dashboard-cuidador/Paciente";
import Configuracion from "./pages/dashboard-cuidador/Configuracion";
import DashboardLayout from "./pages/dashboard-mayor/DashboardLayout";
import InicioAdulto from "./pages/inicio/InicioAdulto";
import VincularCuidador from "./pages/dashboard-mayor/VincularCuidador";
import ConfiguracionAlertasMayor from "./pages/dashboard-mayor/ConfiguracionAlertas";
import MiSalud from "./pages/dashboard-mayor/MiSalud";
import VincularPaciente from "./pages/dashboard-cuidador/VincularPaciente";
import ConfiguracionAlertasCuidador from "./pages/dashboard-cuidador/ConfiguracionAlertas";
import { TaskProvider } from "./context/TaskContext";

function AppContent() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil-mayor" element={<PerfilMayor />} />
        <Route path="/perfil-cuidador" element={<PerfilCuidador />} />
      </Route>

      <Route path="/dashboard-perfil-c" element={<DashBoardPerfilC />} />
      <Route path="/calendario" element={<CalendarioCuidador />} />
      <Route path="/tareas" element={<Tareas />} />
      <Route path="/pacientes" element={<Paciente />} />
      <Route path="/configuracion" element={<Configuracion />} />
      <Route path="/vincular-paciente" element={<VincularPaciente />} />
      <Route path="/alertas-config" element={<ConfiguracionAlertasCuidador />} />

      <Route path="/dashboard-mayor/*" element={<DashboardLayout />}>
        <Route index element={<InicioAdulto />} />
        <Route path="vincular" element={<VincularCuidador />} />
        <Route path="alertas" element={<ConfiguracionAlertasMayor />} />
        <Route path="salud" element={<MiSalud />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </TaskProvider>
    </BrowserRouter>
  );
}
