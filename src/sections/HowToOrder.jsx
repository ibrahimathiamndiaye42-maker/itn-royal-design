import { SITE } from '@/config/site';

export function HowToOrder() {
  return (
    <section aria-labelledby="how-title" className="container-page mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
      <div className="md:col-span-5">
        <h2 id="how-title" className="text-3xl md:text-4xl">Commander prend quatre étapes</h2>
        <p className="mt-4 max-w-sm text-pierre">Pas de compte à créer : votre commande part directement sur WhatsApp, et nous la confirmons avec vous.</p>
      </div>
      <ol className="md:col-span-7">
        {SITE.info.ordering.map((step, i) => (
          <li key={step} className="flex gap-6 border-t border-sable py-6 last:border-b">
            <span className="w-8 shrink-0 font-display text-3xl leading-none text-or">{i + 1}</span>
            <p className="pt-1 text-[1.05rem] leading-relaxed">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
