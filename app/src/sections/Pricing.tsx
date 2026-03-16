import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRICING } from '@/types';

export const Pricing = () => {
  const scrollToNumbers = () => {
    document.getElementById('numeros')?.scrollIntoView({ behavior: 'smooth' });
  };

  const plans = [
    {
      name: 'Individual',
      icon: Star,
      mxn: PRICING.single.mxn,
      brl: PRICING.single.brl,
      quantity: 1,
      popular: false,
      features: ['1 número de la rifa', 'Igual oportunidad de ganar', 'Participación válida'],
    },
    {
      name: 'Promo 3x2',
      icon: Zap,
      mxn: PRICING.promo3.mxn,
      brl: PRICING.promo3.brl,
      quantity: 3,
      popular: true,
      features: ['3 números de la rifa', 'Ahorras $100 MXN', 'Más oportunidades de ganar', 'Mejor valor'],
    },
    {
      name: 'Promo 10x',
      icon: Crown,
      mxn: PRICING.promo10.mxn,
      brl: PRICING.promo10.brl,
      quantity: 10,
      popular: false,
      features: [
        '10 números de la rifa',
        'Ahorras $500 MXN',
        'Máximas oportunidades',
        'Ideal para revendedores',
        'Mejor valor garantizado',
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Precios de Participación
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elige la opción que mejor se adapte a ti. Cada número te da una oportunidad de ganar
          </p>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 ${
                plan.popular
                  ? 'bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-900 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                  Más Popular
                </div>
              )}

              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    plan.popular ? 'bg-white/20' : 'bg-teal-100'
                  }`}
                >
                  <plan.icon
                    className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-teal-600'}`}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">${plan.mxn}</span>
                  <span className={plan.popular ? 'text-white/70' : 'text-gray-500'}>MXN</span>
                </div>
                <div className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                  o R$ {plan.brl} reales
                </div>
                <div
                  className={`mt-2 text-sm font-medium ${
                    plan.popular ? 'text-white/90' : 'text-teal-600'
                  }`}
                >
                  {plan.quantity} número{plan.quantity > 1 ? 's' : ''}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2">
                    <Check
                      className={`w-5 h-5 ${
                        plan.popular ? 'text-white' : 'text-teal-500'
                      }`}
                    />
                    <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToNumbers}
                className={`w-full ${
                  plan.popular
                    ? 'bg-white text-teal-600 hover:bg-gray-100'
                    : 'bg-teal-500 text-white hover:bg-teal-600'
                }`}
              >
                Elegir {plan.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            * Los precios son finales. No se requiere pago adicional.
            <br />
            * Aceptamos transferencias bancarias y depósitos.
          </p>
        </div>
      </div>
    </section>
  );
};
