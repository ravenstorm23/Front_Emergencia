import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutBanner from './components/AboutBanner';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-700 text-gray-900 dark:text-gray-100">
      <HeroSection />
      <FeaturesSection />
      <AboutBanner />
      <Footer />
    </div>
  );
}
