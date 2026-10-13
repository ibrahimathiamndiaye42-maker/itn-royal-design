import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Img } from '@/components/ui/Img';
import { Icon } from '@/components/ui/Icon';
import { Swatch } from '@/components/ui/Swatch';
import { Price } from '@/components/ui/Price';
import { useWishlist } from '@/context/WishlistContext';
import { pickVariant } from '@/services/catalog';
import { plural } from '@/utils/format';

const MAX_DOTS = 5;

export function ProductCard({ product, colors = [], priority = false, sizes }) {
  const initial = pickVariant(product, colors);
  const [activeId, setActiveId] = useState(initial.id);
  const active = product.variants.find((v) => v.id === activeId) || initial;
  const { has, toggle } = useWishlist();
  const liked = has(product.slug);
  const dots = product.variants.slice(0, MAX_DOTS);
  const hidden = product.variants.length - dots.length;
  const href = `/produit/${product.slug}?couleur=${active.id}`;

  return (
    <article className="group relative flex flex-col">
      <Link to={href} className="block" aria-label={`${product.name}, couleur ${active.label}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-lin">
          <Img slug={product.slug} id={active.cover} alt={`${product.name}, ${active.label}`} priority={priority} sizes={sizes} className="transition-transform duration-700 ease-royal group-hover:scale-[1.03]" />
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggle(product.slug)}
        aria-pressed={liked}
        aria-label={liked ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`}
        className="absolute right-1 top-1 grid h-11 w-11 place-items-center text-noir"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ivoire/90 backdrop-blur-sm">
          <Icon name="heart" className="h-[18px] w-[18px]" filled={liked} />
        </span>
      </button>

      <div className="flex flex-1 flex-col pt-3.5">
        <h3 className="text-[1.02rem] leading-snug md:text-[1.08rem]">
          <Link to={href} className="hover:underline hover:decoration-sable hover:underline-offset-4">{product.name}</Link>
        </h3>
        <Price value={product.price} className="mt-1 text-[0.95rem]" />
        <div className="mt-auto pt-2">
          <div className="flex items-center gap-1" role="group" aria-label="Coloris">
            {dots.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveId(v.id)}
                onMouseEnter={() => setActiveId(v.id)}
                aria-label={v.label}
                aria-pressed={v.id === active.id}
                className="grid h-7 w-7 place-items-center"
              >
                <Swatch variant={v} slug={product.slug} size="h-4 w-4" ring={v.id === active.id} />
              </button>
            ))}
            {hidden > 0 && <span className="pl-1 text-[0.85rem] text-pierre">+{hidden}</span>}
          </div>
          <p className="mt-0.5 text-[0.85rem] text-pierre">
            {active.label} · {plural(product.variants.length, 'coloris', 'coloris')}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, colors = [], columns = 2 }) {
  const cols = columns === 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2';
  return (
    <div className={`grid gap-x-3 gap-y-9 md:gap-x-5 lg:grid-cols-3 xl:grid-cols-4 ${cols}`}>
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} colors={colors} priority={i < 4} />
      ))}
    </div>
  );
}
