import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileTabBar } from '@/components/layout/MobileTabBar';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { Toast } from '@/components/ui/Toast';
import { SITE } from '@/config/site';

export default function MainLayout() {
  return (
    <>
      <a href="#contenu" className="sr-only z-[100] bg-noir px-4 py-3 text-ivoire focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Aller au contenu</a>
      <ScrollToTop />
      {import.meta.env.DEV && !SITE.pricesConfirmed && (
        <div className="bg-or px-4 py-1.5 text-center text-[0.8rem] text-white">
          Mode développement : les prix de src/data/prices.js sont provisoires. Passez pricesConfirmed à true dans src/config/site.js une fois vérifiés.
        </div>
      )}
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar />
      <WhatsAppFloat />
      <CartDrawer />
      <SearchOverlay />
      <Toast />
    </>
  );
}
