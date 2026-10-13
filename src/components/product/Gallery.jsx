import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Img } from '@/components/ui/Img';
import { Icon } from '@/components/ui/Icon';
import { imgFull, imgMeta, imgSrc } from '@/utils/images';
import { useDialog, useScrollLock } from '@/hooks';

export function Gallery({ slug, name, variantLabel, images }) {
  const [index, setIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const touch = useRef(null);

  useEffect(() => setIndex(0), [images.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (d) => setIndex((i) => (i + d + images.length) % images.length);
  const current = images[index] ?? images[0];
  const ratio = Math.min(Math.max(imgMeta(slug, images[0])[1], 0.7), 1.1);

  const onTouchStart = (e) => (touch.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > 45 && images.length > 1) go(dx < 0 ? 1 : -1);
  };

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse">
      <div className="relative flex-1 bg-lin" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button type="button" onClick={() => setZoomOpen(true)} className="block w-full cursor-zoom-in" style={{ aspectRatio: ratio }} aria-label="Agrandir la photo">
          <Img slug={slug} id={current} alt={`${name}, ${variantLabel}, photo ${index + 1}`} priority sizes="(min-width:1024px) 55vw, 100vw" />
        </button>
        {images.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivoire/90 md:grid">
              <Icon name="left" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivoire/90 md:grid">
              <Icon name="right" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden" aria-hidden="true">
              {images.map((id, i) => (
                <span key={id} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-noir' : 'w-1.5 bg-noir/35'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar hidden gap-2.5 overflow-x-auto lg:flex lg:w-[5.5rem] lg:flex-col" role="tablist" aria-label="Photos du produit">
          {images.map((id, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-lin transition-opacity lg:w-full ${i === index ? 'ring-1 ring-encre ring-offset-2 ring-offset-ivoire' : 'opacity-70 hover:opacity-100'}`}
            >
              <img src={imgSrc(slug, id, '400')} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {zoomOpen && <Lightbox slug={slug} name={name} images={images} start={index} onClose={() => setZoomOpen(false)} onChange={setIndex} />}
    </div>
  );
}

function Lightbox({ slug, name, images, start, onClose, onChange }) {
  const [i, setI] = useState(start);
  const [zoom, setZoom] = useState(false);
  const ref = useDialog(true, onClose);
  useScrollLock(true);
  const go = (d) => {
    const n = (i + d + images.length) % images.length;
    setI(n);
    setZoom(false);
    onChange(n);
  };
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return createPortal(
    <div ref={ref} role="dialog" aria-modal="true" aria-label={`Photos : ${name}`} className="fixed inset-0 z-[95] flex animate-fadeIn flex-col bg-noir">
      <div className="flex items-center justify-between px-4 py-3 text-ivoire">
        <span className="text-sm tabular-nums">{i + 1} / {images.length}</span>
        <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center" aria-label="Fermer">
          <Icon name="close" />
        </button>
      </div>
      <div className={`relative min-h-0 flex-1 ${zoom ? 'overflow-auto' : 'overflow-hidden'}`}>
        <button type="button" onClick={() => setZoom((z) => !z)} className={`block ${zoom ? 'w-[190%] max-w-none cursor-zoom-out md:w-[150%]' : 'mx-auto h-full cursor-zoom-in'}`} aria-label={zoom ? 'Réduire' : 'Zoomer'}>
          <img src={imgFull(slug, images[i])} alt={`${name}, photo ${i + 1}`} className={zoom ? 'w-full' : 'mx-auto h-full max-w-full object-contain'} />
        </button>
        {images.length > 1 && !zoom && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivoire/90">
              <Icon name="left" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivoire/90">
              <Icon name="right" />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
