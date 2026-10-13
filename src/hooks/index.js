import { useEffect, useRef, useState } from 'react';
import { storage } from '@/utils/storage';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Bloque le défilement de la page pendant qu'un panneau est ouvert. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Piège le focus dans un panneau, ferme avec Échap, rend le focus à l'élément d'origine. */
export function useDialog(open, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const node = ref.current;
    const first = node?.querySelector('[data-autofocus]') || node?.querySelector(FOCUSABLE);
    first?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
      if (e.key !== 'Tab' || !node) return;
      const items = [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const a = items[0];
      const z = items[items.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);
  return ref;
}

export function useScrollDirection(threshold = 8) {
  const [state, setState] = useState({ down: false, top: true });
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) > threshold) {
          setState({ down: y > last && y > 160, top: y < 8 });
          last = y;
        } else if (y < 8) setState((s) => ({ ...s, top: true }));
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return state;
}

/** Titre + description + image de partage de la page. */
export function useDocumentMeta({ title, description, image } = {}) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;
    const set = (selector, attr, value) => {
      const el = document.head.querySelector(selector);
      if (el && value) el.setAttribute(attr, value);
    };
    if (description) {
      set('meta[name="description"]', 'content', description);
      set('meta[property="og:description"]', 'content', description);
    }
    if (title) set('meta[property="og:title"]', 'content', title);
    if (image) set('meta[property="og:image"]', 'content', image);
    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image]);
}

const RECENT_KEY = 'itn-royal:recent:v1';
export function useRecentlyViewed() {
  const [slugs, setSlugs] = useState(() => storage.get(RECENT_KEY, []));
  const push = (slug) =>
    setSlugs((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, 8);
      storage.set(RECENT_KEY, next);
      return next;
    });
  return { slugs, push };
}

export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, inView];
}
