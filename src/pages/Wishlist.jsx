import { Link } from 'react-router-dom';
import { ProductGrid } from '@/components/product/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { getProduct } from '@/services/catalog';
import { useDocumentMeta } from '@/hooks';
import { SITE } from '@/config/site';

export default function Wishlist() {
  useDocumentMeta({ title: `Favoris | ${SITE.name}` });
  const { slugs } = useWishlist();
  const products = slugs.map(getProduct).filter(Boolean);
  return (
    <div className="container-page pt-8 md:pt-12">
      <h1 className="text-4xl md:text-5xl">Mes favoris</h1>
      {products.length === 0 ? (
        <div className="py-12">
          <p className="max-w-md text-pierre">Touchez le cœur d’un modèle pour le retrouver ici. Vos favoris restent enregistrés sur cet appareil.</p>
          <Link to="/boutique" className="btn btn-primary mt-7">Voir la boutique</Link>
        </div>
      ) : (
        <div className="mt-8"><ProductGrid products={products} /></div>
      )}
    </div>
  );
}
