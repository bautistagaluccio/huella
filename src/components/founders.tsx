import { founders, foundersIntro } from "@/lib/founders";

/** "The person behind your trip": the homepage section that leads into the contact section. */
export function FoundersSection() {
  return (
    <section id="founders" className="mx-auto max-w-[1360px] scroll-mt-8 px-6 pt-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:self-center">
          <div className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-clay uppercase">
            <span className="inline-block h-px w-10 bg-clay/40" />
            Who we are
          </div>
          <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-medium text-balance">
            The person behind your <span className="text-clay italic">trip</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-pretty text-ink/70">
            {foundersIntro}
          </p>
          <p className="mt-8 font-display text-[20px] leading-snug text-clay italic">
            Write to us below, and we’ll reply personally.
          </p>
        </div>
        <ul className="lg:col-span-7 lg:self-center">
          {founders.map((founder) => (
            <li key={founder.id} className="border-t border-clay/40 pt-6">
              <h3 className="font-display text-[clamp(1.1rem,2vw,1.5rem)] leading-tight font-medium">
                {founder.name}
              </h3>
              <p className="mt-1.5 text-[10px] tracking-[0.14em] text-clay uppercase sm:text-[11px]">
                Founder · {founder.role}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-pretty text-ink/70 sm:text-[14px]">
                {founder.bio}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** One quiet line under the homepage hero pointing down to the founder section. */
export function FoundersLine() {
  return (
    <a
      href="#founders"
      className="group mt-8 inline-flex items-center gap-3 text-[13px] text-ink/70"
    >
      <span className="flex">
        {founders.map((founder, index) => (
          <img
            key={founder.id}
            src={founder.photo}
            alt=""
            width={36}
            height={36}
            className={`size-9 rounded-full object-cover ring-2 ring-cream ${index > 0 ? "-ml-2.5" : ""}`}
          />
        ))}
      </span>
      <span>
        Founded in Dubai by {founders.map((f) => f.firstName).join(" and ")}
        <span className="ml-2 text-clay transition-colors group-hover:text-ink">
          Meet the founder →
        </span>
      </span>
    </a>
  );
}
