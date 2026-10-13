import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getProduct, getRelated } from '@/services/catalog';
import { categoryBySlug } from '@/data/categories';
import { Gallery } from '@/components/product/Gallery';
import { SizePicker, VariantPicker } from '@/components/product/VariantPicker';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon, WhatsAppIcon } from '@/components/ui/Icon';
import { Price } from '@/components/ui/Price';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { ProductRail } from '@/sections/ProductRail';
import { useCart, lineKey } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import { useDocumentMeta, useInView, useRecentlyViewed } from '@/hooks';
import { imgSrc } from '@/utils/images';
import { formatPrice } from '@/utils/format';
import { SITE, whatsappLink } from '@/config/site';
import { buildOrderMessage } from '@/services/orders';
import NotFound from './NotFound';

export default function Product() {
  const { slug } = useParams();
  const product = getProduct(slug);
  if (!product) return <NotFound />;
  return <ProductView key={slug} product={product} />;
}

function ProductView({ product }) {
  const [params, setParams] = useSearchParams();
  const variant = product.variants.find((v) => v.id === params.get('couleur')) || product.variants[0];
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const cart = useCart();
  const wish = useWishlist();
  const { setCartOpen, notify } = useUI();
  const { push, slugs: recentSlugs } = useRecentlyViewed();
  const [ctaRef, ctaInView] = useInView({ rootMargin: '0px 0px -10% 0px' });
  const category = categoryBySlug[product.category];
  const liked = wish.has(product.slug);

  useEffect(() => push(product.slug), [product.slug]); // eslint-disable-line react-hooks/exhaustive-deps
  useDocumentMeta({
    title: `${product.name} | ${SITE.name}`,
    description: `${product.description} ${product.variants.length} coloris. ${formatPrice(product.price)}.`,
    image: `${window.location.origin}${imgSrc(product.slug, variant.cover, '800')}`,
  });

  useEffect(() => {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.variants.map((v) => `${window.location.origin}${imgSrc(product.slug, v.cover, '800')}`),
      ...(product.price != null ? { offers: { '@type': 'Offer', priceCurrency: 'XOF', price: product.price, url: window.location.href } } : {}),
    };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify(ld);
    document.head.appendChild(el);
    return () => el.remove();
  }, [product]);

  const setVariant = (id) => setParams({ couleur: id }, { replace: true });

  const buildLine = () => ({
    key: lineKey(product.slug, variant.id, size),
    slug: product.slug,
    name: product.name,
    variantId: variant.id,
    variantLabel: variant.label,
    image: variant.cover,
    size,
    qty,
    price: product.price,
  });

  const needsSize = product.sizes.length > 0 && !size;
  const guard = () => {
    if (!needsSize) return true;
    setSizeError(true);
    document.getElementById('size-picker')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  };

  const addToCart = () => {
    if (!guard()) return;
    cart.add(buildLine());
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
    notify(`${product.name} ajouté au panier`, { label: 'Voir le panier', onClick: () => setCartOpen(true) });
  };

  const orderNow = () => {
    if (!guard()) return;
    window.open(whatsappLink(buildOrderMessage([buildLine()])), '_blank', 'noopener');
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: product.name, text: `${product.name} chez ${SITE.name}`, url });
      else {
        await navigator.clipboard.writeText(url);
        notify('Lien copié');
      }
    } catch {
      /* partage annulé */
    }
  };

  const related = useMemo(() => getRelated(product, 8), [product]);
  const recent = recentSlugs.filter((s) => s !== product.slug).map(getProduct).filter(Boolean).slice(0, 8);

  return (
    <>
      <div className="container-page pt-6 md:pt-10">
        <Breadcrumbs items={[{ label: 'Accueil', to: '/' }, { label: category.label, to: `/boutique/${category.slug}` }, { label: product.name }]} />

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="-mx-5 md:mx-0 lg:col-span-7">
            <Gallery slug={product.slug} name={product.name} variantLabel={variant.label} images={variant.images} />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="text-[0.92rem] text-pierre">{product.type}{product.material ? ` · ${product.material}` : ''}</p>
              <h1 className="mt-1 text-4xl leading-tight md:text-[2.7rem]">{product.name}</h1>
              <p className="mt-3 text-2xl"><Price value={product.price} /></p>
              <p className="mt-5 max-w-md leading-relaxed text-pierre">{product.description}</p>

              <div className="mt-8 space-y-7">
                <VariantPicker product={product} activeId={variant.id} onChange={setVariant} />
                <SizePicker sizes={product.sizes} value={size} onChange={(s) => { setSize(s); setSizeError(false); }} error={sizeError} />
                <div>
                  <p className="mb-3 text-[0.95rem]">Quantité</p>
                  <QuantityStepper value={qty} onChange={setQty} />
                </div>
              </div>

              <div ref={ctaRef} className="mt-9 space-y-3">
                <button type="button" onClick={addToCart} className="btn btn-primary w-full">
                  {justAdded ? (<><Icon name="check" className="h-5 w-5" /> Ajouté au panier</>) : 'Ajouter au panier'}
                </button>
                <button type="button" onClick={orderNow} className="btn btn-wa w-full"><WhatsAppIcon /> Commander sur WhatsApp</button>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => wish.toggle(product.slug)} aria-pressed={liked} className="btn btn-outline min-h-[2.9rem] flex-1 px-4 text-[0.92rem]">
                    <Icon name="heart" filled={liked} className="h-5 w-5" /> {liked ? 'Enregistré' : 'Favoris'}
                  </button>
                  <button type="button" onClick={share} className="btn btn-outline min-h-[2.9rem] flex-1 px-4 text-[0.92rem]"><Icon name="share" className="h-5 w-5" /> Partager</button>
                </div>
              </div>

              <div className="mt-10 border-t border-sable/70">
                <Accordion title="Détails du modèle" defaultOpen>
                  <ul className="space-y-1.5">
                    <li>Type : {product.type}</li>
                    {product.material && <li>Matière : {product.material}</li>}
                    <li>{product.variants.length} {product.variants.length > 1 ? 'coloris disponibles' : 'coloris'}</li>
                    {product.sizes.length > 0 && <li>Tailles : {product.sizes.join(', ')}</li>}
                  </ul>
                </Accordion>
                <Accordion title="Commande et livraison"><p>{SITE.info.delivery}</p></Accordion>
                <Accordion title="Échanges"><p>{SITE.info.returns}</p></Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductRail id="similaires" title="Vous aimerez aussi" products={related} />
      {recent.length > 0 && <ProductRail id="recents" title="Vus récemment" products={recent} />}

      {!ctaInView && (
        <div className="fixed inset-x-0 z-[58] flex animate-fadeIn items-center gap-3 border-t border-sable/70 bg-ivoire px-4 py-3 lg:hidden" style={{ bottom: 'calc(3.7rem + env(safe-area-inset-bottom))' }}>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.95rem]">{product.name}</p>
            <p className="text-[0.85rem] text-pierre">{variant.label} · <Price value={product.price} /></p>
          </div>
          <button type="button" onClick={addToCart} className="btn btn-primary min-h-[2.9rem] shrink-0 px-6">{justAdded ? 'Ajouté' : 'Ajouter'}</button>
        </div>
      )}
    </>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen} className="group border-b border-sable/70">
      <summary className="flex min-h-[3.4rem] cursor-pointer list-none items-center justify-between font-display text-[1.15rem] [&::-webkit-details-marker]:hidden">
        {title}
        <Icon name="plus" className="h-5 w-5 transition-transform group-open:rotate-45" />
      </summary>
      <div className="pb-5 leading-relaxed text-pierre">{children}</div>
    </details>
  );
}
