import { Link } from 'react-router-dom';
import { Drawer } from '@/components/ui/Drawer';
import { Price } from '@/components/ui/Price';
import { CartLine } from './CartLine';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { cartTotal } from '@/services/orders';
import { formatPrice } from '@/utils/format';

export function CartDrawer() {
  const { lines, count } = useCart();
  const { cartOpen, setCartOpen } = useUI();
  const close = () => setCartOpen(false);
  const { amount, hasUnpriced } = cartTotal(lines);

  return (
    <Drawer
      open={cartOpen}
      onClose={close}
      title={count ? `Panier (${count})` : 'Panier'}
      footer={
        lines.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span>Total estimé</span>
              <Price value={amount} className="text-xl" />
            </div>
            {hasUnpriced && <p className="text-[0.85rem] text-pierre">Certains articles sont sur demande : leur prix est confirmé sur WhatsApp.</p>}
            <p className="text-[0.85rem] text-pierre">Livraison et paiement confirmés avec vous sur WhatsApp.</p>
            <Link to="/commande" onClick={close} className="btn btn-primary w-full">Commander · {formatPrice(amount)}</Link>
            <Link to="/panier" onClick={close} className="btn btn-outline w-full">Voir le panier</Link>
          </div>
        )
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-start justify-center gap-5 px-6 py-16">
          <p className="font-display text-2xl">Votre panier est vide.</p>
          <p className="text-pierre">Parcourez la boutique par couleur ou par catégorie et ajoutez vos modèles préférés.</p>
          <Link to="/boutique" onClick={close} className="btn btn-primary">Voir la boutique</Link>
        </div>
      ) : (
        <ul className="divide-y divide-sable/60 px-5">
          {lines.map((l) => <CartLine key={l.key} line={l} onNavigate={close} />)}
        </ul>
      )}
    </Drawer>
  );
}
