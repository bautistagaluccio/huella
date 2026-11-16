import { afterEach, describe, expect, it, vi } from "vitest";
import {
  deliverGuestDetails,
  guestDetailsEmail,
  guestDetailsSchema,
  guestFormRecipients,
} from "@/lib/guest-details";

const sample = {
  trip: "Gudauri",
  fullName: "Ana <Test>",
  email: "ana@example.com",
  phone: "+971500000000",
  skiLevel: "Getting there",
  shoeSize: "39",
  height: "165",
  weight: "60",
  dietary: "",
  nationality: "Spanish",
  passportOrigin: "Spain",
  passportNumber: "X1234567",
  dateOfBirth: "1992-04-03",
  passportExpiry: "2031-01-01",
  notes: "Knee injury last year",
};

describe("guest details form", () => {
  it("emails both hosts", () => {
    expect(guestFormRecipients).toEqual(["bautista@huellaretreat.com", "julie@huellaretreat.com"]);
  });

  it("accepts a complete response and lists every answer in the email", () => {
    const email = guestDetailsEmail(guestDetailsSchema.parse(sample));
    expect(email.subject).toBe("Guest details · Ana <Test> · Gudauri");
    expect(email.text).toContain("Passport number: X1234567");
    expect(email.text).toContain("Dietary needs and allergies: —");
    expect(email.text).toContain("Anything else: Knee injury last year");
    expect(email.html).toContain("Ana &lt;Test&gt;");
  });

  it("rejects an unknown ski level and a missing passport number", () => {
    expect(guestDetailsSchema.safeParse({ ...sample, skiLevel: "Pro" }).success).toBe(false);
    expect(guestDetailsSchema.safeParse({ ...sample, passportNumber: " " }).success).toBe(false);
  });
});

describe("saving a response", () => {
  const details = guestDetailsSchema.parse(sample);
  afterEach(() => vi.unstubAllGlobals());

  it("posts the answers and the shared secret to the sheet", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true })));
    vi.stubGlobal("fetch", fetchMock);
    await deliverGuestDetails(details, {
      GUEST_SHEET_URL: "https://sheet.test/exec",
      GUEST_SHEET_SECRET: "s3cret",
    });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://sheet.test/exec");
    expect(JSON.parse(init.body)).toEqual({ secret: "s3cret", details });
  });

  it("still succeeds when the email fails but the sheet saves it", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) =>
        Promise.resolve(
          url.includes("resend")
            ? new Response("bad", { status: 500 })
            : new Response(JSON.stringify({ ok: true })),
        ),
      ),
    );
    await expect(
      deliverGuestDetails(details, {
        RESEND_API_KEY: "k",
        GUEST_SHEET_URL: "https://sheet.test/exec",
        GUEST_SHEET_SECRET: "s",
      }),
    ).resolves.toBeUndefined();
  });

  it("fails when the sheet rejects the secret and there is no email", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false, error: "unauthorized" }))),
    );
    await expect(
      deliverGuestDetails(details, {
        GUEST_SHEET_URL: "https://sheet.test/exec",
        GUEST_SHEET_SECRET: "wrong",
      }),
    ).rejects.toMatchObject({ reason: "delivery_failed" });
  });

  it("attaches the payment proof to the email", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}"));
    vi.stubGlobal("fetch", fetchMock);
    const withProof = guestDetailsSchema.parse({
      ...sample,
      paymentProof: { name: "receipt.pdf", type: "application/pdf", data: "JVBERi0=" },
    });
    await deliverGuestDetails(withProof, { RESEND_API_KEY: "k" });
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body);
    expect(body.attachments).toEqual([{ filename: "receipt.pdf", content: "JVBERi0=" }]);
    expect(body.text).toContain("Payment proof: receipt.pdf (attached)");
  });

  it("rejects a payment proof that is not a PDF or image", () => {
    const bad = {
      ...sample,
      paymentProof: { name: "x.exe", type: "application/x-msdownload", data: "AAAA" },
    };
    expect(guestDetailsSchema.safeParse(bad).success).toBe(false);
  });

  it("fails when nothing is set up", async () => {
    await expect(deliverGuestDetails(details, {})).rejects.toMatchObject({
      reason: "not_configured",
    });
  });
});
