import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { SectionPacks } from './components/SectionPacks';
import { Footer } from './components/Footer';
import { PrivacyModal, TermsModal, RefundModal, SupportModal } from './components/Modals';
import { AccessView } from './components/AccessView';
import { trackPageView, trackViewContent } from './utils/analytics';

export const App: React.FC = () => {
  // Navigation / View state
  const [isAccessRoute, setIsAccessRoute] = useState<boolean>(() => {
    return window.location.pathname.includes('/acesso') || window.location.search.includes('token=');
  });

  // Modals state
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Initialize analytics on page load
  useEffect(() => {
    trackPageView();
    trackViewContent();

    const handlePopState = () => {
      setIsAccessRoute(window.location.pathname.includes('/acesso') || window.location.search.includes('token='));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (isAccessRoute) {
    return (
      <AccessView
        onBackToLanding={() => {
          window.history.pushState({}, '', '/');
          setIsAccessRoute(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-graphite flex flex-col selection:bg-champagne selection:text-graphite">
      {/* Main Landing Page Content: Strictly 2 Sections */}
      <main className="flex-1">
        {/* SEÇÃO 01: Hero de Vendas com Botão Direto para Checkout */}
        <HeroSection
          onOpenPrivacyModal={() => setIsPrivacyOpen(true)}
          onOpenTermsModal={() => setIsTermsOpen(true)}
        />

        {/* SEÇÃO 02: Apresentação dos 3 Packs + Prévia da Ferramenta + CTA Final para Checkout */}
        <SectionPacks />
      </main>

      {/* Rodapé Minimalista */}
      <Footer
        onOpenPrivacyModal={() => setIsPrivacyOpen(true)}
        onOpenTermsModal={() => setIsTermsOpen(true)}
        onOpenRefundModal={() => setIsRefundOpen(true)}
        onOpenSupportModal={() => setIsSupportOpen(true)}
      />

      {/* Legal & Support Modals */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <RefundModal isOpen={isRefundOpen} onClose={() => setIsRefundOpen(false)} />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </div>
  );
};

export default App;
