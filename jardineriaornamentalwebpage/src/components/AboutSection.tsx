import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import { useAppState } from '../contexts/AppStateContext';

const AboutSection: React.FC = () => {
  const { content } = useAppState();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-ornamental-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* About Us */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script font-bold text-ornamental-700 mb-6">
              Sobre Jardinería Ornamental
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {content.about}
            </p>
          </div>


          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-ornamental-50 to-ornamental-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="inline-flex p-4 rounded-2xl bg-ornamental-600 mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-script font-bold text-ornamental-800 mb-4">Misión</h3>
              <p className="text-gray-700 leading-relaxed">
                {content.mission}
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-nature-50 to-nature-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="inline-flex p-4 rounded-2xl bg-nature-600 mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-script font-bold text-nature-800 mb-4">Visión</h3>
              <p className="text-gray-700 leading-relaxed">
                {content.vision}
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-ornamental-50 to-nature-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-ornamental-600 to-nature-600 mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-script font-bold text-gray-800 mb-4">Valores</h3>
              <p className="text-gray-700 leading-relaxed">
                Calidad, innovación, sostenibilidad y compromiso con la satisfacción del cliente guían cada uno de nuestros proyectos.
              </p>
            </div>
          </div>

          {/* Heritage Section */}
          <div className="mt-16 bg-white rounded-3xl p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-script font-bold text-ornamental-700 mb-6">
                  Nuestra Historia
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Desde 1995, Jardinería Ornamental ha sido pionera en el cuidado profesional 
                  de espacios verdes. Lo que comenzó como una pequeña empresa familiar se ha 
                  convertido en líder regional en servicios de jardinería.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Hoy combinamos la experiencia tradicional con tecnología de vanguardia, 
                  ofreciendo soluciones automatizadas que mantienen la belleza natural de 
                  cada jardín con precisión y eficiencia.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg" 
                  alt="Equipo de Jardinería Ornamental" 
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ornamental-900/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;