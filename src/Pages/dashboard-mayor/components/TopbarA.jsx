import React from "react";

const TopbarA = () => {
  const fecha = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const user = JSON.parse(localStorage.getItem("usuario") || "{}");

  return (
    <header className="bg-white shadow-sm flex justify-between items-center px-6 py-3">
      <h2 className="text-xl font-semibold text-gray-700 capitalize">{fecha}</h2>
      <div className="text-[#5B9BD5] font-bold text-lg">
        {user.nombre ? user.nombre : "Perfil Adulto Mayor"}
      </div>
    </header>
  );
};

export default TopbarA;
