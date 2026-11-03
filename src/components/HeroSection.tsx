import React from 'react';
import { HeroVisuals } from './HeroVisuals';
import { LeadForm } from './LeadForm';
import { LeadFormData } from '../types';
import { Check, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSubmitSuccess: (data: LeadFormData) => void;
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSubmitSuccess,
  onOpenPrivacyModal,
  onOpenTermsModal,
}) => {
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

            {/* Apresentação do Preço */}
            <div className="pt-1">
              <div className="inline-flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 p-4 sm:px-6 sm:py-4 rounded-2xl bg-white border border-champagne shadow-card w-full sm:w-auto">
                <div>
                  <span className="block text-[10px] sm:text-[11px] font-bold tracking-widest-editorial text-gold-deep uppercase">
                    ACESSO COMPLETO
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-graphite tracking-tight font-sans">
                      R$ 19,90
                    </span>
                  </div>
                </div>

                <div className="sm:border-l sm:border-border sm:pl-4 sm:my-auto">
                  <p className="text-xs sm:text-sm font-medium text-secondary">
                    Pagamento único. Sem mensalidade.
                  </p>
                  <p className="text-[11px] text-gold-deep">
                    Acesso imediato para celular e computador
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Colunas 8-12: Formulário de Compra */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <LeadForm
              onSubmitSuccess={onSubmitSuccess}
              onOpenPrivacyModal={onOpenPrivacyModal}
              onOpenTermsModal={onOpenTermsModal}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
