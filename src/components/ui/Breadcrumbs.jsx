import { Link } from 'react-router-dom';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Fil d’Ariane" className="text-[0.88rem] text-pierre">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {it.to && i < items.length - 1 ? <Link to={it.to} className="hover:text-encre">{it.label}</Link> : <span aria-current={i === items.length - 1 ? 'page' : undefined} className={i === items.length - 1 ? 'text-encre' : ''}>{it.label}</span>}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
