import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, Flower2, Heart, HeartPulse, Menu, MessageCircle, Sprout, Stethoscope, Users, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PrivacyNotice, SecureContactSection } from "@/components/secure-contact-section";
import { whatsappUrl } from "@/lib/contact";
import heroAsset from "@/assets/hero-vital-care.jpg.asset.json";
import heroSlide2Asset from "@/assets/hero-consulta-2.jpg.asset.json";
import heroSlide3Asset from "@/assets/hero-consulta-4.jpg.asset.json";
import logoAsset from "@/assets/logo.png.asset.json";
import logoNavAsset from "@/assets/logo-navbar.png.asset.json";
import fotoRecepcion from "@/assets/instalaciones-recepcion.jpg.asset.json";
import fotoMarca from "@/assets/instalaciones-marca.jpg.asset.json";
import fotoConsultorio from "@/assets/instalaciones-consultorio.jpg.asset.json";
import fotoValoracion from "@/assets/instalaciones-valoracion.jpg.asset.json";
import fotoEspera from "@/assets/instalaciones-espera.jpg.asset.json";
import fotoRecepcion2 from "@/assets/instalaciones-recepcion-2.jpg.asset.json";
import fotoDoctor from "@/assets/equipo-doctor.jpg.asset.json";
import fotoDoctora from "@/assets/equipo-doctora.jpg.asset.json";

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Vital Care",
  description: "Consultorio médico en Bogotá. Consultas de 40 minutos, medicina humana y atención personalizada.",
  url: "https://happy-patient-reach.lovable.app/",
  telephone: "+57 313 850 1503",
  email: "vitalcareconsultoriosmedicos@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressRegion: "Bogotá D.C.",
    addressCountry: "CO",
    streetAddress: "Sector El Lago – Gaitán, cerca del Centro Comercial Unilago",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "11:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "14:00",
    },
  ],
};

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Vital Care | Tu salud merece tiempo · Bogotá" },
      { name: "description", content: "40 minutos para escucharte. Consulta médica integral, prevención y seguimiento personalizado en El Lago – Gaitán, Bogotá. Agenda en Vital Care." },
      { property: "og:title", content: "Vital Care | Tu salud merece tiempo" },
      { property: "og:description", content: "Medicina humana, consultas de 40 minutos y atención personalizada en Bogotá. Conoce Vital Care y solicita tu cita." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://happy-patient-reach.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://happy-patient-reach.lovable.app/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(medicalBusinessJsonLd) }],
  }),
  component: Index,
});

const links = [{ href: "#nosotros", label: "¿Por qué Vital Care?" }, { href: "#servicios", label: "Servicios" }, { href: "#modelo", label: "Nuestra atención" }, { href: "#contacto", label: "Contacto" }];

function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="page-width flex h-[100px] items-center justify-between gap-6"><a href="#inicio" aria-label="Vital Care, inicio"><img src={logoNavAsset.url} alt="Vital Care — Consultorio médico" width="108" height="80" className="h-[80px] w-auto object-contain" /></a><nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">{links.map(link => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}</nav><div className="flex items-center gap-3"><Button asChild variant="nav" size="care" className="hidden sm:inline-flex"><a href="#contacto"><CalendarDays /> Agendar mi cita <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div></div>{open && <nav id="mobile-nav" aria-label="Navegación móvil" className="page-width flex flex-col gap-5 border-t border-border py-5 lg:hidden">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="nav-link">{link.label}</a>)}<Button variant="nav" asChild><a href="#contacto" onClick={() => setOpen(false)}>Agendar mi cita <ArrowUpRight /></a></Button></nav>}</header>;
}

const heroHighlights = [
  { icon: MessageCircle, title: "Escucha", copy: "Tiempo real para ti" },
  { icon: Users, title: "Atención personalizada", copy: "Según tus necesidades" },
  { icon: Heart, title: "Medicina humana", copy: "Confianza y empatía" },
  { icon: Flower2, title: "Un ambiente diferente", copy: "Tranquilo y acogedor" },
];

function HeroHighlights() {
  return <ul className="hero-badges" aria-label="Lo que encontrarás en Vital Care">{heroHighlights.map(item => <li className="hero-badge" key={item.title}><span className="hero-badge-icon"><item.icon size={19} strokeWidth={1.7} /></span><span><span className="hero-badge-title">{item.title}</span><span className="hero-badge-sub">{item.copy}</span></span></li>)}</ul>;
}

const heroSlides = [
  {
    photo: heroAsset,
    alt: "Profesional de la salud de Vital Care atendiendo frente a su computador, con el logo de la clínica en la pantalla",
    eyebrow: "Medicina humana en Bogotá",
    titleA: "Tu salud merece",
    titleB: "tiempo.",
    lead: <>40 minutos para escucharte.<br />Medicina para cuidarte.</>,
    sub: "Una consulta sin afanes, donde te escuchamos, comprendemos tu historia y cuidamos de ti.",
  },
  {
    photo: heroSlide2Asset,
    alt: "Médica escuchando con cercanía a un paciente adulto mayor en el consultorio de Vital Care",
    eyebrow: "Atención cercana y sin afanes",
    titleA: "Una consulta que",
    titleB: "te escucha.",
    lead: <>Conocemos tu historia.<br />Cuidamos de ti, a tu ritmo.</>,
    sub: "Atención personalizada para cada etapa de la vida, con el tiempo y la calidez que tu salud merece.",
  },
  {
    photo: heroSlide3Asset,
    alt: "Médico conversando con una futura mamá en una consulta relajada de Vital Care",
    eyebrow: "Cuidado en cada momento de tu vida",
    titleA: "Acompañamos tu",
    titleB: "bienestar.",
    lead: <>Consultas pausadas y cercanas.<br />Para ti y tu familia.</>,
    sub: "Un espacio tranquilo donde responderemos tus preguntas y te acompañamos con confianza en cada etapa.",
  },
];

function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive(i => (i + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(id);
  }, [paused, active]);

  const slide = heroSlides[active]!;
  return <section className="hero" id="inicio" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>{heroSlides.map((item, i) => <img key={item.photo.url} src={item.photo.url} alt={i === active ? item.alt : ""} aria-hidden={i !== active} className={`hero-photo${i === active ? " is-active" : ""}`} loading={i === 0 ? undefined : "lazy"} fetchPriority={i === 0 ? "high" : undefined} />)}<div className="page-width"><div className="hero-copy"><div className="reveal" key={active} aria-live="polite"><div className="eyebrow">{slide.eyebrow}</div><h1>{slide.titleA}<br /><span className="text-primary">{slide.titleB}</span></h1><p className="text-xl font-medium leading-relaxed">{slide.lead}</p><p className="mt-5 max-w-[380px] text-sm leading-7 text-muted-foreground">{slide.sub}</p></div><div className="mt-7 flex flex-wrap gap-3"><Button variant="care" size="care" asChild><a href="#contacto"><CalendarDays /> Agendar mi cita <ArrowUpRight /></a></Button><Button variant="whatsapp" size="care" asChild><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Escribir por WhatsApp</a></Button></div><div className="mt-6 flex items-center gap-2 text-[13px] font-bold text-muted-foreground"><MapPinSmall /> Cra, 16 # 79-20 Oficina 716, Bogotá, Colombia</div><div className="hero-dots" role="group" aria-label="Elegir banner del inicio">{heroSlides.map((item, i) => <button key={item.photo.url} type="button" className={`hero-dot${i === active ? " is-active" : ""}`} aria-label={`Ver banner ${i + 1} de ${heroSlides.length}`} aria-pressed={i === active} onClick={() => setActive(i)} />)}</div></div><HeroHighlights /></div></section>;
}
function MapPinSmall() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>; }

function WhatsAppMark() { return <svg viewBox="0 0 24 24" aria-hidden="true" className="stroke-whatsapp-halo" strokeWidth="1.2" strokeLinejoin="round" paintOrder="stroke"><path className="fill-whatsapp" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" /><g transform="translate(12 12) scale(0.86) translate(-12 -12)" stroke="none"><path className="fill-whatsapp-halo" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-1.958-.173-.199-.018-.307.13-.456.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></g></svg>; }

function WhyCare() {
  const features = [
    { icon: Clock3, title: "40 minutos contigo", copy: "El tiempo que necesitas para hablar, preguntar y sentirte escuchado. Sin prisas, sin afanes.", note: "Tu tiempo importa" },
    { icon: Users, title: "Atención personalizada", copy: "Tu historia es única. Tu atención también. Cuidamos de ti según tus necesidades y etapa de vida.", note: "Cuidado pensado para ti" },
    { icon: Heart, title: "Medicina humana", copy: "Más allá de los síntomas, vemos a la persona. Cercanía, respeto y empatía en cada encuentro.", note: "Personas cuidando personas" },
  ];
  return <section id="nosotros" className="py-16 md:py-20"><div className="page-width"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="eyebrow">La diferencia está en el cuidado</div><h2 className="section-heading mt-4">Aquí, tú eres la prioridad.</h2></div><p className="section-copy max-w-[330px]">Creemos en una medicina que se toma el tiempo de conocerte y acompañarte.</p></div><div className="mt-9 grid gap-5 md:grid-cols-3">{features.map(item => <article className="care-card" key={item.title}><span className="icon-tile"><item.icon size={23} strokeWidth={1.6} /></span><h3 className="mt-5 text-lg font-bold">{item.title}</h3><p className="section-copy mt-3">{item.copy}</p><div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-[11px] font-semibold text-gold"><Check size={13} />{item.note}</div></article>)}</div></div></section>;
}

function Services() {
  const services = [
    { icon: Stethoscope, title: "Consulta médica integral", copy: "Una valoración completa para entender cómo estás y definir juntos el camino hacia tu bienestar." },
    { icon: Users, title: "Cada etapa de tu vida", copy: "Atención para la infancia, la adultez y la persona mayor. Un cuidado que evoluciona contigo." },
    { icon: HeartPulse, title: "Seguimiento de enfermedades crónicas", copy: "Acompañamiento continuo y cercano para el manejo de tus condiciones de salud." },
    { icon: Sprout, title: "Prevención y bienestar", copy: "Anticiparnos también es cuidar. Valoración de riesgos y orientación para hábitos saludables." },
  ];
  return <section id="servicios" className="bg-secondary py-16 md:py-20"><div className="page-width"><div className="flex flex-col items-center text-center"><div className="eyebrow">Nuestros servicios</div><h2 className="section-heading mt-4">Cuidarte, en cada etapa.</h2><p className="section-copy mt-3">Atención médica integral, con la cercanía que mereces.</p></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(item => <article className="care-card flex flex-col" key={item.title}><item.icon className="size-7 text-primary" strokeWidth={1.5} /><h3 className="mb-3 mt-5 text-base font-bold leading-6">{item.title}</h3><p className="section-copy mb-6">{item.copy}</p><a className="service-link mt-auto" href="#contacto">Agendar consulta <ArrowRight size={14} /></a></article>)}</div></div></section>;
}

const facilitiesPhotos = [
  { src: fotoRecepcion, alt: "Recepción de Vital Care con sofá y mural de madera", caption: "Recepción", span: "facility-wide-tall" },
  { src: fotoEspera, alt: "Zona de espera con butacas y puerta de vidrio con el logo de Vital Care", caption: "Zona de espera", span: "facility-wide" },
  { src: fotoMarca, alt: "Mural con el nombre de los médicos y el logo de Vital Care", caption: "Nuestra identidad", span: "" },
  { src: fotoConsultorio, alt: "Consultorio médico con escritorio y sillas de atención", caption: "Consultorio", span: "" },
  { src: fotoValoracion, alt: "Área de valoración física con camilla y equipo médico", caption: "Área de valoración", span: "facility-wide" },
  { src: fotoRecepcion2, alt: "Mostrador de recepción con señal de salida de emergencia", caption: "Siempre listos para recibirte", span: "facility-wide" },
];

function Facilities() {
  return <section id="instalaciones" className="bg-secondary py-16 md:py-20"><div className="page-width"><div className="flex flex-col items-center text-center"><div className="eyebrow justify-center">Nuestras instalaciones</div><h2 className="section-heading mt-4">Un espacio creado para<br />que te sientas en confianza.</h2><p className="section-copy mt-4 max-w-xl">Creemos que el ambiente también cuida. Nuestras instalaciones están pensadas para que, desde el momento en que llegas, te reciban la calidez, la tranquilidad y la privacidad que tu visita merece.</p></div><div className="facilities-grid mt-11">{facilitiesPhotos.map(photo => <figure className={`facility-card ${photo.span}`} key={photo.caption}><img src={photo.src.url} alt={photo.alt} className="facility-photo" loading="lazy" /><figcaption className="facility-caption">{photo.caption}</figcaption></figure>)}</div></div></section>;
}

// Preguntas frecuentes: se muestran como lista desplegable encima del formulario de cita.
const faqs = [
  { q: "¿Cómo puedo agendar una cita médica?", a: "Puedes agendar tu cita a través de nuestra página web o contactarnos por WhatsApp para consultar la disponibilidad de horarios." },
  { q: "¿Cuánto cuesta una consulta médica?", a: "El precio depende del tipo de atención. Puedes consultar nuestras tarifas actualizadas en la sección de servicios de la página web o directamente con nuestro número de WhatsApp." },
  { q: "¿Qué servicios médicos ofrece Vital Care?", a: "Ofrecemos consultas médicas integrales, atención preventiva y seguimiento de condiciones de salud, según los servicios disponibles en el consultorio." },
  { q: "¿Qué debo llevar a mi cita?", a: "Te recomendamos llevar tu documento de identidad, los resultados de exámenes recientes y una lista de los medicamentos que utilizas." },
  { q: "¿Puedo cancelar o reprogramar mi cita?", a: "Sí. Comunícate con nosotros con la mayor anticipación posible para consultar las opciones de reprogramación." },
];

function FAQ() {
  return <section id="faq" className="py-16 md:py-20"><div className="page-width"><div className="flex flex-col items-center text-center"><div className="eyebrow justify-center">Preguntas frecuentes</div><h2 className="section-heading mt-4">Resolvemos tus dudas<br />antes de tu visita.</h2><p className="section-copy mt-4 max-w-xl">Antes de agendar es normal tener preguntas. Aquí reunimos las que más nos hacen, con respuestas claras y sin rodeos. Si la tuya no aparece, escríbenos por WhatsApp y con gusto te ayudamos.</p></div><Accordion type="single" collapsible defaultValue="faq-0" className="faq-list mt-11">{faqs.map((item, i) => <AccordionItem className="faq-item" value={`faq-${i}`} key={item.q}><AccordionTrigger className="faq-trigger">{item.q}</AccordionTrigger><AccordionContent className="faq-answer">{item.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>;
}

function Team() {
  return <section id="equipo" className="py-16 md:py-20"><div className="page-width team-grid"><div className="team-photo-frame"><img src={fotoDoctor.url} alt="Profesional de la salud de Vital Care con uniforme médico naranja, estetoscopio y lentes, sentado tras su escritorio en el consultorio" className="team-photo" loading="lazy" /></div><div className="team-copy-col"><div className="eyebrow">Nuestro equipo</div><h2 className="team-heading mt-4">Profesionales que te cuidan, personas que te escuchan.</h2><p className="team-copy mt-5">En Vital Care creemos que una buena atención médica comienza escuchándote. Nuestro equipo de profesionales está comprometido con brindarte una atención cercana, humana y personalizada, en un espacio donde puedas expresar tus inquietudes, resolver tus dudas y sentirte acompañado en el cuidado de tu salud.</p></div><div className="team-photo-frame"><img src={fotoDoctora.url} alt="Profesional de la salud de Vital Care con uniforme médico naranja y estetoscopio, sentada tras su escritorio en el consultorio" className="team-photo" loading="lazy" /></div></div></section>;
}

function CareModel() {
  const steps = [{ title: "Escuchamos", copy: "Te damos el espacio para compartir lo que sientes y lo que te preocupa." }, { title: "Comprendemos", copy: "Conocemos tu historia y valoramos tu salud de forma integral." }, { title: "Orientamos", copy: "Te explicamos con claridad y construimos un plan de cuidado contigo." }, { title: "Acompañamos", copy: "Seguimos a tu lado para cuidar tu salud más allá de la consulta." }];
  return <section id="modelo" className="py-16 md:py-20"><div className="page-width"><div className="text-center"><div className="eyebrow justify-center">Nuestro modelo de atención</div><h2 className="section-heading mt-4">Un cuidado que empieza por escucharte.</h2><p className="section-copy mt-3">Cuatro pasos. Una misma intención: tu bienestar.</p></div><div className="steps mt-11 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, i) => <div key={step.title} className="relative"><span className="step-number">0{i + 1}</span><h3 className="mt-5 text-lg font-bold">{step.title}</h3><p className="section-copy mt-2 max-w-[240px]">{step.copy}</p></div>)}</div></div></section>;
}

const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3976.5959367964315!2d-74.0581601!3d4.6659057!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b4428136b71%3A0x22e6325f9907ec65!2sVital%20Care%20Consultorio%20M%C3%A9dico!5e0!3m2!1ses!2sco!4v1792180655860!5m2!1ses!2sco";

function Location() {
  return <section id="ubicacion" className="bg-secondary py-16 md:py-20"><div className="page-width"><div className="flex flex-col items-center text-center"><div className="eyebrow justify-center">Nuestra ubicación</div><h2 className="section-heading mt-4">Encuéntranos en El Lago – Gaitán.</h2><p className="section-copy mt-4 max-w-xl">Estamos en Bogotá, cerca del Centro Comercial Unilago. Un espacio de fácil acceso para que llegar a tu cita sea tan sencillo como cuidarte. Te esperamos.</p></div><div className="map-frame mt-10"><iframe title="Mapa de ubicación de Vital Care Consultorio Médico en Bogotá" src={mapEmbedUrl} className="map-embed" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div><div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row"><p className="flex items-center gap-2"><MapPinSmall /> Sector El Lago – Gaitán, cerca del Centro Comercial Unilago, Bogotá</p><Button variant="care" size="sm" asChild><a href="https://www.google.com/maps/place/Vital+Care+Consultorio+M%C3%A9dico/@4.6659057,-74.0581601,17z" target="_blank" rel="noreferrer">Cómo llegar <ArrowUpRight /></a></Button></div></div></section>;
}

function Footer() { return <footer className="bg-footer py-10 text-primary-foreground"><div className="page-width"><div className="flex flex-col justify-between gap-8 md:flex-row"><div className="flex items-center gap-5"><img src={logoAsset.url} alt="Vital Care" width="110" height="100" className="h-[95px] w-[110px] object-contain" loading="lazy" /><div><p className="text-base font-semibold">Tu salud merece tiempo.</p><p className="mt-2 text-xs leading-6 text-footer-muted">Medicina humana. Cuidado cercano.<br />Cra, 16 # 79-20 Oficina 716, Bogotá, Colombia</p></div></div><nav aria-label="Enlaces del pie de página" className="flex flex-wrap items-center gap-6 text-xs text-footer-muted"><a href="#nosotros">Vital Care</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a><PrivacyNotice>Privacidad</PrivacyNotice></nav></div><div className="mt-7 flex flex-col justify-between gap-3 border-t border-footer-muted/20 pt-6 text-[11px] text-footer-muted sm:flex-row"><p>© {new Date().getFullYear()} Vital Care. Todos los derechos reservados.</p><p>Este sitio no sustituye una valoración médica. En una emergencia, llama al 123.</p></div></div></footer>; }

function Index() {
  return <><Navigation /><main><Hero /><WhyCare /><Services /><Team /><CareModel /><section className="bg-primary py-9 text-primary-foreground"><div className="page-width flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><div className="flex items-center gap-5"><Heart className="hidden size-9 shrink-0 text-gold-soft sm:block" strokeWidth={1.3} /><div><h2 className="text-xl font-semibold">No tienes que cuidar de tu salud a solas.</h2><p className="mt-2 text-sm text-primary-foreground/80">Estamos aquí para escucharte y acompañarte.</p></div></div><Button variant="gold" size="care" asChild><a href="#contacto">Demos el primer paso <ArrowUpRight /></a></Button></div></section><Facilities /><FAQ /><SecureContactSection /><Location /></main><Footer /><Button variant="whatsapp" size="icon" asChild className="float-wa fixed bottom-6 right-6 z-20 rounded-full"><a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar Vital Care por WhatsApp" title="Escribir por WhatsApp"><WhatsAppMark /></a></Button></>;
}
