/**
 * Accès au catalogue. Aujourd'hui les données viennent de fichiers locaux ;
 * pour passer à une API, il suffit de réimplémenter ces fonctions.
 */
import { products as rawProducts } from '@/data/products';
import { PRICES } from '@/data/prices';
import { categoryBySlug } from '@/data/categories';
import { colorFamilyById } from '@/data/colors';
import { normalize } from '@/utils/format';

const all = rawProducts.map((p, index) => ({
  ...p,
  index,
  price: PRICES[p.slug] ?? null,
  variants: p.variants.map((v) => ({ ...v, cover: v.images[0] })),
}));

const bySlug = Object.fromEntries(all.map((p) => [p.slug, p]));

export const getProducts = () => all;
export const getProduct = (slug) => bySlug[slug] || null;
export const getTypes = (category) => [...new Set(all.filter((p) => !category || p.category === category).map((p) => p.type))];
export const getPriceBounds = () => {
  const prices = all.map((p) => p.price).filter((n) => n != null);
  return [Math.min(...prices), Math.max(...prices)];
};
export const getAllSizes = () => [...new Set(all.flatMap((p) => p.sizes))];

export function countByColor() {
  const counts = {};
  all.forEach((p) => {
    const fams = new Set(p.variants.flatMap((v) => v.families));
    fams.forEach((f) => (counts[f] = (counts[f] || 0) + 1));
  });
  return counts;
}

/** Variante à mettre en avant sur une carte selon les couleurs filtrées. */
export function pickVariant(product, colors = []) {
  if (!colors.length) return product.variants[0];
  return product.variants.find((v) => v.families.some((f) => colors.includes(f))) || product.variants[0];
}

export function filterProducts({ category, type, colors = [], size, maxPrice, query } = {}) {
  const q = normalize(query || '');
  return all.filter((p) => {
    if (category && p.category !== category) return false;
    if (type && p.type !== type) return false;
    if (colors.length && !p.variants.some((v) => v.families.some((f) => colors.includes(f)))) return false;
    if (size && !p.sizes.includes(size)) return false;
    if (maxPrice != null && p.price != null && p.price > maxPrice) return false;
    if (q && !searchText(p).includes(q)) return false;
    return true;
  });
}

function searchText(p) {
  const fams = new Set(p.variants.flatMap((v) => v.families));
  return normalize(
    [
      p.name,
      p.type,
      p.description,
      p.material || '',
      categoryBySlug[p.category]?.label || '',
      ...p.variants.map((v) => v.label),
      ...[...fams].map((f) => colorFamilyById[f]?.label || f),
    ].join(' '),
  );
}

export function sortProducts(list, sort) {
  const copy = [...list];
  if (sort === 'prix-asc') copy.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  else if (sort === 'prix-desc') copy.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  else if (sort === 'coloris') copy.sort((a, b) => b.variants.length - a.variants.length);
  else if (sort === 'recent') copy.reverse();
  return copy;
}

export function getRelated(product, limit = 4) {
  const same = all.filter((p) => p.slug !== product.slug && p.category === product.category);
  const others = all.filter((p) => p.slug !== product.slug && p.category !== product.category);
  return [...same, ...others].slice(0, limit);
}

export const SORTS = [
  { id: 'selection', label: 'Sélection' },
  { id: 'recent', label: 'Derniers ajouts' },
  { id: 'prix-asc', label: 'Prix croissant' },
  { id: 'prix-desc', label: 'Prix décroissant' },
  { id: 'coloris', label: 'Plus de coloris' },
];
