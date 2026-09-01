import Image from "next/image";
import { trust } from "@/lib/content";

/**
 * Two named references, each labelled for what it actually is.
 *
 * The word "client" appears nowhere: one entry is work for a real business,
 * the other a creative direction that was never commissioned, and conflating
 * them would be the one claim a visitor can check and catch. `relation`
 * carries that distinction from content.ts to the label.
 *
 * Logos render the moment a real file is set. Until then the name is set in
 * display type — a wordmark is an honest stand-in; a hand-redrawn logo is a
 * misrepresentation of someone else's brand.
 */
export function TrustBar() {
  return (
    <section
      aria-label={trust.eyebrow}
      className="border-y border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 lg:py-14 xl:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="lg:max-w-xs">
            <h2 className="text-[0.6875rem] uppercase tracking-[0.2em] text-slate-dim">
              {trust.eyebrow}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.6] tracking-[-0.01em] text-chalk">
              {trust.lead}
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-16 gap-y-8">
            {trust.entries.map((entry) => (
              <li key={entry.name} className="group">
                {entry.logo ? (
                  <Image
                    src={entry.logo}
                    alt={entry.name}
                    width={160}
                    height={40}
                    className="h-8 w-auto opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  />
                ) : (
                  <span className="block font-display text-[1.375rem] font-medium tracking-[-0.02em] text-mist transition-colors duration-500 group-hover:text-chalk">
                    {entry.name}
                  </span>
                )}
                <span className="mt-2 block text-[0.625rem] uppercase tracking-[0.2em] text-slate-dim/70">
                  {trust.labels[entry.relation]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
