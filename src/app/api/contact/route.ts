import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LEN = { name: 120, company: 160, email: 200, phone: 40, type: 60, budget: 60, message: 4000 };

function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

/**
 * The one place that decides whether ASTRA can actually receive contact
 * requests. Nothing here ever fabricates success: a missing RESEND_API_KEY
 * or CONTACT_EMAIL returns a distinct "not_configured" status the client
 * renders as an honest message, never a green checkmark.
 */
export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: a real visitor never fills a field hidden from view. A bot
  // filling every input on the page will. Silently pretend success so the
  // bot gets no signal to adapt from.
  if (clean(data.get("website"), 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(data.get("name"), MAX_LEN.name);
  const company = clean(data.get("company"), MAX_LEN.company);
  const email = clean(data.get("email"), MAX_LEN.email);
  const phone = clean(data.get("phone"), MAX_LEN.phone);
  const type = clean(data.get("type"), MAX_LEN.type);
  const budget = clean(data.get("budget"), MAX_LEN.budget);
  const message = clean(data.get("message"), MAX_LEN.message);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Indiquez votre nom.";
  if (!EMAIL.test(email)) errors.email = "Cette adresse e-mail semble incomplète.";
  if (message.length < 20) errors.message = "Quelques phrases de plus nous aideraient à vous répondre utilement.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    // Real gap, not a server failure: report it as its own status so the
    // UI can say plainly that delivery isn't connected yet.
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const lines = [
    `Nom : ${name}`,
    company && `Entreprise : ${company}`,
    `E-mail : ${email}`,
    phone && `Téléphone : ${phone}`,
    type && `Type de projet : ${type}`,
    budget && `Budget : ${budget}`,
    "",
    message,
  ].filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ASTRA Studio <contact@astra-studio.fr>",
        to: [to],
        reply_to: email,
        subject: `Nouveau projet — ${name}${company ? ` (${company})` : ""}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
