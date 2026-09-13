import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Lines } from "@/components/ui/Lines";
import { contact, company } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Décrivez-nous votre projet. ASTRA Studio revient vers vous avec une première direction, sans engagement.",
  path: "/contact",
});

/**
 * The contact page IS the closing statement — it does not carry a second
 * one underneath, which is why `Call` is absent here.
 *
 * The title runs at full display scale with the form directly beneath it
 * rather than beside it: a form pushed into a right-hand column reads as
 * a widget bolted to a page, while one given the full measure reads as
 * the point of the page. Contact details sit last, small, as a footnote
 * to the form rather than a competing column.
 */
export default function ContactPage() {
  const details = [
    company.email && {
      label: "E-mail",
      value: company.email,
      href: `mailto:${company.email}`,
    },
    company.phone && {
      label: "Téléphone",
      value: company.phone,
      href: `tel:${company.phone.replace(/\s/g, "")}`,
    },
    ...company.socials
      .filter((s) => s.href)
      .map((s) => ({ label: s.label, value: s.label, href: s.href as string })),
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <>
      <section className="pt-[var(--nav-h)]">
        <div className="shell pb-24 pt-24 md:pb-32 md:pt-36 lg:pt-44">
          <div data-reveal>
            <p className="eyebrow">{contact.eyebrow}</p>
            <Lines
              as="h1"
              lines={contact.title}
              mutedFrom={1}
              stagger={110}
              className="t-hero mt-10 max-w-[14ch] md:mt-14"
            />
          </div>

          <p
            className="t-lead mt-14 max-w-[44ch] text-mist md:mt-20"
            data-reveal
            style={{ ["--reveal-delay" as string]: "300ms" }}
          >
            {contact.lead}
          </p>
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="shell">
          <div
            data-reveal
            className="rule-draw mb-20 h-px w-full bg-[var(--hairline)] md:mb-28"
          />

          <div data-reveal>
            <ContactForm />
          </div>

          {/* Details appear only when they exist. With none set, the block
              is absent entirely rather than printing "à renseigner" three
              times — an unfinished footer is a backlog item, not content. */}
          {details.length > 0 && (
            <dl className="mt-32 grid gap-x-16 gap-y-10 border-t border-[var(--hairline)] pt-10 sm:grid-cols-3 lg:mt-44">
              {details.map((d) => (
                <Detail key={d.label} {...d} />
              ))}
            </dl>
          )}
        </div>
      </section>
    </>
  );
}

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-3 text-[0.9375rem]">
        <a
          href={href}
          className="underline-draw text-chalk transition-colors duration-500 hover:text-mist"
        >
          {value}
        </a>
      </dd>
    </div>
  );
}
