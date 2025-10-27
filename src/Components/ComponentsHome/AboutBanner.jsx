import React, { useState, useEffect } from "react";
import ayudar from "../../assets/img/ayudar.png";
import abrazo from "../../assets/img/abrazo.png";
import compania from "../../assets/img/compañia.png";

export default function AboutBanner() {
  const items = [
    {
      title: "Misión",
      text: "Brindar asistencia inmediata y confiable a adultos mayores, conectándolos con ayuda médica, familiar o comunitaria en segundos.",
      image: ayudar,
    },
    {
      title: "Visión",
      text: "Convertirnos en la red de apoyo más accesible y humana para adultos mayores en toda Latinoamérica, promoviendo seguridad y compañía.",
      image: abrazo,
    },
    {
      title: "Quiénes Somos",
      text: "Somos un equipo comprometido con el cuidado, la empatía y la tecnología para salvar vidas y acompañar a quienes más lo necesitan.",
      image: compania,
    },
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 bg-blue-50 dark:bg-gray-900 transition-all duration-700">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6">
        <img
          src={items[index].image}
          alt={items[index].title}
          className="w-full md:w-1/2 rounded-2xl shadow-2xl object-cover transition-all duration-700"
        />
        <div className="md:ml-10 mt-8 md:mt-0 text-center md:text-left animate-fade-in">
          <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">
            {items[index].title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {items[index].text}
          </p>
        </div>
      </div>
    </section>
  );
}
