import { useState } from "react";
import { Send, Bot, User, Calculator, Leaf } from "lucide-react";
import axios from "axios";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AIEstimatorSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy su asistente de Jardinería Ornamental. ¿En qué puedo ayudarle hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const fetchAIResponse = async (userPrompt: string): Promise<string> => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/chat-gemini", {
        prompt: userPrompt,
      });

      return response.data.reply;
    } catch (error) {
      console.error("Error al obtener respuesta de la IA:", error);
      return "Lo siento, ocurrió un error al procesar su mensaje.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    const aiResponse = await fetchAIResponse(inputText);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section
      id="ai-estimator"
      className="py-20 bg-gradient-to-br from-nature-50 to-ornamental-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-script font-bold text-ornamental-700 mb-4">
              Cotizador Inteligente
            </h2>
            <p className="text-xl text-gray-600">
              Obtenga presupuestos instantáneos para su proyecto de
              automatización de jardín
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
                  <h3 className="text-white font-semibold">
                    Asistente Jardinería Ornamental
                  </h3>
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
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-xs lg:max-w-md`}
                  >
                    {message.sender === "bot" && (
                      <div className="flex-shrink-0 p-2 bg-ornamental-100 rounded-full">
                        <Bot className="h-4 w-4 text-ornamental-600" />
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-ornamental-600 to-nature-500 text-white"
                          : "bg-white text-gray-900 shadow-lg border border-ornamental-100"
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm leading-relaxed">
                        {message.text}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.sender === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && (
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
                        <div
                          className="w-2 h-2 bg-ornamental-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-ornamental-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
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
