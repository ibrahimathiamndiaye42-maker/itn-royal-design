import { SITE, whatsappLink } from '@/config/site';
import { WhatsAppIcon } from '@/components/ui/Icon';
import { useDocumentMeta } from '@/hooks';

export default function Info() {
  useDocumentMeta({ title: `Infos et livraison | ${SITE.name}` });
  return (
    <div className="container-page max-w-3xl pt-8 md:pt-12">
      <h1 className="text-4xl md:text-5xl">Infos et livraison</h1>

      <section className="mt-10" aria-labelledby="i-cmd">
        <h2 id="i-cmd" className="text-2xl">Comment commander</h2>
        <ol className="mt-4 list-decimal space-y-2.5 pl-6 leading-relaxed marker:text-or">
          {SITE.info.ordering.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </section>

      <section className="mt-12" aria-labelledby="i-liv">
        <h2 id="i-liv" className="text-2xl">Livraison et paiement</h2>
        <p className="mt-4 leading-relaxed text-pierre">{SITE.info.delivery}</p>
      </section>

      <section className="mt-12" aria-labelledby="i-ech">
        <h2 id="i-ech" className="text-2xl">Échanges</h2>
        <p className="mt-4 leading-relaxed text-pierre">{SITE.info.returns}</p>
      </section>

      <section className="mt-12" aria-labelledby="i-fav">
        <h2 id="i-fav" className="text-2xl">Panier et favoris</h2>
        <p className="mt-4 leading-relaxed text-pierre">Votre panier et vos favoris sont enregistrés sur votre appareil. Aucun compte n’est nécessaire.</p>
      </section>

      <a href={whatsappLink('Bonjour, j’ai une question.')} target="_blank" rel="noreferrer" className="btn btn-wa mt-12"><WhatsAppIcon /> Poser une question sur WhatsApp</a>
    </div>
  );
}
