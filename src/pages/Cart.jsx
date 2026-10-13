import { Link } from 'react-router-dom';
import { CartLine } from '@/components/cart/CartLine';
import { Price } from '@/components/ui/Price';
import { useCart } from '@/context/CartContext';
import { cartTotal } from '@/services/orders';
import { useDocumentMeta } from '@/hooks';
import { SITE } from '@/config/site';

export default function Cart() {
  useDocumentMeta({ title: `Panier | ${SITE.name}` });
  const { lines, clear } = useCart();
  const { amount, hasUnpriced } = cartTotal(lines);

  if (!lines.length)
    return (
      <div className="container-page py-24">
        <h1 className="text-4xl">Votre panier est vide</h1>
        <p className="mt-4 max-w-md text-pierre">Parcourez la boutique par couleur ou par catégorie et ajoutez vos modèles préférés.</p>
        <Link to="/boutique" className="btn btn-primary mt-8">Voir la boutique</Link>
      </div>
    );

  return (
    <div className="container-page pt-8 md:pt-12">
      <h1 className="text-4xl md:text-5xl">Panier</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <ul className="divide-y divide-sable/60 border-y border-sable/60 lg:col-span-7">
          {lines.map((l) => <CartLine key={l.key} line={l} />)}
        </ul>
        <aside className="lg:col-span-5">
          <div className="space-y-4 bg-lin p-6 md:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl">Récapitulatif</h2>
            <div className="flex items-baseline justify-between"><span>Total estimé</span><Price value={amount} className="text-2xl" /></div>
            {hasUnpriced && <p className="text-[0.9rem] text-pierre">Certains articles sont sur demande : leur prix est confirmé sur WhatsApp.</p>}
            <p className="text-[0.9rem] text-pierre">Livraison et paiement confirmés avec vous sur WhatsApp avant toute validation.</p>
            <Link to="/commande" className="btn btn-primary w-full">Passer la commande</Link>
            <Link to="/boutique" className="btn btn-outline w-full">Continuer mes achats</Link>
            <button type="button" onClick={clear} className="link-u text-[0.9rem] text-pierre">Vider le panier</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
