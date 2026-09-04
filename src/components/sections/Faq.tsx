import { pricingFaq } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

/**
 * Native <details>/<summary> — keyboard and screen-reader accessible by
 * default, no JS needed for the open/close state. Answers only questions
 * the rest of the site can already back up (process, tiers, contact) —
 * no delivery-time promise, no SEO-ranking guarantee.
 */
export function Faq() {
  return (
    <section className="pb-28 md:pb-36 lg:pb-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div
          className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
          data-reveal
        >
          <div>
            <p className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90">
              <span aria-hidden="true" className="h-px w-8 bg-violet-500/70" />
              {pricingFaq.eyebrow}
            </p>
            <h2 className="mt-6 max-w-xs text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              {pricingFaq.title}
            </h2>
          </div>

          <div className="border-t border-white/[0.09]">
            {pricingFaq.items.map((item) => (
              <details
                key={item.q}
                className="group border-b border-white/[0.09] py-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.0625rem] font-medium tracking-[-0.01em] marker:content-none">
                  {item.q}
                  <Icon
                    name="arrow"
                    className="size-4 shrink-0 rotate-90 text-violet-400 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-open:-rotate-90"
                  />
                </summary>
                <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-mist">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
