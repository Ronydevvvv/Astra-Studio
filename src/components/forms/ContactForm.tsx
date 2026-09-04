"use client";

import { useId, useState } from "react";
import { contact } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Select } from "@/components/ui/Select";

type Field = "name" | "company" | "email" | "phone" | "type" | "budget" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "sent" | "not_configured" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validation runs on submit, then per-field on change once a field has been
 * marked in error. Validating on every keystroke from the start shouts at
 * someone who is still typing their email; never re-validating leaves a red
 * field red after it has been fixed.
 *
 * Submits to /api/contact, which sends through Resend when RESEND_API_KEY
 * and CONTACT_EMAIL are set. When they aren't, the API answers
 * "not_configured" and this component says so plainly — a fake success
 * message would be worse than an honest gap.
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
    if (status === "submitting") return; // already in flight — ignore a double click/Enter

    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    const firstBadField = (Object.keys(found) as Field[])[0];
    if (firstBadField) {
      // Move focus to the first problem so keyboard and screen-reader users
      // are not left guessing where the error is. Queried by `name`, not
      // `[aria-invalid="true"]`: that attribute only gets applied once React
      // commits the state set above, which hasn't happened yet at this point
      // in the handler — the query would always find nothing.
      form.querySelector<HTMLElement>(`[name="${firstBadField}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const body = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string; fields?: Errors }
        | null;

      if (body?.ok) {
        setStatus("sent");
      } else if (body?.error === "not_configured") {
        setStatus("not_configured");
      } else if (body?.error === "validation" && body.fields) {
        setErrors(body.fields);
        setStatus("idle");
      } else {
        setStatus("error");
      }
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
    `peer w-full border-b bg-transparent py-3.5 text-[1rem] text-chalk outline-none transition-colors duration-300 placeholder:text-slate-dim ${
      bad
        ? "border-red-400/70 focus:border-red-300"
        : "border-white/[0.14] hover:border-white/25 focus:border-violet-400"
    }`;

  const labelClass =
    "block text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim transition-colors duration-300 peer-focus:text-violet-300";

  /** An underline that draws itself in from the left on focus, on top of the
   * plain border — the same wipe used on nav links and buttons, so a field
   * in use reads with the rest of the site's language rather than a browser
   * default outline. */
  const underline = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-violet-400 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] peer-focus:scale-x-100"
    />
  );

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-violet-500/40 pt-10">
        <div className="flex items-start gap-4">
          <Icon name="check" className="mt-1 size-6 shrink-0 text-violet-400" />
          <div>
            <h2 className="text-[1.5rem] font-medium tracking-[-0.02em]">
              Votre demande est bien partie.
            </h2>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.75] text-mist">
              Nous revenons vers vous rapidement.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "not_configured") {
    return (
      <div role="status" className="border-t border-violet-500/40 pt-10">
        <div className="flex items-start gap-4">
          <Icon name="alert" className="mt-1 size-6 shrink-0 text-violet-400" />
          <div>
            <h2 className="text-[1.5rem] font-medium tracking-[-0.02em]">
              Message prêt à être envoyé.
            </h2>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.75] text-mist">
              Le formulaire est valide, mais l&apos;envoi n&apos;est pas encore
              branché : <code className="text-violet-300">RESEND_API_KEY</code>{" "}
              et <code className="text-violet-300">CONTACT_EMAIL</code> ne sont
              pas configurés côté serveur.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-chalk transition-colors duration-500 hover:text-violet-300"
            >
              <span className="link-wipe">Revenir au formulaire</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
      {/* Honeypot: invisible to a real visitor (off-screen, not display:none
          so it stays in the accessibility tree as a hidden field rather than
          triggering a mobile browser's "fill everything" autofill), but a
          field most form-filling bots complete anyway. Any value here is
          treated as spam server-side. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
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
          Nom <span className="text-violet-400">*</span>
        </label>
        <div className="relative mt-3">
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            onChange={(e) => revalidate(e.currentTarget.form as HTMLFormElement, "name")}
            className={fieldClass(Boolean(errors.name))}
          />
          {underline}
        </div>
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
        <div className="relative mt-3">
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass(false)}
          />
          {underline}
        </div>
      </div>

      {/* --- email --- */}
      <div>
        <label htmlFor={`${id}-email`} className={labelClass}>
          E-mail <span className="text-violet-400">*</span>
        </label>
        <div className="relative mt-3">
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            onChange={(e) => revalidate(e.currentTarget.form as HTMLFormElement, "email")}
            className={fieldClass(Boolean(errors.email))}
          />
          {underline}
        </div>
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
        <div className="relative mt-3">
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass(false)}
          />
          {underline}
        </div>
      </div>

      {/* --- project type --- */}
      <div>
        <label htmlFor={`${id}-type`} className={labelClass}>
          Type de projet
        </label>
        <div className="mt-3">
          <Select
            id={`${id}-type`}
            name="type"
            options={contact.projectTypes}
            placeholder="Sélectionner…"
          />
        </div>
      </div>

      {/* --- budget --- */}
      <div>
        <label htmlFor={`${id}-budget`} className={labelClass}>
          {contact.budgetLabel}
        </label>
        <div className="mt-3">
          <Select
            id={`${id}-budget`}
            name="budget"
            options={contact.budgets}
            placeholder="Sélectionner…"
          />
        </div>
      </div>

      {/* --- message --- */}
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={labelClass}>
          Votre projet <span className="text-violet-400">*</span>
        </label>
        <div className="relative mt-3">
          <textarea
            id={`${id}-message`}
            name="message"
            rows={5}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${id}-message-err` : undefined}
            onChange={(e) => revalidate(e.currentTarget.form as HTMLFormElement, "message")}
            placeholder="Votre activité, ce que le site doit permettre, votre échéance…"
            className={`resize-y ${fieldClass(Boolean(errors.message))}`}
          />
          {underline}
        </div>
        {errors.message && (
          <p id={`${id}-message-err`} className="mt-2.5 flex items-center gap-2 text-[0.8125rem] text-red-300">
            <Icon name="alert" className="size-4 shrink-0" />
            {errors.message}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
            const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
            e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
          }}
          className="group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-violet-500 px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10)_inset,0_14px_40px_-12px_rgba(124,58,245,0.7)] transition-[transform,box-shadow] duration-300 [transition-timing-function:var(--ease-out-expo)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset,0_20px_54px_-12px_rgba(124,58,245,0.95)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
        >
          {status === "submitting" ? "Envoi en cours…" : contact.submit}
          <Icon
            name="arrow"
            className="size-[1.15em] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/btn:translate-x-1"
          />
        </button>

        {status === "error" && (
          <p className="mt-5 flex items-center gap-2 text-[0.8125rem] text-red-300">
            <Icon name="alert" className="size-4 shrink-0" />
            L&apos;envoi a échoué. Réessayez dans un instant, ou écrivez-nous
            directement si le problème persiste.
          </p>
        )}

        <p className="mt-5 text-[0.8125rem] text-slate-dim">
          Les champs marqués <span className="text-violet-400">*</span> sont
          obligatoires.
        </p>
      </div>
    </form>
  );
}
