import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { SectionPacks } from './components/SectionPacks';
import { Footer } from './components/Footer';
import { LegalModal, RefundModal, SupportModal } from './components/Modals';
import { AccessView } from './components/AccessView';
import { trackPageView, trackViewContent } from './utils/analytics';

export const App: React.FC = () => {
  // Navigation / View state
  const [isAccessRoute, setIsAccessRoute] = useState<boolean>(() => {
    return window.location.pathname.includes('/acesso') || window.location.search.includes('token=');
  });

  // Modals state
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; tab: 'privacy' | 'terms' }>({
    isOpen: false,
    tab: 'privacy',
  });
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
          onOpenPrivacyModal={() => setLegalModal({ isOpen: true, tab: 'privacy' })}
          onOpenTermsModal={() => setLegalModal({ isOpen: true, tab: 'terms' })}
        />

        {/* SEÇÃO 02: Apresentação dos 3 Packs + Prévia da Ferramenta + CTA Final para Checkout */}
        <SectionPacks />
      </main>

      {/* Rodapé Minimalista */}
      <Footer
        onOpenPrivacyModal={() => setLegalModal({ isOpen: true, tab: 'privacy' })}
        onOpenTermsModal={() => setLegalModal({ isOpen: true, tab: 'terms' })}
        onOpenRefundModal={() => setIsRefundOpen(true)}
        onOpenSupportModal={() => setIsSupportOpen(true)}
      />

      {/* Legal & Support Modals */}
      <LegalModal
        isOpen={legalModal.isOpen}
        initialTab={legalModal.tab}
        onClose={() => setLegalModal((prev) => ({ ...prev, isOpen: false }))}
      />
      <RefundModal isOpen={isRefundOpen} onClose={() => setIsRefundOpen(false)} />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </div>
  );
};

export default App;
