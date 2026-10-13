import { WhatsAppIcon } from '@/components/ui/Icon';
import { whatsappLink } from '@/config/site';

export function WhatsAppBand() {
  return (
    <section className="mt-20 bg-noir text-ivoire md:mt-28" aria-labelledby="wa-title">
      <div className="container-page flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center md:py-16">
        <div className="max-w-xl">
          <h2 id="wa-title" className="text-3xl md:text-4xl">Une question sur une couleur, une taille, un modèle ?</h2>
          <p className="mt-3 text-ivoire/70">Écrivez-nous : nous vous répondons directement sur WhatsApp.</p>
        </div>
        <a href={whatsappLink('Bonjour, j’ai une question sur vos produits.')} target="_blank" rel="noreferrer" className="btn btn-wa shrink-0">
          <WhatsAppIcon /> Écrire sur WhatsApp
        </a>
      </div>
    </section>
  );
}
