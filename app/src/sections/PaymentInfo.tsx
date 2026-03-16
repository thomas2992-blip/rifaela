import { Copy, Check, MessageCircle, CreditCard, User, Building, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { PAYMENT_INFO } from '@/types';

export const PaymentInfo = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copiado al portapapeles`);
    setTimeout(() => setCopied(null), 2000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola Thomas, quiero participar en la rifa. Ya realicé el pago y te envío el comprobante.`
    );
    window.open(`https://wa.me/${PAYMENT_INFO.whatsapp.replace(/\s/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section id="pago" className="py-20 bg-gradient-to-br from-blue-900 to-teal-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Información de Pago
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Realiza tu pago y envía el comprobante por WhatsApp para confirmar tu participación
          </p>
          <div className="w-20 h-1 bg-teal-400 mx-auto rounded-full mt-4" />
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Bank Transfer - Mexico */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Transferencia México</h3>
                <p className="text-gray-500 text-sm">Banco Klar</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4" />
                  Banco
                </label>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{PAYMENT_INFO.bank}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4" />
                  Cuenta / CLABE
                </label>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono font-medium text-gray-900 text-sm break-all">
                    {PAYMENT_INFO.account}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(PAYMENT_INFO.account, 'Cuenta')}
                  >
                    {copied === 'Cuenta' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" />
                  Titular
                </label>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-gray-900">{PAYMENT_INFO.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(PAYMENT_INFO.name, 'Nombre')}
                  >
                    {copied === 'Nombre' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* PIX - Brazil */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">PIX Brasil</h3>
                <p className="text-gray-500 text-sm">Transferencia instantánea</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <label className="text-sm text-green-700 flex items-center gap-2 mb-1">
                  <QrCode className="w-4 h-4" />
                  Chave PIX (CPF)
                </label>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono font-bold text-green-900 text-lg">
                    {PAYMENT_INFO.pix}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(PAYMENT_INFO.pix, 'PIX')}
                    className="text-green-700 hover:text-green-800 hover:bg-green-100"
                  >
                    {copied === 'PIX' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" />
                  Titular
                </label>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-gray-900">{PAYMENT_INFO.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(PAYMENT_INFO.name, 'Nombre PIX')}
                  >
                    {copied === 'Nombre PIX' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-green-800">
                  <strong>💡 Tip:</strong> Abre tu app bancaria, selecciona PIX y pega la clave arriba.
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Enviar Comprobante</h3>
                <p className="text-gray-500 text-sm">Por WhatsApp</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <label className="text-sm text-green-700 flex items-center gap-2 mb-1">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </label>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono font-medium text-green-900 text-lg">
                    {PAYMENT_INFO.whatsapp}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(PAYMENT_INFO.whatsapp, 'WhatsApp')}
                    className="text-green-700 hover:text-green-800 hover:bg-green-100"
                  >
                    {copied === 'WhatsApp' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">Instrucciones:</h4>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      1
                    </span>
                    Realiza la transferencia o PIX
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      2
                    </span>
                    Captura el comprobante
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      3
                    </span>
                    Envía por WhatsApp
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      4
                    </span>
                    Espera confirmación
                  </li>
                </ol>
              </div>

              <Button
                onClick={openWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Abrir WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Important note */}
        <div className="max-w-5xl mx-auto mt-8">
          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800">Importante</h4>
              <p className="text-yellow-700 text-sm">
                Una vez realizado el pago, envía el comprobante por WhatsApp junto con los números
                que seleccionaste. Tu número será marcado como "vendido" después de confirmar el
                pago. Los números reservados tienen un tiempo límite de 24 horas para completar el
                pago.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
