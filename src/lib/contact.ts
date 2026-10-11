import { z } from "zod";

export const whatsappUrl = "https://wa.me/573138501503?text=" + encodeURIComponent("Hola, Vital Care. Quisiera agendar una consulta médica.");
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo.").max(80, "Máximo 80 caracteres."),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/, "Escribe un teléfono válido."),
  email: z.string().trim().email("Escribe un correo válido.").max(120),
  service: z.enum(["Consulta médica integral", "Valoración por etapas de vida", "Seguimiento de enfermedades crónicas", "Prevención y bienestar"]),
  consent: z.boolean().refine(value => value, "Necesitamos tu autorización para contactarte."),
  website: z.string().max(0, "No se pudo preparar la solicitud."),
});

export function createContactMail(data: z.infer<typeof contactSchema>) {
  const body = `Hola, Vital Care. Quisiera solicitar una cita.\n\nNombre: ${data.name}\nTeléfono: ${data.phone}\nCorreo: ${data.email}\nServicio: ${data.service}\n\nAutorizo que Vital Care me contacte para coordinar esta solicitud.`;
  return `mailto:vitalcare@gmail.com?subject=${encodeURIComponent("Solicitud de cita — Vital Care")}&body=${encodeURIComponent(body)}`;
}