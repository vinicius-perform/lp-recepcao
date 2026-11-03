import { UTMParams } from '../types';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Capture UTMs and referrer automatically from the current browser session
 */
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
      landing_page_url: '',
      referrer: '',
    };
  }

  const urlParams = new URLSearchParams(window.location.search);

  // Retrieve cached UTMs from localStorage if available (first-touch attribution)
  let storedUtms: Partial<UTMParams> = {};
  try {
    const cached = localStorage.getItem('__rqv_utms');
    if (cached) {
      storedUtms = JSON.parse(cached);
    }
  } catch (e) {
    // ignore
  }

  const currentUtms: UTMParams = {
    utm_source: urlParams.get('utm_source') || storedUtms.utm_source || '',
    utm_medium: urlParams.get('utm_medium') || storedUtms.utm_medium || '',
    utm_campaign: urlParams.get('utm_campaign') || storedUtms.utm_campaign || '',
    utm_content: urlParams.get('utm_content') || storedUtms.utm_content || '',
    utm_term: urlParams.get('utm_term') || storedUtms.utm_term || '',
    landing_page_url: window.location.href,
    referrer: document.referrer || storedUtms.referrer || '',
  };

  try {
    localStorage.setItem('__rqv_utms', JSON.stringify(currentUtms));
  } catch (e) {
    // ignore
  }

  return currentUtms;
}

/**
 * Generate unique event ID for Meta CAPI and Browser Pixel deduplication
 */
export function generateEventId(prefix: string = 'evt'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Track PageView event
 */
let hasTrackedPageView = false;

export function trackPageView(): string {
  const eventId = generateEventId('pv');

  if (typeof window !== 'undefined') {
    if (window.fbq) {
      if (hasTrackedPageView) {
        window.fbq('track', 'PageView', {}, { eventID: eventId });
      }
      hasTrackedPageView = true;
    }
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
    console.debug('[Analytics] PageView tracked:', { eventId });
  }

  return eventId;
}

/**
 * Track ViewContent event (Product Details)
 */
export function trackViewContent(): string {
  const eventId = generateEventId('vc');
  const payload = {
    content_name: 'Kit Recepção que Vende — Edição HOF',
    content_category: 'Digital Product / Scripts HOF',
    content_ids: ['rqv-hof-120'],
    value: 19.90,
    currency: 'BRL',
  };

  if (typeof window !== 'undefined') {
    if (window.fbq) {
      window.fbq('track', 'ViewContent', payload, { eventID: eventId });
    }
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'BRL',
        value: 19.90,
        items: [{ item_name: payload.content_name, price: 19.90 }],
      });
    }
    console.debug('[Analytics] ViewContent tracked:', { eventId, payload });
  }

  return eventId;
}

/**
 * Track Lead event (Triggered strictly after form validation and lead persistence)
 */
export function trackLead(userData: { email: string; phone: string; name: string }): string {
  const eventId = generateEventId('lead');
  const payload = {
    content_name: 'Lead — Kit Recepção que Vende HOF',
    value: 19.90,
    currency: 'BRL',
  };

  if (typeof window !== 'undefined') {
    if (window.fbq) {
      window.fbq('track', 'Lead', payload, { eventID: eventId });
    }
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        currency: 'BRL',
        value: 19.90,
      });
    }
    console.debug('[Analytics] Lead tracked:', { eventId, userDataMasked: { name: userData.name } });
  }

  return eventId;
}

/**
 * Track InitiateCheckout event (When starting checkout process)
 */
export function trackInitiateCheckout(orderId: string): string {
  const eventId = generateEventId('ic');
  const payload = {
    content_name: 'Kit Recepção que Vende — Edição HOF',
    content_ids: ['rqv-hof-120'],
    num_items: 1,
    value: 19.90,
    currency: 'BRL',
    order_id: orderId,
  };

  if (typeof window !== 'undefined') {
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', payload, { eventID: eventId });
    }
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'BRL',
        value: 19.90,
        transaction_id: orderId,
      });
    }
    console.debug('[Analytics] InitiateCheckout tracked:', { eventId, payload });
  }

  return eventId;
}

/**
 * Track Purchase event (ONLY triggered upon real / confirmed payment status)
 * Protected against duplicate tracking via localStorage deduplication key.
 */
export function trackPurchase(orderId: string, amount: number = 19.90): string | null {
  if (typeof window === 'undefined') return null;

  const dedupKey = `__rqv_purchased_${orderId}`;
  if (localStorage.getItem(dedupKey)) {
    console.warn('[Analytics] Purchase already tracked for order:', orderId);
    return null;
  }

  const eventId = generateEventId('pur');
  const payload = {
    content_name: 'Kit Recepção que Vende — Edição HOF',
    content_ids: ['rqv-hof-120'],
    content_type: 'product',
    num_items: 1,
    value: amount,
    currency: 'BRL',
    order_id: orderId,
  };

  if (window.fbq) {
    window.fbq('track', 'Purchase', payload, { eventID: eventId });
  }
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: amount,
      currency: 'BRL',
      items: [{ item_name: payload.content_name, price: amount }],
    });
  }

  try {
    localStorage.setItem(dedupKey, Date.now().toString());
  } catch (e) {
    // ignore
  }

  console.info('[Analytics] Purchase CONFIRMED & Tracked:', { eventId, orderId, amount });
  return eventId;
}
