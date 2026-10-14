import { afterEach, describe, expect, it, vi } from "vitest";
import { contactSchema, createContactMail, createAppointmentWhatsApp } from "@/lib/contact";

const valid = { name: "Ana Pérez", phone: "+57 313 8501503", email: "ana@example.com", service: "Consulta médica integral" as const, preferredDate: "2099-10-12", consent: true, website: "" };
afterEach(() => { vi.useRealTimers(); });
describe("Secure contact", () => {
  it("accepts valid contact data", () => { expect(contactSchema.safeParse(valid).success).toBe(true); });
  it("rejects bot submissions, invalid email, phone and absent consent", () => {
    for (const change of [{ website: "spam" }, { email: "not-email" }, { phone: "abc" }, { consent: false }, { name: "" }]) expect(contactSchema.safeParse({ ...valid, ...change }).success).toBe(false);
  });
  it("encodes fields into the mail body rather than adding headers", () => {
    const href = createContactMail({ ...valid, name: "Ana & Juan?" });
    expect(href).toMatch(/^mailto:vitalcareconsultoriosmedicos@gmail.com\?subject=/);
    expect(href).toContain("Ana%20%26%20Juan%3F");
    expect(href).not.toContain("&cc=");
  });
  it("rejects missing, malformed, past and Sunday dates", () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date("2026-10-11T12:00:00Z"));
    for (const preferredDate of ["", "2026-02-30", "2026-10-10", "2026-10-11", "nonsense"]) expect(contactSchema.safeParse({ ...valid, preferredDate }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, preferredDate: "2026-10-12" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, preferredDate: "2026-10-17" }).success).toBe(true);
  });
  it("validates again and includes date and contact data in both handoffs", () => {
    expect(() => createContactMail({ ...valid, website: "bot" })).toThrow();
    expect(() => createAppointmentWhatsApp({ ...valid, email: "bad" })).toThrow();
    for (const url of [createContactMail(valid), createAppointmentWhatsApp(valid)]) {
      expect(decodeURIComponent(url)).toContain("Fecha preferida:");
      expect(decodeURIComponent(url)).toContain("Ana Pérez");
      expect(decodeURIComponent(url)).toContain("sujeta a disponibilidad");
    }
  });
});