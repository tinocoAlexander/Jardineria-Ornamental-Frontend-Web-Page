import { useState } from 'react';
import { Send, Bot, User, Calculator, Leaf } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIEstimatorSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy su asistente de Jardinería Ornamental. Puedo ayudarle a calcular costos para automatización de jardines. Pruebe preguntando: "¿Cuánto costaría automatizar un jardín de 100m²?"',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateEstimate = (area: number): string => {
    const basePrice = 3500;
    const pricePerSqm = 18;
    const installation = 750;
    const total = basePrice + (area * pricePerSqm) + installation;
    
    return `Para un jardín de ${area}m², nuestro presupuesto estimado es:
    
• Equipo base cortacésped inteligente: €${basePrice.toLocaleString()}
• Cobertura de área (${area}m² × €${pricePerSqm}/m²): €${(area * pricePerSqm).toLocaleString()}
• Instalación y configuración: €${installation.toLocaleString()}
• Mantenimiento primer año incluido
• Total estimado: €${total.toLocaleString()}

Incluye cortacésped robótico, estación meteorológica, app móvil y garantía extendida. ¿Le gustaría agendar una consulta personalizada?`;
  };

  const processMessage = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Extract area from message
    const areaMatch = text.match(/(\d+)\s*m²?/);
    if (areaMatch) {
      const area = parseInt(areaMatch[1]);
      return generateEstimate(area);
    }
    
    if (lowerText.includes('costo') || lowerText.includes('precio') || lowerText.includes('presupuesto') || lowerText.includes('cuanto')) {
      return 'Me encantaría ayudarle con el presupuesto. Por favor, indíqueme el área de su jardín en metros cuadrados (m²). Por ejemplo: "Tengo un jardín de 150m²."';
    }
    
    if (lowerText.includes('hola') || lowerText.includes('buenos') || lowerText.includes('buenas')) {
      return '¡Hola! Bienvenido a Jardinería Ornamental. Estoy aquí para ayudarle con presupuestos de automatización de jardines. ¿Cuál es el tamaño de su área verde?';
    }
    
    if (lowerText.includes('cita') || lowerText.includes('consulta') || lowerText.includes('visita')) {
      return '¡Excelente! Le conectaré con nuestro sistema de citas. Por favor, desplácese hacia abajo hasta la sección "Solicitar Cita" para agendar su consulta personalizada.';
    }
    
    if (lowerText.includes('bateria') || lowerText.includes('autonomia') || lowerText.includes('duracion')) {
      return 'Nuestros cortacéspedes inteligentes tienen excelente autonomía: hasta 4 horas de operación continua. Se recargan automáticamente cuando es necesario.';
    }
    
    if (lowerText.includes('lluvia') || lowerText.includes('clima') || lowerText.includes('tiempo')) {
      return 'Nuestros equipos son resistentes al clima (IP65) y pausan automáticamente durante la lluvia, reanudando cuando las condiciones mejoran.';
    }

    if (lowerText.includes('mantenimiento') || lowerText.includes('servicio')) {
      return 'Ofrecemos planes de mantenimiento completos que incluyen revisiones periódicas, afilado de cuchillas, actualizaciones de software y soporte técnico 24/7.';
    }
    
    return 'Puedo ayudarle con presupuestos para automatización de jardines. Indíqueme el tamaño de su jardín en metros cuadrados, o pregunte sobre nuestros servicios.';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: processMessage(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="ai-estimator" className="py-20 bg-gradient-to-br from-nature-50 to-ornamental-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-script font-bold text-ornamental-700 mb-4">
              Cotizador Inteligente
            </h2>
            <p className="text-xl text-gray-600">
              Obtenga presupuestos instantáneos para su proyecto de automatización de jardín
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-ornamental-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-ornamental-600 to-nature-500 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Asistente Jardinería Ornamental</h3>
                  <p className="text-white/80 text-sm">En línea ahora</p>
                </div>
                <div className="ml-auto">
                  <Calculator className="h-6 w-6 text-white/80" />
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-ornamental-50/30">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md`}>
                    {message.sender === 'bot' && (
                      <div className="flex-shrink-0 p-2 bg-ornamental-100 rounded-full">
                        <Bot className="h-4 w-4 text-ornamental-600" />
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-ornamental-600 to-nature-500 text-white'
                          : 'bg-white text-gray-900 shadow-lg border border-ornamental-100'
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0 p-2 bg-nature-100 rounded-full">
                        <User className="h-4 w-4 text-nature-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 p-2 bg-ornamental-100 rounded-full">
                      <Bot className="h-4 w-4 text-ornamental-600" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-ornamental-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-ornamental-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-ornamental-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-ornamental-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-ornamental-200 p-6 bg-white">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pregunte sobre precios, características o solicite una cita..."
                  className="flex-1 p-4 border border-ornamental-300 rounded-2xl focus:ring-2 focus:ring-ornamental-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="p-4 bg-gradient-to-r from-ornamental-600 to-nature-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEstimatorSection;