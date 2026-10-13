import { Link } from 'react-router-dom';
import { colorFamilies } from '@/data/colors';
import { countByColor } from '@/services/catalog';
import { FamilyDot } from '@/components/ui/Swatch';

export function ColorExplorer() {
  const counts = countByColor();
  return (
    <section id="couleurs" aria-labelledby="couleurs-title" className="mt-20 scroll-mt-24 bg-lin py-16 md:mt-28 md:py-20">
      <div className="container-page">
        <div className="max-w-xl">
          <h2 id="couleurs-title" className="text-3xl md:text-4xl">Commencez par la couleur</h2>
          <p className="mt-3 text-pierre">Chaque pastille ouvre les modèles disponibles dans cette couleur, toutes catégories confondues.</p>
        </div>
        <ul className="mt-10 grid grid-cols-4 gap-x-2 gap-y-8 sm:grid-cols-7">
          {colorFamilies.filter((c) => counts[c.id]).map((c) => (
            <li key={c.id}>
              <Link to={`/boutique?couleur=${c.id}`} className="group flex flex-col items-center gap-2.5 text-center">
                <span className="rounded-full p-1 ring-1 ring-transparent transition group-hover:ring-encre/40"><FamilyDot family={c} size="h-14 w-14 sm:h-16 sm:w-16" /></span>
                <span className="text-[0.9rem] leading-tight">{c.label}</span>
                <span className="-mt-1.5 text-[0.8rem] text-pierre">{counts[c.id]} {counts[c.id] > 1 ? 'modèles' : 'modèle'}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
