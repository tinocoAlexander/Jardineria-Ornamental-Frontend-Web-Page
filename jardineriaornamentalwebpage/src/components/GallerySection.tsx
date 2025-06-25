import React from 'react';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';

const GallerySection: React.FC = () => {
  const galleryImages = [
    {
      url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      title: 'Resultados Profesionales',
      description: 'Calidad de mantenimiento comercial',
      location: 'Hotel Resort - Sevilla',
      date: '2024'
    },
    {
      url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      title: 'Resultados Profesionales',
      description: 'Calidad de mantenimiento comercial',
      location: 'Hotel Resort - Sevilla',
      date: '2024'
    },
    {
      url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      title: 'Resultados Profesionales',
      description: 'Calidad de mantenimiento comercial',
      location: 'Hotel Resort - Sevilla',
      date: '2024'
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-white to-ornamental-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-script font-bold text-ornamental-700 mb-4">
            Nuestros Proyectos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore nuestras soluciones automatizadas de jardinería y vea el futuro del mantenimiento de espacios verdes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <div className="aspect-square">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-gray-200 mb-3 text-sm leading-relaxed">{image.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-300 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{image.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{image.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm font-medium">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>Ver Detalles</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;