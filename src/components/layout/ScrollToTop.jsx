import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/** Remonte en haut à chaque nouvelle page (sauf retour arrière) et change le titre lu par les lecteurs d'écran. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const type = useNavigationType();
  useEffect(() => {
    if (type !== 'POP') window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, type]);
  return null;
}
