import { ArrowRight, Leaf, Scissors, Droplets } from 'lucide-react';
import heroImage from '../../assets/hero-image.jpeg'

const HeroSection: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-garden-hero bg-cover bg-center bg-fixed overflow-hidden">
      {/* Overlay with nature pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-ornamental-900/40"></div>
      
      {/* Floating nature elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-ornamental-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-nature-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-ornamental-400/10 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-script font-bold leading-tight">
                Su Jardín,
                <span className="block text-ornamental-300">
                  Nuestra Mayor Preocupación
                </span>
              </h1>
              <p className="text-xl lg:text-2xl leading-relaxed text-gray-200 font-light">
                Transformamos espacios verdes con cariño y el cuidado artesanal 
                que su jardín merece. Experiencia profesional desde 1995.
              </p>
            </div>

            {/* Service highlights */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="inline-flex p-3 bg-ornamental-500/20 rounded-full mb-3">
                  <Scissors className="h-6 w-6 text-ornamental-300" />
                </div>
                <div className="text-2xl font-bold text-ornamental-300">25+</div>
                <div className="text-sm text-gray-300">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 bg-nature-500/20 rounded-full mb-3">
                  <Leaf className="h-6 w-6 text-nature-300" />
                </div>
                <div className="text-2xl font-bold text-nature-300">100%</div>
                <div className="text-sm text-gray-300">Eco-Friendly</div>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 bg-ornamental-500/20 rounded-full mb-3">
                  <Droplets className="h-6 w-6 text-ornamental-300" />
                </div>
                <div className="text-2xl font-bold text-ornamental-300">24/7</div>
                <div className="text-sm text-gray-300">Monitoreo</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('ai-estimator')}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-ornamental-500 to-ornamental-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
              >
                <span>Cotización Inteligente</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Main image container */}
              <div className="aspect-square bg-gradient-to-br from-ornamental-100/10 to-nature-100/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-white/20">
                <img 
                  src={heroImage} 
                  alt="Jardín profesionalmente mantenido" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ornamental-900/30 to-transparent"></div>
              </div>
              
              {/* Floating info cards */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-nature-200">
                <div className="text-2xl font-bold text-nature-600 font-script">Cuidamos De Su Jardín</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;