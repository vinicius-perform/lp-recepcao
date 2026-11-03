import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, RotateCcw, Headphones, Mail, MessageCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-ivory">
          <h3 className="text-base sm:text-lg font-bold text-graphite flex items-center gap-2">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-secondary hover:text-graphite hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto text-sm text-secondary space-y-4 leading-relaxed font-sans">
          {children}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-ivory flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-graphite text-white text-xs font-semibold hover:bg-graphite-dark transition-colors cursor-pointer"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

/**
 * Popup unificado para Política de Privacidade e Termos de Compra
 */
export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={activeTab === 'privacy' ? 'Política de Privacidade' : 'Termos de Compra e Uso'}
    >
      {/* Abas Superiores para alternar facilmente entre as duas opções */}
      <div className="flex items-center gap-1.5 p-1 bg-ivory rounded-xl border border-border">
        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-white text-graphite shadow-subtle border border-border text-gold-deep'
              : 'text-secondary hover:text-graphite'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-gold-deep shrink-0" />
          <span className="truncate">Política de Privacidade</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('terms')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'terms'
              ? 'bg-white text-graphite shadow-subtle border border-border text-gold-deep'
              : 'text-secondary hover:text-graphite'
          }`}
        >
          <FileText className="w-4 h-4 text-gold-deep shrink-0" />
          <span className="truncate">Termos de Compra</span>
        </button>
      </div>

      {activeTab === 'privacy' ? (
        <div className="space-y-4 pt-1">
          <div className="flex items-center gap-2 text-graphite font-semibold">
            <ShieldCheck className="w-5 h-5 text-gold-deep shrink-0" />
            <span>Compromisso com a Segurança e Privacidade dos seus Dados (LGPD)</span>
          </div>

          <p>
            Esta Política de Privacidade descreve como os dados fornecidos no momento do cadastro e aquisição do <strong>Kit Recepção que Vende — Edição HOF</strong> são tratados, em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
          </p>

          <h4 className="font-bold text-graphite pt-1">1. Dados Coletados</h4>
          <p>
            Coletamos apenas os dados essenciais para identificação do cliente, emissão de notas/comprovantes e liberação individualizada do acesso à ferramenta:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Nome Completo:</strong> para personalização do atendimento e identificação da titularidade.</li>
            <li><strong>WhatsApp:</strong> para envio de notificações importantes e suporte operacional.</li>
            <li><strong>E-mail:</strong> para envio imediato do link de acesso e confirmação de pagamento.</li>
            <li><strong>Instagram:</strong> para identificação do perfil profissional ou da clínica.</li>
          </ul>

          <h4 className="font-bold text-graphite pt-1">2. Finalidade do Tratamento</h4>
          <p>
            Seus dados são utilizados exclusivamente para operacionalizar a entrega do produto digital contratado, prestar suporte ao cliente e enviar atualizações relevantes sobre a ferramenta. Não comercializamos, não alugamos e não compartilhamos seus dados com terceiros para fins publicitários externos.
          </p>

          <h4 className="font-bold text-graphite pt-1">3. Segurança e Pagamentos</h4>
          <p>
            Todas as transações financeiras são processadas em ambiente criptografado de checkout seguro com certificado SSL. Nossos sistemas não armazenam dados sensíveis de pagamento (como números de cartão de crédito).
          </p>

          <h4 className="font-bold text-graphite pt-1">4. Seus Direitos</h4>
          <p>
            Você pode solicitar a qualquer momento a confirmação, correção ou exclusão dos seus dados cadastrais através do nosso canal oficial: <code>suporte@recepcaoquevende.com</code>.
          </p>
        </div>
      ) : (
        <div className="space-y-4 pt-1">
          <div className="flex items-center gap-2 text-graphite font-semibold">
            <FileText className="w-5 h-5 text-gold-deep shrink-0" />
            <span>Termos e Condições Comerciais de Uso</span>
          </div>

          <p>
            Ao adquirir o <strong>Kit Recepção que Vende — Edição HOF</strong> por R$ 19,90, você concorda expressamente com os seguintes termos:
          </p>

          <h4 className="font-bold text-graphite pt-1">1. Objeto</h4>
          <p>
            O produto consiste no acesso à ferramenta digital com a biblioteca de 120 scripts comerciais pré-formatados para WhatsApp, organizados em 3 packs específicos para clínicas de Harmonização Orofacial e Estética.
          </p>

          <h4 className="font-bold text-graphite pt-1">2. Pagamento Único e Sem Mensalidades</h4>
          <p>
            O valor de aquisição é de <strong>R$ 19,90 (pagamento único)</strong>. Não há mensalidades, anuidades, taxas de adesão ou cobranças recorrentes futuras.
          </p>

          <h4 className="font-bold text-graphite pt-1">3. Liberação do Acesso</h4>
          <p>
            O acesso é liberado de forma 100% online e imediata assim que a confirmação do pagamento for emitida pela instituição financeira (imediata no Pix ou Cartão de Crédito).
          </p>

          <h4 className="font-bold text-graphite pt-1">4. Licença de Uso</h4>
          <p>
            A licença concedida é intransferível para uso interno da equipe da clínica compradora. É proibida a redistribuição comercial, venda de cópias ou compartilhamento público do material.
          </p>

          <h4 className="font-bold text-graphite pt-1">5. Garantia Incondicional</h4>
          <p>
            Você conta com a garantia incondicional de 7 dias. Se por qualquer motivo não ficar satisfeito, pode solicitar o reembolso integral sem complicações.
          </p>
        </div>
      )}
    </BaseModal>
  );
};

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <LegalModal isOpen={isOpen} onClose={onClose} initialTab="privacy" />
);

export const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <LegalModal isOpen={isOpen} onClose={onClose} initialTab="terms" />
);

export const RefundModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Política de Reembolso e Garantia">
    <div className="flex items-center gap-2 text-graphite font-semibold mb-2">
      <RotateCcw className="w-5 h-5 text-gold-deep" />
      <span>Garantia Legal de 7 Dias (Art. 49 do CDC)</span>
    </div>
    <p>
      Sua compra está 100% protegida pela legislação brasileira de defesa do consumidor.
    </p>
    <h4 className="font-bold text-graphite pt-2">1. Prazo de Arrependimento</h4>
    <p>
      De acordo com o Artigo 49 do Código de Defesa do Consumidor (Lei nº 8.078/1990), você dispõe de <strong>7 (sete) dias corridos</strong> a contar da confirmação do pagamento para avaliar o material e solicitar o cancelamento e reembolso integral do valor pago.
    </p>
    <h4 className="font-bold text-graphite pt-2">2. Como Solicitar</h4>
    <p>
      Para solicitar o reembolso de R$ 19,90, basta enviar um e-mail para <code>suporte@recepcaoquevende.com</code> informando seu nome e o e-mail utilizado na compra, ou solicitar diretamente através da plataforma de pagamento utilizada.
    </p>
    <h4 className="font-bold text-graphite pt-2">3. Devolução dos Valores</h4>
    <p>
      - <strong>Pix:</strong> o estorno é processado diretamente para a mesma conta bancária de origem em até 24 horas úteis.<br />
      - <strong>Cartão de Crédito:</strong> o estorno é solicitado imediatamente à administradora do cartão.
    </p>
  </BaseModal>
);

export const SupportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Contato de Suporte ao Aluno / Cliente">
    <div className="flex items-center gap-2 text-graphite font-semibold mb-2">
      <Headphones className="w-5 h-5 text-gold-deep" />
      <span>Canais Oficiais de Atendimento</span>
    </div>
    <p>
      Nossa equipe está pronta para auxiliar você em dúvidas operacionais, reenvio do link de acesso ou suporte técnico.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
      <div className="p-4 rounded-xl bg-ivory border border-border">
        <div className="flex items-center gap-2 text-graphite font-bold text-sm mb-1">
          <Mail className="w-4 h-4 text-gold-deep" />
          <span>E-mail Oficial</span>
        </div>
        <p className="text-xs text-secondary">
          Atendimento geral, reenvio de acessos e dúvidas:
        </p>
        <a
          href="mailto:suporte@recepcaoquevende.com"
          className="text-xs font-semibold text-gold-deep hover:underline mt-2 block"
        >
          suporte@recepcaoquevende.com
        </a>
      </div>

      <div className="p-4 rounded-xl bg-ivory border border-border">
        <div className="flex items-center gap-2 text-graphite font-bold text-sm mb-1">
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>WhatsApp de Suporte</span>
        </div>
        <p className="text-xs text-secondary">
          Atendimento em dias úteis, das 09h às 18h:
        </p>
        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20o%20Kit%20Recep%C3%A7%C3%A3o%20que%20Vende"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-emerald-700 hover:underline mt-2 block"
        >
          (11) 99999-9999
        </a>
      </div>
    </div>
  </BaseModal>
);
