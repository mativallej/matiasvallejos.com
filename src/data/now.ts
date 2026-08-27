export interface NowItem {
  id: number
  text: string
  link?: string
  linkLabel?: string
}

export interface TeguMetric {
  label: string
  value: string
  description?: string
  direction?: "up" | "down" | "flat"
}

export interface BuildLog {
  month: string // "May 2026"
  highlights: string[]
  /** Day of month (1-31) for each highlight, parallel to `highlights`. */
  days?: number[]
  /** Project tag for each highlight, parallel to `highlights` (e.g. "tegu"). */
  projects?: string[]
}

export interface NowData {
  updatedAt: string
  teguMetrics: TeguMetric[]
  buildLogs: BuildLog[]
  items: NowItem[]
}

export const now: NowData = {
  updatedAt: "August 2026",
  teguMetrics: [
    {
      label: "Usuarios",
      value: "3.000+",
      description: "Personas que ya confían en Tegu para resolver lo que necesitan en su hogar.",
      direction: "up",
    },
    {
      label: "Tareas creadas",
      value: "500+",
      description: "Hogares que ya resolvieron con Tegu.",
      direction: "up",
    },
    {
      label: "Tiempo promedio de respuesta",
      value: "~5min",
      description: "Recibí propuestas en minutos, no en días.",
      direction: "up",
    },
    {
      label: "Barrios en Córdoba",
      value: "12+",
      description: "Cobertura que crece semana a semana.",
      direction: "up",
    },
    {
      label: "Profesionales verificados",
      value: "90",
      description: "Identidad, antecedentes y matrículas chequeadas.",
      direction: "up",
    },
  ],
  buildLogs: [
    {
      month: "August 2026",
      days: [9, 12, 20, 24, 25],
      projects: ["tegu", "tegu", "tegu", "personal", "bip-template"],
      highlights: [
        "Cuotas en la app: 0% comisión, primer trabajo de $150.000 ofrecido",
        "Tegu 1.3: sin formulario — pedir es 100% conversar con la IA (voz + fotos)",
        "Superamos los 3.000 usuarios registrados",
        "Superé las 200 stars y 145 seguidores en GitHub",
        "Lancé el template open-source de building in public",
      ],
    },
    {
      month: "July 2026",
      days: [3, 10, 18, 24],
      projects: ["tegu", "tegu", "tegu", "docta-valley"],
      highlights: [
        "Nueva identidad: lagarto minimalista y un verde exacto (rediseño mono)",
        "El asistente de IA arma tu pedido conversando, sin formulario",
        "La suscripción pasó a bandas por tipo de trabajo",
        "Docta Valley llegó a 240 builders en la comunidad",
      ],
    },
    {
      month: "June 2026",
      days: [3, 19, 26],
      projects: ["tegu", "tegu", "tegu"],
      highlights: [
        "Mapa de cobertura real en /mapa",
        "Precios reales respaldados por datos en el blog",
        "Dev log público y la página de building in public",
      ],
    },
    {
      month: "May 2026",
      days: [4, 11, 13, 13],
      projects: ["tegu", "tegu", "tegu", "shipstats"],
      highlights: [
        "Lanzamos suscripción: 8 pros pagaron en 4 días, 1 churn",
        "Pico de 21 tareas en un solo día",
        "Iteramos estructura hablando uno por uno con los pros",
        "Lancé shipstats: métricas semanales → poster para X",
      ],
    },
    {
      month: "April 2026",
      days: [10, 18, 27],
      projects: ["tegu", "tegu", "tegu"],
      highlights: [
        "De 843 a 2.110 usuarios en un mes",
        "1.000 activos en una semana",
        "13K visitas con SEO trabajando solo",
      ],
    },
    {
      month: "March 2026",
      days: [6, 14, 24],
      projects: ["tegu", "tegu", "tegu"],
      highlights: [
        "Lanzamiento de Tegu",
        "De 0 a 100 usuarios",
        "De 100 a 600 usuarios",
      ],
    },
  ],
  items: [
    {
      id: 1,
      text: "Building Tegu — marketplace for home services in Argentina",
      link: "https://tegu.ar",
      linkLabel: "tegu.ar",
    },
    {
      id: 2,
      text: "Growing Docta Valley — tech community in Córdoba",
      link: "https://doctavalley.com.ar",
      linkLabel: "doctavalley.com.ar",
    },
    {
      id: 3,
      text: "Reading 1 book/month + writing in public on AI, code and life",
      link: "https://x.com/mativallej_",
      linkLabel: "follow along",
    },
  ],
}
