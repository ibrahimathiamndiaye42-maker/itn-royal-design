import { Link } from 'react-router-dom';
import { useUI } from '@/context/UIContext';

export function Toast() {
  const { toast, dismissToast, cartOpen, menuOpen } = useUI();
  if (!toast || cartOpen || menuOpen) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-4 md:bottom-8" role="status" aria-live="polite">
      <div key={toast.id} className="pointer-events-auto flex animate-toastIn items-center gap-5 bg-noir px-5 py-3.5 text-[0.95rem] text-ivoire shadow-xl">
        <span>{toast.message}</span>
        {toast.action && (
          toast.action.to ? (
            <Link to={toast.action.to} onClick={dismissToast} className="underline underline-offset-4">{toast.action.label}</Link>
          ) : (
            <button type="button" onClick={() => { toast.action.onClick(); dismissToast(); }} className="underline underline-offset-4">{toast.action.label}</button>
          )
        )}
      </div>
    </div>
  );
}
