import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks';
import { SITE } from '@/config/site';

export default function NotFound() {
  useDocumentMeta({ title: `Page introuvable | ${SITE.name}` });
  return (
    <div className="container-page py-24">
      <h1 className="text-4xl md:text-5xl">Cette page n’existe pas</h1>
      <p className="mt-4 max-w-md text-pierre">Le lien est peut-être ancien ou mal écrit. Retrouvez nos modèles dans la boutique.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/boutique" className="btn btn-primary">Voir la boutique</Link>
        <Link to="/" className="btn btn-outline">Retour à l’accueil</Link>
      </div>
    </div>
  );
}
