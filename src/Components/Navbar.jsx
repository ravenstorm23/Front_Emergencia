import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 dark:bg-gray-900/40 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Título que lleva al Home */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:scale-105 transition-transform"
        >
          CuidApp
        </h1>

        {/* Menú de navegación */}
        <ul className="hidden md:flex space-x-8 text-gray-800 dark:text-gray-200 font-medium">
          <li
            onClick={() => navigate("/")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            Inicio
          </li>
          <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
            Servicios
          </li>
          <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
            Nosotros
          </li>
          <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
            Contacto
          </li>
        </ul>

        {/* Botón de Login */}
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md transition-all hover:scale-105"
        >
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
}
