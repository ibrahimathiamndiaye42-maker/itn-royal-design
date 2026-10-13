import { Icon } from './Icon';

export function QuantityStepper({ value, onChange, min = 1, max = 20, label = 'Quantité' }) {
  return (
    <div className="inline-flex items-center border border-sable" role="group" aria-label={label}>
      <button type="button" className="grid h-11 w-11 place-items-center disabled:opacity-30" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Diminuer la quantité">
        <Icon name="minus" className="h-4 w-4" />
      </button>
      <span className="w-9 text-center tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className="grid h-11 w-11 place-items-center disabled:opacity-30" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Augmenter la quantité">
        <Icon name="plus" className="h-4 w-4" />
      </button>
    </div>
  );
}
