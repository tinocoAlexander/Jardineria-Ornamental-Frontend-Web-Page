import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Send, CheckCircle, Leaf } from "lucide-react";
import { useAppState } from "../../contexts/AppStateContext";

const BookingSection: React.FC = () => {
  const { addAppointment, services, loadServices } = useAppState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addAppointment(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert("Hubo un problema al agendar la cita. Intenta de nuevo.");
      console.error("Error al agendar cita:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="booking"
      className="py-20 bg-gradient-to-br from-ornamental-50 to-nature-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script font-bold text-ornamental-700 mb-4">
              Solicite Su Consulta
            </h2>
            <p className="text-xl text-gray-600">
              Programe una evaluación gratuita y obtenga su plan personalizado
              de automatización
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-ornamental-200">
            <div className="grid lg:grid-cols-2">
              {/* Lado izquierdo - información */}
              <div className="bg-gradient-to-br from-ornamental-600 to-nature-500 p-12 text-white">
                <div className="flex items-center space-x-3 mb-8">
                  <Leaf className="h-8 w-8" />
                  <h3 className="text-3xl font-script font-bold">
                    ¿Por Qué Elegirnos?
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Consulta Especializada
                      </h4>
                      <p className="text-white/80">
                        Asesoramiento personalizado de nuestros especialistas en
                        automatización
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Horarios Flexibles</h4>
                      <p className="text-white/80">
                        Elija el horario que mejor se adapte a su agenda
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Respuesta Rápida</h4>
                      <p className="text-white/80">
                        Confirmamos su cita dentro de 2 horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Sin Compromiso</h4>
                      <p className="text-white/80">
                        Evaluación y presupuesto completamente gratuitos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <h4 className="font-semibold mb-3">
                    Qué Incluye la Consulta:
                  </h4>
                  <ul className="text-white/80 space-y-2 text-sm">
                    <li>• Evaluación completa del sitio y mediciones</li>
                    <li>• Demostración de tecnología en vivo</li>
                    <li>• Diseño de solución personalizada</li>
                    <li>• Desglose detallado de costos</li>
                    <li>• Cronograma de implementación</li>
                    <li>• Plan de mantenimiento a largo plazo</li>
                  </ul>
                </div>
              </div>

              {/* Lado derecho - formulario */}
              <div className="p-12">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 bg-nature-100 rounded-full mb-6">
                      <Calendar className="h-8 w-8 text-nature-600" />
                    </div>
                    <h3 className="text-2xl font-script font-bold text-ornamental-700 mb-4">
                      ¡Cita Agendada!
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nos pondremos en contacto con usted dentro de 2 horas para
                      confirmar los detalles de su cita y coordinar la visita.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-ornamental-300 rounded-2xl focus:ring-2 focus:ring-ornamental-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-4 border border-ornamental-300 rounded-2xl focus:ring-2 focus:ring-ornamental-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full p-4 border border-ornamental-300 rounded-2xl focus:ring-2 focus:ring-ornamental-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Servicio de Interés
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-ornamental-300 rounded-2xl focus:ring-2 focus:ring-ornamental-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Seleccione un servicio</option>
                        {services
                          .filter((s) => s.activo)
                          .map((service) => (
                            <option key={service._id} value={service.nombre}>
                              {service.nombre}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Fecha Preferida
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full p-4 border border-ornamental-300 rounded-2xl focus:ring-2 focus:ring-ornamental-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Información Adicional
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Cuéntenos sobre el tamaño de su jardín, desafíos actuales de mantenimiento, o requisitos específicos..."
                        className="w-full p-4 border border-ornamental-300 rounded-2xl focus:ring-2 focus:ring-ornamental-500 focus:border-transparent outline-none transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-ornamental-600 to-nature-500 text-white p-4 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Agendando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Agendar Cita</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
