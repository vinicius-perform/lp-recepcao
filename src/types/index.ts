export interface LeadFormData {
  fullName: string;
  whatsapp: string;
  email: string;
  instagram: string;
}

export interface FormErrors {
  fullName?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
}

export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  landing_page_url: string;
  referrer: string;
}

export type OrderStatus = 'lead' | 'pending_payment' | 'paid' | 'cancelled';

export interface OrderRecord {
  id: string;
  leadId: string;
  full_name: string;
  whatsapp: string;
  email: string;
  instagram: string;
  product_name: string;
  product_edition: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  created_at: string;
  paid_at?: string;
  access_url?: string;
  access_token?: string;
  utms: UTMParams;
}

export interface PackItem {
  number: string;
  title: string;
  count: number;
  description: string;
  highlights: string[];
}
