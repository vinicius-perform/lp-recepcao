import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  Copy,
  Check,
  QrCode,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Clock,
  UserCheck,
  Lock,
} from 'lucide-react';
import { OrderRecord } from '../types';
import { confirmOrderPayment } from '../utils/checkout';
import { maskCardNumber, maskCardExpiry, maskCPF } from '../utils/mask';

interface CheckoutModalProps {
  order: OrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentConfirmed: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  order,
  isOpen,
  onClose,
  onPaymentConfirmed,
}) => {
  const [tab, setTab] = useState<'pix' | 'card'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Credit Card Form State (pre-populated with buyer info)
  const [cardHolder, setCardHolder] = useState(order?.full_name || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardCpf, setCardCpf] = useState('');
  const [cardErrors, setCardErrors] = useState<{ [key: string]: string }>({});

  // 15-minute Pix countdown timer
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (order?.full_name) {
      setCardHolder(order.full_name);
    }
  }, [order?.full_name]);

  useEffect(() => {
    if (!isOpen || order?.status === 'paid') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, order?.status]);

  if (!isOpen || !order) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Unique Pix Copia e Cola code generated based on the actual order ID
  const pixCode = `00020126580014br.gov.bcb.pix0136rqv-${order.id.toLowerCase()}520400005303986540519.905802BR5925RECEPCAO QUE VENDE HOF6009SAO PAULO62070503***6304E8F2`;

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSimulatePaymentConfirmation = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const updated = confirmOrderPayment(order.id);
      setIsVerifying(false);
      if (updated) {
        onPaymentConfirmed(updated);
      }
    }, 1200);
  };

  const handlePayCard = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!cardNumber || cardNumber.replace(/\D/g, '').length < 16) {
      errors.cardNumber = 'Informe um cartão válido de 16 dígitos';
    }
    if (!cardExpiry || cardExpiry.length < 5) {
      errors.cardExpiry = 'Informe MM/AA';
    }
    if (!cardCvv || cardCvv.length < 3) {
      errors.cardCvv = 'Informe o CVV';
    }
    if (!cardHolder.trim()) {
      errors.cardHolder = 'Informe o nome do titular';
    }

    setCardErrors(errors);
    if (Object.keys(errors).length > 0) return;

    handleSimulatePaymentConfirmation();
  };

  const isPaid = order.status === 'paid';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-graphite/75 backdrop-blur-md animate-fade-in">
      <div
        className="bg-white w-full max-w-xl rounded-2xl border border-champagne shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com Progress Stepper */}
        <div className="p-4 sm:p-5 bg-ivory border-b border-border">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-graphite text-gold-soft font-serif italic text-sm font-bold flex items-center justify-center border border-gold/30 shrink-0">
                RV
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-gold-deep uppercase block">
                  CHECKOUT SEGURO • PAGAMENTO ÚNICO
                </span>
                <h3 className="text-base sm:text-lg font-bold text-graphite font-sans leading-tight">
                  {isPaid ? 'Acesso Confirmado!' : 'Pagamento — Kit Recepção que Vende'}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-secondary hover:text-graphite hover:bg-black/5 transition-colors cursor-pointer shrink-0"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Visual */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1 font-semibold">
            <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">1. Dados Preenchidos</span>
            </div>
            <div
              className={`flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg border ${
                isPaid
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-white text-graphite border-gold/50 shadow-subtle'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
              <span className="truncate">2. Pagamento (R$ 19,90)</span>
            </div>
            <div
              className={`flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg border ${
                isPaid
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-ivory text-secondary border-border'
              }`}
            >
              <span className="truncate">3. Acesso Liberado</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-sm text-graphite font-sans">
          
          {/* Card: Dados do Comprador Já Preenchidos */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-ivory border border-border/90 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-graphite uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5 text-gold-deep" />
                <span>Dados de Identificação do Comprador</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Preenchido com sucesso ✓
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-secondary block text-[11px]">Nome:</span>
                <span className="font-semibold text-graphite truncate block">{order.full_name}</span>
              </div>
              <div>
                <span className="text-secondary block text-[11px]">WhatsApp:</span>
                <span className="font-semibold text-graphite block">{order.whatsapp}</span>
              </div>
              <div>
                <span className="text-secondary block text-[11px]">E-mail para entrega do acesso:</span>
                <span className="font-semibold text-graphite truncate block">{order.email}</span>
              </div>
              <div>
                <span className="text-secondary block text-[11px]">Instagram:</span>
                <span className="font-semibold text-graphite block">{order.instagram}</span>
              </div>
            </div>
          </div>

          {/* Card: Resumo do Pedido & Preço */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-champagne flex items-center justify-between shadow-subtle">
            <div>
              <span className="text-[10px] font-bold text-gold-deep tracking-wider uppercase block">
                PRODUTO SELECIONADO
              </span>
              <p className="font-bold text-graphite text-sm sm:text-base">
                Kit Recepção que Vende — Edição HOF
              </p>
              <p className="text-xs text-secondary mt-0.5">
                120 scripts prontos • 3 packs completos • Acesso online vitalício
              </p>
            </div>
            <div className="text-right shrink-0 pl-3">
              <span className="text-[11px] text-secondary block">Total à vista</span>
              <span className="text-2xl font-extrabold text-graphite tracking-tight font-sans">
                R$ 19,90
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block">
                Sem mensalidade
              </span>
            </div>
          </div>

          {/* Conditional: Se PAGO com sucesso */}
          {isPaid ? (
            <div className="space-y-4 animate-fade-in text-center py-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-subtle">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-graphite">
                  Pagamento Confirmado!
                </h4>
                <p className="text-xs sm:text-sm text-secondary mt-1 max-w-md mx-auto">
                  Parabéns, <strong className="text-graphite">{order.full_name}</strong>! Seu kit com os 120 scripts de WhatsApp já está liberado.
                </p>
              </div>

              {/* Individual Magic Link Display */}
              <div className="p-4 rounded-xl bg-ivory border border-gold/40 text-left space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-graphite uppercase tracking-wider">
                    Seu Link Seguro de Acesso:
                  </span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded">
                    Licença Ativa
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-border text-xs break-all font-mono text-graphite select-all">
                  {window.location.origin}{order.access_url}
                </div>
                <p className="text-[11px] text-secondary">
                  ✓ O comprovante e as instruções também foram enviados para <strong>{order.email}</strong>.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={order.access_url}
                  className="w-full h-12 bg-graphite hover:bg-graphite-dark text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-btn cursor-pointer"
                >
                  <span>ACESSAR OS 120 SCRIPTS AGORA</span>
                  <ExternalLink className="w-4 h-4 text-gold-soft" />
                </a>
              </div>
            </div>
          ) : (
            /* Tela de Pagamento: Tabs Pix vs Cartão */
            <div className="space-y-4">
              
              {/* Seletor de Meio de Pagamento */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-ivory border border-border">
                <button
                  type="button"
                  onClick={() => setTab('pix')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    tab === 'pix'
                      ? 'bg-white text-graphite shadow-subtle border border-gold/40'
                      : 'text-secondary hover:text-graphite'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Pix (Mais Rápido)</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                    Imediato
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTab('card')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    tab === 'card'
                      ? 'bg-white text-graphite shadow-subtle border border-gold/40'
                      : 'text-secondary hover:text-graphite'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-gold-deep" />
                  <span>Cartão de Crédito</span>
                </button>
              </div>

              {/* ABA 1: PIX */}
              {tab === 'pix' && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Timer regressivo */}
                  <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-champagne-light/50 border border-gold/30">
                    <span className="flex items-center gap-1.5 text-graphite font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gold-deep" />
                      Código Pix válido por:
                    </span>
                    <span className="font-mono font-bold text-graphite bg-white px-2 py-0.5 rounded border border-border">
                      {formattedTime}
                    </span>
                  </div>

                  {/* QR Code Container */}
                  <div className="text-center p-4 rounded-xl border border-border bg-ivory/60 flex flex-col items-center">
                    <div className="w-36 h-36 bg-white p-2 rounded-xl border border-border shadow-subtle flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-graphite" fill="currentColor">
                        <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                        <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                        <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                        <rect x="40" y="10" width="10" height="20" />
                        <rect x="20" y="40" width="20" height="10" />
                        <rect x="50" y="40" width="10" height="10" />
                        <rect x="70" y="40" width="20" height="10" />
                        <rect x="40" y="60" width="20" height="20" />
                        <rect x="70" y="70" width="20" height="20" />
                      </svg>
                    </div>
                    <span className="text-[11px] text-secondary mt-2 font-medium">
                      Abra o aplicativo do seu banco e escaneie o código QR acima
                    </span>
                  </div>

                  {/* Pix Copia e Cola */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-graphite mb-1.5">
                      Ou copie o código Pix abaixo:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={pixCode}
                        className="w-full px-3 py-2.5 text-xs font-mono rounded-lg border border-border bg-ivory text-secondary truncate focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="shrink-0 px-4 py-2.5 rounded-lg bg-graphite hover:bg-graphite-dark text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-subtle cursor-pointer active:scale-95"
                      >
                        {copiedPix ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-gold-soft" />
                            <span>Copiar Código</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Status de aguardo com indicador de pulso */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-ivory border border-border/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <span className="text-secondary">
                        Aguardando confirmação bancária do Pix...
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isVerifying}
                      onClick={handleSimulatePaymentConfirmation}
                      className="px-3 py-1.5 rounded-lg bg-champagne-light hover:bg-champagne border border-gold/40 text-graphite font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Simular confirmação bancária para teste"
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin text-gold-deep" />
                          <span>Verificando...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Confirmar Pagamento</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ABA 2: CARTÃO DE CRÉDITO */}
              {tab === 'card' && (
                <form onSubmit={handlePayCard} className="space-y-3.5 animate-fade-in">
                  
                  {/* Número do Cartão */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1">
                      Número do Cartão
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(maskCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border bg-ivory/50 text-graphite focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-secondary absolute right-3.5 top-3" />
                    </div>
                    {cardErrors.cardNumber && (
                      <p className="text-[11px] text-red-600 mt-0.5">{cardErrors.cardNumber}</p>
                    )}
                  </div>

                  {/* Nome do Titular (já pré-preenchido) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1">
                      Nome Impresso no Cartão
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Nome do titular como no cartão"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border bg-ivory/50 text-graphite focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold uppercase"
                    />
                    {cardErrors.cardHolder && (
                      <p className="text-[11px] text-red-600 mt-0.5">{cardErrors.cardHolder}</p>
                    )}
                  </div>

                  {/* Validade + CVV + CPF */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1">
                        Validade
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(maskCardExpiry(e.target.value))}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-border bg-ivory/50 text-graphite focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold font-mono text-center"
                      />
                      {cardErrors.cardExpiry && (
                        <p className="text-[10px] text-red-600 mt-0.5">{cardErrors.cardExpiry}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-border bg-ivory/50 text-graphite focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold font-mono text-center"
                      />
                      {cardErrors.cardCvv && (
                        <p className="text-[10px] text-red-600 mt-0.5">{cardErrors.cardCvv}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1">
                        CPF
                      </label>
                      <input
                        type="text"
                        value={cardCpf}
                        onChange={(e) => setCardCpf(maskCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className="w-full px-2 py-2.5 text-xs rounded-xl border border-border bg-ivory/50 text-graphite focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold font-mono text-center"
                      />
                    </div>
                  </div>

                  {/* Parcelamento */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1">
                      Condição de Pagamento
                    </label>
                    <select
                      disabled
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-ivory text-graphite cursor-not-allowed font-medium"
                    >
                      <option value="1">1x de R$ 19,90 à vista (sem juros)</option>
                    </select>
                  </div>

                  {/* Botão de Finalizar Cartão */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="w-full h-12 bg-graphite hover:bg-graphite-dark text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-btn cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-gold-soft" />
                          <span>Processando Pagamento...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-gold-soft" />
                          <span>PAGAR R$ 19,90 NO CARTÃO</span>
                          <ArrowRight className="w-4 h-4 text-gold-soft" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>

        {/* Footer com Selos de Segurança */}
        <div className="p-3.5 sm:p-4 bg-ivory border-t border-border flex items-center justify-between text-[11px] sm:text-xs text-secondary">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ambiente Seguro com Criptografia SSL 256-bit</span>
          </div>
          <span className="font-semibold text-graphite">Garantia de 7 dias</span>
        </div>
      </div>
    </div>
  );
};
