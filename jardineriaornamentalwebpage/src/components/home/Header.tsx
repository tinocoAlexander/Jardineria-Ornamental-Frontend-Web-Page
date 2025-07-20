import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-ornamental-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Error trying to load the logo"
              className="h-10"
            />
            <div>
              <h1 className="text-3xl font-script font-bold text-ornamental-700">
                Jardinería Ornamental
              </h1>
              <p className="text-sm text-ornamental-600 font-medium">
                Servicios Profesionales
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("ai-estimator")}
              className="text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
            >
              Cotizacion
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
            >
              Galería
            </button>
            {isAuthenticated && (
              <>
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 transition-colors font-medium"
                >
                  Salir
                </button>
              </>
            )}
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection("booking")}
            className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-ornamental-500 to-ornamental-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
          >
            <Phone className="h-4 w-4" />
            <span>Solicitar Cita</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
              >
                Galería
              </button>
              {isAuthenticated && (
                <>
                  <Link
                    to="/admin"
                    className="text-left text-gray-700 hover:text-ornamental-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:text-red-800 transition-colors font-medium"
                  >
                    Salir
                  </button>
                </>
              )}
              <button
                onClick={() => scrollToSection("booking")}
                className="flex items-center space-x-2 bg-gradient-to-r from-ornamental-500 to-ornamental-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 w-fit font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>Solicitar Cita</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
