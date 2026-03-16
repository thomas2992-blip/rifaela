import { Heart, Users, Sparkles } from 'lucide-react';

export const Gratitude = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full mb-6">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Gracias de corazón</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Un Mensaje de Gratitud
          </h2>

          <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full mb-8" />

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-100 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-6" />

              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Querida familia, amigos y personas de buen corazón que están viendo esto:
                </p>
                <p>
                  No tengo palabras suficientes para expresar cuánto significa para mí que estén
                  aquí, leyendo mi historia y considerando ayudarme en este momento tan difícil.
                </p>
                <p>
                  El ELA ha cambiado mi vida de maneras que nunca imaginé, pero también me ha
                  enseñado el valor de la{' '}
                  <span className="text-pink-600 font-semibold">solidaridad</span>, la{' '}
                  <span className="text-teal-600 font-semibold">esperanza</span> y el{' '}
                  <span className="text-blue-600 font-semibold">amor</span> de las personas que me
                  rodean.
                </p>
                <p>
                  Cada número que compras no es solo una oportunidad de ganar un increíble drone,
                  es una oportunidad de vida para mí. Es una terapia más, un medicamento más, un
                  día más de esperanza.
                </p>
                <p className="font-semibold text-gray-900">
                  Desde el fondo de mi corazón: ¡GRACIAS!
                </p>
                <p>
                  Gracias por creer en mí, por apoyarme y por ser parte de esta lucha. Juntos,
                  podemos hacer que cada día cuente.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4">
                  <Users className="w-8 h-8 text-teal-500" />
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Thomas Diniz Antas</p>
                    <p className="text-sm text-gray-500">Con amor y gratitud</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-pink-100 text-pink-700 px-6 py-3 rounded-full font-medium">
              #JuntosPorThomas
            </div>
            <div className="bg-teal-100 text-teal-700 px-6 py-3 rounded-full font-medium">
              #RifaSolidaria
            </div>
            <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-medium">
              #EsperanzaELA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
