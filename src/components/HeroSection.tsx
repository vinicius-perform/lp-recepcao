import React from 'react';
import { HeroVisuals } from './HeroVisuals';
import { KIWIFY_CHECKOUT_URL } from '../config';
import { Check, Sparkles, ArrowRight, Lock, Zap } from 'lucide-react';
import { trackInitiateCheckout } from '../utils/analytics';

interface HeroSectionProps {
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPrivacyModal,
  onOpenTermsModal,
}) => {
  const handleCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackInitiateCheckout('lowify-hero');
    if (typeof window !== 'undefined' && window.location.search) {
      try {
        const currentUrl = new URL(KIWIFY_CHECKOUT_URL);
        const windowParams = new URLSearchParams(window.location.search);
        windowParams.forEach((val, key) => {
          if (key !== 'product_id') {
            currentUrl.searchParams.set(key, val);
          }
        });
        e.currentTarget.href = currentUrl.toString();
      } catch {
        // fallback
      }
    }
  };

  return (
    <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      <HeroVisuals />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Colunas 1-7: Copy Comercial */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
            
            {/* Label Superior Editorial */}
            <div className="inline-flex items-center gap-1.5 self-start px-3.5 py-1 rounded-full bg-champagne-light/80 border border-gold/40 shadow-subtle max-w-full">
              <Sparkles className="w-3 h-3 text-gold-deep shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest-editorial text-graphite uppercase font-sans break-words text-left">
                EXCLUSIVO PARA CLÍNICAS DE ESTÉTICA
              </span>
            </div>

            {/* Headline Principal */}
            <h1 className="text-[29px] sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-graphite tracking-tight leading-[1.14] font-sans break-words">
              <span className="block text-graphite font-semibold">
                Sua recepção pode agendar mais.
              </span>
              <span className="block mt-1 sm:mt-2 font-serif italic text-gold-deep font-medium text-[32px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-[1.08]">
                Sem você precisar ensinar como.
              </span>
            </h1>

            {/* Subheadline Exata */}
            <p className="text-sm sm:text-base lg:text-[18px] text-secondary leading-relaxed max-w-2xl font-sans break-words">
              São 120 respostas prontas para sua secretária copiar e colar no WhatsApp, lidar melhor com objeções de preço, confirmar consultas e recuperar oportunidades de atendimento.
            </p>

            {/* Microcopy: Fluxo de Utilização Imediata */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-ivory border border-border/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs sm:text-sm text-graphite">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-champagne flex items-center justify-center shrink-0 text-gold-deep">
                  <Check className="w-3 h-3" />
                </div>
                <span className="font-medium text-xs sm:text-sm">
                  Você compra. Encaminha para sua secretária. Ela começa a usar.
                </span>
              </div>
              <span className="text-[10px] font-semibold text-gold-deep tracking-wider uppercase bg-white px-2 py-0.5 rounded border border-gold/20 self-start sm:self-auto shrink-0">
                Execução Imediata
              </span>
            </div>
          </div>

          {/* Colunas 8-12: Card de Compra Direta */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full bg-white rounded-2xl border border-champagne p-6 sm:p-8 shadow-card relative transition-all">
              {/* Decorative top gold gradient accent */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />

              {/* Card Header */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block text-[11px] font-bold tracking-widest-editorial text-gold-deep uppercase">
                    ACESSO IMEDIATO
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <Zap className="w-3 h-3 text-emerald-600" />
                    Pagamento Único
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-graphite tracking-tight font-sans">
                  Kit Recepção que Vende
                </h2>
                <p className="text-xs text-secondary mt-0.5">
                  120 scripts comerciais prontos para WhatsApp • Edição HOF & Estética
                </p>
              </div>

              {/* Price Highlight */}
              <div className="p-4 rounded-xl bg-ivory border border-border/80 mb-5 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-secondary block">Valor promocional</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-graphite tracking-tight">
                    R$ 19,90
                  </span>
                </div>
                <span className="text-xs font-semibold text-gold-deep bg-white px-2.5 py-1 rounded-md border border-gold/30">
                  Sem mensalidade
                </span>
              </div>

              {/* Checkpoints */}
              <div className="space-y-2.5 mb-6 text-xs text-graphite">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span><strong>120 respostas prontas</strong> para copiar e colar</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span><strong>3 packs completos</strong> (Primeiro contato, Agendamento e Retorno)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Acesso online imediato para celular e computador</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>Garantia incondicional de 7 dias com estorno fácil</span>
                </div>
              </div>

              {/* Botão de Compra Direto (Link Kiwify) */}
              <div className="pt-1">
                <a
                  href={KIWIFY_CHECKOUT_URL}
                  onClick={handleCheckoutClick}
                  className="w-full h-[54px] bg-graphite hover:bg-graphite-dark active:scale-[0.99] text-white font-bold text-sm sm:text-base tracking-wide rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-btn group cursor-pointer"
                >
                  <span>QUERO ACESSAR POR R$ 19,90</span>
                  <ArrowRight className="w-4 h-4 text-gold-soft group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Microcopy de Confiança */}
              <div className="pt-3 text-center">
                <p className="text-xs text-secondary flex items-center justify-center gap-1.5 flex-wrap">
                  <Lock className="w-3 h-3 text-gold-deep inline" />
                  <span>Pagamento único</span>
                  <span className="text-border">•</span>
                  <span>Checkout seguro</span>
                  <span className="text-border">•</span>
                  <span>Sem mensalidade</span>
                </p>

                <div className="mt-2.5 text-[11px] text-secondary flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenPrivacyModal}
                    className="hover:text-graphite underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Política de Privacidade
                  </button>
                  <span className="text-border">•</span>
                  <button
                    type="button"
                    onClick={onOpenTermsModal}
                    className="hover:text-graphite underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Termos de Compra
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
