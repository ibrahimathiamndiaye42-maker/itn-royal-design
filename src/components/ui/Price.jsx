import { formatPrice } from '@/utils/format';

export function Price({ value, className = '' }) {
  return <span className={`tabular-nums ${value == null ? 'text-pierre' : ''} ${className}`}>{formatPrice(value)}</span>;
}
