import { useState } from 'react';
import { imgMeta, imgSrc, imgSrcSet } from '@/utils/images';

/**
 * Image de produit responsive : srcset, couleur d'attente, fondu à l'affichage.
 * `fit` : "cover" (cartes) ou "contain" (page produit).
 */
export function Img({ slug, id, alt, sizes = '(min-width:1024px) 25vw, 50vw', priority = false, className = '', fit = 'cover' }) {
  const [loaded, setLoaded] = useState(false);
  const [tone] = imgMeta(slug, id);
  return (
    <img
      key={`${slug}-${id}`}
      src={imgSrc(slug, id, '800')}
      srcSet={imgSrcSet(slug, id)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : undefined}
      decoding="async"
      onLoad={() => setLoaded(true)}
      ref={(el) => {
        if (el?.complete && !loaded) setLoaded(true);
      }}
      style={{ backgroundColor: tone }}
      className={`h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
}
