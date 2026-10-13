import { Link } from 'react-router-dom';
import { SITE, whatsappLink } from '@/config/site';
import { Icon, WhatsAppIcon } from '@/components/ui/Icon';
import { Logo } from './Logo';

export function Footer() {
  const { contact, social } = SITE;
  const socials = [
    ['instagram', 'Instagram', social.instagram],
    ['facebook', 'Facebook', social.facebook],
    ['tiktok', 'TikTok', social.tiktok],
  ].filter(([, , url]) => url);

  return (
    <footer className="mt-24 bg-noir pb-28 text-ivoire/85 lg:pb-0">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-5 max-w-sm leading-relaxed text-ivoire/70">{SITE.tagline}. Choisissez votre couleur, nous confirmons votre commande sur WhatsApp.</p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map(([icon, label, url]) => (
                <a key={icon} href={url} target="_blank" rel="noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center border border-ivoire/25 hover:bg-ivoire hover:text-noir">
                  <Icon name={icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-3">
          <h2 className="mb-4 font-display text-lg text-ivoire">Boutique</h2>
          <ul className="space-y-2.5">
            {SITE.nav.map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-ivoire hover:underline hover:underline-offset-4">{n.label}</Link></li>
            ))}
            <li><Link to="/infos" className="hover:text-ivoire hover:underline hover:underline-offset-4">Infos et livraison</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="mb-4 font-display text-lg text-ivoire">Contact</h2>
          <ul className="space-y-2.5">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ivoire">
                <WhatsAppIcon className="h-5 w-5 text-wa" /> WhatsApp {contact.phoneDisplay}
              </a>
            </li>
            {contact.email && <li><a href={`mailto:${contact.email}`} className="hover:text-ivoire">{contact.email}</a></li>}
            {contact.address && <li>{contact.address}</li>}
            {contact.hours && <li>{contact.hours}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-ivoire/15">
        <div className="container-page flex flex-col gap-1 py-5 text-sm text-ivoire/55 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>Prix en {SITE.currency}</span>
        </div>
      </div>
    </footer>
  );
}
