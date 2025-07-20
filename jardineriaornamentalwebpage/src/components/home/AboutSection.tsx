import React, { useEffect } from "react";
import { Target, Eye, Heart } from "lucide-react";
import { useAppState } from "../../contexts/AppStateContext";

const AboutSection: React.FC = () => {
  const { content, loadContent } = useAppState();

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const getDescripcion = (seccion: string) =>
    content.find((item) => item.seccion === seccion && item.activo)
      ?.descripcion || "Contenido no disponible";

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-white to-ornamental-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* About Us */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script font-bold text-ornamental-700 mb-6">
              Sobre Jardinería Ornamental
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {getDescripcion("Sobre nosotros")}
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Misión */}
            <div className="text-center p-8 rounded-3xl bg-ornamental-50 hover:shadow-md transition-all duration-300">
              <div className="inline-flex p-4 rounded-2xl bg-ornamental-200 mb-6">
                <Target className="h-8 w-8 text-ornamental-800" />
              </div>
              <h3 className="text-2xl font-script font-bold text-ornamental-700 mb-4">
                Misión
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {getDescripcion("Misión")}
              </p>
            </div>

            {/* Visión */}
            <div className="text-center p-8 rounded-3xl bg-ornamental-50 hover:shadow-md transition-all duration-300">
              <div className="inline-flex p-4 rounded-2xl bg-ornamental-200 mb-6">
                <Eye className="h-8 w-8 text-ornamental-800" />
              </div>
              <h3 className="text-2xl font-script font-bold text-ornamental-700 mb-4">
                Visión
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {getDescripcion("Visión")}
              </p>
            </div>

            {/* Valores */}
            <div className="text-center p-8 rounded-3xl bg-ornamental-50 hover:shadow-md transition-all duration-300">
              <div className="inline-flex p-4 rounded-2xl bg-ornamental-200 mb-6">
                <Heart className="h-8 w-8 text-ornamental-800" />
              </div>
              <h3 className="text-2xl font-script font-bold text-ornamental-700 mb-4">
                Valores
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {getDescripcion("Valores")}
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
                  {getDescripcion("Nuestra historia")}
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
