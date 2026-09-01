"use client";

import { useId, useState } from "react";
import { contact } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

type Field = "name" | "company" | "email" | "phone" | "type" | "budget" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validation runs on submit, then per-field on change once a field has been
 * marked in error. Validating on every keystroke from the start shouts at
 * someone who is still typing their email; never re-validating leaves a red
 * field red after it has been fixed.
 *
 * No endpoint is wired: there is no address to send to yet (company.email is
 * unset). The form validates, reports, and states plainly that delivery is
 * not connected — which is honest, where a fake success message would not be.
 */
export function ContactForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(new FormData(form));
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users
      // are not left guessing where the error is.
      form.querySelector<HTMLElement>(`[aria-invalid="true"]`)?.focus();
      return;
    }
    setSent(true);
  };

  const revalidate = (form: HTMLFormElement, field: Field) => {
    if (!errors[field]) return;
    const found = validate(new FormData(form));
    setErrors((prev) => ({ ...prev, [field]: found[field] }));
  };

  const fieldClass = (bad: boolean) =>
    `w-full border-b bg-transparent py-3.5 text-[1rem] text-chalk outline-none transition-colors duration-300 placeholder:text-slate-dim/50 ${
      bad
        ? "border-red-400/70 focus:border-red-300"
        : "border-white/[0.14] hover:border-white/25 focus:border-violet-400"
    }`;

  const labelClass =
    "block text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim";

  if (sent) {
    return (
      <div
        role="status"
        className="border-t border-violet-500/40 pt-10"
      >
        <div className="flex items-start gap-4">
          <Icon name="check" className="mt-1 size-6 shrink-0 text-violet-400" />
          <div>
            <h2 className="text-[1.5rem] font-medium tracking-[-0.02em]">
              Message prêt à être envoyé.
            </h2>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.75] text-mist">
              Le formulaire est valide, mais l&apos;envoi n&apos;est pas encore
              branché : aucune adresse de destination n&apos;a été renseignée.
              Connectez un service d&apos;e-mail et complétez{" "}
              <code className="text-violet-300">company.email</code> dans{" "}
              <code className="text-violet-300">content.ts</code> pour activer
              la réception.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
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
      {/* --- name --- */}
      <div>
        <label htmlFor={`${id}-name`} className={labelClass}>
          Nom <span className="text-violet-400">*</span>
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
          E-mail <span className="text-violet-400">*</span>
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
          Votre projet <span className="text-violet-400">*</span>
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
        <button
          type="submit"
          className="group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-violet-500 px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10)_inset,0_14px_40px_-12px_rgba(124,58,245,0.7)] transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-out-expo)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset,0_20px_54px_-12px_rgba(124,58,245,0.95)] active:scale-[0.98]"
        >
          {contact.submit}
          <Icon
            name="arrow"
            className="size-[1.15em] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/btn:translate-x-1"
          />
        </button>

        <p className="mt-5 text-[0.8125rem] text-slate-dim">
          Les champs marqués <span className="text-violet-400">*</span> sont
          obligatoires.
        </p>
      </div>
    </form>
  );
}
