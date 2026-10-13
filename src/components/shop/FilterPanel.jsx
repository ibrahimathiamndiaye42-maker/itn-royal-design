import { colorFamilies } from '@/data/colors';
import { categories } from '@/data/categories';
import { FamilyDot } from '@/components/ui/Swatch';
import { formatPrice } from '@/utils/format';
import { getAllSizes, getPriceBounds, getTypes } from '@/services/catalog';

/**
 * Filtres. `state` = { category, type, colors[], size, maxPrice } ; `onChange(patch)` modifie l'URL.
 * `counts` = nombre de produits par couleur (calculé sur la sélection courante).
 */
export function FilterPanel({ state, onChange, onReset }) {
  const [min, max] = getPriceBounds();
  const sizes = getAllSizes();
  const types = getTypes(state.category);
  const priceValue = state.maxPrice ?? max;

  const toggleColor = (id) => {
    const set = new Set(state.colors);
    set.has(id) ? set.delete(id) : set.add(id);
    onChange({ colors: [...set] });
  };

  return (
    <div className="space-y-9">
      <Group title="Catégorie">
        <div className="flex flex-wrap gap-2">
          <button type="button" className="chip" aria-pressed={!state.category} onClick={() => onChange({ category: '', type: '' })}>Tout</button>
          {categories.map((c) => (
            <button key={c.slug} type="button" className="chip" aria-pressed={state.category === c.slug} onClick={() => onChange({ category: c.slug, type: '' })}>{c.label}</button>
          ))}
        </div>
      </Group>

      {types.length > 1 && (
        <Group title="Type">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="chip" aria-pressed={!state.type} onClick={() => onChange({ type: '' })}>Tous</button>
            {types.map((t) => (
              <button key={t} type="button" className="chip" aria-pressed={state.type === t} onClick={() => onChange({ type: t })}>{t}</button>
            ))}
          </div>
        </Group>
      )}

      <Group title="Couleur">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {colorFamilies.map((c) => {
            const on = state.colors.includes(c.id);
            return (
              <button key={c.id} type="button" role="checkbox" aria-checked={on} onClick={() => toggleColor(c.id)} className="flex min-h-[2.75rem] items-center gap-2.5 text-left text-[0.93rem]">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${on ? 'ring-2 ring-encre ring-offset-2 ring-offset-ivoire' : ''}`}><FamilyDot family={c} size="h-6 w-6" /></span>
                <span className={on ? 'font-medium' : ''}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Taille">
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button key={s} type="button" className="chip min-w-[3.4rem] justify-center" aria-pressed={state.size === s} onClick={() => onChange({ size: state.size === s ? '' : s })}>{s}</button>
          ))}
        </div>
      </Group>

      <Group title={`Prix jusqu’à ${formatPrice(priceValue)}`}>
        <input
          type="range"
          min={min}
          max={max}
          step={500}
          value={priceValue}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) >= max ? '' : e.target.value })}
          className="w-full accent-noir"
          aria-label="Prix maximum"
        />
        <div className="mt-1 flex justify-between text-[0.85rem] text-pierre"><span>{formatPrice(min)}</span><span>{formatPrice(max)}</span></div>
      </Group>

      <button type="button" onClick={onReset} className="link-u text-[0.95rem]">Effacer tous les filtres</button>
    </div>
  );
}

function Group({ title, children }) {
  return (
    <fieldset>
      <legend className="mb-3.5 font-display text-[1.15rem]">{title}</legend>
      {children}
    </fieldset>
  );
}
