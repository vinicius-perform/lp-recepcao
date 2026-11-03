/**
 * Utility functions for masks, normalization, and validations
 */

/**
 * Format raw numbers into Brazilian phone format: (99) 99999-9999 or (99) 9999-9999
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  
  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Validates Brazilian phone with DDD (10 or 11 digits)
 */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) return false;
  
  const ddd = parseInt(digits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return false;
  
  // Reject identical digits like 11111111111
  if (/^(\d)\1+$/.test(digits)) return false;

  return true;
}

/**
 * Validates standard email address
 */
export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim().toLowerCase());
}

/**
 * Validates full name (must have at least first name and last name)
 */
export function isValidFullName(name: string): boolean {
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  return parts.length >= 2 && parts[0].length >= 2 && parts[1].length >= 2;
}

/**
 * Normalizes Instagram input:
 * Accepts: "draana", "@draana", "https://instagram.com/draana", "instagram.com/draana/"
 * Returns: "@draana"
 */
export function normalizeInstagram(input: string): string {
  let clean = input.trim();
  if (!clean) return '';

  // Remove URL schemes and domains
  clean = clean.replace(/^(?:https?:\/\/)?(?:www\.)?instagram\.com\//i, '');
  
  // Remove query params or trailing slashes
  clean = clean.split('?')[0].replace(/\/+$/, '');

  // Ensure starts with @
  if (!clean.startsWith('@')) {
    clean = `@${clean}`;
  }

  return clean;
}

/**
 * Validates Instagram handle
 */
export function isValidInstagram(handle: string): boolean {
  const normalized = normalizeInstagram(handle);
  const username = normalized.replace(/^@/, '');
  // Instagram usernames: 1-30 chars, letters, numbers, periods, underscores
  return /^[a-zA-Z0-9._]{1,30}$/.test(username) && !username.includes('..');
}

/**
 * Mask CPF: 000.000.000-00
 */
export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

/**
 * Mask Credit Card Number: 0000 0000 0000 0000
 */
export function maskCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(' ') : digits;
}

/**
 * Mask Card Expiry: MM/AA
 */
export function maskCardExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

