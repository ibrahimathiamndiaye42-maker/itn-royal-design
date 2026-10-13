import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Img } from '@/components/ui/Img';
import { Swatch } from '@/components/ui/Swatch';
import { Icon } from '@/components/ui/Icon';
import { getProduct } from '@/services/catalog';
import { useReducedMotion } from '@/hooks';

const HERO_SLUG = 'robe-franges-chapeau';
const DELAY = 4200;

/**
 * Le moment fort de la page : un même modèle qui change de couleur,
 * pour montrer d'emblée ce qui distingue la boutique (chaque pièce existe en plusieurs coloris).
 */
export function Hero() {
  const product = getProduct(HERO_SLUG);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const variants = product.variants;
  const active = variants[index];

  useEffect(() => {
    if (paused || reduced) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % variants.length), DELAY);
    return () => clearInterval(t);
  }, [paused, reduced, variants.length]);

  const choose = (i) => {
    setIndex(i);
    setPaused(true);
  };

  return (
    <section aria-labelledby="hero-title" className="container-page grid items-center gap-8 pt-0 md:pt-6 lg:grid-cols-12 lg:gap-14 lg:pt-10">
      <div className="relative -mx-5 aspect-[4/5] overflow-hidden bg-lin md:mx-0 md:aspect-[5/4] lg:col-span-7 lg:aspect-[4/5] lg:max-h-[46rem] xl:aspect-[7/8]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {variants.map((v, i) => (
          <div key={v.id} className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`} aria-hidden={i !== index}>
            <Img slug={product.slug} id={v.cover} alt={`${product.name}, ${v.label}`} priority={i === 0} sizes="(min-width:1024px) 58vw, 100vw" className="object-[50%_20%]" />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-noir/35 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-white md:inset-x-6 md:bottom-6">
          <div>
            <p className="font-display text-xl md:text-2xl">{product.name}</p>
            <p className="text-[0.95rem] opacity-90" aria-live="polite">{active.label}</p>
          </div>
          <Link to={`/produit/${product.slug}?couleur=${active.id}`} className="btn btn-light min-h-[2.8rem] shrink-0 px-5 text-[0.9rem]">Voir ce modèle</Link>
        </div>
      </div>

      <div className="lg:col-span-5">
        <h1 id="hero-title" className="text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">Chaque modèle existe en plusieurs couleurs.</h1>
        <p className="mt-5 max-w-md text-[1.08rem] leading-relaxed text-pierre">
          Robes, tenues homme et couple, draps en coton et tapis de prière. Choisissez votre couleur, puis envoyez votre commande sur WhatsApp.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/boutique" className="btn btn-primary">Voir la boutique</Link>
          <a href="#couleurs" className="btn btn-outline">Parcourir par couleur</a>
        </div>

        <div className="mt-10 border-t border-sable/70 pt-6">
          <p className="mb-2 text-[0.92rem] text-pierre">{product.name} existe en {variants.length} coloris</p>
          <div className="flex flex-wrap items-center gap-0.5" role="radiogroup" aria-label="Coloris de la robe à franges">
            {variants.map((v, i) => (
              <button key={v.id} type="button" role="radio" aria-checked={i === index} aria-label={v.label} onClick={() => choose(i)} className="grid h-11 w-11 place-items-center">
                <Swatch variant={v} slug={product.slug} size="h-8 w-8" ring={i === index} />
              </button>
            ))}
            <button type="button" onClick={() => setPaused((p) => !p)} className="ml-2 inline-flex min-h-[2.75rem] items-center gap-1.5 px-2 text-[0.88rem] text-pierre hover:text-encre" aria-pressed={paused}>
              <Icon name={paused ? 'right' : 'minus'} className="h-4 w-4" />
              {paused ? 'Reprendre le défilement' : 'Mettre en pause'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
