import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form intake. Receives JSON from the CTA section's form
 * and forwards it to the studio inbox via Resend.
 *
 * Required env (set on Vercel):
 *   RESEND_API_KEY     - from resend.com dashboard (free tier ok)
 *   CONTACT_INBOX      - destination address (defaults to the
 *                        founder's gmail so missing env doesn't
 *                        silently swallow leads in dev)
 *
 * Sender uses Resend's default onboarding@resend.dev so no domain
 * verification is required to start receiving leads. Replace with
 * `from: "Swift Labs <leads@swiftlabs.dev>"` once a real domain is
 * verified in the Resend dashboard.
 */

const INBOX = process.env.CONTACT_INBOX || "sufyananis7@gmail.com";

interface LeadPayload {
  name?: string;
  company?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const name = (body.name ?? "").trim();
  if (!email.includes("@") || !name) {
    return NextResponse.json(
      { error: "Name and a valid email are required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Surface a clear server error instead of pretending success —
    // the form will show an inline error rather than silently
    // dropping the lead.
    console.error("/api/lead: RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Mail service not configured." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const subject = `New brief from ${name}${body.company ? ` (${body.company})` : ""}`;
  const lines = [
    `Name:         ${name}`,
    `Email:        ${email}`,
    body.company ? `Company:      ${body.company}` : "",
    body.projectType ? `Project type: ${body.projectType}` : "",
    body.budget ? `Budget:       ${body.budget}` : "",
    body.timeline ? `Timeline:     ${body.timeline}` : "",
    "",
    "Message:",
    body.message?.trim() || "(no message)",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const result = await resend.emails.send({
      from: "Swift Labs <onboarding@resend.dev>",
      to: INBOX,
      replyTo: email,
      subject,
      text: lines,
    });
    if (result.error) {
      console.error("/api/lead: resend send error", result.error);
      return NextResponse.json(
        { error: "Could not send right now. Please email directly." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/lead: unexpected error", err);
    return NextResponse.json(
      { error: "Unexpected error. Please email directly." },
      { status: 500 }
    );
  }
}
