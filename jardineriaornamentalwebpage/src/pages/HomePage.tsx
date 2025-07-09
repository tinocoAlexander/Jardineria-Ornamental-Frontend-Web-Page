// Importaciones
import Header from "../components/home/Header";
import HeroSection from "../components/home/HeroSection";
import FunFactsSection from "../components/home/FunFactsSection";
import AboutSection from "../components/home/AboutSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import GallerySection from "../components/home/GallerySection";
import Footer from "../components/home/Footer";
import AIEstimatorSection from "../components/home/AIEstimatorSection";
import BookingSection from "../components/home/BookingSection";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FunFactsSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <AIEstimatorSection />
      <BookingSection />
      <Footer />
    </div>
  );
};

export default HomePage;
