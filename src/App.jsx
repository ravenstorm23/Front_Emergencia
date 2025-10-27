import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/ComponentsHome/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PerfilMayor from "./Pages/PerfilMayor";
import PerfilCuidador from "./Pages/PerfilCuidador";
import DashboardCuidador from "./Pages/DashboardCuidador";



function AppContent() {
  const location = useLocation();

  // Rutas donde NO quieres mostrar el Navbar
  const hideNavbar = ["/dashboard-cuidador"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil-mayor" element={<PerfilMayor />} />
        <Route path="/perfil-cuidador" element={<PerfilCuidador />} />
        <Route path="/dashboard-cuidador" element={<DashboardCuidador />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
