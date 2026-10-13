import { imgSrc } from '@/utils/images';

/** Pastille de coloris : couleur unie, ou extrait de la photo pour les imprimés. */
export function Swatch({ variant, slug, size = 'h-6 w-6', ring = false }) {
  const style = variant.swatch
    ? { backgroundColor: variant.swatch }
    : { backgroundImage: `url(${imgSrc(slug, variant.images[0], '400')})`, backgroundSize: '420%', backgroundPosition: '50% 62%' };
  return (
    <span
      className={`relative inline-block shrink-0 rounded-full ${size} ${ring ? 'ring-1 ring-encre/15 ring-offset-2 ring-offset-ivoire' : 'ring-1 ring-encre/20'}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function FamilyDot({ family, size = 'h-5 w-5' }) {
  const style = family.hex
    ? { backgroundColor: family.hex }
    : { backgroundImage: 'conic-gradient(#d9467f,#e27b22,#d9ae23,#2f7d4f,#1fa5a8,#2250b8,#7040a8,#d9467f)' };
  return <span className={`inline-block shrink-0 rounded-full ring-1 ring-encre/20 ${size}`} style={style} aria-hidden="true" />;
}
