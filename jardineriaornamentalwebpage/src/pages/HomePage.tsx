// Importaciones
import Header from "../components/home/Header";
import HeroSection from "../components/home/HeroSection";
import FunFactsSection from "../components/home/FunFactsSection";
import AboutSection from "../components/home/AboutSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import GallerySection from "../components/home/GallerySection";
import Footer from "../components/home/Footer";
import BookingSection from "../components/home/BookingSection";
import AIEstimatorSection from "@/components/home/AIEstimatorSection";

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
