import { Fragment, useEffect, useRef, useState } from "react";

// Building blocks shared by the trip pages (Bali retreat, ski trip): section labels,
// the sticky section nav and the tickable packing note.

export function Eyebrow({ children, tone = "text-clay", rule = "bg-clay/40" }: { children: React.ReactNode; tone?: string; rule?: string }) {
  return (
    <div className={`flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase ${tone}`}>
      <span className={`inline-block h-px w-10 ${rule}`} />
      {children}
    </div>
  );
}

// Highlights the nav link of the section currently in view.
function useActiveSection(ids: string[], prefix: string) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id.replace(`${prefix}-`, ""));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const element = document.getElementById(`${prefix}-${id}`);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids, prefix]);
  return active;
}

/** Sticky nav linking to sections whose ids are `${prefix}-${item.id}`. */
export function SectionNav({ items, prefix, label }: { items: { id: string; label: string }[]; prefix: string; label: string }) {
  const [ids] = useState(() => items.map((item) => item.id));
  const active = useActiveSection(ids, prefix);
  const navRef = useRef<HTMLDivElement>(null);
  // Keep the highlighted link visible when the nav scrolls sideways on phones.
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`a[href="#${prefix}-${active}"]`);
    if (nav && link) nav.scrollTo({ left: link.offsetLeft - 24, behavior: "smooth" });
  }, [active, prefix]);

  return (
    <nav aria-label={label} className="sticky top-0 z-20 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div ref={navRef} className="relative mx-auto max-w-[1360px] overflow-x-auto px-6">
        <ul className="flex w-max min-w-full gap-7">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${prefix}-${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`block border-b-2 py-4 text-[12px] tracking-[0.16em] whitespace-nowrap uppercase transition-colors ${
                  active === item.id ? "border-clay text-clay" : "border-transparent text-ink/55 hover:text-clay"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export type PackingItem = { title: string; link?: { word: string; href: string } };

// Packing titles render as text, with an optional word linked (e.g. VISA to the visa site).
export function PackingTitle({ item }: { item: PackingItem }) {
  const { link } = item;
  if (!link) return <>{item.title}</>;
  return (
    <>
      {item.title.split(link.word).map((part, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-clay underline decoration-clay/40 underline-offset-4 transition-colors hover:decoration-clay"
            >
              {link.word}
            </a>
          )}
          {part}
        </Fragment>
      ))}
    </>
  );
}

/** A packing note visitors can tick off; ticks are not saved. */
export function PackingNote({ label, items }: { label: string; items: PackingItem[] }) {
  return (
    <div className="mt-10 -rotate-[0.5deg] rounded-md bg-cream px-6 py-5 ring-1 ring-ink/10 motion-reduce:rotate-0 sm:px-8 sm:py-6">
      <p className="mb-2 text-[11px] tracking-[0.25em] text-ink/50 uppercase">{label}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="border-b border-dashed border-ink/20 py-3 last:border-b-0 sm:border-b-0 sm:border-l sm:px-6 sm:py-2 sm:first:border-l-0 sm:first:pl-0">
            <label className="flex cursor-pointer items-start gap-4">
              <input type="checkbox" className="mt-1.5 size-4 shrink-0 accent-clay" />
              <span className="font-display text-[20px] leading-snug">
                <PackingTitle item={item} />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
