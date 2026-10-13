import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { Drawer } from '@/components/ui/Drawer';
import { Logo } from './Logo';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import { useScrollDirection } from '@/hooks';

export function Header() {
  const { count } = useCart();
  const wish = useWishlist();
  const { setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useUI();
  const { down, top } = useScrollDirection();
  const { pathname } = useLocation();

  const navClass = ({ isActive }) =>
    `relative py-2 text-[0.95rem] transition-colors hover:text-noir ${isActive ? 'text-noir after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-or' : 'text-encre/80'}`;

  return (
    <>
      <header className={`sticky top-0 z-50 border-b bg-ivoire/95 backdrop-blur transition-transform duration-300 ease-royal ${top ? 'border-transparent' : 'border-sable/70'} ${down ? '-translate-y-full lg:translate-y-0' : 'translate-y-0'}`}>
        <div className="container-page flex h-[4.1rem] items-center justify-between gap-6 md:h-[4.6rem]">
          <div className="flex flex-1 items-center lg:hidden">
            <button type="button" onClick={() => setMenuOpen(true)} className="-ml-2 grid h-11 w-11 place-items-center" aria-label="Ouvrir le menu">
              <Icon name="menu" />
            </button>
          </div>

          <Logo className="shrink-0" />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {SITE.nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/boutique'} className={navClass}>{n.label}</NavLink>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-0.5 lg:flex-none">
            <button type="button" onClick={() => setSearchOpen(true)} className="grid h-11 w-11 place-items-center" aria-label="Rechercher">
              <Icon name="search" />
            </button>
            <Link to="/favoris" className="relative hidden h-11 w-11 place-items-center lg:grid" aria-label={`Favoris (${wish.slugs.length})`}>
              <Icon name="heart" />
              {wish.slugs.length > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-or" />}
            </Link>
            <button type="button" onClick={() => setCartOpen(true)} className="relative hidden h-11 w-11 place-items-center lg:grid" aria-label={`Panier (${count})`}>
              <Icon name="bag" />
              {count > 0 && <span key={count} className="absolute right-0 top-0.5 grid h-[1.1rem] min-w-[1.1rem] animate-bump place-items-center bg-noir px-1 text-[0.7rem] leading-none text-ivoire">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu" side="left">
        <nav className="flex flex-col px-5 py-4" aria-label="Menu mobile">
          {[{ label: 'Accueil', to: '/' }, ...SITE.nav, { label: 'Infos et livraison', to: '/infos' }].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setMenuOpen(false)} className={`border-b border-sable/60 py-4 font-display text-[1.35rem] ${pathname === n.to ? 'text-or' : ''}`}>
              {n.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </>
  );
}
