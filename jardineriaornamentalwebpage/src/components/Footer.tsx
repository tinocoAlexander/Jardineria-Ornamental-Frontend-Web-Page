import React from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Award, Shield, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-ornamental-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-ornamental-400 to-nature-400 p-3 rounded-full">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-3xl font-script font-bold text-ornamental-300">
                  Jardinería Ornamental
                </span>
                <p className="text-sm text-gray-400">Servicios Profesionales</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Revolucionando el mantenimiento de espacios verdes a través de tecnología 
              inteligente y prácticas sostenibles desde 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-ornamental-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="space-y-6">
            <h3 className="text-xl font-script font-semibold text-ornamental-300">Navegación</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-ornamental-300 transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-ornamental-300 transition-colors">
                  Nosotros
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-ornamental-300 transition-colors">
                  Servicios
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-ornamental-300 transition-colors">
                  Galería
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('booking')} className="hover:text-ornamental-300 transition-colors">
                  Solicitar Cita
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-6">
            <h3 className="text-xl font-script font-semibold text-ornamental-300">Contacto</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-ornamental-400" />
                <span>+618 123 1234</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-nature-400" />
                <span>jardineriaornamental@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-ornamental-400" />
                <span>Durango, Dgo. México</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-nature-400" />
                <span>Lun-Vie: 8:00-18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificaciones */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center items-center space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-gray-400">
              <Award className="h-5 w-5 text-ornamental-400" />
              <span className="text-sm">ISO 9001 Certificado</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="h-5 w-5 text-nature-400" />
              <span className="text-sm">Garantía Extendida</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Leaf className="h-5 w-5 text-ornamental-400" />
              <span className="text-sm">100% Eco-Friendly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Jardinería Ornamental. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-ornamental-300 transition-colors">Términos de Servicio</a>
              <a href="#" className="hover:text-ornamental-300 transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-ornamental-300 transition-colors">Política de Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
