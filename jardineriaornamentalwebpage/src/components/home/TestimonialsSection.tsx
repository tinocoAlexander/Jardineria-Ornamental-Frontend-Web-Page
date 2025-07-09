import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'María González',
      role: 'Propietaria de Centro de Jardinería',
      content: 'Jardinería Ornamental ha revolucionado nuestras operaciones de mantenimiento. Ahorramos 40% del tiempo y nuestros clientes adoran los resultados de precisión.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      location: 'Madrid'
    },
    {
      name: 'Carlos Ruiz',
      role: 'Profesional en Paisajismo',
      content: 'La navegación IA es increíble. Maneja diseños complejos de jardín mejor que el trabajo manual, y la operación eco-friendly se alinea con nuestros valores.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      location: 'Barcelona'
    },
    {
      name: 'Ana Martín',
      role: 'Propietaria de Hogar',
      content: 'Nuestro jardín grande ahora se mantiene perfectamente sin ningún esfuerzo de nuestra parte. ¡La inversión se pagó sola en el primer año!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      location: 'Valencia'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-ornamental-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-script font-bold text-ornamental-700 mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra cómo las soluciones inteligentes de Jardinería Ornamental han transformado jardines en toda España
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative border border-ornamental-100"
            >
              <div className="absolute top-4 right-4 text-ornamental-200">
                <Quote className="h-8 w-8" />
              </div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-ornamental-200"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                  <p className="text-ornamental-600 text-sm font-medium">{testimonial.role}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-500 text-xs">{testimonial.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-ornamental-400 to-nature-400 rounded-b-3xl"></div>
            </div>
          ))}
        </div>

        {/* Additional testimonial stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white p-8 rounded-2xl shadow-lg border border-ornamental-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-ornamental-600">4.9/5</div>
              <div className="text-sm text-gray-600">Calificación Promedio</div>
            </div>
            <div className="w-px h-12 bg-ornamental-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-nature-600">250+</div>
              <div className="text-sm text-gray-600">Reseñas Verificadas</div>
            </div>
            <div className="w-px h-12 bg-ornamental-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ornamental-600">95%</div>
              <div className="text-sm text-gray-600">Recomendarían</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;