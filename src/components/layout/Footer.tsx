import Link from "next/link";
import { company, footer } from "@/lib/content";
import { Logo } from "./Logo";

/**
 * Contact details and social links are unset in content.ts. Rather than
 * print a plausible-looking address, the footer renders an explicit
 * marker: a placeholder that can be mistaken for real data is worse than
 * a visible gap, because nobody notices it before launch.
 *
 * It is no longer coloured — it should read as an editorial note to the
 * site's owner, not as a highlighted feature of the page.
 */
function Pending({ label }: { label: string }) {
  return (
    <span className="text-[0.9375rem] text-slate-dim">
      {label} <span className="italic">à renseigner</span>
    </span>
  );
}

const linkClass =
  "link-underline text-[0.9375rem] text-mist transition-colors duration-300 hover:text-chalk";

export function Footer() {
  const hasSocials = company.socials.some((s) => s.href);

  return (
    <footer className="border-t border-[var(--hairline)]">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          {/* --- identity --- */}
          <div className="max-w-xs">
            <Logo compact />
            <p className="t-body mt-6 text-mist">{company.tagline}</p>
          </div>

          {/* --- link columns --- */}
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="t-mono text-slate-dim">{col.title}</h2>
              <ul className="mt-6 space-y-3.5">
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

          {/* --- contact --- */}
          <div>
            <h2 className="t-mono text-slate-dim">Contact</h2>
            <ul className="mt-6 space-y-3.5">
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
              {hasSocials
                ? company.socials
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
                : (
                  <li>
                    <Pending label="Réseaux" />
                  </li>
                )}
            </ul>
          </div>
        </div>

        <p className="mt-20 border-t border-[var(--hairline)] pt-7 text-[0.8125rem] text-slate-dim">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
