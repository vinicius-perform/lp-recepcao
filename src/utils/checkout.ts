import { LeadFormData, OrderRecord, UTMParams } from '../types';
import { getUTMParams, trackLead, trackInitiateCheckout, trackPurchase } from './analytics';
import { normalizeInstagram } from './mask';

const STORAGE_LEADS_KEY = '__rqv_leads_db';

/**
 * Get all saved leads from storage
 */
export function getSavedLeads(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Register a lead and create a pending order.
 * CRITICAL RULE: This does NOT grant access! Status is 'pending_payment'.
 */
export function createLeadOrder(formData: LeadFormData): OrderRecord {
  const utms: UTMParams = getUTMParams();
  const timestamp = new Date().toISOString();
  const orderId = `RQV-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
  const leadId = `lead_${Date.now()}`;

  const normalizedInsta = normalizeInstagram(formData.instagram);

  const orderRecord: OrderRecord = {
    id: orderId,
    leadId,
    full_name: formData.fullName.trim(),
    whatsapp: formData.whatsapp.trim(),
    email: formData.email.trim().toLowerCase(),
    instagram: normalizedInsta,
    product_name: 'Kit Recepção que Vende',
    product_edition: 'Edição HOF',
    amount: 19.90,
    currency: 'BRL',
    status: 'pending_payment',
    created_at: timestamp,
    utms,
  };

  // 1. Save Lead to Leads Repository
  try {
    const leads = getSavedLeads();
    leads.push(orderRecord);
    localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(leads));
    localStorage.setItem('__rqv_last_order', JSON.stringify(orderRecord));
  } catch (e) {
    console.error('Error saving lead to storage:', e);
  }

  // 2. Track Lead and InitiateCheckout Analytics
  trackLead({
    email: orderRecord.email,
    phone: orderRecord.whatsapp,
    name: orderRecord.full_name,
  });

  trackInitiateCheckout(orderRecord.id);

  return orderRecord;
}

/**
 * Updates order status to 'paid' ONLY when payment confirmation is received.
 * Generates an individualized single-use access link with security token.
 */
export function confirmOrderPayment(orderId: string): OrderRecord | null {
  try {
    const leads = getSavedLeads();
    const orderIndex = leads.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      console.error(`Order ${orderId} not found`);
      return null;
    }

    const order = leads[orderIndex];
    if (order.status === 'paid') {
      return order; // Already paid
    }

    const accessToken = `tok_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
    const updatedOrder: OrderRecord = {
      ...order,
      status: 'paid',
      paid_at: new Date().toISOString(),
      access_token: accessToken,
      access_url: `/acesso?token=${accessToken}&email=${encodeURIComponent(order.email)}`,
    };

    leads[orderIndex] = updatedOrder;
    localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(leads));
    localStorage.setItem('__rqv_last_order', JSON.stringify(updatedOrder));

    // Track confirmed purchase
    trackPurchase(order.id, order.amount);

    return updatedOrder;
  } catch (e) {
    console.error('Failed to confirm order:', e);
    return null;
  }
}

/**
 * Formats a currency string for BRL
 */
export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
