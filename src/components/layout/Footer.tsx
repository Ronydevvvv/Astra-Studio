import Link from "next/link";
import { company, footer } from "@/lib/content";
import { Logo } from "./Logo";

/**
 * Contact details and social links are unset in content.ts. Rather than
 * print a plausible-looking address, the footer renders an explicit
 * marker: a placeholder mistaken for real data is worse than a visible
 * gap, because nobody notices a convincing one before launch.
 */
function Pending({ label }: { label: string }) {
  return (
    <span className="text-[0.9375rem] text-dim">
      {label} <span className="italic">à renseigner</span>
    </span>
  );
}

const linkClass =
  "underline-draw text-[0.9375rem] text-mist transition-colors duration-500 hover:text-chalk";

export function Footer() {
  const hasSocials = company.socials.some((s) => s.href);

  return (
    <footer className="border-t border-[var(--hairline)]">
      <div className="shell py-20 lg:py-24">
        <div className="grid gap-x-16 gap-y-16 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))]">
          <div className="max-w-xs">
            <Logo compact />
            <p className="mt-8 text-[0.9375rem] leading-[1.7] text-mist">
              {company.tagline}
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow">{col.title}</h2>
              <ul className="mt-7 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-7 space-y-3.5">
              <li>
                {company.email ? (
                  <a href={`mailto:${company.email}`} className={linkClass}>
                    {company.email}
                  </a>
                ) : (
                  <Pending label="E-mail" />
                )}
              </li>
              <li>
                {company.phone ? (
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className={linkClass}
                  >
                    {company.phone}
                  </a>
                ) : (
                  <Pending label="Téléphone" />
                )}
              </li>
              {hasSocials ? (
                company.socials
                  .filter((s) => s.href)
                  .map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))
              ) : (
                <li>
                  <Pending label="Réseaux" />
                </li>
              )}
            </ul>
          </div>
        </div>

        <p className="eyebrow mt-24 border-t border-[var(--hairline)] pt-8">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
