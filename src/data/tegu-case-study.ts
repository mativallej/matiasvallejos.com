/**
 * Tegu — startup case study content for /case-study/tegu.
 *
 * Public-safe by design: every number here is already published on
 * tegu.ar/building-in-public. No internal targets, unit-economics
 * internals, unlaunched features, test pricing, or real user names.
 * Narrative is derived from the public building-in-public data.
 */

export type CaseLocale = "en" | "es"

export interface CaseMetric {
  value: string
  label: string
}
export interface CaseRule {
  title: string
  text: string
}
export interface CaseGalleryItem {
  title: string
  text: string
}
export interface CaseTimelineItem {
  period: string
  title: string
  text: string
}
export interface CaseModelRow {
  label: string
  value: string
  detail: string
}
export interface CaseNextItem {
  title: string
  text: string
}

export interface TeguCaseContent {
  label: string
  tagline: string
  intro: string
  meta: {
    roleLabel: string
    role: string
    yearLabel: string
    year: string
    locationLabel: string
    location: string
    categoryLabel: string
    category: string
  }
  outcomes: CaseMetric[]
  outcomesNote: string
  problem: { heading: string; paragraphs: string[]; caption: string; workerRole: string }
  approach: { heading: string; paragraphs: string[]; rules: CaseRule[] }
  product: { heading: string; intro: string; items: CaseGalleryItem[]; videoNote: string }
  installments: { heading: string; text: string }
  identity: {
    heading: string
    paragraphs: string[]
    beforeLabel: string
    afterLabel: string
    galleryCaptions: string[]
  }
  timeline: { heading: string; items: CaseTimelineItem[] }
  model: { heading: string; intro: string; rows: CaseModelRow[] }
  trust: { heading: string; intro: string; items: { label: string; description: string; href: string }[] }
  traction: { heading: string; captions: string[] }
  press: { heading: string; note: string }
  team: { heading: string; groupCaption: string; bios: string[] }
  next: { heading: string; items: CaseNextItem[] }
  quote: { text: string; author: string; role: string }
  banner: { heading: string; subtitle: string; placeholder: string; cta: string; note: string }
  cta: { visit: string; bip: string; back: string }
}

/* ── Locale-independent assets ─────────────────────────────────────────── */

export const caseImages = {
  teamGroup: "/images/case-study/tegu/team-conf.jpg",
  problemWorker: "/images/case-study/tegu/worker-card.webp",
  // Parallel to product.items
  // Parallel to product.items (assistant, pro profile, pro map, installments).
  product: [
    "/images/projects/tegu/mock-assistant.webp",
    "/images/projects/tegu/mock-pro.webp",
    "/images/projects/tegu/mock-map.webp",
    "/images/case-study/tegu/mock-payment.webp",
  ],
  identityBefore: "/images/case-study/tegu/identity-old.png",
  identityAfter: "/images/case-study/tegu/identity-new.png",
  // Parallel to identity.galleryCaptions
  identityGallery: [
    "/images/case-study/tegu/identity-mono.png",
    "/images/case-study/tegu/identity-scale.png",
    "/images/case-study/tegu/app-home.png",
    "/images/case-study/tegu/app-discover.png",
  ],
  // Parallel to traction.captions
  traction: [
    "/images/case-study/tegu/recap.jpg",
    "/images/case-study/tegu/seo.jpg",
    "/images/case-study/tegu/reviews.jpg",
  ],
  // Parallel to team.bios
  team: [
    { name: "Matías Vallejos", role: "CEO & Co-Founder", photo: "/images/case-study/tegu/team/matias.png" },
    { name: "Lucas Segurola", role: "CTO & Co-Founder", photo: "/images/case-study/tegu/team/lucas.jpeg" },
    { name: "Ezequiel Obreque", role: "Principal Software Engineer", photo: "/images/case-study/tegu/team/eze.jpeg" },
  ],
  press: [
    { src: "/images/case-study/tegu/press/perfil.png", name: "Perfil" },
    { src: "/images/case-study/tegu/press/eldia-cordoba.png", name: "El Día Córdoba" },
    { src: "/images/case-study/tegu/press/iproup.png", name: "iProUP" },
    { src: "/images/case-study/tegu/press/continental-cordoba.png", name: "Continental Córdoba" },
    { src: "/images/case-study/tegu/press/el-canciller.png", name: "El Canciller" },
    { src: "/images/case-study/tegu/press/cba-24n.png", name: "CBA24N" },
    { src: "/images/case-study/tegu/press/ecosistema-startup.png", name: "Ecosistema Startup" },
  ],
} as const

/* ── Content ───────────────────────────────────────────────────────────── */

export const teguCase: Record<CaseLocale, TeguCaseContent> = {
  en: {
    label: "Startup case study",
    tagline: "An AI home-services marketplace, from Córdoba, Argentina.",
    intro:
      "Tegu is the first app to put rules on one of Argentina's most informal markets: home services. It flips the usual script — you don't search for professionals, verified professionals find you. It's free for clients; the pro pays a subscription for real demand, not a commission per job. Built in public, decision by decision.",
    meta: {
      roleLabel: "Role",
      role: "CEO & Co-Founder — product, design, in public",
      yearLabel: "Since",
      year: "2026",
      locationLabel: "Where",
      location: "Córdoba, Argentina",
      categoryLabel: "What",
      category: "AI home-services marketplace",
    },
    outcomes: [
      { value: "3,000+", label: "registered users" },
      { value: "500+", label: "tasks created" },
      { value: "$400K", label: "billed by pros" },
      { value: "~5 min", label: "first response" },
    ],
    outcomesNote: "Real numbers, published live at tegu.ar/building-in-public. No inflated metrics.",
    problem: {
      heading: "The problem",
      paragraphs: [
        "In Argentina, 70% of service workers are in the informal economy. When something breaks at home, you don't know who to call: word of mouth, a number on a scrap of paper, and luck.",
        "On the other side, the professional who's good at their job starts from zero every time — no portable reputation, no backing, no client base that grows with them.",
        "Tegu builds what's missing: a work infrastructure with rules, reputation and backing. We verify identity, references and background before a professional can take a job.",
      ],
      caption: "Córdoba Capital — where Tegu launched.",
      workerRole: "Tegu professional · since 2026",
    },
    approach: {
      heading: "How we build",
      paragraphs: [
        "Build → measure → learn. Every hypothesis is written before we build it, with its success criteria set in advance. Evidence beats opinion.",
        "And we do it in the open. The building-in-public page shows the same face inside and out — the wins and what didn't work.",
      ],
      rules: [
        { title: "Discover, don't design", text: "Each hypothesis is written before building, with its success criteria defined up front." },
        { title: "Real numbers or «soon»", text: "No estimates, no projections, no inflated metrics. If a number isn't there, there's nothing real to show yet." },
        { title: "What didn't work gets told too", text: "A refuted experiment teaches more than a launch. Mistakes are documented like the wins." },
        { title: "No marketing filter", text: "The same tone in public as behind closed doors. If something is fragile, we say so." },
      ],
    },
    product: {
      heading: "The product",
      intro:
        "Tegu started as a form and became a conversation. Today you tell it what you need — with voice notes and photos — and the AI turns it into a task, finds the right pro, and keeps the whole job inside the app.",
      items: [
        { title: "Tell it like you'd tell a friend", text: "You describe your problem with voice notes and photos. The assistant listens to the audio and looks at the images to build the task for you — no form." },
        { title: "Discover pros, not listings", text: "Explore professionals with their profiles, jobs and reviews — like a network, not a directory. Chat with AI before you hire." },
        { title: "Work comes to the pro", text: "Professionals see nearby tasks on a map and get alerts by proximity — not noise from the whole city." },
        { title: "Pay in installments, 0% commission", text: "The professional doesn't pay per job — they pay a subscription for real demand. So the client can pay in installments with a QR, and the money goes straight to the pro: no Tegu commission on the work." },
      ],
      videoNote: "Demo video coming soon.",
    },
    installments: {
      heading: "Pay in installments, 0% commission",
      text: "The professional doesn't pay per job — they pay a subscription for the flow of demand they can't reach on their own. So the client can pay in installments with a QR, and the money goes straight to the pro: no Tegu commission on the work.",
    },
    identity: {
      heading: "A new identity",
      paragraphs: [
        "We rebuilt the brand from scratch. Out went a busy blue mascot; in came a minimalist lizard — a tegu — and one exact green.",
        "Then we took the whole product monochrome: one ink, no gradients, no decoration. What matters is the person on the other side, not the screen.",
      ],
      beforeLabel: "Before — the old mascot",
      afterLabel: "After — the minimalist tegu",
      galleryCaptions: [
        "The monochrome system",
        "The lizard, at every scale",
        "Redesigned home",
        "Discover screen",
      ],
    },
    timeline: {
      heading: "The story so far",
      items: [
        { period: "The start", title: "A coffee in Chacabuco", text: "Three of us started: Lucas, Eze and Matías. Two thousand dollars, zero investors, one rule — whoever does the work keeps it all." },
        { period: "February 2026", title: "The beta", text: "The team of three finishes the first version and tests it in Córdoba with the first professionals on board." },
        { period: "March 2026", title: "To market", text: "The MVP ships to production: real tasks, real offers, and the first radio interviews. The problem is real." },
        { period: "April 2026", title: "Time to monetize", text: "The question changes: will pros pay? The monetization stage begins — without touching the 0% commission rule." },
        { period: "May 2026", title: "The model gets clear", text: "Zero commission, first job of the month free, and a simple subscription. Simple to explain, simple to charge." },
        { period: "June 2026", title: "In public", text: "Open dev log, a real coverage map, prices backed by data, and the building-in-public page." },
        { period: "July 2026", title: "New brand", text: "We rebuilt the interface from scratch so the center is people, not decoration." },
      ],
    },
    model: {
      heading: "The business model",
      intro: "The same model we publish on /soy-profesional. Tegu never gets between the pro and the client.",
      rows: [
        { label: "What the client pays", value: "$0", detail: "Searching, comparing and contacting pros is free, always." },
        { label: "Commission per job", value: "0%", detail: "100% of what the pro charges is the pro's. Tegu never takes a cut." },
        { label: "Pro subscription", value: "Monthly", detail: "Our only revenue: an optional subscription for pros who want to scale." },
        { label: "Service payment", value: "Direct", detail: "From client to pro, without passing through Tegu. We don't process or hold money." },
      ],
    },
    trust: {
      heading: "Trust, out in the open",
      intro:
        "Trust isn't a claim — Tegu opened institutional pages so anyone can see who's behind it and how both sides are cared for.",
      items: [
        { label: "About us", description: "Who we are and why we built Tegu.", href: "https://tegu.ar/nosotros" },
        { label: "Commitment", description: "What we promise clients and professionals.", href: "https://tegu.ar/compromiso" },
        { label: "Safety", description: "How we verify and protect every job.", href: "https://tegu.ar/seguridad" },
        { label: "Finance", description: "The model, the money and installments, in the clear.", href: "https://tegu.ar/finanzas" },
        { label: "Reviews", description: "What people who already used Tegu say.", href: "https://tegu.ar/opiniones" },
      ],
    },
    traction: {
      heading: "Traction",
      captions: [
        "Four months, in numbers",
        "SEO working on its own",
        "Reviews on the stores",
      ],
    },
    press: {
      heading: "In the press",
      note: "Every outlet picked up the story on its own — no PR firm, no payola.",
    },
    team: {
      heading: "The team",
      groupCaption: "Lucas, Eze and me — the team today.",
      bios: [
        "Product and design. Documents the process in public, decision by decision.",
        "Writes the code behind Tegu: the platform, the matching, and the site itself.",
        "Came from Ushuaia, the end of the world. The mobile app is his, screen by screen.",
      ],
    },
    next: {
      heading: "What's next",
      items: [
        { title: "Density before coverage", text: "Concentrate on the categories and neighborhoods of Córdoba where there's already real demand, instead of adding catalog." },
        { title: "Do installments change the decision?", text: "Installments are live; now we measure whether they actually change the decision to hire." },
        { title: "Getting the client to come back", text: "We understand the pro well; the client side is where we're weakest. We're looking for reasons to bring them back." },
      ],
    },
    quote: {
      text: "I don't know if we'll make it. But here we are. Thank you, Córdoba.",
      author: "Matías Vallejos",
      role: "CEO & Co-Founder",
    },
    banner: {
      heading: "Need something fixed at home?",
      subtitle: "Get quotes from verified professionals in minutes — free for you.",
      placeholder: "What do you need? e.g. plumbing",
      cta: "Get quotes",
      note: "Free for clients · verified pros · pay straight to the pro",
    },
    cta: {
      visit: "Visit tegu.ar",
      bip: "See it built in public",
      back: "Back home",
    },
  },

  es: {
    label: "Caso de estudio",
    tagline: "Un marketplace de servicios para el hogar con IA, desde Córdoba, Argentina.",
    intro:
      "Tegu es la primera app que le pone reglas a uno de los mercados más informales de Argentina: los servicios del hogar. Le damos la vuelta a lo de siempre: no buscás profesionales, los profesionales verificados te buscan a vos. Para el cliente es gratis; el profesional paga una suscripción por demanda real, no una comisión por trabajo. Todo construido en público, decisión por decisión.",
    meta: {
      roleLabel: "Rol",
      role: "CEO & Co-Founder — producto, diseño, en público",
      yearLabel: "Desde",
      year: "2026",
      locationLabel: "Dónde",
      location: "Córdoba, Argentina",
      categoryLabel: "Qué",
      category: "Marketplace de servicios con IA",
    },
    outcomes: [
      { value: "3.000+", label: "usuarios registrados" },
      { value: "500+", label: "tareas creadas" },
      { value: "$400.000", label: "facturado por pros" },
      { value: "~5 min", label: "primera respuesta" },
    ],
    outcomesNote: "Números reales, publicados en vivo en tegu.ar/building-in-public. Sin métricas infladas.",
    problem: {
      heading: "El problema",
      paragraphs: [
        "En Argentina, el 70% de los trabajadores de servicios está en la informalidad. Cuando se te rompe algo en casa, no sabés a quién llamar: boca en boca, un número anotado en un papel y suerte.",
        "Del otro lado, el profesional que hace bien su trabajo arranca de cero cada vez — sin reputación portable, sin respaldo, sin una cartera de clientes que crezca con él.",
        "Tegu construye lo que falta: una infraestructura de trabajo con reglas, reputación y respaldo. Verificamos identidad, referencias y antecedentes antes de que un profesional pueda tomar un trabajo.",
      ],
      caption: "Córdoba Capital — donde arrancó Tegu.",
      workerRole: "Profesional Tegu · desde 2026",
    },
    approach: {
      heading: "Cómo construimos",
      paragraphs: [
        "Construir → medir → aprender. Cada hipótesis se escribe antes de construir, con su criterio de éxito definido de antemano. La evidencia le gana a la opinión.",
        "Y lo hacemos en público. La página de building in public muestra la misma cara puertas adentro que afuera — los aciertos y lo que no funcionó.",
      ],
      rules: [
        { title: "Se descubre, no se diseña", text: "Cada hipótesis se escribe antes de construir, con su criterio de éxito definido de antemano." },
        { title: "Números reales o «pronto»", text: "Sin estimaciones, proyecciones ni métricas infladas. Si un número no está, es porque todavía no hay nada real que mostrar." },
        { title: "Lo que no funcionó también se cuenta", text: "Un experimento refutado enseña más que un lanzamiento. Los errores quedan documentados igual que los aciertos." },
        { title: "Sin filtro de marketing", text: "El mismo tono acá que puertas adentro. Si algo está frágil, se dice." },
      ],
    },
    product: {
      heading: "El producto",
      intro:
        "Tegu empezó como un formulario y se volvió una conversación. Hoy le contás lo que necesitás — con notas de voz y fotos — y la IA lo convierte en una tarea, te encuentra el pro y mantiene todo el trabajo dentro de la app.",
      items: [
        { title: "Contalo como a un amigo", text: "Contás tu problema con notas de voz y fotos. El asistente escucha el audio y mira las imágenes para armar la tarea por vos — sin formulario." },
        { title: "Descubrí pros, no listados", text: "Explorá profesionales con sus perfiles, trabajos y reseñas — como una red, no un directorio. Chateá con la IA antes de contratar." },
        { title: "El trabajo llega al pro", text: "Los profesionales ven las tareas cercanas en un mapa y reciben avisos por cercanía — no ruido de toda la ciudad." },
        { title: "Pagá en cuotas, 0% comisión", text: "El profesional no paga por cada trabajo: paga una suscripción por demanda real. Por eso el cliente puede pagar en cuotas con QR y la plata va directo al pro, sin comisión de Tegu sobre el trabajo." },
      ],
      videoNote: "Video demo, próximamente.",
    },
    installments: {
      heading: "Pagá en cuotas, 0% comisión",
      text: "El profesional no paga por cada trabajo: paga una suscripción por el flujo de demanda que solo no consigue. Por eso el cliente puede pagar en cuotas con QR y la plata va directo al pro, sin comisión de Tegu sobre el trabajo.",
    },
    identity: {
      heading: "Una nueva identidad",
      paragraphs: [
        "Reconstruimos la marca desde cero. Se fue una mascota azul recargada; llegó un lagarto minimalista — un tegu — y un verde exacto.",
        "Después llevamos todo el producto a monocromo: una sola tinta, sin gradientes, sin decoración. Lo que importa es la persona del otro lado, no la pantalla.",
      ],
      beforeLabel: "Antes — la mascota vieja",
      afterLabel: "Después — el tegu minimalista",
      galleryCaptions: [
        "El sistema monocromático",
        "El lagarto, a toda escala",
        "Home rediseñado",
        "Pantalla de Descubrir",
      ],
    },
    timeline: {
      heading: "La historia hasta acá",
      items: [
        { period: "El comienzo", title: "Un café en Chacabuco", text: "Arrancamos tres: Lucas, Eze y Matías. Dos mil dólares, cero inversores, una regla — el que labura se queda con todo." },
        { period: "Febrero 2026", title: "La beta", text: "El equipo de tres termina la primera versión y la prueba en Córdoba, con los primeros profesionales a bordo." },
        { period: "Marzo 2026", title: "Al mercado", text: "El MVP sale a producción: tareas reales, ofertas reales y las primeras entrevistas en radio. El problema es real." },
        { period: "Abril 2026", title: "A monetizar", text: "La pregunta cambia: ¿los profesionales pagan? Arranca la etapa de monetización — sin tocar la regla del 0% de comisión." },
        { period: "Mayo 2026", title: "El modelo queda claro", text: "Cero comisiones, primer trabajo del mes gratis y una suscripción simple. Simple de explicar, simple de cobrar." },
        { period: "Junio 2026", title: "En público", text: "Dev log abierto, mapa de cobertura real, precios respaldados por datos y la página de building in public." },
        { period: "Julio 2026", title: "Nueva marca", text: "Reconstruimos la interfaz desde cero para que el centro sean las personas, no la decoración." },
      ],
    },
    model: {
      heading: "El modelo de negocio",
      intro: "El mismo modelo que publicamos en /soy-profesional. Tegu no se mete entre el profesional y el cliente.",
      rows: [
        { label: "Lo que paga el cliente", value: "$0", detail: "Buscar, comparar y contactar profesionales es gratis, siempre." },
        { label: "Comisión por trabajo", value: "0%", detail: "El 100% de lo que cobra el pro es del pro. Tegu no cobra comisión." },
        { label: "Suscripción profesional", value: "Mensual", detail: "Nuestro único ingreso: una suscripción opcional para los pros que quieren escalar." },
        { label: "Pago del servicio", value: "Directo", detail: "Del cliente al profesional, sin pasar por Tegu. No procesamos ni retenemos plata." },
      ],
    },
    trust: {
      heading: "Confianza, a la vista",
      intro:
        "La confianza no se declara — Tegu abrió páginas institucionales para que cualquiera pueda ver quién está detrás y cómo se cuida a las dos partes.",
      items: [
        { label: "Nosotros", description: "Quiénes somos y por qué construimos Tegu.", href: "https://tegu.ar/nosotros" },
        { label: "Compromiso", description: "Lo que le prometemos a clientes y profesionales.", href: "https://tegu.ar/compromiso" },
        { label: "Seguridad", description: "Cómo verificamos y cuidamos cada trabajo.", href: "https://tegu.ar/seguridad" },
        { label: "Finanzas", description: "El modelo, la plata y las cuotas, en claro.", href: "https://tegu.ar/finanzas" },
        { label: "Opiniones", description: "Lo que dicen los que ya usaron Tegu.", href: "https://tegu.ar/opiniones" },
      ],
    },
    traction: {
      heading: "Tracción",
      captions: [
        "Cuatro meses, en números",
        "El SEO trabajando solo",
        "Reseñas en las stores",
      ],
    },
    press: {
      heading: "En la prensa",
      note: "Cada medio levantó la historia por su cuenta — sin agencia de prensa, sin pauta.",
    },
    team: {
      heading: "El equipo",
      groupCaption: "Lucas, Eze y yo — el equipo hoy.",
      bios: [
        "Producto y diseño. Documenta el proceso en público, decisión por decisión.",
        "Escribe el código detrás de Tegu: la plataforma, el matching y este mismo sitio.",
        "Se vino desde Ushuaia, el fin del mundo. La app mobile es suya, pantalla por pantalla.",
      ],
    },
    next: {
      heading: "Qué sigue",
      items: [
        { title: "Densidad antes que cobertura", text: "Concentrarnos en los rubros y las zonas de Córdoba donde ya hay demanda real, en vez de sumar catálogo." },
        { title: "¿Las cuotas cambian la decisión?", text: "Las cuotas ya están; ahora medimos si de verdad cambian la decisión de contratar." },
        { title: "Que el cliente vuelva", text: "Entendemos bien al profesional; el lado del cliente es donde estamos más flojos. Buscamos motivos para que vuelva." },
      ],
    },
    quote: {
      text: "No sé si lo vamos a lograr. Pero acá estamos. Gracias Córdoba.",
      author: "Matías Vallejos",
      role: "CEO & Co-Founder",
    },
    banner: {
      heading: "¿Necesitás resolver algo en casa?",
      subtitle: "Recibí presupuestos de profesionales verificados en minutos — gratis para vos.",
      placeholder: "¿Qué necesitás? ej: plomería",
      cta: "Pedir presupuestos",
      note: "Gratis para el cliente · profesionales verificados · pagás directo al pro",
    },
    cta: {
      visit: "Visitar tegu.ar",
      bip: "Verlo en building in public",
      back: "Volver al inicio",
    },
  },
}
