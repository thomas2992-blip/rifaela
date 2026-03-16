import { useState } from 'react';
import { Lock, LogOut, Check, X, Download, Upload, Search, User, Phone, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useRaffleData } from '@/hooks/useRaffleData';
import { toast } from 'sonner';

export const AdminPanel = () => {
  const {
    numbers,
    stats,
    isAdmin,
    isLoading,
    error,
    loginAsAdmin,
    logoutAdmin,
    markAsSold,
    markAsAvailable,
    exportData,
    importData,
  } = useRaffleData();

  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importText, setImportText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = () => {
    if (loginAsAdmin(password)) {
      toast.success('Bienvenido, Thomas');
      setPassword('');
    } else {
      toast.error('Contraseña incorrecta');
    }
  };

  const handleMarkAsSold = async () => {
    if (selectedNumbers.length === 0) {
      toast.error('Selecciona al menos un número');
      return;
    }
    setIsProcessing(true);
    const success = await markAsSold(selectedNumbers);
    if (success) {
      toast.success(`${selectedNumbers.length} número(s) marcado(s) como vendido(s)`);
      setSelectedNumbers([]);
    } else {
      toast.error('Error al marcar como vendido');
    }
    setIsProcessing(false);
  };

  const handleMarkAsAvailable = async () => {
    if (selectedNumbers.length === 0) {
      toast.error('Selecciona al menos un número');
      return;
    }
    setIsProcessing(true);
    const success = await markAsAvailable(selectedNumbers);
    if (success) {
      toast.success(`${selectedNumbers.length} número(s) marcado(s) como disponible(s)`);
      setSelectedNumbers([]);
    } else {
      toast.error('Error al marcar como disponible');
    }
    setIsProcessing(false);
  };

  const handleExport = async () => {
    const data = await exportData();
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `raffela_data_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Datos exportados correctamente');
    } else {
      toast.error('Error al exportar datos');
    }
  };

  const handleImport = async () => {
    setIsProcessing(true);
    const success = await importData(importText);
    if (success) {
      toast.success('Datos importados correctamente');
      setImportText('');
      setShowImportDialog(false);
    } else {
      toast.error('Error al importar datos');
    }
    setIsProcessing(false);
  };

  const filteredNumbers = numbers.filter((n) => {
    if (searchTerm === '') return n.status !== 'available';
    return (
      n.number.toString().includes(searchTerm) &&
      n.status !== 'available'
    );
  });

  if (!isAdmin) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Panel de Administración</h2>
                <p className="text-gray-500">Solo para Thomas</p>
              </div>

              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button onClick={handleLogin} className="w-full bg-teal-500 hover:bg-teal-600">
                  <Lock className="w-4 h-4 mr-2" />
                  Ingresar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Panel de Administración</h2>
              <p className="text-gray-500">Gestiona los números de la rifa</p>
            </div>
            <Button variant="outline" onClick={logoutAdmin}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="text-3xl font-bold text-green-600">{stats.available}</div>
              <div className="text-sm text-gray-500">Disponibles</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="text-3xl font-bold text-yellow-600">{stats.reserved}</div>
              <div className="text-sm text-gray-500">Reservados</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="text-3xl font-bold text-red-600">{stats.sold}</div>
              <div className="text-sm text-gray-500">Vendidos</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="text-3xl font-bold text-blue-600">
                ${stats.sold * 100 + stats.reserved * 100}
              </div>
              <div className="text-sm text-gray-500">Estimado (MXN)</div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl p-4 shadow mb-8">
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={handleMarkAsSold} 
                variant="default" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                Marcar como Vendido
              </Button>
              <Button 
                onClick={handleMarkAsAvailable} 
                variant="outline"
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <X className="w-4 h-4 mr-2" />}
                Marcar como Disponible
              </Button>
              <Button onClick={handleExport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={() => setShowImportDialog(true)} variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
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

          {/* Reserved/Sold Numbers List */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Números Reservados y Vendidos</h3>
              {isLoading && <Loader2 className="w-5 h-5 animate-spin text-teal-500" />}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredNumbers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  {isLoading ? 'Cargando...' : 'No hay números reservados o vendidos'}
                </div>
              ) : (
                <div className="divide-y">
                  {filteredNumbers.map((n) => (
                    <div
                      key={n.number}
                      className={`p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                        selectedNumbers.includes(n.number) ? 'bg-teal-50' : ''
                      }`}
                      onClick={() =>
                        setSelectedNumbers((prev) =>
                          prev.includes(n.number)
                            ? prev.filter((num) => num !== n.number)
                            : [...prev, n.number]
                        )
                      }
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                            n.status === 'sold'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {n.number}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{n.reservedBy?.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="w-4 h-4" />
                            <span>{n.reservedBy?.phone}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={n.status === 'sold' ? 'destructive' : 'default'}
                        className={
                          n.status === 'reserved' ? 'bg-yellow-500 hover:bg-yellow-600' : ''
                        }
                      >
                        {n.status === 'sold' ? 'Vendido' : 'Reservado'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Datos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <textarea
              className="w-full h-48 p-3 border rounded-lg font-mono text-sm"
              placeholder="Pega aquí el JSON de datos..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            <Button onClick={handleImport} className="w-full" disabled={isProcessing}>
              {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              Importar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
