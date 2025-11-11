import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Pages/Home/components/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PerfilMayor from "./Pages/FormPerfilMayor/PerfilMayor";
import PerfilCuidador from "./Pages/PerfilCuidador/PerfilCuidador";
import DashBoardPerfilC from "./Pages/DashBoardCuidador/DashBoardPerfilC";
import CalendarioCuidador from "./Pages/DashBoardCuidador/CalendarioCuidador";
import Tareas from "./Pages/DashBoardCuidador/Tareas";
import Paciente from "./Pages/DashBoardCuidador/Paciente"; 
import Configuracion from "./Pages/DashBoardCuidador/Configuracion"; 
import DashboardLayout from "./Pages/DashBoardMayor/DashboardLayout";
import InicioAdulto from "./Pages/Inicio/InicioAdulto";
import { TaskProvider } from "./Pages/DashBoardCuidador/Components/TaskContext"; 

function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/dashboard-perfil-c",
    "/calendario",
    "/tareas",
    "/pacientes",
    "/configuracion",
    "/dashboard-mayor"
  ];

  const hideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil-mayor" element={<PerfilMayor />} />
        <Route path="/perfil-cuidador" element={<PerfilCuidador />} />
        <Route path="/dashboard-perfil-c" element={<DashBoardPerfilC />} />
        <Route path="/calendario" element={<CalendarioCuidador />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/pacientes" element={<Paciente />} />
        <Route path="/configuracion" element={<Configuracion />} /> 


        <Route path="/dashboard-mayor/*" element={<DashboardLayout />}>
          <Route index element={<InicioAdulto />} /> 
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </BrowserRouter>
  );
}
