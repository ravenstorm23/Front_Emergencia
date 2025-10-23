import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-600 dark:bg-gray-950 text-white py-12 transition-colors duration-700">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h3 className="text-3xl font-extrabold mb-4">CuidApp</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Conectamos cuidado, amor y tecnología para proteger a quienes más lo necesitan.
        </p>
        <div className="flex justify-center space-x-10 text-3xl mb-6">
          <a href="#" className="hover:text-blue-300 transition-all transform hover:scale-110">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-pink-400 transition-all transform hover:scale-110">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-green-400 transition-all transform hover:scale-110">
            <FaWhatsapp />
          </a>
        </div>
        <p className="text-sm text-blue-100">
          © {new Date().getFullYear()} CuidApp. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
