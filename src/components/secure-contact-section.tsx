import { useState, type FormEvent } from "react";
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { contactSchema, createContactMail, whatsappUrl } from "@/lib/contact";

export function PrivacyNotice({ children }: { children?: React.ReactNode }) {
  return <Dialog><DialogTrigger asChild><Button variant="link" className="h-auto p-0 text-xs">{children || "Privacidad y tratamiento de datos"}</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Privacidad de tu solicitud</DialogTitle></DialogHeader><div className="space-y-4 text-sm leading-7 text-muted-foreground"><p>El formulario prepara un correo para vitalcare@gmail.com en tu aplicación de correo. Los datos no se guardan en esta página y solo se envían cuando confirmas el envío en tu correo.</p><p>Tu nombre, teléfono, correo y servicio solicitado se utilizarán para coordinar tu cita. No incluyas diagnósticos, historia clínica ni otros datos sensibles.</p><p>WhatsApp y tu proveedor de correo tienen sus propias condiciones de privacidad. Para consultar sobre tus datos o retirar tu autorización, escribe a vitalcare@gmail.com.</p></div></DialogContent></Dialog>;
}

export function SecureContactSection() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(false);
    const form = new FormData(event.currentTarget);
    const result = contactSchema.safeParse({ name: form.get("name"), phone: form.get("phone"), email: form.get("email"), service: form.get("service"), consent: form.get("consent") === "on", website: form.get("website") });
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map(issue => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    window.location.href = createContactMail(result.data);
    setPrepared(true);
  }
  return <section id="contacto" className="py-20 md:py-24"><div className="page-width grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
    <div><div className="eyebrow">Estamos para ti</div><h2 className="section-heading mt-4">El primer paso para<br />sentirte mejor.</h2><p className="section-copy mt-4 max-w-sm">Conversemos. Agenda tu consulta y encuentra un espacio donde tu salud es la prioridad.</p>
      <div className="mt-9 space-y-6">
        <div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-gold" /><div><h3 className="text-sm font-bold">Visítanos en Bogotá</h3><p className="section-copy mt-1">Sector El Lago – Gaitán<br />Cerca del Centro Comercial Unilago</p><a className="service-link mt-2" href="https://www.google.com/maps/search/?api=1&query=El+Lago+Gaitan+Unilago+Bogota" target="_blank" rel="noopener noreferrer">Ver zona en el mapa <ArrowUpRight size={14} /></a></div></div>
        <div className="flex gap-4"><Clock3 className="mt-1 size-5 shrink-0 text-gold" /><div><h3 className="text-sm font-bold">Horarios de atención</h3><p className="section-copy mt-1">Lunes a viernes<br />7:00 a.m. – 11:30 a.m. / 3:00 p.m. – 7:00 p.m.<br /><span className="mt-2 inline-block">Sábados: 7:00 a.m. – 2:00 p.m.</span></p></div></div>
        <div className="flex gap-4"><Phone className="mt-1 size-5 shrink-0 text-gold" /><div><a href="tel:+573138501503" className="text-sm font-bold">+57 313 850 1503</a><a href="mailto:vitalcare@gmail.com" className="section-copy mt-1 block">vitalcare@gmail.com</a></div></div>
      </div><Button variant="whatsapp" size="care" className="mt-8" asChild><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle /> Escribir por WhatsApp <ArrowUpRight /></a></Button>
    </div>
    <div className="rounded-2xl border border-border bg-secondary/60 p-6 md:p-8"><div className="flex items-center gap-3"><span className="icon-tile"><Mail size={21} /></span><div><h3 className="text-xl font-bold">Solicita tu cita</h3><p className="mt-1 text-xs text-muted-foreground">Te contactaremos para coordinar día y hora.</p></div></div>
      <form onSubmit={submit} noValidate className="mt-7 space-y-5">
        <div><label className="field-label" htmlFor="name">Nombre completo</label><input id="name" name="name" autoComplete="name" placeholder="¿Cómo te llamas?" maxLength={80} className="form-field" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <p id="name-error" className="form-error">{errors.name}</p>}</div>
        <div className="grid gap-5 sm:grid-cols-2">{[{ name: "phone", label: "Teléfono", placeholder: "Tu número de contacto", type: "tel", complete: "tel" }, { name: "email", label: "Correo electrónico", placeholder: "nombre@correo.com", type: "email", complete: "email" }].map(field => <div key={field.name}><label className="field-label" htmlFor={field.name}>{field.label}</label><input id={field.name} name={field.name} type={field.type} autoComplete={field.complete} placeholder={field.placeholder} maxLength={120} className="form-field" aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} />{errors[field.name] && <p id={`${field.name}-error`} className="form-error">{errors[field.name]}</p>}</div>)}</div>
        <div><label className="field-label" htmlFor="service">¿En qué podemos ayudarte?</label><select id="service" name="service" defaultValue="Consulta médica integral" className="form-field">{contactSchema.shape.service.options.map(value => <option key={value}>{value}</option>)}</select></div>
        <div className="honeypot" aria-hidden="true"><label htmlFor="website">Sitio web</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <div><label className="flex items-start gap-3 text-xs leading-5 text-muted-foreground"><input type="checkbox" name="consent" className="mt-1 accent-primary" aria-describedby={errors.consent ? "consent-error" : undefined} />Autorizo el uso de mis datos para ser contactado y coordinar mi cita.</label><div className="ml-6"><PrivacyNotice /></div>{errors.consent && <p id="consent-error" className="form-error">{errors.consent}</p>}</div>
        {errors.website && <p className="form-error" role="alert">{errors.website}</p>}
        <Button type="submit" variant="care" size="care" className="w-full">Solicitar mi cita <ArrowUpRight /></Button>
        <p className="text-center text-[11px] leading-5 text-muted-foreground">Se abrirá tu correo con la solicitud; confirma allí el envío.<br />No incluyas información clínica o datos sensibles.</p>
        {prepared && <p role="status" className="rounded-lg bg-sage-soft p-3 text-xs leading-5 text-sage">Solicitud preparada. Confirma el envío en tu aplicación de correo. Si no se abrió, puedes escribirnos por WhatsApp.</p>}
      </form><div className="mt-5 flex items-center justify-center gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground"><ShieldCheck size={14} /> Tu privacidad también es parte de nuestro cuidado.</div>
    </div>
  </div></section>;
}