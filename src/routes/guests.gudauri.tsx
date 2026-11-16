import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/trip-layout";
import { contactLinks } from "@/lib/contact";
import {
  paymentProofMaxBytes,
  paymentProofTypes,
  submitGuestDetails,
  skiLevels,
} from "@/lib/guest-details";
import type { PaymentProof, SubmitFailure } from "@/lib/guest-details";

const TRIP = "Caucasus Powder Days · Gudauri, February 17–21";

export const Route = createFileRoute("/guests/gudauri")({
  head: () => ({
    meta: [
      { title: "Your details · Gudauri · Huella" },
      {
        name: "description",
        content: "Details we need from booked guests before the Gudauri ski trip.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GuestDetailsPage,
});

const field =
  "w-full rounded-[10px] bg-cream/80 px-4 py-3 text-[15px] ring-1 ring-ink/10 outline-none transition-shadow placeholder:text-ink/35 focus:ring-2 focus:ring-clay/50";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[14px] font-medium text-ink">{label}</span>
      {hint && <span className="mt-0.5 block text-[13px] text-ink/55">{hint}</span>}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Group({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-ink/10 pt-8">
      <legend className="sr-only">{title}</legend>
      <h2 className="font-display text-[1.6rem] leading-tight font-medium" aria-hidden="true">
        {title}
      </h2>
      <p className="mt-1 mb-6 text-[14px] text-ink/60">{intro}</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

// Some browsers leave the type blank for HEIC photos, so fall back to the file extension.
const typesByExtension: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  heic: "image/heic",
  webp: "image/webp",
  pdf: "application/pdf",
};
const fileType = (file: File) =>
  file.type || typesByExtension[file.name.split(".").pop()?.toLowerCase() ?? ""] || "";

function readAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function GuestDetailsPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Until the page's script has loaded, a click would make the browser send the form itself,
  // putting passport details in the address bar. Keep the button off until then.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [proofError, setProofError] = useState<string | null>(null);
  const [failure, setFailure] = useState<{ reason: SubmitFailure; fields?: string[] } | null>(null);
  const whatsapp = contactLinks.find((link) => link.id === "whatsapp")!;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { paymentProof: file, ...values } = Object.fromEntries(new FormData(event.currentTarget));
    if (proofError) return;
    setStatus("sending");
    try {
      let paymentProof: PaymentProof | undefined;
      if (file instanceof File && file.size > 0) {
        paymentProof = { name: file.name, type: fileType(file), data: await readAsBase64(file) };
      }
      const result = await submitGuestDetails({ data: { ...values, paymentProof, trip: TRIP } });
      if (!result.ok) {
        setFailure(result);
        setStatus("error");
        return;
      }
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      // The request never got an answer: offline, or the upload was too large to send.
      console.error(error);
      setFailure({ reason: "delivery_failed" });
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="mx-auto flex max-w-[760px] items-center gap-3 px-6 py-6">
        <a href="/" className="flex items-center gap-3">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-clay" />
          <span className="font-display text-[15px] font-medium tracking-[0.3em] uppercase">
            Huella
          </span>
        </a>
      </header>

      <main className="mx-auto max-w-[760px] px-6 pt-6 pb-24">
        <Eyebrow>Gudauri · February 17–21</Eyebrow>
        {status === "sent" ? (
          <div className="mt-6 rounded-[14px] bg-sand p-8 ring-1 ring-ink/5">
            <h1 className="font-display text-[clamp(2rem,5vw,2.8rem)] leading-tight font-medium">
              Thank you, got it.
            </h1>
            <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-ink/70">
              Your details are with us. If anything changes, just message us on WhatsApp at{" "}
              {whatsapp.value}.
            </p>
          </div>
        ) : (
          <>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,3.4rem)] leading-[1.05] font-medium">
              Tell us about you.
            </h1>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink/70">
              A few details so we can book your flight, sort your ski rental and plan the dinners
              around you. It takes about three minutes.
            </p>

            <form method="post" onSubmit={onSubmit} className="mt-10 space-y-10">
              <Group title="You" intro="So we know who's who and how to reach you.">
                <div className="sm:col-span-2">
                  <Field label="Full name" hint="Exactly as it appears on your passport.">
                    <input
                      name="fullName"
                      required
                      maxLength={120}
                      autoComplete="name"
                      className={field}
                    />
                  </Field>
                </div>
                <Field label="Email">
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    autoComplete="email"
                    className={field}
                  />
                </Field>
                <Field label="WhatsApp number">
                  <input
                    name="phone"
                    type="tel"
                    required
                    maxLength={40}
                    autoComplete="tel"
                    placeholder="+971"
                    className={field}
                  />
                </Field>
              </Group>

              <Group title="Your ski level" intro="So we can arrange lessons or ski groups.">
                <div className="grid grid-cols-1 gap-3 sm:col-span-2 sm:grid-cols-3">
                  {skiLevels.map((level) => (
                    <label
                      key={level}
                      className="flex cursor-pointer items-center gap-3 rounded-[10px] bg-cream/80 px-4 py-3 text-[15px] ring-1 ring-ink/10 has-[:checked]:bg-sand has-[:checked]:ring-2 has-[:checked]:ring-clay/60"
                    >
                      <input
                        type="radio"
                        name="skiLevel"
                        value={level}
                        required
                        className="accent-[var(--clay)]"
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </Group>

              <Group title="Your sizes" intro="For the boot and ski rental.">
                <Field label="Shoe size (EU)">
                  <input
                    name="shoeSize"
                    required
                    maxLength={20}
                    inputMode="decimal"
                    placeholder="e.g. 42"
                    className={field}
                  />
                </Field>
                <Field label="Height (cm)">
                  <input
                    name="height"
                    required
                    maxLength={20}
                    inputMode="numeric"
                    placeholder="e.g. 175"
                    className={field}
                  />
                </Field>
                <Field label="Weight (kg)">
                  <input
                    name="weight"
                    required
                    maxLength={20}
                    inputMode="numeric"
                    placeholder="e.g. 70"
                    className={field}
                  />
                </Field>
              </Group>

              <Group
                title="Dietary needs and allergies"
                intro="So the dinners are planned around you."
              >
                <div className="sm:col-span-2">
                  <Field
                    label="Your dietary needs and allergies"
                    hint="Vegetarian, vegan, gluten-free, allergies… Leave blank if none."
                  >
                    <textarea
                      name="dietary"
                      rows={3}
                      maxLength={2000}
                      className={`${field} resize-y`}
                    />
                  </Field>
                </div>
              </Group>

              <Group title="Passport details" intro="For the flight booking.">
                <Field label="Nationality" hint="As shown on your passport.">
                  <input name="nationality" required maxLength={80} className={field} />
                </Field>
                <Field label="Passport origin" hint="The country that issued your passport.">
                  <input name="passportOrigin" required maxLength={80} className={field} />
                </Field>
                <Field label="Passport number">
                  <input
                    name="passportNumber"
                    required
                    maxLength={40}
                    autoComplete="off"
                    className={field}
                  />
                </Field>
                <Field label="Date of birth">
                  <input name="dateOfBirth" type="date" required className={field} />
                </Field>
                <Field label="Passport expiry date">
                  <input name="passportExpiry" type="date" required className={field} />
                </Field>
              </Group>

              <Group
                title="Payment proof"
                intro="Optional. If you've paid, attach the transfer receipt so we can match it to your booking."
              >
                <div className="sm:col-span-2">
                  <Field label="Receipt or screenshot" hint="PDF, JPG, PNG or HEIC, up to 3 MB.">
                    <input
                      name="paymentProof"
                      type="file"
                      accept={paymentProofTypes.join(",")}
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file && file.size > paymentProofMaxBytes)
                          setProofError("That file is over 3 MB. Please attach a smaller one.");
                        else if (file && !paymentProofTypes.includes(fileType(file)))
                          setProofError("Please attach a PDF or an image.");
                        else setProofError(null);
                      }}
                      className={`${field} file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-1.5 file:text-[12px] file:tracking-[0.1em] file:text-cream file:uppercase hover:file:bg-clay`}
                    />
                  </Field>
                  {proofError && (
                    <p role="alert" className="mt-2 text-[13px] text-red-800">
                      {proofError}
                    </p>
                  )}
                </div>
              </Group>

              <Group
                title="Anything else we should know?"
                intro="Injuries, worries, who you'd like to share with, anything at all."
              >
                <div className="sm:col-span-2">
                  <Field label="Your note" hint="Optional.">
                    <textarea
                      name="notes"
                      rows={4}
                      maxLength={2000}
                      className={`${field} resize-y`}
                    />
                  </Field>
                </div>
              </Group>

              <div className="border-t border-ink/10 pt-8">
                {status === "error" && failure && (
                  <div role="alert" className="mb-4 text-[14px] leading-relaxed text-red-800">
                    {failure.reason === "invalid" ? (
                      <p>
                        Your details weren't sent. Please check{" "}
                        {failure.fields?.length ? (
                          <b>{failure.fields.join(", ")}</b>
                        ) : (
                          "the fields above"
                        )}{" "}
                        and try again.
                      </p>
                    ) : (
                      <>
                        <p>
                          Your details weren't sent. This is a problem on our side, not with what
                          you filled in. Your answers are still here, so you can try again in a few
                          minutes, or message us on WhatsApp at {whatsapp.value}.
                        </p>
                        <p className="mt-1 text-[12px] text-red-800/70">
                          Error code: {failure.reason}
                        </p>
                      </>
                    )}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!ready || status === "sending"}
                  className="w-full rounded-full bg-ink px-8 py-4 text-[13px] tracking-[0.14em] text-cream uppercase transition-colors hover:bg-clay disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" ? "Sending…" : "Send my details"}
                </button>
                <p className="mt-4 text-[13px] text-ink/50">
                  Only the Huella hosts see your answers.
                </p>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
