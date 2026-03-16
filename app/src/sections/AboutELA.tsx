import { AlertCircle, DollarSign, Activity, Brain } from 'lucide-react';

export const AboutELA = () => {
  const facts = [
    {
      icon: Brain,
      title: '¿Qué es el ELA?',
      description:
        'La Esclerosis Lateral Amiotrófica (ELA) es una enfermedad neurodegenerativa que afecta las neuronas motoras del cerebro y la médula espinal, causando debilitamiento progresivo de los músculos.',
    },
    {
      icon: Activity,
      title: 'Progresión',
      description:
        'El ELA es progresivo y actualmente no tiene cura. Los tratamientos se enfocan en ralentizar la progresión y mejorar la calidad de vida del paciente.',
    },
    {
      icon: DollarSign,
      title: 'Costos Elevados',
      description:
        'Los tratamientos, medicamentos, terapias y cuidados especiales representan un costo mensual que puede superar los $50,000 MXN, sin contar equipos médicos especializados.',
    },
    {
      icon: AlertCircle,
      title: 'Impacto',
      description:
        'El ELA afecta no solo al paciente sino a toda su familia, requiriendo cuidados constantes y apoyo emocional y económico continuo.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sobre el ELA
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La Esclerosis Lateral Amiotrófica es una enfermedad poco conocida pero devastadora
          </p>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-teal-500"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <fact.icon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{fact.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{fact.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-900 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Por qué necesito tu ayuda?
              </h3>
              <p className="text-blue-100 leading-relaxed">
                Los tratamientos para el ELA son extremadamente costosos. Los medicamentos
                especializados, las terapias físicas diarias, la atención médica especializada y
                el equipamiento necesario representan gastos mensuales que superan ampliamente
                nuestras posibilidades económicas. Tu participación en esta rifa puede marcar la
                diferencia en mi tratamiento y calidad de vida.
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl font-bold text-teal-400">$50,000+</div>
              <div className="text-blue-200 text-sm">pesos mensuales en tratamientos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
