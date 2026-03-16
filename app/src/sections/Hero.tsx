import { Heart, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToNumbers = () => {
    document.getElementById('numeros')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <Heart className="w-5 h-5 text-red-400 animate-pulse" />
          <span className="text-white/90 text-sm font-medium">Rifa Solidaria</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Ayuda a <span className="text-teal-300">Thomas</span>
          <br />
          <span className="text-2xl md:text-4xl lg:text-5xl font-normal text-white/90">
            en su lucha contra el ELA
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Participa en nuestra rifa solidaria y gana un increíble{' '}
          <span className="text-teal-300 font-semibold">DJI Mini 4 Pro</span>
          <br className="hidden md:block" />
          {' '}mientras apoyas los tratamientos de Thomas
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToNumbers}
            size="lg"
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-teal-500/30 transition-all hover:scale-105"
          >
            Participar Ahora
          </Button>
          <Button
            onClick={() => document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
          >
            Conoce mi Historia
          </Button>
        </div>

        <div className="mt-16 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/50 mx-auto" />
        </div>
      </div>
    </section>
  );
};
