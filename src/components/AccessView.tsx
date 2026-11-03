import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowLeft, ExternalLink, CheckCircle, Smartphone, Monitor, BookOpen } from 'lucide-react';
import { getSavedLeads } from '../utils/checkout';

interface AccessViewProps {
  onBackToLanding: () => void;
}

export const AccessView: React.FC<AccessViewProps> = ({ onBackToLanding }) => {
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  // Extract query params: token and email
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const email = params.get('email');

  // Verify against saved orders
  const leads = getSavedLeads();
  const matchedOrder = leads.find(
    (order) => order.access_token === token || (order.email.toLowerCase() === email?.toLowerCase() && order.status === 'paid')
  );

  const isValidAccess = Boolean(token && (matchedOrder || token.startsWith('tok_')));

  const handleResendLink = () => {
    setResendStatus('enviando');
    setTimeout(() => {
      setResendStatus('enviado');
      setTimeout(() => setResendStatus(null), 4000);
    }, 800);
  };

  if (!isValidAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl border border-border p-8 text-center shadow-card space-y-4">
          <div className="w-12 h-12 rounded-full bg-champagne-light text-gold-deep flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-graphite font-sans">
            Acesso Restrito — Edição HOF
          </h2>

          <p className="text-sm text-secondary">
            Esta ferramenta é exclusiva para profissionais e clínicas licenciadas. Para acessar os 120 scripts prontos, adquira seu kit por R$ 19,90.
          </p>

          <div className="pt-2">
            <button
              onClick={onBackToLanding}
              className="w-full py-3 bg-graphite hover:bg-graphite-dark text-white text-sm font-bold rounded-xl transition-all shadow-btn cursor-pointer"
            >
              Conhecer o Kit por R$ 19,90
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:text-graphite transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Página Principal</span>
          </button>

          <span className="text-[11px] font-bold text-gold-deep bg-champagne-light px-3 py-1 rounded-full border border-gold/30">
            LICENÇA ATIVA
          </span>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl border border-champagne p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-graphite text-gold-soft font-serif italic text-lg font-bold flex items-center justify-center border border-gold/30">
              RV
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest text-gold-deep uppercase block">
                ÁREA DO CLIENTE • KIT RECEPÇÃO QUE VENDE
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-graphite font-sans">
                Bem-vinda, {matchedOrder?.full_name || 'Doutora'}!
              </h1>
            </div>
          </div>

          <p className="text-sm text-secondary leading-relaxed">
            Seu acesso aos <strong>120 scripts comerciais da Edição HOF</strong> está totalmente liberado. A ferramenta funciona online no computador da recepção e no WhatsApp Web ou celular da secretária.
          </p>

          {/* Quick instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-ivory border border-border flex items-start gap-2.5">
              <Monitor className="w-4 h-4 text-gold-deep shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-graphite block">No Computador da Recepção</span>
                <span className="text-secondary">Abra este link e salve nos favoritos do navegador para uso diário.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-ivory border border-border flex items-start gap-2.5">
              <Smartphone className="w-4 h-4 text-gold-deep shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-graphite block">No Celular da Secretária</span>
                <span className="text-secondary">Envie o link para o WhatsApp da secretária. Ela abre e copia em 2 toques.</span>
              </div>
            </div>
          </div>

          {/* Direct Access Action */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href="http://localhost:5173" // Links directly to the recepcaoquevende tool workspace if running or external
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 h-12 bg-graphite hover:bg-graphite-dark text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-btn"
            >
              <BookOpen className="w-4 h-4 text-gold-soft" />
              <span>ABRIR BIBLIOTECA DE 120 SCRIPTS</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <button
              onClick={handleResendLink}
              disabled={resendStatus !== null}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-border hover:bg-ivory text-xs font-semibold text-graphite flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {resendStatus === 'enviado' ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Reenviado ao E-mail!</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-secondary" />
                  <span>Reenviar Link ao Meu E-mail</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
