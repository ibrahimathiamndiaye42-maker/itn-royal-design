import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';

const Shop = lazy(() => import('@/pages/Shop'));
const Product = lazy(() => import('@/pages/Product'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const Info = lazy(() => import('@/pages/Info'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="boutique" element={<Shop />} />
          <Route path="boutique/:category" element={<Shop />} />
          <Route path="produit/:slug" element={<Product />} />
          <Route path="panier" element={<Cart />} />
          <Route path="commande" element={<Checkout />} />
          <Route path="favoris" element={<Wishlist />} />
          <Route path="infos" element={<Info />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
