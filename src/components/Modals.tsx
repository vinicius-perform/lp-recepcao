import React from 'react';
import { X, ShieldCheck, FileText, RotateCcw, Headphones, Mail, MessageCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between bg-ivory">
          <h3 className="text-lg font-bold text-graphite flex items-center gap-2">
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
        <div className="p-6 overflow-y-auto text-sm text-secondary space-y-4 leading-relaxed font-sans">
          {children}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-ivory flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-graphite text-white text-xs font-semibold hover:bg-graphite-dark transition-colors cursor-pointer"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Política de Privacidade (LGPD)">
    <div className="flex items-center gap-2 text-graphite font-semibold mb-2">
      <ShieldCheck className="w-5 h-5 text-gold-deep" />
      <span>Compromisso com a Segurança e Privacidade dos seus Dados</span>
    </div>
    <p>
      Esta Política de Privacidade descreve como os dados fornecidos no momento do cadastro e aquisição do <strong>Kit Recepção que Vende — Edição HOF</strong> são tratados, em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
    </p>
    <h4 className="font-bold text-graphite pt-2">1. Dados Coletados</h4>
    <p>
      Coletamos apenas os dados essenciais para identificação do lead, emissão de comprovantes e liberação individualizada do acesso à ferramenta:
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong>Nome Completo:</strong> para personalização do atendimento e identificação da titularidade.</li>
      <li><strong>WhatsApp:</strong> para envio de notificações importantes e suporte operacional.</li>
      <li><strong>E-mail:</strong> para envio do link individual de acesso e confirmações de transação.</li>
      <li><strong>Instagram:</strong> para identificação do perfil profissional ou da clínica.</li>
    </ul>
    <h4 className="font-bold text-graphite pt-2">2. Finalidade do Tratamento</h4>
    <p>
      Seus dados são utilizados exclusivamente para operacionalizar a entrega do produto digital contratado, prestar suporte ao cliente e enviar atualizações relevantes sobre a ferramenta. Não comercializamos, não alugamos e não compartilhamos seus dados com terceiros para fins publicitários externos.
    </p>
    <h4 className="font-bold text-graphite pt-2">3. Segurança e Pagamentos</h4>
    <p>
      Todas as transações de pagamento são processadas em ambiente criptografado de checkout seguro com certificado SSL. Nossos sistemas não armazenam dados sensíveis de pagamento (como números de cartão de crédito).
    </p>
    <h4 className="font-bold text-graphite pt-2">4. Direitos do Titular</h4>
    <p>
      Você pode solicitar a qualquer momento a confirmação, correção ou exclusão dos seus dados cadastrais através do nosso canal de suporte: <code>suporte@recepcaoquevende.com</code>.
    </p>
  </BaseModal>
);

export const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} title="Termos de Compra e Uso">
    <div className="flex items-center gap-2 text-graphite font-semibold mb-2">
      <FileText className="w-5 h-5 text-gold-deep" />
      <span>Termos e Condições Comerciais</span>
    </div>
    <p>
      Ao adquirir o <strong>Kit Recepção que Vende — Edição HOF</strong> por R$ 19,90, você concorda expressamente com as seguintes condições:
    </p>
    <h4 className="font-bold text-graphite pt-2">1. Objeto do Contrato</h4>
    <p>
      O produto adquirido consiste no acesso à ferramenta digital com a biblioteca de 120 scripts comerciais pré-formatados para WhatsApp, organizados em 3 packs específicos para clínicas de Harmonização Orofacial.
    </p>
    <h4 className="font-bold text-graphite pt-2">2. Modalidade de Pagamento e Preço</h4>
    <p>
      O valor é de <strong>R$ 19,90 (dezenove reais e noventa centavos) em pagamento único</strong>. Não há cobranças mensais, assinaturas recorrentes, anuidades ou taxas ocultas de manutenção.
    </p>
    <h4 className="font-bold text-graphite pt-2">3. Forma de Acesso</h4>
    <p>
      O acesso é disponibilizado de forma online e imediata após a confirmação do pagamento pelo gateway bancário. O comprador recebe um link individualizado encaminhado ao e-mail informado no checkout.
    </p>
    <h4 className="font-bold text-graphite pt-2">4. Licença de Uso e Propriedade Intelectual</h4>
    <p>
      A licença concedida é de uso interno para a equipe e recepção da clínica compradora. É expressamente vedado revender, sublicenciar, distribuir publicamente ou compartilhar o acesso em plataformas abertas.
    </p>
    <h4 className="font-bold text-graphite pt-2">5. Resultados Comerciais</h4>
    <p>
      O Kit fornece scripts organizados para agilidade e padronização da comunicação. Os resultados práticos de conversão e agendamento dependem da correta aplicação, posicionamento e rotina de atendimento de cada clínica, não havendo garantia de faturamento fixo.
    </p>
  </BaseModal>
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
