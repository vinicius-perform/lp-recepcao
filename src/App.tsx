import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { SectionPacks } from './components/SectionPacks';
import { Footer } from './components/Footer';
import { PrivacyModal, TermsModal, RefundModal, SupportModal } from './components/Modals';
import { CheckoutModal } from './components/CheckoutModal';
import { AccessView } from './components/AccessView';
import { LeadFormData, OrderRecord } from './types';
import { trackPageView, trackViewContent } from './utils/analytics';
import { createLeadOrder } from './utils/checkout';

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

  // Checkout state
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('test_checkout=1')) {
      return {
        id: 'RQV-DEMO-742',
        leadId: 'lead_demo',
        full_name: 'Dra. Camila Santos',
        whatsapp: '(11) 98765-4321',
        email: 'dra.camila@clinicaestetica.com.br',
        instagram: '@dracamilasantos',
        product_name: 'Kit Recepção que Vende',
        product_edition: 'Edição HOF',
        amount: 19.90,
        currency: 'BRL',
        status: 'pending_payment',
        created_at: new Date().toISOString(),
        utms: {
          utm_source: 'instagram',
          utm_medium: 'stories',
          utm_campaign: 'hof_nov',
          utm_content: 'video1',
          utm_term: '',
          landing_page_url: window.location.href,
          referrer: '',
        },
      };
    }
    return null;
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.location.search.includes('test_checkout=1');
  });

  // Initialize analytics on page load
  useEffect(() => {
    trackPageView();
    trackViewContent();

    // Listen to popstate for simple URL updates
    const handlePopState = () => {
      setIsAccessRoute(window.location.pathname.includes('/acesso') || window.location.search.includes('token='));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Smooth scroll to form handler
  const handleScrollToForm = () => {
    const formElement = document.getElementById('formulario-compra');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus the first input for convenience
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) input.focus();
      }, 500);
    }
  };

  // Lead Form submission handler
  const handleFormSubmitSuccess = (formData: LeadFormData) => {
    // 1. Save lead and create pending order
    const order = createLeadOrder(formData);
    setCurrentOrder(order);

    // 2. Open Checkout Modal
    setIsCheckoutOpen(true);
  };

  const handlePaymentConfirmed = (updatedOrder: OrderRecord) => {
    setCurrentOrder(updatedOrder);
  };

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
        {/* SEÇÃO 01: Hero de Vendas + Formulário de Compra */}
        <HeroSection
          onSubmitSuccess={handleFormSubmitSuccess}
          onOpenPrivacyModal={() => setIsPrivacyOpen(true)}
          onOpenTermsModal={() => setIsTermsOpen(true)}
        />

        {/* SEÇÃO 02: Apresentação dos 3 Packs + Prévia da Ferramenta + CTA Final */}
        <SectionPacks onScrollToForm={handleScrollToForm} />
      </main>

      {/* Rodapé Minimalista */}
      <Footer
        onOpenPrivacyModal={() => setIsPrivacyOpen(true)}
        onOpenTermsModal={() => setIsTermsOpen(true)}
        onOpenRefundModal={() => setIsRefundOpen(true)}
        onOpenSupportModal={() => setIsSupportOpen(true)}
      />

      {/* Checkout Seguro Modal */}
      <CheckoutModal
        order={currentOrder}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPaymentConfirmed={handlePaymentConfirmed}
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
