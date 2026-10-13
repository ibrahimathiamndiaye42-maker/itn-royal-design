import { WhatsAppIcon } from '@/components/ui/Icon';
import { whatsappLink } from '@/config/site';

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink('Bonjour, j’ai une question sur vos produits.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Écrire sur WhatsApp"
      className="fixed bottom-6 right-6 z-[55] hidden h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-lg transition-transform hover:scale-105 lg:grid"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
