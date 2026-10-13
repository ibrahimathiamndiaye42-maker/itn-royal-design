/** Catégories de la boutique. `cover` = [slug du produit, id de la photo]. */
export const categories = [
  { slug: 'femme', label: 'Femme', blurb: 'Robes, robes d’été et ensembles', cover: ['robe-ete-imprimee', '01'] },
  { slug: 'homme', label: 'Homme et couple', blurb: 'Abayas et ensembles chemise', cover: ['abaya-vip-unisexe', '01'] },
  { slug: 'maison', label: 'Maison', blurb: 'Draps en coton, 2 et 3 pièces', cover: ['drap-coton-3-pieces', '01'] },
  { slug: 'priere', label: 'Prière', blurb: 'Tapis de prière matelassés', cover: ['tapis-priere-matelasse', '04'] },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
