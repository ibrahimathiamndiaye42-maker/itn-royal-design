import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDialog, useScrollLock } from '@/hooks';
import { useUI } from '@/context/UIContext';
import { Icon } from '@/components/ui/Icon';
import { Price } from '@/components/ui/Price';
import { FamilyDot } from '@/components/ui/Swatch';
import { colorFamilies } from '@/data/colors';
import { categories } from '@/data/categories';
import { filterProducts } from '@/services/catalog';
import { imgSrc } from '@/utils/images';

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  if (!searchOpen) return null;
  return <Panel onClose={() => setSearchOpen(false)} />;
}

function Panel({ onClose }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const ref = useDialog(true, onClose);
  useScrollLock(true);
  const results = useMemo(() => (q.trim().length >= 2 ? filterProducts({ query: q }).slice(0, 8) : []), [q]);

  useEffect(() => {
    document.body.dataset.search = 'open';
    return () => delete document.body.dataset.search;
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    onClose();
    navigate(`/boutique?q=${encodeURIComponent(q.trim())}`);
  };

  return createPortal(
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Recherche" className="fixed inset-0 z-[85] flex animate-fadeIn flex-col bg-ivoire">
      <div className="border-b border-sable/70">
        <form onSubmit={submit} className="container-page flex h-[4.4rem] items-center gap-3" role="search">
          <Icon name="search" className="h-6 w-6 shrink-0 text-pierre" />
          <input data-autofocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Une robe, une couleur, un drap…" aria-label="Rechercher un produit" className="min-w-0 flex-1 bg-transparent text-xl outline-none placeholder:text-pierre/60" />
          <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center" aria-label="Fermer la recherche"><Icon name="close" /></button>
        </form>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="container-page max-w-4xl py-8">
          {q.trim().length < 2 ? (
            <div className="space-y-10">
              <section aria-labelledby="s-cat">
                <h2 id="s-cat" className="mb-4 text-lg">Catégories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link key={c.slug} to={`/boutique/${c.slug}`} onClick={onClose} className="chip hover:border-encre">{c.label}</Link>
                  ))}
                </div>
              </section>
              <section aria-labelledby="s-col">
                <h2 id="s-col" className="mb-4 text-lg">Par couleur</h2>
                <div className="flex flex-wrap gap-2">
                  {colorFamilies.map((c) => (
                    <Link key={c.id} to={`/boutique?couleur=${c.id}`} onClick={onClose} className="chip hover:border-encre"><FamilyDot family={c} size="h-4 w-4" />{c.label}</Link>
                  ))}
                </div>
              </section>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10">
              <p className="font-display text-2xl">Aucun résultat pour « {q} ».</p>
              <p className="mt-3 text-pierre">Essayez un autre mot (robe, drap, tapis, bleu…) ou parcourez la boutique.</p>
              <Link to="/boutique" onClick={onClose} className="btn btn-primary mt-6">Voir toute la boutique</Link>
            </div>
          ) : (
            <ul className="divide-y divide-sable/60" aria-live="polite">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link to={`/produit/${p.slug}`} onClick={onClose} className="flex items-center gap-4 py-3 hover:bg-lin/60">
                    <img src={imgSrc(p.slug, p.variants[0].cover, '400')} alt="" className="h-20 w-16 shrink-0 bg-lin object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[1.05rem]">{p.name}</span>
                      <span className="text-[0.88rem] text-pierre">{p.variants.length} coloris</span>
                    </span>
                    <Price value={p.price} className="shrink-0 pr-2" />
                  </Link>
                </li>
              ))}
              <li className="pt-5">
                <button type="submit" onClick={submit} className="link-u">Voir tous les résultats pour « {q} »</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
