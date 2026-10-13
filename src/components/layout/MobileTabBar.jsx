import { NavLink } from 'react-router-dom';
import { Icon, WhatsAppIcon } from '@/components/ui/Icon';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import { whatsappLink } from '@/config/site';

const base = 'relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[0.72rem]';

export function MobileTabBar() {
  const { count } = useCart();
  const { slugs } = useWishlist();
  const { setCartOpen } = useUI();
  const cls = ({ isActive }) => `${base} ${isActive ? 'text-noir' : 'text-pierre'}`;

  return (
    <nav className="safe-b fixed inset-x-0 bottom-0 z-[60] flex border-t border-sable/70 bg-ivoire/95 backdrop-blur lg:hidden" aria-label="Navigation rapide">
      <NavLink to="/" end className={cls}><Icon name="home" /><span>Accueil</span></NavLink>
      <NavLink to="/boutique" className={cls}><Icon name="grid" /><span>Boutique</span></NavLink>
      <NavLink to="/favoris" className={cls}>
        <span className="relative"><Icon name="heart" />{slugs.length > 0 && <span className="absolute -right-1 -top-0.5 h-2 w-2 rounded-full bg-or" />}</span>
        <span>Favoris</span>
      </NavLink>
      <button type="button" onClick={() => setCartOpen(true)} className={`${base} text-pierre`} aria-label={`Panier (${count})`}>
        <span className="relative"><Icon name="bag" />{count > 0 && <span key={count} className="absolute -right-2.5 -top-1.5 grid h-4 min-w-[1rem] animate-bump place-items-center bg-noir px-1 text-[0.65rem] leading-none text-ivoire">{count}</span>}</span>
        <span>Panier</span>
      </button>
      <a href={whatsappLink('Bonjour, j’ai une question sur vos produits.')} target="_blank" rel="noreferrer" className={`${base} text-wa`}>
        <WhatsAppIcon className="h-[22px] w-[22px]" /><span>WhatsApp</span>
      </a>
    </nav>
  );
}
