import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '@/utils/storage';

const KEY = 'itn-royal:wishlist:v1';
const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [slugs, setSlugs] = useState(() => storage.get(KEY, []));
  useEffect(() => storage.set(KEY, slugs), [slugs]);

  const value = useMemo(
    () => ({
      slugs,
      has: (slug) => slugs.includes(slug),
      toggle: (slug) => setSlugs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [slug, ...s])),
    }),
    [slugs],
  );
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
