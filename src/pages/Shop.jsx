import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { categories, categoryBySlug } from '@/data/categories';
import { colorFamilyById } from '@/data/colors';
import { filterProducts, sortProducts, SORTS } from '@/services/catalog';
import { ProductGrid } from '@/components/product/ProductCard';
import { FilterPanel } from '@/components/shop/FilterPanel';
import { Drawer } from '@/components/ui/Drawer';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { formatPrice, plural } from '@/utils/format';
import { useDocumentMeta, useMediaQuery } from '@/hooks';
import { SITE } from '@/config/site';

export default function Shop() {
  const { category = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const cat = categoryBySlug[category];
  const state = {
    category: cat ? category : '',
    type: params.get('type') || '',
    colors: (params.get('couleur') || '').split(',').filter((c) => colorFamilyById[c]),
    size: params.get('taille') || '',
    maxPrice: params.get('prix') ? Number(params.get('prix')) : null,
    query: params.get('q') || '',
  };
  const sort = params.get('tri') || 'selection';
  const columns = params.get('vue') === '1' ? 1 : 2;

  const products = useMemo(
    () => sortProducts(filterProducts(state), sort),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.category, state.type, state.colors.join(','), state.size, state.maxPrice, state.query, sort],
  );

  const title = state.query ? `Résultats pour « ${state.query} »` : cat ? cat.label : 'Toute la boutique';
  useDocumentMeta({
    title: `${title} | ${SITE.name}`,
    description: cat ? `${cat.label} : ${cat.blurb}. ${SITE.description}` : SITE.description,
  });

  const setParam = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v === '' || v == null || (Array.isArray(v) && !v.length) ? next.delete(k) : next.set(k, Array.isArray(v) ? v.join(',') : v)));
    setParams(next, { replace: true });
  };

  const onChange = (patch) => {
    const { category: newCat, colors, maxPrice, size, type } = patch;
    if ('category' in patch) {
      const next = new URLSearchParams(params);
      next.delete('type');
      navigate({ pathname: newCat ? `/boutique/${newCat}` : '/boutique', search: next.toString() }, { replace: true });
      return;
    }
    setParam({
      ...('colors' in patch ? { couleur: colors } : {}),
      ...('maxPrice' in patch ? { prix: maxPrice } : {}),
      ...('size' in patch ? { taille: size } : {}),
      ...('type' in patch ? { type } : {}),
    });
  };

  const reset = () => navigate({ pathname: category ? `/boutique/${category}` : '/boutique' }, { replace: true });

  const chips = [
    ...state.colors.map((c) => ({ key: `c-${c}`, label: colorFamilyById[c].label, remove: () => onChange({ colors: state.colors.filter((x) => x !== c) }) })),
    state.type && { key: 't', label: state.type, remove: () => onChange({ type: '' }) },
    state.size && { key: 's', label: `Taille ${state.size}`, remove: () => onChange({ size: '' }) },
    state.maxPrice && { key: 'p', label: `Jusqu’à ${formatPrice(state.maxPrice)}`, remove: () => onChange({ maxPrice: '' }) },
    state.query && { key: 'q', label: `« ${state.query} »`, remove: () => setParam({ q: '' }) },
  ].filter(Boolean);
  const activeCount = chips.length;

  return (
    <div className="container-page pt-6 md:pt-10">
      <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: 'Boutique', to: cat ? '/boutique' : undefined }, ...(cat ? [{ label: cat.label }] : [])]} />
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl">{title}</h1>
          <p className="mt-2 text-pierre">{cat ? `${cat.blurb}. ` : ''}{plural(products.length, 'modèle', 'modèles')}</p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button type="button" onClick={() => setFiltersOpen(true)} className="btn btn-outline min-h-[2.9rem] flex-1 px-5 sm:flex-none lg:hidden">
            <Icon name="filter" className="h-5 w-5" /> Filtrer{activeCount > 0 ? ` (${activeCount})` : ''}
          </button>
          <label className="relative flex-1 sm:flex-none">
            <span className="sr-only">Trier par</span>
            <select value={sort} onChange={(e) => setParam({ tri: e.target.value === 'selection' ? '' : e.target.value })} className="field min-h-[2.9rem] appearance-none py-0 pl-3 pr-8 text-[0.95rem]">
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            <Icon name="down" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          </label>
          <div className="flex md:hidden" role="group" aria-label="Affichage">
            <button type="button" aria-pressed={columns === 1} onClick={() => setParam({ vue: '1' })} className="grid h-[2.9rem] w-11 place-items-center border border-sable aria-pressed:bg-encre aria-pressed:text-ivoire" aria-label="Une colonne"><Icon name="single" className="h-5 w-5" /></button>
            <button type="button" aria-pressed={columns === 2} onClick={() => setParam({ vue: '' })} className="grid h-[2.9rem] w-11 place-items-center border border-l-0 border-sable aria-pressed:bg-encre aria-pressed:text-ivoire" aria-label="Deux colonnes"><Icon name="grid" className="h-5 w-5" /></button>
          </div>
        </div>
      </div>

      {!cat && (
        <nav aria-label="Catégories" className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          <Link to="/boutique" className="chip shrink-0 border-encre bg-encre text-ivoire" aria-current="page">Tout</Link>
          {categories.map((c) => <Link key={c.slug} to={`/boutique/${c.slug}`} className="chip shrink-0 hover:border-encre">{c.label}</Link>)}
        </nav>
      )}

      {chips.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Filtres actifs">
          {chips.map((c) => (
            <button key={c.key} type="button" onClick={c.remove} className="chip bg-lin" aria-label={`Retirer le filtre ${c.label}`}>{c.label}<Icon name="close" className="h-3.5 w-3.5" /></button>
          ))}
          <button type="button" onClick={reset} className="link-u ml-1 text-[0.9rem]">Tout effacer</button>
        </div>
      )}

      <div className="mt-8 grid gap-12 lg:grid-cols-[17rem_1fr] xl:grid-cols-[18.5rem_1fr]">
        {isDesktop && (
          <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] self-start overflow-y-auto pb-8 pr-2 lg:block" aria-label="Filtres">
            <FilterPanel state={state} onChange={onChange} onReset={reset} />
          </aside>
        )}

        <div>
          {products.length === 0 ? (
            <div className="py-16">
              <p className="font-display text-3xl">Aucun modèle ne correspond.</p>
              <p className="mt-3 max-w-md text-pierre">Retirez un filtre ou essayez une autre couleur. Vous cherchez un modèle précis ? Écrivez-nous sur WhatsApp.</p>
              <button type="button" onClick={reset} className="btn btn-primary mt-7">Effacer les filtres</button>
            </div>
          ) : (
            <ProductGrid products={products} colors={state.colors} columns={columns} />
          )}
        </div>
      </div>

      <Drawer
        open={filtersOpen && !isDesktop}
        onClose={() => setFiltersOpen(false)}
        title="Filtres"
        side="bottom"
        footer={<button type="button" onClick={() => setFiltersOpen(false)} className="btn btn-primary w-full">Voir {plural(products.length, 'modèle', 'modèles')}</button>}
      >
        <div className="px-5 py-6"><FilterPanel state={state} onChange={onChange} onReset={reset} /></div>
      </Drawer>
    </div>
  );
}
