import { Hero } from '@/sections/Hero';
import { ColorExplorer } from '@/sections/ColorExplorer';
import { CategoryMosaic } from '@/sections/CategoryMosaic';
import { ProductRail } from '@/sections/ProductRail';
import { HowToOrder } from '@/sections/HowToOrder';
import { WhatsAppBand } from '@/sections/WhatsAppBand';
import { getProduct } from '@/services/catalog';
import { useDocumentMeta, useRecentlyViewed } from '@/hooks';
import { SITE } from '@/config/site';

const FEATURED = ['abaya-vip-unisexe', 'robe-foulard-2m', 'robe-ete-imprimee', 'ensemble-gilet-pantalon', 'drap-coton-3-pieces', 'tapis-priere-matelasse', 'ensemble-chemise-elhadji', 'robe-trois-quarts-brodee-2'];

export default function Home() {
  useDocumentMeta({ title: `${SITE.name} | ${SITE.tagline}`, description: SITE.description });
  const { slugs } = useRecentlyViewed();
  const featured = FEATURED.map(getProduct).filter(Boolean);
  const recent = slugs.map(getProduct).filter(Boolean);

  return (
    <>
      <Hero />
      <ColorExplorer />
      <CategoryMosaic />
      <ProductRail id="selection" title="Notre sélection" products={featured} linkTo="/boutique" linkLabel="Voir toute la boutique" />
      <HowToOrder />
      {recent.length > 0 && <ProductRail id="recents" title="Vus récemment" products={recent} />}
      <WhatsAppBand />
    </>
  );
}
