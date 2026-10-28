import { useEffect, useState } from "react";
import { Download, Eye, X } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Title } from "@/components/Maquette";

type Item = { tag: string; title: string; text: string; image: string; pdf: string };

/**
 * Exemples de livrables : cartes photo + 2 phrases, bouton « Voir » qui ouvre
 * le PDF dans une fenêtre (sur ordinateur) et bouton « Télécharger ».
 * Sur petit écran, « Voir » ouvre le PDF dans un nouvel onglet (lecteur du
 * téléphone), plus fiable qu'un PDF intégré.
 */
export function Realisations({
  title,
  accent,
  intro,
  view,
  download,
  close,
  items,
}: {
  title: string;
  accent: string;
  intro: string;
  view: string;
  download: string;
  close: string;
  items: Item[];
}) {
  const [open, setOpen] = useState<Item | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const show = (item: Item) => (e: React.MouseEvent) => {
    if (window.innerWidth < 760) return; // laisse le lien ouvrir un nouvel onglet
    e.preventDefault();
    setOpen(item);
  };

  const btn = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors";

  return (
    <section className="bg-[#0f2a5c] py-14 lg:py-16">
      <Container>
        <Title title={title} accent={accent} light />
        <p className="mt-2 text-lg text-white/85">{intro}</p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.pdf} delay={i * 0.06}>
              <article className="flex h-full flex-col bg-white">
                <a href={item.pdf} target="_blank" rel="noopener" onClick={show(item)} className="relative block aspect-[10/7] overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                  <span className="absolute left-3 top-3 bg-yellow-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-900">
                    {item.tag}
                  </span>
                </a>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold leading-snug text-blue-700">{item.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{item.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <a href={item.pdf} target="_blank" rel="noopener" onClick={show(item)} className={`${btn} bg-yellow-500 text-blue-900 hover:bg-yellow-400`}>
                      <Eye className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                      {view}
                    </a>
                    <a href={item.pdf} download className={`${btn} border-2 border-blue-700 text-blue-700 hover:bg-blue-50`}>
                      <Download className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                      {download}
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#040a28]/75 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        >
          <div className="flex h-[92vh] w-full max-w-[1100px] flex-col bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-blue-100 px-4 py-2.5">
              <strong className="flex-1 truncate font-display text-[15px] text-blue-700">{open.title}</strong>
              <a href={open.pdf} download className={`${btn} bg-yellow-500 text-blue-900 hover:bg-yellow-400`}>
                <Download className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                {download}
              </a>
              <button type="button" onClick={() => setOpen(null)} aria-label={close} className="flex h-10 w-10 items-center justify-center bg-blue-50 text-ink">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <iframe src={open.pdf} title={open.title} className="w-full flex-1 border-0 bg-[#525659]" />
          </div>
        </div>
      )}
    </section>
  );
}
