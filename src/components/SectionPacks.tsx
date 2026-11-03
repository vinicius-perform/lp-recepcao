import React, { useState } from 'react';
import { Copy, Check, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { PackItem } from '../types';
import { KIWIFY_CHECKOUT_URL } from '../config';
import { trackInitiateCheckout } from '../utils/analytics';

export const SectionPacks: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const packsData: PackItem[] = [
    {
      number: '01',
      title: 'Respostas que Agendam',
      count: 45,
      description: 'Respostas para perguntas sobre preços, dúvidas, objeções e conversas que precisam avançar para o agendamento.',
      highlights: [
        'Primeiro atendimento acolhedor',
        'Valores de Botox e Preenchimento',
        'Objeções: "achei caro", "ver com marido"',
        'Follow-up sem parecer insistente',
      ],
    },
    {
      number: '02',
      title: 'Agenda Protegida',
      count: 35,
      description: 'Mensagens para confirmar consultas, lidar com imprevistos e recuperar oportunidades de reagendamento.',
      highlights: [
        'Lembretes que geram compromisso',
        'Orientações pré-procedimento HOF',
        'Manejo de reagendamentos de horários',
        'Recuperação rápida de ausências e faltas',
      ],
    },
    {
      number: '03',
      title: 'Pacientes de Volta',
      count: 40,
      description: 'Mensagens para retomar contatos antigos, acompanhar pacientes e organizar oportunidades de retorno.',
      highlights: [
        'Reativação de contatos adormecidos',
        'Avaliações que não fecharam na hora',
        'Retorno de 15 dias e retoque de Botox',
        'Manutenção preventiva e bioestimuladores',
      ],
    },
  ];

  const sampleScript = "Claro, [Nome]! O valor depende do planejamento indicado para cada paciente. Posso te passar as informações de valores da clínica e explicar como funciona a avaliação com a doutora?";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sampleScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Cabeçalho da Seção 02 */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-light/80 border border-gold/40 shadow-subtle mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-deep shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest-editorial text-graphite uppercase font-sans">
              TUDO QUE SUA RECEPÇÃO PRECISA, EM UM SÓ LUGAR
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-graphite tracking-tight font-sans leading-tight max-w-2xl mx-auto">
            <span>3 packs. 120 respostas.</span>
            <span className="block font-serif italic text-gold-deep font-medium text-2xl sm:text-3xl lg:text-[38px] mt-1">
              Uma recepção mais preparada.
            </span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-secondary leading-relaxed max-w-xl mx-auto">
            Mensagens organizadas para as situações que sua equipe enfrenta todos os dias no WhatsApp.
          </p>
        </div>

        {/* Grid dos 3 Packs Editoriais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {packsData.map((pack) => (
            <div
              key={pack.number}
              className="bg-ivory rounded-2xl border border-border/90 p-7 sm:p-8 flex flex-col justify-between hover:border-gold/60 hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative group"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent group-hover:via-gold transition-all" />

              <div>
                {/* Número Grande Cormorant Garamond */}
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-serif italic text-5xl sm:text-6xl font-light text-gold-deep leading-none select-none">
                    {pack.number}
                  </span>
                  <span className="text-xs font-bold text-graphite uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-border shadow-subtle">
                    {pack.count} scripts
                  </span>
                </div>

                {/* Título do Pack */}
                <h3 className="text-xl font-bold text-graphite font-sans mb-3">
                  {pack.title}
                </h3>

                {/* Descrição Exata */}
                <p className="text-sm text-secondary leading-relaxed mb-6 font-sans">
                  {pack.description}
                </p>
              </div>

              {/* Destaques das situações */}
              <div className="pt-4 border-t border-border/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-1">
                  Exemplos de situações:
                </span>
                {pack.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-graphite">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Prévia da Ferramenta */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-champagne p-5 sm:p-9 shadow-card relative mb-14 sm:mb-20">
          {/* Header da Prévia */}
          <div className="mb-5 pb-4 border-b border-border/70">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest-editorial text-gold-deep uppercase block mb-1">
              PRÉVIA DA FERRAMENTA
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-graphite tracking-tight font-sans">
              A paciente perguntou o preço do Botox?
            </h3>
            <p className="text-xs sm:text-sm text-secondary mt-1">
              Sua secretária não precisa improvisar a resposta.
            </p>
          </div>

          {/* Balão demonstrativo de mensagem formatada */}
          <div className="bg-ivory rounded-xl border border-border/80 p-5 sm:p-6 mb-5 relative">
            <div className="flex items-center justify-between mb-3 text-xs text-secondary">
              <span className="flex items-center gap-1.5 font-semibold text-graphite">
                <MessageSquare className="w-3.5 h-3.5 text-gold-deep" />
                Script Pronto para Envio
              </span>
              <span className="text-[11px] uppercase tracking-wider text-secondary">
                Pack 01 • Preços e Valores
              </span>
            </div>

            <p className="text-sm sm:text-base text-graphite leading-relaxed font-sans italic bg-white p-4 rounded-lg border border-border/60 shadow-subtle">
              "{sampleScript}"
            </p>

            {/* Ação de Copiar */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-graphite hover:bg-graphite-dark text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-subtle active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>MENSAGEM COPIADA!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gold-soft" />
                    <span>COPIAR MENSAGEM</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-secondary">
                {copied ? 'Pronta para colar no WhatsApp da paciente.' : 'Clique para testar a cópia instantânea.'}
              </span>
            </div>
          </div>

          {/* Texto de Apoio Exato */}
          <p className="text-xs sm:text-sm text-secondary text-center">
            É simples: sua secretária encontra a situação, copia a mensagem e continua o atendimento.
          </p>
        </div>

        {/* CTA Final */}
        <div className="max-w-2xl mx-auto text-center p-8 sm:p-10 rounded-2xl bg-white border border-champagne shadow-card relative">
          <span className="inline-block text-[11px] font-bold tracking-widest-editorial text-gold-deep uppercase mb-2">
            COMECE HOJE MESMO
          </span>

          <h3 className="text-2xl sm:text-3xl font-bold text-graphite tracking-tight font-sans">
            Sua recepção pode começar a atender com mais direção hoje.
          </h3>

          <p className="mt-2 text-base text-secondary">
            Tenha acesso aos 120 scripts prontos por apenas R$ 19,90.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={KIWIFY_CHECKOUT_URL}
              onClick={() => trackInitiateCheckout('kiwify-footer')}
              className="w-full sm:w-auto px-8 h-[54px] bg-graphite hover:bg-graphite-dark text-white font-bold text-sm sm:text-base tracking-wide rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-btn group cursor-pointer"
            >
              <span>QUERO MEU KIT POR R$ 19,90</span>
              <ArrowRight className="w-4 h-4 text-gold-soft group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <p className="mt-3 text-xs text-secondary">
            Pagamento único • Sem mensalidades • Acesso online sem instalação
          </p>
        </div>

      </div>
    </section>
  );
};
