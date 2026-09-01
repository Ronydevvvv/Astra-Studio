import Link from "next/link";
import { company, footer } from "@/lib/content";
import { Logo } from "./Logo";

/**
 * Contact details and social links are unset in content.ts. Rather than print
 * a plausible-looking address, the footer renders an explicit "à renseigner"
 * marker: a placeholder that can be mistaken for real data is worse than a
 * visible gap, because nobody notices it before launch.
 */
function Pending({ label }: { label: string }) {
  return (
    <span className="text-[0.875rem] text-slate-dim/60">
      {label} <span className="text-violet-400/70">à renseigner</span>
    </span>
  );
}

export function Footer() {
  const hasSocials = company.socials.some((s) => s.href);

  return (
    <footer className="relative border-t border-white/[0.07] bg-[#070814]">
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

          {/* --- contact, as the fourth column --- */}
          <div>
            <h2 className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
              Contact
            </h2>
            <ul className="mt-6 space-y-3.5">
              <li>
                {company.email ? (
                  <a
                    href={`mailto:${company.email}`}
                    className="text-[0.9375rem] text-mist transition-colors duration-300 hover:text-chalk"
                  >
                    <span className="link-wipe">{company.email}</span>
                  </a>
                ) : (
                  <Pending label="E-mail" />
                )}
              </li>
              <li>
                {company.phone ? (
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="text-[0.9375rem] text-mist transition-colors duration-300 hover:text-chalk"
                  >
                    <span className="link-wipe">{company.phone}</span>
                  </a>
                ) : (
                  <Pending label="Téléphone" />
                )}
              </li>
            </ul>

            <h2 className="mt-10 text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
              Réseaux
            </h2>
            <ul className="mt-6 space-y-3.5">
              {hasSocials ? (
                company.socials
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
                  ))
              ) : (
                <li>
                  <Pending label="Réseaux sociaux" />
                </li>
              )}
            </ul>
          </div>
        </div>

        <p className="mt-20 border-t border-white/[0.07] pt-8 text-[0.8125rem] text-slate-dim">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
