import { describe, expect, it } from "vitest";
import { contactSchema, createContactMail } from "@/lib/contact";

const valid = { name: "Ana Pérez", phone: "+57 313 8501503", email: "ana@example.com", service: "Consulta médica integral" as const, consent: true, website: "" };
describe("Secure contact", () => {
  it("accepts valid contact data", () => { expect(contactSchema.safeParse(valid).success).toBe(true); });
  it("rejects bot submissions, invalid email, phone and absent consent", () => {
    for (const change of [{ website: "spam" }, { email: "not-email" }, { phone: "abc" }, { consent: false }, { name: "" }]) expect(contactSchema.safeParse({ ...valid, ...change }).success).toBe(false);
  });
  it("encodes fields into the mail body rather than adding headers", () => {
    const href = createContactMail({ ...valid, name: "Ana & Juan?" });
    expect(href).toMatch(/^mailto:vitalcare@gmail.com\?subject=/);
    expect(href).toContain("Ana%20%26%20Juan%3F");
    expect(href).not.toContain("&cc=");
  });
});