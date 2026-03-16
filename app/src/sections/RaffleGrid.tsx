import { useState } from 'react';
import { Search, ShoppingCart, X, Check, User, Phone, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useRaffleData } from '@/hooks/useRaffleData';
import { toast } from 'sonner';

export const RaffleGrid = () => {
  const { numbers, stats, isLoading, error, reserveNumbers } = useRaffleData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredNumbers = numbers.filter((n) => {
    if (searchTerm === '') return true;
    return n.number.toString().includes(searchTerm);
  });

  const toggleNumberSelection = (num: number) => {
    const numberData = numbers.find((n) => n.number === num);
    if (numberData?.status !== 'available') return;

    setSelectedNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleReserve = async () => {
    if (formData.name.trim() === '' || formData.phone.trim() === '') {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);
    const success = await reserveNumbers({
      name: formData.name,
      phone: formData.phone,
      numbers: selectedNumbers,
    });

    if (success) {
      toast.success(`¡Números reservados exitosamente!`);
      setSelectedNumbers([]);
      setFormData({ name: '', phone: '' });
      setIsDialogOpen(false);
    } else {
      toast.error('Error al reservar los números. Algunos pueden ya no estar disponibles.');
    }
    setIsSubmitting(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-white border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50';
      case 'reserved':
        return 'bg-yellow-100 border-2 border-yellow-400 cursor-not-allowed';
      case 'sold':
        return 'bg-red-100 border-2 border-red-400 cursor-not-allowed';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'reserved':
        return 'Reservado';
      case 'sold':
        return 'Vendido';
      default:
        return '';
    }
  };

  return (
    <section id="numeros" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Selecciona tus Números
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elige los números que deseas comprar. Los números en verde están disponibles.
          </p>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mt-4" />
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <span className="w-3 h-3 bg-white border-2 border-gray-200 rounded-full mr-2" />
            Disponibles: {stats.available}
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm bg-yellow-50">
            <span className="w-3 h-3 bg-yellow-100 border-2 border-yellow-400 rounded-full mr-2" />
            Reservados: {stats.reserved}
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm bg-red-50">
            <span className="w-3 h-3 bg-red-100 border-2 border-red-400 rounded-full mr-2" />
            Vendidos: {stats.sold}
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm">
            Total: {stats.total}
          </Badge>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Selected numbers indicator */}
        {selectedNumbers.length > 0 && (
          <div className="max-w-4xl mx-auto mb-6 bg-teal-50 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-teal-900">
                {selectedNumbers.length} número(s) seleccionado(s):
              </span>
              <span className="ml-2 text-teal-700">
                {selectedNumbers.sort((a, b) => a - b).join(', ')}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedNumbers([])}
              >
                <X className="w-4 h-4 mr-1" />
                Limpiar
              </Button>
              <Button
                size="sm"
                onClick={() => setIsDialogOpen(true)}
                className="bg-teal-500 hover:bg-teal-600"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Reservar
              </Button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-teal-500 mb-4" />
              <p className="text-gray-500">Cargando números...</p>
            </div>
          ) : (
            <div className="grid grid-cols-10 sm:grid-cols-10 md:grid-cols-20 gap-1 sm:gap-2">
              {filteredNumbers.map((numberData) => (
                <button
                  key={numberData.number}
                  onClick={() => toggleNumberSelection(numberData.number)}
                  disabled={numberData.status !== 'available'}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium
                    transition-all duration-200
                    ${getStatusColor(numberData.status)}
                    ${selectedNumbers.includes(numberData.number) ? 'ring-2 ring-teal-500 bg-teal-100' : ''}
                  `}
                  title={`Número ${numberData.number} - ${getStatusText(numberData.status)}`}
                >
                  {numberData.number}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-white border-2 border-gray-200 rounded" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-teal-100 border-2 border-teal-500 rounded" />
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded" />
            <span>Reservado</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded" />
            <span>Vendido</span>
          </div>
        </div>
      </div>

      {/* Reservation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reservar Números</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Números seleccionados</label>
              <div className="bg-gray-100 rounded-lg p-3 text-sm">
                {selectedNumbers.sort((a, b) => a - b).join(', ')}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                <User className="w-4 h-4" />
                Nombre completo
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Teléfono (WhatsApp)
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+52 55 1234 5678"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-medium mb-1">Siguientes pasos:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Completa tus datos y reserva</li>
                <li>Realiza el pago a la cuenta indicada</li>
                <li>Envía el comprobante por WhatsApp</li>
                <li>Tu número será marcado como vendido</li>
              </ol>
            </div>

            <Button 
              onClick={handleReserve} 
              className="w-full bg-teal-500 hover:bg-teal-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              Confirmar Reserva
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
