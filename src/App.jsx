import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./Pages/home/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import PerfilMayor from "./Pages/form-perfil-mayor/PerfilMayor";
import PerfilCuidador from "./Pages/perfil-cuidador/PerfilCuidador";
import DashBoardPerfilC from "./Pages/dashboard-cuidador/DashBoardPerfilC";
import CalendarioCuidador from "./Pages/dashboard-cuidador/CalendarioCuidador";
import Tareas from "./Pages/dashboard-cuidador/Tareas";
import Paciente from "./Pages/dashboard-cuidador/Paciente";
import PerfilPaciente from "./Pages/dashboard-cuidador/PerfilPaciente";
import Configuracion from "./Pages/dashboard-cuidador/Configuracion";
import DashboardLayout from "./Pages/dashboard-mayor/DashboardLayout";
import InicioAdulto from "./Pages/inicio/InicioAdulto";
import VincularCuidador from "./Pages/dashboard-mayor/VincularCuidador";
import ConfiguracionAlertasMayor from "./Pages/dashboard-mayor/ConfiguracionAlertas";
import MiSalud from "./Pages/dashboard-mayor/MiSalud";
import VincularPaciente from "./Pages/dashboard-cuidador/VincularPaciente";
import ConfiguracionAlertasCuidador from "./Pages/dashboard-cuidador/ConfiguracionAlertas";
import ReportesCuidador from "./Pages/dashboard-cuidador/ReportesCuidador";
import ChatCuidador from "./Pages/dashboard-cuidador/ChatCuidador";
import ConfiguracionMayor from "./Pages/dashboard-mayor/ConfiguracionMayor";
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
      <Route path="/pacientes/:id" element={<PerfilPaciente />} />
      <Route path="/configuracion" element={<Configuracion />} />
      <Route path="/vincular-paciente" element={<VincularPaciente />} />
      <Route path="/alertas-config" element={<ConfiguracionAlertasCuidador />} />
      <Route path="/reportes" element={<ReportesCuidador />} />
      <Route path="/chat" element={<ChatCuidador />} />

      <Route path="/dashboard-mayor/*" element={<DashboardLayout />}>
        <Route index element={<InicioAdulto />} />
        <Route path="vincular" element={<VincularCuidador />} />
        <Route path="alertas" element={<ConfiguracionAlertasMayor />} />
        <Route path="salud" element={<MiSalud />} />
        <Route path="configuracion" element={<ConfiguracionMayor />} />
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
