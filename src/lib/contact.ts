import { z } from "zod";

export const whatsappUrl = "https://wa.me/573138501503?text=" + encodeURIComponent("Hola, Vital Care. Quisiera agendar una consulta médica.");
export function todayInBogota() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const part = (name: string) => parts.find(value => value.type === name)?.value || "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}
const preferredDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Selecciona una fecha preferida.").superRefine((value, context) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return;
  const date = new Date(`${value}T12:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    context.addIssue({ code: "custom", message: "Selecciona una fecha válida." });
    return;
  }
  if (value < todayInBogota()) context.addIssue({ code: "custom", message: "La fecha no puede estar en el pasado." });
  if (date.getUTCDay() === 0) context.addIssue({ code: "custom", message: "Atendemos de lunes a sábado. Elige otro día." });
});
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo.").max(80, "Máximo 80 caracteres."),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/, "Escribe un teléfono válido."),
  email: z.string().trim().email("Escribe un correo válido.").max(120),
  service: z.enum(["Consulta médica integral", "Valoración por etapas de vida", "Seguimiento de enfermedades crónicas", "Prevención y bienestar"]),
  preferredDate: preferredDateSchema,
  consent: z.boolean().refine(value => value, "Necesitamos tu autorización para contactarte."),
  website: z.string().max(0, "No se pudo preparar la solicitud."),
});

export type AppointmentRequest = z.infer<typeof contactSchema>;
export function formatPreferredDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00Z`));
}
function requestBody(input: AppointmentRequest) {
  const data = contactSchema.parse(input);
  return `Hola, Vital Care. Quisiera solicitar una cita.\n\nNombre: ${data.name}\nTeléfono: ${data.phone}\nCorreo: ${data.email}\nServicio: ${data.service}\nFecha preferida: ${formatPreferredDate(data.preferredDate)}\n\nEntiendo que la fecha está sujeta a disponibilidad y que la cita solo queda confirmada cuando Vital Care me contacte.\nAutorizo que Vital Care me contacte para coordinar esta solicitud.`;
}
export function createContactMail(data: AppointmentRequest) {
  const body = requestBody(data);
  return `mailto:vitalcareconsultoriosmedicos@gmail.com?subject=${encodeURIComponent("Solicitud de cita — Vital Care")}&body=${encodeURIComponent(body)}`;
}
export function createAppointmentWhatsApp(data: AppointmentRequest) {
  return `https://wa.me/573138501503?text=${encodeURIComponent(requestBody(data))}`;
}