import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const timer = useRef();

  const notify = useCallback((message, action) => {
    clearTimeout(timer.current);
    setToast({ message, action, id: Date.now() });
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const value = useMemo(
    () => ({ cartOpen, setCartOpen, searchOpen, setSearchOpen, menuOpen, setMenuOpen, toast, notify, dismissToast: () => setToast(null) }),
    [cartOpen, searchOpen, menuOpen, toast, notify],
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);
