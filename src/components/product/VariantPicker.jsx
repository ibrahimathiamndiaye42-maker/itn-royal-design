import { Swatch } from '@/components/ui/Swatch';

export function VariantPicker({ product, activeId, onChange }) {
  const active = product.variants.find((v) => v.id === activeId) || product.variants[0];
  const many = product.variants.length > 10;
  return (
    <fieldset>
      <legend className="mb-3 text-[0.95rem]">
        {many ? 'Motif' : 'Couleur'} : <span className="font-medium">{active.label}</span>
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={many ? 'Motifs' : 'Couleurs'}>
        {product.variants.map((v) => (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={v.id === active.id}
            aria-label={v.label}
            title={v.label}
            onClick={() => onChange(v.id)}
            className="grid h-11 w-11 place-items-center"
          >
            <Swatch variant={v} slug={product.slug} size={many ? 'h-8 w-8' : 'h-8 w-8'} ring={v.id === active.id} />
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function SizePicker({ sizes, value, onChange, error }) {
  if (!sizes.length) return null;
  return (
    <fieldset id="size-picker">
      <legend className="mb-3 text-[0.95rem]">
        Taille{value ? <> : <span className="font-medium">{value}</span></> : ''}
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Tailles">
        {sizes.map((s) => (
          <button key={s} type="button" role="radio" aria-checked={value === s} onClick={() => onChange(s)} className="chip min-w-[3.4rem] justify-center">
            {s}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-[0.9rem] text-brique" role="alert">Choisissez une taille pour continuer.</p>}
    </fieldset>
  );
}
