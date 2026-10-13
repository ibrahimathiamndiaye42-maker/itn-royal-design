import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { imgSrc } from '@/utils/images';
import { Price } from '@/components/ui/Price';
import { WhatsAppIcon } from '@/components/ui/Icon';
import { cartTotal, submitOrder } from '@/services/orders';
import { enabledPaymentMethods } from '@/config/payments';
import { storage } from '@/utils/storage';
import { useDocumentMeta } from '@/hooks';
import { SITE } from '@/config/site';

const KEY = 'itn-royal:customer:v1';

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 3) e.name = 'Indiquez votre nom complet.';
  if (v.phone.replace(/\D/g, '').length < 9) e.phone = 'Indiquez un numéro valide (9 chiffres minimum).';
  if (v.city.trim().length < 2) e.city = 'Indiquez votre ville ou votre quartier.';
  return e;
};

export default function Checkout() {
  useDocumentMeta({ title: `Commande | ${SITE.name}` });
  const { lines, clear } = useCart();
  const methods = enabledPaymentMethods();
  const [values, setValues] = useState(() => ({ name: '', phone: '', city: '', address: '', note: '', method: methods[0]?.id, ...storage.get(KEY, {}) }));
  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState('');
  const { amount, hasUnpriced } = cartTotal(lines);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setBusy(true);
    setFailure('');
    try {
      storage.set(KEY, { name: values.name, phone: values.phone, city: values.city, address: values.address });
      const res = await submitOrder(values.method, { lines, customer: values });
      if (res.type === 'redirect') {
        setSentUrl(res.url);
        window.open(res.url, '_blank', 'noopener');
      }
    } catch (err) {
      setFailure(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!lines.length && !sentUrl)
    return (
      <div className="container-page py-24">
        <h1 className="text-4xl">Rien à commander pour l’instant</h1>
        <p className="mt-4 text-pierre">Ajoutez d’abord des modèles à votre panier.</p>
        <Link to="/boutique" className="btn btn-primary mt-8">Voir la boutique</Link>
      </div>
    );

  if (sentUrl)
    return (
      <div className="container-page max-w-2xl py-20">
        <h1 className="text-4xl md:text-5xl">Votre commande est prête dans WhatsApp</h1>
        <p className="mt-5 leading-relaxed text-pierre">Un dernier geste : appuyez sur « Envoyer » dans WhatsApp pour nous transmettre votre commande. Nous vous répondons ensuite pour confirmer la disponibilité, le prix final et la livraison.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={sentUrl} target="_blank" rel="noreferrer" className="btn btn-wa"><WhatsAppIcon /> Rouvrir WhatsApp</a>
          <button type="button" onClick={() => { clear(); setSentUrl(''); }} className="btn btn-outline">J’ai envoyé ma commande</button>
        </div>
        <p className="mt-6 text-[0.9rem] text-pierre">Votre panier est conservé tant que vous ne confirmez pas l’envoi.</p>
      </div>
    );

  return (
    <div className="container-page pt-8 md:pt-12">
      <h1 className="text-4xl md:text-5xl">Finaliser la commande</h1>
      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <form onSubmit={submit} noValidate className="space-y-6 lg:col-span-7">
          <Field id="name" label="Nom complet" error={errors.name}><input id="name" autoComplete="name" value={values.name} onChange={set('name')} className="field" aria-invalid={!!errors.name} /></Field>
          <Field id="phone" label="Téléphone (WhatsApp de préférence)" error={errors.phone}><input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} className="field" aria-invalid={!!errors.phone} /></Field>
          <Field id="city" label="Ville ou quartier" error={errors.city}><input id="city" autoComplete="address-level2" value={values.city} onChange={set('city')} className="field" aria-invalid={!!errors.city} /></Field>
          <Field id="address" label="Adresse ou repère (facultatif)"><input id="address" autoComplete="street-address" value={values.address} onChange={set('address')} className="field" /></Field>
          <Field id="note" label="Précisions sur la commande (facultatif)"><textarea id="note" rows={3} value={values.note} onChange={set('note')} className="field" placeholder="Taille, couleur de remplacement, horaire de livraison…" /></Field>

          <fieldset>
            <legend className="mb-3 font-display text-xl">Paiement</legend>
            {methods.map((m) => (
              <label key={m.id} className="flex items-start gap-3 border border-encre p-4">
                <input type="radio" name="method" value={m.id} checked={values.method === m.id} onChange={set('method')} className="mt-1 accent-noir" />
                <span><span className="block">{m.label}</span>{m.hint && <span className="text-[0.9rem] text-pierre">{m.hint}</span>}</span>
              </label>
            ))}
          </fieldset>

          {failure && <p role="alert" className="text-brique">{failure}</p>}
          <button type="submit" disabled={busy} className="btn btn-wa w-full md:w-auto md:min-w-[18rem]"><WhatsAppIcon /> Envoyer ma commande sur WhatsApp</button>
        </form>

        <aside className="lg:col-span-5">
          <div className="bg-lin p-6 md:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl">Votre sélection</h2>
            <ul className="mt-5 divide-y divide-sable">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 py-4">
                  <img src={imgSrc(l.slug, l.image, '400')} alt="" className="h-24 w-[4.8rem] shrink-0 bg-ivoire object-cover" />
                  <div className="min-w-0 flex-1 text-[0.95rem]">
                    <p className="leading-snug">{l.name}</p>
                    <p className="text-pierre">{l.variantLabel}{l.size ? ` · ${l.size}` : ''} · ×{l.qty}</p>
                    <Price value={l.price == null ? null : l.price * l.qty} className="mt-1 block" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-baseline justify-between border-t border-sable pt-4"><span>Total estimé</span><Price value={amount} className="text-2xl" /></div>
            {hasUnpriced && <p className="mt-2 text-[0.88rem] text-pierre">Articles sur demande : prix confirmé sur WhatsApp.</p>}
            <p className="mt-3 text-[0.88rem] text-pierre">{SITE.info.delivery}</p>
            <Link to="/panier" className="link-u mt-4 inline-block text-[0.92rem]">Modifier le panier</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.95rem]">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-[0.9rem] text-brique" role="alert">{error}</p>}
    </div>
  );
}
