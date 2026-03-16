import { Camera, Plane, Battery, Award } from 'lucide-react';

export const Prize = () => {
  const features = [
    {
      icon: Camera,
      title: 'Cámara 4K',
      description: 'Video HDR verdadero a 4K/60fps',
    },
    {
      icon: Plane,
      title: 'Vuelo Omnidireccional',
      description: 'Sensores de obstáculos en todas direcciones',
    },
    {
      icon: Battery,
      title: '34 minutos',
      description: 'Tiempo de vuelo extendido',
    },
    {
      icon: Award,
      title: 'Peso < 249g',
      description: 'No requiere registro en muchos países',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full mb-4">
            <Award className="w-5 h-5" />
            <span className="font-medium">Premio Principal</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            DJI Mini 4 Pro
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Un drone profesional compacto con características de nivel cinematográfico
          </p>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Drone Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                <img
                  src="/images/drone.jpg"
                  alt="DJI Mini 4 Pro"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -top-4 -left-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="font-bold text-lg">Valor: $15,000+ MXN</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Características del Premio
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-teal-50 transition-colors"
                  >
                    <feature.icon className="w-8 h-8 text-teal-500 mb-2" />
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl p-6 text-white">
                <h4 className="font-bold text-lg mb-2">¿Qué incluye?</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    Drone DJI Mini 4 Pro
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    Controlador DJI RC 2 con pantalla
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    Batería inteligente
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    Hélices de repuesto
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    Cable de carga y accesorios
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
