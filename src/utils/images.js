import { IMAGE_META } from '@/data/imageMeta';

const base = (slug, id) => `/images/p/${slug}/${id}`;

export const imgSrc = (slug, id, size = '800') => `${base(slug, id)}-${size}.webp`;
export const imgSrcSet = (slug, id) => `${base(slug, id)}-400.webp 400w, ${base(slug, id)}-800.webp 800w`;
export const imgFull = (slug, id) => `${base(slug, id)}-full.webp`;

/** [couleur moyenne, ratio l/h] de la photo. */
export const imgMeta = (slug, id) => IMAGE_META[`${slug}/${id}`] || ['#e9e1d3', 0.75];
