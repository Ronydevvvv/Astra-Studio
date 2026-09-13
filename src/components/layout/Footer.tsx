import Link from "next/link";
import { company, footer } from "@/lib/content";
import { Logo } from "./Logo";

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

          {/* Only real channels are listed. An e-mail address and social
              handles are not set yet (see `pending` in content.ts), and
              printing "à renseigner" in production advertises an unfinished
              site to every visitor — the gap belongs in the backlog, not in
              the footer. What is offered instead is the one route that
              actually works today: the contact form. */}
          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-7 space-y-3.5">
              {company.email && (
                <li>
                  <a href={`mailto:${company.email}`} className={linkClass}>
                    {company.email}
                  </a>
                </li>
              )}
              {company.phone && (
                <li>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className={linkClass}
                  >
                    {company.phone}
                  </a>
                </li>
              )}
              {hasSocials &&
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
                  ))}
              <li>
                <Link href="/contact" className={linkClass}>
                  Démarrer un projet
                </Link>
              </li>
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
