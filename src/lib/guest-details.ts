import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// The "Tell us" details booked guests send before a trip (ski level, rental sizes,
// dietary needs, passport for the flight booking, and optionally the payment proof).

export const guestFormRecipients = ["bautista@huellaretreat.com", "julie@huellaretreat.com"];

export const skiLevels = ["First time", "Getting there", "Confident"] as const;

// Payment proof travels inside the request as base64; Vercel caps a request body at 4.5 MB.
export const paymentProofMaxBytes = 3 * 1024 * 1024;
export const paymentProofTypes = [
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/webp",
  "application/pdf",
];

const paymentProofSchema = z.object({
  name: z.string().trim().min(1).max(200),
  type: z.enum(paymentProofTypes as [string, ...string[]]),
  data: z
    .string()
    .max(Math.ceil(paymentProofMaxBytes / 3) * 4)
    .regex(/^[A-Za-z0-9+/]+=*$/, "Not base64"),
});

export type PaymentProof = z.infer<typeof paymentProofSchema>;

const text = (max: number) => z.string().trim().min(1, "Required").max(max);

export const guestDetailsSchema = z.object({
  trip: text(120),
  fullName: text(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: text(40),
  skiLevel: z.enum(skiLevels),
  shoeSize: text(20),
  height: text(20),
  weight: text(20),
  dietary: z.string().trim().max(2000),
  nationality: text(80),
  passportOrigin: text(80),
  passportNumber: text(40),
  dateOfBirth: text(20),
  passportExpiry: text(20),
  notes: z.string().trim().max(2000),
  paymentProof: paymentProofSchema.optional(),
});

export type GuestDetails = z.infer<typeof guestDetailsSchema>;

const rows: [Exclude<keyof GuestDetails, "paymentProof">, string][] = [
  ["trip", "Trip"],
  ["fullName", "Full name (as on passport)"],
  ["email", "Email"],
  ["phone", "WhatsApp"],
  ["skiLevel", "Ski level"],
  ["shoeSize", "Shoe size (EU)"],
  ["height", "Height (cm)"],
  ["weight", "Weight (kg)"],
  ["dietary", "Dietary needs and allergies"],
  ["nationality", "Nationality"],
  ["passportOrigin", "Passport origin"],
  ["passportNumber", "Passport number"],
  ["dateOfBirth", "Date of birth"],
  ["passportExpiry", "Passport expiry"],
  ["notes", "Anything else"],
];

const escape = (value: string) =>
  value.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export function guestDetailsEmail(details: GuestDetails) {
  const subject = `Guest details · ${details.fullName} · ${details.trip}`;
  const proof = details.paymentProof ? `${details.paymentProof.name} (attached)` : "Not sent";
  const lines = [
    ...rows.map(([key, label]) => `${label}: ${details[key] || "—"}`),
    `Payment proof: ${proof}`,
  ];
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([key, label]) =>
        `<tr><td style="color:#7a6a58;vertical-align:top">${label}</td><td>${escape(details[key] || "—").replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join(
      "",
    )}<tr><td style="color:#7a6a58;vertical-align:top">Payment proof</td><td>${escape(proof)}</td></tr></table>`;
  return { subject, text: lines.join("\n"), html };
}

// Each response (with the payment proof, if any) goes to two places, and the guest sees an error only if both fail:
// 1. Email to the hosts through Resend (https://resend.com): RESEND_API_KEY, and a sender on a
//    domain verified in Resend (GUEST_FORM_FROM, defaults to guests@huellaretreat.com).
// 2. A row in the responses Google Sheet, through the Apps Script in scripts/guest-details-sheet.gs:
//    GUEST_SHEET_URL (the script's web app URL) and GUEST_SHEET_SECRET (shared with the script).

async function sendEmail(details: GuestDetails, apiKey: string) {
  const { subject, text, html } = guestDetailsEmail(details);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env["GUEST_FORM_FROM"] ?? "Huella <guests@huellaretreat.com>",
      to: guestFormRecipients,
      reply_to: details.email,
      subject,
      text,
      html,
      ...(details.paymentProof && {
        attachments: [{ filename: details.paymentProof.name, content: details.paymentProof.data }],
      }),
    }),
  });
  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`);
}

async function addSheetRow(details: GuestDetails, url: string, secret: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret, details }),
  });
  const result = (await response.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;
  if (!response.ok || !result?.ok)
    throw new Error(`Sheet ${response.status}: ${result?.error ?? "no reply"}`);
}

/** Sends one response to every configured place; throws only if none of them took it. */
export async function deliverGuestDetails(
  data: GuestDetails,
  env: Record<string, string | undefined>,
) {
  const deliveries: [string, Promise<void>][] = [];
  if (env["RESEND_API_KEY"]) deliveries.push(["email", sendEmail(data, env["RESEND_API_KEY"])]);
  if (env["GUEST_SHEET_URL"] && env["GUEST_SHEET_SECRET"])
    deliveries.push([
      "sheet",
      addSheetRow(data, env["GUEST_SHEET_URL"], env["GUEST_SHEET_SECRET"]),
    ]);
  if (deliveries.length === 0) throw new Error("Neither RESEND_API_KEY nor GUEST_SHEET_URL is set");

  const results = await Promise.allSettled(deliveries.map(([, delivery]) => delivery));
  results.forEach((result, index) => {
    if (result.status === "rejected")
      console.error(`Guest details ${deliveries[index]![0]} failed`, result.reason);
  });
  if (results.every((result) => result.status === "rejected"))
    throw new Error("Guest details were not saved");
}

export const submitGuestDetails = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => guestDetailsSchema.parse(input))
  .handler(async ({ data }) => {
    await deliverGuestDetails(data, process.env);
    return { ok: true };
  });
