import React from 'react';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
  onOpenRefundModal: () => void;
  onOpenSupportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyModal,
  onOpenTermsModal,
  onOpenRefundModal,
  onOpenSupportModal,
}) => {
  return (
    <footer className="w-full border-t border-border bg-ivory py-10 sm:py-12 transition-all">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Identificação Comercial */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <span className="w-5 h-5 rounded bg-graphite text-gold-soft font-serif italic text-xs flex items-center justify-center font-bold">
              RV
            </span>
            <p className="text-sm font-bold text-graphite tracking-tight font-sans">
              Kit Recepção que Vende — Edição HOF.
            </p>
          </div>
          <p className="text-xs text-secondary">
            Ferramenta digital de apoio ao atendimento comercial.
          </p>
        </div>

        {/* Links Legais e Suporte */}
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-xs text-secondary font-medium">
          <button
            type="button"
            onClick={onOpenPrivacyModal}
            className="hover:text-graphite hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            Política de Privacidade
          </button>
          <span className="text-border">•</span>
          <button
            type="button"
            onClick={onOpenTermsModal}
            className="hover:text-graphite hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            Termos de Compra
          </button>
          <span className="text-border">•</span>
          <button
            type="button"
            onClick={onOpenRefundModal}
            className="hover:text-graphite hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            Política de Reembolso
          </button>
          <span className="text-border">•</span>
          <button
            type="button"
            onClick={onOpenSupportModal}
            className="hover:text-graphite hover:underline underline-offset-2 transition-colors cursor-pointer"
          >
            Contato de suporte
          </button>
        </div>

      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 mt-6 pt-6 border-t border-border/60 text-center">
        <p className="text-[11px] text-secondary">
          © {new Date().getFullYear()} Recepção que Vende. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
