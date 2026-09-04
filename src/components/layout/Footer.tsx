import Link from "next/link";
import { company, footer, footerCta } from "@/lib/content";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Starfield } from "@/components/ui/Starfield";

export function Footer() {
  const hasSocials = company.socials.some((s) => s.href);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#070814]">
      {/* Closing statement — the footer is the last scene, not a link dump. */}
      <div className="relative isolate border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Starfield />
          <div className="glow left-1/2 top-0 size-[36rem] -translate-x-1/2 bg-violet-700/[0.12]" />

          {/* A planet quietly sinking off the right edge — the same
              spatial vocabulary as the hero and the contact scene, closing
              the loop rather than introducing a new motif this late. */}
          <div
            aria-hidden="true"
            className="animate-float-slow absolute -right-24 bottom-[-30%] size-72 rounded-full opacity-70 lg:size-96"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, rgba(196,181,253,0.5), rgba(124,58,245,0.25) 45%, rgba(7,8,20,0.9) 72%)",
              boxShadow: "0 0 90px 10px rgba(124,58,245,0.15)",
            }}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="absolute -right-10 bottom-[-18%] size-80 opacity-40 lg:size-[28rem]"
          >
            <ellipse
              cx="50"
              cy="50"
              rx="48"
              ry="16"
              fill="none"
              stroke="rgba(154,107,255,0.5)"
              strokeWidth="0.4"
              strokeDasharray="0.6 2.2"
              transform="rotate(-18 50 50)"
            />
          </svg>
        </div>
        <div
          className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-6 py-20 md:px-10 lg:flex-row lg:items-end lg:py-28 xl:px-16"
          data-reveal
        >
          <h2 className="max-w-2xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            <span className="block">{footerCta.title[0]}</span>
            <span className="block text-violet-400">{footerCta.title[1]}</span>
          </h2>
          <Button href={footerCta.cta.href} withArrow className="shrink-0">
            {footerCta.cta.label}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:py-24 xl:px-16">
        {/* Identity sits on its own row so the four link columns can share
            one even grid. Folding it in as a fifth column left a dead
            quarter of the footer empty on wide screens. */}
        <div className="max-w-sm">
          <Logo compact />
          <p className="mt-7 text-[0.9375rem] leading-[1.75] text-mist">
            {company.tagline}
          </p>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4" data-reveal>
          {/* --- link columns --- */}
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
                {col.title}
              </h2>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] text-mist transition-colors duration-300 hover:text-chalk"
                    >
                      <span className="link-wipe">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* --- contact, as the fourth column ---
              Real email/phone render as links the moment they exist in
              content.ts. Until then, the column never prints a gap — it
              offers the one channel that is always real: the contact
              page itself. */}
          <div>
            <h2 className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
              Contact
            </h2>
            <ul className="mt-6 space-y-3.5">
              {company.email && (
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-[0.9375rem] text-mist transition-colors duration-300 hover:text-chalk"
                  >
                    <span className="link-wipe">{company.email}</span>
                  </a>
                </li>
              )}
              {company.phone && (
                <li>
                  <a
                    href={`tel:+33${company.phone.replace(/\D/g, "").slice(1)}`}
                    className="text-[0.9375rem] text-mist transition-colors duration-300 hover:text-chalk"
                  >
                    <span className="link-wipe">{company.phone}</span>
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/contact"
                  className="text-[0.9375rem] font-medium text-violet-300 transition-colors duration-300 hover:text-violet-200"
                >
                  <span className="link-wipe">Écrire à ASTRA</span>
                </Link>
              </li>
            </ul>

            {hasSocials && (
              <>
                <h2 className="mt-10 text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
                  Réseaux
                </h2>
                <ul className="mt-6 space-y-3.5">
                  {company.socials
                    .filter((s) => s.href)
                    .map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.9375rem] text-mist transition-colors duration-300 hover:text-chalk"
                        >
                          <span className="link-wipe">{s.label}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <p className="mt-20 border-t border-white/[0.07] pt-8 text-[0.8125rem] text-slate-dim">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
