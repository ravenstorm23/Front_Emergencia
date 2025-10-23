import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PerfilMayor from "./Pages/PerfilMayor";
import PerfilCuidador from "./Pages/PerfilCuidador";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil-mayor" element={<PerfilMayor />} />
        <Route path="/perfil-cuidador" element={<PerfilCuidador />} /> {/* <- corregido */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
