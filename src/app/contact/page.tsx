import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { contact, company } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Une idée, une refonte ou simplement envie d'en discuter ? Expliquez-nous votre projet : ASTRA Studio revient vers vous avec un premier avis, sans engagement.",
  path: "/contact",
});

/** Unset details show an explicit gap, never plausible-looking data. */
function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value: string | null;
  href?: string;
}) {
  return (
    <div className="border-t border-white/[0.09] py-5">
      <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
        {label}
      </dt>
      <dd className="mt-2.5 text-[0.9375rem]">
        {value ? (
          href ? (
            <a
              href={href}
              className="text-chalk transition-colors duration-300 hover:text-violet-300"
            >
              <span className="link-wipe">{value}</span>
            </a>
          ) : (
            <span className="text-mist">{value}</span>
          )
        ) : (
          <span className="text-violet-400/70">à renseigner</span>
        )}
      </dd>
    </div>
  );
}

export default function ContactPage() {
  const instagram = company.socials.find((s) => s.label === "Instagram");

  return (
    <>
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.title}
        lead={contact.lead}
      />

      <section className="pb-28 md:pb-36 lg:pb-44">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
          {/* Reassurance left, form right. The single biggest reason a
              contact form goes unfilled is the visitor thinking they have
              nothing ready to say — so that objection is answered beside the
              first field, not buried under the submit button. */}
          <div className="grid gap-x-20 gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-start">
            <aside
              className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)]"
              data-reveal
            >
              <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em]">
                {contact.reassurance.title}
              </h2>
              <p className="mt-5 max-w-sm text-[0.9375rem] leading-[1.8] text-mist">
                {contact.reassurance.body}
              </p>

              <dl className="mt-12">
                <Detail
                  label="E-mail"
                  value={company.email}
                  href={company.email ? `mailto:${company.email}` : undefined}
                />
                <Detail
                  label="Instagram"
                  value={instagram?.href ? "@astra.studio" : null}
                  href={instagram?.href ?? undefined}
                />
                <Detail label="Disponibilité" value={company.availability} />
              </dl>
            </aside>

            <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
