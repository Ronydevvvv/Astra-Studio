import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { contact, company } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Starfield } from "@/components/ui/Starfield";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Une idée, une refonte ou simplement envie d'en discuter ? Expliquez-nous votre projet : ASTRA Studio revient vers vous avec un premier avis, sans engagement.",
  path: "/contact",
});

/**
 * A signal, not a definition list. The previous version put email and phone
 * in a `<dl>` — correct information, but "E-mail: x, Téléphone: y" is a form
 * field's own grammar, sitting right next to an actual form. Each real
 * channel is now its own row along a signal line: an icon, the channel
 * name, the value large enough to read as a destination rather than a
 * caption. An unset channel (Instagram, availability) simply doesn't render
 * a row — never a placeholder.
 */
function Channel({
  icon,
  label,
  value,
  href,
}: {
  icon: "mail" | "phone" | "instagram" | "clock";
  label: string;
  value: string | null;
  href?: string;
}) {
  if (!value) return null;
  const iconName =
    icon === "phone" ? "phone" : icon === "mail" ? "mail" : icon === "clock" ? "support" : "check";
  const body = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/[0.12] bg-white/[0.02] text-violet-300 transition-colors duration-300 group-hover:border-violet-400/50 group-hover:bg-violet-500/10">
        <Icon name={iconName} className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
          {label}
        </span>
        <span className="mt-1 block truncate text-[1.1875rem] font-medium tracking-[-0.015em] text-chalk">
          {value}
        </span>
      </span>
    </>
  );

  return href ? (
    <a
      href={href}
      className="group flex items-center gap-4 border-t border-white/[0.09] py-5 transition-colors duration-300 first:border-t-0"
    >
      {body}
    </a>
  ) : (
    <div className="flex items-center gap-4 border-t border-white/[0.09] py-5 first:border-t-0">
      {body}
    </div>
  );
}

export default function ContactPage() {
  const instagram = company.socials.find((s) => s.label === "Instagram");

  return (
    <>
      {/* A bespoke masthead rather than the shared PageHero every other
          page uses — Contact is the one page that should feel like it's
          being said directly to the visitor, not introduced the same way
          Services or Tarifs are. */}
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+3rem)]">
        <Starfield className="pointer-events-none opacity-50" />
        <div className="glow left-[8%] top-0 size-[30rem] bg-violet-700/[0.14]" />

        <div className="relative mx-auto max-w-[1440px] px-6 pb-16 md:px-10 md:pb-20 xl:px-16">
          <p
            className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90"
            data-reveal
          >
            <span aria-hidden="true" className="h-px w-8 bg-violet-500/70" />
            {contact.eyebrow}
          </p>
          <h1
            className="mt-7 max-w-3xl text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[1.0] tracking-[-0.04em]"
            data-reveal
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            {contact.title[0]}
          </h1>
          <p
            className="mt-7 max-w-lg text-[1.0625rem] leading-[1.8] text-mist"
            data-reveal
            style={{ ["--reveal-delay" as string]: "160ms" }}
          >
            {contact.lead}
          </p>
        </div>
      </section>

      <section className="pb-28 md:pb-36 lg:pb-44">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
          <div className="grid gap-x-20 gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-start">
            <aside
              className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)]"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <h2 className="text-[1.375rem] font-medium leading-[1.3] tracking-[-0.02em]">
                {contact.reassurance.title}
              </h2>
              <p className="mt-4 max-w-sm text-[0.9375rem] leading-[1.8] text-mist">
                {contact.reassurance.body}
              </p>

              <div className="mt-10">
                <Channel
                  icon="mail"
                  label="E-mail"
                  value={company.email}
                  href={company.email ? `mailto:${company.email}` : undefined}
                />
                <Channel
                  icon="phone"
                  label="Téléphone"
                  value={company.phone}
                  href={
                    company.phone
                      ? `tel:+33${company.phone.replace(/\D/g, "").slice(1)}`
                      : undefined
                  }
                />
                <Channel
                  icon="instagram"
                  label="Instagram"
                  value={instagram?.href ? "@astra.studio" : null}
                  href={instagram?.href ?? undefined}
                />
                <Channel
                  icon="clock"
                  label="Disponibilité"
                  value={company.availability}
                />
              </div>

              {/* A small orbital node beside the last real channel rather
                  than a separate decorative circle glued underneath — the
                  same signal the coordinates above are part of, not a
                  second unrelated illustration. */}
              <div className="relative mt-10 hidden aspect-[16/10] max-w-md overflow-hidden rounded-lg border border-white/[0.07] lg:block">
                <Starfield className="opacity-40" />
                <div className="glow left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 bg-violet-600/[0.16]" />
                <svg
                  aria-hidden="true"
                  viewBox="0 0 160 100"
                  className="absolute inset-0 size-full opacity-70"
                >
                  <defs>
                    <linearGradient id="contact-signal-grad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#9a6bff" stopOpacity="0" />
                      <stop offset="50%" stopColor="#9a6bff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#9a6bff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* A trajectory reaching toward the edge — "signal sent",
                      not a static ring. */}
                  <path
                    d="M20 78 Q70 30 150 22"
                    fill="none"
                    stroke="url(#contact-signal-grad)"
                    strokeWidth="0.5"
                    strokeDasharray="0.6 2.6"
                    className="animate-[spin_140s_linear_infinite]"
                    style={{ transformOrigin: "80px 50px" }}
                  />
                  <circle cx="20" cy="78" r="2" fill="#ede9fe">
                    <animate
                      attributeName="opacity"
                      values="0.5;1;0.5"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="150" cy="22" r="1.4" fill="#c4b5fd" opacity="0.8" />
                  <circle cx="92" cy="46" r="1" fill="#9a6bff" opacity="0.6" />
                </svg>
              </div>
            </aside>

            <div data-reveal style={{ ["--reveal-delay" as string]: "200ms" }}>
              <ContactForm />
            </div>
          </div>

          {/* A closing line before the footer takes over — the page ends
              on an invitation, not on the last form field. */}
          <p
            className="mt-24 max-w-xl border-t border-white/[0.09] pt-10 text-[1.0625rem] leading-[1.7] text-mist lg:mt-32"
            data-reveal
          >
            Une idée encore floue, un besoin précis, ou juste une question :
            <span className="text-chalk"> racontez-nous où vous en êtes.</span>
          </p>
        </div>
      </section>
    </>
  );
}
