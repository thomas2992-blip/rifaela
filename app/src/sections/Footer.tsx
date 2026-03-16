import { Heart, MessageCircle, Facebook } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Rifa Solidaria
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Esta rifa fue creada con el objetivo de recaudar fondos para los tratamientos de
                Thomas Diniz en su lucha contra el ELA.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <a
                    href="https://wa.me/525519808217"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-400 transition-colors"
                  >
                    +52 55 1980 8217
                  </a>
                </li>
                <li>Thomas Diniz Antas</li>
                <li>Ciudad de México, México</li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-bold mb-4">Compartir</h3>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent('Ayuda a Thomas en su lucha contra el ELA. Participa en la rifa solidaria: ' + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Rifa Solidaria Thomas Diniz. Todos los derechos reservados.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Hecho con <Heart className="w-3 h-3 inline text-red-400" /> para ayudar a Thomas
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
