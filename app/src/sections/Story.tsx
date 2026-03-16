import { User, MapPin, Briefcase, Heart } from 'lucide-react';

export const Story = () => {
  return (
    <section id="historia" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mi Historia
          </h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/thomas.jpg"
                  alt="Thomas Diniz en terapia"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-teal-500 text-white p-4 rounded-xl shadow-lg">
                <Heart className="w-8 h-8" />
              </div>
            </div>

            {/* Story content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-gray-600">
                <User className="w-5 h-5 text-teal-500" />
                <span>Thomas Diniz Antas</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-teal-500" />
                <span>Ciudad de México, México</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Briefcase className="w-5 h-5 text-teal-500" />
                <span>Ex trabajador de oficina</span>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Hola, soy <strong>Thomas Diniz</strong>. Hace no mucho tiempo, llevaba una vida
                  completamente normal. Trabajaba en una oficina en la Ciudad de México, tenía mis
                  rutinas, mis sueños y mis planes para el futuro.
                </p>
                <p>
                  Todo cambió drásticamente cuando recibí el diagnóstico de{' '}
                  <strong className="text-teal-600">Esclerosis Lateral Amiotrófica (ELA)</strong>,
                  una enfermedad neurodegenerativa que afecta las neuronas motoras y debilita
                  progresivamente los músculos del cuerpo.
                </p>
                <p>
                  De la noche a la mañana, mi mundo se volvió de cabeza. Las simples actividades
                  diarias se convirtieron en desafíos enormes. Pero a pesar de todo, mantengo la
                  esperanza y la fe de que con el tratamiento adecuado puedo mejorar mi calidad de
                  vida.
                </p>
                <p className="text-teal-600 font-medium">
                  Con tu ayuda, puedo continuar con mis tratamientos y terapias. Cada número que
                  compres es una esperanza más para mí.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
