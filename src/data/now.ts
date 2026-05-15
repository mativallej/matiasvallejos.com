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
}

export interface NowData {
  updatedAt: string
  teguMetrics: TeguMetric[]
  buildLogs: BuildLog[]
  items: NowItem[]
}

export const now: NowData = {
  updatedAt: "May 2026",
  teguMetrics: [
    {
      label: "Usuarios",
      value: "2.200",
      description: "Personas que ya confían en Tegu para resolver lo que necesitan en su hogar.",
      direction: "up",
    },
    {
      label: "Tareas creadas",
      value: "294",
      description: "Hogares que ya resolvieron con Tegu.",
      direction: "up",
    },
    {
      label: "Tiempo promedio de respuesta",
      value: "30min",
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
      value: "32",
      description: "Identidad, antecedentes y matrículas chequeadas.",
      direction: "up",
    },
  ],
  buildLogs: [
    {
      month: "May 2026",
      days: [4, 11, 13],
      highlights: [
        "Lanzamos suscripción: 8 pros pagaron en 4 días, 1 churn",
        "Pico de 21 tareas en un solo día",
        "Iteramos estructura hablando uno por uno con los pros",
      ],
    },
    {
      month: "April 2026",
      days: [10, 18, 27],
      highlights: [
        "De 843 a 2.110 usuarios en un mes",
        "1.000 activos en una semana",
        "13K visitas con SEO trabajando solo",
      ],
    },
    {
      month: "March 2026",
      days: [6, 14, 24],
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
