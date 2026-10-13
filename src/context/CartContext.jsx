import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { storage } from '@/utils/storage';

const KEY = 'itn-royal:cart:v1';
const CartContext = createContext(null);

export const lineKey = (slug, variantId, size) => `${slug}|${variantId}|${size || ''}`;

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { line } = action;
      const exists = state.find((l) => l.key === line.key);
      if (exists) return state.map((l) => (l.key === line.key ? { ...l, qty: Math.min(l.qty + line.qty, 20) } : l));
      return [...state, line];
    }
    case 'qty':
      return state.map((l) => (l.key === action.key ? { ...l, qty: Math.max(1, Math.min(20, action.qty)) } : l));
    case 'remove':
      return state.filter((l) => l.key !== action.key);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, null, () => storage.get(KEY, []));

  useEffect(() => storage.set(KEY, lines), [lines]);

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      add: (line) => dispatch({ type: 'add', line }),
      setQty: (key, qty) => dispatch({ type: 'qty', key, qty }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [lines],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
