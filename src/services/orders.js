/**
 * Envoi d'une commande. Une seule méthode est active aujourd'hui : WhatsApp.
 * Pour ajouter Wave, Orange Money, etc., ajoutez une entrée dans `handlers`
 * et activez la méthode dans src/config/payments.js.
 */
import { whatsappLink } from '@/config/site';
import { formatPrice } from '@/utils/format';

export function lineTotal(line) {
  return line.price == null ? null : line.price * line.qty;
}

export function cartTotal(lines) {
  const priced = lines.filter((l) => l.price != null);
  return {
    amount: priced.reduce((s, l) => s + l.price * l.qty, 0),
    hasUnpriced: priced.length !== lines.length,
  };
}

export function buildOrderMessage(lines, customer = {}) {
  const { amount, hasUnpriced } = cartTotal(lines);
  const items = lines.map((l, i) => {
    const bits = [`Couleur : ${l.variantLabel}`];
    if (l.size) bits.push(`Taille : ${l.size}`);
    bits.push(`Quantité : ${l.qty}`);
    return `${i + 1}. ${l.name}\n   ${bits.join(' | ')}\n   ${formatPrice(l.price)}${l.qty > 1 && l.price != null ? ` × ${l.qty}` : ''}`;
  });
  const head = ['Bonjour, je souhaite commander sur ITN Royal Design :', ''];
  const foot = ['', `Total estimé : ${formatPrice(amount)}${hasUnpriced ? ' + articles sur demande' : ''}`];
  const who = [];
  if (customer.name) who.push(`Nom : ${customer.name}`);
  if (customer.phone) who.push(`Téléphone : ${customer.phone}`);
  if (customer.city) who.push(`Ville / quartier : ${customer.city}`);
  if (customer.address) who.push(`Adresse / repère : ${customer.address}`);
  if (customer.note) who.push(`Précisions : ${customer.note}`);
  return [...head, ...items, ...foot, ...(who.length ? ['', ...who] : [])].join('\n');
}

export function buildProductQuestion(product, variantLabel, size) {
  const bits = [`${product.name}`, variantLabel ? `couleur ${variantLabel}` : '', size ? `taille ${size}` : ''].filter(Boolean);
  return `Bonjour, je suis intéressé(e) par : ${bits.join(', ')}. Est-il disponible ?`;
}

const handlers = {
  whatsapp: async ({ lines, customer }) => ({ type: 'redirect', url: whatsappLink(buildOrderMessage(lines, customer)) }),
};

export async function submitOrder(method, payload) {
  const handler = handlers[method];
  if (!handler) throw new Error(`Moyen de paiement « ${method} » non encore disponible.`);
  return handler(payload);
}
