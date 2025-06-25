// Importaciones
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FunFactsSection from '../components/FunFactsSection';
import AboutSection from '../components/AboutSection';
import AIEstimatorSection from '../components/AIEstimatorSection';
import TestimonialsSection from '../components/TestimonialsSection';
import GallerySection from '../components/GallerySection';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';

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