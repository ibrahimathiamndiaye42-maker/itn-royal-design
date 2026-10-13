import { Link } from 'react-router-dom';
import { imgSrc } from '@/utils/images';
import { Price } from '@/components/ui/Price';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Icon } from '@/components/ui/Icon';
import { useCart } from '@/context/CartContext';

export function CartLine({ line, onNavigate }) {
  const { setQty, remove } = useCart();
  return (
    <li className="flex gap-4 py-5">
      <Link to={`/produit/${line.slug}?couleur=${line.variantId}`} onClick={onNavigate} className="block w-24 shrink-0 bg-lin">
        <img src={imgSrc(line.slug, line.image, '400')} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/produit/${line.slug}?couleur=${line.variantId}`} onClick={onNavigate} className="block leading-snug hover:underline hover:underline-offset-4">{line.name}</Link>
            <p className="mt-1 text-[0.9rem] text-pierre">{line.variantLabel}{line.size ? ` · Taille ${line.size}` : ''}</p>
          </div>
          <button type="button" onClick={() => remove(line.key)} className="-mr-2 -mt-1 grid h-10 w-10 shrink-0 place-items-center text-pierre hover:text-brique" aria-label={`Retirer ${line.name}`}>
            <Icon name="trash" className="h-[19px] w-[19px]" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper value={line.qty} onChange={(q) => setQty(line.key, q)} label={`Quantité de ${line.name}`} />
          <Price value={line.price == null ? null : line.price * line.qty} />
        </div>
      </div>
    </li>
  );
}
