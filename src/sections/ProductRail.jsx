import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/product/ProductCard';
import { Icon } from '@/components/ui/Icon';

/** Rangée horizontale de produits, avec accroche au défilement et flèches sur ordinateur. */
export function ProductRail({ title, products, linkTo, linkLabel = 'Tout voir', id }) {
  const ref = useRef(null);
  const scroll = (d) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.8), behavior: 'smooth' });
  if (!products.length) return null;
  return (
    <section aria-labelledby={id} className="mt-20 md:mt-28">
      <div className="container-page flex items-end justify-between gap-6">
        <h2 id={id} className="text-3xl md:text-4xl">{title}</h2>
        <div className="flex items-center gap-2">
          {linkTo && <Link to={linkTo} className="link-u mr-3 hidden sm:inline">{linkLabel}</Link>}
          <button type="button" onClick={() => scroll(-1)} aria-label="Précédent" className="hidden h-11 w-11 place-items-center border border-sable hover:border-encre md:grid"><Icon name="left" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Suivant" className="hidden h-11 w-11 place-items-center border border-sable hover:border-encre md:grid"><Icon name="right" /></button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 [scroll-padding-inline:1.25rem] md:gap-5 md:px-8 md:[scroll-padding-inline:2rem] xl:px-[max(3rem,calc((100vw-88rem)/2+3rem))] xl:[scroll-padding-inline:max(3rem,calc((100vw-88rem)/2+3rem))]" tabIndex={0} aria-label={title}>
        {products.map((p) => (
          <div key={p.slug} className="w-[62vw] max-w-[19rem] shrink-0 snap-start sm:w-[44vw] md:w-[23rem] md:max-w-none lg:w-[20rem]">
            <ProductCard product={p} sizes="(min-width:1024px) 22vw, 62vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
