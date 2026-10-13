/**
 * Moyens de paiement.
 * Aujourd'hui : confirmation et paiement convenus sur WhatsApp.
 * Pour brancher un paiement en ligne plus tard (Wave, Orange Money, Free Money, carte…),
 * passez `enabled` à true et implémentez la méthode correspondante dans src/services/orders.js.
 */
export const PAYMENT_METHODS = [
  { id: 'whatsapp', label: 'Paiement convenu sur WhatsApp', hint: 'Nous vous indiquons les options à la confirmation.', enabled: true },
  { id: 'wave', label: 'Wave', hint: '', enabled: false },
  { id: 'orange-money', label: 'Orange Money', hint: '', enabled: false },
  { id: 'free-money', label: 'Free Money', hint: '', enabled: false },
  { id: 'card', label: 'Carte bancaire', hint: '', enabled: false },
];

export const enabledPaymentMethods = () => PAYMENT_METHODS.filter((m) => m.enabled);
