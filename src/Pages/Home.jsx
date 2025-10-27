import React from 'react';
import Navbar from '../Components/ComponentsHome/Navbar';
import HeroSection from '../Components/ComponentsHome/HeroSection';
import FeaturesSection from '../Components/ComponentsHome/FeaturesSection';
import AboutBanner from '../Components/ComponentsHome/AboutBanner';
import Footer from '../Components/ComponentsHome/Footer';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-700 text-gray-900 dark:text-gray-100">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutBanner />
      <Footer />
    </div>
  );
}
