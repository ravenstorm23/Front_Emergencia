import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/ComponentsHome/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PerfilMayor from "./Pages/PerfilMayor";
import PerfilCuidador from "./Pages/PerfilCuidador";
import DashBoardPerfilC from "./Pages/DashBoardPerfilC";
import CalendarioCuidador from "./Pages/CalendarioCuidador";
import Tareas from "./Pages/Tareas";
import { TaskProvider } from "./Components/ComponentsDashBoardCuidador/TaskContext"; 

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/dashboard-perfil-c", "/calendario", "/tareas"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

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
