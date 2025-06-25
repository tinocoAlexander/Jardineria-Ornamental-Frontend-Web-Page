import React from 'react';
import { Leaf, Droplets, TreePine, Recycle } from 'lucide-react';

const FunFactsSection: React.FC = () => {
  const facts = [
    {
      icon: Leaf,
      percentage: '75%',
      text: 'reducción en emisiones de carbono con cortacéspedes eléctricos',
      color: 'text-nature-600',
      bgColor: 'bg-nature-50'
    },
    {
      icon: Droplets,
      percentage: '60%',
      text: 'ahorro de agua con sistemas de riego inteligente',
      color: 'text-ornamental-600',
      bgColor: 'bg-ornamental-50'
    },
    {
      icon: TreePine,
      percentage: '85%',
      text: 'mejora en la salud del césped con corte regular',
      color: 'text-ornamental-600',
      bgColor: 'bg-ornamental-50'
    },
    {
      icon: Recycle,
      percentage: '100%',
      text: 'reciclaje de recortes como fertilizante natural',
      color: 'text-nature-600',
      bgColor: 'bg-nature-50'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-ornamental-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-script font-bold text-ornamental-700 mb-4">
            ¿Sabía Que...?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra datos fascinantes sobre automatización de jardines y tecnología 
            inteligente de mantenimiento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact, index) => (
            <div 
              key={index}
              className={`${fact.bgColor} p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center border border-white/50`}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-white/70 mb-6 shadow-md`}>
                <fact.icon className={`h-8 w-8 ${fact.color}`} />
              </div>
              <div className={`text-4xl font-bold ${fact.color} mb-4 font-script`}>
                {fact.percentage}
              </div>
              <p className="text-gray-700 leading-relaxed font-medium">
                {fact.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FunFactsSection;