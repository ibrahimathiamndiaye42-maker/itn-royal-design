import { Link } from 'react-router-dom';

export function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" aria-label="ITN Royal Design, accueil" className={`inline-flex items-baseline gap-2.5 font-display ${light ? 'text-ivoire' : 'text-noir'} ${className}`}>
      <span className="border border-or px-1.5 py-[1px] text-[0.72rem] leading-tight tracking-[0.18em]">ITN</span>
      <span className="text-[1.3rem] tracking-[0.06em] md:text-[1.45rem]">Royal Design</span>
    </Link>
  );
}
