import { ArrowRight, BellRing, CalendarHeart, MessageCircle, Ticket, type LucideIcon } from "lucide-react";
import { communityBenefits, communityPromise } from "@/lib/community";

const icons: Record<(typeof communityBenefits)[number]["id"], LucideIcon> = {
  first: BellRing,
  priority: Ticket,
  meetups: CalendarHeart,
  chat: MessageCircle,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-clay uppercase">
      <span className="inline-block h-px w-10 bg-clay/40" />
      {children}
    </div>
  );
}

/** Full community section for the homepage; `cta` is the join link. */
export function CommunitySection({ cta }: { cta: React.ReactNode }) {
  return (
    <section id="community" className="scroll-mt-8 bg-sand/60">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>The Huella community</Eyebrow>
          <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-medium text-balance">
            Travel with us once, belong <span className="text-clay italic">forever</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-pretty text-ink/70">
            The community is the heart of Huella. Join any one of our trips and you become part of it —
            long after you're home.
          </p>
          <p className="mt-8 font-display text-[22px] leading-snug text-clay italic">{communityPromise}</p>
          <div className="mt-8">{cta}</div>
        </div>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:self-center">
          {communityBenefits.map((benefit) => {
            const BenefitIcon = icons[benefit.id];
            return (
              <li key={benefit.id} className="border-t border-clay/40 pt-6">
                <BenefitIcon aria-hidden="true" className="size-7 text-clay" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-[24px] leading-tight font-medium">{benefit.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-pretty text-ink/70">{benefit.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Short community band for the trip pages, linking to the homepage section. */
export function CommunityTeaser({ tripNoun }: { tripNoun: string }) {
  return (
    <section className="bg-sand/60">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center px-6 py-24 text-center">
        <div className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-clay uppercase">
          <span className="inline-block h-px w-10 bg-clay/40" />
          The Huella community
          <span className="inline-block h-px w-10 bg-clay/40" />
        </div>
        <h2 className="mt-7 max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-medium text-balance">
          Join this {tripNoun}, belong <span className="text-clay italic">forever</span>
        </h2>
        <p className="mt-6 font-display text-[clamp(1.1rem,2vw,1.35rem)] text-ink/70 italic">{communityPromise}</p>
        <a
          href="/#community"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-clay/50 px-6 py-3 text-[12px] tracking-[0.16em] text-clay uppercase transition-colors hover:bg-clay hover:text-cream"
        >
          About the community
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </section>
  );
}
