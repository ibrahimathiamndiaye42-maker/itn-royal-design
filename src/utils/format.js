import { SITE } from '@/config/site';

const nf = new Intl.NumberFormat('fr-FR');
const NBSP = '\u00A0';

/** 12000 -> "12 000 FCFA" (espaces insécables). */
export function formatPrice(value) {
  if (value == null) return 'Prix sur demande';
  return `${nf.format(value).replace(/\s|\u202F/g, NBSP)}${NBSP}${SITE.currency}`;
}

export const plural = (n, one, many) => `${n} ${n > 1 ? many : one}`;

export const normalize = (s = '') =>
  s.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
