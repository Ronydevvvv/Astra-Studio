"use client";

import { useId, useState } from "react";
import { contact } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

type Field = "name" | "company" | "email" | "phone" | "type" | "budget" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "sent" | "not_configured" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Public by design — Web3Forms access keys are meant to be embedded in
 * client-side code (their spam filtering runs server-side on their end,
 * keyed to this value), unlike a real API secret. Baked in at build time
 * from NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, which is required precisely
 * because this site ships as a static export with no server of its own:
 * there is nowhere else a key could live. */
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Validation runs on submit, then per-field on change once a field has been
 * marked in error. Validating on every keystroke from the start shouts at
 * someone who is still typing their email; never re-validating leaves a red
 * field red after it has been fixed.
 *
 * Submits straight to Web3Forms from the browser: the site is a static
 * export, so there is no API route left to post to. When the access key is
 * not configured the form says so plainly rather than faking a success.
 */
export function ContactForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = "Indiquez votre nom.";
    if (!EMAIL.test(email)) next.email = "Cette adresse e-mail semble incomplète.";
    if (message.length < 20)
      next.message = "Quelques phrases de plus nous aideraient à vous répondre utilement.";

    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return; // a second click while in flight

    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    const firstBadField = (Object.keys(found) as Field[])[0];
    if (firstBadField) {
      // Queried by `name`, not by `[aria-invalid="true"]`: that attribute is
      // only applied once React commits the state set above, which has not
      // happened yet at this point in the handler — so the old selector
      // always matched nothing and focus never moved.
      form.querySelector<HTMLElement>(`[name="${firstBadField}"]`)?.focus();
      return;
    }

    // Honeypot: a real visitor never fills a field hidden off-screen, a bot
    // filling every input will. Report success without sending, so the bot
    // gets no signal to adapt to.
    if (String(data.get("website") ?? "").trim()) {
      setStatus("sent");
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("not_configured");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nouvelle demande — astrastudio.pro",
          from_name: String(data.get("name") ?? ""),
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          phone: String(data.get("phone") ?? ""),
          type: String(data.get("type") ?? ""),
          budget: String(data.get("budget") ?? ""),
          message: String(data.get("message") ?? ""),
        }),
      });
      const body = (await res.json().catch(() => null)) as
        | { success: true }
        | { success: false; message?: string }
        | null;

      setStatus(res.ok && body?.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const revalidate = (form: HTMLFormElement, field: Field) => {
    if (!errors[field]) return;
    const found = validate(new FormData(form));
    setErrors((prev) => ({ ...prev, [field]: found[field] }));
  };

  const fieldClass = (bad: boolean) =>
    `w-full border-b bg-transparent py-3.5 text-[1rem] text-chalk outline-none transition-colors duration-300 placeholder:text-dim ${
      bad
        ? "border-red-400/70 focus:border-red-300"
        : "border-[var(--hairline-strong)] hover:border-white/30 focus:border-chalk"
    }`;

  const labelClass =
    "block eyebrow text-dim";

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-[var(--hairline-strong)] pt-10">
        <div className="flex items-start gap-4">
          <Icon name="check" className="mt-1 size-6 shrink-0 text-chalk" />
          <div>
            <h2 className="text-[1.5rem] font-medium tracking-[-0.02em]">
              Message envoyé.
            </h2>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.75] text-mist">
              Merci — votre demande est bien partie. Vous recevrez une réponse
              à l&apos;adresse indiquée.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="underline-draw mt-8 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-chalk transition-colors duration-300 hover:text-mist"
            >
              Envoyer un autre message
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* Only reachable when the build had no NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.
     Stating that plainly beats a success screen that silently discards the
     message — the visitor would leave believing they had been in touch. */
  if (status === "not_configured") {
    return (
      <div role="status" className="border-t border-[var(--hairline-strong)] pt-10">
        <div className="flex items-start gap-4">
          <Icon name="alert" className="mt-1 size-6 shrink-0 text-chalk" />
          <div>
            <h2 className="text-[1.5rem] font-medium tracking-[-0.02em]">
              Envoi non configuré.
            </h2>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.75] text-mist">
              Le formulaire est valide, mais aucune clé d&apos;envoi
              n&apos;est définie pour cette build. Renseignez{" "}
              <code className="text-chalk">NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code>{" "}
              puis reconstruisez le site pour activer la réception.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="underline-draw mt-8 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-chalk transition-colors duration-300 hover:text-mist"
            >
              Revenir au formulaire
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-x-12 gap-y-9 sm:grid-cols-2">
      {/* Honeypot. Positioned off-screen rather than display:none — some bots
          skip hidden inputs but fill positioned ones. aria-hidden and
          tabIndex -1 keep it out of the way of assistive tech and the tab
          order, so no real visitor can reach it by accident. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
      >
        <label htmlFor={`${id}-website`}>Laissez ce champ vide</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* --- name --- */}
      <div>
        <label htmlFor={`${id}-name`} className={labelClass}>
          Nom <span className="text-chalk">*</span>
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${id}-name-err` : undefined}
          onChange={(e) => revalidate(e.currentTarget.form as HTMLFormElement, "name")}
          className={`mt-3 ${fieldClass(Boolean(errors.name))}`}
        />
        {errors.name && (
          <p id={`${id}-name-err`} className="mt-2.5 flex items-center gap-2 text-[0.8125rem] text-red-300">
            <Icon name="alert" className="size-4 shrink-0" />
            {errors.name}
          </p>
        )}
      </div>

      {/* --- company --- */}
      <div>
        <label htmlFor={`${id}-company`} className={labelClass}>
          Entreprise
        </label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          autoComplete="organization"
          className={`mt-3 ${fieldClass(false)}`}
        />
      </div>

      {/* --- email --- */}
      <div>
        <label htmlFor={`${id}-email`} className={labelClass}>
          E-mail <span className="text-chalk">*</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-email-err` : undefined}
          onChange={(e) => revalidate(e.currentTarget.form as HTMLFormElement, "email")}
          className={`mt-3 ${fieldClass(Boolean(errors.email))}`}
        />
        {errors.email && (
          <p id={`${id}-email-err`} className="mt-2.5 flex items-center gap-2 text-[0.8125rem] text-red-300">
            <Icon name="alert" className="size-4 shrink-0" />
            {errors.email}
          </p>
        )}
      </div>

      {/* --- phone --- */}
      <div>
        <label htmlFor={`${id}-phone`} className={labelClass}>
          Téléphone
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          className={`mt-3 ${fieldClass(false)}`}
        />
      </div>

      {/* --- project type --- */}
      <div>
        <label htmlFor={`${id}-type`} className={labelClass}>
          Type de projet
        </label>
        <select
          id={`${id}-type`}
          name="type"
          defaultValue=""
          className={`mt-3 appearance-none ${fieldClass(false)}`}
        >
          <option value="" className="bg-ink">
            Sélectionner…
          </option>
          {contact.projectTypes.map((t) => (
            <option key={t} value={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* --- budget --- */}
      <div>
        <label htmlFor={`${id}-budget`} className={labelClass}>
          {contact.budgetLabel}
        </label>
        <select
          id={`${id}-budget`}
          name="budget"
          defaultValue=""
          className={`mt-3 appearance-none ${fieldClass(false)}`}
        >
          <option value="" className="bg-ink">
            Sélectionner…
          </option>
          {contact.budgets.map((b) => (
            <option key={b} value={b} className="bg-ink">
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* --- message --- */}
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={labelClass}>
          Votre projet <span className="text-chalk">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          onChange={(e) => revalidate(e.currentTarget.form as HTMLFormElement, "message")}
          placeholder="Votre activité, ce que le site doit permettre, votre échéance…"
          className={`mt-3 resize-y ${fieldClass(Boolean(errors.message))}`}
        />
        {errors.message && (
          <p id={`${id}-message-err`} className="mt-2.5 flex items-center gap-2 text-[0.8125rem] text-red-300">
            <Icon name="alert" className="size-4 shrink-0" />
            {errors.message}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        {/* Matches Button's `solid` variant exactly — squared, hairlined,
            no coloured drop shadow. It cannot literally BE that component
            because Button renders a Link and this must submit a form. */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group/btn inline-flex items-center justify-center gap-3 bg-chalk px-7 py-4 font-display text-[0.75rem] font-medium uppercase tracking-[0.12em] text-void transition-colors duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Envoi en cours…" : contact.submit}
          <Icon
            name="arrow"
            className="size-3.5 transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover/btn:translate-x-[3px]"
          />
        </button>

        {/* role="alert" so the failure is announced: the visitor has just
            written a long message and must not be left assuming it went. */}
        {status === "error" && (
          <p
            role="alert"
            className="mt-5 flex items-start gap-2 text-[0.8125rem] leading-[1.7] text-red-300"
          >
            <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
            <span>
              L&apos;envoi a échoué. Vérifiez votre connexion et réessayez —
              si le problème persiste, votre message n&apos;a pas été transmis.
            </span>
          </p>
        )}

        <p className="mt-5 text-[0.8125rem] text-dim">
          Les champs marqués <span className="text-chalk">*</span> sont
          obligatoires.
        </p>
      </div>
    </form>
  );
}
