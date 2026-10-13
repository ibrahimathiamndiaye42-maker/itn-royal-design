import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { UIProvider } from './UIContext';

export function AppProviders({ children }) {
  return (
    <UIProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </UIProvider>
  );
}
