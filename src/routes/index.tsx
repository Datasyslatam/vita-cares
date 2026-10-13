import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, Flower2, Heart, HeartPulse, Menu, MessageCircle, Sprout, Stethoscope, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyNotice, SecureContactSection } from "@/components/secure-contact-section";
import { whatsappUrl } from "@/lib/contact";
import heroAsset from "@/assets/hero-consulta-3.jpg.asset.json";
import heroSlide2Asset from "@/assets/hero-consulta-2.jpg.asset.json";
import logoAsset from "@/assets/logo.png.asset.json";
import fotoRecepcion from "@/assets/instalaciones-recepcion.jpg.asset.json";
import fotoMarca from "@/assets/instalaciones-marca.jpg.asset.json";
import fotoConsultorio from "@/assets/instalaciones-consultorio.jpg.asset.json";
import fotoValoracion from "@/assets/instalaciones-valoracion.jpg.asset.json";
import fotoEspera from "@/assets/instalaciones-espera.jpg.asset.json";
import fotoRecepcion2 from "@/assets/instalaciones-recepcion-2.jpg.asset.json";

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Vital Care",
  description: "Consultorio médico en Bogotá. Consultas de 40 minutos, medicina humana y atención personalizada.",
  url: "https://happy-patient-reach.lovable.app/",
  telephone: "+57 313 850 1503",
  email: "vitalcare@gmail.com",
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
  return <header className="site-header"><div className="page-width flex h-[100px] items-center justify-between gap-6"><a href="#inicio" aria-label="Vital Care, inicio"><img src={logoAsset.url} alt="Vital Care — Consultorio médico" className="h-[80px] w-[116px] object-contain" /></a><nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">{links.map(link => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}</nav><div className="flex items-center gap-3"><Button asChild variant="care" size="care" className="hidden sm:inline-flex"><a href="#contacto"><CalendarDays /> Agendar mi cita <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div></div>{open && <nav id="mobile-nav" aria-label="Navegación móvil" className="page-width flex flex-col gap-5 border-t border-border py-5 lg:hidden">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="nav-link">{link.label}</a>)}<Button variant="care" asChild><a href="#contacto" onClick={() => setOpen(false)}>Agendar mi cita <ArrowUpRight /></a></Button></nav>}</header>;
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
    alt: "Médico escuchando con atención a un paciente durante una consulta",
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
];

function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive(i => (i + 1) % heroSlides.length), 8000);
    return () => window.clearInterval(id);
  }, [paused, active]);

  const slide = heroSlides[active]!;
  return <section className="hero" id="inicio" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>{heroSlides.map((item, i) => <img key={item.photo.url} src={item.photo.url} alt={i === active ? item.alt : ""} aria-hidden={i !== active} className={`hero-photo${i === active ? " is-active" : ""}`} loading={i === 0 ? undefined : "lazy"} fetchPriority={i === 0 ? "high" : undefined} />)}<div className="page-width"><div className="hero-copy"><div className="reveal" key={active} aria-live="polite"><div className="eyebrow">{slide.eyebrow}</div><h1>{slide.titleA}<br /><span className="text-primary">{slide.titleB}</span></h1><p className="text-xl font-medium leading-relaxed">{slide.lead}</p><p className="mt-5 max-w-[380px] text-sm leading-7 text-muted-foreground">{slide.sub}</p></div><div className="mt-7 flex flex-wrap gap-3"><Button variant="care" size="care" asChild><a href="#contacto"><CalendarDays /> Agendar mi cita <ArrowUpRight /></a></Button><Button variant="whatsapp" size="care" asChild><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Escribir por WhatsApp</a></Button></div><div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><MapPinSmall /> El Lago – Gaitán, Bogotá <span className="mx-1 text-gold">·</span> Cerca de Unilago</div><div className="hero-dots" role="group" aria-label="Elegir banner del inicio">{heroSlides.map((item, i) => <button key={item.photo.url} type="button" className={`hero-dot${i === active ? " is-active" : ""}`} aria-label={`Ver banner ${i + 1} de ${heroSlides.length}`} aria-pressed={i === active} onClick={() => setActive(i)} />)}</div></div><HeroHighlights /></div></section>;
}
function MapPinSmall() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>; }

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

function CareModel() {
  const steps = [{ title: "Escuchamos", copy: "Te damos el espacio para compartir lo que sientes y lo que te preocupa." }, { title: "Comprendemos", copy: "Conocemos tu historia y valoramos tu salud de forma integral." }, { title: "Orientamos", copy: "Te explicamos con claridad y construimos un plan de cuidado contigo." }, { title: "Acompañamos", copy: "Seguimos a tu lado para cuidar tu salud más allá de la consulta." }];
  return <section id="modelo" className="py-16 md:py-20"><div className="page-width"><div className="text-center"><div className="eyebrow justify-center">Nuestro modelo de atención</div><h2 className="section-heading mt-4">Un cuidado que empieza por escucharte.</h2><p className="section-copy mt-3">Cuatro pasos. Una misma intención: tu bienestar.</p></div><div className="steps mt-11 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, i) => <div key={step.title} className="relative"><span className="step-number">0{i + 1}</span><h3 className="mt-5 text-lg font-bold">{step.title}</h3><p className="section-copy mt-2 max-w-[240px]">{step.copy}</p></div>)}</div></div></section>;
}

function Footer() { return <footer className="bg-footer py-10 text-primary-foreground"><div className="page-width"><div className="flex flex-col justify-between gap-8 md:flex-row"><div className="flex items-center gap-5"><img src={logoAsset.url} alt="Vital Care" width="110" height="100" className="h-[95px] w-[110px] object-contain" loading="lazy" /><div><p className="text-base font-semibold">Tu salud merece tiempo.</p><p className="mt-2 text-xs leading-6 text-footer-muted">Medicina humana. Cuidado cercano.<br />El Lago – Gaitán, Bogotá.</p></div></div><nav aria-label="Enlaces del pie de página" className="flex flex-wrap items-center gap-6 text-xs text-footer-muted"><a href="#nosotros">Vital Care</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a><PrivacyNotice>Privacidad</PrivacyNotice></nav></div><div className="mt-7 flex flex-col justify-between gap-3 border-t border-footer-muted/20 pt-6 text-[11px] text-footer-muted sm:flex-row"><p>© {new Date().getFullYear()} Vital Care. Todos los derechos reservados.</p><p>Este sitio no sustituye una valoración médica. En una emergencia, llama al 123.</p></div></div></footer>; }

function Index() {
  return <><Navigation /><main><Hero /><WhyCare /><Services /><CareModel /><section className="bg-primary py-9 text-primary-foreground"><div className="page-width flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><div className="flex items-center gap-5"><Heart className="hidden size-9 shrink-0 text-gold-soft sm:block" strokeWidth={1.3} /><div><h2 className="text-xl font-semibold">No tienes que cuidar de tu salud a solas.</h2><p className="mt-2 text-sm text-primary-foreground/80">Estamos aquí para escucharte y acompañarte.</p></div></div><Button variant="gold" size="care" asChild><a href="#contacto">Demos el primer paso <ArrowUpRight /></a></Button></div></section><Facilities /><SecureContactSection /></main><Footer /><Button variant="care" size="icon" asChild className="fixed bottom-6 right-6 z-20 size-12 rounded-full shadow-lg"><a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar Vital Care por WhatsApp" title="Escribir por WhatsApp"><MessageCircle className="size-6" /></a></Button></>;
}
