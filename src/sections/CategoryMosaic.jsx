import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { Img } from '@/components/ui/Img';
import { getProducts } from '@/services/catalog';
import { plural } from '@/utils/format';

const spans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];

export function CategoryMosaic() {
  const all = getProducts();
  return (
    <section aria-labelledby="cat-title" className="container-page mt-20 md:mt-28">
      <h2 id="cat-title" className="max-w-lg text-3xl md:text-4xl">Parcourir par catégorie</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-12 md:gap-5">
        {categories.map((c, i) => {
          const n = all.filter((p) => p.category === c.slug).length;
          return (
            <Link key={c.slug} to={`/boutique/${c.slug}`} className={`group relative block overflow-hidden bg-lin ${spans[i]}`}>
              <div className="aspect-[5/4] md:aspect-auto md:h-[27rem]">
                <Img slug={c.cover[0]} id={c.cover[1]} alt="" sizes="(min-width:768px) 55vw, 100vw" className={`transition-transform duration-[1200ms] ease-royal group-hover:scale-105 ${{ femme: 'object-[50%_6%]', homme: 'object-[50%_4%]', maison: 'object-[50%_55%]', priere: 'object-[50%_40%]' }[c.slug]}`} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-noir/65 via-noir/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white md:inset-x-7 md:bottom-7">
                <div>
                  <h3 className="text-[1.9rem] leading-none md:text-4xl">{c.label}</h3>
                  <p className="mt-2 text-[0.95rem] opacity-90">{c.blurb} · {plural(n, 'modèle', 'modèles')}</p>
                </div>
                <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-ivoire text-noir transition-transform group-hover:translate-x-1 sm:grid" aria-hidden="true">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
