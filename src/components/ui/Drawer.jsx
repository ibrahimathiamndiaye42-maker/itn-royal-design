import { createPortal } from 'react-dom';
import { useDialog, useScrollLock } from '@/hooks';
import { Icon } from './Icon';

/**
 * Panneau modal accessible. side : "right" | "left" | "bottom".
 */
export function Drawer({ open, onClose, title, side = 'right', children, footer, width = 'max-w-[26rem]' }) {
  const ref = useDialog(open, onClose);
  useScrollLock(open);
  if (!open) return null;

  const pos = {
    right: `right-0 top-0 h-full w-full ${width} animate-slideLeft`,
    left: `left-0 top-0 h-full w-full ${width} animate-slideRight`,
    bottom: 'bottom-0 left-0 right-0 max-h-[88dvh] animate-sheetUp',
  }[side];

  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 animate-fadeIn bg-noir/45" onClick={onClose} aria-hidden="true" />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className={`absolute flex flex-col bg-ivoire shadow-2xl ${pos}`}>
        <div className="flex items-center justify-between border-b border-sable/70 px-5 py-4">
          <h2 className="text-xl">{title}</h2>
          <button type="button" onClick={onClose} className="-mr-2 grid h-10 w-10 place-items-center" aria-label="Fermer">
            <Icon name="close" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className="safe-b border-t border-sable/70 bg-ivoire px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
